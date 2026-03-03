# ICHRA Legislation Watch

An independent, open resource tracking ICHRA (Individual Coverage Health Reimbursement Arrangement) legislation across the United States. Free for everyone.

🌐 **Live site:** [ichratracker.com](https://ichratracker.com)

---

## About

ICHRA Legislation Watch tracks state and federal legislation related to Individual Coverage Health Reimbursement Arrangements. The site provides a neutral, non-partisan view of where ICHRA-related bills stand across the country — including tax credits, eligibility rules, and bill progress through state legislatures and Congress.

### Features

- **Interactive US map** — color-coded by legislation status (enacted, passed one chamber, introduced)
- **State legislation table** — sortable with bill details, tax credits, and last action dates
- **Federal bill tracker** — chamber-by-chamber progress for federal ICHRA bills
- **News feed** — latest ICHRA legislation updates with source links
- **Resources** — curated links to official sources and ICHRA information

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Data Updates

Currently in **Phase 1** (manual updates). Legislation data lives in `src/data/legislation.ts`. See [ROADMAP.md](ROADMAP.md) for the plan to automate via LegiScan API in Phase 2.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **react-simple-maps** + d3-geo
- **Vercel** (hosting) + **Cloudflare** (DNS & email)

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full development roadmap including:
- ✅ Phase 1: MVP (complete)
- 🔜 Phase 2: LegiScan API integration
- 🔮 Phase 3: Real-time updates & notifications

## Sponsors

This project is supported by its sponsors. See the [Sponsors page](https://ichratracker.com/sponsors) or contact info@ichratracker.com.

---

_An independent project. Not affiliated with any government agency or ICHRA vendor._
