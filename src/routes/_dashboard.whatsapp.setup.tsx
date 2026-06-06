import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Settings, RefreshCw, Phone, X, Eye, EyeOff, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/setup")({ component: Setup });

const TABS = ["Connected Numbers", "+ Add New Number", "Quick Actions"];

const STEPS = [
  { num: "1", title: "Meta Business Manager", desc: "Sign up and verify your business" },
  { num: "2", title: "WhatsApp Business API", desc: "Apply for cloud API access" },
  { num: "3", title: "Connect & Verify", desc: "Add your number and verify webhook" },
];

function Setup() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [creds, setCreds] = useState({ phoneId: "", token: "", verifyToken: "" });
  const [showSecret, setShowSecret] = useState({ phoneId: false, token: false, verifyToken: false });
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  const webhook = "https://pydent.ai/api/webhooks/whatsapp";

  const verify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); }, 2000);
  };

  const reset = () => {
    setOpen(false); setStep(1); setVerifying(false); setVerified(false);
    setPhone(""); setCreds({ phoneId: "", token: "", verifyToken: "" });
  };

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#8B8FA8]/15 flex items-center justify-center">
            <Settings size={22} className="text-[#8B8FA8]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Business</h1>
            <p className="text-[#4A4A6A] text-sm">Manage connected numbers, AI agents, and messaging settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Sync from Settings</button>
          <button onClick={() => setOpen(true)} className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Add Number</button>
        </div>
      </div>

      <div className="px-6 mb-5">
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1 w-fit">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === i ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8] hover:text-white"}`}>{t}</button>
          ))}
        </div>
      </div>

      {tab === 0 && (
        <div className="px-6 pb-6">
          <div className="bg-[#0B0B1A] border-2 border-dashed border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-6">
              <Phone size={36} className="text-[#22C55E]/50" />
            </div>
            <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">No Numbers Connected</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-xs mb-8">Connect your first WhatsApp Business number to start receiving messages</div>
            <button onClick={() => setOpen(true)} className="h-11 px-6 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Connect WhatsApp Number</button>

            <div className="flex gap-6 mt-8 pt-8 border-t border-[#1C1C34] justify-center w-full">
              {STEPS.map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-bold flex items-center justify-center">{s.num}</div>
                  <div className="text-white text-xs font-semibold">{s.title}</div>
                  <div className="text-[#4A4A6A] text-[11px] max-w-[120px]">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="px-6 pb-6">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
            <div className="text-white font-semibold text-[15px] mb-4">Connect WhatsApp Business Number</div>
            <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Launch Setup Wizard</button>
          </div>
        </div>
      )}

      {tab === 2 && (
        <div className="px-6 pb-6">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-8 text-center text-[#4A4A6A]">Quick actions coming soon</div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={reset}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
              <h2 className="text-white font-semibold text-base">Setup Wizard — Step {step} of 3</h2>
              <button onClick={reset} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {step === 1 && (
                <>
                  <label className="text-[#8B8FA8] text-xs uppercase block">Business Phone Number</label>
                  <div className="flex">
                    <span className="h-10 px-3 bg-[#0B0B1A] border border-[#1E1E2E] border-r-0 rounded-l-lg flex items-center text-[#8B8FA8] text-sm">+971</span>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="50 123 4567" className="flex-1 h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-r-lg px-3 text-white text-sm" />
                  </div>
                  <button onClick={() => { toast.success("Code sent"); setStep(2); }} className="w-full h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Send Verification Code</button>
                </>
              )}

              {step === 2 && (
                <>
                  {(["phoneId", "token", "verifyToken"] as const).map((k) => (
                    <div key={k}>
                      <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">
                        {k === "phoneId" ? "Phone Number ID" : k === "token" ? "Permanent Access Token" : "Webhook Verify Token"}
                      </label>
                      <div className="relative">
                        <input
                          type={showSecret[k] ? "text" : "password"}
                          value={creds[k]}
                          onChange={(e) => setCreds({ ...creds, [k]: e.target.value })}
                          className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 pr-10 text-white text-sm"
                        />
                        <button onClick={() => setShowSecret({ ...showSecret, [k]: !showSecret[k] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8FA8]">
                          {showSecret[k] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  {verified ? (
                    <div className="flex items-center gap-2 text-[#22C55E] text-sm">
                      <Check size={16} /> Connected successfully
                    </div>
                  ) : (
                    <button onClick={verify} disabled={verifying} className="w-full h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
                      {verifying && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                      {verifying ? "Verifying..." : "Verify Connection"}
                    </button>
                  )}
                  {verified && (
                    <button onClick={() => setStep(3)} className="w-full h-10 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Continue →</button>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <label className="text-[#8B8FA8] text-xs uppercase block">Webhook URL</label>
                  <div className="flex">
                    <input readOnly value={webhook} className="flex-1 h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-l-lg px-3 text-white text-sm" />
                    <button onClick={() => { navigator.clipboard.writeText(webhook); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="h-10 px-3 bg-[#1C1C34] border border-[#1E1E2E] border-l-0 rounded-r-lg text-white">
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <button onClick={() => { toast.success("✓ Setup complete"); reset(); }} className="w-full h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Finish Setup</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
