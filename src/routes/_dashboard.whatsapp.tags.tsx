import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Tag, Hash, Users, BarChart, Star, Palette, Target, Search, Zap, X, Pencil, Trash2, Plus,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/tags")({ component: Tags });

const STATS = [
  { icon: Hash, color: "text-[#F59E0B]", value: "0", label: "TOTAL TAGS" },
  { icon: Users, color: "text-[#3B82F6]", value: "0", label: "TAGGED CONTACTS" },
  { icon: BarChart, color: "text-[#00D4AA]", value: "0", label: "AVG PER TAG" },
  { icon: Star, color: "text-[#7B5CFC]", value: "—", label: "MOST USED" },
  { icon: Palette, color: "text-[#FF4D6D]", value: "0/10", label: "COLORS USED" },
  { icon: Target, color: "text-[#22C55E]", value: "0%", label: "COVERAGE" },
];

const FEATURES = [
  { icon: Tag, color: "text-[#F59E0B]", title: "Organize", desc: "Group contacts" },
  { icon: Target, color: "text-[#00D4AA]", title: "Segment", desc: "Smart targeting" },
  { icon: Zap, color: "text-[#7B5CFC]", title: "Automate", desc: "Trigger actions" },
  { icon: BarChart, color: "text-[#3B82F6]", title: "Analyze", desc: "Track usage" },
];

const SWATCHES = ["#7B5CFC", "#22C55E", "#3B82F6", "#F59E0B", "#FF4D6D", "#00D4AA"];

type TagItem = { id: string; name: string; color: string };

function Tags() {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState(SWATCHES[0]);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const create = () => {
    if (!name.trim()) { toast.error("Tag name required"); return; }
    if (editingId) {
      setTags((t) => t.map((x) => x.id === editingId ? { ...x, name, color } : x));
      toast.success("Tag updated");
    } else {
      setTags((t) => [...t, { id: String(Date.now()), name, color }]);
      toast.success("Tag created");
    }
    setOpen(false); setName(""); setColor(SWATCHES[0]); setEditingId(null);
  };

  const startEdit = (t: TagItem) => { setEditingId(t.id); setName(t.name); setColor(t.color); setOpen(true); };
  const remove = (id: string) => { setTags((t) => t.filter((x) => x.id !== id)); setConfirmId(null); toast.success("Tag deleted"); };
  const exportCsv = () => {
    const csv = "name,color\n" + tags.map((t) => `${t.name},${t.color}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "tags.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Tags exported");
  };

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/20 flex items-center justify-center">
            <Tag size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Contact Tags</h1>
            <p className="text-[#4A4A6A] text-sm">{tags.length} tags · 0 contacts organized</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCsv} className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Export</button>
          <button onClick={() => { setEditingId(null); setName(""); setColor(SWATCHES[0]); setOpen(true); }} className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ New Tag</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex items-center gap-3">
            <s.icon size={16} className={s.color} />
            <div>
              <div className="text-white font-bold text-lg">{s.value}</div>
              <div className="text-[#4A4A6A] text-[10px] uppercase">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search tags..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>All</option></select>
        <div className="ml-auto text-[#4A4A6A] text-sm">{tags.length} results</div>
      </div>

      <div className="px-6 pb-6">
        {tags.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl flex items-center justify-center mb-6">
              <Tag size={36} className="text-[#F59E0B]/50" />
            </div>
            <div className="text-white font-bold text-xl mb-2">No tags yet</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Create tags to organize and segment your contacts for targeted campaigns and smarter workflows</div>
            <div className="flex gap-4 justify-center mb-8">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex flex-col items-center gap-2 w-24">
                  <f.icon size={18} className={f.color} />
                  <span className="text-white text-xs font-semibold">{f.title}</span>
                  <span className="text-[#4A4A6A] text-[10px]">{f.desc}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Create First Tag</button>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl divide-y divide-[#1C1C34]">
            {tags.map((t) => (
              <div key={t.id} className="px-5 py-3 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                <span className="text-white text-sm flex-1">{t.name}</span>
                <button onClick={() => startEdit(t)} className="text-[#8B8FA8] hover:text-white"><Pencil size={14} /></button>
                <button onClick={() => setConfirmId(t.id)} className="text-[#8B8FA8] hover:text-[#FF4D6D]"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
              <h2 className="text-white font-semibold text-base">{editingId ? "Edit Tag" : "Create Tag"}</h2>
              <button onClick={() => setOpen(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tag name" className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
              <div>
                <div className="text-[#8B8FA8] text-xs uppercase mb-2">Color</div>
                <div className="flex gap-2">
                  {SWATCHES.map((c) => (
                    <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full ${color === c ? "ring-2 ring-white" : ""}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="h-9 px-4 rounded-lg text-[#8B8FA8] text-sm">Cancel</button>
              <button onClick={create} className="h-9 px-5 rounded-lg bg-[#22C55E] text-white text-sm font-semibold flex items-center gap-1"><Plus size={12} />{editingId ? "Save" : "Create Tag"}</button>
            </div>
          </div>
        </div>
      )}

      {confirmId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setConfirmId(null)}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-semibold mb-2">Delete this tag?</h3>
            <p className="text-[#8B8FA8] text-sm mb-5">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmId(null)} className="h-9 px-4 rounded-lg text-[#8B8FA8] text-sm">Cancel</button>
              <button onClick={() => remove(confirmId)} className="h-9 px-5 rounded-lg bg-[#FF4D6D] text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
