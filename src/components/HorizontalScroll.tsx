import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import booking from "@/assets/panel-booking.jpg";
import approval from "@/assets/panel-approval.jpg";
import expense from "@/assets/panel-expense.jpg";
import policy from "@/assets/panel-policy.jpg";
import analytics from "@/assets/panel-analytics.jpg";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    n: "01", title: "Corporate Booking", img: booking,
    items: [
      ["Self-serve flights & hotels", "Employees book within seconds inside enforced corporate policy."],
      ["Negotiated fares", "Surface your contracted rates and preferred suppliers automatically."],
      ["Multi-traveler itineraries", "Coordinate group business travel with one shared workspace."],
      ["24/7 concierge", "Human support layered on top of self-serve booking."],
    ],
  },
  {
    n: "02", title: "Approval Workflows", img: approval,
    items: [
      ["Multi-level chains", "Configure managers, finance, and HR sign-off per cost center."],
      ["Conditional logic", "Auto-route approvals based on amount, destination, or traveler."],
      ["One-tap mobile", "Approve from anywhere with full trip context."],
      ["Audit trail", "Every decision timestamped and exportable for compliance."],
    ],
  },
  {
    n: "03", title: "Expense Tracking", img: expense,
    items: [
      ["Real-time visibility", "Live dashboard of in-trip and post-trip spend."],
      ["Auto reconciliation", "Match bookings to invoices and corporate cards in one click."],
      ["Receipt capture", "OCR-powered uploads from any device."],
      ["Policy violations", "Flagged the moment they happen, not at month-end."],
    ],
  },
  {
    n: "04", title: "Policy Management", img: policy,
    items: [
      ["Granular rule engine", "Set caps by city, role, season, or fare class."],
      ["Soft & hard limits", "Allow exceptions with documented justification."],
      ["Pre-trip enforcement", "Out-of-policy bookings blocked or escalated."],
      ["Continuous tuning", "Update policies once — they apply everywhere."],
    ],
  },
  {
    n: "05", title: "Analytics & Reporting", img: analytics,
    items: [
      ["Spend by entity", "Slice spend across departments, projects, and geographies."],
      ["Savings reports", "Track negotiated vs. published fare delta in real time."],
      ["Custom dashboards", "Build views for finance, HR, and leadership."],
      ["API & exports", "Pipe data into your ERP, BI, or accounting stack."],
    ],
  },
];

/* ─── DESKTOP ─── */
function DesktopHorizontalScroll() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;

    ctxRef.current = gsap.context(() => {
      const total = track.current!.scrollWidth - window.innerWidth;

      const tween = gsap.to(track.current, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (line.current) line.current.style.width = self.progress * 100 + "%";
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".hp-panel").forEach((p) => {
        const titleEl = p.querySelector(".hp-title");
        const itemEls = p.querySelectorAll(".hp-item");
        const imgEl = p.querySelector(".hp-img");

        if (titleEl) {
          gsap.fromTo(titleEl, { x: 60, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 70%" },
          });
        }
        if (itemEls.length) {
          gsap.fromTo(itemEls, { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 60%" },
          });
        }
        if (imgEl) {
          gsap.fromTo(imgEl, { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 70%" },
          });
        }
      });
    }, wrap);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={wrap} className="relative w-full h-screen overflow-hidden" style={{ background: "var(--cream)" }}>
      <div ref={track} className="flex h-full" style={{ width: `${panels.length * 100}vw` }}>
        {panels.map((p) => (
          <div key={p.n} className="hp-panel relative w-screen h-screen flex items-center px-20" style={{ background: "var(--cream)" }}>
            <div className="absolute font-display select-none pointer-events-none" style={{ fontSize: 200, top: 40, left: 40, color: "var(--ink)", opacity: 0.07, lineHeight: 1 }}>
              {p.n}
            </div>
            <div className="grid grid-cols-12 gap-12 w-full max-w-[1400px] mx-auto">
              <div className="col-span-7">
                <h3 className="hp-title font-display" style={{ fontSize: "clamp(40px, 5vw, 64px)", color: "var(--ink)", lineHeight: 1 }}>
                  {p.title}
                </h3>
                <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-12">
                  {p.items.map(([label, desc]) => (
                    <div key={label} className="hp-item">
                      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{label}</div>
                      <p className="mt-2" style={{ fontSize: 14, color: "var(--muted-warm)", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-5 flex items-center justify-end">
                <img src={p.img} alt={p.title} className="hp-img" loading="lazy" style={{ width: 400, height: 480, objectFit: "cover", borderRadius: 4 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full" style={{ height: 2, background: "rgba(28,20,16,0.08)" }} />
      <div ref={line} className="absolute bottom-0 left-0" style={{ height: 2, width: 0, background: "var(--yellow-line)" }} />
    </section>
  );
}

/* ─── MOBILE ─── */
function MobileFeatureStack() {
  const [active, setActive] = useState(0);

  return (
    <section className="mobile-stack-section">
      <div className="mobile-stack-header">
        <div className="mobile-stack-eyebrow">Platform Features</div>
        <h2 className="font-display mobile-stack-heading">
          Everything in<br />one platform.
        </h2>
      </div>

      <div className="mobile-stack-tabs">
        {panels.map((p, i) => (
          <button
            key={p.n}
            onClick={() => setActive(i)}
            className={`mobile-stack-tab ${active === i ? "active" : ""}`}
          >
            <span className="mobile-tab-num">{p.n}</span>
            <span className="mobile-tab-label">{p.title}</span>
          </button>
        ))}
      </div>

      <div className="mobile-stack-panel">
        <img src={panels[active].img} alt={panels[active].title} className="mobile-stack-img" loading="lazy" />
        <div className="mobile-stack-content">
          <h3 className="font-display mobile-stack-title">{panels[active].title}</h3>
          <div className="mobile-stack-items">
            {panels[active].items.map(([label, desc]) => (
              <div key={label} className="mobile-stack-item">
                <div className="mobile-item-label">{label}</div>
                <p className="mobile-item-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mobile-stack-section { background: var(--cream); padding: 64px 0 0; }
        .mobile-stack-header { padding: 0 20px 32px; }
        .mobile-stack-eyebrow { font-family: Poppins, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #2563EB; font-weight: 500; margin-bottom: 12px; }
        .mobile-stack-heading { font-size: clamp(32px, 8vw, 48px); color: var(--ink); font-weight: 300; line-height: 1.0; }
        .mobile-stack-tabs { display: flex; overflow-x: auto; gap: 0; border-top: 1px solid rgba(37,99,235,0.15); border-bottom: 1px solid rgba(37,99,235,0.15); -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .mobile-stack-tabs::-webkit-scrollbar { display: none; }
        .mobile-stack-tab { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 20px; border: none; background: transparent; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
        .mobile-stack-tab.active { border-bottom-color: #2563EB; background: rgba(37,99,235,0.05); }
        .mobile-tab-num { font-family: Poppins, sans-serif; font-size: 9px; color: rgba(28,20,16,0.4); letter-spacing: 0.1em; }
        .mobile-tab-label { font-family: Poppins, sans-serif; font-size: 11px; font-weight: 500; color: var(--ink); white-space: nowrap; }
        .mobile-stack-tab.active .mobile-tab-label { color: #2563EB; }
        .mobile-stack-tab.active .mobile-tab-num { color: #2563EB; }
        .mobile-stack-panel { padding: 0; }
        .mobile-stack-img { width: 100%; height: 220px; object-fit: cover; display: block; }
        .mobile-stack-content { padding: 28px 20px 48px; }
        .mobile-stack-title { font-size: clamp(28px, 7vw, 40px); color: var(--ink); font-weight: 300; line-height: 1.05; margin-bottom: 24px; }
        .mobile-stack-items { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .mobile-stack-item { border-top: 1px solid rgba(37,99,235,0.2); padding-top: 14px; }
        .mobile-item-label { font-family: Poppins, sans-serif; font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.3; }
        .mobile-item-desc { font-family: Poppins, sans-serif; font-size: 12px; color: var(--muted-warm); line-height: 1.6; margin-top: 6px; }
        @media (max-width: 380px) {
          .mobile-stack-items { grid-template-columns: 1fr; }
          .mobile-stack-img { height: 180px; }
          .mobile-stack-tab { padding: 12px 14px; }
          .mobile-tab-label { font-size: 10px; }
        }
      `}</style>
    </section>
  );
}

/* ─── EXPORT ─── */
export function HorizontalScroll() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileFeatureStack /> : <DesktopHorizontalScroll />;
}
