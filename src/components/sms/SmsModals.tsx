import { useEffect, useRef, useState } from "react";
import { Hash, Lightbulb, MessageSquare, Search, X } from "lucide-react";
import { toast } from "sonner";

const VAR_CHIPS = ["name", "phone", "company", "link", "date", "discount"];
const TPL_VAR_CHIPS = ["name", "phone", "date", "time", "link", "company", "order_id", "discount"];
const GROUPS = ["New Leads", "Qualified", "VIP", "Customers"];
const TAGS = ["lead", "vip", "customer", "trial"];

const countVars = (s: string) => (s.match(/\{\{\w+\}\}/g) ?? []).length;

export function SMSCampaignModal({
  open, onClose, initialMessage = "", onCreate, schedule: scheduleProp = false,
}: {
  open: boolean; onClose: () => void; initialMessage?: string;
  onCreate?: (c: { name: string; status: string }) => void; schedule?: boolean;
}) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(initialMessage);
  const [audience, setAudience] = useState<"all" | "pick" | "groups" | "tags">("all");
  const [groups, setGroups] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<"now" | "later">(scheduleProp ? "later" : "now");
  const [when, setWhen] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setName(""); setMsg(initialMessage); setAudience("all");
      setGroups([]); setTags([]); setSchedule(scheduleProp ? "later" : "now"); setWhen("");
    }
  }, [open, initialMessage, scheduleProp]);

  if (!open) return null;
  const chars = msg.length;
  const segments = Math.max(1, Math.ceil(chars / 160));
  const vars = countVars(msg);
  const remaining = 160 - (chars % 160 || (chars === 0 ? 0 : 160));
  const recipients = audience === "all" ? 0 : audience === "groups" ? groups.length * 0 : audience === "tags" ? tags.length * 0 : 0;
  const readyName = name.trim().length > 0;
  const readyMsg = msg.trim().length > 0;

  const insertVar = (v: string) => {
    const token = `{{${v}}}`;
    const el = ref.current;
    if (!el) { setMsg(msg + token); return; }
    const s = el.selectionStart ?? msg.length;
    const e = el.selectionEnd ?? msg.length;
    setMsg(msg.slice(0, s) + token + msg.slice(e));
    setTimeout(() => { el.focus(); el.setSelectionRange(s + token.length, s + token.length); }, 0);
  };

  const create = () => {
    if (!readyName) { toast.error("Campaign name required"); return; }
    if (!readyMsg) { toast.error("Message required"); return; }
    onCreate?.({ name, status: schedule === "now" ? "Sending" : "Scheduled" });
    toast.success("✓ Campaign created");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-[760px] w-full max-h-[92vh] overflow-y-auto bg-[#16161F] border border-[#1E1E2E] rounded-2xl">
        <div className="flex items-start justify-between p-6 pb-3">
          <div>
            <div className="text-white font-semibold text-lg">Create New Campaign</div>
            <div className="text-[#8B8FA8] text-xs mt-1">Configure your SMS campaign with message, targeting & scheduling</div>
          </div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="flex gap-4 px-6 pb-4">
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Campaign Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Black Friday Sale" className="w-full h-10 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
            </div>
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Message Content *</label>
              <textarea ref={ref} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your SMS message here..." className="w-full min-h-[140px] bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
              <div className="flex items-center gap-3 mt-2 text-[11px] text-[#8B8FA8]">
                <span># {chars} chars</span>
                <span>{segments} segment{segments > 1 ? "s" : ""}</span>
                <span>◇ {vars} vars</span>
                <span className="ml-auto text-[#4A4A6A]">{remaining} remaining</span>
              </div>
            </div>
            <div>
              <div className="text-[#8B8FA8] text-xs uppercase mb-2">Quick Insert Variables</div>
              <div className="flex gap-2 flex-wrap">
                {VAR_CHIPS.map((v) => (
                  <button key={v} onClick={() => insertVar(v)} className="px-2.5 py-1 rounded-md bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-xs hover:text-white hover:border-[#3B82F6]/40 flex items-center gap-1">
                    <Hash size={10} /> {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[#8B8FA8] text-xs uppercase mb-2">Target Audience</div>
              <div className="flex gap-1 mb-3">
                {([["all","All Contacts"],["pick","Pick Contacts"],["groups","Groups"],["tags","By Tags"]] as const).map(([k,l]) => (
                  <button key={k} onClick={() => setAudience(k)} className={`px-3 py-1.5 rounded-lg text-xs ${audience === k ? "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30" : "bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8]"}`}>{l}</button>
                ))}
              </div>
              {audience === "pick" && (
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
                  <input placeholder="Search contacts..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-8 pr-3 text-white text-xs" />
                </div>
              )}
              {audience === "groups" && (
                <div className="flex gap-2 flex-wrap">
                  {GROUPS.map((g) => {
                    const on = groups.includes(g);
                    return (
                      <button key={g} onClick={() => setGroups(on ? groups.filter((x) => x !== g) : [...groups, g])} className={`px-3 py-1 rounded-full text-xs border ${on ? "bg-[#3B82F6]/15 border-[#3B82F6] text-white" : "border-[#1C1C34] text-[#8B8FA8]"}`}>{g}</button>
                    );
                  })}
                </div>
              )}
              {audience === "tags" && (
                <div className="flex gap-2 flex-wrap">
                  {TAGS.map((t) => {
                    const on = tags.includes(t);
                    return (
                      <button key={t} onClick={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t])} className={`px-3 py-1 rounded-full text-xs border ${on ? "bg-[#7B5CFC]/15 border-[#7B5CFC] text-white" : "border-[#1C1C34] text-[#8B8FA8]"}`}>#{t}</button>
                    );
                  })}
                </div>
              )}
              <div className="text-[#4A4A6A] text-[11px] mt-2">
                {recipients} active contacts — Campaign will be sent to {audience === "all" ? "all active contacts" : "selected recipients"}
              </div>
            </div>
            {schedule === "later" && (
              <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className="w-full h-10 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-3 text-[#8B8FA8] text-sm" />
            )}
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1.5 text-white"><input type="radio" checked={schedule === "now"} onChange={() => setSchedule("now")} /> Send Now</label>
              <label className="flex items-center gap-1.5 text-white"><input type="radio" checked={schedule === "later"} onChange={() => setSchedule("later")} /> Schedule Later</label>
            </div>
          </div>

          <div className="w-[280px] bg-[#111118] rounded-xl p-4 space-y-4 self-start">
            <div className="text-[10px] uppercase text-[#4A4A6A] tracking-wider">Message Preview</div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-[10px] text-gray-500 mb-2">SMS Preview</div>
              <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-800 whitespace-pre-wrap min-h-[48px]">{msg || "Your message will appear here..."}</div>
              <div className="text-[10px] text-gray-400 mt-1">Just now</div>
            </div>
            <div className="text-[10px] uppercase text-[#4A4A6A] tracking-wider">Campaign Summary</div>
            <div className="grid grid-cols-2 gap-2">
              {[["Characters", chars], ["Segments", segments], ["Variables", vars], ["Recipients", recipients]].map(([l, v]) => (
                <div key={l as string} className="bg-[#16161F] rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-base">{v as number}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{l}</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] uppercase text-[#4A4A6A] tracking-wider">$ Est. Cost</div>
            <div className="bg-[#16161F] rounded-xl p-3">
              <div className="text-white text-sm font-semibold">{segments} segment × {recipients} recipients</div>
              <div className="text-[#4A4A6A] text-[11px] mt-1">Cost depends on carrier & region</div>
            </div>
            <div className="bg-[#16161F] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#F59E0B] text-xs font-semibold mb-2"><Lightbulb size={12} /> Pro Tips</div>
              <ul className="text-[#8B8FA8] text-[11px] space-y-1 list-disc pl-4">
                <li>Keep messages under 160 chars for 1 segment</li>
                <li>Use variables for personalization</li>
                <li>Include a clear CTA</li>
                <li>Add opt-out info for compliance</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1E1E2E] px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs">
            <span className={`flex items-center gap-1.5 ${readyName ? "text-[#22C55E]" : "text-[#4A4A6A]"}`}>
              <span className={`w-2 h-2 rounded-full ${readyName ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`} /> Name
            </span>
            <span className={`flex items-center gap-1.5 ${readyMsg ? "text-[#22C55E]" : "text-[#4A4A6A]"}`}>
              <span className={`w-2 h-2 rounded-full ${readyMsg ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`} /> Message
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] text-sm hover:text-white">Cancel</button>
            <button onClick={create} className="h-9 px-5 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Create Campaign</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BuyCreditsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const packs = [
    { c: "100", p: "AED 15", sub: "~100 SMS", featured: false },
    { c: "500", p: "AED 60", sub: "~500 SMS", featured: true },
    { c: "1,000", p: "AED 100", sub: "~1,000 SMS", featured: false },
  ];
  const buy = () => { toast.success("✓ Credits added"); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-2xl w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-white font-semibold text-lg">Top Up SMS Credits</div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {packs.map((p) => (
            <div key={p.c} className={`bg-[#06060F] border ${p.featured ? "border-[#7C5CFC]" : "border-[#1C1C34]"} rounded-xl p-5 text-center`}>
              <div className="text-white font-bold text-2xl">{p.c}</div>
              <div className="text-[#8B8FA8] text-xs mb-3">credits</div>
              <div className="text-[#3B82F6] font-bold text-lg">{p.p}</div>
              <div className="text-[#4A4A6A] text-xs mb-4">{p.sub}</div>
              <button onClick={buy} className="w-full h-9 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Buy Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SMSTemplateModal({
  open, onClose, onSave,
}: { open: boolean; onClose: () => void; onSave?: (t: { name: string; category: string; body: string }) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [body, setBody] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) { setName(""); setCategory("General"); setBody(""); }
  }, [open]);

  if (!open) return null;
  const chars = body.length;
  const segments = Math.max(1, Math.ceil(chars / 160));
  const vars = countVars(body);
  const insertVar = (v: string) => {
    const token = `{{${v}}}`;
    const el = ref.current;
    if (!el) { setBody(body + token); return; }
    const s = el.selectionStart ?? body.length;
    const e = el.selectionEnd ?? body.length;
    setBody(body.slice(0, s) + token + body.slice(e));
    setTimeout(() => { el.focus(); el.setSelectionRange(s + token.length, s + token.length); }, 0);
  };
  const save = () => {
    if (!name.trim()) { toast.error("Template name required"); return; }
    if (!body.trim()) { toast.error("Message required"); return; }
    onSave?.({ name, category, body });
    toast.success("✓ Template saved");
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-2xl w-full bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-white font-semibold text-lg flex items-center gap-2"><MessageSquare size={16} className="text-[#3B82F6]" /> Create SMS Template</div>
            <div className="text-[#8B8FA8] text-xs mt-1">Use {"{{variable}}"} syntax for dynamic content</div>
          </div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Template Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Appointment Reminder" className="w-full h-10 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
            </div>
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-3 text-white text-sm">
                <option>General</option><option>Promotional</option><option>Transactional</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Message Content *</label>
            <textarea ref={ref} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type your SMS template..." className="w-full min-h-[140px] bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-3 text-white text-sm" />
            <div className="flex items-center gap-3 mt-2 text-[11px] text-[#8B8FA8]">
              <span>{chars} chars</span>
              <span>{segments} segment{segments > 1 ? "s" : ""}</span>
              <span>{vars} variables</span>
              <span className="ml-auto text-[#4A4A6A]">160 chars/segment</span>
            </div>
          </div>
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase mb-2">Quick Insert Variables</div>
            <div className="flex gap-2 flex-wrap">
              {TPL_VAR_CHIPS.map((v) => (
                <button key={v} onClick={() => insertVar(v)} className="px-2.5 py-1 rounded-md bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-xs hover:text-white flex items-center gap-1">
                  <Hash size={10} /> {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] text-sm hover:text-white">Cancel</button>
          <button onClick={save} className="h-9 px-5 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Save Template</button>
        </div>
      </div>
    </div>
  );
}
