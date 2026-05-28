import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityData } from "@/components/CityPage";
import hero from "@/assets/city-bangalore-hero.jpg";
import s1 from "@/assets/city-bangalore-s1.jpg";
import s2 from "@/assets/city-bangalore-s2.jpg";
import s3 from "@/assets/city-bangalore-s3.jpg";
import cta from "@/assets/city-bangalore-cta.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Travel Management Bangalore",
  provider: {
    "@type": "Organization",
    name: "Ozonex",
  },
  areaServed: {
    "@type": "City",
    name: "Bangalore",
  },
  description: "Enterprise corporate travel management platform for Bangalore businesses.",
  url: "https://ozonex.com/corporate-travel-management-bangalore",
};

const data: CityData = {
  city: "Bangalore",

  eyebrow: "Corporate Travel Management · Bangalore",

  hero: {
    image: hero,

    h1Lines: ["India's tech capital", "deserves a smarter", "travel platform."],

    sub: "From Whitefield IT parks to Electronic City campuses, Ozonex gives Bangalore enterprises complete control over corporate travel.",
  },

  stats: [
    {
      num: "9,800+",
      label: "Corporate travellers managed annually",
    },

    {
      num: "22 min",
      label: "Average approval time",
    },

    {
      num: "₹ 4.6 Cr",
      label: "Average annual spend managed",
    },

    {
      num: "96%",
      label: "Policy compliance rate",
    },
  ],

  why: {
    h2Lines: ["Where every startup", "eventually becomes", "an enterprise."],

    body: "Bangalore's corporate travel problem is a growth problem. Ozonex scales with companies from startup stage to enterprise operations.",

    keyStatNum: "3x",

    keyStatLabel: "average growth in managed travel volume for Bangalore tech companies",

    cards: [
      {
        title: "Global Delivery Centre Complexity",

        body: "Manage international travel, visa workflows, and multi-currency expense reporting in one system.",
      },

      {
        title: "Startup to Enterprise Scaling",

        body: "Automated approvals, policy enforcement, and live visibility from day one.",
      },

      {
        title: "Distributed Team Coordination",

        body: "Coordinate travel across multiple office clusters with one unified policy engine.",
      },
    ],
  },

  industries: {
    h2Lines: ["Every sector that", "powers Bangalore."],

    tiles: [
      {
        title: "INFORMATION TECHNOLOGY",

        body: "Project-coded travel with full audit trails and enterprise visibility.",
      },

      {
        title: "STARTUPS & UNICORNS",

        body: "Travel management that scales from 50 to 5,000 employees.",
      },

      {
        title: "AEROSPACE & DEFENCE",

        body: "Security-sensitive travel workflows with compliance tracking.",
      },

      {
        title: "BIOTECH & LIFE SCIENCES",

        body: "Grant-coded travel spend and automated per-diem management.",
      },

      {
        title: "E-COMMERCE & RETAIL TECH",

        body: "Vendor visits, warehouse travel, and leadership roadshows on one platform.",
      },

      {
        title: "CONSULTING & PROFESSIONAL SERVICES",

        body: "Client-billable travel tracking with project-wise cost allocation.",
      },
    ],
  },

  how: {
    h2Lines: ["Live in Bangalore", "in under 3 weeks."],

    steps: [
      {
        title: "Connect your tech stack",

        body: "Integrates with HRIS, ERP, and SSO providers within hours.",

        image: s1,
      },

      {
        title: "Every employee books in policy",

        body: "Live policy filtering before any booking is confirmed.",

        image: s2,
      },

      {
        title: "Finance gets data, not paperwork",

        body: "Automated cost records and reconciliation for finance teams.",

        image: s3,
      },
    ],
  },

  testimonial: {
    quote:
      "Without Ozonex, our finance team would have needed 3 additional hires just to manage reconciliation.",

    attribution: "CFO, Series C Technology Company, Bangalore",
  },

  cta: {
    image: cta,

    h2Lines: ["Bangalore's fastest", "growing companies", "run on Ozonex."],

    body: "See how Ozonex works for your Bangalore operation with a live walkthrough built around your organisation.",
  },
};

export const Route = createFileRoute("/corporate-travel-management-bangalore")({
  head: () => ({
    meta: [
      {
        title: "Corporate Travel Management in Bangalore | Ozonex",
      },

      {
        name: "description",

        content:
          "Ozonex powers corporate travel management for Bangalore tech enterprises and startups.",
      },

      {
        property: "og:title",

        content: "Corporate Travel Management in Bangalore | Ozonex",
      },

      {
        property: "og:description",

        content: "Enterprise travel management for Bangalore companies.",
      },

      {
        property: "og:type",

        content: "website",
      },
    ],

    links: [
      {
        rel: "canonical",

        href: "https://ozonex.com/corporate-travel-management-bangalore",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",

        children: JSON.stringify(schema),
      },
    ],
  }),

  component: () => (
    <>
      <style>{`
        /* =========================
           GLOBAL RESPONSIVE HELPERS
        ========================= */

        :root {
          --container-padding: 24px;
        }

        @media (max-width: 768px) {
          :root {
            --container-padding: 20px;
          }
        }

        @media (max-width: 480px) {
          :root {
            --container-padding: 16px;
          }
        }

        /* =========================
           GENERIC TEXT FIXES
        ========================= */

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          word-break: break-word;
        }

        p {
          word-break: break-word;
        }

        img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        /* =========================
           HERO
        ========================= */

        .city-hero,
        .hero-section {
          padding-left: var(--container-padding) !important;
          padding-right: var(--container-padding) !important;
        }

        .city-hero h1,
        .hero-section h1 {
          font-size: clamp(36px, 8vw, 88px) !important;
          line-height: 0.95 !important;
        }

        .city-hero p,
        .hero-section p {
          font-size: clamp(14px, 2vw, 17px) !important;
          line-height: 1.8 !important;
          max-width: 720px !important;
        }

        /* =========================
           STATS
        ========================= */

        .stats-grid,
        .city-stats-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 24px !important;
        }

        @media (max-width: 1024px) {
          .stats-grid,
          .city-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid,
          .city-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }

        /* =========================
           CONTENT SECTIONS
        ========================= */

        section {
          overflow-x: hidden;
        }

        .section-inner,
        .city-section-inner {
          padding-left: var(--container-padding) !important;
          padding-right: var(--container-padding) !important;
        }

        .two-col-grid,
        .city-two-col-grid {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 60px !important;
        }

        @media (max-width: 992px) {
          .two-col-grid,
          .city-two-col-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }

        /* =========================
           CARDS
        ========================= */

        .card-grid,
        .city-card-grid,
        .industry-grid,
        .services-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
        }

        @media (max-width: 1024px) {
          .card-grid,
          .city-card-grid,
          .industry-grid,
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .card-grid,
          .city-card-grid,
          .industry-grid,
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }

        .card,
        .city-card,
        .industry-tile {
          padding: 28px 24px !important;
          border-radius: 18px !important;
        }

        @media (max-width: 480px) {
          .card,
          .city-card,
          .industry-tile {
            padding: 22px 18px !important;
          }
        }

        /* =========================
           TYPOGRAPHY
        ========================= */

        .section-heading,
        h2 {
          font-size: clamp(30px, 6vw, 58px) !important;
          line-height: 1 !important;
        }

        h3 {
          font-size: clamp(20px, 4vw, 30px) !important;
          line-height: 1.2 !important;
        }

        .body-copy,
        .section-copy,
        p {
          font-size: clamp(13px, 2vw, 16px) !important;
          line-height: 1.8 !important;
        }

        /* =========================
           CTA
        ========================= */

        .cta-section,
        .city-cta {
          padding-left: var(--container-padding) !important;
          padding-right: var(--container-padding) !important;
        }

        .cta-buttons {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 16px !important;
        }

        @media (max-width: 768px) {
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }

          .cta-buttons a,
          .cta-buttons button {
            width: 100% !important;
            max-width: 320px !important;
          }
        }

        /* =========================
           IMAGES
        ========================= */

        .city-image,
        .step-image img {
          border-radius: 18px !important;
          width: 100% !important;
          object-fit: cover !important;
        }

        /* =========================
           SPACING
        ========================= */

        section {
          padding-top: clamp(70px, 8vw, 140px) !important;
          padding-bottom: clamp(70px, 8vw, 140px) !important;
        }

        @media (max-width: 480px) {
          section {
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
        }

        /* =========================
           MOBILE TEXT ALIGNMENT
        ========================= */

        @media (max-width: 768px) {
          .mobile-center {
            text-align: center !important;
          }

          .mobile-center * {
            text-align: center !important;
          }
        }

        /* =========================
           OVERFLOW FIXES
        ========================= */

        body,
        html {
          overflow-x: hidden;
        }

        * {
          max-width: 100%;
        }
      `}</style>

      <CityPage data={data} />
    </>
  ),
});
