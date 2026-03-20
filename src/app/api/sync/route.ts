import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { searchBills, getBill, mapLegiScanStatus, stateNames } from "@/lib/legiscan";

// Vercel Cron: runs weekly on Sunday at 10am UTC (after LegiScan's 5am ET dataset build)
// Also callable manually via POST with CRON_SECRET header

// Core ICHRA search terms — covers direct ICHRA references + federal CHOICE bills
const SEARCH_TERMS = [
  "ICHRA",
  '"individual coverage health reimbursement arrangement"',
  '"individual coverage HRA"',
  '"individual coverage health reimbursement"',
  '"CHOICE arrangement"',
  '"health reimbursement arrangement" tax credit',
];

// Minimum relevance score to include a bill (LegiScan uses 0-100)
const MIN_RELEVANCE = 50;

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return runSync();
}

export async function POST(request: Request) {
  // Allow manual trigger with same auth
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return runSync();
}

async function runSync() {
  const supabase = getSupabaseAdmin();
  let queriesUsed = 0;
  let billsFound = 0;
  let billsUpdated = 0;
  let billsCreated = 0;

  // Create sync log entry
  const { data: logEntry } = await supabase
    .from("sync_log")
    .insert({ status: "running", search_terms: SEARCH_TERMS })
    .select("id")
    .single();

  const logId = logEntry?.id;

  try {
    // Step 1: Search for ICHRA-related bills across all states
    // Collect unique bills from all search terms
    const billMap = new Map<
      number,
      { bill_id: number; change_hash: string; state: string; bill_number: string; title: string }
    >();

    for (const term of SEARCH_TERMS) {
      const { results, summary } = await searchBills(term);
      queriesUsed++;

      for (const result of Object.values(results)) {
        // Filter by relevance
        if (result.relevance >= MIN_RELEVANCE) {
          billMap.set(result.bill_id, result);
        }
      }

      // Handle pagination if needed (each page is a separate query)
      if (summary.page_total > 1) {
        // For now, page 1 should cover our ~50-75 bills
        // Add pagination later if bill count grows
        console.log(
          `Search "${term}": ${summary.count} results across ${summary.page_total} pages`
        );
      }
    }

    billsFound = billMap.size;

    // Step 2: Check which bills need updating by comparing change_hash
    const billIds = Array.from(billMap.keys());

    // Get existing hashes from database
    const { data: existingBills } = await supabase
      .from("bills")
      .select("id, change_hash")
      .in("id", billIds);

    const existingHashMap = new Map<number, string>();
    if (existingBills) {
      for (const bill of existingBills) {
        existingHashMap.set(Number(bill.id), bill.change_hash);
      }
    }

    // Step 3: Fetch full details only for new or changed bills
    for (const [billId, searchResult] of billMap) {
      const existingHash = existingHashMap.get(billId);

      if (existingHash === searchResult.change_hash) {
        // Hash unchanged — skip this bill (use cached data)
        continue;
      }

      // Fetch full bill details
      const { bill } = await getBill(billId);
      queriesUsed++;

      // Map status
      const { label: statusLabel, category: statusCategory } =
        mapLegiScanStatus(bill.status, bill.body, bill.current_body);

      // Get last action from history
      const lastHistory =
        bill.history && bill.history.length > 0
          ? bill.history[bill.history.length - 1]
          : null;

      const billRecord = {
        id: bill.bill_id,
        state: bill.state,
        state_name: stateNames[bill.state] || bill.state,
        bill_number: bill.bill_number,
        bill_type: bill.bill_type,
        title: bill.title,
        description: bill.description,
        session_id: bill.session?.session_id,
        session_name: bill.session?.session_name,
        status_id: bill.status,
        status_label: statusLabel,
        status_category: statusCategory,
        body: bill.body,
        current_body: bill.current_body,
        url: bill.url,
        state_url: bill.state_link,
        change_hash: bill.change_hash,
        last_action: lastHistory?.action || null,
        last_action_date: lastHistory?.date || bill.status_date,
        sponsors: bill.sponsors || [],
        history: bill.history || [],
        subjects: bill.subjects || [],
        raw_json: bill,
      };

      // Upsert (insert or update)
      const { error } = await supabase
        .from("bills")
        .upsert(billRecord, { onConflict: "id" });

      if (error) {
        console.error(`Error upserting bill ${billId}:`, error);
        continue;
      }

      if (existingHash) {
        billsUpdated++;
      } else {
        billsCreated++;
      }
    }

    // Update sync log
    if (logId) {
      await supabase
        .from("sync_log")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          queries_used: queriesUsed,
          bills_found: billsFound,
          bills_updated: billsUpdated,
          bills_created: billsCreated,
        })
        .eq("id", logId);
    }

    return NextResponse.json({
      success: true,
      queries_used: queriesUsed,
      bills_found: billsFound,
      bills_created: billsCreated,
      bills_updated: billsUpdated,
      bills_unchanged: billsFound - billsCreated - billsUpdated,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    // Update sync log with error
    if (logId) {
      await supabase
        .from("sync_log")
        .update({
          status: "error",
          completed_at: new Date().toISOString(),
          queries_used: queriesUsed,
          error_message: message,
        })
        .eq("id", logId);
    }

    console.error("Sync error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
