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
  { n: "01", title: "Trust First", desc: "Every client relationship starts with transparency. We share what we know, admit what we don't, and never oversell." },
  { n: "02", title: "Global Reach, Local Depth", desc: "Offices across India, the Middle East, and beyond mean we understand regional nuance — not just international schedules." },
  { n: "03", title: "People Behind the Platform", desc: "Technology handles the routine. Our team handles the exceptions — 24/7, without making you feel like a ticket number." },
  { n: "04", title: "Relentless Improvement", desc: "Since 2014 we've been refining how corporate travel works. We're still not done." },
];

const milestones = [
  { year: "2014", event: "Founded in Trivandrum, Kerala with a single mission: make corporate travel manageable." },
  { year: "2016", event: "Expanded operations to Chennai and Cochin, building a South India enterprise client base." },
  { year: "2018", event: "Achieved IATA certification — a milestone that unlocked direct airline partnerships." },
  { year: "2020", event: "Launched the Ozonex digital platform, moving corporate travel management online." },
  { year: "2022", event: "Opened Dubai office, stepping into the Middle East corporate travel market." },
  { year: "2024", event: "Delhi office inaugurated. Active operations across India, Middle East, Asia, and beyond." },
];

const markets = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇦🇪", name: "Middle East" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇪🇺", name: "Europe" },
];

const services = [
  ["✈", "Flight Booking", "Domestic and international air across all major carriers with preferred corporate fares."],
  ["🏨", "Hotel Booking", "Curated properties worldwide, negotiated rates, and policy-compliant options."],
  ["🗂", "Visa Assistance", "End-to-end visa processing support across key business travel destinations."],
  ["🎤", "MICE", "Meetings, incentives, conferences, and events — planned and executed at scale."],
  ["💼", "Corporate Travel Management", "The full Ozonex platform: booking, approvals, expense, policy, and reporting in one system."],
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Ozonex by Ozone Tourism and Travel" },
      {
        name: "description",
        content:
          "Ozonex is the corporate travel management platform by Ozone Tourism and Travel — an IATA-certified travel company established in 2014, operating across India, the Middle East, and beyond.",
      },
      { property: "og:title", content: "About Us | Ozonex" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.fromTo(".hero-word", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 0.35 });
      gsap.fromTo(".hero-fade", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.9 });

      // Statement
      gsap.fromTo(".st-headline", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".st-headline", start: "top 80%" } });
      gsap.fromTo(".st-para", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: ".st-para", start: "top 85%" } });

      // Values
      gsap.fromTo(".value-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".values-section", start: "top 75%" } });

      // Timeline
      gsap.fromTo(".timeline-item", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: ".timeline-section", start: "top 80%" } });

      // Services
      gsap.fromTo(".svc-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: ".services-section", start: "top 80%" } });

      // Markets
      gsap.fromTo(".market-pill", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.06, scrollTrigger: { trigger: ".markets-section", start: "top 85%" } });

      // CTA
      gsap.fromTo(".cta-word", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".about-cta", start: "top 60%" } });
      gsap.fromTo(".cta-btn", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: "power3.out", scrollTrigger: { trigger: ".about-cta", start: "top 60%" } });
    });

    return () => { ctx.revert(); lenis.destroy(); ScrollTrigger.getAll().forEach((s) => s.kill()); };
  }, []);

  return (
    <main className="relative">
      <Nav />
      <ScrollLineV />

      {/* HERO */}
      <section className="relative w-full min-h-[80vh] overflow-hidden grid-overlay flex flex-col items-center justify-center text-center px-6 py-40" style={{ background: "var(--ink)" }}>
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.25 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.25 }}>✦</span>

        <div className="hero-eyebrow eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>About Ozonex</div>

        <h1 className="font-display mt-8 text-white" style={{ fontSize: "clamp(48px,7vw,88px)", lineHeight: 0.95 }}>
          {[["Ten years", "of"], ["moving", "business"], ["forward."]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="hero-word inline-block mr-3">{w}</span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-10 mx-auto" style={{ maxWidth: 540, fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
          Ozonex is the corporate travel management platform by Ozone Tourism and Travel — an IATA-certified travel company founded in Trivandrum in 2014, now operating across India, the Middle East, and nine global markets.
        </p>

        <div className="hero-fade mt-8 flex flex-wrap justify-center gap-6" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
          {["IATA Certified", "Est. 2014", "9 Markets", "5 Offices", "24/7 Support"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span style={{ color: "var(--gold)" }}>✦</span> {t}
            </span>
          ))}
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      {/* MISSION STATEMENT */}
      <section className="relative w-full overflow-hidden" style={{ background: "var(--cream)", padding: "120px 24px" }}>
        <div className="relative max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <h2 className="st-headline font-display" style={{ fontSize: "clamp(40px,5vw,72px)", color: "var(--ink)", lineHeight: 0.95 }}>
            Corporate travel<br />shouldn't be this<br />complicated.
          </h2>
          <div className="flex flex-col gap-6">
            <p className="st-para" style={{ fontSize: 16, color: "var(--muted-warm)", lineHeight: 1.85 }}>
              We started Ozone Tourism and Travel in 2014 because we saw a gap: large organisations were managing their travel through spreadsheets, back-and-forth emails, and fragmented vendors. Finance teams had no visibility. HR had no duty-of-care tools. Approvals were bottlenecks, not safeguards.
            </p>
            <p className="st-para" style={{ fontSize: 16, color: "var(--muted-warm)", lineHeight: 1.85 }}>
              Ozonex is our answer. It's a platform built from the operational reality of running corporate travel for hundreds of organisations — not a product designed in isolation from how businesses actually work.
            </p>
            <p className="st-para" style={{ fontSize: 16, color: "var(--muted-warm)", lineHeight: 1.85 }}>
              Today we operate across India, the Middle East, Asia, and beyond — with offices in Trivandrum, Chennai, Cochin, Delhi, and Dubai.
            </p>
          </div>
        </div>

        <div className="relative max-w-[1320px] mx-auto" style={{ margin: "72px auto 0", height: 1, background: "rgba(37,99,235,0.2)" }} />

        {/* Stats */}
        <div className="relative max-w-[1320px] mx-auto mt-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { num: "2014", label: "Year founded" },
            { num: "9+", label: "Markets served" },
            { num: "5", label: "Global offices" },
            { num: "IATA", label: "Certified operator" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display" style={{ fontSize: "clamp(40px,4vw,56px)", color: "var(--ink)" }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "var(--muted-warm)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section relative w-full overflow-hidden grid-overlay" style={{ background: "var(--ink)", padding: "140px 24px" }}>
        <TornEdge fill="var(--ink)" position="top" />

        <div className="text-center max-w-[1320px] mx-auto mb-20">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>How we work</div>
          <h2 className="font-display mt-6 text-white" style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.05 }}>
            The principles behind<br />every decision we make
          </h2>
        </div>

        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v) => (
            <div key={v.n} className="value-card" style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "40px 36px" }}>
              <div className="font-display" style={{ fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, marginBottom: 20 }}>{v.n}</div>
              <h3 className="font-display text-white" style={{ fontSize: 26, marginBottom: 16 }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      {/* TIMELINE */}
      <section className="timeline-section relative w-full" style={{ background: "var(--cream)", padding: "120px 24px" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="eyebrow text-center" style={{ color: "var(--gold)" }}>Our journey</div>
          <h2 className="font-display text-center mt-6" style={{ fontSize: "clamp(32px,4vw,48px)", color: "var(--ink)", lineHeight: 1.1 }}>
            A decade in motion
          </h2>

          <div className="mt-16 flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-item flex gap-8 relative" style={{ paddingBottom: i < milestones.length - 1 ? 40 : 0 }}>
                {/* line */}
                <div className="flex flex-col items-center" style={{ minWidth: 24 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--ink)", border: "3px solid var(--cream)", boxShadow: "0 0 0 2px var(--ink)", flexShrink: 0, marginTop: 4 }} />
                  {i < milestones.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: "rgba(28,20,16,0.15)", marginTop: 8 }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < milestones.length - 1 ? 8 : 0 }}>
                  <div className="font-display" style={{ fontSize: 28, color: "var(--ink)", lineHeight: 1 }}>{m.year}</div>
                  <p style={{ fontSize: 15, color: "var(--muted-warm)", lineHeight: 1.7, marginTop: 8 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section relative w-full overflow-hidden" style={{ background: "#fff", padding: "120px 24px" }}>
        <div className="text-center max-w-[1320px] mx-auto mb-16">
          <div className="eyebrow" style={{ color: "var(--gold)" }}>What we do</div>
          <h2 className="font-display mt-6" style={{ fontSize: "clamp(32px,4vw,48px)", color: "var(--ink)", lineHeight: 1.05 }}>
            Services built for<br />corporate operations
          </h2>
        </div>

        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(([icon, title, desc]) => (
            <div key={title} className="svc-card" style={{ border: "1px solid rgba(212,201,190,0.5)", borderRadius: 16, padding: "36px 32px" }}>
              <span style={{ fontSize: 32 }}>{icon}</span>
              <h3 className="font-display mt-4" style={{ fontSize: 22, color: "var(--ink)", marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: 14, color: "var(--muted-warm)", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARKETS */}
      <section className="markets-section relative w-full" style={{ background: "var(--cream)", padding: "100px 24px" }}>
        <div className="text-center max-w-[1320px] mx-auto mb-14">
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Global reach</div>
          <h2 className="font-display mt-6" style={{ fontSize: "clamp(32px,4vw,48px)", color: "var(--ink)", lineHeight: 1.05 }}>
            Markets we serve
          </h2>
        </div>

        <div className="max-w-[900px] mx-auto flex flex-wrap justify-center gap-4">
          {markets.map((m) => (
            <div key={m.name} className="market-pill flex items-center gap-2" style={{ background: "#fff", border: "1px solid rgba(212,201,190,0.5)", borderRadius: 999, padding: "12px 22px", boxShadow: "0 2px 12px rgba(28,20,16,0.05)" }}>
              <span style={{ fontSize: 20 }}>{m.flag}</span>
              <span style={{ fontSize: 14, color: "var(--ink)", fontFamily: "Poppins, sans-serif" }}>{m.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta relative w-full overflow-hidden grid-overlay flex flex-col items-center justify-center text-center px-6 py-40" style={{ background: "var(--ink)", minHeight: "60vh" }}>
        <TornEdge fill="var(--ink)" position="top" />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.25 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.25 }}>✦</span>

        <h2 className="font-display text-white" style={{ fontSize: "clamp(40px,6vw,72px)", lineHeight: 1.0 }}>
          {[["Ready to", "simplify"], ["your corporate", "travel?"]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="cta-word inline-block mr-3">{w}</span>
              ))}
            </span>
          ))}
        </h2>

        <p className="cta-btn mt-8 mx-auto" style={{ maxWidth: 460, fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
          Talk to our enterprise team and get a plan built around your organisation — not a generic tier.
        </p>

        <div className="cta-btn mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="/pricing" className="pill" style={{ background: "#2563EB", borderColor: "#2563EB", padding: "16px 48px" }}>Get a Custom Quote</a>
          <a href="/product" className="pill" style={{ padding: "16px 48px" }}>See the Platform</a>
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      <Footer />
    </main>
  );
}
