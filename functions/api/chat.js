// Cloudflare Pages Function: POST /api/chat
import { SYSTEM_PROMPT } from './_prompt.js';
import { KNOWLEDGE_BASE } from './_knowledge.js';

// In-memory sliding window rate limiter (per Cloudflare isolate)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 20; // 20 requests per window

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  // Evict timestamps older than 10 minutes
  const activeTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (activeTimestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }
  
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  
  // Cleanup map if too large
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = [
    'https://codeondigital.com',
    'https://www.codeondigital.com'
  ];
  const isAllowed =
    allowed.includes(origin) ||
    origin.endsWith('.pages.dev') ||
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:');

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://codeondigital.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(context.request),
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);

  // 1. IP extraction & Rate limiting
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown-ip';

  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests. Please wait a few minutes, or contact us directly on WhatsApp or info@codeondigital.com.',
        code: 'RATE_LIMIT_EXCEEDED',
        fallback: {
          email: 'info@codeondigital.com',
          whatsapp: 'https://wa.me/256700000000',
        },
      }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Retry-After': '600',
        },
      }
    );
  }

  // 2. Request payload validation & size check
  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > 50000) {
    return new Response(
      JSON.stringify({ error: 'Payload too large. Max request size is 50KB.' }),
      { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON request body.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: 'Messages must be a non-empty array.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // 3. Message validation & turn cap (max 12 turns, max 1,000 chars per message)
  const sanitizedMessages = [];
  for (const m of messages.slice(-12)) {
    if (!m || typeof m.content !== 'string' || !['user', 'assistant'].includes(m.role)) {
      continue;
    }
    const cleanContent = m.content.trim();
    if (!cleanContent) continue;

    if (m.role === 'user' && cleanContent.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Message exceeds the 1,000 character limit. Please shorten your question.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    sanitizedMessages.push({
      role: m.role,
      content: cleanContent.slice(0, 1000),
    });
  }

  if (sanitizedMessages.length === 0 || sanitizedMessages[sanitizedMessages.length - 1].role !== 'user') {
    return new Response(
      JSON.stringify({ error: 'The last message must be a valid user message.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // 4. API Credentials
  const apiKey = env?.ANTHROPIC_API_KEY;
  const model = env?.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest';

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'Claude API key is not configured on the server. Please contact info@codeondigital.com or use WhatsApp.',
        code: 'MISSING_API_KEY',
        fallback: {
          email: 'info@codeondigital.com',
          whatsapp: 'https://wa.me/256700000000',
        },
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // 5. Build full system prompt with knowledge base
  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n---\nOFFICIAL KNOWLEDGE BASE:\n${KNOWLEDGE_BASE}`;

  // 6. Upstream call to Anthropic Claude Messages API with streaming
  let upstreamResponse;
  try {
    upstreamResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: fullSystemPrompt,
        messages: sanitizedMessages,
        stream: true,
      }),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Could not connect to the AI service. Please try again or reach us at info@codeondigital.com.',
        details: err.message,
      }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!upstreamResponse.ok) {
    const errorText = await upstreamResponse.text();
    return new Response(
      JSON.stringify({
        error: 'The AI assistant encountered an issue. Please reach out via WhatsApp or email.',
        upstreamStatus: upstreamResponse.status,
        code: 'UPSTREAM_ERROR',
        fallback: {
          email: 'info@codeondigital.com',
          whatsapp: 'https://wa.me/256700000000',
        },
      }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // 7. Transform upstream Anthropic SSE stream into client-friendly SSE stream
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  (async () => {
    let buffer = '';
    const reader = upstreamResponse.body.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr || jsonStr === '[DONE]') {
            await writer.write(encoder.encode('data: [DONE]\n\n'));
            continue;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            if (
              parsed.type === 'content_block_delta' &&
              parsed.delta?.type === 'text_delta' &&
              typeof parsed.delta.text === 'string'
            ) {
              const outPayload = JSON.stringify({ text: parsed.delta.text });
              await writer.write(encoder.encode(`data: ${outPayload}\n\n`));
            } else if (parsed.type === 'message_stop') {
              await writer.write(encoder.encode('data: [DONE]\n\n'));
            }
          } catch {
            // Ignore non-JSON or heartbeat chunks
          }
        }
      }
      await writer.write(encoder.encode('data: [DONE]\n\n'));
    } catch (err) {
      const errPayload = JSON.stringify({
        error: 'Streaming interrupted. Please check your connection or contact info@codeondigital.com.',
      });
      await writer.write(encoder.encode(`data: ${errPayload}\n\n`));
    } finally {
      await writer.close();
    }
  })();

  return new Response(readable, {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
