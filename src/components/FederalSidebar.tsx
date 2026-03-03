"use client";

import { federalBills, type FederalBill } from "@/data/legislation";

function StatusDot({
  status,
}: {
  status: "passed" | "pending" | "not_introduced" | "committee";
}) {
  const color =
    status === "passed"
      ? "bg-green-500"
      : status === "committee" || status === "pending"
      ? "bg-amber-500"
      : "bg-gray-300";

  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}

function CompactBillCard({ bill }: { bill: FederalBill }) {
  const isStripped = bill.signedIntoLaw && bill.notes?.includes("stripped");

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h4 className="font-bold text-sm text-gray-900">{bill.billNumber}</h4>
        {bill.signedIntoLaw && !isStripped && (
          <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
            Signed
          </span>
        )}
        {isStripped && (
          <span className="text-[10px] font-semibold bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
            ICHRA Removed
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-blue-700 mb-1.5">
        {bill.shortTitle}
      </p>

      {/* Status row */}
      <div className="flex items-center gap-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <StatusDot status={bill.houseStatus} />
          House
        </span>
        <span className="flex items-center gap-1">
          <StatusDot status={bill.senateStatus} />
          Senate
        </span>
        <span className="ml-auto text-gray-400">
          {new Date(bill.lastActionDate + "T00:00:00").toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric", year: "numeric" }
          )}
        </span>
      </div>

      {isStripped && (
        <p className="text-[10px] text-amber-700 bg-amber-50 rounded px-2 py-1 mt-2 leading-relaxed">
          ICHRA provisions removed during Senate negotiations
        </p>
      )}
    </div>
  );
}

export default function FederalSidebar() {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <h3 className="font-bold text-gray-900 text-base mb-1">
        Federal Bills
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        119th Congress &middot; Applies to all 50 states
      </p>

      <div className="space-y-2.5">
        {federalBills.map((bill) => (
          <CompactBillCard key={bill.id} bill={bill} />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200 text-[10px] text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Passed
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          In Progress
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
          Not Yet
        </span>
      </div>

      <a
        href="#federal"
        className="block text-center text-xs text-blue-600 hover:text-blue-800 font-medium mt-3"
      >
        View full federal tracker &darr;
      </a>
    </div>
  );
}
