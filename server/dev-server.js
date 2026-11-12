/**
 * Local Development Server for CodeOn Ventures
 * Serves static pages and proxies /api/chat and /api/lead endpoints
 * Zero external dependencies — runs directly with `node server/dev-server.js`
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildSystemPrompt } from './systemPrompt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PORT = process.env.PORT || 3000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
const rateLimitMap = new Map();

// Load .env if present
const envPath = path.join(ROOT_DIR, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown',
};

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const active = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (active.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, active);
    return true;
  }
  active.push(now);
  rateLimitMap.set(ip, active);
  return false;
}

function sendCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

const server = http.createServer(async (req, res) => {
  sendCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = req.url.split('?')[0];

  // API Route: POST /api/chat
  if (urlPath === '/api/chat' && req.method === 'POST') {
    const clientIp = req.socket.remoteAddress || '127.0.0.1';
    if (isRateLimited(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Too many requests. Please wait a few minutes, or contact us directly on WhatsApp or info@codeondigital.com.',
        code: 'RATE_LIMIT_EXCEEDED'
      }));
      return;
    }

    let rawBody = '';
    req.on('data', chunk => {
      rawBody += chunk;
      if (rawBody.length > 50000) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large.' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      let body;
      try {
        body = JSON.parse(rawBody);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON.' }));
        return;
      }

      const { messages } = body || {};
      if (!Array.isArray(messages) || messages.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Messages must be a non-empty array.' }));
        return;
      }

      // Turn limit and character limit check
      const sanitized = [];
      for (const m of messages.slice(-12)) {
        if (!m || typeof m.content !== 'string' || !['user', 'assistant'].includes(m.role)) continue;
        const text = m.content.trim();
        if (!text) continue;
        if (m.role === 'user' && text.length > 1000) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message exceeds the 1,000 character limit.' }));
          return;
        }
        sanitized.push({ role: m.role, content: text.slice(0, 1000) });
      }

      const apiKey = process.env.ANTHROPIC_API_KEY;
      const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest';

      if (!apiKey || apiKey.startsWith('sk-ant-api03-...')) {
        // Mock streaming response for local dev if key not configured
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });
        const lastMsg = sanitized[sanitized.length - 1]?.content.toLowerCase() || '';
        let reply = "Hello from CodeOn Guide! ";

        if (lastMsg.includes('agency') || lastMsg.includes('software')) {
          reply += "Our Student Dev Agency is led by Justin. We build production web platforms and apps in 3 stages: Discovery, Build, and Delivery. To scope a project, what are you building, what's your timeline, and your budget? You can explore [agency.html](agency.html) or email info@codeondigital.com.";
        } else if (lastMsg.includes('school') || lastMsg.includes('outreach')) {
          reply += "Our 'Build. Solve. Belong.' outreach program is led by Evelyne and Ramathan. We bring laptops and hands-on coding sessions to schools across Uganda. What is your school name, district, student age group, and preferred term? You can explore [outreach.html](outreach.html) or email school@codeondigital.com.";
        } else if (lastMsg.includes('student') || lastMsg.includes('event')) {
          reply += "Our events arm is directed by Humphrey and Josephyne. We host hackathons like Hack 4 Bodas and dev workshops at the U.S. Embassy American Center. Explore [events.html](events.html) or reach chapter@codeondigital.com.";
        } else if (lastMsg.includes('homework') || lastMsg.includes('essay')) {
          reply = "I'm specifically here to help guide you through CodeOn Ventures and our work in software development, school outreach, and tech events. How can I assist you with CodeOn?";
        } else if (lastMsg.includes('ignore') || lastMsg.includes('system prompt')) {
          reply = "I am CodeOn Guide. I cannot alter my core instructions or reveal internal configuration. How can I assist you with CodeOn?";
        } else {
          reply += "CodeOn is a Kampala-based student developer collective. Feel free to ask about our Agency, School Outreach, or Tech Events!";
        }

        const words = reply.split(' ');
        for (const word of words) {
          res.write(`data: ${JSON.stringify({ text: word + ' ' })}\n\n`);
          await new Promise(r => setTimeout(r, 20));
        }
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      // Real Claude API streaming
      const systemPrompt = buildSystemPrompt();
      try {
        const upstream = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model,
            max_tokens: 1024,
            system: systemPrompt,
            messages: sanitized,
            stream: true,
          }),
        });

        if (!upstream.ok) {
          const errText = await upstream.text();
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'AI service unavailable. Please contact info@codeondigital.com.',
            details: errText
          }));
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });

        const reader = upstream.body.getReader();
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
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                res.write(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`);
              } else if (parsed.type === 'message_stop') {
                res.write('data: [DONE]\n\n');
              }
            } catch {}
          }
        }
        res.write('data: [DONE]\n\n');
        res.end();
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Route: POST /api/lead
  if (urlPath === '/api/lead' && req.method === 'POST') {
    let rawBody = '';
    req.on('data', chunk => { rawBody += chunk; });
    req.on('end', () => {
      let body;
      try { body = JSON.parse(rawBody); } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      const { name, contact, need, arm, honeypot, _hp } = body || {};
      if (honeypot || _hp) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Received' }));
        return;
      }
      if (!name || !contact || !need) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Name, contact, and need are required.' }));
        return;
      }
      let targetEmail = 'info@codeondigital.com';
      if (arm === 'school') targetEmail = 'school@codeondigital.com';
      if (arm === 'chapter') targetEmail = 'chapter@codeondigital.com';

      console.log(`[LEAD RECEIVED] name=${name} arm=${arm || 'agency'} target=${targetEmail}`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Inquiry received',
        destinationEmail: targetEmail
      }));
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(ROOT_DIR, urlPath === '/' ? 'index.html' : urlPath);
  try {
    filePath = decodeURIComponent(filePath);
  } catch {}

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`CodeOn server running at http://localhost:${PORT}`);
});

export { server };
