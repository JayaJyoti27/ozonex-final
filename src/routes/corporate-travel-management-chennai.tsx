import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityData } from "@/components/CityPage";
import hero from "@/assets/city-chennai-hero.jpg";
import s1 from "@/assets/city-chennai-s1.jpg";
import s2 from "@/assets/city-chennai-s2.jpg";
import s3 from "@/assets/city-chennai-s3.jpg";
import cta from "@/assets/city-chennai-cta.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Travel Management Chennai",
  provider: { "@type": "Organization", name: "Ozonex" },
  areaServed: { "@type": "City", name: "Chennai" },
  description:
    "Enterprise corporate travel management software serving businesses in Chennai and Tamil Nadu.",
  url: "https://ozonex.com/corporate-travel-management-chennai",
};

const data: CityData = {
  city: "Chennai",
  eyebrow: "Corporate Travel Management · Chennai",
  hero: {
    image: hero,
    h1Lines: ["Chennai moves fast.", "Your travel platform", "should keep up."],
    sub: "Ozonex gives Chennai's enterprises — from Old Mahabalipuram Road tech corridors to Ambattur industrial estates — a single platform to book, approve, track, and reconcile every corporate journey.",
  },
  stats: [
    { num: "4,200+", label: "Active corporate travellers managed in Chennai annually" },
    { num: "38 min", label: "Average trip approval time for Chennai enterprise clients" },
    { num: "₹ 2.1 Cr", label: "Average annual travel spend managed per Chennai enterprise" },
    { num: "92%", label: "Policy compliance rate across Chennai-based Ozonex clients" },
  ],
  why: {
    h2Lines: ["Built for the", "complexity", "Chennai runs on."],
    body: "Chennai is home to some of India's most travel-intensive industries — automotive manufacturing, IT services, financial institutions, and port-linked logistics. Each sector has distinct travel patterns, approval structures, and compliance needs. Ozonex handles all of them on one platform.",
    keyStatNum: "68%",
    keyStatLabel:
      "of Chennai enterprise travel spend happens outside declared policy without a platform like Ozonex",
    cards: [
      {
        title: "Multi-Location Approvals",
        body: "Chennai enterprises often have approvers in Mumbai or Bengaluru while travellers are based locally. Ozonex routes approvals to the right person automatically — geography is never a bottleneck.",
      },
      {
        title: "Manufacturing Sector Complexity",
        body: "Automotive and manufacturing companies in Chennai run high-frequency travel between plant locations, vendor sites, and client offices. Ozonex manages recurring routes, preferred vendors, and per-diem policies without manual intervention.",
      },
      {
        title: "Port & Logistics Coordination",
        body: "Chennai's port-connected businesses require rapid, often same-day travel bookings for operations teams. Ozonex supports urgent booking workflows with accelerated approval paths and 24/7 operational backup.",
      },
    ],
  },
  industries: {
    h2Lines: ["Every sector that", "keeps Chennai moving."],
    tiles: [
      { title: "AUTOMOTIVE & MANUFACTURING", body: "From OEMs to tier-2 suppliers — manage high-frequency plant visits, vendor trips, and executive travel across Chennai's automotive belt." },
      { title: "IT & TECHNOLOGY SERVICES", body: "OMR and Tidel Park tech companies run global delivery teams with constant client-site travel. Ozonex manages visa tracking, international bookings, and per-diem automation." },
      { title: "BANKING & FINANCIAL SERVICES", body: "Chennai's banking sector requires strict travel policy compliance and audit-ready expense reporting. Ozonex delivers both without adding administrative overhead." },
      { title: "HEALTHCARE & PHARMA", body: "Medical device companies and pharma distributors based in Chennai run field-force travel programmes that demand real-time tracking and rapid rebooking capabilities." },
      { title: "LOGISTICS & SUPPLY CHAIN", body: "Port-connected logistics operations need same-day booking capability and live traveller visibility for ops teams coordinating across multiple locations simultaneously." },
      { title: "ENGINEERING & INFRASTRUCTURE", body: "EPC contractors and infrastructure companies based in Chennai manage project-site travel across multiple states. Ozonex tracks cost by project code automatically." },
    ],
  },
  how: {
    h2Lines: ["Up and running in", "Chennai in 3 weeks."],
    steps: [
      {
        title: "Onboard your organisation",
        body: "Connect your HRIS, configure your travel policy, and map your approval hierarchy. Our implementation team manages the entire setup — your IT team needs less than 2 hours.",
        image: s1,
      },
      {
        title: "Your team books with guardrails",
        body: "Every employee sees only what they are entitled to book. Policy compliance is automatic from the first search. Approvals route to the right manager in seconds.",
        image: s2,
      },
      {
        title: "Finance closes fast",
        body: "Expenses are captured automatically. GL codes are assigned at booking. Your finance team gets a reconciled, audit-ready report — not a pile of receipts.",
        image: s3,
      },
    ],
  },
  testimonial: {
    quote:
      "We manage travel for 340 employees across 6 plant locations in Tamil Nadu. Before Ozonex, reconciliation alone took our finance team 4 days every month. Now it takes 3 hours. The policy compliance rate went from 61% to 94% in the first quarter.",
    attribution: "VP Operations, Automotive Components Manufacturer, Chennai",
  },
  cta: {
    image: cta,
    h2Lines: ["Ready to bring", "order to Chennai's", "corporate travel?"],
    body: "Book a 30-minute live walkthrough. We will show you exactly how Ozonex works for your Chennai operation — your team size, your approval structure, your travel patterns.",
  },
};

export const Route = createFileRoute("/corporate-travel-management-chennai")({
  head: () => ({
    meta: [
      { title: "Corporate Travel Management in Chennai | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex delivers enterprise corporate travel management for Chennai-based companies. Policy compliance, automated approvals, and real-time expense tracking — built for Tamil Nadu's fastest-growing enterprises.",
      },
      { property: "og:title", content: "Corporate Travel Management in Chennai | Ozonex" },
      {
        property: "og:description",
        content:
          "Enterprise corporate travel management software for Chennai and Tamil Nadu businesses.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/corporate-travel-management-chennai" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: () => <CityPage data={data} />,
});
