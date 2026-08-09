import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "@tanstack/react-router";
import ozonexlogo from "@/assets/fix.png";
const mainLinks = [
  { n: "01", label: "Home", href: "/" },
  { n: "02", label: "Product", href: "/product" },
  { n: "03", label: "Solutions", href: "/solutions" },
  { n: "04", label: "MICE & Events", href: "/mice-events" },
  { n: "05", label: "Pricing", href: "/pricing" },
  { n: "06", label: "Blogs", href: "/blogs" },
  { n: "07", label: "About", href: "/about" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {open ? (
        <>
          <line
            x1="4"
            y1="4"
            x2="16"
            y2="16"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="4"
            x2="4"
            y2="16"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <line
            x1="3"
            y1="5"
            x2="17"
            y2="5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="10"
            x2="17"
            y2="10"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="15"
            x2="17"
            y2="15"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function Nav() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "all" });
      if (linksRef.current) {
        gsap.fromTo(
          Array.from(linksRef.current.children),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
        );
      }
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, pointerEvents: "none" });
    }
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    router.navigate({ to: href });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          background: scrolled ? "rgba(14,12,10,.92)" : "black",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            margin: 0,
            padding: isMobile ? "16px 16px" : "24px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            style={{ background: "none", border: 0, cursor: "pointer" }}
          >
            <img src={ozonexlogo} alt="Ozonex" style={{ height: isMobile ? 30 : 45 }} />
          </button>

          {/* Desktop nav links — hidden on mobile */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              {mainLinks.map((item) => (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  style={{
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                    color: "rgba(255,255,255,.75)",
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <button
                onClick={() => navigate("/pricing#enquire")}
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  border: 0,
                  borderRadius: 999,
                  padding: "12px 20px",
                  fontSize: 14,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Talk to Our Team
              </button>
            )}

            {isMobile && (
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: open ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 999,
                  cursor: "pointer",
                  backdropFilter: "blur(12px)",
                }}
              >
                <HamburgerIcon open={open} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(14,12,10,.98)",
          zIndex: 45,
          opacity: 0,
          pointerEvents: "none",
          padding: "90px 24px 40px",
        }}
      >
        <div
          ref={linksRef}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 420,
            margin: "0 auto",
            gap: 12,
          }}
        >
          {mainLinks.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              style={{
                background: "transparent",
                border: 0,
                color: "#fff",
                fontSize: 24,
                textAlign: "left",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,.08)",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => navigate("/pricing#enquire")}
            style={{
              marginTop: 20,
              width: "fit-content",
              padding: "14px 22px",
              background: "#2563EB",
              color: "#fff",
              border: 0,
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            Talk to Our Team
          </button>
        </div>
      </div>
    </>
  );
}
