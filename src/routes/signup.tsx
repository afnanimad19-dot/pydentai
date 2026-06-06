import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  MessageCircle,
  Phone,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start free trial — pydent.ai" },
      { name: "description", content: "Create your pydent.ai account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [channel, setChannel] = useState<string | null>("whatsapp");
  const [done, setDone] = useState(false);

  const pwdStrength = (() => {
    let s = 0;
    if (pwd.length >= 6) s++;
    if (pwd.length >= 10) s++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  })();
  const strengthColors = ["#FF4D6D", "#FFAB00", "#00D4AA", "#22C55E"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  function finish() {
    setDone(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1500);
  }

  return (
    <div className="min-h-screen bg-[#06060F] flex items-center justify-center relative overflow-hidden font-sans py-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(123,92,252,0.15) 0%, transparent 55%)",
        }}
      />
      <div className="w-[500px] h-[500px] rounded-full bg-[#7B5CFC]/[0.05] blur-[140px] absolute -top-40 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="w-[300px] h-[300px] rounded-full bg-[#00D4AA]/[0.04] blur-[100px] absolute bottom-0 right-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[480px] px-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#7B5CFC]/50 via-[#7B5CFC]/20 to-transparent" />

          {/* Logo */}
          <div className="flex items-center gap-2.5 justify-center mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#7B5CFC]/20 border border-[#7B5CFC]/30 flex items-center justify-center">
              <span className="font-bold text-sm text-[#7B5CFC]">Py</span>
            </div>
            <span className="text-white font-bold text-lg tracking-[-0.02em]">
              pydent<span className="text-[#7B5CFC]">.ai</span>
            </span>
          </div>

          {!done && <Progress step={step} />}

          {done ? (
            <CompletionState />
          ) : step === 1 ? (
            <StepAccount
              showPwd={showPwd}
              setShowPwd={setShowPwd}
              pwd={pwd}
              setPwd={setPwd}
              pwdStrength={pwdStrength}
              strengthColors={strengthColors}
              strengthLabels={strengthLabels}
              onNext={() => setStep(2)}
            />
          ) : step === 2 ? (
            <StepClinic onBack={() => setStep(1)} onNext={() => setStep(3)} />
          ) : (
            <StepChannel
              channel={channel}
              setChannel={setChannel}
              onBack={() => setStep(2)}
              onFinish={finish}
            />
          )}
        </div>

        {!done && (
          <p className="text-[#4A4A6A] text-[11px] text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#7B5CFC] hover:text-[#9B84FF]">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const labels = ["Account", "Your Clinic", "Connect"];
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        {[1, 2, 3].map((n, i) => {
          const completed = step > n;
          const active = step === n;
          return (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  completed
                    ? "bg-[#22C55E] text-white"
                    : active
                    ? "bg-[#7B5CFC] text-white"
                    : "bg-[#1C1C34] text-[#4A4A6A]"
                }`}
              >
                {completed ? <Check size={12} /> : n}
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-px mx-2 ${
                    step > n ? "bg-[#22C55E]" : "bg-[#1C1C34]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-2">
        {labels.map((l, i) => (
          <div
            key={l}
            className={`text-[10px] font-medium flex-1 last:flex-none ${
              step === i + 1 ? "text-white" : "text-[#4A4A6A]"
            }`}
            style={{ width: i < 2 ? undefined : "auto" }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls =
  "bg-[#06060F] border border-[#1C1C34] rounded-xl h-11 w-full px-4 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60 focus:ring-1 focus:ring-[#7B5CFC]/20 transition-colors";
const labelCls = "block text-[#8B8FA8] text-xs font-medium mb-1.5";

function StepAccount({
  showPwd,
  setShowPwd,
  pwd,
  setPwd,
  pwdStrength,
  strengthColors,
  strengthLabels,
  onNext,
}: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (pwd !== confirmPwd) {
      setError("Passwords do not match");
      return;
    }
    if (!agree) {
      setError("Please accept the Terms of Service to continue");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password: pwd,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { first_name: firstName, last_name: lastName },
      },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    onNext();
  };

  return (
    <>
      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-white mb-1">
        Create your account
      </h2>
      <p className="text-[#4A4A6A] text-sm mb-6">
        14-day free trial · No credit card needed
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>First Name</label>
            <input className={inputCls} placeholder="Ahmad" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div>
            <label className={labelCls}>Last Name</label>
            <input className={inputCls} placeholder="Khan" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input type="email" className={inputCls} placeholder="you@clinic.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Password</label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className={inputCls + " pr-10"}
              placeholder="••••••••"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v: boolean) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A6A] hover:text-white"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {pwd && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-1.5 rounded-full"
                    style={{
                      background:
                        i < pwdStrength
                          ? strengthColors[pwdStrength - 1]
                          : "#1C1C34",
                    }}
                  />
                ))}
              </div>
              {pwdStrength > 0 && (
                <p
                  className="text-[10px] mt-1"
                  style={{ color: strengthColors[pwdStrength - 1] }}
                >
                  {strengthLabels[pwdStrength - 1]}
                </p>
              )}
            </div>
          )}
        </div>
        <div>
          <label className={labelCls}>Confirm Password</label>
          <input type="password" className={inputCls} placeholder="••••••••" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} required />
        </div>

        <label className="flex items-start gap-2.5 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 w-4 h-4 bg-[#06060F] border border-[#1C1C34] rounded accent-[#7B5CFC]"
          />
          <span className="text-[#8B8FA8] text-xs leading-relaxed">
            I agree to the{" "}
            <a className="text-[#7B5CFC]">Terms of Service</a> and{" "}
            <a className="text-[#7B5CFC]">Privacy Policy</a>
          </span>
        </label>

        {error && (
          <div className="text-[#FF4D6D] text-xs bg-[#FF4D6D]/[0.08] border border-[#FF4D6D]/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-[#7B5CFC] hover:bg-[#6047DB] disabled:opacity-60 text-white text-sm font-semibold mt-4 transition-colors flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Creating account..." : "Continue"}
        </button>
      </form>
    </>
  );
}

const selectCls = inputCls + " appearance-none cursor-pointer";

function StepClinic({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <>
      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-white mb-1">
        Tell us about your clinic
      </h2>
      <p className="text-[#4A4A6A] text-sm mb-6">
        Helps us configure your AI for dental workflows
      </p>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div>
          <label className={labelCls}>Clinic Name</label>
          <input className={inputCls} placeholder="Dubai Smile Clinic" />
        </div>
        <div>
          <label className={labelCls}>Clinic Type</label>
          <select className={selectCls}>
            <option>Single Location Clinic</option>
            <option>Multi-Location Group</option>
            <option>Polyclinic</option>
            <option>Dental Center</option>
            <option>Solo Practitioner</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Country</label>
            <select className={selectCls} defaultValue="UAE">
              <option>UAE</option>
              <option>KSA</option>
              <option>Kuwait</option>
              <option>Qatar</option>
              <option>Bahrain</option>
              <option>Oman</option>
              <option>Egypt</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>City</label>
            <input className={inputCls} placeholder="Dubai" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Team Size</label>
          <select className={selectCls}>
            <option>1–5 staff</option>
            <option>6–15 staff</option>
            <option>16–30 staff</option>
            <option>30+ staff</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <div className="flex gap-2">
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl h-11 px-4 flex items-center text-white text-sm">
              +971
            </div>
            <input className={inputCls} placeholder="50 123 4567" />
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="h-11 px-5 rounded-xl text-[#8B8FA8] hover:text-white text-sm font-medium"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="flex-1 h-11 rounded-xl bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

function StepChannel({
  channel,
  setChannel,
  onBack,
  onFinish,
}: {
  channel: string | null;
  setChannel: (c: string) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  const channels = [
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      desc: "Connect your clinic's WhatsApp number",
      icon: MessageCircle,
      color: "#25D366",
      badge: "Most popular",
    },
    {
      id: "voice",
      name: "AI Voice Receptionist",
      desc: "Connect your clinic phone via Vapi.ai",
      icon: Phone,
      color: "#7B5CFC",
    },
    {
      id: "sms",
      name: "SMS Messaging",
      desc: "Send and receive SMS via Twilio",
      icon: MessageSquare,
      color: "#3B82F6",
    },
  ];
  return (
    <>
      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-white mb-1">
        Connect your first channel
      </h2>
      <p className="text-[#4A4A6A] text-sm mb-6">
        You can add more channels after setup
      </p>
      <div className="grid grid-cols-1 gap-3">
        {channels.map((c) => {
          const Icon = c.icon;
          const selected = channel === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setChannel(c.id)}
              className={`text-left rounded-xl p-4 transition-all flex items-center gap-4 border ${
                selected
                  ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]"
                  : "border-[#1C1C34] bg-[#06060F] hover:border-[#7B5CFC]/40"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: c.color + "22" }}
              >
                <Icon size={18} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold">
                    {c.name}
                  </span>
                  {c.badge && (
                    <span className="text-[9px] uppercase tracking-wider bg-[#7B5CFC]/15 text-[#9B84FF] px-1.5 py-0.5 rounded">
                      {c.badge}
                    </span>
                  )}
                </div>
                <div className="text-[#4A4A6A] text-xs mt-0.5">{c.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[#4A4A6A] text-xs text-center mt-4 hover:text-white cursor-pointer">
        Skip for now → Set up later
      </p>

      <div className="flex justify-between gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-5 rounded-xl text-[#8B8FA8] hover:text-white text-sm font-medium"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="flex-1 h-11 rounded-xl bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold"
        >
          Finish Setup
        </button>
      </div>
    </>
  );
}

function CompletionState() {
  return (
    <div className="py-10 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center animate-pulse-glow">
        <Check size={24} className="text-white" />
      </div>
      <h2 className="text-white text-xl font-bold mt-4">You're all set!</h2>
      <p className="text-[#4A4A6A] text-sm mt-1">
        Redirecting to your dashboard...
      </p>
    </div>
  );
}
