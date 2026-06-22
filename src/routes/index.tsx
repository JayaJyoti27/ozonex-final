import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { Stats } from "@/components/Stats";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { WhoSection, GlobalCTA, Footer } from "@/components/Sections";
import {
  LogoStrip,
  ValueProps,
  Comparison,
  SavingsCalculator,
  PricingTeaser,
} from "@/components/MarketingSections";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", () => ScrollTrigger.update());

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => {
      // ✅ cleanup opens
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach((s) => s.kill());
    }; // ✅ cleanup closes
  }, []); // ✅ useEffect closes

  return (
    // ✅ JSX return is here, OUTSIDE useEffect
    <main className="relative">
      <Nav />
      <ScrollLineV />
      <Hero />
      <LogoStrip />
      <ValueProps />
      <Comparison />
      <Statement />
      <Stats />
      <SavingsCalculator />
      <HorizontalScroll />
      <WhoSection />
      <PricingTeaser />
      <GlobalCTA />
      <Footer />
    </main>
  );
}
