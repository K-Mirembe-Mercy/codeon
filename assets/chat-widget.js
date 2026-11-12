/**
 * CodeOn Guide — AI Assistant Widget (Client-side)
 * Lightweight, accessible, zero-dependency streaming chat interface
 * Designed for codeondigital.com
 */
(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__CODEON_WIDGET_INIT__) return;
  window.__CODEON_WIDGET_INIT__ = true;

  const STORAGE_KEY = 'codeon_chat_history_v1';
  const MAX_INPUT_CHARS = 1000;
  const WHATSAPP_URL = 'https://wa.me/256700000000?text=Hello%20CodeOn%20team,%20I%20have%20an%20inquiry.';
  const CHAT_ENDPOINT = '/api/chat';
  const LEAD_ENDPOINT = '/api/lead';

  // SVG Icons
  const ICONS = {
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.776.978-.952 1.18-.175.2-.351.225-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.526.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.927-2.234-.244-.588-.492-.508-.677-.517-.175-.009-.376-.011-.576-.011-.201 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508s1.078 2.909 1.228 3.11c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.378.197 1.9.119.58-.088 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.2-.577-.35zM12 2a9.93 9.93 0 0 0-8.528 15.06L2 22l5.093-1.336A9.94 9.94 0 1 0 12 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };

  const STARTER_CHIPS = [
    { label: 'Need software built?', query: "I'm looking to have software built by CodeOn's agency." },
    { label: 'I represent a school', query: "I represent a school and would like to learn about the 'Build. Solve. Belong.' outreach program." },
    { label: "I'm a student developer", query: "I'm a student developer interested in CodeOn events, hackathons, and joining a chapter." }
  ];

  // State
  let isOpen = false;
  let isStreaming = false;
  let messages = [];
  let panelCreated = false;

  // DOM Elements
  let launcherBtn;
  let panelEl;
  let messagesContainer;
  let textareaEl;
  let sendBtn;
  let charCountEl;
  let leadCardEl = null;

  // Safe SessionStorage helper
  function loadStoredMessages() {
    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // Storage unavailable or disabled
    }
    return [];
  }

  function saveStoredMessages(list) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-14)));
    } catch (e) {
      // Storage quota or private browsing error
    }
  }

  function clearStoredMessages() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  // Safe Markdown-Lite Renderer with XSS Escaping
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderMarkdownLite(rawText) {
    if (!rawText) return '';
    const safe = escapeHtml(rawText);

    // Links: [text](url)
    let formatted = safe.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
      const safeUrl = url.trim();
      const isInternal = safeUrl.startsWith('/') || safeUrl.endsWith('.html') || safeUrl.startsWith('#');
      const targetAttr = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<a href="${safeUrl}"${targetAttr}>${label}</a>`;
    });

    // Bold: **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italics: *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Bullet lists: Lines starting with - or *
    const lines = formatted.split('\n');
    let inList = false;
    const outputLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const bulletMatch = line.match(/^\s*[-*]\s+(.*)/);
      if (bulletMatch) {
        if (!inList) {
          outputLines.push('<ul>');
          inList = true;
        }
        outputLines.push(`<li>${bulletMatch[1]}</li>`);
      } else {
        if (inList) {
          outputLines.push('</ul>');
          inList = false;
        }
        if (line.trim().length > 0) {
          outputLines.push(`<p>${line}</p>`);
        }
      }
    }
    if (inList) outputLines.push('</ul>');

    return outputLines.join('');
  }

  // UI Setup & Panel Creation
  function init() {
    createLauncher();
    messages = loadStoredMessages();
  }

  function createLauncher() {
    launcherBtn = document.createElement('button');
    launcherBtn.className = 'codeon-launcher';
    launcherBtn.setAttribute('aria-label', 'Open CodeOn Guide AI assistant');
    launcherBtn.setAttribute('aria-expanded', 'false');
    launcherBtn.innerHTML = `
      <span class="icon-chat">${ICONS.chat}</span>
      <span class="icon-close">${ICONS.close}</span>
      <span class="codeon-launcher-badge" aria-hidden="true"></span>
    `;

    launcherBtn.addEventListener('click', toggleChat);
    document.body.appendChild(launcherBtn);
  }

  function ensurePanel() {
    if (panelCreated) return;
    panelCreated = true;

    panelEl = document.createElement('div');
    panelEl.className = 'codeon-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-label', 'CodeOn Guide Chat');
    panelEl.setAttribute('aria-modal', 'true');

    panelEl.innerHTML = `
      <div class="codeon-header">
        <div class="codeon-header-brand">
          <div class="codeon-avatar">
            ${ICONS.sparkles}
            <span class="codeon-avatar-status" title="Online"></span>
          </div>
          <div class="codeon-header-title">
            <h3>CodeOn Guide</h3>
            <span>AI Assistant · Kampala</span>
          </div>
        </div>
        <div class="codeon-header-actions">
          <button class="codeon-btn-icon" id="codeonNewChat" title="New conversation" aria-label="Start new conversation">
            ${ICONS.refresh}
          </button>
          <button class="codeon-btn-icon" id="codeonCloseChat" title="Close chat" aria-label="Close chat">
            ${ICONS.close}
          </button>
        </div>
      </div>

      <div class="codeon-fallback-bar">
        <span>Need a direct link?</span>
        <div class="codeon-fallback-actions">
          <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="codeon-fallback-link" title="Chat on WhatsApp">
            ${ICONS.whatsapp} WhatsApp
          </a>
          <a href="contact.html" class="codeon-fallback-link" title="View contact page">
            ${ICONS.mail} Contact
          </a>
        </div>
      </div>

      <div class="codeon-messages" id="codeonMessages" role="log" aria-live="polite"></div>

      <div class="codeon-footer">
        <form class="codeon-input-row" id="codeonForm">
          <textarea
            class="codeon-textarea"
            id="codeonInput"
            placeholder="Ask about our agency, schools, or events..."
            rows="1"
            maxlength="${MAX_INPUT_CHARS}"
            aria-label="Message CodeOn Guide"
          ></textarea>
          <button type="submit" class="codeon-send-btn" id="codeonSend" aria-label="Send message" disabled>
            ${ICONS.send}
          </button>
        </form>
        <div class="codeon-input-meta">
          <span class="codeon-privacy-note">AI assistant. Don't share sensitive data.</span>
          <span class="codeon-char-count" id="codeonCharCount">0/${MAX_INPUT_CHARS}</span>
        </div>
      </div>
    `;

    document.body.appendChild(panelEl);

    // Cache elements
    messagesContainer = panelEl.querySelector('#codeonMessages');
    textareaEl = panelEl.querySelector('#codeonInput');
    sendBtn = panelEl.querySelector('#codeonSend');
    charCountEl = panelEl.querySelector('#codeonCharCount');

    // Event Listeners
    panelEl.querySelector('#codeonCloseChat').addEventListener('click', closeChat);
    panelEl.querySelector('#codeonNewChat').addEventListener('click', resetChat);

    panelEl.querySelector('#codeonForm').addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });

    textareaEl.addEventListener('input', handleTextareaInput);
    textareaEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSubmit();
      }
    });

    // Keyboard navigation: Escape key closes panel; Tab trap
    panelEl.addEventListener('keydown', handleKeyTrap);

    // Initial render
    renderChatState();
  }

  function handleKeyTrap(e) {
    if (e.key === 'Escape') {
      closeChat();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = panelEl.querySelectorAll(
        'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function toggleChat() {
    if (isOpen) closeChat();
    else openChat();
  }

  function openChat() {
    ensurePanel();
    isOpen = true;
    panelEl.classList.add('is-open');
    launcherBtn.classList.add('is-active');
    launcherBtn.setAttribute('aria-expanded', 'true');

    // Focus input or messages
    setTimeout(() => {
      if (textareaEl) textareaEl.focus();
      scrollToBottom();
    }, 150);
  }

  function closeChat() {
    if (!isOpen) return;
    isOpen = false;
    if (panelEl) panelEl.classList.remove('is-open');
    if (launcherBtn) {
      launcherBtn.classList.remove('is-active');
      launcherBtn.setAttribute('aria-expanded', 'false');
      launcherBtn.focus();
    }
  }

  function resetChat() {
    if (isStreaming) return;
    messages = [];
    clearStoredMessages();
    renderChatState();
    if (textareaEl) {
      textareaEl.value = '';
      handleTextareaInput();
      textareaEl.focus();
    }
  }

  function handleTextareaInput() {
    const len = textareaEl.value.trim().length;
    sendBtn.disabled = len === 0 || isStreaming;
    charCountEl.textContent = `${textareaEl.value.length}/${MAX_INPUT_CHARS}`;

    if (textareaEl.value.length > 900) {
      charCountEl.classList.add('is-warning');
    } else {
      charCountEl.classList.remove('is-warning');
    }

    // Auto-resize textarea
    textareaEl.style.height = 'auto';
    textareaEl.style.height = Math.min(textareaEl.scrollHeight, 100) + 'px';
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function renderChatState() {
    messagesContainer.innerHTML = '';

    if (messages.length === 0) {
      // First open greeting
      const greetingMsg = document.createElement('div');
      greetingMsg.className = 'codeon-msg codeon-msg-assistant';
      greetingMsg.innerHTML = `
        <p><strong>Hello! I'm CodeOn Guide.</strong></p>
        <p>I can help you explore CodeOn's three arms in Kampala: our <strong>Student Dev Agency</strong>, our <strong>"Build. Solve. Belong." school outreach program</strong>, or our <strong>tech events and hackathons</strong>.</p>
        <p>How can we help you today?</p>
      `;
      messagesContainer.appendChild(greetingMsg);

      // Starter chips
      const chipsContainer = document.createElement('div');
      chipsContainer.className = 'codeon-chips';
      STARTER_CHIPS.forEach(chip => {
        const btn = document.createElement('button');
        btn.className = 'codeon-chip';
        btn.type = 'button';
        btn.innerHTML = `<span>${chip.label}</span>${ICONS.arrowRight}`;
        btn.addEventListener('click', () => {
          sendUserMessage(chip.query);
        });
        chipsContainer.appendChild(btn);
      });
      messagesContainer.appendChild(chipsContainer);
    } else {
      // Render existing conversation
      messages.forEach(m => {
        appendMessageBubble(m.role, m.content, false);
      });
    }

    scrollToBottom();
  }

  function appendMessageBubble(role, content, animate = true) {
    const bubble = document.createElement('div');
    bubble.className = `codeon-msg codeon-msg-${role}`;
    if (!animate) bubble.style.animation = 'none';

    if (role === 'user') {
      bubble.textContent = content;
    } else {
      bubble.innerHTML = renderMarkdownLite(content);
      // Attach lead card or quick triggers if assistant mentions inquiry
      attachInteractiveTriggers(bubble, content);
    }

    messagesContainer.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function attachInteractiveTriggers(bubble, text) {
    const lower = text.toLowerCase();
    // If response invites scoping or lead capture, render a clean quick-action card
    if (
      (lower.includes('project inquiry') || lower.includes('school visit request') || lower.includes('inquiry form') || lower.includes('connect you with')) &&
      !bubble.querySelector('.codeon-lead-card')
    ) {
      let defaultArm = 'agency';
      let title = 'Send Project Inquiry';
      if (lower.includes('school') || lower.includes('outreach') || lower.includes('classroom')) {
        defaultArm = 'school';
        title = 'Request a School Visit';
      } else if (lower.includes('event') || lower.includes('hackathon') || lower.includes('partner')) {
        defaultArm = 'chapter';
        title = 'Partner / Event Inquiry';
      }

      const card = createLeadCard(defaultArm, title);
      bubble.appendChild(card);
    }
  }

  function createLeadCard(arm, title) {
    const card = document.createElement('div');
    card.className = 'codeon-lead-card';
    card.innerHTML = `
      <h4>${ICONS.mail} ${title}</h4>
      <form class="codeon-lead-form">
        <input type="text" name="name" class="codeon-lead-input" placeholder="Your name" required />
        <input type="text" name="contact" class="codeon-lead-input" placeholder="Email or WhatsApp number" required />
        <input type="text" name="organization" class="codeon-lead-input" placeholder="Company, School, or Organization (optional)" />
        <input type="text" name="need" class="codeon-lead-input" placeholder="One-line summary of what you need" required />
        <!-- Spam honeypot field -->
        <input type="text" name="_hp" style="display:none !important;" tabindex="-1" autocomplete="off" />
        <button type="submit" class="codeon-lead-submit">
          Send to Team ${ICONS.arrowRight}
        </button>
      </form>
    `;

    const form = card.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.codeon-lead-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const payload = {
        name: form.name.value.trim(),
        contact: form.contact.value.trim(),
        organization: form.organization.value.trim(),
        need: form.need.value.trim(),
        arm: arm,
        _hp: form._hp.value
      };

      try {
        const res = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok) {
          card.innerHTML = `
            <div style="color:#4ADE80; font-size:13px; line-height:1.5;">
              ✓ <strong>Inquiry received!</strong> Routed to <strong>${data.destinationEmail || 'our team'}</strong>. We'll be in touch soon.
            </div>
          `;
        } else {
          throw new Error(data.error || 'Submission failed');
        }
      } catch (err) {
        card.innerHTML = `
          <div class="codeon-error-banner">
            <span>Unable to submit directly right now.</span>
            <span>Please email us directly at <a href="mailto:info@codeondigital.com">info@codeondigital.com</a> or <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">chat on WhatsApp</a>.</span>
          </div>
        `;
      }
    });

    return card;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'codeon-typing';
    typing.id = 'codeonTyping';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typing);
    scrollToBottom();
    return typing;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('codeonTyping');
    if (typing) typing.remove();
  }

  function handleUserSubmit() {
    if (!textareaEl || isStreaming) return;
    const text = textareaEl.value.trim();
    if (!text) return;

    textareaEl.value = '';
    handleTextareaInput();
    sendUserMessage(text);
  }

  async function sendUserMessage(userText) {
    if (isStreaming) return;

    // Check message length limit
    if (userText.length > MAX_INPUT_CHARS) {
      appendMessageBubble('assistant', 'Please shorten your message (maximum 1,000 characters).');
      return;
    }

    // Add user message to state & UI
    messages.push({ role: 'user', content: userText });
    saveStoredMessages(messages);
    appendMessageBubble('user', userText);

    isStreaming = true;
    sendBtn.disabled = true;
    showTypingIndicator();

    // Prepare assistant streaming bubble
    let assistantBubble = null;
    let fullResponseText = '';

    try {
      // Send conversation history (last 12 turns)
      const payload = {
        messages: messages.slice(-12).map(m => ({
          role: m.role,
          content: m.content
        }))
      };

      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      removeTypingIndicator();

      if (!response.ok) {
        let errData;
        try {
          errData = await response.json();
        } catch (e) {
          errData = { error: 'Request failed with status ' + response.status };
        }
        showErrorFallback(errData.error || 'Server error occurred.');
        isStreaming = false;
        handleTextareaInput();
        return;
      }

      // Check for streaming response
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream')) {
        assistantBubble = document.createElement('div');
        assistantBubble.className = 'codeon-msg codeon-msg-assistant';
        assistantBubble.innerHTML = '<span class="codeon-cursor"></span>';
        messagesContainer.appendChild(assistantBubble);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const dataStr = trimmed.slice(5).trim();
            if (!dataStr || dataStr === '[DONE]') continue;

            try {
              const chunk = JSON.parse(dataStr);
              if (chunk.text) {
                fullResponseText += chunk.text;
                assistantBubble.innerHTML = renderMarkdownLite(fullResponseText) + '<span class="codeon-cursor"></span>';
                scrollToBottom();
              } else if (chunk.error) {
                fullResponseText += `\n\n*${chunk.error}*`;
                assistantBubble.innerHTML = renderMarkdownLite(fullResponseText);
              }
            } catch (err) {
              // Ignore partial JSON
            }
          }
        }

        // Finalize streaming bubble
        if (assistantBubble) {
          assistantBubble.innerHTML = renderMarkdownLite(fullResponseText);
          attachInteractiveTriggers(assistantBubble, fullResponseText);
        }
      } else {
        // Plain JSON response fallback
        const data = await response.json();
        fullResponseText = data.reply || data.text || 'Message received.';
        appendMessageBubble('assistant', fullResponseText);
      }

      // Save assistant response
      if (fullResponseText) {
        messages.push({ role: 'assistant', content: fullResponseText });
        saveStoredMessages(messages);
      }
    } catch (err) {
      removeTypingIndicator();
      showErrorFallback(err.message || 'Unable to connect to assistant.');
    } finally {
      isStreaming = false;
      handleTextareaInput();
      scrollToBottom();
    }
  }

  function showErrorFallback(msg) {
    const errorBubble = document.createElement('div');
    errorBubble.className = 'codeon-msg codeon-msg-assistant';
    errorBubble.innerHTML = `
      <p>Sorry, I encountered an issue: <em>${escapeHtml(msg)}</em></p>
      <div class="codeon-error-banner">
        <span>You can connect directly with our team right away:</span>
        <div style="display:flex; gap:10px; margin-top:4px;">
          <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">Chat on WhatsApp</a>
          <a href="mailto:info@codeondigital.com">Email info@codeondigital.com</a>
        </div>
      </div>
    `;
    messagesContainer.appendChild(errorBubble);
    scrollToBottom();
  }

  // Self-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
