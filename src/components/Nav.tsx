import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "@tanstack/react-router";
import ozonexlogo from "@/assets/finallogo.jpg";
import { User, Briefcase, ChevronDown } from "lucide-react";

const mainLinks = [
  { n: "01", label: "Product", href: "/product" },
  { n: "02", label: "Solutions", href: "/solutions" },
  { n: "03", label: "MICE & Events", href: "/mice-events" },
  { n: "04", label: "Pricing", href: "/pricing" },
  { n: "05", label: "Blogs", href: "/blogs" },
  { n: "06", label: "About", href: "/about" },
];

// Sub-links shown in the "Product" dropdown
const productLinks = [
  { label: "Ozonex B2B", href: "/b2b" },
  { label: "Ozonex B2E", href: "/b2e" },
  { label: "Ozonex CBT", href: "/cbt" },
];

const loginOptions = [
  {
    label: "Agent",
    href: "https://portal.ozonextravel.com/agent",
    icon: User,
  },
  {
    label: "Corporate",
    href: "https://portal.ozonextravel.com/corporate",
    icon: Briefcase,
  },
];

const registerLink = {
  label: "Register",
  href: "/register",
  icon: Briefcase,
  bg: "#1B1F4B",
};

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
  const [loginOpen, setLoginOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false); // desktop dropdown
  const [productExpanded, setProductExpanded] = useState(false); // mobile accordion

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const loginMenuRef = useRef<HTMLDivElement>(null);
  const productMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!loginOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [loginOpen]);

  useEffect(() => {
    if (!productOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productOpen]);

  const navigate = (href: string) => {
    setOpen(false);
    setLoginOpen(false);
    setProductOpen(false);
    setProductExpanded(false);
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
          background: "#F7F1E8",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,.08)" : "1px solid rgba(0,0,0,.04)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            margin: 0,
            padding: isMobile ? "10px 10px" : "16px 16px",
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
            <img src={ozonexlogo} alt="Ozonex" style={{ height: isMobile ? 25 : 40 }} />
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
              {mainLinks.map((item) => {
                if (item.label === "Product") {
                  return (
                    <div
                      key={item.href}
                      ref={productMenuRef}
                      style={{ position: "relative" }}
                      onMouseEnter={() => setProductOpen(true)}
                      onMouseLeave={() => setProductOpen(false)}
                    >
                      <button
                        onClick={() => setProductOpen((v) => !v)}
                        aria-haspopup="true"
                        aria-expanded={productOpen}
                        style={{
                          background: "transparent",
                          border: 0,
                          cursor: "pointer",
                          color: "black",
                          fontSize: 12,
                          fontWeight: 500,
                          textTransform: "uppercase",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          size={12}
                          strokeWidth={2}
                          style={{
                            transition: "transform 0.15s ease",
                            transform: productOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </button>

                      {productOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(100% + 14px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#fff",
                            borderRadius: 14,
                            border: "1px solid rgba(0,0,0,.08)",
                            boxShadow: "0 18px 40px -18px rgba(0,0,0,.35)",
                            overflow: "hidden",
                            minWidth: 180,
                          }}
                        >
                          {productLinks.map((p) => (
                            <button
                              key={p.href}
                              onClick={() => navigate(p.href)}
                              style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                padding: "12px 16px",
                                fontSize: 13,
                                fontWeight: 500,
                                color: "#1B1F4B",
                                background: "transparent",
                                border: 0,
                                textAlign: "left",
                                cursor: "pointer",
                                textTransform: "none",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "rgba(27,31,75,.06)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "transparent")
                              }
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    style={{
                      background: "transparent",
                      border: 0,
                      cursor: "pointer",
                      color: "black",
                      fontSize: 12,
                      fontWeight: 500,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Login dropdown trigger — now filled to match Register */}
                <div ref={loginMenuRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setLoginOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={loginOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#1B1F4B",
                      color: "#fff",
                      border: 0,
                      borderRadius: 999,
                      padding: "10px 18px",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "filter 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                  >
                    Login
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      style={{
                        transition: "transform 0.15s ease",
                        transform: loginOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {loginOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        background: "#fff",
                        borderRadius: 14,
                        border: "1px solid rgba(0,0,0,.08)",
                        boxShadow: "0 18px 40px -18px rgba(0,0,0,.35)",
                        overflow: "hidden",
                        minWidth: 170,
                      }}
                    >
                      {loginOptions.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setLoginOpen(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "11px 14px",
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#1B1F4B",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "rgba(27,31,75,.06)")
                            }
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <Icon size={15} strokeWidth={2} />
                            {item.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Standalone Register button */}
                <a
                  href={registerLink.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: registerLink.bg,
                    color: "#fff",
                    border: 0,
                    borderRadius: 999,
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    transition: "filter 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                >
                  <registerLink.icon size={16} strokeWidth={2} />
                  {registerLink.label}
                </a>
              </div>
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
          overflowY: "auto",
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
          {mainLinks.map((item) => {
            if (item.label === "Product") {
              return (
                <div key={item.href}>
                  <button
                    onClick={() => setProductExpanded((v) => !v)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: 0,
                      color: "#fff",
                      fontSize: 24,
                      textAlign: "left",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(255,255,255,.08)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      style={{
                        transition: "transform 0.2s ease",
                        transform: productExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {productExpanded && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: "8px 0 8px 16px",
                      }}
                    >
                      {productLinks.map((p) => (
                        <button
                          key={p.href}
                          onClick={() => navigate(p.href)}
                          style={{
                            background: "transparent",
                            border: 0,
                            color: "rgba(255,255,255,.75)",
                            fontSize: 16,
                            textAlign: "left",
                            padding: "10px 0",
                            cursor: "pointer",
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
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
            );
          })}

          <p
            style={{
              marginTop: 20,
              color: "rgba(255,255,255,.4)",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Login
          </p>
          {/* Agent/Corporate now filled navy to match Register, not just bordered */}
          <div style={{ display: "flex", gap: 12 }}>
            {loginOptions.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    flex: 1,
                    background: "#1B1F4B",
                    color: "#fff",
                    border: 0,
                    borderRadius: 999,
                    padding: "10px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                  {item.label}
                </a>
              );
            })}
          </div>

          <a
            href={registerLink.href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 4,
              background: registerLink.bg,
              color: "#fff",
              border: 0,
              borderRadius: 999,
              padding: "12px 14px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <registerLink.icon size={17} strokeWidth={2} />
            {registerLink.label}
          </a>
        </div>
      </div>
    </>
  );
}
