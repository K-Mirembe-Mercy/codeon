/**
 * CodeOn App-Shell & Navigation Management (assets/js/shell.js)
 * Manages desktop sidebar, floating topbar, mobile dock, events bell, and global configs.
 */

// Global Config Constants
window.CODEON_WHATSAPP = "+256 777 435942";
window.CODEON_WHATSAPP_URL = "https://wa.me/256777435942?text=Hello%20CodeOn%2C%20I%27d%20like%20to%20ask%20about...";
window.NAV_LAYOUT = window.NAV_LAYOUT || "sidebar"; // "sidebar" | "topbar"

(function() {
  'use strict';

  // Apply layout class
  if (window.NAV_LAYOUT === "topbar") {
    document.documentElement.classList.add("layout-topbar");
  }

  // ── Active nav highlighting (sidebar links + mobile dock items) ──
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const NAV_MAP = {
    'index.html': 0,
    '': 0,
    'agency.html': 1,
    'outreach.html': 2,
    'events.html': 3,
    'team.html': 4,
    'contact.html': 5,
  };
  const activeIdx = NAV_MAP[currentPage] ?? -1;

  // Sidebar links
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = (link.getAttribute('href') || '').replace(/^\.?\//, '');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile dock items
  document.querySelectorAll('.dock-item').forEach(item => {
    const href = (item.getAttribute('href') || '').replace(/^\.?\//, '');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
  });

  // Sidebar collapse state restoration
  const sidebar = document.getElementById("appSidebar");
  const collapseBtn = document.getElementById("sidebarCollapseBtn");

  if (sidebar && collapseBtn) {
    try {
      if (localStorage.getItem("codeon-sidebar-collapsed") === "true") {
        sidebar.classList.add("collapsed");
      }
    } catch (e) {}

    collapseBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      try {
        localStorage.setItem("codeon-sidebar-collapsed", sidebar.classList.contains("collapsed"));
      } catch (e) {}
    });
  }

  // Check data/events.json for upcoming events to illuminate the bell dot
  const bellBtn = document.getElementById("eventsBellBtn");
  if (bellBtn) {
    fetch("data/events.json")
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.upcoming) && data.upcoming.length > 0) {
          bellBtn.classList.add("has-event");
          bellBtn.setAttribute("title", `${data.upcoming.length} upcoming CodeOn event(s)`);
        }
      })
      .catch(() => {});
  }

  // Pause aurora animation on hidden tab to conserve CPU/battery
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.body.classList.add("tab-hidden");
    } else {
      document.body.classList.remove("tab-hidden");
    }
  });

  // Time-aware greeting on homepage ("Good morning / afternoon / evening, welcome to CodeOn")
  const greetingEl = document.getElementById("heroTimeGreeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    let timeGreeting = "Good day";
    if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon";
    else if (hour >= 17 && hour < 22) timeGreeting = "Good evening";
    else timeGreeting = "Welcome tonight";

    greetingEl.textContent = `${timeGreeting}, welcome to CodeOn`;
  }

  // "Choose your path" segmented selector on homepage
  const pathButtons = document.querySelectorAll("[data-path-btn]");
  const armCards = document.querySelectorAll(".arm-card");

  function highlightPath(targetPath) {
    if (!targetPath) return;
    try {
      sessionStorage.setItem("codeon-user-path", targetPath);
    } catch (e) {}

    pathButtons.forEach(btn => {
      if (btn.getAttribute("data-path-btn") === targetPath) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    armCards.forEach(card => {
      const cardPath = card.getAttribute("data-arm-path");
      const existingBadge = card.querySelector(".your-path-badge");
      if (cardPath === targetPath) {
        card.classList.add("path-highlighted");
        if (!existingBadge) {
          const badge = document.createElement("span");
          badge.className = "badge your-path-badge";
          badge.textContent = "Your Path";
          badge.style.position = "absolute";
          badge.style.top = "16px";
          badge.style.right = "16px";
          badge.style.zIndex = "2";
          card.appendChild(badge);
        }
      } else {
        card.classList.remove("path-highlighted");
        if (existingBadge) existingBadge.remove();
      }
    });
  }

  if (pathButtons.length > 0) {
    pathButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        highlightPath(btn.getAttribute("data-path-btn"));
      });
    });

    try {
      const savedPath = sessionStorage.getItem("codeon-user-path");
      if (savedPath) highlightPath(savedPath);
    } catch (e) {}
  }

  // Pointer-following spotlight effect on bento/arm cards (fine pointer devices only)
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".arm-card, .glass-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  // Data Components: Area Chart and Semicircle Gauge reading data/impact.json
  // If data/impact.json is empty or not verified, hide the impact section entirely
  const impactSection = document.getElementById("impactDataSection");
  if (impactSection) {
    fetch("data/impact.json")
      .then(r => r.json())
      .then(data => {
        if (!data || !data.verified || !data.metrics || Object.keys(data.metrics).length === 0) {
          impactSection.style.display = "none";
          return;
        }
        impactSection.style.display = "block";
      })
      .catch(() => {
        impactSection.style.display = "none";
      });
  }

})();
