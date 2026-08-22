// src/routes/admin/registrations.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/useAuth";
import { RegistrationDocuments } from "@/components/admin/RegistrationDocuments";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_category: string;
  country: string;
  created_at: string;
}

export const Route = createFileRoute("/admin/registrations")({
  component: AdminRegistrations,
});

const CATEGORY_STYLES: Record<string, string> = {
  b2b_travel_agent: "bg-[#1E2A52]/10 text-[#1E2A52]",
  corporate: "bg-[#C9A15E]/15 text-[#8A6B2E]",
  mice_events: "bg-[#5B7553]/12 text-[#3E5237]",
};
const FALLBACK_CATEGORY_STYLE = "bg-[#14100C]/8 text-[#14100C]/70";

const AVATAR_PALETTE = ["#1E2A52", "#8A6B2E", "#5B7553", "#7A3B3B", "#41546B"];

function avatarColor(seed: string) {
  const hash = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AdminRegistrations() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !session) navigate({ to: "/admin/login" });
  }, [authLoading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else setRegistrations(data ?? []);
      setLoading(false);
    };
    fetchData();
  }, [session]);

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = registrations.filter((r) => new Date(r.created_at) > weekAgo).length;
    const categoryCounts = registrations.reduce<Record<string, number>>((acc, r) => {
      acc[r.business_category] = (acc[r.business_category] ?? 0) + 1;
      return acc;
    }, {});
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
    return {
      total: registrations.length,
      thisWeek,
      topCategory: topCategory ? topCategory[0] : "—",
    };
  }, [registrations]);

  if (authLoading || loading)
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center text-[#14100C]/40 text-sm">
        Loading...
      </div>
    );
  if (!session) return null;

  const filtered = registrations.filter((r) =>
    `${r.name} ${r.email} ${r.business_category} ${r.country}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* topbar */}
      <div className="bg-[#14100C] px-8 pt-4 pb-14 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold tracking-[0.2em]">OZONEX</span>
            <span className="text-[#C9A15E] text-[10px] uppercase tracking-[0.25em] border border-[#C9A15E]/30 rounded-full px-2 py-0.5">
              Admin
            </span>
          </div>
        </div>

        {/* signature wave divider, echoing the homepage */}
        <svg
          className="absolute bottom-[-1px] left-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          height="60"
        >
          <path
            d="M0,30 C240,60 480,0 720,20 C960,40 1200,10 1440,30 L1440,60 L0,60 Z"
            fill="#F5F0E6"
          />
        </svg>
      </div>

      <div className="px-8 pb-14 max-w-6xl mx-auto -mt-2">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#14100C]">Registrations</h1>
            <p className="text-sm text-[#14100C]/50 mt-1">
              Every agent and corporate signup, in one place.
            </p>
          </div>
        </div>

        {/* stat row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
            <div className="text-3xl font-semibold text-[#14100C]">{stats.total}</div>
            <div className="text-xs uppercase tracking-wide text-[#14100C]/40 mt-1">
              Total submissions
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
            <div className="text-3xl font-semibold text-[#14100C]">{stats.thisWeek}</div>
            <div className="text-xs uppercase tracking-wide text-[#14100C]/40 mt-1">
              New this week
            </div>
          </div>
          <div className="bg-[#14100C] rounded-2xl shadow-sm px-6 py-5">
            <div className="text-lg font-semibold text-[#C9A15E] truncate">{stats.topCategory}</div>
            <div className="text-xs uppercase tracking-wide text-white/40 mt-1">Top category</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 flex flex-col items-center text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#14100C"
                strokeOpacity="0.2"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="text-sm text-[#14100C]/50 mt-3">
                {registrations.length === 0
                  ? "No registrations yet."
                  : "Nothing matches your search."}
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[#14100C]/10 bg-[#14100C]/[0.02]">
                  {["", "Name", "Contact", "Category", "Country", "Submitted", ""].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-5 text-[11px] uppercase tracking-wide text-[#14100C]/40 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <Fragment key={r.id}>
                    <tr className="border-b border-[#14100C]/5 hover:bg-[#F5F0E6]/40 transition-colors">
                      <td className="pl-5 py-3.5 w-10">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ backgroundColor: avatarColor(r.name) }}
                        >
                          {initials(r.name)}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-[#14100C]">{r.name}</td>
                      <td className="py-3.5 px-5">
                        <div className="text-[#14100C]/80">{r.email}</div>
                        <div className="text-[#14100C]/40 text-xs">{r.phone}</div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-block text-xs px-2.5 py-1 rounded-full ${
                            CATEGORY_STYLES[r.business_category] ?? FALLBACK_CATEGORY_STYLE
                          }`}
                        >
                          {r.business_category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-[#14100C]/70">{r.country}</td>
                      <td className="py-3.5 px-5 text-[#14100C]/50 text-xs">
                        {new Date(r.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-5 text-right pr-5">
                        <button
                          onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                          className="text-xs font-medium text-[#C9A15E] hover:text-[#14100C] transition-colors"
                        >
                          {expandedId === r.id ? "Hide" : "Docs"}
                        </button>
                      </td>
                    </tr>
                    {expandedId === r.id && (
                      <tr>
                        <td colSpan={7} className="bg-[#F5F0E6]/50 px-5 py-4">
                          <RegistrationDocuments registrationId={r.id} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
