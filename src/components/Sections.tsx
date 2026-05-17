import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import enterprises from "@/assets/who-enterprises.jpg";
import hr from "@/assets/who-hr.jpg";
import exec from "@/assets/who-exec.jpg";
import cta from "@/assets/cta-skyline.jpg";
import footer from "@/assets/footer-bg.jpg";
import ozonexLogo from "@/assets/ozonex-logo.png";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { img: enterprises, title: "Enterprises & MNCs", desc: "Centralized travel control for large, multi-location organizations with complex approval hierarchies.", offset: 0 },
  { img: hr, title: "HR & Finance Teams", desc: "Give your teams real-time visibility and zero-effort reconciliation.", offset: 60 },
  { img: exec, title: "Executives & Founders", desc: "Rapid-response bookings for leaders who need to move at the speed of business.", offset: 30 },
];

export function WhoFor() {
  return (
    <section className="relative w-full py-32 px-12 overflow-hidden" style={{ background: "var(--cream)" }}>
      <h2 className="font-display text-center" style={{ fontSize: "clamp(40px, 5vw, 64px)", color: "var(--ink)" }}>
        Perfectly built for
      </h2>

      <div className="relative max-w-[1200px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* connecting squiggles */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M380,180 C440,220 460,140 520,200" stroke="var(--sand)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M780,160 C840,210 860,130 920,190" stroke="var(--sand)" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>

        {cards.map((c, i) => (
          <div
            key={c.title}
            className="reveal"
            style={{ marginTop: c.offset }}
          >
            <img
              src={c.img}
              alt={c.title}
              width={640}
              height={800}
              loading="lazy"
              style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 4 }}
            />
            <h3 className="font-display mt-6" style={{ fontSize: 28, color: "var(--ink)" }}>{c.title}</h3>
            <p className="mt-3" style={{ fontSize: 14, color: "var(--muted-warm)", lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  ["What makes Ozonex different from other corporate travel tools?", "Ozonex is a software-first platform built around finance and HR workflows — not a travel agency wrapped in software. Policies, approvals, expenses, and reporting all live in one system."],
  ["Does Ozonex support multi-level approval workflows?", "Yes. Configure unlimited approval chains by cost center, amount, role, or destination, with conditional routing."],
  ["Can employees self-book with policy guardrails?", "Employees self-serve within enforced policy. Out-of-policy bookings are blocked or escalated automatically."],
  ["Do you offer real-time expense visibility?", "Live dashboards show in-trip and post-trip spend across entities, departments, and geographies."],
  ["Is Ozonex suitable for companies outside India?", "Ozonex serves global enterprises from hubs in India and the UAE, with multi-currency, multi-entity, and multi-jurisdiction support."],
  ["How quickly can we get started?", "Most enterprises are live within two weeks, including SSO, policy import, and approval workflow setup."],
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-row",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-32 px-12" style={{ background: "var(--cream)" }}>
      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-lg select-none" style={{ color: "var(--gold)", opacity: 0.5 }}>✦</span>
      <span className="absolute right-12 top-1/2 -translate-y-1/2 text-lg select-none" style={{ color: "var(--gold)", opacity: 0.5 }}>✦</span>

      <h2 className="font-display text-center" style={{ fontSize: "clamp(36px, 4vw, 48px)", color: "var(--ink)" }}>
        Frequently asked questions
      </h2>

      <div className="max-w-[820px] mx-auto mt-16">
        {faqs.map(([q, a], i) => (
          <div key={i} className="faq-row border-b" style={{ borderColor: "#D4C9BE" }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full py-6 flex items-center justify-between text-left"
            >
              <span style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500 }}>{q}</span>
              <span
                className="transition-transform duration-300"
                style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", color: "var(--ink)" }}
              >
                ⌄
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-400"
              style={{ maxHeight: open === i ? 200 : 0 }}
            >
              <p className="pb-6 pr-12" style={{ fontSize: 15, color: "var(--muted-warm)", lineHeight: 1.7 }}>
                {a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GlobalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".cta-bg", {
        yPercent: -25, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".cta-word", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
      gsap.fromTo(".cta-btn", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, delay: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[100vh] overflow-hidden grid-overlay" style={{ background: "var(--ink)" }}>
      <div
        className="cta-bg absolute inset-0"
        style={{ backgroundImage: `url(${cta})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,20,16,0.4), rgba(28,20,16,0.75))" }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <h2 className="font-display" style={{ fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 1.0 }}>
          {["Your next", "corporate journey", "starts here"].map((line, i) => (
            <span key={i} className="block">
              {line.split(" ").map((w, j) => (
                <span key={j} className="cta-word inline-block mr-3">{w}</span>
              ))}
            </span>
          ))}
        </h2>
        <a href="#contact" className="cta-btn pill mt-12">Shall we begin?</a>
      </div>
    </section>
  );
}

export function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "var(--ink)" }}>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${footer})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(10,8,6,0.84)" }} />

      <div className="relative z-10 px-12 pt-24 pb-40 text-white max-w-[1400px] mx-auto">
        <div className="mb-16">
          <img
            src={ozonexLogo}
            alt="Ozonex"
            style={{
              height: 36,
              width: "auto",
              display: "block",
              mixBlendMode: "screen",
              filter: "brightness(10)",
              opacity: 0.85,
              background: "transparent",
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div>
            <div className="eyebrow text-white/55">Menu</div>
            <ul className="mt-5 space-y-3">
              {["Solutions", "Platform", "Enterprise", "Pricing", "Careers", "Contact"].map((x) => (
                <li key={x}><a href="#" className="text-white/85 hover:text-white" style={{ fontSize: 15 }}>{x}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/55">Cities</div>
            <ul className="mt-5 space-y-3">
              {[
                ["Chennai", "/corporate-travel-management-chennai"],
                ["Bangalore", "/corporate-travel-management-bangalore"],
                ["Delhi NCR", "/corporate-travel-management-delhi"],
              ].map(([label, href]) => (
                <li key={label}><a href={href} className="text-white/85 hover:text-white" style={{ fontSize: 15 }}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/55">Socials</div>
            <ul className="mt-5 space-y-3">
              {["LinkedIn", "Twitter / X"].map((x) => (
                <li key={x}><a href="#" className="text-white/85 hover:text-white" style={{ fontSize: 15 }}>{x}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/55">Location</div>
            <div className="mt-5 text-white" style={{ fontSize: 18, fontFamily: "var(--font-display)" }}>Dubai, UAE</div>
            <div className="mt-2 text-white/70" style={{ fontSize: 13 }}>{date}</div>
            <div className="text-white/70 tabular-nums" style={{ fontSize: 13 }}>{time}</div>
          </div>
          <div className="text-right md:text-left">
            <div className="eyebrow text-white/55">Accreditation</div>
            <div className="mt-5 text-white/85" style={{ fontSize: 13, lineHeight: 1.7 }}>
              IATA Agent #14-3 0987 6<br />DCAA Accredited
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/15 flex flex-wrap justify-between items-center gap-4 text-white/55" style={{ fontSize: 12 }}>
          <span>© Ozonex FZCO, a Sky Holdings company</span>
          <span>All Rights Reserved</span>
          <span className="space-x-4">
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </span>
        </div>
      </div>

      {/* Oversized brand wordmark */}
      <div
        className="absolute left-0 bottom-0 w-full text-center pointer-events-none overflow-hidden font-display"
        style={{
          fontSize: "clamp(120px, 18vw, 220px)",
          color: "#fff",
          opacity: 0.09,
          letterSpacing: "-0.02em",
          fontWeight: 300,
          lineHeight: 0.85,
          zIndex: 0,
        }}
      >
        OZONEX
      </div>
    </footer>
  );
}
