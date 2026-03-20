# ICHRA Watch — Phase 2 Setup Guide

Follow these steps to connect LegiScan + Supabase and enable automated data syncing.

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up / log in
2. Click **New Project**
3. Name it `ichra-watch` (or whatever you prefer)
4. Choose a region close to your Vercel deployment (e.g., US East)
5. Set a database password (save it somewhere safe)
6. Wait for the project to finish provisioning (~2 minutes)

## Step 2: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the contents of `supabase/schema.sql` from the repo
4. Paste it in the SQL editor and click **Run**
5. You should see "Success. No rows returned" — that's correct
6. Verify by going to **Table Editor** — you should see `bills`, `sync_log`, and `search_cache` tables

## Step 3: Get Your Supabase Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these three values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (safe for client-side)
   - **service_role** key (server-side only — never expose to client)

## Step 4: Generate a Cron Secret

Run this in your terminal:
```bash
openssl rand -hex 32
```
Save the output — this protects your sync endpoint from unauthorized access.

## Step 5: Add Environment Variables to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select the **ichra-watch** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables (all environments: Production, Preview, Development):

| Name | Value |
|------|-------|
| `LEGISCAN_API_KEY` | `71e3dbfa8dbd4eb9a2fbaaf5fdcb6433` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role key |
| `CRON_SECRET` | The hex string from Step 4 |

5. Click **Save** for each one

## Step 6: Add Local Environment Variables (for development)

Create a `.env.local` file in your project root:
```bash
cp .env.local.example .env.local
```
Then fill in the same values from Step 5.

## Step 7: Deploy

Push the code to GitHub — Vercel will auto-deploy:
```bash
git add -A && git commit -m "Add LegiScan + Supabase integration" && git push
```

## Step 8: Run First Sync

After deployment, trigger the first sync manually:
```bash
curl -X POST https://ichratracker.com/api/sync \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Check the response — you should see something like:
```json
{
  "success": true,
  "queries_used": 8,
  "bills_found": 45,
  "bills_created": 45,
  "bills_updated": 0,
  "bills_unchanged": 0
}
```

## Step 9: Verify

1. Check your Supabase **Table Editor** → `bills` table — you should see rows
2. Check `sync_log` table — should show a completed sync run
3. Visit ichratracker.com — the site should now show data from Supabase
4. If Supabase has no data (or is unreachable), the site falls back to the static `legislation.ts` data

---

## How It Works

### Weekly Sync (Automatic)
- Vercel Cron runs `/api/sync` every Sunday at 10am UTC
- The sync searches LegiScan for ICHRA-related bills
- It compares `change_hash` values to detect changes
- Only changed/new bills are fetched in detail (saves API queries)
- Results are upserted into Supabase

### Data Flow
```
LegiScan API → /api/sync → Supabase (bills table) → page.tsx (server component) → UI
```

### Fallback
If Supabase is not configured or has no data, the site reads from `src/data/legislation.ts` (the Phase 1 static data). This ensures the site never goes blank.

### Query Budget
With ~50-75 ICHRA bills and weekly polling:
- 4 search queries (one per search term)
- ~10-50 getBill queries (only for changed bills)
- **Total: ~15-55 queries per week, well under the 30,000/month limit**

---

## Troubleshooting

- **Sync returns 401:** Check that `CRON_SECRET` matches in Vercel env vars and your curl header
- **No data in Supabase:** Check `sync_log` table for errors. Common: missing env vars
- **Site shows old data:** ISR revalidates every 1 hour. Force refresh by redeploying.
- **LegiScan errors:** Check if API key is valid at https://legiscan.com/legiscan
