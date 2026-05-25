import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "@/assets/statement-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Simplified animations on mobile
      gsap.fromTo(".st-h", { x: isMobile ? 0 : -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: isMobile ? 0.7 : 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.fromTo(".st-p", { y: isMobile ? 16 : 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      // Parallax bg only on desktop
      if (!isMobile) {
        gsap.to(".st-bg", {
          yPercent: -20, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="st-section relative w-full overflow-hidden grid-overlay">
      <div className="st-bg absolute inset-0" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }} />
      <div className="st-overlay absolute inset-0" />

      <div className="relative z-10 h-full w-full st-inner">
        {/* Heading */}
        <h2 className="st-h font-display text-white st-heading">
          Stop managing<br />travel. Start<br />controlling it.
        </h2>

        {/* Body text */}
        <div className="st-body">
          <p className="st-p">Most companies don't have a travel problem. They have a visibility problem.</p>
          <p className="st-p">
            Ozonex puts every booking, every approval, and every rupee on one
            screen — so finance sees the truth in real time and employees
            never wonder what is in policy.
          </p>
          <p className="st-p">Less chasing. Less leakage. More money back in the budget.</p>
        </div>
      </div>

      <svg className="absolute bottom-[-1px] left-0 w-full" height="80" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block" }}>
        <path d="M0,50 C150,15 300,65 450,30 C600,0 750,60 900,35 C1050,10 1200,55 1440,25 L1440,80 L0,80 Z" fill="var(--cream)" />
      </svg>

      <style>{`
        /* ── STATEMENT ── */
        .st-section {
          background: var(--ink);
          min-height: 100vh;
        }
        .st-overlay {
          background: linear-gradient(to right, rgba(28,20,16,0.88) 45%, rgba(28,20,16,0.2) 100%);
        }
        /* Desktop: side-by-side 12-col grid */
        .st-inner {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 32px;
          padding: 80px 48px;
          min-height: 100vh;
          align-items: flex-end;
        }
        .st-heading {
          font-size: clamp(48px, 7vw, 108px);
          line-height: 0.95;
        }
        .st-body {
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: rgba(255,255,255,0.8);
          font-size: 15px;
          line-height: 1.7;
          padding-bottom: 80px;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .st-inner { padding: 80px 32px; gap: 24px; }
          .st-heading { font-size: clamp(40px, 6vw, 80px); }
          .st-body { max-width: 100%; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .st-section { min-height: auto; }
          .st-overlay {
            background: linear-gradient(to bottom, rgba(28,20,16,0.75) 0%, rgba(28,20,16,0.92) 100%);
          }
          /* Stack vertically on mobile */
          .st-inner {
            grid-template-columns: 1fr;
            align-items: flex-start;
            padding: 100px 20px 80px;
            gap: 28px;
            min-height: 100vh;
          }
          .st-heading {
            font-size: clamp(36px, 9vw, 56px);
            line-height: 1.0;
          }
          .st-body {
            max-width: 100%;
            font-size: 14px;
            gap: 16px;
            padding-bottom: 40px;
          }
        }

        /* ── SMALL MOBILE ── */
        @media (max-width: 480px) {
          .st-inner { padding: 90px 16px 60px; }
          .st-heading { font-size: clamp(32px, 10vw, 48px); }
          .st-body { font-size: 13px; }
        }
      `}</style>
    </section>
  );
}
