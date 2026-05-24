import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";
import { LogoStrip } from "@/components/MarketingSections";

import heroImg from "@/assets/sol-hero-boardroom.jpg";
import enterprisesImg from "@/assets/sol-enterprises-tower.jpg";
import financeImg from "@/assets/sol-finance-screen.jpg";
import smbsImg from "@/assets/sol-smbs-office.jpg";
import ctaImg from "@/assets/sol-cta-skyline.jpg";

gsap.registerPlugin(ScrollTrigger);

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ozonex Corporate Travel Solutions",
  provider: { "@type": "Organization", name: "Ozonex" },
  description:
    "Enterprise corporate travel management platform with solutions for HR, finance, IT, enterprises, and SMBs.",
  areaServed: ["IN", "AE", "Global"],
  url: "https://ozonex.com/solutions",
};

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Corporate Travel Management Solutions | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex delivers enterprise travel management solutions for large organisations, HR teams, finance departments, and growing SMBs. Policy enforcement, approval automation, and real-time expense visibility.",
      },
      { property: "og:title", content: "Corporate Travel Management Solutions | Ozonex" },
      {
        property: "og:description",
        content:
          "Enterprise travel solutions for HR, Finance, IT, MNCs and SMBs — policy, approvals, expense, all in one platform.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/solutions" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const root = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

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
      // Hero
      gsap.fromTo(
        ".sh-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" },
      );
      gsap.fromTo(
        ".sh-word",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 0.35 },
      );
      gsap.fromTo(
        ".sh-fade",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.9 },
      );

      // Sec 2 enterprises
      gsap.fromTo(
        ".se-photo",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".se-photo", start: "top 80%" } },
      );
      gsap.fromTo(
        ".se-text > *",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".se-text", start: "top 80%" } },
      );
      gsap.to(".se-photo img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".se-photo", start: "top bottom", end: "bottom top", scrub: true },
      });

      // Sec 3 HR cards
      gsap.fromTo(
        ".hr-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".hr-cards", start: "top 78%" } },
      );

      // Count-ups (stats bar)
      document.querySelectorAll<HTMLElement>(".sol-count").forEach((el) => {
        const end = Number(el.dataset.to || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });

      // Sec 7 table
      gsap.fromTo(
        ".sol-table",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".sol-table", start: "top 80%" } },
      );

      // Sec 8 testimonials
      gsap.fromTo(
        ".sol-quote",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".sol-quotes", start: "top 80%" } },
      );

      // Sec 9 CTA
      gsap.to(".scta-bg", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: ".scta", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        ".scta-word",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".scta", start: "top 60%" } },
      );
      gsap.fromTo(
        ".scta-btn",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: "power3.out", scrollTrigger: { trigger: ".scta", start: "top 60%" } },
      );

      // Horizontal scroll progress for IT/OPS strip
      const strip = stripRef.current;
      if (strip) {
        const onScroll = () => {
          const max = strip.scrollWidth - strip.clientWidth;
          const p = max > 0 ? strip.scrollLeft / max : 0;
          const fill = document.getElementById("sol-strip-fill");
          if (fill) fill.style.width = p * 100 + "%";
        };
        strip.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      }
    }, root);

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <main ref={root} className="relative">
      <Nav />
      <ScrollLineV />

      {/* ============== 1. HERO ============== */}
      <section
        className="relative w-full min-h-screen overflow-hidden grid-overlay"
        style={{ background: "#1C1410" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(28,20,16,0.75) 0%, rgba(28,20,16,0.55) 100%)",
          }}
        />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">
          <div
            className="sh-eyebrow"
            style={{
              fontFamily: "Inter",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            Who Ozonex is built for
          </div>

          <h1
            className="font-display text-white"
            style={{ fontSize: "clamp(56px,8vw,84px)", lineHeight: 0.9, fontWeight: 300 }}
          >
            {[
              ["BUILT", "FOR", "YOUR", "TEAM."],
              ["NOT", "A", "GENERIC"],
              ["COMPANY."],
            ].map((line, i) => (
              <span key={i} className="block">
                {line.map((w, j) => (
                  <span key={j} className="sh-word inline-block mr-3">
                    {w}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="sh-fade mx-auto"
            style={{
              fontFamily: "Inter",
              fontSize: 17,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 560,
              lineHeight: 1.75,
              marginTop: 32,
            }}
          >
            Ozonex was not built for a generic company. It was built for the
            specific pressures that enterprises, finance teams, HR departments,
            and growing SMBs face when corporate travel stops being manageable
            with spreadsheets.
          </p>

          <div className="sh-fade flex flex-wrap items-center justify-center gap-3" style={{ marginTop: 48 }}>
            {[
              "Enterprises & MNCs",
              "HR & Admin Teams",
              "Finance Teams",
              "SMBs",
              "IT & Ops Teams",
            ].map((p) => (
              <span
                key={p}
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 50,
                  padding: "10px 24px",
                  fontFamily: "Inter",
                  fontSize: 12,
                  color: "#fff",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <TornEdge fill="#F5F0EA" position="bottom" />
      </section>

      <LogoStrip />

      {/* ============== 2. ENTERPRISES & MNCs ============== */}
      <section id="enterprises" className="relative w-full grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "100vh" }}>
        <div className="se-photo relative overflow-hidden" style={{ minHeight: 480 }}>
          <img
            src={enterprisesImg}
            alt="Modern glass corporate skyscraper"
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "110%", objectFit: "cover" }}
          />
        </div>
        <div className="se-text" style={{ background: "#F5F0EA", padding: "120px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: "#2563EB", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
            For Enterprises & MNCs
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(40px,5vw,64px)", color: "#1C1410", lineHeight: 0.92, fontWeight: 300, marginTop: 24 }}>
            CENTRALISED CONTROL
            <br />
            ACROSS EVERY
            <br />
            OFFICE AND BORDER.
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 16, color: "#6B6258", lineHeight: 1.8, maxWidth: 460, marginTop: 32 }}>
            When your workforce operates across 12 time zones and your CFO needs
            to close the books by the 5th of every month, your travel platform
            cannot be a loose collection of booking portals and email threads.
            Ozonex gives your enterprise a single source of truth for every
            journey made.
          </p>
          <p style={{ fontFamily: "Inter", fontSize: 16, color: "#6B6258", lineHeight: 1.8, maxWidth: 460, marginTop: 20 }}>
            Multi-entity support means each subsidiary, region, or business unit
            has its own policy set, approval hierarchy, and reporting view —
            while the Group admin maintains full oversight of consolidated spend
            from one dashboard.
          </p>
          <div className="flex flex-col" style={{ gap: 18, marginTop: 28 }}>
            {[
              ["Multi-entity org structure support", "One platform across every subsidiary"],
              ["Consolidated Group-level spend reporting", "Roll-up dashboards across all units"],
              ["Region-specific travel policies in one platform", "Local rules, global oversight"],
              ["SSO and ERP integration for enterprise IT stacks", "Plugs into SAP, Oracle, Workday, Okta"],
            ].map(([t, d]) => (
              <div key={t} style={{ borderLeft: "2px solid #3B82F6", paddingLeft: 20 }}>
                <div style={{ fontFamily: "Inter", fontSize: 14, color: "#1C1410", fontWeight: 500 }}>{t}</div>
                <div style={{ fontFamily: "Inter", fontSize: 13, color: "#6B6258", marginTop: 2 }}>{d}</div>
              </div>
            ))}
          </div>
          <a
            href="/product"
            style={{ fontFamily: "Inter", fontSize: 13, color: "#2563EB", letterSpacing: "0.08em", marginTop: 32, textTransform: "uppercase" }}
          >
            Explore enterprise features →
          </a>
        </div>
      </section>

      {/* ============== 3. HR & ADMIN ============== */}
      <section id="hr-teams" className="relative w-full overflow-hidden grid-overlay" style={{ background: "#1C1410", padding: "160px 80px" }}>
        <TornEdge fill="#1C1410" position="top" />
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[40fr_60fr] gap-20">
          <div className="lg:sticky" style={{ top: 120, alignSelf: "start" }}>
            <div style={{ color: "#2563EB", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
              For HR & Admin Teams
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(40px,5vw,64px)", color: "#fff", lineHeight: 0.92, fontWeight: 300, marginTop: 24 }}>
              DUTY OF CARE
              <br />
              IS NOT OPTIONAL.
              <br />
              NEITHER IS EASE.
            </h2>
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 380, lineHeight: 1.8, marginTop: 32 }}>
              HR teams did not sign up to track who is in which country at 2am.
              They signed up to keep people safe and productive. Ozonex
              automates the tracking, the alerts, and the documentation — so
              your HR team is only called when a decision is actually needed.
            </p>
            <div style={{ marginTop: 48 }}>
              <div className="font-display" style={{ fontSize: 64, color: "#fff", lineHeight: 1, fontWeight: 300 }}>
                Zero
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 220, marginTop: 8 }}>
                manual traveller location checks with Ozonex live tracking
              </div>
            </div>
          </div>
          <div className="hr-cards flex flex-col" style={{ gap: 2 }}>
            {[
              [
                "01",
                "Live Traveller Location Dashboard",
                "Every confirmed booking feeds live location data into the HR console. Know where every traveller is — and where they are heading — without sending a single message.",
              ],
              [
                "02",
                "Automated Welfare Alerts",
                "When a traveller enters a region flagged as high-risk, Ozonex triggers an automated welfare check — an SMS or in-app message to the traveller with a simple confirm-you-are-safe response mechanism. HR is only notified if the check is not acknowledged.",
              ],
              [
                "03",
                "Visa & Document Tracking",
                "Ozonex tracks passport expiry, visa validity, and entry requirement changes for every active traveller. Expiry alerts are sent to both the traveller and HR 90, 60, and 30 days in advance. No traveller departs undocumented on Ozonex.",
              ],
            ].map(([n, t, b]) => (
              <div
                key={n}
                className="hr-card"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: 48,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(29,78,216,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div className="font-display" style={{ fontSize: 20, color: "#2563EB", fontWeight: 400 }}>
                  {n}
                </div>
                <h3 className="font-display" style={{ fontSize: 32, color: "#fff", fontWeight: 300, marginTop: 8 }}>
                  {t}
                </h3>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginTop: 16 }}>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 4. FINANCE ============== */}
      <section id="finance-teams" className="relative w-full" style={{ background: "#F5F0EA", padding: "160px 80px" }}>
        <TornEdge fill="#F5F0EA" position="top" />
        <div
          className="max-w-[1320px] mx-auto grid grid-cols-2 lg:grid-cols-4"
          style={{
            padding: "48px 0",
            borderTop: "1px solid rgba(37,99,235,0.25)",
            borderBottom: "1px solid rgba(37,99,235,0.25)",
          }}
        >
          {[
            { num: "< 2 days", label: "expense reconciliation time" },
            { num: "100", suffix: "%", label: "GL codes auto-assigned", count: true },
            { num: "Zero", label: "manual receipt matching for pre-approved spend" },
            { num: "Real-time", label: "CFO spend visibility" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "0 24px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(37,99,235,0.2)",
              }}
            >
              <div className="font-display" style={{ fontSize: "clamp(36px,4.5vw,56px)", color: "#1C1410", fontWeight: 300, lineHeight: 1 }}>
                {s.count ? (
                  <>
                    <span className="sol-count" data-to={s.num}>0</span>
                    {s.suffix}
                  </>
                ) : (
                  s.num
                )}
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 13, color: "#6B6258", marginTop: 16, lineHeight: 1.5 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[52fr_48fr] gap-20" style={{ marginTop: 100 }}>
          <div>
            <div style={{ color: "#2563EB", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
              For Finance Teams
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(40px,5vw,64px)", color: "#1C1410", lineHeight: 0.92, fontWeight: 300, marginTop: 24 }}>
              THE TRAVEL BUDGET
              <br />
              THAT MANAGES
              <br />
              ITSELF.
            </h2>
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "#6B6258", lineHeight: 1.8, maxWidth: 500, marginTop: 32 }}>
              Finance teams lose hours every month to travel expense
              reconciliation — chasing receipts, correcting GL codes, manually
              exporting data to ERP systems. Ozonex eliminates every one of
              those steps by connecting booking approval directly to expense
              accounting, with no human in between.
            </p>
            <p style={{ fontFamily: "Inter", fontSize: 16, color: "#6B6258", lineHeight: 1.8, maxWidth: 500, marginTop: 20 }}>
              Every approved booking creates an automatic cost record, assigned
              to the correct cost centre and GL code based on policy rules.
              When the month closes, the data is already in your ERP —
              validated, reconciled, and audit-ready.
            </p>
          </div>
          <div>
            <img
              src={financeImg}
              alt="Financial data screen close-up"
              loading="lazy"
              style={{ width: "100%", height: 460, objectFit: "cover" }}
            />
            <div className="flex flex-wrap" style={{ gap: 8, marginTop: 24 }}>
              {[
                "SAP CONNECTOR",
                "ORACLE CONNECTOR",
                "WORKDAY CONNECTOR",
                "QUICKBOOKS",
                "GL AUTO-ASSIGN",
                "VAT RECLAIM DATA",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "Inter",
                    fontSize: 11,
                    color: "#6B6258",
                    letterSpacing: "0.1em",
                    padding: "8px 16px",
                    border: "1px solid rgba(37,99,235,0.3)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== 5. SMBs ============== */}
      <section
        id="smbs"
        className="relative w-full overflow-hidden grid-overlay"
        style={{
          background: "#1C1410",
          minHeight: "80vh",
        }}
      >
        <TornEdge fill="#1C1410" position="top" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${smbsImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.78)" }} />
        <div className="relative z-10 flex flex-col items-center text-center" style={{ padding: "160px 80px" }}>
          <div style={{ color: "#2563EB", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
            For Growing SMEs & Startups
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(48px,6vw,72px)", color: "#fff", lineHeight: 0.92, fontWeight: 300, marginTop: 24 }}>
            ENTERPRISE-GRADE TRAVEL
            <br />
            MANAGEMENT. WITHOUT
            <br />
            THE ENTERPRISE PRICE TAG.
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 580, lineHeight: 1.75, marginTop: 32 }}>
            Ozonex scales down as cleanly as it scales up. A 40-person company
            gets the same policy enforcement, approval automation, and expense
            intelligence as a 4,000-person enterprise — without paying for
            modules they do not need or hiring an ops team to manage it.
          </p>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ marginTop: 64, maxWidth: 800, gap: 48, textAlign: "left", width: "100%" }}
          >
            <div>
              <div style={{ fontFamily: "Inter", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
                Without Ozonex
              </div>
              {[
                "Booking on consumer apps outside policy",
                "Expense reports submitted weeks later",
                "No visibility on team travel spend",
                "Finance reconciling manually every month",
              ].map((t) => (
                <div key={t} style={{ fontFamily: "Inter", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 12 }}>✗</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: 48 }}>
              <div style={{ fontFamily: "Inter", fontSize: 12, color: "#2563EB", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
                With Ozonex
              </div>
              {[
                "Policy-compliant booking from day one",
                "Expenses auto-captured at point of spend",
                "Real-time CFO dashboard, always current",
                "GL-ready data exported in one click",
              ].map((t) => (
                <div key={t} style={{ fontFamily: "Inter", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 2 }}>
                  <span style={{ color: "#2563EB", marginRight: 12 }}>✓</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
        <TornEdge fill="#F5F0EA" position="bottom" />
      </section>

      {/* ============== 6. IT & OPS ============== */}
      <section
        id="it-ops"
        className="relative w-full"
        style={{ background: "#F5F0EA", padding: "160px 80px 80px" }}
      >
        <div className="text-center max-w-[820px] mx-auto">
          <div style={{ color: "#2563EB", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
            For IT & Ops Teams
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(40px,5vw,64px)", color: "#1C1410", lineHeight: 0.95, fontWeight: 300, marginTop: 16 }}>
            INTEGRATES WITH
            <br />
            WHAT YOU ALREADY RUN.
            <br />
            REPLACES NOTHING.
          </h2>
          <p className="mx-auto" style={{ fontFamily: "Inter", fontSize: 16, color: "#6B6258", maxWidth: 520, lineHeight: 1.8, marginTop: 24 }}>
            Ozonex is built to fit inside your existing enterprise architecture.
            SSO, ERP connectors, HR system sync, and API access are standard —
            not add-ons. Your IT team controls the deployment. Your ops team
            controls the configuration.
          </p>
        </div>

        <div
          ref={stripRef}
          className="flex"
          style={{
            gap: 24,
            padding: "64px 0 40px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          {[
            {
              letter: "S",
              title: "SSO & IDENTITY",
              body: "Ozonex supports SAML 2.0 and OAuth 2.0 single sign-on out of the box. Connect to Okta, Azure AD, or Google Workspace in under 30 minutes. User provisioning and deprovisioning sync automatically with your IdP.",
              tags: ["SAML 2.0", "OAuth 2.0", "Okta", "Azure AD", "Google Workspace"],
            },
            {
              letter: "E",
              title: "ERP CONNECTORS",
              body: "Pre-built, certified connectors for SAP S/4HANA, Oracle NetSuite, Workday Financials, and Microsoft Dynamics. Approved bookings push expense records directly to your GL — no middleware, no manual export, no reconciliation delay.",
              tags: ["SAP", "Oracle", "Workday", "Dynamics"],
            },
            {
              letter: "H",
              title: "HR SYSTEM SYNC",
              body: "Bi-directional sync with BambooHR, Darwinbox, Keka, and Workday HCM. Employee grade, department, reporting line, and cost centre data stays current automatically. Policy entitlements update the moment HR makes a change.",
              tags: ["BambooHR", "Darwinbox", "Keka", "Workday HCM"],
            },
            {
              letter: "A",
              title: "API & CUSTOM BUILDS",
              body: "Full REST API with webhook support for custom integrations. Comprehensive developer documentation, sandbox environment, and a dedicated implementation engineer for enterprise deployments. Build what your architecture specifically requires.",
              tags: ["REST API", "Webhooks", "Sandbox", "Developer Docs"],
            },
          ].map((c) => (
            <div
              key={c.title}
              className="relative"
              style={{
                flexShrink: 0,
                width: 340,
                minHeight: 420,
                background: "#fff",
                border: "1px solid rgba(37,99,235,0.2)",
                padding: "48px 40px",
                scrollSnapAlign: "start",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(28,20,16,0.08)";
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                className="font-display absolute"
                style={{
                  top: 12,
                  right: 24,
                  fontSize: 120,
                  color: "#1C1410",
                  opacity: 0.04,
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                {c.letter}
              </span>
              <h3 className="font-display relative" style={{ fontSize: 28, color: "#1C1410", fontWeight: 400, lineHeight: 1.05 }}>
                {c.title}
              </h3>
              <p className="relative" style={{ fontFamily: "Inter", fontSize: 15, color: "#6B6258", lineHeight: 1.8, marginTop: 20 }}>
                {c.body}
              </p>
              <div className="flex flex-wrap relative" style={{ gap: 6, marginTop: 24 }}>
                {c.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "Inter",
                      fontSize: 10,
                      color: "#6B6258",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(37,99,235,0.25)",
                      padding: "4px 10px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1320px] mx-auto relative" style={{ height: 2, background: "rgba(37,99,235,0.15)" }}>
          <div id="sol-strip-fill" style={{ height: 2, width: 0, background: "#F0C040" }} />
        </div>
      </section>

      {/* ============== 7. COMPARISON TABLE ============== */}
      <section className="relative w-full" style={{ background: "#F5F0EA", padding: "120px 80px" }}>
        <div className="text-center max-w-[820px] mx-auto">
          <h2 className="font-display" style={{ fontSize: "clamp(36px,4.5vw,56px)", color: "#1C1410", lineHeight: 0.95, fontWeight: 300 }}>
            THE RIGHT FIT FOR
            <br />
            EVERY ORG SIZE.
          </h2>
          <p className="mx-auto" style={{ fontFamily: "Inter", fontSize: 15, color: "#6B6258", maxWidth: 480, marginTop: 20, lineHeight: 1.7 }}>
            Whether you are a 50-person startup or a 50,000-person enterprise,
            Ozonex has a configuration built around your operational reality.
          </p>
        </div>

        <table
          className="sol-table mx-auto"
          style={{ width: "100%", maxWidth: 960, borderCollapse: "collapse", marginTop: 64 }}
        >
          <thead>
            <tr style={{ background: "#1C1410" }}>
              {["", "STARTER", "BUSINESS", "ENTERPRISE"].map((h, i) => (
                <th
                  key={i}
                  style={{
                    fontFamily: "Inter",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fff",
                    padding: "20px 28px",
                    textAlign: i === 0 ? "left" : "center",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Policy Management", true, true, true],
              ["Approval Workflows", true, true, true],
              ["Multi-level approval hierarchy", false, true, true],
              ["Multi-entity org support", false, false, true],
              ["ERP connectors", false, true, true],
              ["HR system sync", false, true, true],
              ["Dedicated implementation engineer", false, false, true],
            ].map((row, i) => (
              <tr
                key={String(row[0])}
                style={{
                  background: i % 2 === 0 ? "#fff" : "rgba(37,99,235,0.04)",
                }}
              >
                <td
                  style={{
                    fontFamily: "Inter",
                    fontSize: 14,
                    color: "#1C1410",
                    fontWeight: 500,
                    padding: "20px 28px",
                    border: "1px solid rgba(37,99,235,0.15)",
                  }}
                >
                  {row[0]}
                </td>
                {(row.slice(1) as boolean[]).map((v, j) => (
                  <td
                    key={j}
                    style={{
                      textAlign: "center",
                      padding: "20px 28px",
                      border: "1px solid rgba(37,99,235,0.15)",
                      fontSize: 16,
                      color: v ? "#2D7A3A" : "rgba(37,99,235,0.4)",
                    }}
                  >
                    {v ? "✓" : "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={{ border: "1px solid rgba(37,99,235,0.15)" }} />
              {["GET STARTED", "CONTACT SALES", "CONTACT SALES"].map((c) => (
                <td
                  key={c}
                  style={{
                    textAlign: "center",
                    padding: "20px 28px",
                    border: "1px solid rgba(37,99,235,0.15)",
                  }}
                >
                  <a
                    href="#demo"
                    style={{
                      fontFamily: "Inter",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#2563EB",
                      fontWeight: 500,
                    }}
                  >
                    {c}
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      {/* ============== 8. TESTIMONIALS ============== */}
      <section className="relative w-full overflow-hidden grid-overlay" style={{ background: "#1C1410", padding: "120px 80px" }}>
        <TornEdge fill="#1C1410" position="top" />
        <div className="text-center" style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: "Inter", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
            What Operations Leads Say
          </div>
        </div>
        <div className="sol-quotes max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-3" style={{ gap: 48 }}>
          {[
            [
              "Before Ozonex, our finance team spent 3 days every month reconciling travel expenses. Now it takes 2 hours. The GL export is accurate the first time, every time.",
              "VP Finance, Manufacturing Conglomerate, Mumbai",
            ],
            [
              "The duty of care feature alone justified the implementation. Knowing where our people are in real time — without anyone having to check in — changed how our HR team operates.",
              "Head of HR Operations, Technology Services Company, Bengaluru",
            ],
            [
              "We went from 6 different booking methods across our offices to one platform in 4 weeks. The policy enforcement works exactly as configured. No exceptions unless we allow them.",
              "COO, Global Logistics Group, Dubai",
            ],
          ].map(([q, a]) => (
            <div key={a} className="sol-quote">
              <div className="font-display" style={{ fontSize: 80, color: "#3B82F6", opacity: 0.3, lineHeight: 1, fontWeight: 300 }}>
                "
              </div>
              <p
                className="font-display"
                style={{ fontSize: 26, color: "#fff", lineHeight: 1.5, fontWeight: 300, marginTop: -24 }}
              >
                {q}
              </p>
              <div style={{ fontFamily: "Inter", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 24 }}>
                {a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== 9. CTA ============== */}
      <section
        className="scta relative w-full overflow-hidden grid-overlay"
        style={{ background: "#1C1410", height: "100vh", minHeight: 640 }}
      >
        <div
          className="scta-bg absolute inset-0"
          style={{ backgroundImage: `url(${ctaImg})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.72)" }} />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.35 }}>✦</span>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-display text-white" style={{ fontSize: "clamp(56px,8vw,88px)", lineHeight: 1.0, fontWeight: 300 }}>
            {[["FIND", "YOUR", "FIT."], ["BOOK", "A", "LIVE"], ["WALKTHROUGH."]].map((line, i) => (
              <span key={i} className="block">
                {line.map((w, j) => (
                  <span key={j} className="scta-word inline-block mr-3">{w}</span>
                ))}
              </span>
            ))}
          </h2>
          <p className="scta-btn mx-auto" style={{ fontFamily: "Inter", fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 520, lineHeight: 1.75, marginTop: 32 }}>
            Tell us your org size, your current travel pain points, and your
            team structure. We will show you exactly how Ozonex would work for
            your specific operation — not a generic demo.
          </p>
          <div className="scta-btn flex flex-wrap items-center justify-center" style={{ gap: 16, marginTop: 40 }}>
            <a
              href="/pricing#enquire"
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                padding: "16px 48px",
                fontFamily: "Inter",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
            >
              Book a Demo
            </a>
            <a
              href="/pricing#enquire"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                borderRadius: 50,
                padding: "16px 48px",
                fontFamily: "Inter",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
