/* =========================
   FULLY RESPONSIVE VERSION
========================= */

import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiggyBank, ShieldCheck, Zap, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   LOGO STRIP
========================= */

const SECTORS = [
  "Information Technology (IT)",
  "Healthcare & Medical",
  "Education & Training",
  "Travel & Tourism",
  "Finance & Banking",
  "Construction",
  "Manufacturing",
  "Hospitality & Hotels",
  "Logistics & Transportation",
  "Media & Entertainment",
  "Import & Export",
  "Marketing & Advertising",
  "Event Management",
  "Interior Design & Furniture",
];

const ROW1 = SECTORS.slice(0, 7);
const ROW2 = SECTORS.slice(7);

export function LogoStrip() {
  return (
    <section className="logo-strip-section">
      <div className="logo-strip-heading">Sectors We Serve</div>

      <MarqueeRow items={ROW1} />
      <div style={{ height: 16 }} />
      <MarqueeRow items={ROW2} reverse />

      <style>{`
        .logo-strip-section {
          background: #F5F0EA;
          padding: 0 0 60px;
        }

        .logo-strip-heading {
          text-align: center;
          font-family: Inter, sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B6258;
          padding: 60px 20px 32px;
        }

        @media (max-width: 768px) {
          .logo-strip-heading {
            padding: 40px 16px 24px;
          }
        }
      `}</style>
    </section>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-mask marquee-row">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((label, i) => (
          <span key={i} className="marquee-item">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================
   VALUE PROPS
========================= */

const VALUE_PROPS = [
  {
    Icon: PiggyBank,
    title: "Save on Every Trip",
    body: "Average 23% reduction in travel spend in the first 6 months.",
  },
  {
    Icon: ShieldCheck,
    title: "Stay Within Budget",
    body: "Policy guardrails mean employees only see what they are allowed to book.",
  },
  {
    Icon: Zap,
    title: "Approvals in Minutes",
    body: "Multi-level approvals route automatically.",
  },
  {
    Icon: BarChart3,
    title: "Expenses Close Themselves",
    body: "80% of expense reports auto-complete automatically.",
  },
];

export function ValueProps() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vp-col",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            once: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="vp-section">
      <div className="vp-grid">
        {VALUE_PROPS.map(({ Icon, title, body }) => (
          <div key={title} className="vp-col">
            <Icon size={28} color="#2563EB" strokeWidth={1.6} />

            <div className="vp-title">{title}</div>

            <p className="vp-body">{body}</p>
          </div>
        ))}
      </div>

      <style>{`
        .vp-section {
          background: #F5F0EA;
          border-top: 1px solid rgba(37,99,235,0.1);
          border-bottom: 1px solid rgba(37,99,235,0.1);
          padding: 70px 80px;
        }

        .vp-grid {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .vp-title {
          font-family: Inter, sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #1C1410;
          margin-top: 16px;
        }

        .vp-body {
          font-family: Inter, sans-serif;
          font-size: 14px;
          color: #6B6258;
          line-height: 1.8;
          margin-top: 10px;
        }

        @media (max-width: 1024px) {
          .vp-section {
            padding: 56px 40px;
          }

          .vp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .vp-section {
            padding: 44px 20px;
          }

          .vp-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 480px) {
          .vp-section {
            padding: 36px 16px;
          }

          .vp-title {
            font-size: 15px;
          }

          .vp-body {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   COMPARISON
========================= */

const WITHOUT = [
  "Employees book outside policy",
  "Finance chases receipts",
  "Approvals over WhatsApp",
  "No visibility on spend",
  "Policy violations discovered later",
];

const WITH = [
  "Bookings stay policy-compliant",
  "Expenses auto-captured",
  "Automated approval routing",
  "Live spend visibility",
  "Non-compliant options blocked",
];

export function Comparison() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cmp-left",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".cmp-right",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            once: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cmp-section">
      <h2 className="cmp-heading">
        THE DIFFERENCE IS
        <br />
        IMMEDIATE.
      </h2>

      <div className="cmp-grid">
        <div className="cmp-card cmp-left">
          <div className="cmp-card-head muted">Without Ozonex</div>

          {WITHOUT.map((t) => (
            <div key={t} className="cmp-row">
              ✗ {t}
            </div>
          ))}
        </div>

        <div className="cmp-card cmp-right">
          <div className="cmp-card-head blue">With Ozonex</div>

          {WITH.map((t) => (
            <div key={t} className="cmp-row dark">
              ✓ {t}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cmp-section {
          background: #F5F0EA;
          padding: 120px 80px;
        }

        .cmp-heading {
          text-align: center;
          font-size: clamp(36px, 6vw, 60px);
          line-height: 1;
          font-weight: 300;
          color: #1C1410;
          margin-bottom: 64px;
        }

        .cmp-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .cmp-card {
          border: 1px solid rgba(37,99,235,0.08);
          background: rgba(255,255,255,0.5);
        }

        .cmp-card-head {
          padding: 20px 28px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          border-bottom: 1px solid rgba(37,99,235,0.08);
        }

        .cmp-card-head.muted {
          color: #6B6258;
        }

        .cmp-card-head.blue {
          color: #2563EB;
        }

        .cmp-row {
          padding: 18px 28px;
          border-bottom: 1px solid rgba(37,99,235,0.06);
          font-size: 14px;
          line-height: 1.7;
          color: #6B6258;
        }

        .cmp-row.dark {
          color: #1C1410;
        }

        @media (max-width: 768px) {
          .cmp-section {
            padding: 70px 20px;
          }

          .cmp-grid {
            grid-template-columns: 1fr;
          }

          .cmp-heading {
            margin-bottom: 40px;
          }
        }

        @media (max-width: 480px) {
          .cmp-section {
            padding: 56px 16px;
          }

          .cmp-row {
            padding: 16px 18px;
            font-size: 13px;
          }

          .cmp-card-head {
            padding: 16px 18px;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   SAVINGS CALCULATOR
========================= */

const CURRENCIES = [
  { label: "INR (₹)", symbol: "₹", locale: "en-IN", multiplier: 4200 },
  { label: "USD ($)", symbol: "$", locale: "en-US", multiplier: 50 },
  { label: "AED (د.إ)", symbol: "د.إ", locale: "ar-AE", multiplier: 184 },
];

export function SavingsCalculator() {
  const [employees, setEmployees] = useState(500);
  const [trips, setTrips] = useState(8);
  const [currencyIdx, setCurrencyIdx] = useState(0);

  const currency = CURRENCIES[currencyIdx];

  const saving = Math.round(employees * trips * currency.multiplier * 0.23);

  const fmtMoney = (n: number) => currency.symbol + " " + n.toLocaleString(currency.locale);

  return (
    <section className="calc-section">
      <div className="calc-wrap">
        <h2 className="calc-heading">
          HOW MUCH COULD
          <br />
          YOUR COMPANY SAVE?
        </h2>

        <p className="calc-sub">Tell us about your travel programme.</p>

        <div className="calc-card">
          <div className="calc-currency">
            {CURRENCIES.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setCurrencyIdx(i)}
                className={`calc-btn ${currencyIdx === i ? "active" : ""}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="calc-slider-wrap">
            <label>Employees</label>

            <div className="calc-number">{employees.toLocaleString()}</div>

            <input
              type="range"
              min={50}
              max={5000}
              step={50}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
            />
          </div>

          <div className="calc-slider-wrap">
            <label>Trips per year</label>

            <div className="calc-number">{trips}</div>

            <input
              type="range"
              min={2}
              max={24}
              step={1}
              value={trips}
              onChange={(e) => setTrips(Number(e.target.value))}
            />
          </div>

          <div className="calc-results">
            <div className="calc-result">
              <span>Estimated Saving</span>
              <strong>{fmtMoney(saving)}</strong>
            </div>

            <div className="calc-result">
              <span>Compliance</span>
              <strong>94%</strong>
            </div>

            <div className="calc-result">
              <span>Finance Hours Saved</span>
              <strong>80 hrs/mo</strong>
            </div>
          </div>

          <div className="calc-cta-wrap">
            <a href="/pricing#enquire" className="calc-cta">
              Book a Free Demo
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .calc-section {
          background: #1C1410;
          padding: 120px 20px;
        }

        .calc-wrap {
          max-width: 850px;
          margin: 0 auto;
          text-align: center;
        }

        .calc-heading {
          font-size: clamp(34px, 6vw, 64px);
          color: white;
          line-height: 1;
          font-weight: 300;
        }

        .calc-sub {
          color: rgba(255,255,255,0.7);
          margin-top: 24px;
          font-size: 16px;
        }

        .calc-card {
          margin-top: 48px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 40px;
          text-align: left;
        }

        .calc-currency {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }

        .calc-btn {
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
        }

        .calc-btn.active {
          background: #2563EB;
          border-color: #2563EB;
          color: white;
        }

        .calc-slider-wrap {
          margin-bottom: 34px;
        }

        .calc-slider-wrap label {
          display: block;
          color: rgba(255,255,255,0.6);
          margin-bottom: 10px;
          font-size: 13px;
          text-transform: uppercase;
        }

        .calc-number {
          font-size: 48px;
          color: white;
          margin-bottom: 16px;
        }

        .calc-results {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 40px;
        }

        .calc-result {
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.18);
          padding: 20px;
        }

        .calc-result span {
          display: block;
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          text-transform: uppercase;
        }

        .calc-result strong {
          display: block;
          margin-top: 10px;
          color: white;
          font-size: 26px;
          font-weight: 400;
        }

        .calc-cta-wrap {
          text-align: center;
          margin-top: 40px;
        }

        .calc-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2563EB;
          color: white;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .calc-section {
            padding: 80px 16px;
          }

          .calc-card {
            padding: 24px 18px;
          }

          .calc-results {
            grid-template-columns: 1fr;
          }

          .calc-number {
            font-size: 38px;
          }

          .calc-cta {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .calc-heading {
            font-size: 30px;
          }

          .calc-sub {
            font-size: 14px;
          }

          .calc-number {
            font-size: 32px;
          }

          .calc-result strong {
            font-size: 22px;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   PRICING TEASER
========================= */

export function PricingTeaser() {
  return (
    <section className="pricing-section">
      <div className="pricing-wrap">
        <div className="pricing-tag">Pricing</div>

        <h2 className="pricing-heading">
          TRANSPARENT PRICING.
          <br />
          NO SURPRISES.
        </h2>

        <p className="pricing-text">Plans that scale with your organisation. No hidden charges.</p>

        <div className="pricing-btn-wrap">
          <Link to="/pricing" hash="enquire" className="pricing-btn">
            Talk to Our Team
          </Link>
        </div>
      </div>

      <style>{`
        .pricing-section {
          background: #F5F0EA;
          padding: 90px 20px;
        }

        .pricing-wrap {
          max-width: 850px;
          margin: 0 auto;
          text-align: center;
        }

        .pricing-tag {
          color: #2563EB;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 11px;
        }

        .pricing-heading {
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1;
          color: #1C1410;
          margin-top: 24px;
          font-weight: 300;
        }

        .pricing-text {
          max-width: 580px;
          margin: 24px auto 0;
          color: #6B6258;
          line-height: 1.8;
          font-size: 16px;
        }

        .pricing-btn-wrap {
          margin-top: 36px;
        }

        .pricing-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border-radius: 999px;
          border: 1px solid rgba(107,98,88,0.3);
          text-decoration: none;
          color: #6B6258;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .pricing-section {
            padding: 70px 16px;
          }

          .pricing-text {
            font-size: 14px;
          }

          .pricing-btn {
            width: 100%;
            max-width: 320px;
          }
        }

        @media (max-width: 480px) {
          .pricing-heading {
            font-size: 30px;
          }

          .pricing-text {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
