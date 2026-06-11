import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Users, Sparkles, Upload, Users2, UserPlus, CheckCircle, Flame, Percent, Phone, Search, BarChart2, X, Mail, Building2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/leads")({ component: Leads });

type Priority = "high" | "medium" | "low";
type Status = "New" | "Pending" | "In Progress" | "Qualified" | "Not Qualified" | "Calling";
type Source = "Manual" | "Facebook" | "Google" | "Website" | "Referral" | "WhatsApp" | "Phone";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  source: Source;
  status: Status;
  priority: Priority;
  notes?: string;
  calls?: number;
  score?: number;
  createdAt: string;
};

const STAGES: { name: Status; color: string }[] = [
  { name: "New", color: "#7B5CFC" },
  { name: "Pending", color: "#3B82F6" },
  { name: "In Progress", color: "#F59E0B" },
  { name: "Qualified", color: "#22C55E" },
  { name: "Not Qualified", color: "#FF4D6D" },
  { name: "Calling", color: "#00D4AA" },
];

const PILLS = [
  { id: "all", label: "All" },
  { id: "high", label: "Hot 🔥" },
  { id: "medium", label: "Warm" },
  { id: "low", label: "Cold" },
] as const;

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof PILLS)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [openLead, setOpenLead] = useState<Lead | null>(null);

  const metrics = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "New").length;
    const qualified = leads.filter((l) => l.status === "Qualified").length;
    const hot = leads.filter((l) => l.priority === "high").length;
    const conv = total ? Math.round((qualified / total) * 100) : 0;
    const avgCalls = total ? (leads.reduce((s, l) => s + (l.calls ?? 0), 0) / total).toFixed(1) : "0";
    return [
      { Icon: Users2, color: "#7B5CFC", v: String(total), label: "Total Leads" },
      { Icon: UserPlus, color: "#3B82F6", v: String(newCount), label: "New Leads" },
      { Icon: CheckCircle, color: "#00D4AA", v: String(qualified), label: "Qualified" },
      { Icon: Flame, color: "#FF4D6D", v: String(hot), label: "Hot Leads" },
      { Icon: Percent, color: "#22C55E", v: `${conv}%`, label: "Conversion Rate" },
      { Icon: Phone, color: "#F59E0B", v: avgCalls, label: "Avg. Calls/Lead" },
    ];
  }, [leads]);

  const stageCounts = useMemo(() => {
    const max = Math.max(1, ...STAGES.map((s) => leads.filter((l) => l.status === s.name).length));
    return STAGES.map((s) => {
      const c = leads.filter((l) => l.status === s.name).length;
      return { ...s, count: c, pct: Math.round((c / max) * 100) };
    });
  }, [leads]);

  const visible = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.priority !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (![l.name, l.phone, l.email ?? "", l.company ?? ""].some((s) => s.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [leads, filter, query]);

  const addLead = (lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString(), calls: 0, score: Math.floor(40 + Math.random() * 50) };
    setLeads((prev) => [newLead, ...prev]);
    toast.success("Lead added successfully");
  };

  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center"><Users size={22} className="text-[#7B5CFC]" /></div>
          <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Leads</h1><p className="text-[#4A4A6A] text-sm">Manage your pipeline, track engagement, and convert leads</p></div>
        </div>
        <div className="flex gap-2 items-center text-xs">
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8]">Duplicates</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center gap-1.5"><Sparkles size={12} /> AI Score All</button>
          <button onClick={() => setCsvOpen(true)} className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center gap-1.5"><Upload size={12} /> Import CSV</button>
          <button onClick={() => setAddOpen(true)} className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white font-semibold">+ Add Lead</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-4">
            <m.Icon size={14} style={{ color: m.color }} />
            <div className="text-white font-bold text-xl mt-1">{m.v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2"><BarChart2 size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Pipeline Overview</span><span className="text-[#4A4A6A] text-xs ml-auto">{leads.length} total leads</span></div>
          <div className="grid grid-cols-6 gap-2 mt-4">
            {stageCounts.map((s) => (
              <div key={s.name} className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3">
                <div className="text-[#4A4A6A] text-[10px] uppercase">{s.name}</div>
                <div className="text-white font-bold text-lg">{s.count}</div>
                <div className="h-1 bg-[#1C1C34] rounded mt-2 overflow-hidden"><div style={{ background: s.color, width: `${s.pct}%` }} className="h-full transition-all" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone, email, or company..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-[#4A4A6A]" /></div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {PILLS.map((p) => <button key={p.id} onClick={() => setFilter(p.id)} className={`px-3 py-1 text-xs rounded ${filter === p.id ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{p.label}</button>)}
        </div>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs">More</button>
      </div>

      <div className="px-6">
        {visible.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
            <Users2 size={48} className="text-[#1C1C34] mb-4" />
            <div className="text-white text-lg font-semibold mb-2">No leads found</div>
            <p className="text-[#4A4A6A] text-sm mb-8">Add your first lead or import contacts to get started.</p>
            <div className="flex gap-3">
              <button onClick={() => setCsvOpen(true)} className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm flex items-center gap-2"><Upload size={14} /> Import CSV</button>
              <button onClick={() => setAddOpen(true)} className="h-10 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">+ Add Lead</button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            {visible.map((l, i) => (
              <button key={l.id} onClick={() => setOpenLead(l)} className={`w-full grid grid-cols-12 items-center gap-3 px-4 py-3 hover:bg-[#1C1C34]/40 text-left ${i > 0 ? "border-t border-[#1C1C34]" : ""}`}>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1C1C34] flex items-center justify-center text-[#8B8FA8] text-xs font-semibold">{l.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div className="text-white text-sm font-semibold">{l.name}</div>
                    <div className="text-[#4A4A6A] text-xs">{l.company || "—"}</div>
                  </div>
                </div>
                <div className="col-span-2 text-[#8B8FA8] text-xs">{l.phone}</div>
                <div className="col-span-2 text-[#8B8FA8] text-xs truncate">{l.email || "—"}</div>
                <div className="col-span-2 text-[#8B8FA8] text-xs">{l.source}</div>
                <div className="col-span-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${STAGES.find((s) => s.name === l.status)?.color}20`, color: STAGES.find((s) => s.name === l.status)?.color }}>{l.status}</span>
                </div>
                <div className="col-span-1 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${l.priority === "high" ? "bg-[#FF4D6D]/15 text-[#FF4D6D]" : l.priority === "medium" ? "bg-[#F59E0B]/15 text-[#F59E0B]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>{l.priority}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {addOpen && <AddLeadModal onClose={() => setAddOpen(false)} onAdd={(l) => { addLead(l); setAddOpen(false); }} />}
      {csvOpen && <ImportCSVModal onClose={() => setCsvOpen(false)} onImport={(rows) => {
        rows.forEach((r) => addLead(r));
        setCsvOpen(false);
        toast.success(`Imported ${rows.length} leads`);
      }} />}
      {openLead && <LeadDetailSlideOver lead={openLead} onClose={() => setOpenLead(null)} />}
    </div>
  );
}

function AddLeadModal({ onClose, onAdd }: { onClose: () => void; onAdd: (l: Omit<Lead, "id" | "createdAt">) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState<Source>("Manual");
  const [status, setStatus] = useState<Status>("New");
  const [priority, setPriority] = useState<Priority>("medium");
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!name.trim() || !phone.trim()) { toast.error("Name and phone are required"); return; }
    onAdd({ name, phone, email, company, source, status, priority, notes });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[560px]" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <h2 className="text-white font-semibold">Add Lead</h2>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={16} /></button>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-3">
          <Field label="Name *"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={inputCls} /></Field>
          <Field label="Phone *"><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className={inputCls} /></Field>
          <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className={inputCls} /></Field>
          <Field label="Company"><input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc" className={inputCls} /></Field>
          <Field label="Source">
            <select value={source} onChange={(e) => setSource(e.target.value as Source)} className={inputCls}>
              {(["Manual", "Facebook", "Google", "Website", "Referral", "WhatsApp", "Phone"] as Source[]).map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className={inputCls}>
              {STAGES.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Priority">
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className={inputCls}>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </Field>
          <div className="col-span-2">
            <Field label="Notes">
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Additional notes about this lead..." className={`${inputCls} resize-none`} />
            </Field>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-[#1C1C34] flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Cancel</button>
          <button onClick={submit} className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">Add Lead</button>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function ImportCSVModal({ onClose, onImport }: { onClose: () => void; onImport: (rows: Omit<Lead, "id" | "createdAt">[]) => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const FIELDS = ["Name", "Phone", "Email", "Company", "Source", "Status", "Priority", "Notes"];

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (!lines.length) return;
      const hdr = lines[0].split(",").map((s) => s.trim());
      const data = lines.slice(1).map((l) => l.split(",").map((s) => s.trim()));
      setHeaders(hdr);
      setRows(data);
      const init: Record<string, string> = {};
      FIELDS.forEach((f) => {
        const h = hdr.find((h) => h.toLowerCase() === f.toLowerCase());
        if (h) init[f] = h;
      });
      setMapping(init);
      setStep(2);
    };
    reader.readAsText(file);
  };

  const doImport = () => {
    const mapped: Omit<Lead, "id" | "createdAt">[] = rows.map((r) => {
      const get = (f: string) => {
        const h = mapping[f];
        if (!h) return "";
        const idx = headers.indexOf(h);
        return idx >= 0 ? r[idx] ?? "" : "";
      };
      return {
        name: get("Name") || "Unnamed",
        phone: get("Phone"),
        email: get("Email"),
        company: get("Company"),
        source: (get("Source") as Source) || "Manual",
        status: (get("Status") as Status) || "New",
        priority: ((get("Priority").toLowerCase() as Priority) || "medium") as Priority,
        notes: get("Notes"),
      };
    });
    onImport(mapped);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[560px]" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <h2 className="text-white font-semibold">Import CSV</h2>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={16} /></button>
        </div>
        {step === 1 ? (
          <div className="px-5 py-6 space-y-4">
            <label className="block border-2 border-dashed border-[#1C1C34] rounded-xl py-12 text-center cursor-pointer hover:border-[#7B5CFC]/40">
              <Upload size={28} className="text-[#4A4A6A] mx-auto mb-2" />
              <div className="text-white text-sm font-semibold">Drop CSV file or click to browse</div>
              <div className="text-[#4A4A6A] text-xs mt-1">First row should be column headers</div>
              <input type="file" accept=".csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
            </label>
            <a href="data:text/csv,Name,Phone,Email,Company,Source,Status,Priority,Notes" download="leads-template.csv" className="text-[#7B5CFC] text-xs hover:underline">Download Template</a>
          </div>
        ) : (
          <div className="px-5 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="text-[#8B8FA8] text-xs mb-2">Map your CSV columns to lead fields ({rows.length} rows)</div>
            {FIELDS.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <span className="w-24 text-[#8B8FA8] text-xs">{f}</span>
                <select value={mapping[f] || ""} onChange={(e) => setMapping((m) => ({ ...m, [f]: e.target.value }))} className={inputCls}>
                  <option value="">— skip —</option>
                  {headers.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-4 border-t border-[#1C1C34] flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Cancel</button>
          {step === 2 && <button onClick={doImport} className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">Import {rows.length} Leads</button>}
        </div>
      </div>
    </div>
  );
}

function LeadDetailSlideOver({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [notes, setNotes] = useState(lead.notes || "");
  const score = lead.score ?? 0;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <div className="w-[480px] h-full bg-[#0B0B1A] border-l border-[#1C1C34] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <h2 className="text-white font-semibold">{lead.name}</h2>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={16} /></button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[#8B8FA8]"><Phone size={14} /> {lead.phone}</div>
            {lead.email && <div className="flex items-center gap-2 text-[#8B8FA8]"><Mail size={14} /> {lead.email}</div>}
            {lead.company && <div className="flex items-center gap-2 text-[#8B8FA8]"><Building2 size={14} /> {lead.company}</div>}
          </div>

          <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">Lead Score</div>
            <div className="relative h-3 bg-[#1C1C34] rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF4D6D] via-[#F59E0B] to-[#22C55E] transition-all duration-1000" style={{ width: `${score}%` }} />
            </div>
            <div className="text-white font-bold text-2xl mt-3">{score}<span className="text-[#4A4A6A] text-sm font-normal">/100</span></div>
          </div>

          <Field label="Notes">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className={`${inputCls} resize-none`} />
          </Field>

          <div>
            <div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-2">Conversation History</div>
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 text-center text-[#4A4A6A] text-xs">No conversations yet</div>
          </div>
        </div>
      </div>
    </div>
  );
}
