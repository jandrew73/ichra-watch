// ICHRA Legislation Tracker - Data File
// Last updated: 2026-03-20 (updated via LegiScan API verification)
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
      "Bipartisan bill providing tiered tax credits to small employers offering ICHRAs. Passed House Ways and Means Committee; advancing to House Rules Committee.",
    taxCredit:
      "$600/employee (Years 1-3), $400/employee (Year 4), $200/employee (Year 5)",
    eligibility: "Employers with 10 or fewer employees",
    cap: "$5 million annual program cap",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    lastAction: "Passed House Ways and Means Committee; advancing to House Rules Committee",
    lastActionDate: "2026-03-02",
    sourceUrl:
      "https://www.legis.ga.gov/legislation/76893",
  },
  {
    state: "Mississippi",
    stateCode: "MS",
    status: "passed_one_chamber",
    billNumber: "SB 2868 / HB 343",
    billName: "Mississippi ICHRA Tax Credit Act",
    summary:
      "Companion bills passed both chambers with amendments. Senate declined to concur with House amendments; conference committee invited. Both bills advancing through conference.",
    taxCredit: "Up to $400/employee",
    eligibility: "Employers with fewer than 50 employees",
    cap: "$10 million annual program cap",
    houseStatus: "passed",
    senateStatus: "passed",
    lastAction: "Both chambers passed with amendments; declined to concur, conference committee invited",
    lastActionDate: "2026-03-19",
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
      "Senate bill to establish an HRA tax credit program. Senate Ways and Means Committee voted Ought to Pass with Amendment (3-2). Amendment adopted by voice vote; laid on table pending referral to Finance Committee.",
    houseStatus: "not_introduced",
    senateStatus: "committee",
    lastAction: "Senate adopted amendment by voice vote; laid on table pending referral to Finance Committee",
    lastActionDate: "2026-03-05",
    sourceUrl:
      "https://gc.nh.gov/bill_status/legacy/bs2016/bill_status.aspx?lsr=2214&sy=2026&sortoption=&txtsessionyear=2026&txtbillnumber=SB635",
  },
  {
    state: "Florida",
    stateCode: "FL",
    status: "introduced",
    billNumber: "HB 141 / SB 440 / SB 1460",
    billName: "Florida Employee Health Choices Program",
    summary:
      "Creates a state-facilitated platform for employees enrolled in ICHRAs to purchase individual health insurance plans. HB 141 died in Insurance & Banking Subcommittee (March 13). Companion Senate bills SB 440 and SB 1460 remain active in committee.",
    houseStatus: "not_introduced",
    senateStatus: "committee",
    lastAction:
      "HB 141 died in subcommittee; Senate companions SB 440 and SB 1460 still in committee",
    lastActionDate: "2026-03-13",
    sourceUrl:
      "https://www.flsenate.gov/Session/Bill/2026/440",
  },
  {
    state: "Connecticut",
    stateCode: "CT",
    status: "introduced",
    billNumber: "HB 5041",
    billName: "An Act Expanding Health Care Coverage",
    summary:
      "Governor's budget bill expanding health care coverage, including ICHRA-related provisions. Received Joint Favorable report from Human Services Committee.",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    lastAction: "Joint Favorable report from Human Services Committee",
    lastActionDate: "2026-03-19",
    sourceUrl:
      "https://www.cga.ct.gov/asp/cgabillstatus/cgabillstatus.asp?selBillType=Bill&bill_num=HB05041&which_year=2026",
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
  {
    id: "hr5463",
    billNumber: "H.R. 5463",
    title: "Choice Arrangement Act",
    shortTitle: "CHOICE Arrangement Act",
    summary:
      "Amends the Internal Revenue Code to provide for employer-provided health reimbursement arrangements integrated with individual market coverage. House companion to Senate CHOICE Act (S. 2875).",
    houseStatus: "committee",
    senateStatus: "not_introduced",
    signedIntoLaw: false,
    lastAction: "Referred to House Committee on Ways and Means",
    lastActionDate: "2025-09-18",
    congress: "119th",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/5463/all-info",
  },
  {
    id: "sb2875",
    billNumber: "S. 2875",
    title: "CHOICE Act — Custom Health Option and Individual Care Expense Act",
    shortTitle: "CHOICE Act",
    summary:
      "Senate bill to amend the Internal Revenue Code to provide for health reimbursement arrangements integrated with individual market coverage. Senate companion to H.R. 5463.",
    houseStatus: "not_introduced",
    senateStatus: "committee",
    signedIntoLaw: false,
    lastAction: "Read twice and referred to Committee on Finance",
    lastActionDate: "2025-09-18",
    congress: "119th",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/senate-bill/2875/all-info",
  },
];

// ============================================================
// NEWS FEED DATA
// ============================================================

export const newsItems: NewsItem[] = [
  {
    id: "news-15",
    date: "2026-03-19",
    headline: "Connecticut Introduces ICHRA-Related Health Coverage Bill",
    summary:
      "HB 5041, a Governor's budget bill expanding health care coverage with ICHRA provisions, receives Joint Favorable report from the Human Services Committee.",
    state: "CT",
    type: "state",
    sourceUrl:
      "https://www.cga.ct.gov/asp/cgabillstatus/cgabillstatus.asp?selBillType=Bill&bill_num=HB05041&which_year=2026",
  },
  {
    id: "news-14",
    date: "2026-03-19",
    headline: "Mississippi ICHRA Bills Head to Conference Committee",
    summary:
      "Both SB 2868 and companion HB 343 passed their opposing chambers with amendments. Both chambers declined to concur, inviting a conference committee to resolve differences.",
    state: "MS",
    type: "state",
    sourceUrl:
      "http://billstatus.ls.state.ms.us/2026/pdf/history/SB/SB2868.xml",
  },
  {
    id: "news-13",
    date: "2026-03-13",
    headline: "Florida HB 141 Dies in Subcommittee",
    summary:
      "HB 141, the Florida Health Choices Program bill, died in the Insurance & Banking Subcommittee. Senate companion bills SB 440 and SB 1460 remain active.",
    state: "FL",
    type: "state",
    sourceUrl:
      "https://www.flsenate.gov/Session/Bill/2026/141",
  },
  {
    id: "news-12",
    date: "2026-03-05",
    headline: "New Hampshire Senate Advances ICHRA Tax Credit Bill",
    summary:
      "SB 635 receives Ought to Pass with Amendment recommendation from Senate Ways and Means Committee (3-2 vote). Amendment adopted by voice vote; pending referral to Finance Committee.",
    state: "NH",
    type: "state",
    sourceUrl:
      "https://gc.nh.gov/bill_status/legacy/bs2016/bill_status.aspx?lsr=2214&sy=2026&sortoption=&txtsessionyear=2026&txtbillnumber=SB635",
  },
  {
    id: "news-11",
    date: "2025-09-18",
    headline: "CHOICE Arrangement Bills Introduced in Both Chambers",
    summary:
      "H.R. 5463 (House) and S. 2875 (Senate) introduced to codify employer-provided health reimbursement arrangements integrated with individual market coverage.",
    type: "federal",
    sourceUrl:
      "https://www.congress.gov/bill/119th-congress/house-bill/5463/all-info",
  },
  {
    id: "news-10",
    date: "2026-03-17",
    headline: "Mississippi House Passes Amended ICHRA Tax Credit Bill",
    summary:
      "HB 343, the companion ICHRA tax credit bill, passes the Mississippi Senate with amendments and is returned to the House for concurrence.",
    state: "MS",
    type: "state",
    sourceUrl:
      "http://billstatus.ls.state.ms.us/2026/pdf/history/HB/HB0343.xml",
  },
  {
    id: "news-9",
    date: "2026-03-02",
    headline: "Georgia HB 1110 Passes House Ways and Means Committee",
    summary:
      "HB 1110, the Georgia Small Business Healthcare Affordability Act, advances from the House Ways and Means Committee. The bill now moves to the House Rules Committee.",
    state: "GA",
    type: "state",
    sourceUrl: "https://www.legis.ga.gov/legislation/76893",
  },
  {
    id: "news-1",
    date: "2026-02-03",
    headline: "Georgia ICHRA Tax Credit Bill Advances in Committee",
    summary:
      "HB 1110, the Georgia Small Business Healthcare Affordability Act, is referred to the House Ways and Means Committee for consideration.",
    state: "GA",
    type: "state",
    sourceUrl: "https://www.legis.ga.gov/legislation/76893",
  },
  {
    id: "news-2",
    date: "2026-02-25",
    headline: "Mississippi Senate Passes ICHRA Bill 49-0",
    summary:
      "SB 2868 passes the Mississippi Senate unanimously, providing tax credits up to $400 per employee for small businesses adopting ICHRAs.",
    state: "MS",
    type: "state",
    sourceUrl: "http://billstatus.ls.state.ms.us/2026/pdf/history/SB/SB2868.xml",
  },
  {
    id: "news-3",
    date: "2025-12-17",
    headline: "House Passes H.R. 6703 with CHOICE Provisions",
    summary:
      "The Lower Health Care Premiums for All Americans Act passes 216-211, containing key CHOICE Arrangement language to codify ICHRAs.",
    type: "federal",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/6703",
  },
  {
    id: "news-4",
    date: "2025-12-20",
    headline: "ICHRA Permanency Act Introduced in Congress",
    summary:
      "H.R. 6708 is introduced as a standalone bill to permanently codify ICHRA into federal statute.",
    type: "federal",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/6708",
  },
  {
    id: "news-5",
    date: "2025-07-15",
    headline: "CHOICE Provisions Stripped from Reconciliation Bill",
    summary:
      "ICHRA codification language removed from H.R. 1 during Senate negotiations. Advocates look to standalone bills as alternative path.",
    type: "federal",
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/1",
  },
  {
    id: "news-6",
    date: "2025-06-15",
    headline: "Ohio House Unanimously Passes ICHRA Tax Credit",
    summary:
      "HB 133 passes the Ohio House with full bipartisan support, offering $400/employee credits for small businesses.",
    state: "OH",
    type: "state",
    sourceUrl: "https://www.legislature.ohio.gov/legislation/136/hb133",
  },
  {
    id: "news-7",
    date: "2026-01-15",
    headline: "Arizona Introduces ICHRA Legislation",
    summary:
      "HB 2694 introduced in Arizona to create tax credit incentives for small employers offering ICHRAs.",
    state: "AZ",
    type: "state",
    sourceUrl: "https://www.azleg.gov/legtext/57leg/1R/bills/HB2694S.htm",
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
