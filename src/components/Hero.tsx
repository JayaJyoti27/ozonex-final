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
      className="relative w-full overflow-hidden grid-overlay"
      style={{ background: "var(--ink)", minHeight: "100vh" }}
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
          {/* Amber base layer */}
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
          {/* Photo layer — no blue tint, pure multiply */}
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
          {/* Removed bluish overlay layer */}
        </div>
      </div>

      {/* Hero text */}
      <div
        ref={textRef}
        className="relative z-10 w-full flex flex-col items-center justify-center px-6 text-center text-white"
        style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <p className="hero-eyebrow eyebrow text-white/70">
          Corporate Travel Management Solution
        </p>
        <h1
          className="font-display mt-6"
          style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.05 }}
        >
          <span className="block">
            <span className="hero-word inline-block">Corporate</span>{" "}
            <span className="hero-word inline-block">Travel</span>
          </span>
          <span className="block">
            <span className="hero-word inline-block">Management</span>
          </span>
          <span className="block">
            <span className="hero-word inline-block">Solution.</span>{" "}
            <span className="hero-word inline-block">Control</span>
          </span>
          <span className="block">
            <span className="hero-word inline-block">every</span>{" "}
            <span className="hero-word inline-block">money</span>{" "}
            <span className="hero-word inline-block">spent.</span>
          </span>
        </h1>
        <p
          className="hero-sub mt-8 max-w-[560px]"
          style={{ fontSize: 17, color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}
        >
          Ozonex is the all-in-one corporate travel platform that handles
          bookings, approvals, expenses, and policy — automatically. So your
          team travels more, spends less, and finance closes faster.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/pricing#enquire"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "#2563EB", color: "#fff",
              borderRadius: 50, padding: "14px 40px",
              fontFamily: "Inter, sans-serif", fontSize: 12,
              letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500,
              textDecoration: "none", transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "scale(1)"; }}
          >Get Started Free</a>
          <a
            href="/pricing#enquire"
            className="pill"
          >Book a Free Demo</a>
        </div>
        <p className="hero-cta" style={{
          fontFamily: "Inter, sans-serif", fontSize: 12,
          color: "rgba(255,255,255,0.45)", marginTop: 16,
        }}>
          Trusted by 200+ enterprises across India and UAE
        </p>
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
