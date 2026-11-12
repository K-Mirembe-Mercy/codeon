# CodeOn Ventures (codeondigital.com)

Official website for **CodeOn Ventures Ltd.** — a Kampala-based student developer collective operating three primary arms:
1. **Student Dev Agency** (`agency.html`): High-quality production software development for startups and enterprise clients.
2. **Build. Solve. Belong.** (`outreach.html`): Hands-on school outreach and coding certification program across Uganda.
3. **Tech Events & Chapters** (`events.html`): Hackathons, community events, and technical workshops (e.g., U.S. Embassy American Center, Hack 4 Bodas).

---

## CodeOn Guide AI Assistant

A fast, mobile-first, floating AI assistant added across all site pages (`index.html`, `agency.html`, `outreach.html`, `events.html`, `team.html`, `contact.html`).

### Key Features
- **Mobile-First & Lightweight**: Vanilla JS and CSS bundle under 11 KB total gzipped. Zero external dependencies. Zero layout shift.
- **Three-Persona Guided Routing**:
  - *Clients / Startups* → Scopes problem, budget, and timeline; routes to Agency (`info@codeondigital.com`).
  - *Schools / Teachers* → Explains laptops & certification program; routes visit requests to Outreach (`school@codeondigital.com`).
  - *Students / Builders* → Connects to hackathons, local chapters, and Events (`chapter@codeondigital.com`).
- **Interactive Lead Capture**: Form embedded directly in the chat panel with honeypot spam protection, routed via `POST /api/lead`.
- **Direct Fallbacks**: Instant 1-tap "Chat on WhatsApp" fallback button and "Talk to a human" contact options.
- **Streaming & Memory**: Server-Sent Events (SSE) streaming with blinking cursor, typing indicator, Markdown-lite formatting, and session persistence per tab via `sessionStorage` (with safe `try/catch` fallbacks).
- **Strict Guardrails**: Strictly grounded in `knowledge/codeon.md`; never invents prices, dates, or timelines; rejects prompt injections and out-of-scope requests (e.g., homework/essays).
- **Accessible (WCAG AA)**: Focus trap in modal panel, `Esc` to close, `aria-live="polite"` region, 48px touch targets, and `prefers-reduced-motion` compliance.

---

## Repository Structure

```
├── assets/
│   ├── chat-widget.css          # Design-token-aligned styles (mobile sheet + desktop card)
│   └── chat-widget.js           # Vanilla streaming chat widget (<8KB gzipped)
├── functions/
│   └── api/
│       ├── chat.js              # Cloudflare Pages Function for POST /api/chat (SSE proxy)
│       ├── lead.js              # Cloudflare Pages Function for POST /api/lead
│       ├── _prompt.js           # Server-side system prompt & guardrails
│       └── _knowledge.js        # Seeded knowledge base module
├── knowledge/
│   └── codeon.md                # Official ground-truth knowledge base (easy to edit)
├── server/
│   ├── dev-server.js            # Zero-dependency local development server
│   └── systemPrompt.js          # Standalone Node prompt & knowledge loader
├── test/
│   └── acceptance-checks.js     # Automated test suite for all prompt acceptance checks
├── .env.example                 # Environment variables template
├── package.json                 # Scripts for local dev, testing, and deployment
└── [index, agency, outreach, events, team, contact].html  # Core pages
```

---

## Local Development & Setup

### 1. Prerequisites
- Node.js (v18+)

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` to supply your Anthropic API key:
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
ALLOWED_ORIGIN=https://codeondigital.com
```
*(Note: If no API key is set, the local dev server provides built-in mock responses so the widget UI and streaming can be tested immediately.)*

### 3. Run Local Server
Start the local server at `http://localhost:3000`:
```bash
npm run dev
# or: node server/dev-server.js
```
Open `http://localhost:3000` in your browser. The CodeOn Guide widget launcher will appear in the bottom-right corner of all pages.

---

## Running the Acceptance Checks

To run the automated acceptance test suite covering page includes, responsiveness, rate limiting, character limits, injection defense, out-of-scope refusals, and lead capture:

```bash
npm test
# or: node test/acceptance-checks.js
```

---

## Deploying to Cloudflare Pages

The backend API is pre-configured for **Cloudflare Pages Functions** in `/functions/api/`:
- `POST /api/chat` → Handled by `functions/api/chat.js`
- `POST /api/lead` → Handled by `functions/api/lead.js`

### Deployment Options

#### Option A: Connect via Git (Recommended)
1. In Cloudflare Dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select the `codeon` repository (`main` branch).
3. Build Settings:
   - Framework preset: `None`
   - Build command: *(leave blank)*
   - Build output directory: `.`
4. In the Pages project settings, go to **Settings** → **Environment variables** and add:
   - `ANTHROPIC_API_KEY`: Your production Anthropic API key
   - `ANTHROPIC_MODEL`: `claude-3-5-sonnet-latest` (or `claude-3-5-haiku-latest`)
5. Click **Deploy**. Your custom domain `codeondigital.com` will immediately route both static pages and `/api/*` functions automatically.

#### Option B: Deploy via Wrangler CLI
```bash
# Preview locally with Wrangler
npx wrangler pages dev .

# Deploy directly to Cloudflare Pages
npx wrangler pages deploy . --project-name=codeon
```

---

## How to Edit the Knowledge Base

1. Open `knowledge/codeon.md`.
2. Update team members, past events, descriptions, or contact information.
3. If deploying via Cloudflare Pages, update the corresponding export in `functions/api/_knowledge.js`.
4. Commit your changes:
```bash
git add knowledge/codeon.md functions/api/_knowledge.js
git commit -m "Update CodeOn knowledge base"
```
The assistant will immediately answer based on the updated facts on the next deployment.
