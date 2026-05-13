import { useEffect, useRef } from "react";
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

export function HorizontalScroll() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
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

      // panel reveal
      gsap.utils.toArray<HTMLElement>(".hp-panel").forEach((p) => {
        gsap.fromTo(
          p.querySelector(".hp-title"),
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 70%" },
          }
        );
        gsap.fromTo(
          p.querySelectorAll(".hp-item"),
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 60%" },
          }
        );
        gsap.fromTo(
          p.querySelector(".hp-img"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 70%" },
          }
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative w-full h-screen overflow-hidden" style={{ background: "var(--cream)" }}>
      <div ref={track} className="flex h-full" style={{ width: `${panels.length * 100}vw` }}>
        {panels.map((p) => (
          <div key={p.n} className="hp-panel relative w-screen h-screen flex items-center px-20" style={{ background: "var(--cream)" }}>
            <div
              className="absolute font-display select-none pointer-events-none"
              style={{ fontSize: 200, top: 40, left: 40, color: "var(--ink)", opacity: 0.07, lineHeight: 1 }}
            >
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
                <img src={p.img} alt={p.title} className="hp-img" width={400} height={480} loading="lazy" style={{ width: 400, height: 480, objectFit: "cover", borderRadius: 4 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal yellow scroll line */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: 2, background: "rgba(28,20,16,0.08)" }} />
      <div ref={line} className="absolute bottom-0 left-0" style={{ height: 2, width: 0, background: "var(--yellow-line)" }} />
    </section>
  );
}
