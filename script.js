// ---- mobile nav toggle ----
const header = document.querySelector('header');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      header.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- scroll reveal (progressive enhancement — content is visible by default; ----
// ---- JS only adds the fade-in, and a safety net guarantees nothing stays hidden) ----
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-ready');
  const items = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  items.forEach(i => io.observe(i));

  window.addEventListener('load', () => {
    setTimeout(() => { items.forEach(i => i.classList.add('in')); }, 1800);
  });
}

// ---- lightbox: click any [data-lightbox] image to view it full-size, uncropped ----
// ---- uses the native <dialog> element so it always renders in the browser's ----
// ---- top layer, above all other page content, regardless of z-index/stacking ----
(function () {
  const lb = document.createElement('dialog');
  lb.className = 'lightbox';
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Full size image preview');
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close photo preview" type="button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <div class="inner" style="flex-direction:column;">
      <img src="" alt="">
      <p class="lightbox-caption" style="margin-top:14px; font-family:var(--font-sans, sans-serif); font-size:0.92rem; color:#FFFFFF; text-align:center; max-width:min(900px, 90vw); line-height:1.45; text-shadow:0 2px 8px rgba(0,0,0,0.8);"></p>
    </div>
  `;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lightbox-caption');
  const closeBtn = lb.querySelector('.lightbox-close');
  let lastFocusedElement = null;

  function openLightbox(src, alt, caption) {
    lastFocusedElement = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || '';
    const capText = caption || alt || '';
    if (lbCap) {
      lbCap.textContent = capText;
      lbCap.style.display = capText ? 'block' : 'none';
    }
    if (typeof lb.showModal === 'function') {
      lb.showModal();
    } else {
      lb.setAttribute('open', '');
    }
    closeBtn.focus();
  }

  function closeLightbox() {
    if (typeof lb.close === 'function') lb.close();
    else lb.removeAttribute('open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'Click to view photo full size');

    const triggerOpen = () => {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      const caption = el.getAttribute('data-caption') || (img ? img.alt : '');
      if (img) openLightbox(img.src, img.alt, caption);
    };

    el.addEventListener('click', triggerOpen);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerOpen();
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  // clicking the backdrop (outside the inner content) closes it
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

  // Escape key fallback
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (lb.open || lb.hasAttribute('open'))) {
      closeLightbox();
    }
  });
})();
