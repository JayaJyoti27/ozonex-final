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
      gsap.fromTo(
        ".st-h",
        {
          x: isMobile ? 0 : -80,
          y: isMobile ? 20 : 0,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.7 : 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".st-p",
        {
          y: isMobile ? 18 : 32,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.7 : 0.9,
          ease: "power3.out",
          stagger: isMobile ? 0.08 : 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            once: true,
          },
        },
      );

      if (!isMobile) {
        gsap.to(".st-bg", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="st-section relative overflow-hidden grid-overlay">
      {/* Background */}
      <div
        className="st-bg absolute inset-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* Overlay */}
      <div className="st-overlay absolute inset-0" />

      {/* Content */}
      <div className="st-inner relative z-10">
        {/* Heading */}
        <div className="st-left">
          <h2 className="st-h st-heading font-display text-white">
            Stop managing
            <br />
            travel. Start
            <br />
            controlling it.
          </h2>
        </div>

        {/* Body */}
        <div className="st-right">
          <div className="st-body">
            <p className="st-p">
              Most companies don't have a travel problem. They have a visibility problem.
            </p>

            <p className="st-p">
              Ozonex puts every booking, every approval, and every rupee on one screen — so finance
              sees the truth in real time and employees never wonder what is in policy.
            </p>

            <p className="st-p">Less chasing. Less leakage. More money back in the budget.</p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-[-1px] left-0 w-full"
        height="80"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <path
          d="M0,50 C150,15 300,65 450,30 C600,0 750,60 900,35 C1050,10 1200,55 1440,25 L1440,80 L0,80 Z"
          fill="var(--cream)"
        />
      </svg>

      <style>{`
        /* =========================
           SECTION
        ========================= */

        .st-section {
          background: var(--ink);
          min-height: 100vh;
        }

        .st-overlay {
          background: linear-gradient(
            to right,
            rgba(28,20,16,0.9) 42%,
            rgba(28,20,16,0.4) 72%,
            rgba(28,20,16,0.7) 100%
          );
        }

        .st-inner {
          min-height: 100vh;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: flex-end;
          gap: 48px;

          padding: 120px 80px 100px;
        }

        .st-left {
          display: flex;
          align-items: flex-end;
        }

        .st-right {
          display: flex;
          justify-content: flex-end;
        }

        /* =========================
           HEADING
        ========================= */

        .st-heading {
          font-size: clamp(48px, 7vw, 110px);
          line-height: 0.92;
          font-weight: 300;
          max-width: 900px;
        }

        /* =========================
           BODY
        ========================= */

        .st-body {
          max-width: 460px;

          display: flex;
          flex-direction: column;
          gap: 22px;

          padding-bottom: 20px;
        }

        .st-p {
          font-family: Poppins, sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.82);
        }

        /* =========================
           LARGE SCREENS
        ========================= */

        @media (min-width: 1600px) {
          .st-inner {
            max-width: 1600px;
          }

          .st-heading {
            font-size: 7rem;
          }
        }

        /* =========================
           LAPTOP
        ========================= */

        @media (max-width: 1200px) {
          .st-inner {
            padding: 100px 48px 90px;
            gap: 36px;
          }

          .st-heading {
            font-size: clamp(44px, 7vw, 84px);
          }
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 992px) {
          .st-overlay {
            background: linear-gradient(
              to bottom,
              rgba(28,20,16,0.72) 0%,
              rgba(28,20,16,0.92) 100%
            );
          }

          .st-inner {
            grid-template-columns: 1fr;
            align-items: flex-start;

            padding: 100px 36px 80px;
            gap: 28px;

            min-height: auto;
          }

          .st-left,
          .st-right {
            justify-content: flex-start;
          }

          .st-body {
            max-width: 620px;
            padding-bottom: 0;
          }

          .st-heading {
            line-height: 0.98;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {
          .st-section {
            min-height: auto;
          }

          .st-inner {
            padding: 88px 20px 70px;
            gap: 24px;
          }

          .st-heading {
            font-size: clamp(36px, 10vw, 56px);
            line-height: 1;
          }

          .st-body {
            max-width: 100%;
            gap: 18px;
          }

          .st-p {
            font-size: 14px;
            line-height: 1.75;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {
          .st-inner {
            padding: 72px 16px 60px;
          }

          .st-heading {
            font-size: clamp(30px, 11vw, 46px);
          }

          .st-body {
            gap: 16px;
          }

          .st-p {
            font-size: 13px;
            line-height: 1.7;
          }
        }

        /* =========================
           EXTRA SMALL
        ========================= */

        @media (max-width: 360px) {
          .st-heading {
            font-size: 28px;
          }

          .st-p {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
