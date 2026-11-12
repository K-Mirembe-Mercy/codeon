// Cloudflare Pages Function: POST /api/lead
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const activeTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (activeTimestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
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
    'Access-Control-Allow-Headers': 'Content-Type',
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
  const { request } = context;
  const corsHeaders = getCorsHeaders(request);

  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown-ip';

  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({
        error: 'Too many submissions. Please reach out directly to the team via email or WhatsApp.',
      }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON payload.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const { name, contact, organization, need, arm, honeypot, _hp } = body || {};

  // Spam Honeypot check: If honeypot is filled, discard silently as 200 OK
  if (honeypot || _hp) {
    return new Response(
      JSON.stringify({ success: true, message: 'Inquiry received.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Field validations
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return new Response(
      JSON.stringify({ error: 'Please provide a valid name (at least 2 characters).' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!contact || typeof contact !== 'string' || contact.trim().length < 5) {
    return new Response(
      JSON.stringify({ error: 'Please provide an email address or WhatsApp phone number.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!need || typeof need !== 'string' || need.trim().length < 5) {
    return new Response(
      JSON.stringify({ error: 'Please briefly describe your project or inquiry.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Determine target inbox based on arm
  let destinationEmail = 'info@codeondigital.com';
  const cleanArm = (arm || '').toLowerCase().trim();
  if (cleanArm === 'school' || cleanArm === 'outreach') {
    destinationEmail = 'school@codeondigital.com';
  } else if (cleanArm === 'chapter' || cleanArm === 'events' || cleanArm === 'partner') {
    destinationEmail = 'chapter@codeondigital.com';
  }

  // Sanitized operational logging (no sensitive secrets or credentials)
  console.log(`[LEAD_SUBMISSION] arm=${cleanArm || 'agency'} target=${destinationEmail} org=${(organization || '').slice(0, 50)} ts=${new Date().toISOString()}`);

  return new Response(
    JSON.stringify({
      success: true,
      message: `Thank you, ${name.trim()}! Your message has been routed to our ${cleanArm || 'agency'} team (${destinationEmail}). We will reach out to you shortly.`,
      destinationEmail,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
