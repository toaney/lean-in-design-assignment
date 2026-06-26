# Lean In — Design Assignment
**Thomas Toan**

A full-stack recreation of [leanin.org](https://leanin.org), rebuilt with a modern frontend stack and a lightweight Python API. The three main pages — Home, Articles, and Circles — were redesigned to address color contrast failures, improve navigation ergonomics, and introduce stronger visual hierarchy.

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Setup

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Build and start all services:

   ```bash
   docker compose up --build
   ```

Once running:

| Service      | URL                        |
| ------------ | -------------------------- |
| Frontend     | http://localhost:3000      |
| Backend API  | http://localhost:8000      |
| PostgreSQL   | localhost:5432             |

### Environment Variables

Supplied via `.env` in the project root, loaded automatically by Docker Compose. `.env` is git-ignored — copy `.env.example` to get started.

| Variable      | Description            | Default        |
| ------------- | ---------------------- | -------------- |
| `DB_USER`     | PostgreSQL username    | `dev_user`     |
| `DB_PASSWORD` | PostgreSQL password    | `dev_password` |
| `DB_NAME`     | PostgreSQL database    | `dev_db`       |

---

## Architecture

```
.
├── frontend/      # Next.js 15 (App Router)
├── backend/       # FastAPI + Uvicorn
└── docker-compose.yml
```

Three Docker services share an internal `app-network`: a PostgreSQL 16 database, a FastAPI backend that proxies article and circle data, and a Next.js frontend that server-renders pages and fetches from the API.

---

## Technical Decisions

### Next.js 15 (App Router)

The original leanin.org is a server-rendered Django/Wagtail site. Next.js App Router replicates that model: server components fetch data at request time (good for SEO and first-paint), while client components handle interactivity. The key benefits for this project were:

- **Image optimization** via `next/image` — the site is image-heavy. Serving correctly sized, WebP-encoded images per viewport is the single biggest lever for page load performance.
- **SSR + hydration** — article listings and circle data render server-side; interactive elements (filter bar, scroll experience, network graph) hydrate on the client without a full SPA payload.
- **File-based routing** — `/app/page.tsx`, `/app/articles/page.tsx`, `/app/circles/page.tsx` map directly to pages with zero router configuration.

The tradeoff is complexity. The server/client component boundary requires discipline — hooks can't run in server components, and `'use client'` must be placed carefully to avoid shipping unnecessary JS. For a simple content site, Pages Router would have been simpler. App Router is the right bet for production extensibility.

### Tailwind CSS v4

Utility-first CSS with a `@theme` block that defines brand tokens as CSS custom properties (`--color-primary`, `--color-charcoal`, etc.). This means the same variables are available both as Tailwind utilities (`text-primary`, `bg-charcoal`) and in inline styles or Canvas code, keeping the design system consistent across rendering contexts.

The tradeoff: v4 is still maturing. Some v3 patterns (plugins, `@apply`) behave differently, and arbitrary values like `top-[80px]` accumulate quickly. A production project would audit these back into the theme.

### FastAPI + Uvicorn (Backend)

FastAPI was chosen for its Pydantic-based request/response validation, automatic OpenAPI documentation, and minimal boilerplate. Uvicorn provides the ASGI runtime.

In practice, the current backend serves article and circle data from structured files rather than live database queries — SQLAlchemy and psycopg2 are declared in `requirements.txt` for extensibility but aren't exercised at runtime. The separation into a dedicated backend service mirrors the real site's Django API architecture and makes it straightforward to swap in a real database layer later.

The more pragmatic choice for a frontend-focused assignment would have been Next.js Route Handlers, which would eliminate the second service and the CORS configuration entirely.

---

## Dependency Rationale

### Framer Motion v11

Used for the `/circles` ScrollExperience component — a scroll-jacked sequence where each of the six Circle steps animates in as the user scrolls through a sticky viewport. It's also used for `whileInView` entrance animations on the home page network graph and for `AnimatePresence` transitions.

Building this from scratch would mean managing scroll listeners, `requestAnimationFrame` loops, easing math, and cleanup — several hundred lines of infrastructure code that isn't the product. Framer Motion's `useScroll`, `useTransform`, and `motion` primitives make it declarative and composable with React.

The cost is ~50KB gzipped added to the client bundle, which matters on a content-heavy page. This is mitigated by lazy-loading client components and ensuring server-rendered content is visible before the bundle arrives.

### D3 v7

Powers two network graph visualizations: a force-directed SVG graph on the Home page (using D3's force simulation for node positioning and React for SVG rendering) and a Canvas-based animated graph on the Circles page (pure D3 + Canvas API, no React in the render loop for performance).

Lean In is a data-heavy organization — having D3 in the stack means future data visualizations (report charts, Circle growth graphs) can be built without adding another dependency. The force-directed graph specifically encodes the brand idea of connected communities in a way static illustrations can't.

The risk: D3 is large and its DOM-mutation model fights React's reconciler. The integration pattern used here — D3 computes positions, React or Canvas handles rendering — is the correct boundary and avoids the conflict.

### Masonic

The Articles page uses a masonry layout: variable-height cards in aligned columns. This can't be achieved with CSS Grid alone when card heights vary by content length. Masonic adds virtualization on top of the layout — only cards in the viewport are in the DOM, which matters when paginating through 100+ results.

Building this from scratch requires a `ResizeObserver` per card, a column-height tracker, absolute positioning math, and scroll-based virtualization — roughly 400 lines of layout code with no user-facing value. Masonic is a focused, small library that solves exactly this.

The caveat: it requires `ssr: false` via `next/dynamic` because it measures the DOM to compute column heights. This means the grid renders client-side only, producing a brief layout shift after hydration.

---

## Design Decisions

### Color System

The original site has inconsistent background color usage that creates WCAG AA contrast failures — light-colored text on light backgrounds in several sections. The redesign establishes a constrained palette: warm red (`#C44536`), charcoal near-black (`#222222`), teal (`#197278`), and white, with `#EDDDD4` warm sand used as a section accent. All text/background combinations were checked against the 4.5:1 AA minimum for body text and 3:1 for large text.

Lean In's brand red underline on the wordmark was preserved and carried into the active nav link indicator.

### Navigation

The original header uses a mega-menu pattern that works well on mobile but feels heavy on desktop — hover areas are large and the dropdown obscures content. The redesign uses a flat nav bar with text links on desktop, collapsing to a hamburger drawer on mobile. The "Sign In" button is a ghost pill that takes minimal visual weight. Search opens a full-width overlay rather than a dropdown, keeping the bar uncluttered.

### Home Page

The page was rebuilt to give the whole site a shared visual foundation. Key changes:

- **HeroSection** — leads with the mission statement ("We inspire and equip women to lead") with a supporting portrait image. Stats (150K+ Circles, 180+ countries) are surfaced immediately below the headline to establish credibility.
- **Circles section** — the original scrolling circle animation was replaced with a D3 force-directed network graph as a background element, which better communicates the idea of connected global communities.
- **Women in the Workplace** — the McKinsey report cover image anchors the left column at all breakpoints, with key findings as horizontal image-plus-text rows on small screens and a three-column grid on large screens.

### Circles Page

The page has two states driven by login status:

- **Logged out** — prioritizes conversion: a full-height hero with the animated network graph, followed by the six-step ScrollExperience, the "Why It Works" stats section, testimonials, and a final CTA.
- **Logged in** — skips the onboarding content and surfaces a Circle discovery directory instead. The same network graph background is used to maintain visual continuity.

Given more time: a map of active Circles for geographic discovery, and a "Message this Circle" CTA alongside "Request to Join" for users relocating to a new city.

### Articles Page

The original article listing is a standard paginated list. The redesign replaces it with a masonry grid that gives readers a richer visual overview of available content — varying card heights mean more articles are visible above the fold.

Filter behavior differs by viewport: on desktop, two rows of filter pills (Topics and "This is for") are always visible in a sticky bar. On mobile, these collapse into a single "Filters" button with an active-count badge, opening an overlay panel to avoid consuming the full screen with filter chrome.

Article cards surface topic tags, making it easier to orient to content type at a glance.

---

## Known Gaps & Future Work

- Bring in remaining content from the original site; fix broken external links
- Map view for Circle discovery in the logged-in state
- Skeleton loaders for the masonry grid to reduce layout shift on hydration
- Per-route bundle analysis to right-size D3 and Framer Motion imports
- Broader responsive QA, particularly for tablet breakpoints
- Placeholder images replaced with content-relevant photography
