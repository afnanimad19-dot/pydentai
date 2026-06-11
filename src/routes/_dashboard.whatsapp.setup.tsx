import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Settings, RefreshCw, Phone, X, Eye, EyeOff, Copy, Check, Info, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/setup")({ component: Setup });

const TABS = ["Connected Numbers", "+ Add New Number", "Quick Actions"];

const STEPS = [
  { num: "1", title: "Meta Business Manager", desc: "Sign up and verify your business" },
  { num: "2", title: "WhatsApp Business API", desc: "Apply for cloud API access" },
  { num: "3", title: "Connect & Verify", desc: "Add your number and verify webhook" },
];

type ConnectedNumber = { id: string; phone: string; phoneId: string; connectedAt: string };

function Setup() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [creds, setCreds] = useState({ phoneId: "", token: "", verifyToken: "" });
  const [showSecret, setShowSecret] = useState({ phoneId: false, token: false, verifyToken: false });
  const [verifying, setVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [numbers, setNumbers] = useState<ConnectedNumber[]>([]);

  const webhook = "https://pydent.ai/api/webhooks/whatsapp";

  // Reset wizard state when opened
  useEffect(() => {
    if (open) {
      setStep(1); setPhone(""); setCreds({ phoneId: "", token: "", verifyToken: "" });
      setVerifying(false); setVerifyStatus("idle"); setHelpOpen(false);
    }
  }, [open]);

  const verify = () => {
    if (!creds.phoneId || !creds.token || !creds.verifyToken) { toast.error("All credentials required"); return; }
    setVerifying(true); setVerifyStatus("idle");
    setTimeout(() => {
      setVerifying(false);
      setVerifyStatus(Math.random() > 0.05 ? "success" : "error");
    }, 2000);
  };

  const finish = () => {
    setNumbers((n) => [...n, { id: crypto.randomUUID(), phone: `+971${phone}`, phoneId: creds.phoneId, connectedAt: "just now" }]);
    toast.success("✓ WhatsApp number connected");
    setOpen(false);
    setTab(0);
  };

  const copyTo = (key: string, val: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(() => setCopied(null), 1500); };

  const disconnect = (id: string) => { setNumbers((n) => n.filter((x) => x.id !== id)); toast.success("Number disconnected"); };

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
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center"><RefreshCw size={14} className="text-[#8B8FA8]" /></button>
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
          {numbers.length === 0 ? (
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
          ) : (
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl divide-y divide-[#1C1C34]">
              {numbers.map((n) => (
                <div key={n.id} className="px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#22C55E]/15 flex items-center justify-center"><Phone size={16} className="text-[#22C55E]" /></div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">{n.phone}</div>
                    <div className="text-[#4A4A6A] text-xs">Phone ID: {n.phoneId} · {n.connectedAt}</div>
                  </div>
                  <span className="bg-[#22C55E]/15 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">● Connected</span>
                  <button onClick={() => disconnect(n.id)} className="text-[#FF4D6D] text-xs hover:underline ml-2">Disconnect</button>
                </div>
              ))}
            </div>
          )}
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-[#1E1E2E] flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-base">Connect WhatsApp Number</h2>
                <div className="text-[#4A4A6A] text-xs mt-0.5">Step {step} of 3</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
            </div>

            {/* Step indicators */}
            <div className="px-6 pt-4 flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex-1 flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= n ? "bg-[#22C55E] text-white" : "bg-[#0B0B1A] text-[#4A4A6A] border border-[#1E1E2E]"}`}>{step > n ? "✓" : n}</span>
                  <div className={`flex-1 h-px ${step > n ? "bg-[#22C55E]" : "bg-[#1E1E2E]"}`} />
                </div>
              ))}
            </div>

            <div className="px-6 py-5 space-y-4">
              {step === 1 && (
                <>
                  <label className="text-[#8B8FA8] text-xs uppercase block">WhatsApp Business Phone Number</label>
                  <div className="flex">
                    <span className="h-10 px-3 bg-[#0B0B1A] border border-[#1E1E2E] border-r-0 rounded-l-lg flex items-center text-[#8B8FA8] text-sm">+971</span>
                    <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="50 123 4567" className="flex-1 h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-r-lg px-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40" />
                  </div>
                  <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg p-3 flex gap-2 text-[#3B82F6] text-xs">
                    <Info size={14} className="flex-shrink-0 mt-0.5" />
                    <span>This number must be registered on WhatsApp Business API.</span>
                  </div>
                  <button onClick={() => { if (!phone.trim()) { toast.error("Phone number required"); return; } setStep(2); }} className="w-full h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Continue</button>
                </>
              )}

              {step === 2 && (
                <>
                  {([
                    { k: "phoneId", label: "Phone Number ID", tip: "Found in Meta App → WhatsApp → API Setup" },
                    { k: "token", label: "Permanent Access Token", tip: "Generate a system user token with whatsapp_business_messaging scope" },
                    { k: "verifyToken", label: "Webhook Verify Token", tip: "Any string you choose; you'll paste this into Meta's webhook config" },
                  ] as const).map(({ k, label, tip }) => (
                    <div key={k}>
                      <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 flex items-center gap-1.5">
                        {label}
                        <span title={tip} className="text-[#4A4A6A] cursor-help"><Info size={11} /></span>
                      </label>
                      <div className="relative">
                        <input
                          type={showSecret[k] ? "text" : "password"}
                          value={creds[k]}
                          onChange={(e) => setCreds({ ...creds, [k]: e.target.value })}
                          className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 pr-10 text-white text-sm focus:outline-none focus:border-[#22C55E]/40"
                        />
                        <button onClick={() => setShowSecret({ ...showSecret, [k]: !showSecret[k] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8FA8]">
                          {showSecret[k] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}

                  <button onClick={() => setHelpOpen((v) => !v)} className="text-[#8B8FA8] text-xs flex items-center gap-1 hover:text-white">
                    <ChevronDown size={12} className={`transition-transform ${helpOpen ? "rotate-180" : ""}`} /> How to get these
                  </button>
                  {helpOpen && (
                    <div className="bg-[#06060F] border border-[#1E1E2E] rounded-lg p-3 text-[#8B8FA8] text-xs space-y-1.5">
                      <div>1. Open developers.facebook.com → your app → WhatsApp → API Setup.</div>
                      <div>2. Copy the Phone Number ID and Temporary access token (or generate a System User permanent token).</div>
                      <div>3. Set a Verify Token of your choice — you'll paste it into the webhook config next.</div>
                    </div>
                  )}

                  {verifyStatus === "success" ? (
                    <div className="flex items-center gap-2 text-[#22C55E] text-sm bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg p-3">
                      <Check size={16} /> Connected successfully
                    </div>
                  ) : verifyStatus === "error" ? (
                    <div className="bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 rounded-lg p-3 text-[#FF4D6D] text-sm">
                      Verification failed. Check your credentials and try again.
                    </div>
                  ) : null}

                  {verifyStatus !== "success" ? (
                    <button onClick={verify} disabled={verifying} className="w-full h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
                      {verifying && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                      {verifying ? "Verifying..." : "Verify Connection"}
                    </button>
                  ) : (
                    <button onClick={() => setStep(3)} className="w-full h-10 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">Continue →</button>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase block mb-1.5">Your Webhook URL</label>
                    <div className="flex">
                      <input readOnly value={webhook} className="flex-1 h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-l-lg px-3 text-white text-sm" />
                      <button onClick={() => copyTo("webhook", webhook)} className="h-10 px-3 bg-[#1C1C34] border border-[#1E1E2E] border-l-0 rounded-r-lg text-white flex items-center gap-1 text-xs">
                        {copied === "webhook" ? <Check size={14} /> : <Copy size={14} />} Copy
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase block mb-1.5">Verify Token</label>
                    <div className="flex">
                      <input readOnly value={creds.verifyToken} className="flex-1 h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-l-lg px-3 text-white text-sm" />
                      <button onClick={() => copyTo("vt", creds.verifyToken)} className="h-10 px-3 bg-[#1C1C34] border border-[#1E1E2E] border-l-0 rounded-r-lg text-white flex items-center gap-1 text-xs">
                        {copied === "vt" ? <Check size={14} /> : <Copy size={14} />} Copy
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg p-3 flex gap-2 text-[#3B82F6] text-xs">
                    <Info size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Paste these into Meta App → WhatsApp → Configuration → Webhook.</span>
                  </div>
                  <button onClick={finish} className="w-full h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Finish Setup</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
