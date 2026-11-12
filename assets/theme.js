/**
 * CodeOn Ventures — Theme Management System
 * Supports 3-state theme preference: Light, Dark, System (default).
 * Zero dependencies, accessible, cross-tab synced, FOUC-free.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'codeon-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_SYSTEM = 'system';

  // Safe localStorage helper
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || THEME_SYSTEM;
    } catch (e) {
      return THEME_SYSTEM;
    }
  }

  function setStoredTheme(theme) {
    try {
      if (theme === THEME_SYSTEM) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch (e) {
      // Storage unavailable or disabled
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEME_DARK
      : THEME_LIGHT;
  }

  function resolveEffectiveTheme(preference) {
    if (preference === THEME_SYSTEM) {
      return getSystemTheme();
    }
    return preference === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  }

  function updateMetaThemeColor(effectiveTheme) {
    const color = effectiveTheme === THEME_DARK ? '#05070C' : '#F9F9F7';
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);
  }

  function updateToggleButtons(currentPreference, effectiveTheme) {
    const buttons = document.querySelectorAll('.theme-toggle');
    const nextTheme =
      currentPreference === THEME_LIGHT
        ? THEME_DARK
        : currentPreference === THEME_DARK
        ? THEME_SYSTEM
        : THEME_LIGHT;

    const labelMap = {
      [THEME_LIGHT]: 'Light',
      [THEME_DARK]: 'Dark',
      [THEME_SYSTEM]: 'System'
    };

    const friendlyCurrent = labelMap[currentPreference] || 'System';
    const friendlyNext = labelMap[nextTheme];

    buttons.forEach((btn) => {
      btn.setAttribute('data-theme-setting', currentPreference);
      btn.setAttribute(
        'aria-label',
        `Current theme: ${friendlyCurrent}. Click to switch to ${friendlyNext} mode.`
      );
      btn.setAttribute('title', `Theme: ${friendlyCurrent} (Next: ${friendlyNext})`);

      // Update mobile menu label if present
      const textLabel = btn.querySelector('.theme-toggle-label');
      if (textLabel) {
        textLabel.textContent = friendlyCurrent;
      }
    });
  }

  function applyTheme(preference, save = true) {
    const effective = resolveEffectiveTheme(preference);
    document.documentElement.setAttribute('data-theme', effective);

    updateMetaThemeColor(effective);
    updateToggleButtons(preference, effective);

    if (save) {
      setStoredTheme(preference);
    }
  }

  function cycleTheme() {
    const current = getStoredTheme();
    let next;
    if (current === THEME_LIGHT) {
      next = THEME_DARK;
    } else if (current === THEME_DARK) {
      next = THEME_SYSTEM;
    } else {
      next = THEME_LIGHT;
    }
    applyTheme(next, true);
  }

  // Initialize theme on DOM ready
  function init() {
    const preference = getStoredTheme();
    applyTheme(preference, false);

    // Wire all toggle buttons
    const buttons = document.querySelectorAll('.theme-toggle');
    buttons.forEach((btn) => {
      // Remove any existing listener
      btn.removeEventListener('click', cycleTheme);
      btn.addEventListener('click', cycleTheme);
    });

    // Listen to OS system color-scheme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = () => {
        if (getStoredTheme() === THEME_SYSTEM) {
          applyTheme(THEME_SYSTEM, false);
        }
      };
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleSystemChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleSystemChange);
      }
    }

    // Cross-tab synchronization via storage event
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        const newTheme = e.newValue || THEME_SYSTEM;
        applyTheme(newTheme, false);
      }
    });

    // Re-enable CSS transitions after the initial render frame
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.documentElement.classList.remove('no-transitions');
        });
      });
    } else {
      setTimeout(() => {
        document.documentElement.classList.remove('no-transitions');
      }, 50);
    }
  }

  // Run immediately to set DOM state if document is ready, or wait for interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global controller for testing or programmatic control
  window.__CodeOnTheme = {
    get: getStoredTheme,
    set: applyTheme,
    cycle: cycleTheme,
    getEffective: () => resolveEffectiveTheme(getStoredTheme())
  };
})();

