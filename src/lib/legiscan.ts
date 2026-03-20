// LegiScan API client
// Docs: https://legiscan.com/legiscan
// License: CC BY 4.0 — Attribution required

const LEGISCAN_BASE = "https://api.legiscan.com/";

function getApiKey(): string {
  const key = process.env.LEGISCAN_API_KEY;
  if (!key) throw new Error("Missing LEGISCAN_API_KEY environment variable");
  return key;
}

interface LegiScanResponse {
  status: "OK" | "ERROR";
  [key: string]: unknown;
}

async function apiCall(
  op: string,
  params: Record<string, string> = {}
): Promise<LegiScanResponse> {
  const url = new URL(LEGISCAN_BASE);
  url.searchParams.set("key", getApiKey());
  url.searchParams.set("op", op);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`LegiScan API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.status === "ERROR") {
    throw new Error(
      `LegiScan API returned error: ${JSON.stringify(data.alert)}`
    );
  }

  return data;
}

// Search for bills matching a query string
// Returns raw results with change_hash for efficient change detection
export async function searchBills(
  query: string,
  state?: string
): Promise<{
  results: Record<
    string,
    {
      bill_id: number;
      change_hash: string;
      state: string;
      bill_number: string;
      title: string;
      relevance: number;
    }
  >;
  summary: { count: number; page: number; page_total: number };
}> {
  const params: Record<string, string> = { query };
  if (state && state !== "ALL") {
    params.state = state;
  }

  const data = await apiCall("getSearchRaw", params);
  const searchresult = data.searchresult as Record<string, unknown>;

  // Summary is in a special key
  const summary = searchresult.summary as {
    count: number;
    page: number;
    page_total: number;
  };

  // Remove summary to get just bill results
  const results: Record<string, {
    bill_id: number;
    change_hash: string;
    state: string;
    bill_number: string;
    title: string;
    relevance: number;
  }> = {};

  for (const [key, value] of Object.entries(searchresult)) {
    if (key !== "summary" && typeof value === "object" && value !== null) {
      results[key] = value as {
        bill_id: number;
        change_hash: string;
        state: string;
        bill_number: string;
        title: string;
        relevance: number;
      };
    }
  }

  return { results, summary };
}

// Get full bill details by bill_id
export async function getBill(billId: number): Promise<{
  bill: {
    bill_id: number;
    change_hash: string;
    state: string;
    state_id: number;
    bill_number: string;
    bill_type: string;
    title: string;
    description: string;
    session: { session_id: number; session_name: string };
    status: number;
    status_date: string;
    body: string;
    current_body: string;
    url: string;
    state_link: string;
    history: Array<{
      date: string;
      action: string;
      chamber: string;
      importance: number;
    }>;
    sponsors: Array<{
      people_id: number;
      name: string;
      party: string;
      role: string;
    }>;
    subjects: Array<{ subject_id: number; subject_name: string }>;
    [key: string]: unknown;
  };
}> {
  const data = await apiCall("getBill", { id: billId.toString() });
  return data as unknown as {
    bill: {
      bill_id: number;
      change_hash: string;
      state: string;
      state_id: number;
      bill_number: string;
      bill_type: string;
      title: string;
      description: string;
      session: { session_id: number; session_name: string };
      status: number;
      status_date: string;
      body: string;
      current_body: string;
      url: string;
      state_link: string;
      history: Array<{
        date: string;
        action: string;
        chamber: string;
        importance: number;
      }>;
      sponsors: Array<{
        people_id: number;
        name: string;
        party: string;
        role: string;
      }>;
      subjects: Array<{ subject_id: number; subject_name: string }>;
      [key: string]: unknown;
    };
  };
}

// Map LegiScan numeric status to our status categories
// LegiScan statuses: 1=Introduced, 2=Engrossed, 3=Enrolled, 4=Passed, 5=Vetoed, 6=Failed/Dead
export function mapLegiScanStatus(
  statusId: number,
  body: string,
  currentBody: string
): { label: string; category: string } {
  const labels: Record<number, string> = {
    0: "N/A",
    1: "Introduced",
    2: "Engrossed",
    3: "Enrolled",
    4: "Passed",
    5: "Vetoed",
    6: "Failed/Dead",
  };

  const label = labels[statusId] || "Unknown";

  // Map to our categories
  if (statusId === 4) return { label, category: "enacted" };
  if (statusId === 2 || statusId === 3) {
    // Engrossed = passed one chamber, Enrolled = passed both (awaiting signature)
    return { label, category: statusId === 3 ? "enacted" : "passed_one_chamber" };
  }
  if (statusId === 1) return { label, category: "introduced" };
  if (statusId === 5 || statusId === 6) return { label, category: "no_activity" };
  return { label, category: "introduced" };
}

// LegiScan state abbreviation to full name
export const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
  US: "US Congress",
};
