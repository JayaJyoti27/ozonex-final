import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { TornEdge } from "./TornEdge";
import bookingLounge from "@/assets/mod-booking-lounge.jpg";
import policyWoman from "@/assets/mod-policy-woman.jpg";

export function ProductFeatureModules() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Generic count-ups
      document.querySelectorAll<HTMLElement>(".pfm-count").forEach((el) => {
        const end = Number(el.dataset.to || 0);
        const obj = { v: 0 };
        const fmt = el.dataset.fmt;
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            const n = Math.round(obj.v);
            el.textContent = fmt === "comma" ? n.toLocaleString("en-IN") : String(n);
          },
        });
      });

      // M1 photo reveal
      gsap.fromTo(
        ".m1-photo",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".m1-photo", start: "top 80%" } },
      );

      // M2 horizontal pin
      const track = document.querySelector<HTMLElement>(".m2-track");
      if (track) {
        const total = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: -total, ease: "none",
          scrollTrigger: { trigger: ".m2-pin", pin: true, scrub: 1,
            start: "top top", end: () => "+=" + total, invalidateOnRefresh: true },
        });
        gsap.to(".m2-progress", {
          width: "100%", ease: "none",
          scrollTrigger: { trigger: ".m2-pin", scrub: 1,
            start: "top top", end: () => "+=" + total },
        });
      }

      // M3 dashboard reveal
      gsap.fromTo(".m3-dash", { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".m3-dash", start: "top 80%" } });
      gsap.fromTo(".m3-row", { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".m3-dash", start: "top 70%" } });

      const ring = document.querySelector<SVGCircleElement>(".m3-ring");
      if (ring) {
        gsap.fromTo(ring, { strokeDashoffset: 176 },
          { strokeDashoffset: 11, duration: 1.6, ease: "power2.out",
            scrollTrigger: { trigger: ring, start: "top 85%" } });
      }
      gsap.fromTo(".m3-bar-fill", { width: 0 },
        { width: (i, el) => (el as HTMLElement).dataset.w || "0%",
          duration: 1.4, ease: "power2.out",
          scrollTrigger: { trigger: ".m3-dash", start: "top 80%" } });

      // M4 photo
      gsap.fromTo(".m4-photo", { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".m4-photo", start: "top 80%" } });

      // M6 cards stagger
      gsap.fromTo(".m6-card", { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".m6-grid", start: "top 75%" } });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* ============== HEADER ============== */}
      <section id="features" className="relative w-full"
        style={{ background: "var(--cream)", padding: "140px 24px 80px" }}>
        <div className="text-center max-w-[820px] mx-auto">
          <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            Inside the platform
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(44px,6.5vw,72px)",
            color: "#1C1410", lineHeight: 0.9, fontWeight: 300 }}>
            EVERY FEATURE.<br />IN FULL DETAIL.
          </h2>
          <p className="mx-auto" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16,
            color: "#6B6258", maxWidth: 520, lineHeight: 1.8, marginTop: 32 }}>
            Six interconnected modules. Each one built to eliminate a specific
            operational failure point in how enterprises manage travel today.
          </p>
        </div>
      </section>

      <Module1 />
      <Module2 />
      <Module3 />
      <Module4 />
      <Module5 />
      <Module6 />
    </div>
  );
}

/* ------------------------------------------------------------ */
/* MODULE 1 — Smart Booking                                      */
/* ------------------------------------------------------------ */
function Module1() {
  const cards = [
    { n: "01", title: "POLICY-FILTERED SEARCH", teaser: "Rules run before results appear",
      back: "Search results are filtered in real time against your configured travel policy. Out-of-policy fares are hidden before display — not flagged after booking. Employees only ever see what they are entitled to book.",
      metric: "Result: 94% first-search compliance across enterprise clients." },
    { n: "02", title: "PREFERRED VENDOR RATES", teaser: "Negotiated fares surfaced first",
      back: "Ozonex surfaces your negotiated corporate fares before public rates on every search. Preferred hotel chains, airline partnerships, and ground transport vendors are prioritised automatically — no manual filtering required by the traveller.",
      metric: "Average saving: 23% vs public fares across all bookings." },
    { n: "03", title: "MULTI-CITY ITINERARIES", teaser: "One flow. Any complexity.",
      back: "Build multi-leg international itineraries in a single booking flow. Ozonex handles time zone logic, connection buffer validation, and multi-leg approval routing simultaneously. No separate bookings. No itinerary reconciliation.",
      metric: "Avg multi-city booking time: 8 minutes." },
    { n: "04", title: "24/7 HUMAN BACKUP", teaser: "Automation with a human safety net",
      back: "Every automated booking has a human escalation path. When a cancelled flight, missed connection, or last-minute reroute cannot be resolved by the platform, a dedicated Ozonex ops specialist takes over. Response time under 4 minutes, around the clock.",
      metric: "SLA: <4 min response, 24/7/365." },
  ];
  return (
    <section id="booking" className="relative w-full"
      style={{ background: "var(--cream)", padding: "0 80px 160px" }}>
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[42fr_58fr] gap-20">
        <div className="lg:sticky" style={{ top: 120, alignSelf: "start" }}>
          <div className="font-display" style={{ fontSize: 140, color: "#1C1410", opacity: 0.06,
            lineHeight: 1, marginBottom: -40, fontWeight: 300 }}>01</div>
          <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
            Travel Booking
          </div>
          <h3 className="font-display" style={{ fontSize: 56, color: "#1C1410", lineHeight: 0.95, fontWeight: 300 }}>
            BOOK SMARTER.<br />NOT HARDER.
          </h3>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "#6B6258",
            lineHeight: 1.85, maxWidth: 380, marginTop: 24 }}>
            Every search result your employees see has already been filtered
            against your live travel policy. They cannot see what they cannot
            book. No after-the-fact compliance chasing. No policy breach
            conversations. Just compliant bookings, every time.
          </p>
          <div style={{ width: 80, height: 1, background: "rgba(37,99,235,0.25)", margin: "32px 0" }} />
          <div style={{ background: "rgba(29,78,216,0.08)", borderLeft: "3px solid #2563EB", padding: "20px 24px" }}>
            <div className="font-display" style={{ fontSize: 42, color: "#2563EB", lineHeight: 1 }}>94%</div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#6B6258", marginTop: 4 }}>
              first-search policy compliance
            </div>
          </div>
          <div className="m1-photo" style={{ width: 380, maxWidth: "100%", marginTop: 40 }}>
            <img src={bookingLounge} alt="Executive in airport business lounge" loading="lazy"
              style={{ width: "100%", height: 260, objectFit: "cover" }} />
          </div>
        </div>
        <div className="flex flex-col" style={{ gap: 24, perspective: 1000 }}>
          {cards.map((c) => <FlipCard key={c.n} {...c} />)}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ n, title, teaser, back, metric }: {
  n: string; title: string; teaser: string; back: string; metric: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      style={{ height: 300, position: "relative", cursor: "pointer",
        transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "#1C1410", padding: 48,
        backfaceVisibility: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div className="font-display" style={{ fontSize: 80, color: "#fff", opacity: 0.1, lineHeight: 1, fontWeight: 300 }}>{n}</div>
        <div>
          <h4 className="font-display" style={{ fontSize: 36, color: "#fff", lineHeight: 1, fontWeight: 300 }}>{title}</h4>
          <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>{teaser}</div>
        </div>
        <div style={{ position: "absolute", bottom: 36, right: 36, color: "rgba(255,255,255,0.4)", fontSize: 18 }}>→</div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "#F5F0EA", padding: 48,
        backfaceVisibility: "hidden", transform: "rotateY(180deg)", border: "1px solid rgba(37,99,235,0.25)" }}>
        <h4 className="font-display" style={{ fontSize: 28, color: "#1C1410", fontWeight: 400 }}>{title}</h4>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, color: "#6B6258", lineHeight: 1.8, marginTop: 16 }}>{back}</p>
        <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#2563EB", marginTop: 20,
          borderLeft: "2px solid #2563EB", paddingLeft: 12 }}>{metric}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* MODULE 2 — Approval Workflow                                  */
/* ------------------------------------------------------------ */
function Module2() {
  const panels = [
    { n: "1", title: "THE REQUEST IS MADE",
      body: "An employee submits a trip request via the Ozonex portal or mobile app. The request captures destination, dates, purpose, and preferred options. A policy pre-check runs automatically in under 2 seconds — before any human reviews it.",
      svg: (<svg width="80" height="140" viewBox="0 0 80 140" fill="none">
        <rect x="2" y="2" width="76" height="136" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <line x1="20" y1="40" x2="60" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <line x1="20" y1="60" x2="60" y2="60" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <line x1="20" y1="80" x2="50" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      </svg>) },
    { n: "2", title: "POLICY RUNS SILENTLY",
      body: "Ozonex cross-references the request against the employee's grade, department policy, route restrictions, and budget allocation — all simultaneously. Compliant requests pass through instantly. Non-compliant requests are flagged with the specific rule triggered, before any approver sees them.",
      svg: (<svg width="160" height="120" viewBox="0 0 160 120" fill="none">
        {[20, 55, 90].map((y, i) => (
          <g key={i}>
            <line x1="10" y1={y} x2="110" y2={y} stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" />
            <path d={`M120 ${y - 4} l5 6 l10 -10`} stroke="#2563EB" strokeWidth="2" fill="none" />
          </g>
        ))}
      </svg>) },
    { n: "3", title: "THE RIGHT PERSON, AUTOMATICALLY",
      body: "The request routes to the correct approver based on live org hierarchy data — not a static list. If the primary approver is unavailable, it auto-escalates after a configurable SLA window. No CC chains. No manual forwarding. No delays caused by org chart changes.",
      svg: (<svg width="160" height="120" viewBox="0 0 160 120" fill="none">
        <circle cx="80" cy="20" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="35" cy="90" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="125" cy="90" r="10" fill="#2563EB" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="80" y1="30" x2="35" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <line x1="80" y1="30" x2="125" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      </svg>) },
    { n: "4", title: "APPROVE IN ONE TAP",
      body: "The approver receives a single push notification or email containing the full trip context, policy compliance status, and estimated cost. They approve or reject with one tap — from any device. No login required for the approval action itself.",
      svg: (<svg width="220" height="140" viewBox="0 0 220 140" fill="none">
        <rect x="2" y="2" width="216" height="136" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="160" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1="20" y1="55" x2="180" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <line x1="20" y1="70" x2="170" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <rect x="20" y="100" width="80" height="24" rx="12" fill="#2563EB" />
        <rect x="110" y="100" width="80" height="24" rx="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </svg>) },
    { n: "5", title: "AUTOMATIC CONFIRMATION",
      body: "On approval, the booking is automatically confirmed with the vendor, itinerary is sent to the traveller, a calendar invite is generated, and a cost record is created in the Finance module — all within 30 seconds of approval. Zero manual steps post-decision.",
      svg: (<svg width="200" height="120" viewBox="0 0 200 120" fill="none">
        <circle cx="40" cy="60" r="28" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
        <path d="M28 60 l9 9 l16 -18" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.7" />
        <rect x="100" y="32" width="80" height="56" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
        <line x1="100" y1="44" x2="180" y2="44" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
      </svg>),
      stat: "Average end-to-end approval time: 5.8 minutes" },
  ];
  return (
    <section id="approvals" className="relative w-full overflow-hidden grid-overlay"
      style={{ background: "#1C1410" }}>
      <TornEdge fill="#1C1410" position="top" />
      <div style={{ padding: "120px 80px 80px", maxWidth: 1320, margin: "0 auto" }}>
        <div className="font-display" style={{ fontSize: 140, color: "#fff", opacity: 0.05, lineHeight: 1, fontWeight: 300 }}>02</div>
        <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", marginTop: -40, marginBottom: 16, fontWeight: 500 }}>Approval Workflows</div>
        <h3 className="font-display" style={{ fontSize: 56, color: "#fff", lineHeight: 0.95, fontWeight: 300 }}>
          FROM REQUEST TO<br />APPROVED IN<br />UNDER 6 MINUTES.
        </h3>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)",
          maxWidth: 560, lineHeight: 1.8, marginTop: 24 }}>
          Most approval bottlenecks happen because the request reached the wrong
          person, at the wrong time, with the wrong context. Ozonex eliminates
          all three failure points simultaneously.
        </p>
      </div>
      <div className="m2-pin relative" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <div className="m2-track flex" style={{ width: "max-content", height: "100%" }}>
          {panels.map((p) => (
            <div key={p.n} className="relative flex flex-col justify-center"
              style={{ width: "100vw", height: "100vh", padding: "80px 100px" }}>
              <div className="font-display absolute" style={{ top: 80, right: 100, fontSize: 200,
                color: "#fff", opacity: 0.05, lineHeight: 1, fontWeight: 300 }}>{p.n}</div>
              <div className="font-display flex items-center justify-center" style={{ width: 56, height: 56,
                borderRadius: "50%", background: "#2563EB", color: "#fff", fontSize: 16,
                fontWeight: 500, marginBottom: 32 }}>{p.n}</div>
              <h4 className="font-display" style={{ fontSize: 44, color: "#fff", lineHeight: 1, fontWeight: 300, maxWidth: 720 }}>{p.title}</h4>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)",
                maxWidth: 480, lineHeight: 1.8, marginTop: 20 }}>{p.body}</p>
              <div style={{ marginTop: 40 }}>{p.svg}</div>
              {p.stat && <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13,
                color: "rgba(255,255,255,0.6)", marginTop: 24 }}>{p.stat}</div>}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.08)" }} />
        <div className="m2-progress" style={{ position: "absolute", bottom: 60, left: 0, height: 2, width: 0, background: "#F0C040" }} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* MODULE 3 — Expense Tracking (Receipt Capture + OCR removed)  */
/* ------------------------------------------------------------ */
function Module3() {
  return (
    <section id="expenses" className="relative w-full"
      style={{ background: "var(--cream)", padding: "160px 80px" }}>
      <TornEdge fill="#F5F0EA" position="top" />
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[44fr_56fr] gap-20">
        <div className="lg:sticky" style={{ top: 120, alignSelf: "start" }}>
          <div className="font-display" style={{ fontSize: 140, color: "#1C1410", opacity: 0.05,
            lineHeight: 1, marginBottom: -40, fontWeight: 300 }}>03</div>
          <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
            Expense Tracking
          </div>
          <h3 className="font-display" style={{ fontSize: 56, color: "#1C1410", lineHeight: 0.95, fontWeight: 300 }}>
            EXPENSES CLOSE<br />THEMSELVES.
          </h3>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "#6B6258",
            lineHeight: 1.85, maxWidth: 380, marginTop: 24 }}>
            Ozonex captures spend at the point of transaction. Expenses are
            matched to bookings automatically using booking reference data.
            By the time the trip ends, the expense report is already
            80% complete — without the employee doing anything.
          </p>
          <div style={{ marginTop: 32 }}>
            {[
              ["80%", "of expense report auto-completed before the employee submits"],
              ["< 2 days", "average expense reconciliation time vs industry average of 12 days"],
              ["Zero", "manual expense matching for pre-approved bookings"],
            ].map(([n, l]) => (
              <div key={l} style={{ padding: "20px 0", borderBottom: "1px solid rgba(37,99,235,0.2)" }}>
                <div className="font-display" style={{ fontSize: 36, color: "#2563EB", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#6B6258",
                  marginTop: 6, maxWidth: 320, lineHeight: 1.6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* dashboard mockup */}
        <div className="m3-dash" style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.25)",
          padding: 40, boxShadow: "0 24px 64px rgba(28,20,16,0.08)" }}>
          <div className="flex items-center justify-between">
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#6B6258" }}>Travel Expense Dashboard</div>
            <div style={{ border: "1px solid rgba(37,99,235,0.3)", padding: "4px 14px",
              borderRadius: 999, fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#2563EB" }}>Q2 2026</div>
          </div>

          <div style={{ marginTop: 32, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, color: "#1C1410" }}>₹</span>
            <span className="font-display pfm-count" data-to="4280000" data-fmt="comma"
              style={{ fontSize: 64, color: "#1C1410", lineHeight: 1, fontWeight: 300 }}>0</span>
          </div>
          <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#6B6258", marginTop: 4 }}>
            Total travel spend, Q2 2026
          </div>

          <div className="grid grid-cols-3" style={{ gap: 12, marginTop: 32 }}>
            <div style={{ border: "1px solid rgba(37,99,235,0.15)", padding: 20 }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="rgba(37,99,235,0.15)" strokeWidth="4" fill="none" />
                <circle className="m3-ring" cx="32" cy="32" r="28" stroke="#2563EB" strokeWidth="4" fill="none"
                  strokeDasharray="176" strokeDashoffset="176" transform="rotate(-90 32 32)" />
                <text x="32" y="36" textAnchor="middle"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 500, fill: "#1C1410" }}>94%</text>
              </svg>
              <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginTop: 8 }}>Compliance Rate</div>
            </div>
            <div style={{ border: "1px solid rgba(37,99,235,0.15)", padding: 20 }}>
              <div className="font-display" style={{ fontSize: 32, color: "#1C1410", lineHeight: 1 }}>₹ 38,200</div>
              <div style={{ marginTop: 12, height: 4, background: "rgba(37,99,235,0.15)", position: "relative" }}>
                <div className="m3-bar-fill" data-w="68%" style={{ height: "100%", width: 0, background: "#3B82F6" }} />
              </div>
              <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginTop: 8 }}>vs ₹56,000 industry avg</div>
            </div>
            <div style={{ border: "1px solid rgba(37,99,235,0.15)", padding: 20 }}>
              <div className="font-display pfm-count" data-to="847"
                style={{ fontSize: 32, color: "#1C1410", lineHeight: 1, fontWeight: 300 }}>0</div>
              <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginTop: 4 }}>auto-matched this quarter</div>
              <div style={{ marginTop: 12, height: 4, background: "rgba(37,99,235,0.15)" }}>
                <div className="m3-bar-fill" data-w="91%" style={{ height: "100%", width: 0, background: "#2563EB" }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <div className="grid" style={{ gridTemplateColumns: "1.4fr 1.6fr 1fr 1fr",
              fontFamily: "Poppins, sans-serif", fontSize: 10, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#6B6258", paddingBottom: 14,
              borderBottom: "1px solid rgba(37,99,235,0.15)" }}>
              <span>Traveller</span><span>Destination</span><span>Amount</span><span>Status</span>
            </div>
            {[
              ["R. Sharma", "Mumbai → Dubai", "₹ 82,400", "MATCHED"],
              ["P. Iyer", "Delhi → Singapore", "₹ 1,14,000", "MATCHED"],
              ["A. Khan", "Bengaluru → London", "₹ 2,28,000", "PENDING"],
              ["S. Mehta", "Chennai → NYC", "₹ 1,96,000", "MATCHED"],
            ].map(([t, d, a, s]) => (
              <div key={t} className="m3-row grid items-center" style={{ gridTemplateColumns: "1.4fr 1.6fr 1fr 1fr",
                fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#1C1410",
                padding: "20px 0", borderBottom: "1px solid rgba(37,99,235,0.15)" }}>
                <span>{t}</span><span>{d}</span><span>{a}</span><span><Badge label={s} /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  const isMatched = label === "MATCHED" || label === "READY";
  return (
    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 10, letterSpacing: "0.08em",
      textTransform: "uppercase", padding: "4px 10px", borderRadius: 2,
      background: isMatched ? "rgba(74,163,90,0.1)" : "rgba(29,78,216,0.12)",
      color: isMatched ? "#2D7A3A" : "#2563EB",
      border: `1px solid ${isMatched ? "rgba(74,163,90,0.25)" : "rgba(29,78,216,0.3)"}` }}>
      {label}
    </span>
  );
}

/* ------------------------------------------------------------ */
/* MODULE 4 — Policy Management (dark)                           */
/* ------------------------------------------------------------ */
function Module4() {
  const items = [
    ["VISUAL RULE BUILDER",
      "Create complex travel policies without writing a single line of code. The visual rule builder uses condition logic: IF employee grade = Manager AND route = International THEN max cabin = Business AND max hotel rate = $250/night. Rules stack and combine. Changes apply instantly across the entire platform — no IT ticket required."],
    ["GRADE-BASED ENTITLEMENTS",
      "Every employee tier has its own entitlement set — configured once, applied automatically forever. C-suite, VP, Senior Manager, Manager, and IC levels each get distinct booking permissions, spend caps, and hotel categories. When someone is promoted, their entitlements update the moment HR syncs."],
    ["EXCEPTION HANDLING",
      "Legitimate out-of-policy travel happens. Ozonex handles it cleanly. The employee submits a business justification alongside the out-of-policy booking. Their manager approves both in one action. The exception is logged, categorised, and included in the monthly compliance report — creating a full audit trail without creating friction."],
    ["AUTO-ENFORCEMENT AT SEARCH",
      "Non-compliant options never appear on screen. The policy engine runs its check before search results are rendered — not as a post-selection warning. Employees never see out-of-policy fares. This single architectural decision eliminates 91% of policy breach attempts before they begin."],
    ["COMPLIANCE REPORTING",
      "Monthly automated compliance reports are delivered directly to Finance and HR leads. Reports include: policy compliance rate by department, exception frequency by grade, top breach categories, and trend data vs prior quarter. Exportable to PDF or your BI tool of choice."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="policy" className="relative w-full overflow-hidden grid-overlay"
      style={{ background: "#1C1410", padding: "160px 80px" }}>
      <TornEdge fill="#1C1410" position="top" />
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[44fr_56fr] gap-20">
        <div className="lg:sticky" style={{ top: 120, alignSelf: "start" }}>
          <div className="font-display" style={{ fontSize: 140, color: "#fff", opacity: 0.05,
            lineHeight: 1, marginBottom: -40, fontWeight: 300 }}>04</div>
          <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
            Policy Management
          </div>
          <h3 className="font-display" style={{ fontSize: 56, color: "#fff", lineHeight: 0.95, fontWeight: 300 }}>
            YOUR RULES.<br />ENFORCED<br />WITHOUT YOU.
          </h3>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)",
            maxWidth: 380, lineHeight: 1.85, marginTop: 24 }}>
            Policy in most companies is a PDF shared at onboarding that nobody
            reads. In Ozonex, policy is live logic — running silently behind
            every search query, every booking, and every expense submission,
            without requiring any human enforcement.
          </p>
          <div className="m4-photo" style={{ width: 380, maxWidth: "100%", marginTop: 48 }}>
            <img src={policyWoman} alt="Confident professional in airport terminal" loading="lazy"
              style={{ width: "100%", height: 280, objectFit: "cover" }} />
          </div>
          <div className="flex items-baseline" style={{ gap: 16, marginTop: 24 }}>
            <span className="font-display" style={{ fontSize: 48, color: "#2563EB", lineHeight: 1, fontWeight: 300 }}>91%</span>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)",
              maxWidth: 240, lineHeight: 1.6 }}>reduction in policy breach attempts at source</span>
          </div>
        </div>

        <div>
          {items.map(([title, body], i) => {
            const isOpen = open === i;
            return (
              <div key={title} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)",
                borderLeft: isOpen ? "2px solid #2563EB" : "2px solid transparent",
                background: isOpen ? "rgba(255,255,255,0.03)" : "transparent",
                paddingLeft: 20, transition: "background 0.3s, border-color 0.3s" }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{ padding: "28px 0" }}>
                  <span className="font-display" style={{ fontSize: 24, color: "#fff", fontWeight: 400 }}>{title}</span>
                  <ChevronDown size={20} style={{ color: "rgba(255,255,255,0.5)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
                </button>
                <div style={{ overflow: "hidden", maxHeight: isOpen ? 600 : 0,
                  opacity: isOpen ? 1 : 0, transition: "max-height 0.5s ease, opacity 0.4s ease" }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15,
                    color: "rgba(255,255,255,0.65)", lineHeight: 1.85,
                    marginTop: 4, paddingBottom: 32, paddingRight: 24 }}>{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* MODULE 5 — Reporting & Analytics — tabbed role views          */
/* ------------------------------------------------------------ */
function Module5() {
  const tabs = ["CFO VIEW", "HR VIEW", "MANAGER VIEW", "FINANCE VIEW"];
  const [active, setActive] = useState(0);
  return (
    <section id="analytics" className="relative w-full"
      style={{ background: "var(--cream)", padding: "160px 80px" }}>
      <TornEdge fill="#F5F0EA" position="top" />
      <div className="max-w-[1320px] mx-auto text-center">
        <div className="font-display" style={{ fontSize: 140, color: "#1C1410", opacity: 0.05, lineHeight: 1, marginBottom: -40, fontWeight: 300 }}>05</div>
        <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>Reporting & Analytics</div>
        <h3 className="font-display" style={{ fontSize: 56, color: "#1C1410", lineHeight: 0.95, fontWeight: 300 }}>
          DATA THAT DRIVES<br />DECISIONS. NOT<br />JUST REPORTS.
        </h3>
        <p className="mx-auto" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, color: "#6B6258",
          maxWidth: 560, lineHeight: 1.8, marginTop: 24 }}>
          Every dashboard in Ozonex was designed by working backwards from a
          real decision. What does a CFO need to approve next quarter's travel
          budget? What does HR need to fulfil duty of care? Those questions
          built the screens.
        </p>
      </div>

      <div className="max-w-[1320px] mx-auto" style={{ marginTop: 80 }}>
        <div className="flex justify-center" style={{ borderBottom: "1px solid rgba(37,99,235,0.2)" }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActive(i)} style={{ fontFamily: "Poppins, sans-serif",
              fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 32px",
              color: active === i ? "#1C1410" : "#6B6258",
              borderBottom: active === i ? "2px solid #2563EB" : "2px solid transparent",
              marginBottom: -1, fontWeight: 500 }}>{t}</button>
          ))}
        </div>
        <div key={active} className="grid lg:grid-cols-[48fr_52fr] items-start"
          style={{ gap: 80, paddingTop: 60, minHeight: 480, animation: "fade-in 0.45s ease both" }}>
          {active === 0 && <CFOTab />}
          {active === 1 && <HRTab />}
          {active === 2 && <ManagerTab />}
          {active === 3 && <FinanceTab />}
        </div>
      </div>
    </section>
  );
}

function TabText({ h, body, bullets }: { h: string; body: string; bullets: string[] }) {
  return (
    <div>
      <h4 className="font-display" style={{ fontSize: 36, color: "#1C1410", lineHeight: 1.1, fontWeight: 400 }}>{h}</h4>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "#6B6258",
        lineHeight: 1.8, marginTop: 24, maxWidth: 480 }}>{body}</p>
      <div className="flex flex-col" style={{ gap: 16, marginTop: 32 }}>
        {bullets.map((b) => (
          <div key={b} style={{ borderLeft: "2px solid rgba(29,78,216,0.4)", paddingLeft: 16,
            fontFamily: "Poppins, sans-serif", fontSize: 14, color: "#6B6258" }}>{b}</div>
        ))}
      </div>
    </div>
  );
}

function MockShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(37,99,235,0.2)", padding: 32,
      boxShadow: "0 16px 40px rgba(28,20,16,0.05)" }}>{children}</div>
  );
}

function CFOTab() {
  return (
    <>
      <TabText
        h="Total command of every travel spend."
        body="The CFO dashboard shows total travel spend vs approved budget, savings captured against benchmark fares, policy compliance rate, and top 10 highest-cost travellers — all on one screen, updated continuously. Monthly spend trend and department breakdown require no manual compilation."
        bullets={[
          "Live budget vs actuals, updated per booking",
          "Benchmark fare savings automatically calculated",
          "One-click export to board pack format",
        ]}
      />
      <MockShell>
        <div className="grid grid-cols-2" style={{ gap: 16 }}>
          <div style={{ border: "1px solid rgba(37,99,235,0.15)", padding: 20 }}>
            <div className="font-display" style={{ fontSize: 40, color: "#1C1410", fontWeight: 300, lineHeight: 1 }}>₹ 2.4 Cr</div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginTop: 6 }}>Total Spend Q2</div>
          </div>
          <div style={{ border: "1px solid rgba(37,99,235,0.15)", padding: 20 }}>
            <div className="font-display" style={{ fontSize: 40, color: "#2D7A3A", fontWeight: 300, lineHeight: 1 }}>₹ 38L</div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginTop: 6 }}>Savings vs Benchmark</div>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 32, marginTop: 32 }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {(() => {
              const segs = [
                { color: "#2563EB", len: 0.42 }, { color: "#3B82F6", len: 0.28 },
                { color: "rgba(37,99,235,0.4)", len: 0.18 }, { color: "rgba(37,99,235,0.2)", len: 0.12 },
              ];
              const C = 2 * Math.PI * 60;
              let acc = 0;
              return segs.map((s, i) => {
                const dash = `${s.len * C} ${C}`;
                const off = -acc * C;
                acc += s.len;
                return (<circle key={i} cx="80" cy="80" r="60" fill="none" stroke={s.color}
                  strokeWidth="20" strokeDasharray={dash} strokeDashoffset={off} transform="rotate(-90 80 80)" />);
              });
            })()}
            <text x="80" y="84" textAnchor="middle" style={{ fontFamily: "Poppins, sans-serif", fontSize: 9, fill: "#6B6258" }}>
              Spend by Category
            </text>
          </svg>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {[["#2563EB","Flights"],["#3B82F6","Hotels"],["rgba(37,99,235,0.4)","Ground"],["rgba(37,99,235,0.2)","Other"]].map(([c,l]) => (
              <div key={l} className="flex items-center" style={{ gap: 8 }}>
                <span style={{ width: 10, height: 10, background: c, display: "inline-block" }} />
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#1C1410" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </MockShell>
    </>
  );
}

function HRTab() {
  return (
    <>
      <TabText
        h="Every traveller. Every location. In real time."
        body="The HR console provides live traveller location data drawn from confirmed itineraries. When a traveller is in a high-risk region, an automated welfare check is triggered. Visa expiry and document tracking ensure no traveller departs undocumented."
        bullets={[
          "Live location from confirmed booking data",
          "Automated welfare alerts for risk-flagged regions",
          "Visa and passport expiry tracking per traveller",
        ]}
      />
      <MockShell>
        <svg viewBox="0 0 600 320" style={{ width: "100%", height: "auto" }}>
          <path d="M40,160 Q120,100 200,150 T400,140 T560,170" stroke="#3B82F6" strokeOpacity="0.3" fill="none" />
          <path d="M50,200 Q160,250 280,210 T520,220" stroke="#3B82F6" strokeOpacity="0.3" fill="none" />
          <path d="M80,90 Q200,60 340,90 T540,100" stroke="#3B82F6" strokeOpacity="0.25" fill="none" />
          {[{ x: 220, y: 180, l: "Dubai" }, { x: 380, y: 200, l: "Singapore" }, { x: 130, y: 130, l: "London" }].map((p) => (
            <g key={p.l}>
              <circle cx={p.x} cy={p.y} r="14" fill="#2563EB" opacity="0.25">
                <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={p.x} cy={p.y} r="4" fill="#2563EB" />
              <rect x={p.x - 24} y={p.y + 12} width="48" height="14" rx="2" fill="#1C1410" />
              <text x={p.x} y={p.y + 22} textAnchor="middle"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: 9, fill: "#fff" }}>{p.l}</text>
            </g>
          ))}
        </svg>
      </MockShell>
    </>
  );
}

function ManagerTab() {
  const bars = [["Sales", 78], ["Marketing", 45], ["Operations", 92], ["Tech", 31]] as const;
  return (
    <>
      <TabText
        h="Your team. Your budget. Your approvals."
        body="Managers see their team's active trips, pending approval requests, and live budget burn rate — all in one focused view. No digging through finance reports. No chasing emails. Approval notifications arrive in real time on any device."
        bullets={[
          "All pending approvals surfaced in one queue",
          "Team budget burn vs quarterly allocation",
          "Full trip context before every decision",
        ]}
      />
      <MockShell>
        <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginBottom: 24 }}>
          Q2 Budget Utilisation by Team
        </div>
        <div className="flex flex-col" style={{ gap: 20 }}>
          {bars.map(([l, p]) => (
            <div key={l} className="flex items-center" style={{ gap: 16 }}>
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#1C1410", width: 90 }}>{l}</span>
              <div style={{ flex: 1, height: 8, background: "rgba(37,99,235,0.15)", position: "relative" }}>
                <div className="m3-bar-fill" data-w={`${p}%`} style={{ height: "100%", width: 0, background: "#3B82F6" }} />
              </div>
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#6B6258", width: 40, textAlign: "right" }}>{p}%</span>
            </div>
          ))}
        </div>
      </MockShell>
    </>
  );
}

function FinanceTab() {
  return (
    <>
      <TabText
        h="Reconciliation without the spreadsheets."
        body="Finance gets GL-ready expense exports with automatic cost centre assignment, VAT reclaim data, and vendor payment summaries. Every figure ties back to an approved booking. One-click export to SAP, Oracle, or any major ERP system."
        bullets={[
          "Automatic GL code assignment per booking",
          "VAT reclaim data extracted and categorised",
          "Direct ERP push via pre-built connectors",
        ]}
      />
      <MockShell>
        <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#6B6258", marginBottom: 16 }}>
          Pending GL Export — June 2026
        </div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr 1.2fr 1fr",
          fontFamily: "Poppins, sans-serif", fontSize: 10, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#6B6258", paddingBottom: 12,
          borderBottom: "1px solid rgba(37,99,235,0.2)" }}>
          <span>Dept</span><span>Amount</span><span>GL Code</span><span>Status</span>
        </div>
        {[["Sales","₹4,82,000","7410-SAL","READY"],["Marketing","₹2,14,000","7410-MKT","READY"],
          ["Operations","₹6,90,000","7410-OPS","REVIEW"],["Tech","₹1,08,000","7410-TCH","READY"]].map(([d,a,g,s]) => (
          <div key={d} className="grid items-center" style={{ gridTemplateColumns: "1fr 1.2fr 1.2fr 1fr",
            fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#1C1410",
            padding: "20px 0", borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
            <span>{d}</span><span>{a}</span><span>{g}</span>
            <span><Badge label={s === "REVIEW" ? "PENDING" : "READY"} /></span>
          </div>
        ))}
      </MockShell>
    </>
  );
}

/* ------------------------------------------------------------ */
/* MODULE 6 — Multi-level access — role cards                    */
/* ------------------------------------------------------------ */
function Module6() {
  const roles = [
    ["ADMIN","A","Full platform configuration and user management. Policy rule builder access. Vendor rate and preferred supplier management. Complete audit log. SSO and integration control."],
    ["HR","H","Real-time traveller location dashboard. Duty of care alert management. Welfare check initiation. Visa and travel document expiry tracking. Risk region monitoring."],
    ["FINANCE","F","Live spend visibility across all departments. GL export and ERP push. Budget management and forecasting. VAT reclaim data. Vendor payment summaries."],
    ["MANAGER","M","Team booking oversight. One-click approval queue. Budget burn rate vs quarterly allocation. Escalation management. Departmental travel pattern reports."],
    ["EMPLOYEE","E","Policy-filtered self-booking portal. Mobile expense submission. Full trip history and documents. Approval status tracking. 24/7 support access."],
  ];
  return (
    <section id="access" className="relative w-full overflow-hidden grid-overlay"
      style={{ background: "#1C1410", padding: "160px 80px" }}>
      <TornEdge fill="#1C1410" position="top" />
      <div className="text-center max-w-[820px] mx-auto">
        <div className="font-display" style={{ fontSize: 140, color: "#fff", opacity: 0.05, lineHeight: 1, marginBottom: -40, fontWeight: 300 }}>06</div>
        <div style={{ color: "#2563EB", fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>Multi-Level Access</div>
        <h3 className="font-display" style={{ fontSize: 56, color: "#fff", lineHeight: 0.95, fontWeight: 300 }}>
          FIVE ROLES.<br />FIVE VIEWS.<br />ONE PLATFORM.
        </h3>
        <p className="mx-auto" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16,
          color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.8, marginTop: 24 }}>
          Ozonex is not a single dashboard shared by everyone. Each access level
          is a distinct environment — built around the decisions that role
          actually needs to make. No information overload. No missing context.
        </p>
      </div>
      <div className="m6-grid max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-5"
        style={{ marginTop: 80, gap: 0 }}>
        {roles.map(([role, letter, desc]) => (
          <RoleCard key={role} role={role} letter={letter} desc={desc} />
        ))}
      </div>
    </section>
  );
}

function RoleCard({ role, letter, desc }: { role: string; letter: string; desc: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="m6-card relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ minHeight: 380, padding: "48px 36px",
        border: "1px solid rgba(255,255,255,0.07)",
        borderTop: hover ? "2px solid #2563EB" : "1px solid rgba(255,255,255,0.07)",
        background: hover ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        transform: hover ? "translateY(-16px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden" }}>
      <span className="font-display" style={{ position: "absolute", bottom: -20, right: -10,
        fontSize: 160, fontWeight: 300, color: "#fff", opacity: 0.04, lineHeight: 1 }}>{letter}</span>
      <h4 className="font-display relative" style={{ fontSize: 32, color: "#fff", fontWeight: 300, lineHeight: 1 }}>{role}</h4>
      <p className="relative" style={{ fontFamily: "Poppins, sans-serif", fontSize: 14,
        color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginTop: 20,
        opacity: hover ? 0.85 : 0, maxHeight: hover ? 400 : 0,
        transition: "opacity 0.4s ease, max-height 0.4s ease", overflow: "hidden" }}>{desc}</p>
      <div className="absolute" style={{ left: 36, right: 36, bottom: 36, height: 1,
        background: "#2563EB", width: hover ? "calc(100% - 72px)" : 0, transition: "width 0.4s ease" }} />
    </div>
  );
}


