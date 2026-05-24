import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "@tanstack/react-router";
import ozonexLogo from "@/assets/ozonex-logo.png";

const mainLinks = [
  { n: "01", label: "Home", href: "/" },
  { n: "02", label: "Product", href: "/product" },
  { n: "03", label: "Solutions", href: "/solutions" },
  { n: "04", label: "MICE & Events", href: "/mice-events" },
  { n: "05", label: "About", href: "/about" },
  { n: "06", label: "Privacy Policy", href: "/privacy" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "all", duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        linksRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    router.navigate({ to: href });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all"
        style={{
          padding: scrolled ? "16px 40px" : "28px 40px",
          background: scrolled ? "rgba(28,20,16,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={ozonexLogo} alt="Ozonex" style={{ height: 32, width: "auto" }} />
        </a>

        <div className="hidden lg:flex items-center" style={{ gap: 36 }}>
          {mainLinks.slice(0, 4).map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center" style={{ gap: 16 }}>
          <a
            href="/about"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 400,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          >
            About
          </a>
          <a
            href="/pricing"
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "10px 28px",
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#3B82F6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
          >
            Talk to Our Team
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center"
          style={{ gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: 24, height: 1.5, background: "#fff", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 1.5, background: "#fff", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 1.5, background: "#fff", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          background: "#1C1410",
          opacity: 0,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 40px",
        }}
      >
        <div ref={linksRef} className="flex flex-col" style={{ gap: 8 }}>
          {mainLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => navigate(l.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "baseline",
                gap: 20,
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textAlign: "left",
              }}
            >
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{l.n}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: "#fff", fontWeight: 300 }}>{l.label}</span>
            </button>
          ))}
          <a
            href="/pricing"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-block",
              marginTop: 32,
              background: "#2563EB",
              color: "#fff",
              borderRadius: 50,
              padding: "14px 40px",
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              alignSelf: "flex-start",
            }}
          >
            Talk to Our Team
          </a>
        </div>
      </div>
    </>
  );
}
