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
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2,
        },
      );

      gsap.fromTo(
        mapRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".hero-eyebrow, .hero-sub, .hero-cta",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.6,
        },
      );

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
      style={{ background: "var(--ink)" }}
    >
      {/* Decorative asterisks */}
      <span className="asterisk asterisk-left-mid">✦</span>
      <span className="asterisk asterisk-right-mid">✦</span>
      <span className="asterisk asterisk-left-top">✦</span>
      <span className="asterisk asterisk-right-bot">✦</span>

      {/* Map Background */}
      <div
        ref={mapRef}
        className="map-container absolute inset-0 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div className="map-inner relative">
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
            }}
          />

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
              mixBlendMode: "luminosity",
              opacity: 0.85,
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div
        ref={textRef}
        className="hero-text relative z-10 flex flex-col items-center justify-center text-center text-white"
      >
        <h1 className="hero-heading font-display">
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

        <p className="hero-sub hero-subtext">
          Ozonex is the all-in-one corporate travel platform that handles bookings, approvals,
          expenses, and policy — automatically. So your team travels more, spends less, and finance
          closes faster.
        </p>

        <div className="hero-cta hero-cta-row">
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

        <p className="hero-cta hero-trust">Trusted by 200+ enterprises across India and UAE</p>
      </div>

      {/* Bottom SVG */}
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
        /* =========================
           HERO SECTION
        ========================== */

        .hero-section {
          min-height: 100vh;
        }

        .hero-text {
          width: 100%;
          min-height: 100vh;
          padding: 120px 24px 100px;
        }

        /* =========================
           MAP
        ========================== */

        .map-container {
          opacity: 1;
        }

        .map-inner {
          position: relative;
          width: 110%;
          height: 80%;
          min-height: 500px;
        }

        .map-layer {
          position: absolute;
          inset: 0;
        }

        /* =========================
           ASTERISKS
        ========================== */

        .asterisk {
          position: absolute;
          color: rgba(255,255,255,0.35);
          font-size: 18px;
          user-select: none;
          pointer-events: none;
        }

        .asterisk-left-mid {
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
        }

        .asterisk-right-mid {
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
        }

        .asterisk-left-top {
          left: 90px;
          top: 26%;
          font-size: 14px;
        }

        .asterisk-right-bot {
          right: 90px;
          top: 74%;
          font-size: 14px;
        }

        /* =========================
           TYPOGRAPHY
        ========================== */

        .hero-heading {
          font-size: clamp(2.8rem, 7vw, 6.5rem);
          line-height: 0.98;
          letter-spacing: -0.04em;
          max-width: 1200px;
        }

        .hero-subtext {
          margin-top: 32px;
          max-width: 720px;
          font-size: clamp(14px, 1.4vw, 18px);
          line-height: 1.8;
          color: rgba(255,255,255,0.78);
        }

        /* =========================
           BUTTONS
        ========================== */

        .hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 42px;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 14px 38px;
          border-radius: 999px;
          background: #2563EB;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .hero-btn-secondary {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .hero-trust {
          margin-top: 18px;
          font-size: 12px;
          color: rgba(255,255,255,0.48);
        }

        /* =========================
           LARGE SCREENS
        ========================== */

        @media (min-width: 1600px) {
          .hero-heading {
            font-size: 7rem;
          }

          .map-inner {
            width: 100%;
          }
        }

        /* =========================
           LAPTOP
        ========================== */

        @media (max-width: 1200px) {
          .hero-heading {
            font-size: clamp(3rem, 8vw, 5.5rem);
          }

          .map-inner {
            width: 125%;
          }
        }

        /* =========================
           TABLET
        ========================== */

        @media (max-width: 992px) {
          .hero-text {
            padding-top: 140px;
            padding-left: 32px;
            padding-right: 32px;
          }

          .map-inner {
            width: 140%;
            min-height: 420px;
          }

          .hero-subtext {
            max-width: 620px;
          }

          .asterisk-left-top {
            left: 40px;
          }

          .asterisk-right-bot {
            right: 40px;
          }
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
          }

          .hero-text {
            min-height: 100vh;
            padding: 120px 20px 90px;
          }

          .map-inner {
            width: 170%;
            height: 60%;
            min-height: 320px;
          }

          .hero-heading {
            font-size: clamp(2.4rem, 11vw, 4rem);
            line-height: 1.04;
          }

          .hero-subtext {
            margin-top: 24px;
            font-size: 14px;
            line-height: 1.7;
            max-width: 100%;
          }

          .hero-cta-row {
            flex-direction: column;
            width: 100%;
            margin-top: 34px;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            max-width: 340px;
          }

          .hero-trust {
            margin-top: 16px;
            font-size: 11px;
            line-height: 1.6;
            padding: 0 10px;
          }

          .asterisk {
            display: none;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================== */

        @media (max-width: 480px) {
          .hero-text {
            padding: 110px 16px 80px;
          }

          .hero-heading {
            font-size: clamp(2rem, 12vw, 3.2rem);
          }

          .hero-subtext {
            font-size: 13px;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            max-width: 100%;
            font-size: 11px;
            padding: 14px 20px;
          }

          .map-inner {
            width: 210%;
            min-height: 260px;
          }
        }

        /* =========================
           EXTRA SMALL DEVICES
        ========================== */

        @media (max-width: 360px) {
          .hero-heading {
            font-size: 1.9rem;
          }

          .hero-subtext {
            font-size: 12px;
            line-height: 1.6;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            min-height: 50px;
            font-size: 10px;
          }

          .hero-trust {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}
