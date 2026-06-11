import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle, Clock, FileText, Search, Users, Zap } from "lucide-react";
import { SMSCampaignModal, SMSTemplateModal } from "@/components/sms/SmsModals";

export const Route = createFileRoute("/_dashboard/sms/templates")({ component: SmsTemplates });

const CATS = ["All", "General", "Promotional", "Transactional", "Reminders", "Onboarding", "Support"] as const;

const STARTERS = [
  { icon: Clock, color: "text-[#00D4AA]", cat: "Reminders", catColor: "text-[#00D4AA]", name: "Appointment Reminder", msg: "Hi {{name}}, this is a reminder for your appointment on {{date}} at {{time}}. Reply YES to confirm or call us to reschedule." },
  { icon: CheckCircle, color: "text-[#22C55E]", cat: "Transactional", catColor: "text-[#22C55E]", name: "Order Confirmation", msg: "Thank you for your order #{{order_id}}! Your items will be shipped within 2-3 business days. Track at: {{link}}" },
  { icon: Zap, color: "text-[#F59E0B]", cat: "Promotional", catColor: "text-[#F59E0B]", name: "Flash Sale", msg: "🔥 FLASH SALE! Get {{discount}}% off everything for the next 24 hours. Shop now: {{link}} Reply STOP to opt out." },
  { icon: Users, color: "text-[#3B82F6]", cat: "Onboarding", catColor: "text-[#3B82F6]", name: "Welcome Message", msg: "Welcome to {{company}}, {{name}}! We're excited to have you. Reply HELP for assistance or visit {{link}} to get started." },
];

type Tpl = { id: string; name: string; category: string; body: string };

const countVars = (s: string) => (s.match(/\{\{\w+\}\}/g) ?? []).length;

function SmsTemplates() {
  const [tplOpen, setTplOpen] = useState(false);
  const [campOpen, setCampOpen] = useState(false);
  const [prefill, setPrefill] = useState("");
  const [templates, setTemplates] = useState<Tpl[]>([]);
  const [filter, setFilter] = useState<(typeof CATS)[number]>("All");
  const [search, setSearch] = useState("");

  const useStarter = (msg: string) => { setPrefill(msg); setCampOpen(true); };

  const filtered = useMemo(() => {
    let r = templates;
    if (filter !== "All") r = r.filter((t) => t.category === filter);
    if (search) r = r.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
    return r;
  }, [templates, filter, search]);

  const totalChars = templates.reduce((s, t) => s + t.body.length, 0);
  const totalVars = templates.reduce((s, t) => s + countVars(t.body), 0);
  const totalSegs = templates.reduce((s, t) => s + Math.max(1, Math.ceil(t.body.length / 160)), 0);
  const byCat = (c: string) => templates.filter((t) => t.category === c).length;

  const METRICS: [string, number | string, string][] = [
    ["Templates", templates.length, "0 categories"],
    ["Total Usage", 0, "All time"],
    ["Avg Chars", templates.length ? Math.round(totalChars / templates.length) : 0, ""],
    ["Variables", totalVars, "Dynamic fields"],
    ["Segments", totalSegs, "Across all"],
    ["General", byCat("General"), ""],
    ["Promotional", byCat("Promotional"), ""],
    ["Transactional", byCat("Transactional"), ""],
  ];

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
            <FileText size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Templates</h1>
            <p className="text-[#4A4A6A] text-sm">{templates.length} templates · {new Set(templates.map((t) => t.category)).size} categories</p>
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
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#3B82F6]/40" />
        </div>
        <div className="ml-auto text-[#4A4A6A] text-xs">{filtered.length} results</div>
      </div>

      <div className="px-6 mb-4 flex gap-1 flex-wrap">
        {CATS.map((c) => {
          const count = c === "All" ? templates.length : byCat(c);
          const active = filter === c;
          return (
            <button key={c} onClick={() => setFilter(c)} className={active
              ? "bg-[#3B82F6]/12 text-[#3B82F6] border border-[#3B82F6]/20 px-3 py-1 text-xs rounded-full"
              : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{c} {count}</button>
          );
        })}
      </div>

      <div className="px-6 mb-5">
        {filtered.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-16 flex flex-col items-center">
            <FileText size={48} className="text-[#1C1C34] mb-4" />
            <div className="text-white text-lg font-semibold mb-2">No templates found</div>
            <div className="text-[#4A4A6A] text-sm mb-8">Create your first template or try a different filter</div>
            <button onClick={() => setTplOpen(true)} className="h-10 px-5 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">+ Create Template</button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {filtered.map((t) => (
              <div key={t.id} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <div className="text-[#3B82F6] text-[10px] uppercase mb-2">{t.category}</div>
                <div className="text-white text-sm font-semibold mb-2">{t.name}</div>
                <p className="text-[#4A4A6A] text-xs leading-relaxed line-clamp-3 font-mono mb-4">{t.body}</p>
                <button onClick={() => useStarter(t.body)} className="w-full h-8 text-xs border border-[#1C1C34] hover:border-[#3B82F6]/40 text-[#8B8FA8] rounded-lg">Use Template</button>
              </div>
            ))}
          </div>
        )}
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
      <SMSTemplateModal open={tplOpen} onClose={() => setTplOpen(false)} onSave={(t) => setTemplates((p) => [{ id: crypto.randomUUID(), ...t }, ...p])} />
      <SMSCampaignModal open={campOpen} onClose={() => setCampOpen(false)} initialMessage={prefill} />
    </div>
  );
}
