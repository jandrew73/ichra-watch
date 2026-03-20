interface SummaryStats {
  totalStatesWithActivity: number;
  enacted: number;
  passedOneChamber: number;
  introduced: number;
  federalBillsTracked: number;
}

export default function Hero({ stats }: { stats: SummaryStats }) {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            ICHRA Legislation Watch
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Tracking ICHRA legislation across all 50 states and at the federal
            level. An independent, open resource for brokers, consultants,
            employers, and policymakers.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <StatCard
              number={stats.totalStatesWithActivity}
              label="States With Bills"
              sublabel="Introduced or enacted"
              color="text-blue-400"
            />
            <StatCard
              number={stats.enacted}
              label="Enacted"
              color="text-green-400"
            />
            <StatCard
              number={stats.passedOneChamber}
              label="Passed 1 Chamber"
              color="text-amber-400"
            />
            <StatCard
              number={stats.federalBillsTracked}
              label="Federal Bills"
              color="text-purple-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
  sublabel,
  color,
}: {
  number: number;
  label: string;
  sublabel?: string;
  color: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
      <div className={`text-3xl font-bold ${color}`}>{number}</div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
      {sublabel && (
        <div className="text-[10px] text-slate-500 mt-0.5">{sublabel}</div>
      )}
    </div>
  );
}
