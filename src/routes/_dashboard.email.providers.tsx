import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle, BookOpen, CheckCircle, Clock, Heart, RefreshCw, Server,
  Shield, Sparkles, TrendingUp, X, Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/providers")({ component: EmailProviders });

const METRICS = [
  { icon: Server, c: "text-[#F59E0B]", v: "0", l: "Providers", sub: "0 active" },
  { icon: Zap, c: "text-[#00D4AA]", v: "0", l: "Sent" },
  { icon: CheckCircle, c: "text-[#22C55E]", v: "0", l: "Delivered" },
  { icon: TrendingUp, c: "text-[#3B82F6]", v: "0%", l: "Deliverability" },
  { icon: Clock, c: "text-[#7B5CFC]", v: "—", l: "Uptime" },
  { icon: AlertTriangle, c: "text-[#FF4D6D]", v: "0%", l: "Bounce" },
  { icon: Heart, c: "text-[#8B8FA8]", v: "—", l: "Health" },
];

const PROVIDERS = [
  { name: "Resend", color: "text-[#00D4AA]", plan: "Free tier", letter: "R" },
  { name: "SendGrid", color: "text-[#3B82F6]", plan: "Most popular", letter: "S" },
  { name: "Mailgun", color: "text-[#FF4D6D]", plan: "Enterprise", letter: "M" },
  { name: "Amazon SES", color: "text-[#F59E0B]", plan: "Low cost", letter: "A" },
  { name: "Postmark", color: "text-[#F97316]", plan: "Transactional", letter: "P" },
  { name: "Custom SMTP", color: "text-[#8B8FA8]", plan: "Advanced", letter: "C" },
];

const TIPS = [
  "Configure SPF, DKIM, and DMARC for better deliverability",
  "Use multiple providers with failover for reliability",
  "Monitor bounce rates and remove invalid addresses regularly",
];

function EmailProviders() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState("Resend");
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
            <Server size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Infrastructure</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2.5 py-1 rounded-full">Enterprise</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Manage providers, DNS records, monitor deliverability & ensure reliable delivery</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><BookOpen size={14} /> Docs</button>
          <button onClick={() => setOpen(true)} className="h-9 px-4 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">+ Add Provider</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-7 gap-3">
        {METRICS.map((m) => (
          <div key={m.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
            <m.icon size={14} className={`${m.c} mx-auto`} />
            <div className="text-white font-bold text-lg mt-1">{m.v}</div>
            <div className="text-[#8B8FA8] text-[10px]">{m.l}</div>
            {m.sub && <div className="text-[#4A4A6A] text-[10px]">{m.sub}</div>}
          </div>
        ))}
      </div>

      <div className="px-6 flex gap-4 border-b border-[#1C1C34] mb-5">
        {["Providers 0", "Monitoring", "DNS & Auth", "Settings", "Activity Logs"].map((t, i) => (
          <button key={t} className={i === 0 ? "px-1 pb-3 border-b-2 border-[#6366F1] text-white text-sm font-medium" : "px-1 pb-3 text-[#8B8FA8] text-sm hover:text-white flex items-center gap-1.5"}>
            {i === 1 && <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />}
            {t}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <Server size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No Providers Configured</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Connect your first email provider to start sending campaigns with high deliverability</div>
          <div className="flex gap-3">
            <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">+ Add Provider</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><BookOpen size={14} /> View Guide</button>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#F59E0B]" />
            <span className="text-white text-sm font-semibold">Email Delivery Best Practices</span>
            <button className="ml-auto text-[#6366F1] text-xs">Guide →</button>
          </div>
          <div className="flex gap-8 mt-3 flex-wrap">
            {TIPS.map((t) => (
              <div key={t} className="flex items-start gap-2 max-w-xs">
                <CheckCircle size={14} className="text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span className="text-[#8B8FA8] text-xs">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[560px] w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6 my-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2"><Server size={16} className="text-[#6366F1]" /><span className="text-white font-semibold text-lg">Add Email Provider</span></div>
              <button onClick={() => setOpen(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {PROVIDERS.map((p) => (
                <button key={p.name} onClick={() => setSel(p.name)} className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${sel === p.name ? "border-[#6366F1] bg-[#6366F1]/[0.05]" : "border-[#1C1C34] bg-[#06060F] hover:border-[#6366F1]/40"}`}>
                  <div className={`w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center ${p.color} font-bold`}>{p.letter}</div>
                  <div className="text-white text-sm font-semibold">{p.name}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{p.plan}</div>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1.5"><label className="text-[#8B8FA8] text-xs uppercase">API Key</label><a className="text-[#6366F1] text-xs cursor-pointer">Get API Key</a></div>
                <input type="password" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              </div>
              <input placeholder="noreply@yourdomain.com" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              <input placeholder="Dubai Smile Clinic" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
                <div className="flex items-center gap-2"><Shield size={14} className="text-[#22C55E]" /><span className="text-white text-sm font-medium">DNS Records Required</span></div>
                <p className="text-[#4A4A6A] text-xs mt-1">After adding your provider, you'll need to configure SPF, DKIM, and DMARC records. We'll guide you through each step.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setOpen(false)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Cancel</button>
              <button className="h-9 px-4 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">Add Provider</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
