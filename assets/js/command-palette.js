/**
 * CodeOn Command Palette (assets/js/command-palette.js)
 * Keyboard-driven quick navigation and actions modal
 */
(function() {
  'use strict';

  let searchIndex = [];
  let isOpen = false;
  let activeIndex = 0;
  let filteredItems = [];

  // Fetch search index
  fetch('data/search-index.json')
    .then(r => r.json())
    .then(data => { searchIndex = data; })
    .catch(() => { searchIndex = []; });

  function createModal() {
    if (document.getElementById('cmdPaletteBackdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'cmdPaletteBackdrop';
    backdrop.className = 'cmd-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Command Palette');

    backdrop.innerHTML = `
      <div class="cmd-dialog">
        <div class="cmd-search-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" class="cmd-input" id="cmdInput" placeholder="Type a command or search pages..." autocomplete="off" spellcheck="false">
          <button type="button" class="cmd-close-btn" id="cmdCloseBtn" aria-label="Close Command Palette">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <ul class="cmd-list" id="cmdList" role="listbox"></ul>
        <div class="cmd-footer">
          <div class="cmd-footer-hints">
            <span><span class="kbd">↑</span> <span class="kbd">↓</span> Navigate</span>
            <span><span class="kbd">↵</span> Select</span>
            <span><span class="kbd">Esc</span> Close</span>
          </div>
          <span style="font-family:var(--font-mono); font-size:0.68rem;">CodeOn FastNav</span>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const input = backdrop.querySelector('#cmdInput');
    const closeBtn = backdrop.querySelector('#cmdCloseBtn');
    const list = backdrop.querySelector('#cmdList');

    input.addEventListener('input', () => {
      renderList(input.value.trim());
    });

    closeBtn.addEventListener('click', close);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    backdrop.addEventListener('keydown', handleKeydown);
  }

  function open() {
    createModal();
    const backdrop = document.getElementById('cmdPaletteBackdrop');
    const input = document.getElementById('cmdInput');
    if (!backdrop || !input) return;

    backdrop.classList.add('is-open');
    isOpen = true;
    input.value = '';
    renderList('');
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const backdrop = document.getElementById('cmdPaletteBackdrop');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    isOpen = false;
    document.body.style.overflow = '';
  }

  function renderList(query) {
    const list = document.getElementById('cmdList');
    if (!list) return;

    const q = query.toLowerCase();
    filteredItems = searchIndex.filter(item => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });

    activeIndex = 0;

    if (filteredItems.length === 0) {
      list.innerHTML = `
        <div class="cmd-empty">
          <p>No results found for "${query}".</p>
          <button type="button" class="btn-glass" id="cmdAskGuideBtn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
            Ask CodeOn Guide instead
          </button>
        </div>
      `;
      const askBtn = list.querySelector('#cmdAskGuideBtn');
      if (askBtn) {
        askBtn.addEventListener('click', () => {
          close();
          if (window.__CodeOnGuide && typeof window.__CodeOnGuide.open === 'function') {
            window.__CodeOnGuide.open(query);
          }
        });
      }
      return;
    }

    // Group items by category
    const grouped = {};
    filteredItems.forEach((item, idx) => {
      const cat = item.category || 'General';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ item, globalIndex: idx });
    });

    let html = '';
    for (const [cat, entries] of Object.entries(grouped)) {
      html += `<li class="cmd-group-label" role="presentation">${cat}</li>`;
      entries.forEach(({ item, globalIndex }) => {
        const isActive = globalIndex === activeIndex;
        html += `
          <li class="cmd-item ${isActive ? 'active' : ''}" role="option" aria-selected="${isActive}" data-index="${globalIndex}">
            <div class="cmd-item-left">
              <div class="cmd-item-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  ${getIconSvg(item.icon)}
                </svg>
              </div>
              <div class="cmd-item-text">
                <span class="cmd-item-title">${item.title}</span>
                <span class="cmd-item-desc">${item.description}</span>
              </div>
            </div>
            <span class="kbd">↵</span>
          </li>
        `;
      });
    }

    list.innerHTML = html;

    list.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        executeItem(filteredItems[idx]);
      });
      el.addEventListener('mouseenter', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        setActive(idx);
      });
    });
  }

  function setActive(index) {
    activeIndex = Math.max(0, Math.min(index, filteredItems.length - 1));
    const items = document.querySelectorAll('#cmdList .cmd-item');
    items.forEach(el => {
      const idx = parseInt(el.getAttribute('data-index'), 10);
      if (idx === activeIndex) {
        el.classList.add('active');
        el.setAttribute('aria-selected', 'true');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('active');
        el.setAttribute('aria-selected', 'false');
      }
    });
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(activeIndex + 1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIndex - 1);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        executeItem(filteredItems[activeIndex]);
      }
    }
  }

  function executeItem(item) {
    if (!item) return;
    close();

    if (item.action === 'open-guide') {
      if (window.__CodeOnGuide && typeof window.__CodeOnGuide.open === 'function') {
        window.__CodeOnGuide.open();
      }
      return;
    }

    if (item.action === 'toggle-theme') {
      if (window.__CodeOnTheme && typeof window.__CodeOnTheme.cycle === 'function') {
        window.__CodeOnTheme.cycle();
      }
      return;
    }

    if (item.url) {
      if (item.external) {
        window.open(item.url, '_blank', 'noopener');
      } else {
        window.location.href = item.url;
      }
    }
  }

  function getIconSvg(iconName) {
    switch (iconName) {
      case 'home': return '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>';
      case 'briefcase': return '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>';
      case 'book-open': return '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>';
      case 'calendar': return '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>';
      case 'users': return '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>';
      case 'mail': return '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>';
      case 'message-circle': return '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>';
      case 'sparkles': return '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>';
      case 'sun-moon': return '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
      default: return '<circle cx="12" cy="12" r="8"/>';
    }
  }

  // Global keyboard shortcuts (Ctrl+K, Cmd+K, or '/')
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      isOpen ? close() : open();
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      open();
    }
  });

  // Export on window for manual triggers
  window.__CodeOnCmd = { open, close };
})();
