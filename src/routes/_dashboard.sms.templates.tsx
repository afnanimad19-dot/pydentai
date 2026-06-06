import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, Clock, FileText, Search, Users, Zap } from "lucide-react";
import { SMSCampaignModal, SMSTemplateModal } from "@/components/sms/SmsModals";

export const Route = createFileRoute("/_dashboard/sms/templates")({ component: SmsTemplates });

const METRICS = [
  ["Templates", "0", "0 categories"], ["Total Usage", "0", "All time"],
  ["Avg Chars", "0", "~0 seg"], ["Variables", "0", "Dynamic fields"],
  ["Segments", "0", "Across all"], ["General", "0", ""],
  ["Promotional", "0", ""], ["Transactional", "0", ""],
] as const;

const CATS = ["All", "General", "Promotional", "Transactional", "Reminders", "Onboarding", "Support"];

const STARTERS = [
  { icon: Clock, color: "text-[#00D4AA]", cat: "reminders", catColor: "text-[#00D4AA]", name: "Appointment Reminder", msg: "Hi {{name}}, this is a reminder for your appointment on {{date}} at {{time}}. Reply YES to confirm or call us to reschedule." },
  { icon: CheckCircle, color: "text-[#22C55E]", cat: "transactional", catColor: "text-[#22C55E]", name: "Order Confirmation", msg: "Thank you for your order #{{order_id}}! Your items will be shipped within 2-3 business days. Track at: {{link}}" },
  { icon: Zap, color: "text-[#F59E0B]", cat: "promotional", catColor: "text-[#F59E0B]", name: "Flash Sale", msg: "🔥 FLASH SALE! Get {{discount}}% off everything for the next 24 hours. Shop now: {{link}} Reply STOP to opt out." },
  { icon: Users, color: "text-[#3B82F6]", cat: "onboarding", catColor: "text-[#3B82F6]", name: "Welcome Message", msg: "Welcome to {{company}}, {{name}}! We're excited to have you. Reply HELP for assistance or visit {{link}} to get started." },
];

function SmsTemplates() {
  const [tplOpen, setTplOpen] = useState(false);
  const [campOpen, setCampOpen] = useState(false);
  const [prefill, setPrefill] = useState("");
  const useStarter = (msg: string) => { setPrefill(msg); setCampOpen(true); };
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
            <FileText size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Templates</h1>
            <p className="text-[#4A4A6A] text-sm">0 templates · 0 categories</p>
          </div>
        </div>
        <button onClick={() => setTplOpen(true)} className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ New Template</button>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map(([l, v, sub]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 text-center min-w-[120px]">
            <div className="text-white font-bold text-xl">{v}</div>
            <div className="text-[#8B8FA8] text-xs">{l}</div>
            {sub && <div className="text-[#4A4A6A] text-[10px]">{sub}</div>}
          </div>
        ))}
      </div>

      <div className="px-6 mb-3 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search templates..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#3B82F6]/40" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>All Categories</option></select>
        <div className="ml-auto text-[#4A4A6A] text-xs">0 results</div>
      </div>

      <div className="px-6 mb-4 flex gap-1">
        {CATS.map((c, i) => (
          <button key={c} className={i === 0
            ? "bg-[#3B82F6]/12 text-[#3B82F6] border border-[#3B82F6]/20 px-3 py-1 text-xs rounded-full"
            : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{c} 0</button>
        ))}
      </div>

      <div className="px-6 mb-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-16 flex flex-col items-center">
          <FileText size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No templates found</div>
          <div className="text-[#4A4A6A] text-sm mb-8">Create your first template or try a different filter</div>
          <button onClick={() => setTplOpen(true)} className="h-10 px-5 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">+ Create Template</button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-4">Starter Templates</div>
        <div className="grid grid-cols-4 gap-4">
          {STARTERS.map((s) => (
            <div key={s.name} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 hover:border-[#3B82F6]/30 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center">
                  <s.icon size={14} className={s.color} />
                </div>
                <span className={`${s.catColor} text-[10px] uppercase`}>{s.cat}</span>
              </div>
              <div className="text-white text-sm font-semibold mb-2">{s.name}</div>
              <p className="text-[#4A4A6A] text-xs leading-relaxed line-clamp-3 font-mono mb-4">{s.msg}</p>
              <button onClick={() => useStarter(s.msg)} className="w-full h-8 text-xs border border-[#1C1C34] hover:border-[#3B82F6]/40 text-[#8B8FA8] rounded-lg">Use Template</button>
            </div>
          ))}
        </div>
      </div>
      <SMSTemplateModal open={tplOpen} onClose={() => setTplOpen(false)} />
      <SMSCampaignModal open={campOpen} onClose={() => setCampOpen(false)} initialMessage={prefill} />
    </div>
  );
}
