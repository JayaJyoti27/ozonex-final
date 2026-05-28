import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    num: 94,
    suffix: "%",
    label: "Repeat bookings",
    desc: "Our growth is fueled by the loyalty of enterprises who return to us journey after journey.",
  },
  {
    num: 89,
    suffix: "%",
    label: "Net promoter score (NPS)",
    desc: "An industry-leading satisfaction rating that reflects our commitment to operational excellence.",
  },
  {
    num: 5,
    suffix: "",
    supersuffix: "Years",
    label: "Average platform experience",
    desc: "We don't deploy juniors. Your travel operations are handled by seasoned product and ops experts.",
  },
  {
    num: 25,
    suffix: "+",
    label: "Enterprise clients",
    desc: "A diverse, multinational portfolio capable of navigating global markets and complex travel policies.",
  },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        const el = ref.current!.querySelector(`#stat-num-${i}`);
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.num,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger instanceof Element && ref.current?.contains(t.vars.trigger))
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={ref} className="stats-section relative w-full overflow-hidden">
      {/* World map watermark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/images/world.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
          filter: "grayscale(1)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="stats-header">
          <h2 className="font-display stats-heading">
            3 World Wide
            <br />
            Locations
          </h2>
          <p className="stats-subtext">
            Strategic hubs across India, UAE and Kuwait — ensuring truly global coverage with
            seamless coordination and reliable support.
          </p>
        </div>

        {/* Location tags */}
        <div className="stats-tags">
          {["India", "UAE", "Kuwait"].map((loc) => (
            <span key={loc} className="stats-tag">
              {loc}
            </span>
          ))}
        </div>

        {/* Stat cards */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="font-display stat-num-wrap">
                <span id={`stat-num-${i}`}>0</span>
                <span className="stat-suffix">{s.suffix}</span>
                {s.supersuffix && <span className="stat-supersuffix">{s.supersuffix}</span>}
              </div>
              <div className="stat-label">{s.label}</div>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Base (desktop) ── */
        .stats-section {
          background: var(--cream);
          padding: 128px 48px;
        }

        .stats-header {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 32px;
          margin-bottom: 48px;
          align-items: end;
        }

        .stats-heading {
          font-size: clamp(40px, 7vw, 96px);
          line-height: 0.95;
          color: var(--ink);
        }

        .stats-subtext {
          color: var(--muted-warm);
          font-size: 16px;
          line-height: 1.7;
          max-width: 480px;
          align-self: flex-end;
          padding-bottom: 4px;
          font-family: Poppins, sans-serif;
        }

        .stats-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 64px;
        }

        .stats-tag {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2563EB;
          border: 1px solid rgba(37,99,235,0.3);
          border-radius: 50px;
          padding: 6px 20px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
          border-top: 1px solid rgba(28,20,16,0.12);
          padding-top: 64px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-num-wrap {
          display: flex;
          align-items: baseline;
          font-size: clamp(56px, 7vw, 112px);
          line-height: 1;
          color: var(--ink);
          gap: 2px;
          flex-wrap: nowrap;
        }

        .stat-suffix {
          font-size: 0.7em;
          line-height: 1;
        }

        .stat-supersuffix {
          margin-left: 8px;
          align-self: flex-end;
          margin-bottom: 8px;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted-warm);
          font-family: Poppins, sans-serif;
          white-space: nowrap;
        }

        .stat-label {
          margin-top: 16px;
          font-size: 15px;
          color: var(--ink);
          font-weight: 500;
          font-family: Poppins, sans-serif;
        }

        .stat-desc {
          margin-top: 10px;
          font-size: 13px;
          color: var(--muted-warm);
          line-height: 1.65;
          font-family: Poppins, sans-serif;
        }

        /* ── Tablet (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .stats-section { padding: 80px 32px; }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 32px;
          }
          .stats-header { gap: 24px; }
        }

        /* ── Mobile (≤ 768px) ── */
        @media (max-width: 768px) {
          .stats-section { padding: 64px 20px; }

          .stats-header {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 28px;
          }

          .stats-heading {
            font-size: clamp(36px, 9vw, 56px);
            line-height: 1.0;
          }

          .stats-subtext {
            font-size: 14px;
            max-width: 100%;
          }

          .stats-tags {
            gap: 8px;
            margin-bottom: 36px;
          }

          .stats-tag {
            font-size: 11px;
            padding: 5px 14px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 20px;
            padding-top: 40px;
          }

          /* Each stat: number left, label + desc stacked right */
          .stat-item {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
            column-gap: 14px;
            row-gap: 2px;
            align-items: start;
          }

          .stat-num-wrap {
            grid-column: 1;
            grid-row: 1 / 3;
            align-self: center;
            font-size: clamp(40px, 10vw, 64px);
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
          }

          /* Stack number, suffix, supersuffix vertically */
          .stat-num-wrap > span:first-child,
          .stat-suffix {
            line-height: 1;
          }

          .stat-supersuffix {
            margin-left: 0;
            margin-bottom: 0;
            margin-top: 2px;
            font-size: 10px;
          }

          .stat-label {
            grid-column: 2;
            grid-row: 1;
            margin-top: 0;
            font-size: 13px;
            align-self: flex-end;
          }

          .stat-desc {
            grid-column: 2;
            grid-row: 2;
            margin-top: 4px;
            font-size: 11px;
            line-height: 1.55;
          }
        }

        /* ── Extra small phones (≤ 420px) ── */
        @media (max-width: 420px) {
          .stats-section { padding: 48px 16px; }

          /* Single column — more room per stat */
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .stat-item {
            padding: 20px 0;
            border-bottom: 1px solid rgba(28,20,16,0.08);
            grid-template-columns: auto 1fr;
            column-gap: 16px;
          }

          .stat-item:last-child {
            border-bottom: none;
          }

          .stat-num-wrap {
            font-size: clamp(48px, 13vw, 68px);
            flex-direction: row;
            align-items: baseline;
            gap: 2px;
          }

          .stat-supersuffix {
            margin-left: 6px;
            margin-top: 0;
            align-self: flex-end;
          }

          .stat-label { font-size: 13px; }
          .stat-desc { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}
