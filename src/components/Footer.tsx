export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">ICHRA Legislation Watch</h3>
            <p className="text-sm text-slate-400">
              An independent, open resource tracking ICHRA legislation across the
              United States. Free for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#map"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  State Map
                </a>
              </li>
              <li>
                <a
                  href="#federal"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Federal Tracker
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Latest Updates
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Founding Sponsors */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
              Founding Sponsors
            </h4>
            <p className="text-sm text-slate-400 mb-2">
              This project is supported by its founding sponsors. Interested in
              sponsoring?{" "}
              <a
                href="mailto:info@ichrawatch.com"
                className="text-blue-400 hover:text-blue-300"
              >
                Get in touch
              </a>
              .
            </p>
            <div className="flex gap-4 mt-3">
              {/* Placeholder for sponsor logos */}
              <div className="w-20 h-8 rounded bg-white/10 flex items-center justify-center text-xs text-slate-500">
                Sponsor
              </div>
              <div className="w-20 h-8 rounded bg-white/10 flex items-center justify-center text-xs text-slate-500">
                Sponsor
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-6 mb-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Disclaimer:</span>{" "}
              The information on this site is provided for general informational
              purposes only and should not be construed as legal, tax, or
              professional advice. While we strive for accuracy, legislation
              statuses change frequently and data may not reflect the most
              current developments. Always verify information with official state
              legislature websites, Congress.gov, and qualified legal or tax
              professionals before making business decisions. ICHRA Legislation
              Watch is not responsible for any errors or omissions.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ICHRA Legislation Watch. Data updated
            manually; verify with official sources.
          </p>
          <p className="text-xs text-slate-500">
            Data sources: LegiScan, Congress.gov, state legislature websites
          </p>
        </div>
      </div>
    </footer>
  );
}
