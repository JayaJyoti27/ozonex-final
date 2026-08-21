// src/routes/admin/login.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate({ to: "/admin/registrations" });
  };

  return (
    <div className="min-h-screen bg-[#14100C] flex items-center justify-center px-6 relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A15E]/10 blur-[120px]" />

      <div className="relative w-full max-w-sm">
        {/* wordmark */}
        <div className="text-center mb-8">
          <div className="text-white text-xl font-semibold tracking-[0.2em]">OZONEX</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#C9A15E]">
            Admin Access
          </div>
        </div>

        <div className="bg-[#F5F0E6] rounded-2xl shadow-2xl px-8 py-10">
          <div className="flex items-center gap-2 mb-6">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1E2A52"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h1 className="text-lg font-semibold text-[#14100C]">Sign in</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#14100C]/50 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#14100C]/10 rounded-lg px-3.5 py-2.5 text-sm text-[#14100C] focus:outline-none focus:ring-2 focus:ring-[#C9A15E] transition-shadow"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-[#14100C]/50 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#14100C]/10 rounded-lg px-3.5 py-2.5 text-sm text-[#14100C] focus:outline-none focus:ring-2 focus:ring-[#C9A15E] transition-shadow"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#14100C] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#1E2A52] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Restricted access · Ozonex internal
        </p>
      </div>
    </div>
  );
}
