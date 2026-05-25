import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiggyBank, ShieldCheck, Zap, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============ LOGO STRIP ============ */
const SECTORS = [
  "Information Technology (IT)", "Healthcare & Medical", "Education & Training",
  "Travel & Tourism", "Finance & Banking", "Construction", "Manufacturing",
  "Hospitality & Hotels", "Logistics & Transportation", "Media & Entertainment",
  "Import & Export", "Marketing & Advertising", "Event Management", "Interior Design & Furniture",
];
const ROW1 = SECTORS.slice(0, 7);
const ROW2 = SECTORS.slice(7);

export function LogoStrip() {
  return (
    <section style={{ background: "#F5F0EA", padding: "0 0 60px", overflow: "hidden" }}>
      <div style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#6B6258", padding: "60px 0 32px" }}>
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

/* ============ VALUE PROPS ============ */
const VALUE_PROPS = [
  { Icon: PiggyBank,   title: "Save on Every Trip",        body: "Average 23% reduction in travel spend in the first 6 months." },
  { Icon: ShieldCheck, title: "Stay Within Budget",        body: "Policy guardrails mean employees only see what they are allowed to book. No overspend. No surprises." },
  { Icon: Zap,         title: "Approvals in Minutes",      body: "Multi-level approvals route automatically. Average approval time: under 6 minutes." },
  { Icon: BarChart3,   title: "Expenses Close Themselves", body: "80% of expense reports auto-complete before the employee submits anything." },
];

export function ValueProps() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".vp-col", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="vp-section">
      <div className="max-w-[1320px] mx-auto vp-grid">
        {VALUE_PROPS.map(({ Icon, title, body }) => (
          <div key={title} className="vp-col">
            <Icon size={24} color="#2563EB" strokeWidth={1.6} />
            <div className="vp-title">{title}</div>
            <p className="vp-body">{body}</p>
          </div>
        ))}
      </div>
      <style>{`
        .vp-section { background:#F5F0EA; padding:60px 80px; border-top:1px solid rgba(37,99,235,0.1); border-bottom:1px solid rgba(37,99,235,0.1); }
        .vp-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:40px; }
        .vp-title { font-family:Poppins,sans-serif; font-size:15px; font-weight:600; color:#1C1410; margin-top:14px; }
        .vp-body  { font-family:Poppins,sans-serif; font-size:13px; color:#6B6258; line-height:1.7; margin-top:8px; }
        @media(max-width:1024px){ .vp-section{padding:60px 32px;} }
        @media(max-width:768px){
          .vp-section{padding:48px 20px;}
          .vp-grid{grid-template-columns:repeat(2,1fr);gap:24px;}
          .vp-title{font-size:13px;margin-top:10px;}
          .vp-body{font-size:12px;}
        }
        @media(max-width:480px){
          .vp-section{padding:40px 16px;}
          .vp-col{background:rgba(37,99,235,0.04);border-radius:8px;padding:16px;}
        }
      `}</style>
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
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cmp-left",  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 78%" } });
      gsap.fromTo(".cmp-right", { x:  40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 78%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cmp-section">
      <h2 className="font-display cmp-heading">THE DIFFERENCE IS<br />IMMEDIATE.</h2>
      <div className="max-w-[960px] mx-auto cmp-grid">
        <div className="cmp-left">
          <div className="cmp-col-head" style={{ color: "#6B6258", background: "rgba(37,99,235,0.04)" }}>Without Ozonex</div>
          {WITHOUT.map((t) => (
            <div key={t} className="cmp-row"><span className="cmp-x">✗</span>{t}</div>
          ))}
        </div>
        <div className="cmp-right">
          <div className="cmp-col-head cmp-with-head">With Ozonex</div>
          {WITH.map((t) => (
            <div key={t} className="cmp-row cmp-row-with"><span className="cmp-check">✓</span>{t}</div>
          ))}
        </div>
      </div>
      <style>{`
        .cmp-section { background:#F5F0EA; padding:120px 80px; }
        .cmp-heading { font-size:clamp(40px,5vw,56px); line-height:0.95; color:#1C1410; font-weight:300; margin-bottom:64px; text-align:center; }
        .cmp-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
        .cmp-col-head { font-family:Poppins,sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; padding:20px 32px; border-bottom:1px solid rgba(37,99,235,0.15); }
        .cmp-with-head { color:#2563EB; background:rgba(37,99,235,0.06); }
        .cmp-row { display:flex; align-items:flex-start; gap:12px; padding:18px 32px; border-bottom:1px solid rgba(37,99,235,0.08); font-family:Poppins,sans-serif; font-size:14px; color:#6B6258; line-height:1.6; }
        .cmp-row-with { color:#1C1410; }
        .cmp-x { color:rgba(107,98,88,0.5); flex-shrink:0; margin-top:2px; }
        .cmp-check { color:#2563EB; font-weight:600; flex-shrink:0; margin-top:2px; }
        @media(max-width:1024px){ .cmp-section{padding:80px 32px;} }
        @media(max-width:768px){
          .cmp-section{padding:64px 20px;}
          .cmp-heading{margin-bottom:40px;}
          .cmp-grid{grid-template-columns:1fr;}
          .cmp-with-head{border-top:3px solid #2563EB;}
          .cmp-col-head{padding:14px 20px;}
          .cmp-row{padding:14px 20px;font-size:13px;}
        }
        @media(max-width:480px){
          .cmp-section{padding:48px 16px;}
          .cmp-row{font-size:12px;padding:12px 16px;}
          .cmp-col-head{padding:12px 16px;}
        }
      `}</style>
    </section>
  );
}

/* ============ CALCULATOR ============ */
const CURRENCIES = [
  { label: "INR (₹)", symbol: "₹", locale: "en-IN", multiplier: 4200 },
  { label: "USD ($)", symbol: "$", locale: "en-US", multiplier: 50 },
  { label: "AED (د.إ)", symbol: "د.إ", locale: "ar-AE", multiplier: 184 },
];

function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{label}</div>
      <div className="font-display" style={{ fontSize: 44, color: "#fff", fontWeight: 300, lineHeight: 1 }}>{value.toLocaleString("en-IN")}</div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-blue"
        style={{ marginTop: 16, background: `linear-gradient(to right,#2563EB 0%,#2563EB ${((value-min)/(max-min))*100}%,rgba(255,255,255,0.1) ${((value-min)/(max-min))*100}%,rgba(255,255,255,0.1) 100%)`, borderRadius: 2, height: 4 }}
      />
    </div>
  );
}

function ResultBox({ label, value, valueColor = "#fff", sub }: { label: string; value: string; valueColor?: string; sub: string }) {
  return (
    <div className="rbox">
      <div className="rbox-label">{label}</div>
      <div className="font-display rbox-value" style={{ color: valueColor }}>{value}</div>
      <div className="rbox-sub">{sub}</div>
      <style>{`
        .rbox { padding:16px; border:1px solid rgba(37,99,235,0.2); background:rgba(37,99,235,0.06); }
        .rbox-label { font-family:Poppins,sans-serif; font-size:10px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.1em; }
        .rbox-value { font-size:26px; font-weight:300; margin-top:8px; line-height:1; word-break:break-word; }
        .rbox-sub   { font-family:Poppins,sans-serif; font-size:11px; color:rgba(255,255,255,0.4); margin-top:8px; line-height:1.5; }
        @media(max-width:768px){
          .rbox { display:flex; align-items:center; gap:12px; padding:14px; }
          .rbox-value { font-size:22px; margin-top:0; min-width:80px; flex-shrink:0; }
          .rbox-label { font-size:9px; }
          .rbox-sub { margin-top:2px; font-size:10px; }
        }
      `}</style>
    </div>
  );
}

export function SavingsCalculator() {
  const [employees, setEmployees] = useState(500);
  const [trips, setTrips] = useState(8);
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const currency = CURRENCIES[currencyIdx];
  const saving = Math.round(employees * trips * currency.multiplier * 0.23);
  const hours  = Math.round(employees * 0.8);
  const fmtMoney = (n: number) => currency.symbol + " " + n.toLocaleString(currency.locale);

  return (
    <section className="relative grid-overlay calc-outer">
      <svg className="absolute top-[-1px] left-0 w-full" height="60" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display:"block", zIndex:5 }}>
        <path d="M0,30 C120,5 240,55 360,25 C480,0 600,50 720,25 C840,5 960,45 1080,30 C1200,15 1320,40 1440,18 L1440,0 L0,0 Z" fill="#F5F0EA" />
      </svg>

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <h2 className="font-display calc-h2">HOW MUCH COULD<br />YOUR COMPANY SAVE?</h2>
        <p className="calc-intro">Tell us about your travel programme. We will show you the numbers.</p>

        <div className="calc-card">
          <div className="calc-cur-row">
            <span className="calc-cur-lbl">Currency</span>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CURRENCIES.map((c, i) => (
                <button key={c.label} onClick={() => setCurrencyIdx(i)} className={`calc-cur-btn${currencyIdx===i?" active":""}`}>{c.label}</button>
              ))}
            </div>
          </div>

          <Slider label="Number of employees who travel" value={employees} min={50} max={5000} step={50} onChange={setEmployees} />
          <div className="calc-gap" />
          <Slider label="Average trips per employee per year" value={trips} min={2} max={24} step={1} onChange={setTrips} />

          <div className="calc-results">
            <ResultBox label="Estimated annual saving" value={fmtMoney(saving)} valueColor="#2563EB" sub="vs unmanaged travel spend" />
            <ResultBox label="Policy compliance rate" value="94%" sub="average on Ozonex vs 41% without a platform" />
            <ResultBox label="Hours saved in finance" value={`${hours} hrs/mo`} sub="on expense reconciliation" />
          </div>

          <div style={{ textAlign:"center", marginTop:32 }}>
            <a href="/pricing#enquire" className="calc-cta"
              onMouseEnter={(e) => (e.currentTarget.style.background="#1D4ED8")}
              onMouseLeave={(e) => (e.currentTarget.style.background="#2563EB")}
            >Book a Free Demo</a>
            <div style={{ fontFamily:"Poppins,sans-serif", fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:12 }}>
              No commitment. 30 minutes. Built around your numbers.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .calc-outer { background:#1C1410; padding:120px 24px 100px; position:relative; }
        .calc-h2 { font-size:clamp(32px,6vw,60px); color:#fff; font-weight:300; line-height:1.05; }
        .calc-intro { font-family:Poppins,sans-serif; font-size:15px; color:rgba(255,255,255,0.65); max-width:460px; margin:20px auto 0; line-height:1.75; }
        .calc-card { max-width:620px; margin:48px auto 0; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:40px; text-align:left; }
        .calc-gap { height:36px; }
        .calc-cur-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:28px; }
        .calc-cur-lbl { font-family:Poppins,sans-serif; font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.1em; }
        .calc-cur-btn { padding:5px 12px; border-radius:20px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:rgba(255,255,255,0.5); font-family:Poppins,sans-serif; font-size:11px; cursor:pointer; transition:all 0.2s; }
        .calc-cur-btn.active { border-color:#2563EB; background:#2563EB; color:#fff; }
        .calc-results { margin-top:32px; display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .calc-cta { display:inline-block; background:#2563EB; color:#fff; border-radius:50px; padding:13px 36px; font-family:Poppins,sans-serif; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; font-weight:500; text-decoration:none; transition:background 0.25s; }
        @media(max-width:1024px){ .calc-card{padding:32px 24px;} }
        @media(max-width:768px){
          .calc-outer{ padding:72px 16px 80px; }
          .calc-card{ padding:22px 16px; margin-top:28px; }
          .calc-gap{ height:24px; }
          .calc-cur-btn{ font-size:10px; padding:4px 10px; }
          .calc-results{ grid-template-columns:1fr; gap:8px; margin-top:24px; }
          .calc-cta{ display:block; max-width:240px; margin:0 auto; text-align:center; padding:12px 16px; font-size:11px; }
        }
        @media(max-width:480px){
          .calc-outer{ padding:56px 12px 72px; }
          .calc-card{ padding:18px 14px; }
        }
      `}</style>
    </section>
  );
}

/* ============ PRICING TEASER ============ */
export function PricingTeaser() {
  return (
    <section style={{ background: "#F5F0EA", padding: "80px 24px" }}>
      <div className="max-w-[800px] mx-auto text-center">
        <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 11, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 500 }}>Pricing</div>
        <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1C1410", fontWeight: 300, lineHeight: 1.0, marginTop: 24 }}>
          TRANSPARENT PRICING.<br />NO SURPRISES.
        </h2>
        <p style={{ fontFamily: "Poppins,sans-serif", fontSize: 16, color: "#6B6258", maxWidth: 480, margin: "20px auto 0", lineHeight: 1.75 }}>
          Plans that scale with your organisation. No per-booking fees. No hidden charges. Just one monthly platform fee per traveller — and savings that more than cover it.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/pricing#enquire" style={{ border: "1px solid rgba(107,98,88,0.4)", color: "#6B6258", background: "transparent", borderRadius: 50, padding: "12px 32px", fontFamily: "Poppins,sans-serif", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}>
            Talk to Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
