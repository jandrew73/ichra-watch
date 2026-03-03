import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sponsors — ICHRA Legislation Watch",
  description:
    "Meet the founding sponsors and supporters of ICHRA Legislation Watch.",
};

export default function SponsorsPage() {
  return (
    <>
      <Navigation />

      <main className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Our Sponsors
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ICHRA Legislation Watch is made possible by organizations
              committed to expanding healthcare choice for American workers and
              small businesses.
            </p>
          </div>

          {/* Founding Sponsors */}
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-6 text-center">
              Founding Sponsors
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Saidi Health */}
              <a
                href="https://getsaidi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="https://lwfiles.mycourse.app/68f25824a55ff157b0a206c6-public/533712e63bc876f297a104f3d14470aa.png"
                    alt="Saidi Health logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Saidi Health
                </h3>
                <p className="text-sm text-gray-500 mt-1">getsaidi.ai</p>
              </a>

              {/* Navwise */}
              <a
                href="https://navwise.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="/navwise-logo.png"
                    alt="Navwise logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Navwise
                </h3>
                <p className="text-sm text-gray-500 mt-1">navwise.com</p>
              </a>
            </div>
          </section>

          {/* Sponsors (future) */}
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-6 text-center">
              Sponsors
            </h2>
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-10 text-center">
              <p className="text-gray-500 mb-3">
                Interested in supporting ICHRA Legislation Watch?
              </p>
              <a
                href="mailto:info@ichratracker.com"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Become a Sponsor
              </a>
            </div>
          </section>

          {/* Back link */}
          <div className="text-center">
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              &larr; Back to ICHRA Legislation Watch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
