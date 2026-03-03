import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import USMap from "@/components/USMap";
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
      <USMap />
      <StateTable />
      <FederalTracker />
      <NewsFeed />
      <Resources />
      <Footer />
    </>
  );
}
