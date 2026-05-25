import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 94, suffix: "%", label: "Repeat bookings", desc: "Our growth is fueled by the loyalty of enterprises who return to us journey after journey." },
  { num: 89, suffix: "%", label: "Net promoter score (NPS)", desc: "An industry-leading satisfaction rating that reflects our commitment to operational excellence." },
  { num: 5, suffix: "", supersuffix: "Years", label: "Average platform experience", desc: "We don't deploy juniors. Your travel operations are handled by seasoned product and ops experts." },
  { num: 25, suffix: "+", label: "Enterprise clients", desc: "A diverse, multinational portfolio capable of navigating global markets and complex travel policies." },
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
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
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
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "url(/images/world.svg)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.06,
        filter: "grayscale(1)",
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="stats-header">
          <h2 className="font-display stats-heading">
            4 Worldwide<br />Locations
          </h2>
          <p className="stats-subtext">
            Strategic hubs across India, UAE and Kuwait — ensuring truly global coverage with seamless
            coordination and reliable support.
          </p>
        </div>

        <div className="stats-tags">
          {["India", "UAE", "Kuwait"].map((loc) => (
            <span key={loc} className="stats-tag">{loc}</span>
          ))}
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="font-display stat-num-wrap">
                <span id={`stat-num-${i}`}>0</span>
                <span>{s.suffix}</span>
                {s.supersuffix && (
                  <span className="stat-supersuffix">{s.supersuffix}</span>
                )}
              </div>
              <div className="stat-label">{s.label}</div>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-section { background: var(--cream); padding: 128px 48px; }
        .stats-header { display: grid; grid-template-columns: 7fr 5fr; gap: 32px; margin-bottom: 48px; align-items: end; }
        .stats-heading { font-size: clamp(48px, 7vw, 96px); line-height: 0.95; color: var(--ink); }
        .stats-subtext { color: var(--muted-warm); font-size: 16px; line-height: 1.7; max-width: 480px; align-self: flex-end; padding-bottom: 4px; }
        .stats-tags { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 64px; }
        .stats-tag { font-family: Poppins, sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; border: 1px solid rgba(37,99,235,0.3); border-radius: 50px; padding: 6px 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px; border-top: 1px solid rgba(28,20,16,0.12); padding-top: 64px; }
        .stat-num-wrap { display: flex; align-items: baseline; font-size: clamp(64px, 9vw, 128px); line-height: 1; color: var(--ink); gap: 2px; }
        .stat-supersuffix { margin-left: 10px; align-self: flex-end; margin-bottom: 10px; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted-warm); font-family: Poppins, sans-serif; }
        .stat-label { margin-top: 16px; font-size: 15px; color: var(--ink); font-weight: 500; font-family: Poppins, sans-serif; }
        .stat-desc { margin-top: 10px; font-size: 13px; color: var(--muted-warm); line-height: 1.65; font-family: Poppins, sans-serif; }
        @media (max-width: 1024px) {
          .stats-section { padding: 80px 32px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
          .stats-header { gap: 24px; }
        }
        @media (max-width: 768px) {
          .stats-section { padding: 64px 20px; }
          .stats-header { grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
          .stats-heading { font-size: clamp(36px, 9vw, 56px); line-height: 1.0; }
          .stats-subtext { font-size: 14px; max-width: 100%; }
          .stats-tags { gap: 8px; margin-bottom: 40px; }
          .stats-tag { font-size: 11px; padding: 5px 16px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 32px 24px; padding-top: 40px; }
          .stat-num-wrap { font-size: clamp(48px, 12vw, 80px); }
          .stat-supersuffix { font-size: 11px; margin-left: 6px; margin-bottom: 6px; }
          .stat-label { font-size: 13px; margin-top: 10px; }
          .stat-desc { font-size: 12px; }
        }
        @media (max-width: 480px) {
          .stats-section { padding: 48px 16px; }
          .stats-grid { grid-template-columns: 1fr; gap: 28px; }
          .stat-num-wrap { font-size: clamp(56px, 14vw, 80px); }
          .stat-item { display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto; gap: 0 16px; padding-bottom: 24px; border-bottom: 1px solid rgba(28,20,16,0.08); }
          .stat-num-wrap { grid-row: 1 / 3; align-self: center; font-size: clamp(48px, 13vw, 64px); }
          .stat-label { margin-top: 0; align-self: flex-end; }
          .stat-desc { margin-top: 4px; grid-column: 2; }
        }
      `}</style>
    </section>
  );
}
