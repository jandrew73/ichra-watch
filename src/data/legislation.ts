// ICHRA Legislation Tracker - Data File
// Last updated: 2026-03-03 (fact-checked and corrected)
// Phase 1: Manual updates. Phase 2: LegiScan API integration.

export type LegislationStatus =
  | "enacted"
  | "passed_one_chamber"
  | "introduced"
  | "no_activity";

export type ChamberStatus =
  | "passed"
  | "pending"
  | "not_introduced"
  | "committee";

export interface StateLegislation {
  state: string;
  stateCode: string;
  status: LegislationStatus;
  billNumber: string;
  billName?: string;
  summary: string;
  taxCredit?: string;
  eligibility?: string;
  cap?: string;
  houseStatus: ChamberStatus;
  senateStatus: ChamberStatus;
  lastAction: string;
  lastActionDate: string;
  sourceUrl?: string;
}

export interface FederalBill {
  id: string;
  billNumber: string;
  title: string;
  shortTitle: string;
  summary: string;
  houseStatus: "passed" | "pending" | "not_introduced" | "committee";
  senateStatus: "passed" | "pending" | "not_introduced" | "committee";
  signedIntoLaw: boolean;
  lastAction: string;
  lastActionDate: string;
  congress: string;
  sourceUrl?: string;
  notes?: string;
}

export interface NewsItem {
  id: string;
  date: string;
  headline: string;
  summary: string;
  state?: string;
  type: "state" | "federal" | "industry";
  sourceUrl?: string;
}

// ============================================================
// STATE LEGISLATION DATA
// ============================================================

export const stateLegislation: StateLegislation[] = [
  {
    state: "Indiana",
    stateCode: "IN",
    status: "enacted",
    billNumber: "HB 1004",
    billName: "HRA Tax Credit Program",
    summary:
      "First state to enact an HRA tax credit. Provides credits to small employers offering HRAs (including ICHRAs and QSEHRAs) to employees.",
    taxCredit: "$400/employee (Year 1), $200/employee (Year 2)",
    eligibility: "Employers with fewer than 50 employees",
    cap: "$10 million annual program cap",
    houseStatus: "passed",
    senateStatus: "passed",
    lastAction: "Signed into law by Governor Holcomb (effective Jan 1, 2024)",
    lastActionDate: "2023-05-04",
    sourceUrl: "https://iga.in.gov/legislative/2023/bills/house/1004",
  },
  {
    state: "Ohio",
    stateCode: "OH",
    status: "passed_one_chamber",
    billNumber: "HB 133",
    billName: "Ohio ICHRA Tax Credit Act",
    summary:
      "Passed House unanimously. Provides state tax credit for small employers adopting ICHRAs.",
    taxCredit: "$400/employee",
    eligibility: "Employers with 2-50 employees",
    houseStatus: "passed",
    senateStatus: "pending",
    lastAction: "Passed House unanimously; referred to Senate",
    lastActionDate: "2025-06-04",
    sourceUrl:
      "https://www.legislature.ohio.gov/legislation/136/hb133",
  },
  {
    state: "Georgia",
    stateCode: "GA",
    status: "introduced",
    billNumber: "HB 1110",
    billName: "Georgia Small Business Healthcare Affordability Act",
    summary:
      "Bipartisan bill providing tiered tax credits to small employers offering ICHRAs. Currently in House committee.",
    taxCredit:
      "$600/employee (Years 1-3), $400/employee (Year 4), $200/employee (Year 5)",
    eligibility: "Employers with 10 or fewer employees",
    cap: "$5 million annual program cap",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    lastAction: "Referred to House Ways and Means Committee",
    lastActionDate: "2026-02-03",
    sourceUrl:
      "https://www.legis.ga.gov/legislation/76893",
  },
  {
    state: "Mississippi",
    stateCode: "MS",
    status: "passed_one_chamber",
    billNumber: "SB 2868",
    billName: "Mississippi ICHRA Tax Credit Act",
    summary:
      "Passed Senate 49-0. Bipartisan legislation providing tax credits for small employer ICHRA adoption.",
    taxCredit: "Up to $400/employee",
    eligibility: "Employers with fewer than 50 employees",
    cap: "$10 million annual program cap",
    houseStatus: "pending",
    senateStatus: "passed",
    lastAction: "Passed Senate 49-0; referred to House",
    lastActionDate: "2026-02-25",
    sourceUrl:
      "http://billstatus.ls.state.ms.us/2026/pdf/history/SB/SB2868.xml",
  },
  {
    state: "Texas",
    stateCode: "TX",
    status: "introduced",
    billNumber: "SB 1949",
    summary:
      "Proposed state tax refund for small employers adopting ICHRAs. The 89th Legislature adjourned sine die without advancing the bill.",
    taxCredit: "Up to $400/employee",
    houseStatus: "not_introduced",
    senateStatus: "committee",
    lastAction:
      "Referred to Senate Committee on Business & Commerce; 89th Legislature adjourned sine die",
    lastActionDate: "2025-03-10",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=SB1949",
  },
  {
    state: "Arizona",
    stateCode: "AZ",
    status: "introduced",
    billNumber: "HB 2694",
    summary:
      "Introduced bill to create tax credit incentive for small employers to offer ICHRAs.",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    lastAction: "Introduced and referred to House Commerce Committee",
    lastActionDate: "2026-01-15",
    sourceUrl:
      "https://www.azleg.gov/legtext/57leg/1R/bills/HB2694S.htm",
  },
  {
    state: "Wisconsin",
    stateCode: "WI",
    status: "introduced",
    billNumber: "AB 915 / SB 896",
    summary:
      "Companion bills introduced in both chambers to establish ICHRA tax credit program.",
    houseStatus: "committee",
    senateStatus: "committee",
    lastAction: "Both bills referred to respective committees",
    lastActionDate: "2026-01-20",
  },
  {
    state: "New Hampshire",
    stateCode: "NH",
    status: "introduced",
    billNumber: "SB 635",
    summary:
      "Senate bill to provide tax incentives for ICHRA adoption among small businesses.",
    houseStatus: "not_introduced",
    senateStatus: "committee",
    lastAction: "Referred to Senate Commerce Committee",
    lastActionDate: "2025-11-15",
  },
  {
    state: "Florida",
    stateCode: "FL",
    status: "introduced",
    billNumber: "HB 141",
    billName: "Florida Employee Health Choices Program",
    summary:
      "Creates a state-facilitated platform for employees enrolled in ICHRAs to purchase individual health insurance plans. Effective July 1, 2026. Companion bills: SB 440, SB 1460.",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    lastAction:
      "Passed Health Care Facilities & Systems Subcommittee 12-3; referred to Insurance & Banking Subcommittee",
    lastActionDate: "2026-01-13",
    sourceUrl:
      "https://www.myfloridahouse.gov/Sections/Bills/billsdetail.aspx?BillId=80953",
  },
];

// ============================================================
// FEDERAL LEGISLATION DATA
// ============================================================

export const federalBills: FederalBill[] = [
  {
    id: "hr6703",
    billNumber: "H.R. 6703",
    title: "Lower Health Care Premiums for All Americans Act",
    shortTitle: "Lower Health Care Premiums Act",
    summary:
      "Contains CHOICE Arrangement provisions to codify and expand ICHRAs. Passed the House 216-211 on December 17, 2025. Awaiting Senate action.",
    houseStatus: "passed",
    senateStatus: "pending",
    signedIntoLaw: false,
    lastAction: "Passed House 216-211; referred to Senate HELP Committee",
    lastActionDate: "2025-12-17",
    congress: "119th",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/6703",
    notes:
      "Key bill — contains CHOICE Arrangement language to codify ICHRAs into statute",
  },
  {
    id: "hr6708",
    billNumber: "H.R. 6708",
    title: "ICHRA Permanency Act",
    shortTitle: "ICHRA Permanency Act",
    summary:
      "Standalone bill to permanently codify ICHRA regulations into federal law, ensuring they cannot be reversed by future executive action.",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    signedIntoLaw: false,
    lastAction: "Introduced; referred to House Ways & Means and Education & Labor",
    lastActionDate: "2025-12-20",
    congress: "119th",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/6708",
  },
  {
    id: "hr1",
    billNumber: "H.R. 1",
    title: "One Big Beautiful Bill Act",
    shortTitle: "One Big Beautiful Bill",
    summary:
      "Omnibus reconciliation bill. Originally included CHOICE Arrangement provisions, but ICHRA/CHOICE language was stripped during Senate negotiations.",
    houseStatus: "passed",
    senateStatus: "passed",
    signedIntoLaw: true,
    lastAction: "Signed into law — but CHOICE provisions were removed in Senate",
    lastActionDate: "2025-07-04",
    congress: "119th",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/1",
    notes:
      "⚠️ ICHRA provisions were stripped. CHOICE codification must pass through other vehicles (H.R. 6703 or H.R. 6708).",
  },
];

// ============================================================
// NEWS FEED DATA
// ============================================================

export const newsItems: NewsItem[] = [
  {
    id: "news-1",
    date: "2026-02-03",
    headline: "Georgia ICHRA Tax Credit Bill Advances in Committee",
    summary:
      "HB 1110, the Georgia Small Business Healthcare Affordability Act, is referred to the House Ways and Means Committee for consideration.",
    state: "GA",
    type: "state",
  },
  {
    id: "news-2",
    date: "2026-02-25",
    headline: "Mississippi Senate Passes ICHRA Bill 49-0",
    summary:
      "SB 2868 passes the Mississippi Senate unanimously, providing tax credits up to $400 per employee for small businesses adopting ICHRAs.",
    state: "MS",
    type: "state",
  },
  {
    id: "news-3",
    date: "2025-12-17",
    headline: "House Passes H.R. 6703 with CHOICE Provisions",
    summary:
      "The Lower Health Care Premiums for All Americans Act passes 216-211, containing key CHOICE Arrangement language to codify ICHRAs.",
    type: "federal",
  },
  {
    id: "news-4",
    date: "2025-12-20",
    headline: "ICHRA Permanency Act Introduced in Congress",
    summary:
      "H.R. 6708 is introduced as a standalone bill to permanently codify ICHRA into federal statute.",
    type: "federal",
  },
  {
    id: "news-5",
    date: "2025-07-15",
    headline: "CHOICE Provisions Stripped from Reconciliation Bill",
    summary:
      "ICHRA codification language removed from H.R. 1 during Senate negotiations. Advocates look to standalone bills as alternative path.",
    type: "federal",
  },
  {
    id: "news-6",
    date: "2025-06-15",
    headline: "Ohio House Unanimously Passes ICHRA Tax Credit",
    summary:
      "HB 133 passes the Ohio House with full bipartisan support, offering $400/employee credits for small businesses.",
    state: "OH",
    type: "state",
  },
  {
    id: "news-7",
    date: "2026-01-15",
    headline: "Arizona Introduces ICHRA Legislation",
    summary:
      "HB 2694 introduced in Arizona to create tax credit incentives for small employers offering ICHRAs.",
    state: "AZ",
    type: "state",
  },
  {
    id: "news-8",
    date: "2026-01-20",
    headline: "Wisconsin Files Companion ICHRA Bills",
    summary:
      "AB 915 and SB 896 introduced in both Wisconsin chambers to establish an ICHRA tax credit program.",
    state: "WI",
    type: "state",
  },
];

// ============================================================
// HELPER / SUMMARY STATS
// ============================================================

export const getStatusColor = (status: LegislationStatus): string => {
  switch (status) {
    case "enacted":
      return "#22c55e"; // green
    case "passed_one_chamber":
      return "#f59e0b"; // amber
    case "introduced":
      return "#3b82f6"; // blue
    case "no_activity":
      return "#d1d5db"; // gray
    default:
      return "#d1d5db";
  }
};

export const getStatusLabel = (status: LegislationStatus): string => {
  switch (status) {
    case "enacted":
      return "Enacted";
    case "passed_one_chamber":
      return "Passed One Chamber";
    case "introduced":
      return "Introduced / In Committee";
    case "no_activity":
      return "No Activity";
    default:
      return "No Activity";
  }
};

export const summaryStats = {
  totalStatesWithActivity: stateLegislation.length,
  enacted: stateLegislation.filter((s) => s.status === "enacted").length,
  passedOneChamber: stateLegislation.filter(
    (s) => s.status === "passed_one_chamber"
  ).length,
  introduced: stateLegislation.filter((s) => s.status === "introduced").length,
  federalBillsTracked: federalBills.length,
};
