import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "@tanstack/react-router";
import ozonexLogo from "@/assets/ozonex-logo.png";

const mainLinks = [
  { n: "01", label: "Home", href: "/" },
  { n: "02", label: "Product", href: "/product" },
  { n: "03", label: "Solutions", href: "/solutions" },
  { n: "04", label: "MICE & Events", href: "/mice-events" },
  { n: "05", label: "Pricing", href: "/pricing" },
  { n: "06", label: "About", href: "/about" },
];

const quickLinks = [
  { label: "Travel Booking", href: "/product#booking" },
  { label: "Approval Workflows", href: "/product#approvals" },
  { label: "Expense Tracking", href: "/product#expenses" },
  { label: "For Enterprises", href: "/solutions#enterprises" },
  { label: "For HR & Finance", href: "/solutions#hr-teams" },
  { label: "Corporate Events", href: "/mice-events#corporate-events" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      }
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll<HTMLElement>("[data-nav-item]");
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.15, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // animate out
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll<HTMLElement>("[data-nav-item]");
      gsap.to(items, { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, delay: 0.2, ease: "power2.out" });
    }
    setTimeout(() => {
      setOpen(false);
      const [path, hash] = href.split("#");
      if (hash) {
        window.location.href = href;
      } else {
        router.navigate({ to: path });
      }
    }, 300);
  };

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 transition-all"
        style={{
          height: 72,
          zIndex: 9999,
          background: scrolled || open ? "rgba(20,13,8,0.90)" : "transparent",
          backdropFilter: scrolled || open ? "blur(16px)" : undefined,
          borderBottom: scrolled || open ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div className="relative h-full flex items-center justify-between" style={{ padding: "0 48px" }}>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); router.navigate({ to: "/" }); window.location.href = "/contact"; }}
            className="inline-flex items-center transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.45)",
              background: "transparent",
              color: "white",
              borderRadius: 50,
              padding: "8px 22px",
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Book a Demo
          </a>

          <a
            href="/"
            onClick={(e) => { e.preventDefault(); setOpen(false); router.navigate({ to: "/" }); }}
            className="absolute"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              pointerEvents: "auto",
              background: "transparent",
              boxShadow: "none",
              lineHeight: 0,
            }}
            aria-label="Ozonex home"
          >
            <img
              src={ozonexLogo}
              alt="Ozonex"
              style={{
                height: 28,
                width: "auto",
                display: "block",
                mixBlendMode: "screen",
                filter: "brightness(10)",
                background: "transparent",
              }}
            />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center"
            style={{
              gap: 10,
              background: "transparent",
              border: "none",
              boxShadow: "none",
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              cursor: "pointer",
            }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span
              style={{
                position: "relative",
                width: 22,
                height: 17,
                display: "inline-block",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 22,
                    height: 1,
                    background: "white",
                    top: open ? 8 : i * 6,
                    transform: open
                      ? i === 0
                        ? "rotate(45deg)"
                        : i === 2
                        ? "rotate(-45deg)"
                        : "rotate(0)"
                      : "rotate(0)",
                    opacity: open && i === 1 ? 0 : 1,
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9998,
            background: "rgba(16,10,6,0.98)",
            backdropFilter: "blur(24px)",
            overflowY: "auto",
          }}
        >
          <div ref={itemsRef} className="nav-overlay-grid">
            {/* LEFT */}
            <div className="nav-overlay-left">
              {mainLinks.map((l) => (
                <a
                  key={l.n}
                  data-nav-item
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className="nav-row"
                >
                  <span className="nav-row-left">
                    <span className="nav-num">{l.n}</span>
                    <span className="nav-text">{l.label}</span>
                  </span>
                  <span className="nav-arrow">→</span>
                </a>
              ))}
            </div>

            {/* RIGHT */}
            <div className="nav-overlay-right">
              <div data-nav-item className="nav-section">
                <div className="nav-section-label">Quick Links</div>
                <ul className="nav-quick-links">
                  {quickLinks.map((q) => (
                    <li key={q.label}>
                      <a href={q.href} onClick={(e) => handleNav(e, q.href)}>
                        {q.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="nav-divider" />

              <div data-nav-item className="nav-section">
                <div className="nav-section-label">Get Started</div>
                <ul className="nav-cta-links">
                  <li>
                    <a href="/contact" onClick={(e) => handleNav(e, "/contact")}>
                      Book a Demo <span>→</span>
                    </a>
                  </li>
                  <li>
                    <a href="/contact" onClick={(e) => handleNav(e, "/contact")}>
                      Talk to Sales <span>→</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="nav-divider" />

              <div data-nav-item className="nav-meta">
                <div className="nav-loc">Dubai, UAE</div>
                <div className="nav-date">{dateStr}</div>
                <div className="nav-time">{timeStr}</div>
              </div>
            </div>
          </div>

          <div className="nav-overlay-footer">
            <div>© 2026 Ozonex FZCO</div>
            <div className="nav-footer-links">
              <a href="/privacy" onClick={(e) => handleNav(e, "/privacy")}>
                Privacy Policy
              </a>
              <a href="/terms" onClick={(e) => handleNav(e, "/terms")}>
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
