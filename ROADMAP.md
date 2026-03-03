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
- **9 states tracked:** AL, GA, IL, IN, MO, SC, UT, VA, WI
- **3 federal bills tracked:** CHOICE Arrangement Act, ICHRA Improvement Act, Bipartisan HSA Expansion
- **9 news items** with source URLs

---

## Phase 2: LegiScan API Integration 🔜

_Status: **Up Next**_

The goal is to automate legislation data updates by integrating the [LegiScan API](https://legiscan.com/legiscan) so the site stays current without manual edits.

### 2.1 — LegiScan API Setup
- [ ] Create LegiScan account and obtain API key
- [ ] Store API key securely (Vercel environment variable)
- [ ] Explore API endpoints: `getBill`, `getSearch`, `getMasterList`
- [ ] Document rate limits and data structure

### 2.2 — Data Pipeline
- [ ] Build API utility (`src/lib/legiscan.ts`) to fetch bill data
- [ ] Map LegiScan bill statuses → our `LegislationStatus` / `ChamberStatus` types
- [ ] Normalize LegiScan data to match existing `StateLegislation` and `FederalBill` interfaces
- [ ] Handle edge cases: bills with no status, unusual chamber flows, dead bills
- [ ] Add `lastUpdated` timestamp to track data freshness

### 2.3 — Scheduled Data Refresh
- [ ] Create Next.js API route or serverless function for data fetching
- [ ] Implement ISR (Incremental Static Regeneration) or cron-based revalidation
- [ ] Set refresh interval (e.g., every 6 hours)
- [ ] Add fallback to static data if API is unavailable
- [ ] Log update history for debugging

### 2.4 — Congress.gov Integration (Federal Bills)
- [ ] Research Congress.gov API or bulk data options
- [ ] Build federal bill data fetcher (supplement LegiScan if needed)
- [ ] Map federal bill statuses to existing `FederalBill` interface

### 2.5 — Data Validation & Quality
- [ ] Add data validation layer (reject bad/incomplete API responses)
- [ ] Compare API data against known-good snapshot to catch anomalies
- [ ] Build simple admin/status page to monitor data health
- [ ] Alert mechanism if data hasn't updated in 24+ hours

### 2.6 — Expand Coverage
- [ ] Set up LegiScan keyword monitoring for ICHRA-related terms across all 50 states
- [ ] Auto-detect new state bills as they're introduced
- [ ] Auto-generate news items from significant status changes
- [ ] Add more federal bills as they're introduced

---

## Phase 3: Real-Time Updates & Notifications 🔮

_Status: **Future**_

### 3.1 — Real-Time Data Push
- [ ] Evaluate LegiScan push/webhook options vs. frequent polling
- [ ] Implement WebSocket or Server-Sent Events for live UI updates
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
| Hosting | Vercel (hobby tier) |
| DNS | Cloudflare |
| Email | Cloudflare Email Routing |
| Data (Phase 1) | Static TypeScript (`legislation.ts`) |
| Data (Phase 2) | LegiScan API + ISR |
| Repo | github.com/jandrew73/ichra-watch |

---

_Last updated: March 3, 2026_
