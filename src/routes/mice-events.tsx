import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";

import heroImg from "@/assets/mice-hero-stage.jpg";
import scaleImg from "@/assets/mice-scale-aerial.jpg";
import corpImg from "@/assets/mice-corporate.jpg";
import confImg from "@/assets/mice-conferences.jpg";
import incImg from "@/assets/mice-incentive.jpg";
import grpImg from "@/assets/mice-group.jpg";
import s1 from "@/assets/mice-step1.jpg";
import s2 from "@/assets/mice-step2.jpg";
import s3 from "@/assets/mice-step3.jpg";
import s4 from "@/assets/mice-step4.jpg";
import s5 from "@/assets/mice-step5.jpg";
import t1 from "@/assets/mice-tile1.jpg";
import t2 from "@/assets/mice-tile2.jpg";
import t3 from "@/assets/mice-tile3.jpg";
import t4 from "@/assets/mice-tile4.jpg";
import t5 from "@/assets/mice-tile5.jpg";
import t6 from "@/assets/mice-tile6.jpg";
import whyImg from "@/assets/mice-why.jpg";
import ctaImg from "@/assets/mice-cta.jpg";

gsap.registerPlugin(ScrollTrigger);

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ozonex MICE & Events",
  provider: { "@type": "Organization", name: "Ozonex" },
  description:
    "Corporate MICE travel management — conferences, incentive travel, group bookings, and event logistics on one platform.",
  areaServed: ["IN", "AE", "Global"],
  url: "https://ozonex.com/mice-events",
};

export const Route = createFileRoute("/mice-events")({
  head: () => ({
    meta: [
      { title: "MICE & Corporate Event Travel Management | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex manages end-to-end MICE travel logistics — corporate events, conferences, incentive travel, and group movement. One platform from delegate onboarding to post-event reconciliation.",
      },
      { property: "og:title", content: "MICE & Corporate Event Travel Management | Ozonex" },
      {
        property: "og:description",
        content:
          "End-to-end MICE travel logistics on a single platform — conferences, incentive travel, group bookings, event ops.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mice-events" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/mice-events" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: MicePage,
});

/* ---------------- helpers ---------------- */

function Words({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const inners = ref.current.querySelectorAll(".word-inner");
    gsap.fromTo(
      inners,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      }
    );
  }, []);
  return (
    <h2 ref={ref} className={className} style={style}>
      {text.split(/(\s+)/).map((w, i) =>
        /\s+/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="word-wrap">
            <span className="word-inner">{w}</span>
          </span>
        )
      )}
    </h2>
  );
}

function CountUp({ to, suffix = "", className, style }: { to: number; suffix?: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: to,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.v).toLocaleString() + suffix;
      },
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
    return () => { tw.kill(); };
  }, [to, suffix]);
  return <span ref={ref} className={className} style={style}>0{suffix}</span>;
}

/* ---------------- page ---------------- */

function MicePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div style={{ background: "var(--cream)" }}>
      <Nav />
      <ScrollLineV />
      <Hero />
      <ScaleStatement />
      <CorporateBlock />
      <ConferencesBlock />
      <IncentiveBlock />
      <GroupBlock />
      <ProcessSection />
      <CapabilitiesScroll />
      <EventTypesGrid />
      <WhyMice />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- 1. HERO ---------------- */

function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eyebrowRef.current) {
      gsap.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" });
    }
    if (subRef.current) {
      gsap.fromTo(
        subRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.7, stagger: 0.12, ease: "power2.out" }
      );
    }
  }, []);

  const pills = ["CORPORATE EVENTS", "CONFERENCES & EXHIBITIONS", "INCENTIVE TRAVEL", "GROUP TRAVEL MANAGEMENT"];

  return (
    <section
      className="relative grid-overlay flex items-center justify-center"
      style={{ minHeight: "100vh", background: "#1C1410" }}
    >
      <img
        src={heroImg}
        alt="Corporate conference main stage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(28,20,16,0.6) 0%, rgba(28,20,16,0.82) 100%)",
          zIndex: 1,
        }}
      />
      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white/30 text-2xl" style={{ zIndex: 2 }}>✦</div>
      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white/30 text-2xl" style={{ zIndex: 2 }}>✦</div>

      <div className="relative text-center px-6 max-w-5xl" style={{ zIndex: 3 }}>
        <div ref={eyebrowRef} className="eyebrow" style={{ color: "#3B82F6", opacity: 0.9, letterSpacing: "0.2em", marginBottom: 28 }}>
          MICE & EVENTS
        </div>
        <Words
          text="RUN YOUR NEXT EVENT WITHOUT THE CHAOS."
          className="font-display text-white"
          style={{ fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 0.88, fontWeight: 300 }}
        />
        <div ref={subRef}>
          <p
            className="mx-auto"
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 540,
              lineHeight: 1.75,
              marginTop: 36,
            }}
          >
            From 50-person offsites to 5,000-delegate global conferences, Ozonex manages every logistical layer — travel, accommodation, ground movement, and event operations — in one coordinated platform.
          </p>
          <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: 52 }}>
            {pills.map((p) => (
              <span
                key={p}
                className="transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 50,
                  padding: "10px 26px",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3B82F6";
                  e.currentTarget.style.background = "rgba(37,99,235,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <a
              href="#cta"
              className="inline-block transition-colors"
              style={{
                color: "#3B82F6",
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3B82F6")}
            >
              PLAN YOUR NEXT EVENT →
            </a>
          </div>
        </div>
      </div>

      <TornEdge fill="#F5F0EA" position="bottom" />
    </section>
  );
}

/* ---------------- 2. SCALE STATEMENT ---------------- */

function ScaleStatement() {
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(headRef.current, { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 78%" },
      });
    }
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 78%" },
      });
    }
  }, []);

  const stats = [
    { n: "5,000+", l: "DELEGATES MANAGED SIMULTANEOUSLY" },
    { n: "48 hrs", l: "AVERAGE EVENT SETUP TIME ON PLATFORM" },
    { n: "Zero", l: "MANUAL ITINERARY DISTRIBUTION" },
    { n: "1 screen", l: "COMPLETE EVENT OVERSIGHT FOR OPS TEAM" },
  ];

  return (
    <section className="relative grid-overlay" style={{ background: "#1C1410", minHeight: "90vh" }}>
      <TornEdge fill="#1C1410" position="top" />
      <img src={scaleImg} alt="Outdoor corporate event aerial" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(28,20,16,0.92) 50%, rgba(28,20,16,0.3) 100%)", zIndex: 1 }} />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-20 items-end" style={{ padding: "120px 80px", zIndex: 2, minHeight: "90vh" }}>
        <div ref={headRef} className="lg:col-span-7">
          <h2 className="font-display text-white" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.88, fontWeight: 300 }}>
            EVENTS THAT<br />MOVE PEOPLE.<br />AND BUSINESSES.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.8, marginTop: 32, fontSize: 16 }}>
            The best corporate events are not just logistical achievements. They are moments that shift culture, reward performance, and demonstrate what an organisation truly values. Ozonex makes the logistics invisible — so the experience is all that anyone remembers.
          </p>
        </div>
        <div ref={statsRef} className="lg:col-span-5 flex flex-col gap-12 items-end">
          {stats.map((s) => (
            <div key={s.l} className="text-right">
              <div className="font-display text-white" style={{ fontSize: 72, lineHeight: 1, fontWeight: 300 }}>{s.n}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <TornEdge fill="#F5F0EA" position="bottom" />
    </section>
  );
}

/* ---------------- 3. FOUR EVENT VERTICALS ---------------- */

function EditorialBlock({
  id, dark, photoLeft, photo, eyebrow, title, body, children,
}: {
  id: string; dark?: boolean; photoLeft: boolean; photo: string;
  eyebrow: string; title: React.ReactNode; body: string; children?: React.ReactNode;
}) {
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: photoRef.current, start: "top 78%" },
        }
      );
    }
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.querySelectorAll("[data-stagger]"), { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 78%" },
      });
    }
  }, []);

  const bg = dark ? "#1C1410" : "#F5F0EA";
  const fg = dark ? "#fff" : "var(--ink)";
  const muted = dark ? "rgba(255,255,255,0.68)" : "#6B6258";

  return (
    <section id={id} className={`relative ${dark ? "grid-overlay" : ""}`} style={{ background: bg, minHeight: "80vh" }}>
      {dark && <TornEdge fill="#1C1410" position="top" />}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "80vh" }}>
        <div ref={photoRef} className={`relative ${photoLeft ? "lg:order-1" : "lg:order-2"}`} style={{ minHeight: 480 }}>
          <img src={photo} alt={eyebrow} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div ref={contentRef} className={`flex flex-col justify-center ${photoLeft ? "lg:order-2" : "lg:order-1"}`} style={{ padding: "100px 80px" }}>
          <div data-stagger className="eyebrow" style={{ color: "#2563EB", letterSpacing: "0.18em" }}>{eyebrow}</div>
          <div data-stagger className="font-display" style={{ color: fg, fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 0.92, fontWeight: 300, marginTop: 24 }}>
            {title}
          </div>
          <p data-stagger style={{ color: muted, fontSize: 16, lineHeight: 1.82, maxWidth: 460, marginTop: 28 }}>{body}</p>
          {children && <div data-stagger style={{ marginTop: 36 }}>{children}</div>}
        </div>
      </div>
      {dark && <TornEdge fill="#F5F0EA" position="bottom" />}
    </section>
  );
}

function CorporateBlock() {
  const rows = [
    ["Multi-venue coordination", "Simultaneous management of multiple sites"],
    ["Delegate travel booking", "Policy-compliant group fares in one batch"],
    ["Real-time attendance tracking", "Live headcount and logistics dashboard"],
    ["Post-event spend reporting", "Full cost breakdown within 24 hours of close"],
  ];
  return (
    <EditorialBlock
      id="corporate-events"
      photoLeft={true}
      photo={corpImg}
      eyebrow="CORPORATE EVENTS"
      title={<>WHERE STRATEGY<br />MEETS<br />CEREMONY.</>}
      body="Annual leadership summits. Sales kickoffs. Board retreats. Product launches. These are not routine meetings — they are strategic investments in alignment, culture, and momentum. Ozonex handles every logistical layer so your events team focuses on content and impact."
    >
      <div>
        {rows.map(([t, d]) => (
          <div key={t} className="flex justify-between items-center" style={{ padding: "16px 0", borderBottom: "1px solid rgba(37,99,235,0.18)", gap: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{t}</span>
            <span style={{ fontSize: 13, color: "#6B6258", textAlign: "right" }}>{d}</span>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

function ConferencesBlock() {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!boxRef.current) return;
    gsap.fromTo(boxRef.current.children, { x: 60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out",
      scrollTrigger: { trigger: boxRef.current, start: "top 78%" },
    });
  }, []);
  const boxes = [
    ["BATCH GROUP BOOKING", "Upload a delegate list. Ozonex generates individual itineraries, applies grade-based policies, and books each traveller simultaneously — no manual entries."],
    ["ARRIVAL COORDINATION", "Live dashboard showing confirmed arrivals, pending bookings, and ground transfer status for every delegate — updating in real time."],
    ["ON-GROUND COMMUNICATION", "Automated itinerary delivery via SMS, email, and in-app. Real-time alerts for flight changes, gate updates, and ground transport schedule adjustments."],
  ];
  return (
    <EditorialBlock
      id="conferences"
      dark
      photoLeft={false}
      photo={confImg}
      eyebrow="CONFERENCES & EXHIBITIONS"
      title={<>HUNDREDS OF<br />ARRIVALS. ONE<br />UNIFIED VIEW.</>}
      body="Managing delegate travel to a major conference means coordinating hundreds of individual itineraries, multiple arrival windows, varied accommodation tiers, and on-ground logistics — all while the event team is focused entirely on programme delivery. Ozonex runs the logistics layer so nobody has to split their attention."
    >
      <div ref={boxRef} className="flex flex-col" style={{ gap: 16 }}>
        {boxes.map(([t, b]) => (
          <div key={t} style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: "24px 28px" }}>
            <div className="font-display text-white" style={{ fontSize: 22, fontWeight: 400 }}>{t}</div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 8, lineHeight: 1.7 }}>{b}</p>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

function IncentiveBlock() {
  const features = [
    ["WINNER MANAGEMENT", "Personalised itinerary creation for each winner. Preference capture, dietary requirements, cabin upgrades — all managed through the platform."],
    ["GROUP DEPARTURES", "Coordinate group flights with individual booking flexibility. Some winners fly from Mumbai, others from Delhi — all arrive together at the destination."],
    ["LUXURY PROPERTY BOOKING", "Access to preferred luxury hotel partners with negotiated group rates. Room category management, early check-in coordination, and welcome amenity requests."],
    ["PROGRAMME RECONCILIATION", "Complete per-head cost breakdown for every winner. Full programme spend reported to finance within 48 hours of return."],
  ];
  return (
    <EditorialBlock
      id="incentive-travel"
      photoLeft={true}
      photo={incImg}
      eyebrow="INCENTIVE TRAVEL"
      title={<>THE REWARD<br />SHOULD FEEL<br />LIKE A REWARD.</>}
      body="Incentive trips are the most visible expression of how much an organisation values its top performers. The logistics cannot be allowed to tarnish the experience. Ozonex manages the entire programme — from winner notification to return flight — with the same precision it applies to everyday business travel."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 28 }}>
        {features.map(([t, b]) => (
          <div key={t} style={{ paddingTop: 20, borderTop: "1px solid rgba(37,99,235,0.2)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t}</div>
            <p style={{ color: "#6B6258", fontSize: 13, marginTop: 8, lineHeight: 1.7 }}>{b}</p>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

function GroupBlock() {
  const sRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sRef.current) return;
    gsap.fromTo(sRef.current.children, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: sRef.current, start: "top 80%" },
    });
  }, []);
  const stats = [
    ["2 min", "TO GENERATE 50 ITINERARIES"],
    ["100%", "POLICY-COMPLIANT GROUP BOOKINGS"],
    ["Live", "DEPARTURE DASHBOARD"],
  ];
  return (
    <EditorialBlock
      id="group-travel"
      dark
      photoLeft={false}
      photo={grpImg}
      eyebrow="GROUP TRAVEL MANAGEMENT"
      title={<>50 PEOPLE.<br />ONE DEPARTURE.<br />ZERO CHAOS.</>}
      body="Whether it is a team flying to a client site, a delegation attending an industry event, or a workforce being relocated temporarily for a project — group travel has failure points that individual booking tools cannot anticipate. Ozonex was built to handle them all."
    >
      <div ref={sRef} className="flex flex-wrap" style={{ gap: 40 }}>
        {stats.map(([n, l]) => (
          <div key={l} style={{ borderLeft: "2px solid #2563EB", paddingLeft: 20 }}>
            <div className="font-display text-white" style={{ fontSize: 48, fontWeight: 300 }}>{n}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

/* ---------------- 4. PROCESS ---------------- */

function ProcessSection() {
  const steps = [
    { n: 1, t: "Define the Event", b: "Your ops team submits the event brief through Ozonex — delegate count, destination, dates, accommodation tier, ground transport requirements, and budget ceiling. The platform generates a structured event workspace with all parameters locked in.", img: s1, tags: ["Delegate Count", "Budget Ceiling", "Accommodation Tier"] },
    { n: 2, t: "Invite and Capture", b: "Delegates receive personalised onboarding links. They confirm attendance, submit travel preferences, passport details, dietary requirements, and special requests — all within the Ozonex delegate portal. No spreadsheets. No email chains.", img: s2, tags: ["Preference Capture", "Passport Upload", "Dietary Requirements"] },
    { n: 3, t: "Book. Assign. Confirm.", b: "Ozonex generates optimal group itineraries based on delegate origin cities, preferred airlines, and event arrival windows. Individual bookings are made simultaneously, policy-checked, and confirmed — each delegate receives their personalised itinerary automatically.", img: s3, tags: ["Batch Booking", "Policy-Compliant", "Auto-Confirmation"] },
    { n: 4, t: "The Day Runs Itself", b: "Live operations dashboard shows every delegate's flight status, arrival time, and ground transfer assignment in real time. Delays trigger automatic ground transport rescheduling. Your ops team sees everything on one screen and intervenes only when truly necessary.", img: s4, tags: ["Live Flight Tracking", "Auto-Reschedule", "Ground Transfer Dashboard"] },
    { n: 5, t: "Close the Books Fast", b: "Within 48 hours of the event close, Ozonex generates a complete event spend report — per delegate, per cost category, per vendor. GL-coded and ready for finance. No manual compilation. No missing receipts. Full audit trail from brief to debrief.", img: s5, tags: ["Per-Delegate Costs", "GL-Ready Export", "48-Hour Close"] },
  ];

  return (
    <section style={{ background: "var(--cream)", padding: "160px 80px" }}>
      <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 120 }}>
        <div className="eyebrow" style={{ color: "#2563EB", letterSpacing: "0.18em" }}>THE OZONEX EVENT PROCESS</div>
        <h2 className="font-display" style={{ color: "var(--ink)", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, lineHeight: 0.95, marginTop: 18 }}>
          FROM BRIEF TO<br />DEBRIEF. EVERY<br />STEP MANAGED.
        </h2>
        <p style={{ color: "#6B6258", fontSize: 16, lineHeight: 1.8, maxWidth: 500, marginTop: 24, marginInline: "auto" }}>
          Every event moves through the same critical phases. Ozonex gives your ops team a structured workflow for each.
        </p>
      </div>

      <div className="max-w-[1320px] mx-auto">
        {steps.map((s, i) => (
          <div key={s.n}>
            <ProcessStep step={s} reverse={i % 2 === 1} />
            {i < steps.length - 1 && <Squiggle flip={i % 2 === 1} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function Squiggle({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "100%", height: 120, opacity: 0.35, transform: flip ? "scaleX(-1)" : undefined }}>
      <path
        d="M50,10 C200,90 350,-10 520,60 C680,120 820,0 980,70 C1080,110 1130,40 1180,80"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />
    </svg>
  );
}

function ProcessStep({ step, reverse }: { step: { n: number; t: string; b: string; img: string; tags: string[] }; reverse: boolean }) {
  const photoRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: photoRef.current, start: "top 78%" } });
    if (numRef.current) tl.fromTo(numRef.current, { scale: 0 }, { scale: 1, duration: 0.7, ease: "back.out(1.7)" }, 0);
    if (photoRef.current) tl.fromTo(photoRef.current, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power2.out" }, 0);
    if (contentRef.current) tl.fromTo(contentRef.current, { x: reverse ? 60 : -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2);
    if (tagsRef.current) tl.fromTo(tagsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.4);
  }, [reverse]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 80, minHeight: "75vh" }}>
      <div ref={photoRef} className={reverse ? "lg:order-1" : "lg:order-2"} style={{ minHeight: 420 }}>
        <img src={step.img} alt={step.t} loading="lazy" className="w-full h-full object-cover" style={{ minHeight: 420 }} />
      </div>
      <div ref={contentRef} className={reverse ? "lg:order-2" : "lg:order-1"}>
        <div ref={numRef} className="flex items-center justify-center font-display text-white" style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--ink)", fontSize: 28 }}>
          {step.n}
        </div>
        <h3 className="font-display" style={{ color: "var(--ink)", fontSize: 44, fontWeight: 300, marginTop: 28 }}>{step.t}</h3>
        <p style={{ color: "#6B6258", fontSize: 15, lineHeight: 1.82, maxWidth: 400, marginTop: 20 }}>{step.b}</p>
        <div ref={tagsRef} className="flex flex-wrap" style={{ gap: 10, marginTop: 28 }}>
          {step.tags.map((tag) => (
            <span key={tag} style={{ border: "1px solid #2563EB", color: "#2563EB", borderRadius: 50, padding: "6px 16px", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 5. PINNED HORIZONTAL CAPABILITIES ---------------- */

function CapabilitiesScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;
    const panels = trackRef.current.querySelectorAll(".cap-panel");
    const scrollAmt = (panels.length - 1) * window.innerWidth;
    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        x: -scrollAmt,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + scrollAmt,
          invalidateOnRefresh: true,
        },
      });
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            scrub: 1,
            start: "top top",
            end: () => "+=" + scrollAmt,
          },
        });
      }
      return () => { tween.kill(); };
    });
    return () => ctx.revert();
  }, []);

  const panels = [
    {
      letter: "D",
      title: <>Every delegate.<br />Every detail.<br />One dashboard.</>,
      h: "DELEGATE MANAGEMENT",
      body: "The Ozonex delegate management module handles groups from 10 to 10,000. Upload your delegate list via CSV or sync directly from your HRIS. Each delegate gets a personalised portal, a unique booking reference, and automated communications throughout the event lifecycle.",
      caps: [
        "Bulk delegate upload via CSV or HRIS sync",
        "Individual delegate portals with personalised itineraries",
        "Real-time RSVP and confirmation tracking",
      ],
    },
    {
      letter: "B",
      title: <>The event budget.<br />Visible in real time.<br />Always.</>,
      h: "BUDGET CONTROL",
      body: "Most event overspends are discovered after the event closes. Ozonex shows live budget burn against each cost category throughout the event planning and execution period. Finance sees the same data as the ops team — simultaneously. There are no surprises at month-end.",
      caps: [
        "Live spend vs approved budget by category",
        "Per-delegate cost tracking from booking to final expense",
        "One-click GL export within 48 hours of event close",
      ],
    },
    {
      letter: "V",
      title: <>Hotels. Airlines.<br />Ground. Catering.<br />All in one brief.</>,
      h: "VENDOR COORDINATION",
      body: "Ozonex coordinates with your preferred event vendors through a single structured communication layer. Room block management, group airline allocations, ground fleet scheduling, and catering headcount updates are all managed through the platform — eliminating the email thread that usually runs an event behind the scenes.",
      caps: [
        "Hotel room block management and real-time allocation tracking",
        "Group airline seat block coordination with auto-release logic",
        "Ground transport fleet scheduling with live departure dashboard",
      ],
    },
  ];

  return (
    <section className="relative grid-overlay" style={{ background: "#1C1410" }}>
      <TornEdge fill="#1C1410" position="top" />
      <div style={{ padding: "100px 80px 60px" }}>
        <div className="eyebrow" style={{ color: "#2563EB", letterSpacing: "0.18em" }}>PLATFORM CAPABILITIES FOR EVENTS</div>
        <h2 className="font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, lineHeight: 0.95, marginTop: 18 }}>
          BUILT FOR<br />SCALE. TESTED<br />AT SCALE.
        </h2>
      </div>

      <div ref={wrapRef} style={{ overflow: "hidden", height: "100vh" }}>
        <div ref={trackRef} className="flex" style={{ height: "100vh", width: `${panels.length * 100}vw` }}>
          {panels.map((p) => (
            <div key={p.h} className="cap-panel relative" style={{ width: "100vw", height: "100vh", padding: "80px 100px", background: "rgba(255,255,255,0.02)" }}>
              <div className="font-display absolute" style={{ fontSize: 300, color: "#fff", opacity: 0.03, lineHeight: 1, top: 40, right: 80, pointerEvents: "none" }}>
                {p.letter}
              </div>
              <div className="relative max-w-3xl">
                <div className="eyebrow" style={{ color: "#2563EB" }}>{p.h}</div>
                <h3 className="font-display text-white" style={{ fontSize: 52, fontWeight: 300, marginTop: 16 }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.82, maxWidth: 560, marginTop: 28 }}>{p.body}</p>
                <div className="flex flex-col" style={{ gap: 20, marginTop: 40 }}>
                  {p.caps.map((c) => (
                    <div key={c} style={{ borderLeft: "2px solid #2563EB", paddingLeft: 16, color: "#fff", fontSize: 15 }}>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative" style={{ height: 2, background: "rgba(255,255,255,0.1)" }}>
          <div ref={lineRef} style={{ position: "absolute", left: 0, top: 0, height: 2, width: 0, background: "var(--yellow-line)" }} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. EVENT TYPES GRID ---------------- */

function EventTypesGrid() {
  const tiles = [
    { img: t1, t: "Leadership Summit", d: "Full-day or multi-day leadership alignment events with executive travel and accommodation management." },
    { img: t2, t: "Sales Kickoff", d: "Annual sales kickoffs with group travel from multiple cities, hotel room blocks, and gala dinner logistics." },
    { img: t3, t: "Product Launch", d: "Product launch events with media and partner guest travel, press arrival coordination, and post-event wrap reporting." },
    { img: t4, t: "Team Offsite", d: "Team building offsites with activity coordination, transport logistics, and accommodation for cross-functional groups." },
    { img: t5, t: "Industry Exhibition", d: "Exhibition and trade show participation with booth team travel, freight logistics support, and multi-city scheduling." },
    { img: t6, t: "Global Roadshow", d: "Multi-city roadshows with back-to-back city itineraries, executive travel optimisation, and live schedule management." },
  ];
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(gridRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
      scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
    });
  }, []);

  return (
    <section className="relative" style={{ background: "var(--cream)", padding: "160px 0" }}>
      <TornEdge fill="#F5F0EA" position="top" />
      <div className="text-center max-w-2xl mx-auto" style={{ paddingInline: 24, marginBottom: 100 }}>
        <h2 className="font-display" style={{ color: "var(--ink)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, lineHeight: 0.95 }}>
          EVERY TYPE OF<br />CORPORATE EVENT.
        </h2>
        <p style={{ color: "#6B6258", fontSize: 16, lineHeight: 1.8, maxWidth: 480, marginTop: 20, marginInline: "auto" }}>
          From intimate leadership retreats to global multi-city roadshows — if it involves moving people for business, Ozonex manages it.
        </p>
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 0 }}>
        {tiles.map((tile) => (
          <Tile key={tile.t} tile={tile} />
        ))}
      </div>
    </section>
  );
}

function Tile({ tile }: { tile: { img: string; t: string; d: string } }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: "4/3" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={tile.img}
        alt={tile.t}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform"
        style={{ transform: hover ? "scale(1.06)" : "scale(1)", transitionDuration: "600ms", filter: "brightness(0.7)" }}
      />
      <div
        className="absolute inset-0 transition-opacity"
        style={{ background: "rgba(28,20,16,0.72)", opacity: hover ? 1 : 0, transitionDuration: "400ms" }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 transition-transform"
        style={{ zIndex: 2, transform: hover ? "translateY(-8px)" : "translateY(0)", transitionDuration: "400ms" }}
      >
        <div className="font-display text-white" style={{ fontSize: 28, fontWeight: 300 }}>{tile.t}</div>
        <p
          className="transition-opacity"
          style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, maxWidth: "80%", marginTop: 12, opacity: hover ? 1 : 0, transitionDuration: "400ms" }}
        >
          {tile.d}
        </p>
      </div>
    </div>
  );
}

/* ---------------- 7. WHY ---------------- */

function WhyMice() {
  const photoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(photoRef.current, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: photoRef.current, start: "top 78%" },
      });
    }
  }, []);
  return (
    <section className="relative grid-overlay" style={{ background: "#1C1410", padding: "160px 80px" }}>
      <TornEdge fill="#1C1410" position="top" />
      <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[1320px] mx-auto" style={{ gap: 80 }}>
        <div className="lg:col-span-7">
          <div className="eyebrow" style={{ color: "#2563EB", letterSpacing: "0.18em" }}>WHY OZONEX FOR MICE</div>
          <h2 className="font-display text-white" style={{ fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, lineHeight: 0.9, marginTop: 18 }}>
            MOST EVENTS<br />FAIL IN THE<br />LOGISTICS.<br />NOT THE CONTENT.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.82, marginTop: 32, fontSize: 16 }}>
            Event planners are exceptional at designing experiences. What exhausts them is the operational machinery underneath — the booking spreadsheets, the delegate email chains, the last-minute hotel reallocation, the finance reconciliation that takes three weeks to close. Ozonex absorbs all of that machinery so the people who design great events can focus on designing great events.
          </p>
          <div style={{ marginTop: 48, borderLeft: "3px solid #3B82F6", paddingLeft: 28 }}>
            <p className="font-display text-white" style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.5, fontStyle: "italic" }}>
              "The ops team ran our 800-person annual conference from one screen. Every delegate arrived on time. Finance had the full cost report the next morning."
            </p>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 16 }}>Head of Events, Diversified Conglomerate, UAE</div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div ref={photoRef} style={{ width: "100%", height: 500 }}>
            <img src={whyImg} alt="Event ops team" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col" style={{ marginTop: 32 }}>
            {[
              ["800", "+", "MAX DELEGATES IN SINGLE EVENT"],
              ["48", " hrs", "FULL RECONCILIATION AFTER CLOSE"],
              ["1", "", "PLATFORM FOR EVERY EVENT FUNCTION"],
            ].map(([n, suf, l], i) => (
              <div key={l} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, paddingBottom: 20 }}>
                <div className="font-display text-white" style={{ fontSize: 44, fontWeight: 300 }}>
                  <CountUp to={Number(n)} suffix={suf} className="font-display text-white" />
                </div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 8. CTA ---------------- */

function CTA() {
  const btnRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      gsap.fromTo(btnRef.current.children, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, delay: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: btnRef.current, start: "top 85%" },
      });
    }
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: photoRef.current, scrub: true, start: "top bottom", end: "bottom top" },
      });
    }
  }, []);

  return (
    <section id="cta" className="relative grid-overlay flex items-center justify-center" style={{ minHeight: "100vh", background: "#1C1410", overflow: "hidden" }}>
      <img ref={photoRef} src={ctaImg} alt="Empty stage before event" loading="lazy" className="absolute inset-0 w-full h-[120%] object-cover" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.75)", zIndex: 1 }} />
      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white/30 text-2xl" style={{ zIndex: 2 }}>✦</div>
      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white/30 text-2xl" style={{ zIndex: 2 }}>✦</div>

      <div className="relative text-center max-w-3xl px-6" style={{ zIndex: 3 }}>
        <Words
          text="YOUR NEXT EVENT STARTS WITH ONE CONVERSATION."
          className="font-display text-white"
          style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 0.95, fontWeight: 300 }}
        />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.75, maxWidth: 520, marginInline: "auto", marginTop: 32 }}>
          Tell us your event type, delegate count, and timeline. Our MICE team will show you exactly how Ozonex would run it — from brief to debrief.
        </p>
        <div ref={btnRef} className="flex flex-wrap justify-center gap-4" style={{ marginTop: 48 }}>
          <button
            href="/pricing#enquire"
            className="transition-all"
            style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 50, padding: "16px 48px", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#3B82F6"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            PLAN YOUR EVENT
          </button>
          <button
            href="/pricing#enquire"
            className="transition-all"
            style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 50, padding: "16px 48px", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Get a MICE BRIEF
          </button>
        </div>
      </div>
    </section>
  );
}
