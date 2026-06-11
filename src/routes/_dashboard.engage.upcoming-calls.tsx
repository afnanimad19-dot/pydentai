import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CalendarClock, CalendarX, Search, X, Phone, User, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/upcoming-calls")({ component: UpcomingCalls });

type CallStatus = "upcoming" | "overdue" | "completed" | "missed" | "cancelled";
type Call = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  agent: string;
  notes?: string;
  status: CallStatus;
};

const AGENTS = ["Dental Assistant", "Sarah - Sales", "Support Bot", "Booking Concierge"];

const TABS: { id: CallStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed" },
  { id: "missed", label: "Missed" },
  { id: "cancelled", label: "Cancelled" },
];

function UpcomingCalls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [callFilter, setCallFilter] = useState<CallStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const visible = useMemo(() => {
    return calls.filter((c) => {
      if (callFilter !== "all" && c.status !== callFilter) return false;
      if (query && ![c.name, c.phone].some((s) => s.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [calls, callFilter, query]);

  const completed = calls.filter((c) => c.status === "completed").length;
  const successRate = calls.length ? Math.round((completed / calls.length) * 100) : 0;

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <CalendarClock size={16} className="text-[#7B5CFC]" />
        <span className="text-white font-semibold text-sm">Upcoming Calls</span>
        <div className="ml-auto flex gap-4 text-[#4A4A6A] text-xs items-center">
          <span>{calls.length} total</span><span>{completed} completed</span><span>{successRate}% success</span>
          <button onClick={() => setOpen(true)} className="h-8 px-3 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-xs font-semibold">+ Schedule Call</button>
        </div>
      </div>

      <div className="px-6 py-3 border-b border-[#1C1C34] flex items-center gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone, company..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-[#4A4A6A]" /></div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {TABS.map((t) => <button key={t.id} onClick={() => setCallFilter(t.id)} className={`px-3 py-1 text-xs rounded ${callFilter === t.id ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t.label}</button>)}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="py-24 flex flex-col items-center">
            <CalendarX size={56} className="text-[#1C1C34] mb-4" />
            <div className="text-white text-lg font-semibold mb-2">No calls found</div>
            <p className="text-[#4A4A6A] text-sm mb-8">Schedule your first callback to get started</p>
            <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">+ Schedule Call</button>
          </div>
        ) : (
          <div className="py-4 space-y-2">
            {visible.map((c) => (
              <div key={c.id} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1C1C34] flex items-center justify-center text-[#8B8FA8] text-xs font-semibold">{c.name.slice(0, 2).toUpperCase()}</div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold">{c.name}</div>
                  <div className="text-[#4A4A6A] text-xs">{c.phone} · {c.agent}</div>
                </div>
                <div className="text-[#8B8FA8] text-xs flex items-center gap-1.5"><Calendar size={12} />{c.date} <Clock size={12} className="ml-2" />{c.time}</div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7B5CFC]/15 text-[#7B5CFC] capitalize">{c.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t border-[#1C1C34] flex justify-between text-[11px] text-[#4A4A6A]"><span>Showing {visible.length} of {calls.length} calls</span><span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></div>

      {open && <ScheduleCallModal onClose={() => setOpen(false)} onSchedule={(c) => {
        setCalls((prev) => [{ ...c, id: crypto.randomUUID(), status: "upcoming" }, ...prev]);
        setOpen(false);
        setCallFilter("upcoming");
        toast.success("Call scheduled");
      }} />}
    </div>
  );
}

function ScheduleCallModal({ onClose, onSchedule }: { onClose: () => void; onSchedule: (c: Omit<Call, "id" | "status">) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [agent, setAgent] = useState(AGENTS[0]);
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!name.trim() || !phone.trim()) { toast.error("Name and phone are required"); return; }
    onSchedule({ name, phone, date, time, agent, notes });
  };

  const cls = "w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[520px]" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <h2 className="text-white font-semibold">Schedule Call</h2>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={16} /></button>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-3">
          <div className="col-span-2"><div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">Contact Name *</div><div className="relative"><User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" /><input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={`${cls} pl-8`} /></div></div>
          <div className="col-span-2"><div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">Phone Number *</div><div className="relative"><Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" /><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className={`${cls} pl-8`} /></div></div>
          <div><div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">Date</div><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={cls} /></div>
          <div><div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">Time</div><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={cls} /></div>
          <div className="col-span-2"><div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">Agent</div><select value={agent} onChange={(e) => setAgent(e.target.value)} className={cls}>{AGENTS.map((a) => <option key={a}>{a}</option>)}</select></div>
          <div className="col-span-2"><div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-1.5">Notes</div><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Call purpose, talking points..." className={`${cls} resize-none`} /></div>
        </div>
        <div className="px-5 py-4 border-t border-[#1C1C34] flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Cancel</button>
          <button onClick={submit} className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">Schedule Call</button>
        </div>
      </div>
    </div>
  );
}
