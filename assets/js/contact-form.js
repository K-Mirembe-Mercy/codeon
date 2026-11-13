/**
 * CodeOn Contact Form Handler (assets/js/contact-form.js)
 * Validated multi-category contact submission connected to /api/lead
 */
(function() {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status
    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.className = 'form-status';
      statusEl.textContent = '';
    }

    const formData = new FormData(form);
    const arm = formData.get('arm') || 'agency';
    const name = (formData.get('name') || '').trim();
    const contact = (formData.get('contact') || '').trim();
    const organization = (formData.get('organization') || '').trim();
    const need = (formData.get('need') || '').trim();
    const hp = formData.get('_hp') || '';

    // Validation
    if (!name || !contact || !need) {
      showStatus('Please fill in your name, contact information, and inquiry details.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending inquiry...';
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          organization,
          arm,
          need,
          _hp: hp
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        form.reset();
        showStatus('Thank you! Your inquiry has been routed directly to the ' + (data.targetArm || 'CodeOn') + ' team. We will be in touch shortly.', 'success');
      } else {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      // Fallback: offer direct mailto link
      let emailTarget = 'info@codeondigital.com';
      if (arm === 'school') emailTarget = 'school@codeondigital.com';
      if (arm === 'chapter') emailTarget = 'chapter@codeondigital.com';

      showStatus(
        'Unable to send via automated gateway. You can email us directly at ' + emailTarget + ' or reach us on WhatsApp: ' +
        '<a href="' + (window.CODEON_WHATSAPP_URL || 'https://wa.me/256777435942?text=Hello%20CodeOn%2C%20I%27d%20like%20to%20ask%20about...') + '" target="_blank" rel="noopener" style="color:var(--accent);">' + (window.CODEON_WHATSAPP || '+256 777 435942') + '</a>',
        'error',
        true
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Inquiry <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      }
    }
  });

  function showStatus(msg, type, isHtml) {
    if (!statusEl) return;
    if (isHtml) {
      statusEl.innerHTML = msg;
    } else {
      statusEl.textContent = msg;
    }
    statusEl.className = 'form-status status-' + type;
    statusEl.style.display = 'block';
  }
})();
