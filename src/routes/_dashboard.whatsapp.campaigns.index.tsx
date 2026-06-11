import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Send, CheckCircle, Eye, Reply, Search, Megaphone, X, Phone, Video,
} from "lucide-react";

type CampaignSearch = { action?: string };

export const Route = createFileRoute("/_dashboard/whatsapp/campaigns/")({
  component: Campaigns,
  validateSearch: (s: Record<string, unknown>): CampaignSearch => ({
    action: typeof s.action === "string" ? s.action : undefined,
  }),
});

const STATS = [
  { icon: Send, color: "text-[#22C55E]", value: "0", label: "Total Campaigns" },
  { icon: CheckCircle, color: "text-[#00D4AA]", value: "0", label: "Sent" },
  { icon: Eye, color: "text-[#3B82F6]", value: "0.0%", label: "Avg Open Rate" },
  { icon: Reply, color: "text-[#7B5CFC]", value: "0.0%", label: "Avg Reply Rate" },
];

const FILTERS = ["All", "Draft", "Scheduled", "Sending", "Completed", "Failed"];
const TYPES = [
  { id: "marketing", label: "Marketing", rate: "Avg open: 38%" },
  { id: "utility", label: "Utility", rate: "Avg open: 72%" },
  { id: "broadcast", label: "Broadcast", rate: "Avg open: 45%" },
];
const GROUPS = ["New Leads", "Qualified", "VIP", "Re-engagement"];
const VARS = ["{{name}}", "{{clinic}}", "{{date}}", "{{time}}"];

type Campaign = { id: string; name: string; type: string; status: string; created: string; body?: string; audience?: string; scheduleAt?: string; sent?: number; delivered?: number; failed?: number; openRate?: number };

function Campaigns() {
  const search = useSearch({ from: Route.id });
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [filter, setFilter] = useState("All");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);


  // step 1
  const [name, setName] = useState("");
  const [type, setType] = useState("marketing");
  const [desc, setDesc] = useState("");
  // step 2
  const [body, setBody] = useState("Hi {{name}}, your appointment at {{clinic}} is on {{date}} at {{time}}.");
  // step 3
  const [audience, setAudience] = useState("all");
  const [groups, setGroups] = useState<string[]>([]);
  const [scheduleMode, setScheduleMode] = useState("now");
  const [scheduleAt, setScheduleAt] = useState("");

  useEffect(() => {
    if (search.action === "new") {
      setShowWizard(true);
      setStep(1);
    }
  }, [search.action]);

  const close = () => { setShowWizard(false); setStep(1); };

  const preview = body
    .replace(/{{name}}/g, "Ahmed")
    .replace(/{{clinic}}/g, "Smile Zone Dental")
    .replace(/{{date}}/g, "Thu, Jun 12")
    .replace(/{{time}}/g, "3:00 PM");

  const insertVar = (v: string) => setBody((b) => b + " " + v);

  const create = () => {
    if (!name.trim()) { toast.error("Campaign name required"); setStep(1); return; }
    setCampaigns((c) => [
      { id: crypto.randomUUID(), name, type, status: "Draft", created: "just now", body, audience, scheduleAt, sent: 0, delivered: 0, failed: 0, openRate: 0 },
      ...c,
    ]);
    toast.success("✓ Campaign created");
    close();
    setName(""); setDesc(""); setBody("Hi {{name}}, your appointment at {{clinic}} is on {{date}} at {{time}}.");
    setAudience("all"); setGroups([]); setScheduleMode("now"); setScheduleAt("");
  };

  const updateCampaign = (id: string, patch: Partial<Campaign>) => setCampaigns((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const selectedCampaign = campaigns.find((c) => c.id === selectedId) || null;


  const filtered = filter === "All" ? campaigns : campaigns.filter((c) => c.status === filter);

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/20 flex items-center justify-center">
            <Send size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Campaigns</h1>
            <p className="text-[#4A4A6A] text-sm">Create and manage WhatsApp broadcast campaigns</p>
          </div>
        </div>
        <button onClick={() => { setShowWizard(true); setStep(1); }} className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ New Campaign</button>
      </div>

      <div className="px-6 mb-5 grid grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-3">
            <s.icon size={18} className={s.color} />
            <div>
              <div className="text-white font-bold text-xl">{s.value}</div>
              <div className="text-[#4A4A6A] text-xs">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search campaigns..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#22C55E]/40" />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f
                ? "bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1.5 text-xs rounded-full font-medium"
                : "bg-[#0B0B1A] border border-[#1C1C34] text-[#4A4A6A] hover:text-white text-xs px-3 py-1.5 rounded-full"}
            >{f}</button>
          ))}
        </div>
        <div className="ml-auto">
          <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>Sort: Newest</option></select>
        </div>
      </div>

      <div className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
            <Megaphone size={48} className="text-[#1C1C34] mb-4" />
            <div className="text-white text-lg font-semibold mb-2">No campaigns yet</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Create your first WhatsApp broadcast campaign to reach your patients at scale.</div>
            <button onClick={() => { setShowWizard(true); setStep(1); }} className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Create Campaign</button>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl divide-y divide-[#1C1C34]">
            {filtered.map((c) => (
              <div key={c.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-semibold">{c.name}</div>
                  <div className="text-[#4A4A6A] text-xs">{c.type} · {c.created}</div>
                </div>
                <span className="bg-[#8B8FA8]/12 text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">{c.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showWizard && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={close}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
              <div>
                <h2 className="text-white font-semibold text-base">Create New Campaign</h2>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= n ? "bg-[#22C55E] text-white" : "bg-[#0B0B1A] text-[#4A4A6A] border border-[#1E1E2E]"}`}>{n}</span>
                      <span className={`text-xs ${step === n ? "text-white" : "text-[#4A4A6A]"}`}>
                        {n === 1 ? "Setup" : n === 2 ? "Content" : "Audience"}
                      </span>
                      {n < 3 && <span className="w-8 h-px bg-[#1E1E2E]" />}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={close} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Campaign Name *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40" placeholder="June Promo – New Leads" />
                  </div>
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase mb-2 block">Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {TYPES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setType(t.id)}
                          className={`text-left rounded-xl border p-4 transition-all ${type === t.id ? "border-[#22C55E] bg-[#22C55E]/8" : "border-[#1E1E2E] bg-[#0B0B1A] hover:border-[#22C55E]/30"}`}
                        >
                          <div className="text-white text-sm font-semibold">{t.label}</div>
                          <div className="text-[#4A4A6A] text-[11px] mt-1">{t.rate}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Description</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="w-full bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40 resize-none" placeholder="Optional notes about this campaign..." />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <div className="text-[#8B8FA8] text-xs uppercase">Message Body</div>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} className="w-full bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40 resize-none" />
                    <div className="flex flex-wrap gap-2">
                      {VARS.map((v) => (
                        <button key={v} onClick={() => insertVar(v)} className="bg-[#7B5CFC]/12 text-[#9B84FF] border border-[#7B5CFC]/20 text-xs px-3 py-1 rounded-full hover:bg-[#7B5CFC]/20">{v}</button>
                      ))}
                    </div>
                    <div className="text-[#4A4A6A] text-xs">{body.length} chars · ~{Math.ceil(body.length / 160)} segment(s)</div>
                  </div>
                  <div>
                    <div className="text-[#8B8FA8] text-xs uppercase mb-2">Live Preview</div>
                    <div className="bg-[#0B0B1A] border border-[#1E1E2E] rounded-3xl p-3">
                      <div className="bg-[#0E5C36] text-white rounded-t-2xl px-4 py-2 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">YC</div>
                        <div className="flex-1 text-sm font-semibold">Your Clinic</div>
                        <Phone size={14} /> <Video size={14} />
                      </div>
                      <div className="bg-[#0c1a14] min-h-[280px] p-3 rounded-b-2xl">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                          <div className="text-sm text-gray-800 whitespace-pre-wrap">{preview}</div>
                          <div className="text-[10px] text-gray-500 text-right mt-1">10:24 AM ✓✓</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Audience</label>
                    <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40">
                      <option value="all">All Contacts</option>
                      <option value="group">Specific Group</option>
                      <option value="individual">Individual</option>
                    </select>
                  </div>
                  {audience === "group" && (
                    <div>
                      <label className="text-[#8B8FA8] text-xs uppercase mb-2 block">Select Groups</label>
                      <div className="flex flex-wrap gap-2">
                        {GROUPS.map((g) => {
                          const on = groups.includes(g);
                          return (
                            <button key={g} onClick={() => setGroups((s) => on ? s.filter((x) => x !== g) : [...s, g])} className={`text-xs px-3 py-1.5 rounded-full border ${on ? "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/30" : "bg-[#0B0B1A] text-[#8B8FA8] border-[#1E1E2E]"}`}>{g}</button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-[#8B8FA8] text-xs uppercase mb-2 block">Schedule</label>
                    <div className="flex gap-3">
                      <button onClick={() => setScheduleMode("now")} className={`flex-1 h-10 rounded-lg border text-sm ${scheduleMode === "now" ? "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/30" : "bg-[#0B0B1A] text-[#8B8FA8] border-[#1E1E2E]"}`}>Send Now</button>
                      <button onClick={() => setScheduleMode("later")} className={`flex-1 h-10 rounded-lg border text-sm ${scheduleMode === "later" ? "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/30" : "bg-[#0B0B1A] text-[#8B8FA8] border-[#1E1E2E]"}`}>Schedule for Later</button>
                    </div>
                    {scheduleMode === "later" && (
                      <input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} className="mt-3 w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40" />
                    )}
                  </div>
                  <div className="bg-[#0B0B1A] border border-[#1E1E2E] rounded-xl px-4 py-3 text-[#8B8FA8] text-xs">
                    ~320 recipients · Est. 4 min to send · AED 0.15 estimated
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-between">
              {step > 1 ? (
                <button onClick={() => setStep((s) => s - 1)} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">← Back</button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={() => setStep((s) => s + 1)} className="h-9 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Next →</button>
              ) : (
                <button onClick={create} className="h-9 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Create Campaign</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
