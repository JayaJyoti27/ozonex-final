import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";
import { ProductFeatureModules } from "@/components/ProductFeatureModules";

import heroImg from "@/assets/product-hero.jpg";
import bookingImg from "@/assets/product-booking.jpg";
import approvalImg from "@/assets/product-approval.jpg";
import expenseImg from "@/assets/product-expense.jpg";
import policyImg from "@/assets/product-policy.jpg";
import analyticsImg from "@/assets/product-analytics.jpg";
import accessImg from "@/assets/product-access.jpg";
import ctaImg from "@/assets/product-cta.jpg";

gsap.registerPlugin(ScrollTrigger);

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ozonex",
  applicationCategory: "BusinessApplication",
  description:
    "Enterprise corporate travel management software with booking, approvals, expense tracking, and policy enforcement.",
  operatingSystem: "Web, iOS, Android",
  offers: { "@type": "Offer", url: "https://ozonex.com/pricing" },
};

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Corporate Travel Management Platform | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex is an enterprise travel management platform unifying booking, approvals, expense tracking, and policy enforcement in one connected system. Built for CFOs, HR directors, and global operations teams.",
      },
      { property: "og:title", content: "Corporate Travel Management Platform | Ozonex" },
      {
        property: "og:description",
        content:
          "Unify booking, approvals, expense tracking, and policy enforcement in one connected enterprise travel platform.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/product" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(schema) },
    ],
  }),
  component: ProductPage,
});

const modules = [
  {
    n: "01",
    title: "SMART TRAVEL BOOKING",
    tag: "Search. Compare. Book. All within policy.",
    desc:
      "Employees search and book flights, hotels, and ground transport through a consumer-grade interface — but every result is filtered against your live travel policy before it ever appears on screen.",
    img: bookingImg,
    subs: [
      ["Multi-city itineraries", "Complex routing across time zones"],
      ["Preferred vendor rates", "Negotiated fares surfaced first"],
      ["One-click booking", "Approval-ready trip packages"],
      ["24/7 support", "Human backup for every automated booking"],
    ],
  },
  {
    n: "02",
    title: "APPROVAL WORKFLOWS",
    tag: "No bottlenecks. No blind spots.",
    desc:
      "Define approval chains that mirror your actual org chart. Requests route automatically — to the right manager, at the right level, every time. Approvals happen in one click from email or mobile.",
    img: approvalImg,
    subs: [
      ["Multi-level hierarchy", "Up to 6 approval tiers"],
      ["Auto-escalation", "Triggered after configurable SLA hours"],
      ["Mobile approvals", "Full functionality on any device"],
      ["Audit trail", "Every decision logged with timestamp"],
    ],
  },
  {
    n: "03",
    title: "EXPENSE TRACKING",
    tag: "From receipt to reconciliation in minutes.",
    desc:
      "Capture expenses at the point of spend. Ozonex auto-matches receipts to bookings, maps costs to budget codes, and flags anomalies before they reach finance.",
    img: expenseImg,
    subs: [
      ["Real-time dashboards", "Live spend by traveller and department"],
      ["Receipt capture", "Mobile OCR scanning, zero manual entry"],
      ["Cost centre mapping", "Automatic GL code assignment"],
      ["Budget alerts", "Threshold notifications before overspend"],
    ],
  },
  {
    n: "04",
    title: "POLICY MANAGEMENT",
    tag: "Your rules. Automatically enforced.",
    desc:
      "Build granular travel policies by department, grade, route, and spend category. Ozonex enforces them silently in the background — no policing required.",
    img: policyImg,
    subs: [
      ["Custom rule builder", "Visual drag-and-drop policy editor"],
      ["Auto-enforcement", "Non-compliant options hidden at search"],
      ["Exception handling", "Justified overrides with approver sign-off"],
      ["Compliance reports", "Monthly policy adherence by team"],
    ],
  },
  {
    n: "05",
    title: "REPORTING & ANALYTICS",
    tag: "Data your CFO will actually read.",
    desc:
      "Pre-built CFO-ready dashboards surface the numbers that matter: total travel spend, savings vs benchmark, policy compliance rate, and top traveller cost analysis — all exportable in one click.",
    img: analyticsImg,
    subs: [
      ["Spend analytics", "Total cost breakdown by route and vendor"],
      ["Department insights", "Drill-down by team, grade, or project"],
      ["Trend analysis", "12-month rolling travel pattern reports"],
      ["Savings tracking", "Benchmarked against industry fare data"],
    ],
  },
  {
    n: "06",
    title: "MULTI-LEVEL ACCESS",
    tag: "The right view for every role.",
    desc:
      "Ozonex is not a single dashboard — it is five distinct role-based environments. Each user sees exactly what their function demands, nothing more and nothing less.",
    img: accessImg,
    subs: [
      ["Admin console", "Full platform configuration and user management"],
      ["HR view", "Duty of care, traveller location, welfare alerts"],
      ["Finance view", "Real-time spend, forecasts, and reconciliation"],
      ["Manager view", "Team bookings, approvals, and budget burn rate"],
    ],
  },
];

const faqs: [string, string][] = [
  [
    "How long does Ozonex take to implement?",
    "Most enterprises are fully live within 3–6 weeks. Implementation includes SSO setup, HR data sync, travel policy configuration, and a full admin training session. Our implementation team manages the entire process with a dedicated project lead.",
  ],
  [
    "Does Ozonex replace our existing travel agent?",
    "Ozonex is a platform, not an agent. It automates the parts that should be automated — search, booking, approvals, expense capture — while your human operations team retains full oversight via the admin console. Many clients use Ozonex alongside their existing TMC relationships.",
  ],
  [
    "How does policy enforcement actually work?",
    "Policy rules are configured in the Policy Management module by your admin. When an employee searches for a flight or hotel, Ozonex filters the results in real time — non-compliant options are either hidden or flagged before they can be selected. No pop-up warnings after booking.",
  ],
  [
    "Can we have different policies for different departments?",
    "Yes. Ozonex supports unlimited policy rulesets — by department, job grade, travel route, booking class, and spend category. A VP in sales can have a different policy to a junior analyst, fully automated.",
  ],
  [
    "Is there a mobile app for travellers?",
    "Yes. The employee portal is fully responsive and available as a Progressive Web App. Travellers can search, book, submit expenses, and view their itinerary from any device. Approvers can approve or reject requests from a single mobile notification.",
  ],
  [
    "How does Ozonex handle duty of care?",
    "The HR view provides real-time traveller location data, live flight status, and automated welfare check alerts for travel to high-risk regions. Emergency rebooking can be initiated directly from the HR console.",
  ],
];

const integrations = [
  "SAP", "ORACLE", "WORKDAY", "SALESFORCE", "SLACK", "MICROSOFT TEAMS",
  "CONCUR", "QUICKBOOKS", "ZOHO", "NETSUITE", "BAMBOOHR", "JIRA",
];

function ProductPage() {
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

    const ctx = gsap.context(() => {
      // Hero word stagger
      gsap.fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-word",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 0.35 }
      );
      gsap.fromTo(
        ".hero-fade",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.9 }
      );

      // Statement
      gsap.fromTo(
        ".st-headline",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".st-headline", start: "top 80%" } }
      );
      gsap.fromTo(
        ".st-para",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: ".st-para", start: "top 85%" } }
      );
      gsap.fromTo(
        ".st-stat",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".st-stats", start: "top 85%" } }
      );
      // Count up
      document.querySelectorAll<HTMLElement>(".count-up").forEach((el) => {
        const end = Number(el.dataset.to || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
        });
      });

      // Modules
      gsap.utils.toArray<HTMLElement>(".mod-block").forEach((block) => {
        gsap.fromTo(
          block.querySelector(".mod-num"),
          { scale: 0 },
          { scale: 1, duration: 0.7, ease: "back.out(1.7)", scrollTrigger: { trigger: block, start: "top 75%" } }
        );
        gsap.fromTo(
          block.querySelector(".mod-photo"),
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.0, ease: "power2.out", scrollTrigger: { trigger: block, start: "top 75%" } }
        );
        const dir = block.classList.contains("even") ? -60 : 60;
        gsap.fromTo(
          block.querySelector(".mod-text"),
          { x: dir, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: block, start: "top 75%" } }
        );
        gsap.fromTo(
          block.querySelectorAll(".mod-sub"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.4, ease: "power2.out", scrollTrigger: { trigger: block, start: "top 75%" } }
        );
      });

      // Connected workflow cards
      gsap.fromTo(
        ".cw-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".cw-section", start: "top 70%" } }
      );
      gsap.to(".cw-diagram", {
        rotation: 360, duration: 40, repeat: -1, ease: "none", transformOrigin: "50% 50%",
      });

      // CTA parallax + word stagger
      gsap.to(".pcta-bg", {
        yPercent: -25, ease: "none",
        scrollTrigger: { trigger: ".pcta", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".pcta-word", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".pcta", start: "top 60%" },
      });
      gsap.fromTo(".pcta-btn", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".pcta", start: "top 60%" },
      });

      // FAQ stagger
      gsap.fromTo(".faq-row", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08,
        scrollTrigger: { trigger: ".faq-section", start: "top 80%" },
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative">
      <Nav />
      <ScrollLineV />

      {/* SECTION 1 — HERO */}
      <section className="relative w-full min-h-screen overflow-hidden grid-overlay" style={{ background: "var(--ink)" }}>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.72)" }} />

        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">
          <div className="hero-eyebrow eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
            Enterprise Travel Platform
          </div>

          <h1 className="font-display mt-8 text-white" style={{ fontSize: "clamp(56px,8vw,96px)", lineHeight: 0.92 }}>
            {[["Book", "it."], ["Approve", "it.", "Track", "it."], ["All", "in", "one", "place."]].map((line, i) => (
              <span key={i} className="block">
                {line.map((w, j) => (
                  <span key={j} className="hero-word inline-block mr-3">{w}</span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-10 mx-auto" style={{ maxWidth: 560, fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
            Ozonex unifies corporate travel booking, approvals, policy, and expenses into one platform — so your team books faster, finance sees everything live, and nothing slips through the cracks.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#features" className="pill">See How It Works</a>
            <a
              href="/contact"
              className="pill"
              style={{ background: "#2563EB", borderColor: "#2563EB" }}
            >
              Book a Free Demo
            </a>
          </div>
        </div>

        <TornEdge fill="#F5F0EA" position="bottom" />
      </section>

      {/* SECTION 2 — STATEMENT */}
      <section className="relative w-full overflow-hidden" style={{ background: "var(--cream)", padding: "120px 24px" }}>
        {/* faint world map watermark */}
        <svg
          className="absolute inset-0 m-auto pointer-events-none"
          style={{ opacity: 0.06, color: "#6B6258", width: "min(1100px, 90%)", top: "10%" }}
          viewBox="0 0 1000 500" fill="none" stroke="currentColor" strokeWidth="1"
        >
          <path d="M120,180 C160,140 220,150 280,170 C320,160 360,180 380,210 C420,200 470,210 500,240 C540,230 590,250 620,230 C680,240 720,210 760,230 C800,220 850,240 880,270 C840,300 800,290 760,310 C720,330 680,310 640,330 C600,340 560,320 520,340 C470,330 430,360 390,340 C340,360 300,340 270,360 C230,340 190,360 160,340 C130,320 110,290 100,260 C90,230 100,200 120,180 Z" />
        </svg>

        <div className="relative max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <h2 className="st-headline font-display" style={{ fontSize: "clamp(48px,6vw,88px)", color: "var(--ink)", lineHeight: 0.95 }}>
            What takes your<br />team days takes<br />Ozonex seconds
          </h2>
          <div className="flex flex-col gap-6" style={{ maxWidth: 480 }}>
            <p className="st-para" style={{ fontSize: 16, color: "var(--muted-warm)", lineHeight: 1.8 }}>
              Most travel tools are booking engines dressed up as platforms. Ozonex is different — it is a connected intelligence layer that sits between your workforce and every travel decision they make.
            </p>
            <p className="st-para" style={{ fontSize: 16, color: "var(--muted-warm)", lineHeight: 1.8 }}>
              From the moment a trip is requested to the moment the expense report is reconciled, every step runs through Ozonex — automated, policy-aware, and fully auditable.
            </p>
          </div>
        </div>

        <div className="relative max-w-[1320px] mx-auto" style={{ margin: "64px auto", height: 1, background: "rgba(37,99,235,0.3)" }} />

        <div className="st-stats relative max-w-[1320px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { num: "6", suffix: " min", label: "Average booking time", count: true },
            { num: "100", suffix: "%", label: "Policy auto-enforcement", count: true },
            { num: "Zero", suffix: "", label: "Manual expense reports" },
            { num: "Real-time", suffix: "", label: "CFO spend visibility" },
          ].map((s) => (
            <div key={s.label} className="st-stat">
              <div className="font-display" style={{ fontSize: "clamp(48px,5vw,64px)", color: "var(--ink)", marginBottom: 8 }}>
                {s.count ? (
                  <>
                    <span className="count-up" data-to={s.num}>0</span>
                    {s.suffix}
                  </>
                ) : (
                  <span>{s.num}</span>
                )}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted-warm)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 24 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — FEATURE MODULES (rebuilt) */}
      <ProductFeatureModules />

      {/* SECTION 4 — CONNECTED WORKFLOW */}
      <section className="cw-section relative w-full overflow-hidden grid-overlay" style={{ background: "var(--ink)", padding: "160px 24px 140px" }}>
        <TornEdge fill="#1C1410" position="top" />

        <div className="text-center max-w-[1320px] mx-auto">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>The connected workflow</div>
          <h2 className="font-display mt-6 text-white" style={{ fontSize: "clamp(40px,5vw,64px)", lineHeight: 1.05 }}>
            Request to reconciliation<br />in one unbroken loop
          </h2>
        </div>

        <div className="relative max-w-[1320px] mx-auto mt-24 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          {/* top row */}
          <div className="cw-card lg:order-1">
            <h3 className="font-display text-white" style={{ fontSize: 28 }}>Fully Automated</h3>
            <p className="mt-4" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              Every handoff between booking, approval, and expense happens without a single email or manual step.
            </p>
          </div>

          {/* center diagram spans both rows */}
          <div className="lg:order-2 lg:row-span-2 flex items-center justify-center">
            <svg className="cw-diagram" width="380" height="380" viewBox="-200 -200 400 400">
              {(() => {
                const labels = ["BOOKING", "APPROVAL", "POLICY", "EXPENSE", "ANALYTICS", "ACCESS"];
                const r = 150;
                const nodes = labels.map((l, i) => {
                  const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
                  return { l, x: Math.cos(a) * r, y: Math.sin(a) * r };
                });
                return (
                  <>
                    {nodes.map((n, i) => {
                      const next = nodes[(i + 1) % nodes.length];
                      const cx = (n.x + next.x) / 2 * 0.6;
                      const cy = (n.y + next.y) / 2 * 0.6;
                      return (
                        <path
                          key={i}
                          d={`M ${n.x},${n.y} Q ${cx},${cy} ${next.x},${next.y}`}
                          stroke="var(--sand)" strokeWidth="1.5" fill="none" opacity="0.7"
                        />
                      );
                    })}
                    {nodes.map((n) => (
                      <g key={n.l} transform={`translate(${n.x},${n.y})`}>
                        <circle r="8" fill="var(--ink)" stroke="var(--sand)" strokeWidth="1.5" />
                        <text
                          y="26" textAnchor="middle" fill="#fff"
                          style={{ fontSize: 11, fontFamily: "Inter", letterSpacing: "0.1em" }}
                        >{n.l}</text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="cw-card lg:order-3 lg:text-right">
            <h3 className="font-display text-white" style={{ fontSize: 28 }}>Policy-First Architecture</h3>
            <p className="mt-4" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              Policy is not a filter applied after search — it is baked into every layer of the platform from day one.
            </p>
          </div>

          {/* bottom row */}
          <div className="cw-card lg:order-4">
            <h3 className="font-display text-white" style={{ fontSize: 28 }}>Real-Time Everywhere</h3>
            <p className="mt-4" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              Travellers, managers, and finance see the same live data simultaneously. No lag, no reconciliation delay.
            </p>
          </div>
          <div className="cw-card lg:order-6 lg:text-right">
            <h3 className="font-display text-white" style={{ fontSize: 28 }}>Built for Scale</h3>
            <p className="mt-4" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              From 50 travellers to 50,000 — Ozonex handles enterprise complexity without adding operational overhead.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — INTEGRATION STRIP */}
      <section className="relative w-full overflow-hidden" style={{ background: "var(--cream)", padding: "140px 24px 120px" }}>
        <TornEdge fill="#F5F0EA" position="top" />

        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="font-display" style={{ fontSize: "clamp(36px,4vw,48px)", color: "var(--ink)", lineHeight: 1.05 }}>
            Connects with the tools<br />your enterprise already uses
          </h2>
          <p className="mt-6 mx-auto" style={{ maxWidth: 520, fontSize: 16, color: "var(--muted-warm)", lineHeight: 1.7 }}>
            Ozonex plugs into your existing HR, finance, and ERP stack — no rip and replace. Pre-built connectors for the platforms your teams depend on daily.
          </p>
        </div>

        <div className="relative w-full mt-16 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
            {[...integrations, ...integrations, ...integrations].map((x, i) => (
              <span key={i} className="inline-flex items-center" style={{ fontSize: 13, color: "var(--ink)", letterSpacing: "0.1em", padding: "0 28px" }}>
                {x}
                <span style={{ color: "var(--sand)", marginLeft: 28 }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>

        <div className="max-w-[1320px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            ["HRIS Systems", "Connect traveller profiles directly to your HR database for automatic grade-based policy assignment."],
            ["ERP & Finance", "Push approved expenses directly to your GL with automatic cost centre and project mapping."],
            ["Communication", "Receive booking confirmations, approval requests, and alerts inside Slack or Teams."],
          ].map(([t, d]) => (
            <div key={t}>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>{t}</div>
              <p className="mt-4" style={{ fontSize: 15, color: "var(--muted-warm)", lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="pcta relative w-full overflow-hidden grid-overlay" style={{ background: "var(--ink)", height: "100vh", minHeight: 640 }}>
        <div
          className="pcta-bg absolute inset-0"
          style={{ backgroundImage: `url(${ctaImg})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.68)" }} />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-display text-white" style={{ fontSize: "clamp(56px,8vw,80px)", lineHeight: 1.0 }}>
            {[["See", "the", "platform"], ["in", "motion"]].map((line, i) => (
              <span key={i} className="block">
                {line.map((w, j) => (
                  <span key={j} className="pcta-word inline-block mr-3">{w}</span>
                ))}
              </span>
            ))}
          </h2>
          <p className="pcta-btn mt-8 mx-auto" style={{ maxWidth: 480, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
            A 30-minute live walkthrough shows you exactly how Ozonex would work for your org structure, your approval hierarchy, and your travel spend profile.
          </p>
          <div className="pcta-btn mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="pill" style={{ background: "#2563EB", borderColor: "#2563EB", padding: "16px 48px" }}>Book a Free Demo</a>
            <a href="#brief" className="pill" style={{ padding: "16px 48px" }}>Get the Overview</a>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="faq-section relative w-full" style={{ background: "var(--cream)", padding: "120px 24px" }}>
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-lg select-none" style={{ color: "var(--gold)", opacity: 0.5 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-lg select-none" style={{ color: "var(--gold)", opacity: 0.5 }}>✦</span>

        <h2 className="font-display text-center" style={{ fontSize: "clamp(36px,4vw,48px)", color: "var(--ink)", lineHeight: 1.05 }}>
          Questions about<br />the platform
        </h2>

        <div className="max-w-[820px] mx-auto mt-16">
          {faqs.map(([q, a], i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="faq-row border-b" style={{ borderColor: "#D4C9BE" }}>
                <button onClick={() => setOpenFaq(isOpen ? -1 : i)} className="w-full flex items-center justify-between text-left" style={{ padding: "28px 0" }}>
                  <span style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500 }}>{q}</span>
                  <span className="transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: "var(--ink)" }}>⌄</span>
                </button>
                <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: isOpen ? 400 : 0 }}>
                  <p className="pb-7 pr-12" style={{ fontSize: 15, color: "var(--muted-warm)", lineHeight: 1.75 }}>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
