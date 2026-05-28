import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    n: "01",
    title: "Trust First",
    desc: "Every client relationship starts with transparency.",
  },
  {
    n: "02",
    title: "Global Reach, Local Depth",
    desc: "We understand regional nuance — not just international schedules.",
  },
  {
    n: "03",
    title: "People Behind the Platform",
    desc: "Technology handles the routine. Humans handle the exceptions.",
  },
  {
    n: "04",
    title: "Relentless Improvement",
    desc: "We've refined corporate travel operations since 2014.",
  },
];

const milestones = [
  {
    year: "2014",
    event: "Founded in Trivandrum with a mission to simplify corporate travel.",
  },
  {
    year: "2016",
    event: "Expanded to Chennai and Cochin.",
  },
  {
    year: "2018",
    event: "Achieved IATA certification.",
  },
  {
    year: "2020",
    event: "Launched the Ozonex digital platform.",
  },
  {
    year: "2022",
    event: "Opened Dubai office.",
  },
  {
    year: "2024",
    event: "Delhi office inaugurated.",
  },
];

const services = [
  ["✈", "Flight Booking", "Domestic and international air with preferred fares."],
  ["🏨", "Hotel Booking", "Curated stays worldwide with policy-compliant options."],
  ["🗂", "Visa Assistance", "End-to-end visa support across destinations."],
  ["🎤", "MICE", "Meetings, conferences, incentives, and events."],
  [
    "💼",
    "Corporate Travel Management",
    "Booking, approvals, policy, and reporting in one platform.",
  ],
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        {
          y: isMobile ? 20 : 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.6 : 1,
          stagger: isMobile ? 0.04 : 0.07,
          ease: "power3.out",
          delay: 0.25,
        },
      );

      gsap.fromTo(
        ".hero-fade",
        {
          y: isMobile ? 12 : 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      gsap.fromTo(
        ".value-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".timeline-item",
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".svc-card",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 85%",
          },
        },
      );
    });

    return () => {
      ctx.revert();
      lenis.destroy();

      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <main className="about-page relative">
      <Nav />
      <ScrollLineV />

      {/* HERO */}
      <section className="about-hero">
        <span className="about-star left">✦</span>
        <span className="about-star right">✦</span>

        <div className="hero-eyebrow">About Ozonex</div>

        <h1 className="about-hero-heading font-display">
          {[["Ten years", "of"], ["moving", "business"], ["forward."]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="hero-word inline-block">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-fade about-hero-text">
          Ozonex is the corporate travel management platform by Ozone Tourism and Travel — operating
          across India, the Middle East, and beyond.
        </p>

        <div className="hero-fade about-tags">
          {["IATA Certified", "Est. 2014", "5 Countries", "6 Global Offices", "24/7 Support"].map(
            (t) => (
              <span key={t} className="about-tag">
                <span className="about-tag-dot">✦</span>
                {t}
              </span>
            ),
          )}
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="about-grid">
          <h2 className="mission-heading font-display">
            Corporate travel
            <br />
            shouldn't be this
            <br />
            complicated.
          </h2>

          <div className="mission-copy">
            <p>
              We built Ozonex because large organisations were still managing travel through
              spreadsheets, emails, and fragmented vendors.
            </p>

            <p>
              Finance lacked visibility. HR lacked duty-of-care systems. Approvals became
              bottlenecks instead of safeguards.
            </p>

            <p>Today we operate across India, the Middle East, Asia, and beyond.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {[
            { num: "2014", label: "Year founded" },
            { num: "5", label: "Countries" },
            { num: "6", label: "Global offices" },
            { num: "IATA", label: "Certified operator" },
          ].map((s) => (
            <div key={s.label} className="about-stat">
              <div className="about-stat-num font-display">{s.num}</div>

              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section about-values">
        <div className="about-section-heading">
          <div className="eyebrow dark">How we work</div>

          <h2 className="font-display text-white">
            The principles behind
            <br />
            every decision we make
          </h2>
        </div>

        <div className="about-values-grid">
          {values.map((v) => (
            <div key={v.n} className="value-card">
              <div className="value-number font-display">{v.n}</div>

              <h3 className="value-title font-display">{v.title}</h3>

              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section about-timeline">
        <div className="timeline-wrap">
          <div className="eyebrow center">Our Journey</div>

          <h2 className="timeline-heading font-display">A decade in motion</h2>

          <div className="timeline-list">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-dot" />

                  {i < milestones.length - 1 && <div className="timeline-line" />}
                </div>

                <div className="timeline-content">
                  <div className="timeline-year font-display">{m.year}</div>

                  <p className="timeline-event">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section about-services">
        <div className="about-section-heading">
          <div className="eyebrow">What we do</div>

          <h2 className="font-display">
            Services built for
            <br />
            corporate operations
          </h2>
        </div>

        <div className="services-grid">
          {services.map(([icon, title, desc]) => (
            <div key={title} className="svc-card">
              <span className="svc-icon">{icon}</span>

              <h3 className="svc-title font-display">{title}</h3>

              <p className="svc-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <span className="about-star left">✦</span>
        <span className="about-star right">✦</span>

        <h2 className="font-display text-white about-cta-heading">
          {[
            ["Ready to", "simplify"],
            ["your corporate", "travel?"],
          ].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="cta-word inline-block">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="cta-btn about-cta-text">
          Talk to our enterprise team and get a plan built around your organisation.
        </p>

        <div className="cta-btn about-cta-buttons">
          <a href="/pricing#enquire" className="about-btn primary">
            Get a Custom Quote
          </a>

          <a href="/product" className="about-btn secondary">
            See the Platform
          </a>
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      <Footer />

      <style>{`
        .about-page {
          background: var(--cream);
        }

        /* =========================
           HERO
        ========================= */

        .about-hero {
          position: relative;
          min-height: 85vh;
          background: var(--ink);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;

          padding: 140px 24px 120px;
          overflow: hidden;
        }

        .about-star {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.24);
          font-size: 22px;
        }

        .about-star.left {
          left: 48px;
        }

        .about-star.right {
          right: 48px;
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        .about-hero-heading {
          margin-top: 32px;
          font-size: clamp(44px, 8vw, 96px);
          line-height: 0.94;
          color: white;
        }

        .hero-word {
          margin-right: 12px;
        }

        .about-hero-text {
          max-width: 640px;
          margin-top: 32px;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255,255,255,0.68);
        }

        .about-tags {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 18px;
        }

        .about-tag {
          display: flex;
          align-items: center;
          gap: 8px;

          font-size: 12px;
          letter-spacing: 0.08em;

          color: rgba(255,255,255,0.48);
        }

        .about-tag-dot {
          color: var(--gold);
        }

        /* =========================
           MISSION
        ========================= */

        .about-mission {
          padding: 120px 24px;
          background: var(--cream);
        }

        .about-grid {
          max-width: 1320px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .mission-heading {
          font-size: clamp(38px, 5vw, 72px);
          line-height: 0.96;
          color: var(--ink);
        }

        .mission-copy {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mission-copy p {
          font-size: 16px;
          line-height: 1.9;
          color: var(--muted-warm);
        }

        /* =========================
           STATS
        ========================= */

        .about-stats {
          max-width: 1320px;
          margin: 80px auto 0;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;

          text-align: center;
        }

        .about-stat-num {
          font-size: clamp(38px, 5vw, 56px);
          color: var(--ink);
        }

        .about-stat-label {
          margin-top: 12px;

          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;

          color: var(--muted-warm);
        }

        /* =========================
           VALUES
        ========================= */

        .about-values {
          background: var(--ink);
          padding: 140px 24px;
        }

        .about-section-heading {
          text-align: center;
          max-width: 1000px;
          margin: 0 auto 72px;
        }

        .about-section-heading h2 {
          margin-top: 24px;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1;
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .eyebrow.dark {
          color: rgba(255,255,255,0.5);
        }

        .eyebrow.center {
          text-align: center;
        }

        .about-values-grid {
          max-width: 1320px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .value-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 40px 34px;
        }

        .value-number {
          font-size: 48px;
          color: rgba(255,255,255,0.08);
        }

        .value-title {
          margin-top: 16px;
          font-size: 28px;
          color: white;
        }

        .value-desc {
          margin-top: 16px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.62);
        }

        /* =========================
           TIMELINE
        ========================= */

        .about-timeline {
          background: var(--cream);
          padding: 120px 24px;
        }

        .timeline-wrap {
          max-width: 900px;
          margin: 0 auto;
        }

        .timeline-heading {
          margin-top: 20px;
          text-align: center;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1;
          color: var(--ink);
        }

        .timeline-list {
          margin-top: 72px;
        }

        .timeline-item {
          display: flex;
          gap: 24px;
          position: relative;
          padding-bottom: 44px;
        }

        .timeline-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 20px;
        }

        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--ink);
        }

        .timeline-line {
          width: 1px;
          flex: 1;
          background: rgba(28,20,16,0.16);
          margin-top: 8px;
        }

        .timeline-year {
          font-size: 30px;
          color: var(--ink);
        }

        .timeline-event {
          margin-top: 8px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--muted-warm);
        }

        /* =========================
           SERVICES
        ========================= */

        .about-services {
          background: white;
          padding: 120px 24px;
        }

        .services-grid {
          max-width: 1320px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .svc-card {
          border: 1px solid rgba(212,201,190,0.45);
          border-radius: 18px;
          padding: 36px 30px;
        }

        .svc-icon {
          font-size: 34px;
        }

        .svc-title {
          margin-top: 18px;
          font-size: 24px;
          color: var(--ink);
        }

        .svc-desc {
          margin-top: 14px;
          font-size: 14px;
          line-height: 1.8;
          color: var(--muted-warm);
        }

        /* =========================
           CTA
        ========================= */

        .about-cta {
          position: relative;
          min-height: 60vh;
          background: var(--ink);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;

          padding: 120px 24px;
          overflow: hidden;
        }

        .about-cta-heading {
          font-size: clamp(40px, 6vw, 76px);
          line-height: 1;
        }

        .cta-word {
          margin-right: 12px;
        }

        .about-cta-text {
          max-width: 560px;
          margin-top: 28px;

          font-size: 16px;
          line-height: 1.8;

          color: rgba(255,255,255,0.68);
        }

        .about-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;

          margin-top: 36px;
        }

        .about-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 16px 42px;
          border-radius: 999px;

          text-decoration: none;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .about-btn.primary {
          background: #2563EB;
          color: white;
        }

        .about-btn.secondary {
          border: 1px solid rgba(255,255,255,0.18);
          color: white;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {
          .about-hero {
            padding: 120px 20px 100px;
            min-height: auto;
          }

          .about-star {
            display: none;
          }

          .about-hero-text {
            font-size: 14px;
          }

          .about-tags {
            gap: 12px;
          }

          .about-tag {
            font-size: 11px;
          }

          .about-mission,
          .about-values,
          .about-timeline,
          .about-services,
          .about-cta {
            padding: 80px 20px;
          }

          .mission-copy p,
          .timeline-event,
          .value-desc {
            font-size: 14px;
          }

          .about-stats {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .about-values-grid,
          .services-grid {
            grid-template-columns: 1fr;
          }

          .about-cta-buttons {
            width: 100%;
            flex-direction: column;
            align-items: center;
          }

          .about-btn {
            width: 100%;
            max-width: 320px;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {
          .about-hero,
          .about-mission,
          .about-values,
          .about-timeline,
          .about-services,
          .about-cta {
            padding-left: 16px;
            padding-right: 16px;
          }

          .about-hero-heading {
            font-size: clamp(34px, 12vw, 52px);
          }

          .mission-heading,
          .timeline-heading,
          .about-section-heading h2,
          .about-cta-heading {
            font-size: clamp(30px, 10vw, 44px);
          }

          .about-stats {
            grid-template-columns: 1fr;
          }

          .value-card,
          .svc-card {
            padding: 28px 22px;
          }

          .value-title {
            font-size: 22px;
          }

          .svc-title {
            font-size: 20px;
          }

          .timeline-item {
            gap: 16px;
          }

          .timeline-year {
            font-size: 24px;
          }

          .about-btn {
            max-width: 100%;
            padding: 14px 20px;
            font-size: 11px;
          }
        }
      `}</style>
    </main>
  );
}
