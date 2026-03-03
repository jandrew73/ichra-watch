export default function Resources() {
  const resources = [
    {
      title: "IDEON ICHRA Rate Map",
      description:
        "Interactive map comparing small group ICHRA rates to traditional small group premiums across all 50 states.",
      url: "https://ideonapi.com/ideon-ichra-insights-by-state/",
      icon: "🗺️",
    },
    {
      title: "HRA Council",
      description:
        "Industry association advancing HRA-based solutions. Research, education, and advocacy for ICHRA adoption.",
      url: "https://hracouncil.org",
      icon: "🏛️",
    },
    {
      title: "IRS ICHRA Final Rule",
      description:
        "Original IRS/DOL/HHS final rule establishing ICHRAs, effective January 2020.",
      url: "https://www.federalregister.gov/documents/2019/06/20/2019-12571/health-reimbursement-arrangements-and-other-account-based-group-health-plans",
      icon: "📜",
    },
    {
      title: "Congress.gov — ICHRA Bills",
      description:
        "Search current ICHRA-related bills in the 119th Congress directly on Congress.gov.",
      url: "https://www.congress.gov/search?q=%7B%22source%22%3A%22legislation%22%2C%22search%22%3A%22ICHRA%22%7D",
      icon: "🏦",
    },
    {
      title: "LegiScan — State Bill Search",
      description:
        "Search state-level ICHRA bills across all 50 states using LegiScan's comprehensive database.",
      url: "https://legiscan.com/search?state=ALL&keyword=ICHRA",
      icon: "🔍",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50" id="resources">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Resources</h2>
          <p className="text-gray-600">
            Key tools, data, and references for ICHRA research
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-gray-600">{r.description}</p>
              <p className="text-sm text-blue-600 font-medium mt-3 group-hover:text-blue-800">
                Visit →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
