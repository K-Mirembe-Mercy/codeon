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
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <div class="inner"><img src="" alt=""></div>
  `;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const closeBtn = lb.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (typeof lb.showModal === 'function') {
      lb.showModal();
    } else {
      lb.setAttribute('open', ''); // fallback for very old browsers
    }
  }
  function closeLightbox() {
    if (typeof lb.close === 'function') lb.close();
    else lb.removeAttribute('open');
  }

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  // clicking the backdrop (outside the image) closes it
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
})();
