import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart, Check, Circle, Mail, RefreshCw, Settings, Shield } from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/setup")({ component: EmailSetup });

const CHECKLIST: Array<[number, string, boolean]> = [
  [1, "Create Contact List", true],
  [2, "Add Email Provider", false],
  [3, "Verify Domain", false],
  [4, "Configure DNS", false],
  [5, "Send Test Email", false],
];

function EmailSetup() {
  const [tab, setTab] = useState<"general" | "providers" | "dns" | "sending" | "compliance">("general");
  const [opens, setOpens] = useState(true);
  const [clicks, setClicks] = useState(true);
  const [unsub, setUnsub] = useState(true);
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#8B8FA8]/15 flex items-center justify-center">
            <Settings size={22} className="text-[#8B8FA8]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Setup</h1>
            <p className="text-[#4A4A6A] text-sm">Configure your email provider, domain authentication, and sending settings</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-4 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">Save Settings</button>
        </div>
      </div>

      <div className="px-6 mb-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white font-semibold text-sm">Setup Progress</div>
            <div className="text-[#4A4A6A] text-xs">1 of 5</div>
          </div>
          <div className="h-2 bg-[#1C1C34] rounded-full"><div className="h-full bg-[#6366F1] rounded-full" style={{ width: "20%" }} /></div>
          <div className="flex gap-4 flex-wrap mt-4">
            {CHECKLIST.map(([n, label, done]) => (
              <div key={n} className="flex items-center gap-2">
                {done ? <Check size={16} className="text-[#22C55E]" /> : <Circle size={16} className="text-[#1C1C34]" />}
                <span className={`text-sm ${done ? "text-white" : "text-[#4A4A6A]"}`}>{n}. {label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mb-5 flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1 w-fit">
        {[["general", "General"], ["providers", "Providers"], ["dns", "Domain Auth"], ["sending", "Sending"], ["compliance", "Compliance"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k as typeof tab)} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === k ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8] hover:text-white"}`}>{l}</button>
        ))}
      </div>

      {tab === "general" && (
        <div className="px-6 space-y-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Mail size={14} className="text-[#6366F1]" /><span className="text-white font-semibold text-sm">Sender Identity</span></div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Default From Email</label>
                <input placeholder="noreply@yourdomain.com" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Default From Name</label>
                <input placeholder="Dubai Smile Clinic" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              </div>
            </div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Reply-To Email</label>
            <input placeholder="support@yourdomain.com" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><BarChart size={14} className="text-[#F59E0B]" /><span className="text-white font-semibold text-sm">Tracking & Analytics</span></div>
            {[
              ["Track Opens", "Monitor email open rates", opens, setOpens],
              ["Track Clicks", "Monitor link click rates", clicks, setClicks],
            ].map(([l, d, v, set], i) => (
              <div key={l as string} className={`flex justify-between items-center py-3 ${i < 1 ? "border-b border-[#1C1C34]" : ""}`}>
                <div>
                  <div className="text-white text-sm font-medium">{l as string}</div>
                  <div className="text-[#4A4A6A] text-xs mt-0.5">{d as string}</div>
                </div>
                <button onClick={() => (set as (v: boolean) => void)(!v)} className={`w-10 h-5 rounded-full relative transition-colors ${v ? "bg-[#6366F1]" : "bg-[#1C1C34]"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${v ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Shield size={14} className="text-[#22C55E]" /><span className="text-white font-semibold text-sm">Compliance</span></div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-white text-sm font-medium">Unsubscribe Footer</div>
              <button onClick={() => setUnsub(!unsub)} className={`w-10 h-5 rounded-full relative ${unsub ? "bg-[#6366F1]" : "bg-[#1C1C34]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${unsub ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
            <textarea defaultValue="You are receiving this email because you opted in via our website. To unsubscribe, click here." className="w-full min-h-[60px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 text-[#8B8FA8] text-xs" />
          </div>
        </div>
      )}

      {tab !== "general" && (
        <div className="px-6">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-16 flex flex-col items-center text-center">
            <Settings size={40} className="text-[#1C1C34] mb-3" />
            <div className="text-white text-lg font-semibold mb-1 capitalize">{tab}</div>
            <div className="text-[#4A4A6A] text-sm max-w-sm">Configure {tab} settings here.</div>
          </div>
        </div>
      )}
    </div>
  );
}
