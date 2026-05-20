import { Navbar } from "~/components/landing/Navbar";
import { HeroSection } from "~/components/landing/HeroSection";
import { ThemeShowcase } from "~/components/landing/ThemeShowcase";
import { WhyFilloutly } from "~/components/landing/WhyFilloutly";
import { AnalyticsSection } from "~/components/landing/AnalyticsSection";
import { PricingSection } from "~/components/landing/PricingSection";
import { Testimonials } from "~/components/landing/Testimonials";
import { FinalCTA } from "~/components/landing/FinalCTA";
import { Footer } from "~/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground selection:bg-red-500/30 selection:text-red-200 relative overflow-hidden">

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-red-900/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-red-800/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full ambient-glow blur-[100px]" />


        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />
      <HeroSection />
      <ThemeShowcase />
      <WhyFilloutly />
      <AnalyticsSection />
      <PricingSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
