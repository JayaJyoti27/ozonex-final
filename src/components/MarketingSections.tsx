import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiggyBank, ShieldCheck, Zap, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============ LOGO STRIP — FIX #6: "Sectors We Serve" ============ */

// FIX #6: Replaced company names with sectors
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

// Split into two rows
const ROW1 = SECTORS.slice(0, 7);
const ROW2 = SECTORS.slice(7);

export function LogoStrip() {
  return (
    <section style={{ background: "#F5F0EA", padding: "0 0 60px" }}>
      <div style={{
        textAlign: "center",
        fontFamily: "Inter, sans-serif", fontSize: 10,
        textTransform: "uppercase", letterSpacing: "0.2em",
        color: "#6B6258", padding: "60px 0 32px",
      }}>
        {/* FIX #6: Changed label */}
        Sectors We Serve
      </div>
      <MarqueeRow items={ROW1} />
      <div style={{ height: 16 }} />
      <MarqueeRow items={ROW2} reverse />
    </section>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask marquee-row">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((label, i) => (
          <span key={i} className="marquee-item">{label}</span>
        ))}
      </div>
    </div>
  );
}

/* ============ VALUE PROPOSITION ============ */
const VALUE_PROPS = [
  { Icon: PiggyBank,   title: "Save on Every Trip",       body: "Average 23% reduction in travel spend in the first 6 months." },
  { Icon: ShieldCheck, title: "Stay Within Budget",       body: "Policy guardrails mean employees only see what they are allowed to book. No overspend. No surprises." },
  { Icon: Zap,         title: "Approvals in Minutes",     body: "Multi-level approvals route automatically. Average approval time: under 6 minutes." },
  { Icon: BarChart3,   title: "Expenses Close Themselves",body: "80% of expense reports auto-complete before the employee submits anything." },
];

export function ValueProps() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".vp-col",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 78%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} style={{
      background: "#F5F0EA",
      padding: "60px 80px",
      borderTop: "1px solid rgba(37,99,235,0.1)",
      borderBottom: "1px solid rgba(37,99,235,0.1)",
    }}>
      <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {VALUE_PROPS.map(({ Icon, title, body }) => (
          <div key={title} className="vp-col">
            <Icon size={28} color="#2563EB" strokeWidth={1.6} />
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "#1C1410", marginTop: 16 }}>
              {title}
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B6258", lineHeight: 1.7, marginTop: 8 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ COMPARISON ============ */
const WITHOUT = [
  "Employees book on personal cards or consumer apps outside policy",
  "Finance chases receipts for weeks after every trip",
  "Approvals happen over WhatsApp or email — no audit trail",
  "CFO has no idea what travel actually costs until month-end",
  "Policy violations discovered after the money is spent",
];
const WITH = [
  "Every booking is policy-compliant before it is confirmed",
  "Expenses auto-capture at point of spend — zero receipt chasing",
  "Approvals route automatically with full digital audit trail",
  "CFO sees live travel spend updated with every booking",
  "Non-compliant options never reach the employee's screen",
];

export function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cmp-left",  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" } });
      gsap.fromTo(".cmp-right", { x:  40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} style={{ background: "#F5F0EA", padding: "120px 80px" }}>
      <h2 className="font-display text-center" style={{
        fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 0.95,
        color: "#1C1410", fontWeight: 300, marginBottom: 64,
      }}>
        THE DIFFERENCE IS<br />IMMEDIATE.
      </h2>
      <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2" style={{ gap: 2 }}>
        <div className="cmp-left">
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 12,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#6B6258", padding: "20px 32px",
            background: "rgba(37,99,235,0.04)",
            borderBottom: "1px solid rgba(37,99,235,0.15)",
          }}>Without Ozonex</div>
          {WITHOUT.map((t) => (
            <div key={t} style={{ padding: "20px 32px", borderBottom: "1px solid rgba(37,99,235,0.08)",
              fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B6258", lineHeight: 1.6 }}>
              <span style={{ color: "rgba(107,98,88,0.6)", marginRight: 12 }}>✗</span>{t}
            </div>
          ))}
        </div>
        <div className="cmp-right">
          <div style={{
            fontFamily: "Inter, sans-serif", fontSize: 12,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#2563EB", padding: "20px 32px",
            background: "rgba(37,99,235,0.06)",
            borderBottom: "1px solid rgba(37,99,235,0.15)",
          }}>With Ozonex</div>
          {WITH.map((t) => (
            <div key={t} style={{ padding: "20px 32px", borderBottom: "1px solid rgba(37,99,235,0.08)",
              fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1C1410", lineHeight: 1.6 }}>
              <span style={{ color: "#2563EB", marginRight: 12, fontWeight: 600 }}>✓</span>{t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CALCULATOR — FIX #4: Rupee → Money, FIX #12: Dubai currency ============ */

// FIX #12: Currency options including Dubai (AED)
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
  const hours = Math.round(employees * 0.8);
  const fmtMoney = (n: number) => currency.symbol + " " + n.toLocaleString(currency.locale);

  return (
    <section className="relative grid-overlay calc-outer">
      <svg
        className="absolute top-[-1px] left-0 w-full"
        height="60" viewBox="0 0 1440 60" preserveAspectRatio="none"
        style={{ display: "block", zIndex: 5 }}
      >
        <path d="M0,30 C120,5 240,55 360,25 C480,0 600,50 720,25 C840,5 960,45 1080,30 C1200,15 1320,40 1440,18 L1440,0 L0,0 Z" fill="#F5F0EA" />
      </svg>

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <h2 className="font-display calc-h2">
          HOW MUCH COULD<br />YOUR COMPANY SAVE?
        </h2>
        <p className="calc-intro">
          Tell us about your travel programme. We will show you the numbers.
        </p>

        <div className="calc-card">
          {/* Currency selector */}
          <div className="calc-currency-row">
            <span className="calc-currency-lbl">Currency</span>
            <div className="calc-currency-btns">
              {CURRENCIES.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setCurrencyIdx(i)}
                  className={`calc-cur-btn${currencyIdx === i ? " active" : ""}`}
                >{c.label}</button>
              ))}
            </div>
          </div>

          <Slider label="Number of employees who travel" value={employees} min={50} max={5000} step={50} onChange={setEmployees} />
          <div className="calc-spacer" />
          <Slider label="Average trips per employee per year" value={trips} min={2} max={24} step={1} onChange={setTrips} />

          {/* Result boxes */}
          <div className="calc-results">
            <ResultBox label="Estimated annual saving" value={fmtMoney(saving)} valueColor="#2563EB" sub="vs unmanaged travel spend" />
            <ResultBox label="Policy compliance rate" value="94%" sub="average on Ozonex vs 41% without a platform" />
            <ResultBox label="Hours saved in finance" value={`${hours} hrs/mo`} sub="on expense reconciliation" />
          </div>

          <div className="calc-cta-wrap">
            <a
              href="/pricing#enquire"
              className="calc-cta-btn"
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
            >Book a Free Demo</a>
            <div className="calc-disclaimer">No commitment. 30 minutes. Built around your numbers.</div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── CALCULATOR OUTER ── */
        .calc-outer {
          background: #1C1410;
          padding: 120px 24px 100px;
          position: relative;
        }
        .calc-h2 {
          font-size: clamp(36px, 5vw, 60px);
          color: #fff;
          font-weight: 300;
          line-height: 1.0;
        }
        .calc-intro {
          font-family: Poppins, sans-serif;
          font-size: 16px;
          color: rgba(255,255,255,0.65);
          max-width: 480px;
          margin: 24px auto 0;
          line-height: 1.75;
        }

        /* ── CARD ── */
        .calc-card {
          max-width: 640px;
          margin: 56px auto 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 48px;
          text-align: left;
        }
        .calc-spacer { height: 40px; }

        /* ── CURRENCY ── */
        .calc-currency-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .calc-currency-lbl {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .calc-currency-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .calc-cur-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-family: Poppins, sans-serif;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.05em;
        }
        .calc-cur-btn.active {
          border-color: #2563EB;
          background: #2563EB;
          color: #fff;
        }

        /* ── RESULTS ── */
        .calc-results {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        /* ── CTA ── */
        .calc-cta-wrap { text-align: center; margin-top: 36px; }
        .calc-cta-btn {
          display: inline-block;
          background: #2563EB;
          color: #fff;
          border-radius: 50px;
          padding: 14px 40px;
          font-family: Poppins, sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .calc-disclaimer {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 14px;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .calc-card { padding: 36px 28px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .calc-outer {
            padding: 80px 16px 80px; /* bottom padding fixes overlap */
          }
          .calc-h2 { font-size: clamp(28px, 8vw, 44px); }
          .calc-intro { font-size: 14px; }
          .calc-card {
            padding: 24px 16px;
            margin-top: 32px;
          }
          .calc-spacer { height: 28px; }
          .calc-currency-row { gap: 8px; margin-bottom: 24px; }
          .calc-cur-btn { font-size: 10px; padding: 5px 10px; }

          /* Stack results vertically */
          .calc-results {
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 28px;
          }

          .calc-cta-btn {
            display: block;
            max-width: 260px;
            margin: 0 auto;
            text-align: center;
            padding: 13px 20px;
            font-size: 11px;
          }
          .calc-disclaimer { font-size: 11px; }
        }

        /* ── SMALL MOBILE ── */
        @media (max-width: 480px) {
          .calc-outer { padding: 60px 12px 80px; }
          .calc-card { padding: 20px 14px; }
        }
      `}</style>
    </section>
  );
}


function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div style={{
        fontFamily: "Inter, sans-serif", fontSize: 13,
        color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
        letterSpacing: "0.1em", marginBottom: 12,
      }}>{label}</div>
      <div className="font-display" style={{ fontSize: 48, color: "#fff", fontWeight: 300, lineHeight: 1 }}>
        {value.toLocaleString("en-IN")}
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-blue"
        style={{
          marginTop: 18,
          background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((value-min)/(max-min))*100}%, rgba(255,255,255,0.1) ${((value-min)/(max-min))*100}%, rgba(255,255,255,0.1) 100%)`,
          borderRadius: 2, height: 4,
        }}
      />
    </div>
  );
}

function ResultBox({ label, value, valueColor = "#fff", sub }: {
  label: string; value: string; valueColor?: string; sub: string;
}) {
  return (
    <div style={{
      padding: 20,
      border: "1px solid rgba(37,99,235,0.2)",
      background: "rgba(37,99,235,0.06)",
    }}>
      <div style={{
        fontFamily: "Inter, sans-serif", fontSize: 10,
        color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}>{label}</div>
      <div className="font-display" style={{
        fontSize: 28, color: valueColor, fontWeight: 300,
        marginTop: 10, lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: "Inter, sans-serif", fontSize: 11,
        color: "rgba(255,255,255,0.4)", marginTop: 10, lineHeight: 1.5,
      }}>{sub}</div>
    </div>
  );
}

/* ============ PRICING TEASER — FIX #9: Remove "See Pricing Plans" button ============ */
export function PricingTeaser() {
  return (
    <section style={{ background: "#F5F0EA", padding: "80px 24px" }}>
      <div className="max-w-[800px] mx-auto text-center">
        <div style={{
          fontFamily: "Inter, sans-serif", fontSize: 11,
          color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 500,
        }}>Pricing</div>
        <h2 className="font-display" style={{
          fontSize: "clamp(40px, 5vw, 52px)", color: "#1C1410",
          fontWeight: 300, lineHeight: 1.0, marginTop: 24,
        }}>
          TRANSPARENT PRICING.<br />NO SURPRISES.
        </h2>
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: 16,
          color: "#6B6258", maxWidth: 480, margin: "24px auto 0",
          lineHeight: 1.75,
        }}>
          Plans that scale with your organisation. No per-booking fees.
          No hidden charges. Just one monthly platform fee per traveller —
          and savings that more than cover it.
        </p>
        {/* FIX #9: Removed "See Pricing Plans" button, kept only "Talk to Our Team" */}
        <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/contact" style={{
            border: "1px solid rgba(107,98,88,0.4)", color: "#6B6258",
            background: "transparent", borderRadius: 50,
            padding: "12px 32px", fontFamily: "Inter, sans-serif",
            fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
            fontWeight: 500, textDecoration: "none",
          }}>Talk to Our Team</a>
        </div>
      </div>
    </section>
  );
}
