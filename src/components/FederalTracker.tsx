"use client";

import { federalBills, type FederalBill } from "@/data/legislation";

function PipelineStep({
  label,
  status,
  isLast = false,
}: {
  label: string;
  status: "complete" | "current" | "upcoming" | "removed";
  isLast?: boolean;
}) {
  const bgColor =
    status === "complete"
      ? "bg-green-500"
      : status === "current"
      ? "bg-amber-500 animate-pulse"
      : status === "removed"
      ? "bg-red-400"
      : "bg-gray-300";

  const textColor =
    status === "complete" || status === "current" || status === "removed"
      ? "text-white"
      : "text-gray-500";

  return (
    <div className="flex items-center">
      <div
        className={`${bgColor} ${textColor} text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap`}
      >
        {label}
      </div>
      {!isLast && (
        <div
          className={`w-6 h-0.5 ${
            status === "complete" ? "bg-green-400" : "bg-gray-300"
          }`}
        />
      )}
    </div>
  );
}

function BillPipeline({ bill }: { bill: FederalBill }) {
  const getHouseStep = () => {
    if (bill.houseStatus === "passed") return "complete";
    if (bill.houseStatus === "committee") return "current";
    return "upcoming";
  };

  const getSenateStep = () => {
    if (bill.senateStatus === "passed") return "complete";
    if (bill.senateStatus === "pending") return "current";
    if (bill.senateStatus === "committee") return "current";
    return "upcoming";
  };

  const getSignedStep = () => {
    if (bill.signedIntoLaw && bill.notes?.includes("stripped"))
      return "removed";
    if (bill.signedIntoLaw) return "complete";
    return "upcoming";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-gray-900">{bill.billNumber}</h3>
          <p className="text-sm font-medium text-blue-700">
            {bill.shortTitle}
          </p>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {bill.congress} Congress
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{bill.summary}</p>

      {/* Pipeline */}
      <div className="flex items-center flex-wrap gap-1 mb-3">
        <PipelineStep label="Introduced" status="complete" />
        <PipelineStep label="House" status={getHouseStep()} />
        <PipelineStep label="Senate" status={getSenateStep()} />
        <PipelineStep
          label={
            bill.signedIntoLaw && bill.notes?.includes("stripped")
              ? "Signed (ICHRA removed)"
              : "Signed into Law"
          }
          status={getSignedStep()}
          isLast
        />
      </div>

      {bill.notes && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded px-3 py-2 mt-2">
          {bill.notes}
        </p>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">{bill.lastAction}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Updated{" "}
            {new Date(bill.lastActionDate + "T00:00:00").toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            )}
          </p>
        </div>
        {bill.sourceUrl && (
          <a
            href={bill.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            View on Congress.gov →
          </a>
        )}
      </div>
    </div>
  );
}

export default function FederalTracker() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50" id="federal">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Federal Legislation Tracker
          </h2>
          <p className="text-gray-600">
            Tracking ICHRA-related bills through the 119th Congress
          </p>
        </div>

        <div className="grid gap-6">
          {federalBills.map((bill) => (
            <BillPipeline key={bill.id} bill={bill} />
          ))}
        </div>
      </div>
    </section>
  );
}
