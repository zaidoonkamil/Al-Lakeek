import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Packages from "@/components/sections/Packages";
import AppCTA from "@/components/sections/AppCTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Packages />
        <AppCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
