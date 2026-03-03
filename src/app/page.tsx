import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import USMap from "@/components/USMap";
import FederalSidebar from "@/components/FederalSidebar";
import StateTable from "@/components/StateTable";
import FederalTracker from "@/components/FederalTracker";
import NewsFeed from "@/components/NewsFeed";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />

      {/* Legislation at a Glance — Map + Federal Sidebar */}
      <section className="py-10 sm:py-14" id="map">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Legislation at a Glance
          </h2>
          <p className="text-gray-600 text-center mb-8">
            State ICHRA bills on the left &middot; Federal bills on the right
          </p>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
            {/* Map */}
            <USMap />
            {/* Federal sidebar */}
            <FederalSidebar />
          </div>
        </div>
      </section>

      <StateTable />
      <FederalTracker />
      <NewsFeed />
      <Resources />
      <Footer />
    </>
  );
}
