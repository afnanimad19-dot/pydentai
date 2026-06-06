import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — pydent.ai" },
      { name: "description", content: "Sign in to your pydent.ai workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#06060F] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(123,92,252,0.15) 0%, transparent 55%)",
        }}
      />
      <div className="w-[500px] h-[500px] rounded-full bg-[#7B5CFC]/[0.05] blur-[140px] absolute -top-40 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="w-[300px] h-[300px] rounded-full bg-[#00D4AA]/[0.04] blur-[100px] absolute bottom-0 right-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 w-full">
        <div className="w-full max-w-[420px] bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#7B5CFC]/50 via-[#7B5CFC]/20 to-transparent" />

          {/* Logo */}
          <div className="flex items-center gap-2.5 justify-center mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#7B5CFC]/20 border border-[#7B5CFC]/30 flex items-center justify-center">
              <span className="font-bold text-sm text-[#7B5CFC]">Py</span>
            </div>
            <span className="text-white font-bold text-lg tracking-[-0.02em]">
              pydent<span className="text-[#7B5CFC]">.ai</span>
            </span>
          </div>

          <h1 className="text-[22px] font-bold text-white tracking-[-0.02em] text-center mb-1">
            Welcome back
          </h1>
          <p className="text-[#4A4A6A] text-sm text-center mb-8">
            Sign in to your workspace
          </p>

          <button className="w-full h-11 bg-[#0E0E1C] border border-[#1C1C34] rounded-xl flex items-center justify-center gap-3 text-sm text-white hover:bg-[#141428] transition-all mb-6">
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-[#1C1C34] flex-1" />
            <span className="text-[#4A4A6A] text-xs">or</span>
            <div className="h-px bg-[#1C1C34] flex-1" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#8B8FA8] text-xs font-medium mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@clinic.com"
                className="bg-[#06060F] border border-[#1C1C34] rounded-xl h-11 w-full px-4 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60 focus:ring-1 focus:ring-[#7B5CFC]/20 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#8B8FA8] text-xs font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#06060F] border border-[#1C1C34] rounded-xl h-11 w-full px-4 pr-10 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60 focus:ring-1 focus:ring-[#7B5CFC]/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A6A] hover:text-white"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-[#FF4D6D] text-xs bg-[#FF4D6D]/[0.08] border border-[#FF4D6D]/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div className="text-right">
              <a className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs transition-colors cursor-pointer">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#7B5CFC] hover:bg-[#6047DB] disabled:opacity-60 text-white text-sm font-semibold mt-2 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>


          <div className="text-center mt-6">
            <span className="text-[#4A4A6A] text-sm">
              Don't have an account?
            </span>{" "}
            <Link
              to="/signup"
              className="text-[#7B5CFC] hover:text-[#9B84FF] text-sm font-medium"
            >
              Start free trial
            </Link>
          </div>
        </div>

        <p className="text-[#4A4A6A] text-[11px] text-center mt-4">
          Protected by 256-bit encryption · UAE PDPL compliant
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
