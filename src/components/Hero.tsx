import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jet from "@/assets/hero-jet.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Load animation
      gsap.fromTo(
        ".hero-word",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.2 }
      );
      gsap.fromTo(
        mapRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-eyebrow, .hero-sub, .hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.6 }
      );

      // Scroll: zoom map + parallax photo + fade text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
        },
      });
      tl.to(mapRef.current, { scale: 1.8, ease: "none" }, 0);
      tl.to(photoRef.current, { yPercent: -25, ease: "none" }, 0);
      tl.to(textRef.current, { opacity: 0, y: -40, ease: "none" }, 0);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100vh] overflow-hidden grid-overlay"
      style={{ background: "var(--ink)" }}
    >
      {/* Decorative asterisks */}
      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-white/40 text-lg select-none">✦</span>
      <span className="absolute right-12 top-1/2 -translate-y-1/2 text-white/40 text-lg select-none">✦</span>
      <span className="absolute left-24 top-[30%] text-white/30 text-sm select-none">✦</span>
      <span className="absolute right-24 top-[70%] text-white/30 text-sm select-none">✦</span>

      {/* World map with photo through continents */}
      <div
        ref={mapRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div className="relative w-[110%] h-[80%]">
          {/* Amber base layer (continents tinted) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--sand)",
              maskImage: "url(/images/world.svg)",
              WebkitMaskImage: "url(/images/world.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
          {/* Photo layer with multiply blend, only inside continents */}
          <div
            ref={photoRef}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${jet})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "url(/images/world.svg)",
              WebkitMaskImage: "url(/images/world.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              mixBlendMode: "multiply",
              opacity: 0.95,
              willChange: "transform",
            }}
          />
          {/* Outline strokes on continents */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(255,255,255,0.18)",
              maskImage: "url(/images/world.svg)",
              WebkitMaskImage: "url(/images/world.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              mixBlendMode: "overlay",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      {/* Hero text */}
      <div
        ref={textRef}
        className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center text-white"
      >
        <p className="hero-eyebrow eyebrow text-white/70">
          Corporate Travel Management Software
        </p>
        <h1
          className="font-display mt-6"
          style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1.05 }}
        >
          <span className="block">
            <span className="hero-word inline-block">Manage</span>{" "}
            <span className="hero-word inline-block">every</span>
          </span>
          <span className="block">
            <span className="hero-word inline-block">corporate</span>{" "}
            <span className="hero-word inline-block">journey</span>
          </span>
        </h1>
        <p
          className="hero-sub mt-8 max-w-[520px]"
          style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}
        >
          One platform for bookings, approvals, policy compliance, and expense
          tracking — built for global enterprises.
        </p>
        <a href="#platform" className="hero-cta pill mt-10">
          Explore Platform
        </a>
      </div>

      {/* Torn paper edge bottom */}
      <svg
        className="absolute bottom-[-1px] left-0 w-full"
        height="80"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: "block", zIndex: 5 }}
      >
        <path
          d="M0,40 C120,10 240,70 360,35 C480,5 600,65 720,30 C840,0 960,60 1080,40 C1200,20 1320,55 1440,28 L1440,80 L0,80 Z"
          fill="var(--cream)"
        />
      </svg>
    </section>
  );
}
