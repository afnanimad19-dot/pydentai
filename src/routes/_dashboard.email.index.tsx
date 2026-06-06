import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, CheckCircle, Eye, FileText, List, Mail, Megaphone,
  MousePointer, RefreshCw, Send, Users, Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/")({ component: EmailDashboard });

const METRICS = [
  { icon: Send, c: "text-[#00D4AA]", v: "0", l: "Sent" },
  { icon: CheckCircle, c: "text-[#22C55E]", v: "0%", l: "Delivered" },
  { icon: Eye, c: "text-[#3B82F6]", v: "0%", l: "Open Rate" },
  { icon: MousePointer, c: "text-[#F59E0B]", v: "0%", l: "Click Rate" },
  { icon: Users, c: "text-[#7B5CFC]", v: "1", l: "Subscribers", sub: "Active", subColor: "text-[#22C55E]" },
  { icon: AlertTriangle, c: "text-[#FF4D6D]", v: "0.0%", l: "Bounce" },
  { icon: FileText, c: "text-[#8B8FA8]", v: "0", l: "Templates" },
  { icon: Zap, c: "text-[#F59E0B]", v: "0", l: "Automations" },
  { icon: Megaphone, c: "text-[#3B82F6]", v: "0", l: "Campaigns" },
  { icon: List, c: "text-[#00D4AA]", v: "1", l: "Lists", sub: "Active", subColor: "text-[#22C55E]" },
];

const TABS = ["Overview", "Campaigns", "Automations", "Funnel"];

function EmailDashboard() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/20 flex items-center justify-center">
            <Mail size={22} className="text-[#6366F1]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Command Center</h1>
              <span className="bg-[#F59E0B]/12 text-[#F59E0B] text-[10px] px-2.5 py-1 rounded-full">Setup</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Analytics · Campaigns · Automations</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Settings</button>
          <button className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold">+ New Campaign</button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map((m) => (
          <div key={m.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[130px]">
            <m.icon size={14} className={m.c} />
            <div className="text-white font-bold text-lg mt-1">{m.v}</div>
            <div className="text-[#8B8FA8] text-xs">{m.l}</div>
            {m.sub && <div className={`${m.subColor} text-[10px]`}>{m.sub}</div>}
          </div>
        ))}
      </div>

      <div className="px-6 flex gap-4 border-b border-[#1C1C34] mb-5 items-center">
        {TABS.map((t, i) => (
          <button key={t} className={i === 0 ? "px-1 pb-3 border-b-2 border-[#6366F1] text-white text-sm font-medium" : "px-1 pb-3 text-[#8B8FA8] text-sm hover:text-white"}>{t}</button>
        ))}
        <select className="ml-auto mb-2 h-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>7 Days</option></select>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center">
          <Mail size={56} className="text-[#1C1C34] mb-5" />
          <div className="text-white font-bold text-xl mb-2">No Email Data Yet</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-md mb-8">Send your first email campaign to see analytics, performance trends, and engagement metrics here.</p>
          <div className="flex gap-3">
            <button className="h-10 px-5 rounded-lg bg-[#6366F1] text-white text-sm font-semibold flex items-center gap-2"><Send size={14} /> Create Campaign</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><Users size={14} /> Add Contacts</button>
          </div>
        </div>
      </div>
    </div>
  );
}
