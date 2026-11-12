# CodeOn Ventures (codeondigital.com)

Official website for **CodeOn Ventures Ltd.** — a Kampala-based student developer collective operating three primary arms:
1. **Student Dev Agency** (`agency.html`): Production web and mobile software development for startups and enterprise clients.
2. **Build. Solve. Belong.** (`outreach.html`): Hands-on school outreach and coding certification program across Uganda.
3. **Tech Events & Chapters** (`events.html`): Hackathons, community events, and technical workshops (e.g., U.S. Embassy American Center, Hack 4 Bodas).

---

## Architecture: Glass Studio & App-Shell

The website is engineered with a layered **Glass Studio** UI system inspired by modern command-dashboard aesthetics, strictly identity-locked to CodeOn's brand tokens (near-black `#05070C` and warm `#F9F9F7` base, vibrant blue `#1D4ED8`/`#2F6FED`, amber/clay `#B45309`/`#E2853E`).

### Key UI Features
- **Aurora Animated Background**: Smooth hardware-accelerated radial drift with subtle noise grain (`assets/css/glass.css`). Pauses automatically on background tabs via `visibilitychange` and under `prefers-reduced-motion: reduce`.
- **App-Shell Navigation**:
  - Configurable layout constant: `window.NAV_LAYOUT = "sidebar" | "topbar"` (Default: `"sidebar"`).
  - **Desktop (>= 1100px)**: Floating frosted glass sidebar (collapsible to 76px icon rail, state preserved in `localStorage`) with registration card pinned at the bottom.
  - **Floating Top Bar**: Fast search pill opening the Command Palette, theme cycler (Light/Dark/System), AI Sparkle launcher, dynamic events bell (checks `data/events.json`), and sticky "Work with us" CTA.
  - **Mobile (< 1100px)**: Floating glass bottom dock with 5 touch-optimized targets (48px hit areas), with the AI assistant launcher positioned safely above (`bottom: calc(76px + env(safe-area-inset-bottom))`) with **zero collision at 360px**.
- **Command Palette (`Ctrl+K` / `⌘K` or `/`)**: Modal fast navigation querying `data/search-index.json` with keyboard navigation (arrows, Enter, Esc) and instant fallback to CodeOn Guide.
- **Cross-Document View Transitions**: Smooth stage fade-and-blur navigation without layout shift.
- **Ultra-Lean Bundle Size**:
  - CSS: **~18 KB gzipped** total across all stylesheets (limit 40 KB).
  - JS: **~16 KB gzipped** total across all scripts (limit 60 KB).

---

## CodeOn Guide AI Assistant & WhatsApp

- **Official WhatsApp Number**: `+256 777 435942` (`https://wa.me/256777435942`).
  Configured centrally via `window.CODEON_WHATSAPP` and `window.CODEON_WHATSAPP_URL` across `assets/js/shell.js`, `assets/chat-widget.js`, and the contact page.
- **Persistent Routing**: Immediate fallback links to WhatsApp and `contact.html` in every assistant error and header menu.
- **Interactive Lead Capture**: Embedded lead forms and brief builders routing to `POST /api/lead` with honeypot spam guard.
- **Programmatic API**: `window.__CodeOnGuide.open(initialQuery)` and `window.__CodeOnGuide.close()` for seamless triggers from search or topbar buttons.

---

## Static Data Files (`data/`)

- `data/search-index.json`: Static index powering the Command Palette search, quick actions, and deep links.
- `data/events.json`: Event catalog containing `upcoming` and `past` event entries. The events bell indicator lights up only when `upcoming` contains active entries.
- `data/impact.json`: Metric store for the area chart and semicircle gauge. If empty or unverified, the impact section is automatically and cleanly hidden from the UI.

---

## Repository Structure

```
├── assets/
│   ├── css/
│   │   ├── glass.css            # Core glass tokens, aurora animations, and components
│   │   ├── glass-shell.css      # App-shell layout (sidebar, topbar, mobile dock)
│   │   └── command-palette.css  # Command palette modal styling
│   ├── js/
│   │   ├── shell.js             # Shell controller (sidebar collapse, event bell, greeting)
│   │   ├── command-palette.js   # Fast search dialog controller
│   │   └── contact-form.js      # Contact form submission and lead validation
│   ├── chat-widget.css          # Glass AI assistant panel styling
│   ├── chat-widget.js           # Streaming chat widget client
│   ├── theme.js                 # 3-state theme manager (Light / Dark / System)
│   └── icons.svg                # Lucide SVG symbol sprite
├── data/
│   ├── events.json              # Upcoming and past event records
│   ├── impact.json              # Data-driven impact metrics (hidden when empty)
│   └── search-index.json        # Fast search index for Command Palette
├── functions/
│   └── api/
│       ├── chat.js              # Cloudflare Pages Function (POST /api/chat SSE proxy)
│       ├── lead.js              # Cloudflare Pages Function (POST /api/lead)
│       ├── _prompt.js           # Server-side system prompt & guardrails
│       └── _knowledge.js        # Knowledge base module for edge runtime
├── images/                      # WebP images with JPEG fallbacks and dual brand logos
├── knowledge/
│   └── codeon.md                # Official ground-truth knowledge base
├── server/
│   ├── dev-server.js            # Zero-dependency local dev server
│   └── systemPrompt.js          # Standalone Node prompt & knowledge loader
├── test/
│   └── acceptance-checks.js     # Automated test suite (151 QA checks passing)
├── AUDIT.md                     # Comprehensive audit and fix verification report
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for SEO
├── package.json                 # Project scripts and test commands
└── [index, agency, outreach, events, team, contact].html  # Core pages
```

---

## Local Development & Testing

### 1. Run Local Server
```bash
npm run dev
# or: node server/dev-server.js
```
Open `http://localhost:3000` in your browser.

### 2. Run Quality Assurance Suite
```bash
npm test
# or: node test/acceptance-checks.js
```
Executes all 151 automated tests covering HTML validity, asset sizes, zero broken images, responsive constraints, rate limits, injection defense, theme toggle, and lead capture.

---

## Deploying to Cloudflare Pages

1. Connect the GitHub repository to Cloudflare Pages (`main` branch).
2. Build Settings:
   - Framework preset: `None`
   - Build command: *(leave blank)*
   - Build output directory: `.`
3. Set Environment Variables:
   - `ANTHROPIC_API_KEY`: Production Anthropic API key
   - `ANTHROPIC_MODEL`: `claude-3-5-sonnet-latest` (or `claude-3-5-haiku-latest`)
4. Deploy! Functions in `functions/api/` will handle `/api/chat` and `/api/lead` automatically.
