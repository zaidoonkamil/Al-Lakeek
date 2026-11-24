import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import AppCTA from "@/components/sections/AppCTA";
import Contact from "@/components/sections/Contact";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Marquee from "@/components/sections/Marquee";
import Packages from "@/components/sections/Packages";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* The next block slides up over the hero. The hero stays pinned only
            inside this wrapper, so it is never behind the rest of the page. */}
        <div className="relative">
          <Hero />
          <div className="relative z-10 rounded-t-[2.5rem] bg-white [clip-path:inset(0_round_2.5rem_2.5rem_0_0)]">
            <Marquee />
            <About />
          </div>
        </div>
        <div className="relative z-10 bg-white">
          <Features />
          <HowItWorks />
          <Packages />
          <AppCTA />
          <Contact />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
