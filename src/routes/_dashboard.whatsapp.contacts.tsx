import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Users, RefreshCw, Search, UserPlus, MessageSquare, Star, Target, TrendingUp, Upload, X, Download, Plus,
} from "lucide-react";
import { useWhatsappTags } from "@/hooks/useWhatsappTags";

export const Route = createFileRoute("/_dashboard/whatsapp/contacts")({ component: Contacts });

const STATS = [
  { icon: Users, color: "text-[#7B5CFC]", value: "0", label: "TOTAL", sub: "All contacts" },
  { icon: UserPlus, color: "text-[#3B82F6]", value: "0", label: "NEW", sub: "Pending outreach" },
  { icon: MessageSquare, color: "text-[#F59E0B]", value: "0", label: "CONTACTED", sub: "In conversation" },
  { icon: Star, color: "text-[#22C55E]", value: "0", label: "QUALIFIED", sub: "High intent" },
  { icon: Target, color: "text-[#00D4AA]", value: "0%", label: "ENGAGEMENT", sub: "0 active" },
  { icon: TrendingUp, color: "text-[#FF4D6D]", value: "0%", label: "CONVERSION", sub: "Qualified rate" },
];

const FILTERS = ["All", "New", "Contacted", "Qualified"];

type Contact = { id: string; first: string; last: string; phone: string; email: string; status: string };

const SEED: Contact[] = [
  { id: "1", first: "Ahmed", last: "Al Mansouri", phone: "+971 50 123 4567", email: "ahmed@example.com", status: "Qualified" },
  { id: "2", first: "Sara", last: "Hassan", phone: "+971 55 222 3344", email: "sara@example.com", status: "Contacted" },
  { id: "3", first: "Mohamed", last: "K.", phone: "+971 52 988 1122", email: "m.k@example.com", status: "New" },
];

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(SEED);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", phone: "", email: "", status: "New" });
  const [tagMenuFor, setTagMenuFor] = useState<string | null>(null);
  const { tags, contactTags, assignTag, unassignTag } = useWhatsappTags();


  const filtered = filter === "All" ? contacts : contacts.filter((c) => c.status === filter);

  const submit = () => {
    if (!form.first.trim() || !form.phone.trim()) { toast.error("First name & phone required"); return; }
    setContacts((c) => [{ id: String(Date.now()), ...form }, ...c]);
    setForm({ first: "", last: "", phone: "", email: "", status: "New" });
    setShowAdd(false);
    toast.success("✓ Contact added");
  };

  const toggleSel = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center">
            <Users size={22} className="text-[#22C55E]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Contacts</h1>
            <p className="text-[#4A4A6A] text-sm">{contacts.length} contacts · 0 active · 0% engagement</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => toast.success("Exported contacts.csv")} className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Export</button>
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button onClick={() => setShowImport(true)} className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Import Contacts</button>
          <button onClick={() => setShowAdd(true)} className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Add Contact</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon size={16} className={s.color} />
            </div>
            <div className="text-white font-bold text-xl">{s.value}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{s.label}</div>
            <div className="text-[#4A4A6A] text-[10px] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search by name, phone, email, company..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3" />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? "bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1.5 text-xs rounded-full font-medium" : "bg-[#0B0B1A] border border-[#1C1C34] text-[#4A4A6A] hover:text-white text-xs px-3 py-1.5 rounded-full"}>{f}</button>
          ))}
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3 ml-auto"><option>Last Active</option></select>
      </div>

      {selected.length > 0 && (
        <div className="px-6 mb-3">
          <div className="bg-[#7B5CFC]/8 border border-[#7B5CFC]/30 rounded-xl px-4 py-2 flex items-center gap-3">
            <span className="text-white text-xs font-medium">{selected.length} selected</span>
            {["Tag", "Assign Agent", "Export", "Delete"].map((a) => (
              <button key={a} onClick={() => toast.success(`${a} applied`)} className="text-[#9B84FF] text-xs px-3 py-1 rounded-full border border-[#7B5CFC]/30 hover:bg-[#7B5CFC]/15">{a}</button>
            ))}
            <button onClick={() => setSelected([])} className="ml-auto text-[#8B8FA8] text-xs">Clear</button>
          </div>
        </div>
      )}

      <div className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-6">
              <Users size={36} className="text-[#22C55E]/50" />
            </div>
            <div className="text-white font-bold text-xl mb-2">No contacts match</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-xs mb-8">Try a different filter or add new contacts.</div>
            <button onClick={() => setShowAdd(true)} className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Add Contact</button>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#06060F] text-[#4A4A6A] text-[10px] uppercase">
                <tr>
                  <th className="px-4 py-3 text-left w-8"></th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Tags</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-[#1C1C34] hover:bg-[#0E0E1C]">
                    <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSel(c.id)} /></td>
                    <td className="px-4 py-3 text-white">{c.first} {c.last}</td>
                    <td className="px-4 py-3 text-[#8B8FA8]">{c.phone}</td>
                    <td className="px-4 py-3 text-[#8B8FA8]">{c.email}</td>
                    <td className="px-4 py-3 text-[#8B8FA8]">{c.tags}</td>
                    <td className="px-4 py-3"><span className="text-[#22C55E] text-xs">{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
              <h2 className="text-white font-semibold text-base">Add Contact</h2>
              <button onClick={() => setShowAdd(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })} placeholder="First Name" className="h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                <input value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })} placeholder="Last Name" className="h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
              </div>
              <div className="flex">
                <span className="h-10 px-3 bg-[#0B0B1A] border border-[#1E1E2E] border-r-0 rounded-l-lg flex items-center text-[#8B8FA8] text-sm">+971</span>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="50 123 4567" className="flex-1 h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-r-lg px-3 text-white text-sm" />
              </div>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma separated)" className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm">
                <option>New</option><option>Contacted</option><option>Qualified</option>
              </select>
            </div>
            <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
              <button onClick={() => setShowAdd(false)} className="h-9 px-4 rounded-lg text-[#8B8FA8] text-sm">Cancel</button>
              <button onClick={submit} className="h-9 px-5 rounded-lg bg-[#22C55E] text-white text-sm font-semibold">Add Contact</button>
            </div>
          </div>
        </div>
      )}

      {showImport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowImport(false)}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
              <h2 className="text-white font-semibold text-base">Import Contacts</h2>
              <button onClick={() => setShowImport(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="border-2 border-dashed border-[#1E1E2E] rounded-xl p-8 text-center">
                <Upload size={28} className="text-[#4A4A6A] mx-auto mb-2" />
                <input type="file" accept=".csv" className="text-[#8B8FA8] text-xs" />
              </div>
              <button onClick={() => toast.success("Template downloaded")} className="text-[#22C55E] text-xs flex items-center gap-1"><Download size={12} /> Download CSV Template</button>
            </div>
            <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
              <button onClick={() => setShowImport(false)} className="h-9 px-4 rounded-lg text-[#8B8FA8] text-sm">Cancel</button>
              <button onClick={() => { toast.success("✓ Contacts imported"); setShowImport(false); }} className="h-9 px-5 rounded-lg bg-[#22C55E] text-white text-sm font-semibold">Import</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
