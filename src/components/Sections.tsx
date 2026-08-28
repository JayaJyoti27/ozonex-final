import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import enterprises from "@/assets/who-enterprises.jpg";
import hr from "@/assets/who-hr.jpg";
import exec from "@/assets/who-exec.jpg";
import cta from "@/assets/cta-skyline.jpg";
import { CONTACT } from "@/config/contact";
import demoVideo from "@/assets/ozonex-demo.mp4";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   WHO SECTION
========================= */

export function WhoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const cards = [
    {
      img: enterprises,
      label: "Enterprises & MNCs",
      desc: "Multi-entity policy, consolidated reporting, ERP integration.",
    },
    {
      img: hr,
      label: "HR & Finance Teams",
      desc: "Duty of care, approval automation, GL-ready expense data.",
    },
    {
      img: exec,
      label: "SMBs & Startups",
      desc: "Enterprise-grade travel control without enterprise pricing.",
    },
  ];

  // WhoSection useEffect
  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx: gsap.Context;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const init = () => {
      ctx?.kill(false);

      const mobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".who-card",
          { y: mobile ? 20 : 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: mobile ? 0.6 : 0.9,
            stagger: mobile ? 0.08 : 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      }, sectionRef);
    };

    init();

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      ctx?.kill(false);
    };
  }, []);
  return (
    <section ref={sectionRef} className="who-section">
      <div className="who-container">
        <div className="who-eyebrow">Who Ozonex is Built For</div>

        <h2 className="who-heading font-display">
          BUILT FOR EVERY
          <br />
          TEAM THAT TRAVELS.
        </h2>

        <div className="who-grid">
          {cards.map((c) => (
            <div key={c.label} className="who-card relative overflow-hidden group">
              <img src={c.img} alt={c.label} loading="lazy" className="who-image" />

              <div className="who-overlay" />

              <div className="who-content">
                <div className="who-card-label">{c.label}</div>

                <p className="who-card-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="who-cta-row">
          <a href="/solutions" className="who-cta-link">
            Explore all solutions →
          </a>
        </div>
      </div>

      <style>{`
        .who-section {
          background: #F5F0EA;
          padding: 140px 80px;
        }

        .who-container {
          max-width: 1320px;
          margin: 0 auto;
        }

        .who-eyebrow {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2563EB;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .who-heading {
          font-size: clamp(38px, 6vw, 68px);
          color: #1C1410;
          font-weight: 300;
          line-height: 0.95;
          max-width: 900px;
        }

        .who-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 72px;
        }

        .who-card {
          aspect-ratio: 3 / 4;
          min-height: 520px;
          background: #ddd;
        }

        .who-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .group:hover .who-image {
          transform: scale(1.05);
        }

        .who-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(28,20,16,0.92) 0%,
            rgba(28,20,16,0.28) 58%,
            transparent 100%
          );
        }

        .who-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 32px;
        }

        .who-card-label {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
          margin-bottom: 10px;
        }

        .who-card-desc {
          font-family: Poppins, sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.84);
          line-height: 1.7;
        }

        .who-cta-row {
          margin-top: 52px;
          text-align: center;
        }

        .who-cta-link {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: #2563EB;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
        }

        /* =========================
           LAPTOP
        ========================= */

        @media (max-width: 1200px) {
          .who-section {
            padding: 110px 40px;
          }

          .who-grid {
            gap: 18px;
          }

          .who-card {
            min-height: 460px;
          }
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 992px) {
          .who-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .who-card {
            min-height: 420px;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {
          .who-section {
            padding: 72px 20px;
          }

          .who-heading {
            line-height: 1;
          }

          .who-grid {
            grid-template-columns: 1fr;
            margin-top: 40px;
            gap: 18px;
          }

          .who-card {
            min-height: 420px;
          }

          .who-content {
            padding: 24px 20px;
          }

          .who-card-desc {
            font-size: 13px;
          }

          .who-cta-row {
            margin-top: 36px;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {
          .who-section {
            padding: 56px 16px;
          }

          .who-heading {
            font-size: clamp(30px, 10vw, 42px);
          }

          .who-card {
            min-height: 360px;
          }

          .who-content {
            padding: 20px 16px;
          }

          .who-card-label {
            font-size: 10px;
          }

          .who-card-desc {
            font-size: 12px;
            line-height: 1.6;
          }

          .who-cta-link {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   GLOBAL CTA
========================= */

export function GlobalCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let ctx: gsap.Context;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const init = () => {
      ctx?.kill(false);

      const mobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        if (!mobile) {
          gsap.to(".gcta-bg", {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        gsap.fromTo(
          ".gcta-word",
          { y: mobile ? 20 : 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: mobile ? 0.6 : 1,
            stagger: mobile ? 0.04 : 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 92%",
            },
          },
        );

        gsap.fromTo(
          ".gcta-sub",
          { y: mobile ? 10 : 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: mobile ? 0.2 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 92%",
            },
          },
        );
      }, ref);
    };

    init();

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      ctx?.kill(false);
    };
  }, []);

  return (
    <section ref={ref} className="gcta-section relative overflow-hidden grid-overlay">
      <div
        className="gcta-bg absolute inset-0"
        style={{
          backgroundImage: `url(${cta})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      <div className="gcta-dark-overlay" />

      <div className="gcta-inner relative z-10">
        <h2 className="gcta-heading font-display text-white">
          {[
            ["SEE", "OZONEX"],
            ["IN", "ACTION."],
          ].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="gcta-word inline-block">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="gcta-sub gcta-body">
          Tell us your team size and travel challenges. We’ll show you exactly how Ozonex fits your
          workflow.
        </p>

        <a href="/pricing#enquire" className="gcta-sub gcta-btn">
          Book a Free Demo
        </a>
      </div>

      <style>{`
        .gcta-section {
          background: #1C1410;
          min-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px;
        }

        .gcta-dark-overlay {
          position: absolute;
          inset: 0;
          background: rgba(28,20,16,0.74);
        }

        .gcta-inner {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
        }

        .gcta-heading {
          font-size: clamp(52px, 9vw, 96px);
          line-height: 0.9;
          font-weight: 300;
        }

        .gcta-word {
          margin-right: 18px;
        }

        .gcta-body {
          font-family: Poppins, sans-serif;
          font-size: clamp(14px, 2vw, 18px);
          color: rgba(255,255,255,0.72);
          max-width: 620px;
          line-height: 1.8;
          margin: 32px auto 0;
        }

        .gcta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
          background: #2563EB;
          color: white;
          border-radius: 999px;
          padding: 16px 44px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          transition: background 0.2s ease;
        }

        .gcta-btn:hover {
          background: #3B82F6;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1024px) {
          .gcta-section {
            min-height: 70vh;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {
          .gcta-section {
            padding: 80px 20px;
            min-height: auto;
          }

          .gcta-heading {
            line-height: 0.96;
          }

          .gcta-word {
            margin-right: 10px;
          }

          .gcta-body {
            margin-top: 24px;
          }

          .gcta-btn {
            width: 100%;
            max-width: 320px;
            margin-top: 32px;
            padding: 14px 20px;
            font-size: 11px;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {
          .gcta-section {
            padding: 64px 16px;
          }

          .gcta-heading {
            font-size: clamp(34px, 12vw, 48px);
          }

          .gcta-body {
            font-size: 13px;
            line-height: 1.7;
          }

          .gcta-btn {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   VIDEO SHOWCASE
========================= */

export function VideoShowcase() {
  return (
    <section
      style={{
        width: "100%",
        background: "#1A1712",
        padding: "clamp(60px, 8vw, 100px) 24px",
      }}
    >
      {/* Text now sits ABOVE the video in normal flow */}
      <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 40px" }}>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          See It In Action
        </p>
        <h2
          className="font-display"
          style={{
            color: "#fff",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            margin: "0 auto",
          }}
        >
          Corporate travel, simplified end to end.
        </h2>
      </div>

      {/* Video in its own fixed-aspect box — nothing gets cropped */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          aspectRatio: "16 / 9",
          borderRadius: "1.5rem",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // <-- key change: shows full video, never crops
          }}
        >
          <source src={demoVideo} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

/* =========================
   FOOTER
========================= */

// Fixed display order for the "Offices" column, regardless of what order
// CONTACT.officeLocations happens to be defined in.
const OFFICE_DISPLAY_ORDER = ["Dubai", "Kuwait", "Trivandrum", "Kochi", "Chennai", "Delhi"];

function sortOffices(offices: string[]): string[] {
  return [...offices].sort((a, b) => {
    const ai = OFFICE_DISPLAY_ORDER.indexOf(a);
    const bi = OFFICE_DISPLAY_ORDER.indexOf(b);
    // Anything not in the priority list falls to the end, in its original order.
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

// Detects whether the footer is being rendered on the .ae site so we can
// swap in UAE-specific contact details, cities heading, city list, and
// whether the D-U-N-S seal (India-only registration) is shown.
function useIsUaeSite(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname.endsWith(".ae");
}

type FooterLinkItem = {
  label: string;
  href?: string;
};

export function Footer() {
  const isUaeSite = useIsUaeSite();
  const officeLocations = sortOffices(CONTACT.officeLocations);

  const footerLinks: FooterLinkItem[] = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "Solutions", href: "/solutions" },
    { label: "MICE & Events", href: "/mice-events" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Register", href: "/register" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const cityLinksIndia: FooterLinkItem[] = [
    { label: "Bangalore", href: "/corporate-travel-management-bangalore" },
    { label: "Chennai", href: "/corporate-travel-management-chennai" },
    { label: "Delhi", href: "/corporate-travel-management-delhi" },
  ];

  const cityLinksUae: FooterLinkItem[] = [
    { label: "Downtown Dubai" },
    { label: "Dubai Marina" },
    { label: "Business Bay" },
    { label: "Deira" },
    { label: "Bur Dubai" },
    { label: "Jumeirah" },
  ];

  const cityLinks = isUaeSite ? cityLinksUae : cityLinksIndia;
  const citiesHeading = isUaeSite ? "Metro Cities in Dubai" : "Metro Cities in India";

  const contactEmail = isUaeSite ? "info@flyozone.travel" : "tresaj@ozonegroupglobal.com";
  const whatsappNumber = isUaeSite ? "971564557700" : CONTACT.whatsappNumber;
  const whatsappDisplay = isUaeSite ? "+971 56 455 7700" : CONTACT.whatsappDisplay;

  // Navigation links: always real links, on both .com and .ae
  const renderNavLinkItem = (item: FooterLinkItem) => (
    <a key={item.label} href={item.href} className="footer-link">
      {item.label}
    </a>
  );

  // Cities links: real links only on India (.com); static text on UAE (.ae)
  const renderCityLinkItem = (item: FooterLinkItem) => {
    const href = isUaeSite ? undefined : item.href;
    return href ? (
      <a key={item.label} href={href} className="footer-link">
        {item.label}
      </a>
    ) : (
      <span key={item.label} className="footer-link footer-link--static">
        {item.label}
      </span>
    );
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo font-display">OZONEX</div>

            <p className="footer-tagline">
              Corporate travel management built for enterprises, HR teams, finance teams, and
              growing businesses.
            </p>

            <div className="footer-cert">IATA Accredited · Est. 2014</div>

            {!isUaeSite && (
              <iframe
                id="Iframe1"
                src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
                width="114"
                height="97"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                title="D-U-N-S Registered Seal"
                style={{ marginTop: "18px" }}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <div className="footer-col-heading">Navigation</div>

            <div className="footer-links">{footerLinks.map(renderNavLinkItem)}</div>
          </div>

          {/* Cities */}
          <div className="footer-col">
            <div className="footer-col-heading">{citiesHeading}</div>

            <div className="footer-links">{cityLinks.map(renderCityLinkItem)}</div>
          </div>

          {/* Offices */}
          <div className="footer-col">
            <div className="footer-col-heading">Offices</div>

            <div className="footer-links">
              {officeLocations.map((city) => (
                <div key={city} className="footer-office">
                  {city}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col-heading">Contact</div>

            <div className="footer-links flex flex-col gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="footer-link footer-email"
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap", // prevent breaking
                  display: "inline-block",
                }}
              >
                {contactEmail}
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20OzoneX%20Platform`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "12px",
                  textDecoration: "none",
                  whiteSpace: "nowrap", // keep whole number in one line
                  display: "inline-block",
                }}
              >
                WhatsApp: {whatsappDisplay}
              </a>

              <a href="/pricing#enquire" className="footer-enquire">
                Enquire Now →
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Ozonex by Ozone Tourism and Travel.
          </div>

          <div className="footer-bottom-links">
            <a href="/privacy" className="footer-bottom-link">
              Privacy Policy
            </a>

            <span className="footer-dot">·</span>

            <a href="/pricing#enquire" className="footer-bottom-link">
              Contact
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #1C1410;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 100px 80px 40px;
        }

        .footer-container {
          max-width: 1320px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
          gap: 56px;
          padding-bottom: 72px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .footer-logo {
          font-size: 30px;
          color: white;
          font-weight: 300;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
        }

        .footer-tagline {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          max-width: 260px;
          margin-bottom: 24px;
        }

        .footer-cert {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.34);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .footer-col-heading {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin-bottom: 22px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-link,
        .footer-office {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.62);
          text-decoration: none;
          line-height: 1.6;
        }

        .footer-link:hover {
          color: white;
        }

        .footer-link--static {
          cursor: default;
        }

        .footer-link--static:hover {
          color: rgba(255,255,255,0.62);
        }

        .footer-email {
          word-break: break-word;
        }

        .footer-enquire {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: #2563EB;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 8px;
          text-decoration: none;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 28px;
          flex-wrap: wrap;
        }

        .footer-copy {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.34);
          line-height: 1.6;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .footer-bottom-link {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.42);
          text-decoration: none;
        }

        .footer-bottom-link:hover {
          color: white;
        }

        .footer-dot {
          color: rgba(255,255,255,0.18);
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1100px) {
          .site-footer {
            padding: 80px 40px 32px;
          }

          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-tagline {
            max-width: 100%;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {
          .site-footer {
            padding: 64px 20px 28px;
          }

          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
            padding-bottom: 48px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .footer-copy {
            font-size: 11px;
          }

          .footer-bottom-links {
            gap: 14px;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {
          .site-footer {
            padding: 52px 16px 24px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .footer-logo {
            font-size: 24px;
          }

          .footer-tagline {
            font-size: 12px;
          }

          .footer-link,
          .footer-office {
            font-size: 12px;
          }

          .footer-bottom-link {
            font-size: 11px;
          }

          .footer-copy {
            font-size: 10px;
          }
        }
      `}</style>
    </footer>
  );
}
