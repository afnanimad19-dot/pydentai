import { useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const VARS = ["{{name}}", "{{clinic}}", "{{date}}"];
const GROUPS = ["New Leads", "Qualified", "VIP"];

export function SMSCampaignModal({
  open, onClose, initialMessage = "", onCreate,
}: { open: boolean; onClose: () => void; initialMessage?: string; onCreate?: (c: { name: string; status: string }) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"Promotional" | "Transactional">("Promotional");
  const [msg, setMsg] = useState(initialMessage);
  const [audience, setAudience] = useState<"all" | "group" | "individual">("all");
  const [groups, setGroups] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<"now" | "later">("now");
  const [when, setWhen] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  if (!open) return null;
  const chars = msg.length;
  const segments = Math.max(1, Math.ceil(chars / 160));

  const insertVar = (v: string) => {
    const el = ref.current;
    if (!el) { setMsg(msg + v); return; }
    const s = el.selectionStart ?? msg.length;
    const e = el.selectionEnd ?? msg.length;
    setMsg(msg.slice(0, s) + v + msg.slice(e));
    setTimeout(() => { el.focus(); el.setSelectionRange(s + v.length, s + v.length); }, 0);
  };

  const create = () => {
    if (!name.trim()) { toast.error("Campaign name required"); return; }
    onCreate?.({ name, status: schedule === "now" ? "Sending" : "Scheduled" });
    toast.success("✓ Campaign created");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-white font-semibold text-lg">New SMS Campaign</div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Campaign Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., June Promo" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Type</label>
            <div className="flex gap-3">
              {(["Promotional", "Transactional"] as const).map((t) => (
                <label key={t} className="flex items-center gap-2 text-white text-sm cursor-pointer">
                  <input type="radio" checked={type === t} onChange={() => setType(t)} /> {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Message</label>
            <textarea ref={ref} value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full min-h-[120px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
            <div className="flex justify-between mt-1 text-xs">
              <span className="text-[#4A4A6A]">{chars} / 160 characters</span>
              <span className="text-[#3B82F6]">{segments} SMS</span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {VARS.map((v) => (
                <button key={v} onClick={() => insertVar(v)} className="px-2 py-1 rounded-md bg-[#1C1C34] text-[#8B8FA8] text-xs hover:text-white">{v}</button>
              ))}
            </div>
            <div className="text-[#F59E0B] text-[11px] mt-2">STOP keyword automatically appended to broadcast messages</div>
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Audience</label>
            <select value={audience} onChange={(e) => setAudience(e.target.value as typeof audience)} className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm">
              <option value="all">All Contacts</option>
              <option value="group">Specific Group</option>
              <option value="individual">Individual</option>
            </select>
            {audience === "group" && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {GROUPS.map((g) => {
                  const on = groups.includes(g);
                  return (
                    <button key={g} onClick={() => setGroups(on ? groups.filter((x) => x !== g) : [...groups, g])} className={`px-3 py-1 rounded-full text-xs border ${on ? "bg-[#3B82F6]/15 border-[#3B82F6] text-white" : "border-[#1C1C34] text-[#8B8FA8]"}`}>{g}</button>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Schedule</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-white text-sm"><input type="radio" checked={schedule === "now"} onChange={() => setSchedule("now")} /> Send Now</label>
              <label className="flex items-center gap-2 text-white text-sm"><input type="radio" checked={schedule === "later"} onChange={() => setSchedule("later")} /> Schedule Later</label>
              {schedule === "later" && (
                <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className="flex-1 h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-[#8B8FA8] text-sm" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Cancel</button>
          <button onClick={create} className="h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Create Campaign</button>
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
  const buy = () => { toast.success("✓ Credits added to your account"); onClose(); };
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
  const [category, setCategory] = useState("Promotional");
  const [body, setBody] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  if (!open) return null;
  const chars = body.length;
  const insertVar = (v: string) => {
    const el = ref.current;
    if (!el) { setBody(body + v); return; }
    const s = el.selectionStart ?? body.length;
    const e = el.selectionEnd ?? body.length;
    setBody(body.slice(0, s) + v + body.slice(e));
  };
  const save = () => {
    if (!name.trim()) { toast.error("Template name required"); return; }
    onSave?.({ name, category, body });
    toast.success("✓ Template saved");
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-white font-semibold text-lg">New SMS Template</div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Template Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
            </div>
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm">
                <option>Promotional</option><option>Transactional</option><option>Reminder</option>
              </select>
            </div>
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Body</label>
              <textarea ref={ref} value={body} onChange={(e) => setBody(e.target.value)} className="w-full min-h-[140px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
              <div className="text-[#4A4A6A] text-xs mt-1">{chars} / 160 characters</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {VARS.map((v) => (
                  <button key={v} onClick={() => insertVar(v)} className="px-2 py-1 rounded-md bg-[#1C1C34] text-[#8B8FA8] text-xs hover:text-white">{v}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase mb-2">Preview</div>
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-3xl p-4 min-h-[280px] flex items-start">
              <div className="bg-[#1C1C34] text-white text-sm rounded-2xl px-4 py-3 max-w-[85%] whitespace-pre-wrap">
                {body || "Your message preview will appear here…"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Cancel</button>
          <button onClick={save} className="h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Save Template</button>
        </div>
      </div>
    </div>
  );
}
