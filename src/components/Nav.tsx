import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Item = {
  label: string;
  href?: string;
  groups?: { title: string; links: string[] }[];
};

const items: Item[] = [
  {
    label: "Product",
    groups: [
      {
        title: "Platform",
        links: [
          "Travel Booking",
          "Approval Workflows",
          "Expense Tracking",
          "Policy Management",
          "Reporting & Analytics",
          "Multi-Level Access",
        ],
      },
    ],
  },
  {
    label: "Solutions",
    groups: [
      {
        title: "By Team",
        links: [
          "For Enterprises",
          "For SMBs",
          "For HR & Admin Teams",
          "For Finance Teams",
          "For IT & Ops Teams",
        ],
      },
    ],
  },
  {
    label: "MICE & Events",
    groups: [
      {
        title: "Programs",
        links: [
          "Corporate Events",
          "Conferences & Exhibitions",
          "Incentive Travel",
          "Group Travel Management",
        ],
      },
    ],
  },
  {
    label: "Global Presence",
    groups: [{ title: "Operations", links: ["India Operations", "UAE Operations"] }],
  },
  {
    label: "Travel Intelligence",
    groups: [
      { title: "Insights", links: ["Market Insights", "Business Optimization Reports"] },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  {
    label: "About",
    groups: [{ title: "Company", links: ["Our Story", "Leadership", "Careers"] }],
  },
  {
    label: "Resources",
    groups: [{ title: "Learn", links: ["Blog", "Case Studies", "Help Center"] }],
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    if (active !== null) {
      gsap.fromTo(
        panelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [active]);

  const current = active !== null ? items[active] : null;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled || active !== null ? "blur(12px)" : undefined,
        background:
          scrolled || active !== null ? "rgba(28,20,16,0.6)" : "transparent",
      }}
      onMouseLeave={() => setActive(null)}
    >
      <div className="h-[72px] px-8 flex items-center justify-between text-white">
        <nav className="flex items-center gap-7">
          {items.map((it, i) => (
            <button
              key={it.label}
              className="nav-link text-white/85 hover:text-white transition-colors"
              onMouseEnter={() => setActive(it.groups ? i : null)}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <a
          href="#"
          className="font-display text-white absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: 22, letterSpacing: "0.25em", fontWeight: 400 }}
          onMouseEnter={() => setActive(null)}
        >
          OZONEX
        </a>

        <a
          href="#contact"
          className="pill pill-sm"
          style={{ background: "transparent", borderColor: "rgba(255,255,255,0.6)" }}
          onMouseEnter={() => setActive(null)}
        >
          Contact / Book a Demo
        </a>
      </div>

      {current?.groups && (
        <div
          ref={panelRef}
          className="w-full"
          style={{
            background: "rgba(20,14,10,0.97)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="px-12 py-12 grid grid-cols-2 gap-12 max-w-6xl">
            {current.groups.map((g) => (
              <div key={g.title} className="border-l-2 pl-6" style={{ borderColor: "var(--gold)" }}>
                <div className="font-display text-white" style={{ fontSize: 22 }}>
                  {g.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/75 hover:text-white transition-colors"
                        style={{ fontSize: 13, fontFamily: "var(--font-sans)" }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
