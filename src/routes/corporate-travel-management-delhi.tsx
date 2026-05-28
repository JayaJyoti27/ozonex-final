import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityData } from "@/components/CityPage";
import hero from "@/assets/city-delhi-hero.jpg";
import s1 from "@/assets/city-delhi-s1.jpg";
import s2 from "@/assets/city-delhi-s2.jpg";
import s3 from "@/assets/city-delhi-s3.jpg";
import cta from "@/assets/city-delhi-cta.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",

  name: "Corporate Travel Management Delhi NCR",

  provider: {
    "@type": "Organization",
    name: "Ozonex",
  },

  areaServed: {
    "@type": "City",
    name: "Delhi",
  },

  description: "Corporate travel management software for Delhi, Noida, and Gurugram enterprises.",

  url: "https://ozonex.com/corporate-travel-management-delhi",
};

const data: CityData = {
  city: "Delhi NCR",

  eyebrow: "Corporate Travel Management · Delhi NCR",

  hero: {
    image: hero,

    h1Lines: ["The capital of Indian", "business needs a", "capital-grade platform."],

    sub: "Ozonex gives Delhi NCR enterprises the control, compliance, and visibility their scale demands.",
  },

  stats: [
    {
      num: "14,000+",
      label: "Corporate travellers managed annually",
    },

    {
      num: "18 min",
      label: "Average trip approval time",
    },

    {
      num: "₹ 7.2 Cr",
      label: "Average annual spend managed",
    },

    {
      num: "97%",
      label: "Policy compliance rate",
    },
  ],

  why: {
    h2Lines: ["Where India's", "largest enterprises", "set the standard."],

    body: "Delhi NCR enterprises demand audit-ready records, multi-level approvals, and board-level reporting. Ozonex was built for exactly this scale.",

    keyStatNum: "₹ 340 Cr",

    keyStatLabel:
      "total corporate travel spend managed across Delhi NCR enterprises last financial year",

    cards: [
      {
        title: "Multi-Entity HQ Complexity",

        body: "Manage subsidiaries, joint ventures, and group entities from one admin console.",
      },

      {
        title: "Government & Regulatory Compliance",

        body: "Automatic entitlement enforcement and audit-ready travel documentation.",
      },

      {
        title: "Executive & C-Suite Travel",

        body: "Priority workflows for executive travel, preferred airlines, and last-minute changes.",
      },
    ],
  },

  industries: {
    h2Lines: ["Every sector that", "anchors NCR business."],

    tiles: [
      {
        title: "CONGLOMERATES & HOLDING COMPANIES",

        body: "Group-wide reporting with subsidiary-level policy isolation.",
      },

      {
        title: "BANKING, FINANCIAL SERVICES & INSURANCE",

        body: "Nationwide branch travel with compliance-ready reporting.",
      },

      {
        title: "GOVERNMENT & PUBLIC SECTOR",

        body: "TA/DA automation and entitlement-based workflows.",
      },

      {
        title: "REAL ESTATE & INFRASTRUCTURE",

        body: "Project-site travel mapped automatically to project codes.",
      },

      {
        title: "MEDIA, PUBLISHING & BROADCAST",

        body: "Rapid booking workflows and flexible itinerary management.",
      },

      {
        title: "FMCG & CONSUMER GOODS",

        body: "Recurring route management with territory-level reporting.",
      },
    ],
  },

  how: {
    h2Lines: ["Enterprise-ready in", "Delhi NCR in 3 weeks."],

    steps: [
      {
        title: "Configure your entity structure",

        body: "Map subsidiaries, cost centres, and approval hierarchies before go-live.",

        image: s1,
      },

      {
        title: "Every booking meets your standards",

        body: "Automatic enforcement of TA/DA rules, grade policies, and travel entitlements.",

        image: s2,
      },

      {
        title: "Board-ready reports, automatically",

        body: "Real-time travel spend data exportable directly into ERP systems.",

        image: s3,
      },
    ],
  },

  testimonial: {
    quote: "We run travel for 11 group companies from one admin console on Ozonex.",

    attribution: "Group Head of Finance, Diversified Conglomerate, New Delhi",
  },

  cta: {
    image: cta,

    h2Lines: ["Delhi NCR's enterprise", "standard. Built into", "every booking."],

    body: "Book a live walkthrough built around your approval hierarchy and compliance structure.",
  },
};

export const Route = createFileRoute("/corporate-travel-management-delhi")({
  head: () => ({
    meta: [
      {
        title: "Corporate Travel Management in Delhi NCR | Ozonex",
      },

      {
        name: "description",

        content: "Ozonex delivers enterprise travel management for Delhi NCR corporates.",
      },

      {
        property: "og:title",

        content: "Corporate Travel Management in Delhi NCR | Ozonex",
      },

      {
        property: "og:description",

        content: "Enterprise corporate travel management for Delhi NCR businesses.",
      },

      {
        property: "og:type",

        content: "website",
      },
    ],

    links: [
      {
        rel: "canonical",

        href: "https://ozonex.com/corporate-travel-management-delhi",
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
           ROOT VARIABLES
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
           GLOBAL RESET
        ========================= */

        html,
        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
          max-width: 100%;
        }

        img {
          width: 100%;
          max-width: 100%;
          height: auto;
          display: block;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          word-break: break-word;
        }

        section {
          overflow-x: hidden;
          padding-top: clamp(72px, 8vw, 140px) !important;
          padding-bottom: clamp(72px, 8vw, 140px) !important;
        }

        @media (max-width: 480px) {
          section {
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
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
          font-size: clamp(36px, 8vw, 90px) !important;
          line-height: 0.95 !important;
        }

        .city-hero p,
        .hero-section p {
          max-width: 760px !important;
          font-size: clamp(14px, 2vw, 17px) !important;
          line-height: 1.8 !important;
        }

        /* =========================
           STATS GRID
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
           TWO COLUMN LAYOUTS
        ========================= */

        .two-col-grid,
        .city-two-col-grid {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 56px !important;
        }

        @media (max-width: 992px) {
          .two-col-grid,
          .city-two-col-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }

        /* =========================
           CARD GRIDS
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

        h2,
        .section-heading {
          font-size: clamp(30px, 6vw, 58px) !important;
          line-height: 1 !important;
        }

        h3 {
          font-size: clamp(20px, 4vw, 30px) !important;
          line-height: 1.2 !important;
        }

        p,
        .body-copy,
        .section-copy {
          font-size: clamp(13px, 2vw, 16px) !important;
          line-height: 1.8 !important;
        }

        /* =========================
           CTA SECTION
        ========================= */

        .city-cta,
        .cta-section {
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
          width: 100% !important;
          object-fit: cover !important;
          border-radius: 18px !important;
        }

        /* =========================
           MOBILE ALIGNMENTS
        ========================= */

        @media (max-width: 768px) {
          .mobile-center {
            text-align: center !important;
          }

          .mobile-center * {
            text-align: center !important;
          }
        }
      `}</style>

      <CityPage data={data} />
    </>
  ),
});
