# ICHRA Legislation Watch — Roadmap

> Tracking the phased development of ichratracker.com

---

## Phase 1: MVP — Manual Data & Static Site ✅

_Status: **Complete** (launched March 2026)_

- [x] Interactive US map with color-coded state legislation status
- [x] State abbreviation labels on map
- [x] State legislation table (desktop + mobile responsive)
- [x] Federal bill tracker with chamber progress bars
- [x] Side-by-side layout: map + federal sidebar (desktop)
- [x] News feed with source URLs
- [x] Resources section with external links
- [x] Sponsors page (`/sponsors`) with founding sponsor logos
- [x] Footer with disclaimer, quick links, sponsor info
- [x] Navigation with anchor links + multi-page routing
- [x] `lastActionDate` displayed across all components
- [x] Full fact-check of all 9 state bills and 3 federal bills
- [x] Deployed to Vercel at ichratracker.com
- [x] Cloudflare DNS + email routing (info@ichratracker.com)
- [x] Manual data updates via `src/data/legislation.ts`

### Current Data Coverage (Phase 1)
- **9 states tracked:** IN, OH, GA, MS, TX, AZ, WI, NH, FL
- **3 federal bills tracked:** H.R. 6703, H.R. 6708, H.R. 1
- **9 news items** with source URLs

---

## Phase 2: LegiScan API Integration 🔜

_Status: **In Progress** — API key approved March 2026_

The goal is to automate legislation data updates by integrating the [LegiScan API](https://legiscan.com/legiscan) so the site stays current without manual edits.

### LegiScan Account & Compliance
- **API Key:** Approved (Public API, free tier)
- **Monthly limit:** 30,000 queries (resets on the 1st)
- **Data license:** Creative Commons Attribution 4.0 (CC BY 4.0)
- **Attribution required:** LegiScan must be credited as the legislative data source
- [x] Add LegiScan attribution to footer with CC BY 4.0 link
- [x] Store API key securely (Vercel environment variable — `LEGISCAN_API_KEY`)
- [ ] Review CC BY 4.0 terms for full compliance

### Compliance Rules (from LegiScan Crash Course)
- **Use hashes:** Always compare `change_hash` / `dataset_hash` before re-fetching. Failure to use `dataset_hash` = suspended access.
- **No scraping:** legiscan.com frontend scraping is prohibited.
- **One API key:** Creating multiple Public API keys is prohibited.
- **Cache locally:** Store JSON responses to minimize query spend.
- **No duplicate dataset downloads:** Use `dataset_hash` to prevent re-downloading unchanged datasets.

### Scope & Query Strategy
- **Coverage:** All 50 states + federal (US Congress)
- **Bill volume:** ~50–75 ICHRA-related bills active at any given time
- **Polling cadence:** Weekly automated polling (Vercel Cron, Sundays 10am UTC)
- **Search terms:** `ICHRA`, `"individual coverage health reimbursement arrangement"`, `"individual coverage HRA"`, `"individual coverage health reimbursement"`
- **Relevance threshold:** Minimum 50% relevance score from LegiScan search
- **Infrastructure:** Vercel serverless functions + Supabase (Postgres)

### Data Processing Pipeline
- **Storage:** Supabase (Postgres) — `bills`, `sync_log`, `search_cache` tables
- **Sync workflow:** LegiScan `getSearchRaw` → compare `change_hash` → `getBill` for changed bills → upsert to Supabase
- **Human editorial review:** Review new/changed bills in Supabase dashboard before major updates
- **Fallback:** Static `legislation.ts` data used if Supabase is unavailable

### 2.1 — LegiScan API Setup ✅
- [x] Receive API key approval from LegiScan
- [x] Store API key securely (Vercel environment variable)
- [x] Build API client (`src/lib/legiscan.ts`) with `searchBills()`, `getBill()`, status mapping
- [x] Document rate limits and compliance rules
- [x] Choose database: Supabase (Postgres, free tier, 500MB)

### 2.2 — Database & Data Pipeline ✅
- [x] Design database schema (`supabase/schema.sql`): `bills`, `sync_log`, `search_cache`
- [x] Map LegiScan status codes → our `LegislationStatus` categories (enacted, passed_one_chamber, introduced, no_activity)
- [x] Build data access layer (`src/lib/data.ts`) with Supabase → static fallback
- [x] Normalize LegiScan data to match `StateLegislation` and `FederalBill` interfaces
- [x] Derive house/senate chamber status from bill history
- [x] Handle new states automatically (no hardcoded state list)
- [x] Row-level security: public read, service-role write

### 2.3 — Scheduled Data Refresh ✅
- [x] Create sync API route (`/api/sync`) with auth via `CRON_SECRET`
- [x] Implement weekly Vercel Cron (Sundays 10am UTC, after LegiScan's 5am ET dataset build)
- [x] Hash-based change detection: only fetch full bill details when `change_hash` differs
- [x] Sync logging: track queries used, bills found/created/updated, errors
- [x] Fallback to static data if Supabase is unavailable
- [x] ISR revalidation every 1 hour for frontend data freshness

### 2.4 — AI Summarization Layer (Future)
- [ ] Build LLM pipeline to summarize bill text for ICHRA relevance
- [ ] Flag ICHRA-specific provisions (tax credits, eligibility, caps)
- [ ] Human review queue: admin interface to approve/edit AI summaries before publish
- [ ] Fallback: manual summary entry when AI confidence is low

### 2.5 — Congress.gov Integration (Federal Bills)
- [ ] Research Congress.gov API or bulk data options
- [ ] Build federal bill data fetcher (supplement LegiScan if needed)
- [ ] Map federal bill statuses to existing `FederalBill` interface

### 2.6 — Data Validation & Quality
- [ ] Add data validation layer (reject bad/incomplete API responses)
- [ ] Compare API data against known-good snapshot to catch anomalies
- [ ] Build simple admin/status page to monitor data health
- [ ] Alert mechanism if data hasn't updated in 7+ days

### 2.7 — Expand Coverage to All 50 States
- [x] Set up LegiScan keyword monitoring for ICHRA-related terms across all 50 states
- [x] Auto-detect new state bills as they're introduced
- [ ] Auto-generate news items from significant status changes
- [ ] Add more federal bills as they're introduced
- [x] Map dynamically shows all states with live data (no hardcoded list)

---

## Phase 3: Real-Time Updates & Notifications 🔮

_Status: **Future** — Supabase real-time capabilities available when ready_

### 3.1 — Real-Time Data Push
- [ ] Evaluate LegiScan push/webhook options vs. frequent polling
- [ ] Implement Supabase real-time subscriptions for live UI updates
- [ ] Show "last updated" timestamp prominently on the site
- [ ] Real-time status badge changes on the map without page reload

### 3.2 — Email / Notification System
- [ ] Email subscription form (collect email + state preferences)
- [ ] Email service integration (e.g., Resend, SendGrid, or Cloudflare Workers)
- [ ] Weekly digest: summary of all ICHRA legislation changes
- [ ] Instant alerts: notify subscribers when a bill in their state changes status
- [ ] Unsubscribe / manage preferences page

### 3.3 — Enhanced News Feed
- [ ] Auto-generate news items from bill status changes
- [ ] Pull related news via Google News API or RSS feeds
- [ ] Tag news by state and federal
- [ ] Search/filter news feed

### 3.4 — Analytics & Insights
- [ ] Track site visitors (privacy-friendly: Plausible or Umami)
- [ ] Show trending states / most-viewed bills
- [ ] Historical timeline: visualize a bill's journey over time
- [ ] Comparison view: side-by-side state bill comparison

---

## Backlog / Nice-to-Haves

_Features to consider as the project grows._

- [ ] **Individual state pages** — dedicated `/state/GA` page with full bill details, history, and related news
- [ ] **Bill detail pages** — `/bill/GA-HB1110` with full text, sponsors, vote history
- [ ] **Search** — search bills by keyword, state, sponsor, or status
- [ ] **Dark mode** — toggle for dark/light theme
- [ ] **Embeddable map widget** — iframe-able map for other sites/blogs
- [ ] **PDF/CSV export** — download legislation data for research
- [ ] **SEO optimization** — dynamic meta tags, Open Graph images per state
- [ ] **Accessibility audit** — full WCAG 2.1 AA compliance review
- [ ] **Mobile app** — React Native wrapper or PWA
- [ ] **Contributor guide** — open-source contribution guidelines if we open contributions
- [ ] **Sponsor dashboard** — private page for sponsors to see site traffic/engagement

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Map | react-simple-maps + d3-geo |
| Database | Supabase (Postgres) |
| Hosting | Vercel (hobby tier) |
| DNS | Cloudflare |
| Email | Cloudflare Email Routing |
| Data (Phase 1) | Static TypeScript (`legislation.ts`) — fallback |
| Data (Phase 2) | LegiScan API → Supabase → ISR |
| Cron | Vercel Cron (weekly, Sundays 10am UTC) |
| Repo | github.com/jandrew73/ichra-watch |

---

_Last updated: March 20, 2026_
