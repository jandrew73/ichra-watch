// Data access layer: fetches from Supabase if available, falls back to static data
// This is used by server components to get bill data at render time.

import { getSupabaseClient } from "./supabase";
import {
  stateLegislation as staticStateLegislation,
  federalBills as staticFederalBills,
  newsItems as staticNewsItems,
  type StateLegislation,
  type FederalBill,
  type NewsItem,
} from "@/data/legislation";

interface SupabaseBill {
  id: number;
  state: string;
  state_name: string;
  bill_number: string;
  title: string;
  description: string;
  status_id: number;
  status_category: string;
  status_label: string;
  body: string;
  current_body: string;
  session_name: string;
  url: string;
  state_url: string;
  last_action: string;
  last_action_date: string;
  sponsors: Array<{ name: string; party: string; role: string }>;
  history: Array<{ date: string; action: string; chamber: string }>;
  updated_at: string;
}

// Map LegiScan status_category to our LegislationStatus type
function mapStatusCategory(
  category: string
): "enacted" | "passed_one_chamber" | "introduced" | "no_activity" {
  switch (category) {
    case "enacted":
      return "enacted";
    case "passed_one_chamber":
      return "passed_one_chamber";
    case "introduced":
      return "introduced";
    default:
      return "no_activity";
  }
}

// Determine house/senate status from bill history
function deriveChamberStatuses(
  bill: SupabaseBill
): {
  houseStatus: "passed" | "pending" | "not_introduced" | "committee";
  senateStatus: "passed" | "pending" | "not_introduced" | "committee";
} {
  const history = bill.history || [];
  let houseStatus: "passed" | "pending" | "not_introduced" | "committee" =
    "not_introduced";
  let senateStatus: "passed" | "pending" | "not_introduced" | "committee" =
    "not_introduced";

  // Check history for chamber progress
  for (const entry of history) {
    const action = (entry.action || "").toLowerCase();
    const chamber = (entry.chamber || "").toUpperCase();

    if (chamber === "H" || action.includes("house")) {
      if (action.includes("passed") || action.includes("adopted")) {
        houseStatus = "passed";
      } else if (action.includes("committee")) {
        if (houseStatus !== "passed") houseStatus = "committee";
      } else {
        if (houseStatus === "not_introduced") houseStatus = "pending";
      }
    }

    if (chamber === "S" || action.includes("senate")) {
      if (action.includes("passed") || action.includes("adopted")) {
        senateStatus = "passed";
      } else if (action.includes("committee")) {
        if (senateStatus !== "passed") senateStatus = "committee";
      } else {
        if (senateStatus === "not_introduced") senateStatus = "pending";
      }
    }
  }

  // If bill originated in a chamber but no history details, at least mark as pending
  if (bill.body === "H" && houseStatus === "not_introduced") {
    houseStatus = "committee";
  }
  if (bill.body === "S" && senateStatus === "not_introduced") {
    senateStatus = "committee";
  }

  return { houseStatus, senateStatus };
}

// Convert a Supabase bill to our StateLegislation format
function toStateLegislation(bill: SupabaseBill): StateLegislation {
  const { houseStatus, senateStatus } = deriveChamberStatuses(bill);

  return {
    state: bill.state_name,
    stateCode: bill.state,
    status: mapStatusCategory(bill.status_category),
    billNumber: bill.bill_number,
    billName: bill.title,
    summary: bill.description || bill.title,
    houseStatus,
    senateStatus,
    lastAction: bill.last_action || "",
    lastActionDate: bill.last_action_date || "",
    sourceUrl: bill.state_url || bill.url,
  };
}

// Convert a Supabase federal bill to our FederalBill format
function toFederalBill(bill: SupabaseBill): FederalBill {
  const { houseStatus, senateStatus } = deriveChamberStatuses(bill);

  return {
    id: `legiscan-${bill.id}`,
    billNumber: bill.bill_number,
    title: bill.title,
    shortTitle: bill.title.length > 50 ? bill.title.slice(0, 50) + "..." : bill.title,
    summary: bill.description || bill.title,
    houseStatus,
    senateStatus,
    signedIntoLaw: bill.status_category === "enacted",
    lastAction: bill.last_action || "",
    lastActionDate: bill.last_action_date || "",
    congress: bill.session_name || "",
    sourceUrl: bill.state_url || bill.url,
  };
}

// Fetch state legislation: Supabase first, fallback to static
export async function getStateLegislation(): Promise<StateLegislation[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return staticStateLegislation;
  }

  try {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .neq("state", "US")
      .order("last_action_date", { ascending: false });

    if (error || !data || data.length === 0) {
      // No data in Supabase yet — fall back to static
      return staticStateLegislation;
    }

    return data.map((bill: SupabaseBill) => toStateLegislation(bill));
  } catch {
    return staticStateLegislation;
  }
}

// Fetch federal bills: Supabase first, fallback to static
export async function getFederalBills(): Promise<FederalBill[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return staticFederalBills;
  }

  try {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("state", "US")
      .order("last_action_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return staticFederalBills;
    }

    return data.map((bill: SupabaseBill) => toFederalBill(bill));
  } catch {
    return staticFederalBills;
  }
}

// News items remain static for now (Phase 2 doesn't auto-generate news)
export async function getNewsItems(): Promise<NewsItem[]> {
  return staticNewsItems;
}
