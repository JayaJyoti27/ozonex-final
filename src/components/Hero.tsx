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

    const isMobile = window.innerWidth < 768;

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

      // Scroll parallax — disabled on mobile to avoid layout jank
      if (!isMobile) {
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
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section relative w-full overflow-hidden grid-overlay"
      style={{ background: "var(--ink)", minHeight: "100vh" }}
    >
      {/* Decorative asterisks — hidden on small screens */}
      <span className="asterisk asterisk-left-mid">✦</span>
      <span className="asterisk asterisk-right-mid">✦</span>
      <span className="asterisk asterisk-left-top">✦</span>
      <span className="asterisk asterisk-right-bot">✦</span>

      {/* World map with photo through continents */}
      <div
        ref={mapRef}
        className="map-container absolute inset-0 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div className="map-inner relative">
          {/* Amber base layer */}
          <div
            className="map-layer"
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
              opacity: 1,
            }}
          />
          {/* Photo layer — luminosity blend kills the blue tint */}
          <div
            ref={photoRef}
            className="map-layer"
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
              mixBlendMode: "luminosity",   // ← KEY FIX: was "multiply", now strips the blue
              opacity: 0.85,
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* Hero text */}
      <div
        ref={textRef}
        className="hero-text relative z-10 w-full flex flex-col items-center justify-center px-6 text-center text-white"
      >
        <p className="hero-eyebrow eyebrow text-white/70">
          Corporate Travel Management Solution
        </p>
        <h1 className="hero-heading font-display mt-6">
          <span className="block">
            <span className="hero-word inline-block">Corporate</span>{" "}
            <span className="hero-word inline-block">Travel</span>
          </span>
          <span className="block">
            <span className="hero-word inline-block">Management</span>
          </span>
          <span className="block">
            <span className="hero-word inline-block">Solution.</span>
          </span>
        </h1>
        <p className="hero-sub hero-subtext mt-8 max-w-[560px]">
          Ozonex is the all-in-one corporate travel platform that handles
          bookings, approvals, expenses, and policy — automatically. So your
          team travels more, spends less, and finance closes faster.
        </p>
        <div className="hero-cta hero-cta-row mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/pricing#enquire"
            className="hero-btn-primary"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1D4ED8";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2563EB";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Get Started Free
          </a>
          <a href="/pricing#enquire" className="pill hero-btn-secondary">
            Book a Free Demo
          </a>
        </div>
        <p className="hero-cta hero-trust">
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

      <style>{`
        /* ── HERO RESPONSIVE STYLES ── */

        .hero-section {
          min-height: 100vh;
        }

        /* Map sizing */
        .map-container {
          opacity: 1;
        }

        .map-inner {
          width: 110%;
          height: 80%;
          position: relative;
          min-height: 400px;
        }

        .map-layer {
          position: absolute;
          inset: 0;
        }

        /* Asterisks */
        .asterisk {
          position: absolute;
          color: rgba(255,255,255,0.4);
          font-size: 18px;
          user-select: none;
          pointer-events: none;
        }
        .asterisk-left-mid  { left: 48px;  top: 50%; transform: translateY(-50%); }
        .asterisk-right-mid { right: 48px; top: 50%; transform: translateY(-50%); }
        .asterisk-left-top  { left: 96px;  top: 30%; font-size: 14px; color: rgba(255,255,255,0.3); }
        .asterisk-right-bot { right: 96px; top: 70%; font-size: 14px; color: rgba(255,255,255,0.3); }

        /* Text block */
        .hero-text {
          min-height: 100vh;
          padding-top: 100px;
          padding-bottom: 80px;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* Heading */
        .hero-heading {
          font-size: clamp(36px, 6vw, 88px);
          line-height: 1.05;
        }

        /* Subtext */
        .hero-subtext {
          font-size: 17px;
          color: rgba(255,255,255,0.78);
          line-height: 1.7;
        }

        /* CTA row */
        .hero-cta-row {
          gap: 16px;
        }

        /* Primary button */
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2563EB;
          color: #fff;
          border-radius: 50px;
          padding: 14px 40px;
          font-family: Inter, sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        /* Secondary button */
        .hero-btn-secondary {
          white-space: nowrap;
        }

        /* Trust line */
        .hero-trust {
          font-family: Inter, sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          margin-top: 16px;
        }

        /* ── TABLET (max 1024px) ── */
        @media (max-width: 1024px) {
          .asterisk-left-mid  { left: 24px; }
          .asterisk-right-mid { right: 24px; }
          .asterisk-left-top  { left: 48px; }
          .asterisk-right-bot { right: 48px; }

          .hero-subtext {
            font-size: 15px;
            max-width: 480px;
          }
        }

        /* ── MOBILE (max 768px) ── */
        @media (max-width: 768px) {
          /* Shrink & reposition map so it sits behind text cleanly */
          .map-inner {
            width: 140%;
            min-height: 320px;
            height: 60%;
          }

          /* Hide side asterisks — too crowded on mobile */
          .asterisk-left-mid,
          .asterisk-right-mid,
          .asterisk-left-top,
          .asterisk-right-bot {
            display: none;
          }

          /* Text block */
          .hero-text {
            padding-top: 120px;
            padding-bottom: 100px;
            padding-left: 20px;
            padding-right: 20px;
          }

          /* Heading — tighter on mobile */
          .hero-heading {
            font-size: clamp(32px, 9vw, 52px);
            line-height: 1.08;
          }

          /* Subtext */
          .hero-subtext {
            font-size: 14px;
            max-width: 100%;
            margin-top: 20px;
          }

          /* CTA row — stack on very small screens */
          .hero-cta-row {
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
          }

          /* Buttons full-width on mobile */
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            max-width: 320px;
            justify-content: center;
            padding: 14px 24px;
          }

          /* Trust line */
          .hero-trust {
            font-size: 11px;
            margin-top: 12px;
            padding: 0 16px;
          }
        }

        /* ── SMALL MOBILE (max 480px) ── */
        @media (max-width: 480px) {
          .map-inner {
            width: 160%;
          }

          .hero-heading {
            font-size: clamp(28px, 10vw, 44px);
          }

          .hero-subtext {
            font-size: 13px;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            max-width: 280px;
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
