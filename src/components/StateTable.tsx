"use client";

import {
  getStatusColor,
  getStatusLabel,
  type StateLegislation,
} from "@/data/legislation";

export default function StateTable({ stateBills }: { stateBills: StateLegislation[] }) {
  const sorted = [...stateBills].sort((a, b) => {
    const order = { enacted: 0, passed_one_chamber: 1, introduced: 2, no_activity: 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <section className="py-12 sm:py-16 bg-white" id="states">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            State Legislation Detail
          </h2>
          <p className="text-gray-600">
            All {stateBills.length} states with active ICHRA legislation
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  State
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Bill
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Tax Credit
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Last Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => (
                <tr
                  key={s.stateCode}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {s.state}{" "}
                    <span className="text-gray-400 font-normal">({s.stateCode})</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: getStatusColor(s.status) }}
                      />
                      <span className="text-sm text-gray-700">
                        {getStatusLabel(s.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {s.sourceUrl ? (
                      <a
                        href={s.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {s.billNumber}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-700">
                        {s.billNumber}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {s.taxCredit || "—"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {s.lastAction}
                    <span className="block text-xs text-gray-400 mt-0.5">
                      {new Date(s.lastActionDate + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {sorted.map((s) => (
            <div
              key={s.stateCode}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">
                      {s.state}{" "}
                      <span className="text-gray-400 font-normal text-sm">({s.stateCode})</span>
                    </h3>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: getStatusColor(s.status) }}
                  />
                  <span className="text-xs font-medium text-gray-500">
                    {getStatusLabel(s.status)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-blue-700 font-medium mb-1">
                {s.billNumber}
              </p>
              <p className="text-sm text-gray-600 mb-2">{s.summary}</p>
              {s.taxCredit && (
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Credit:</span> {s.taxCredit}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2 italic">
                {s.lastAction}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Updated{" "}
                {new Date(s.lastActionDate + "T00:00:00").toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
