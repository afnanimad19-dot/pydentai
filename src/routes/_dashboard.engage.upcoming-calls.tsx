import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CalendarX, Search } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/upcoming-calls")({ component: UpcomingCalls });

function UpcomingCalls() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <CalendarClock size={16} className="text-[#7B5CFC]" />
        <span className="text-white font-semibold text-sm">Upcoming Calls</span>
        <div className="ml-auto flex gap-4 text-[#4A4A6A] text-xs items-center">
          <span>0 total</span><span>0 completed</span><span>0% success</span>
          <button className="h-8 px-3 rounded-lg bg-[#7B5CFC] text-white text-xs font-semibold">+ Schedule Call</button>
        </div>
      </div>

      <div className="px-6 py-3 border-b border-[#1C1C34] flex items-center gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search by name, phone, company..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-[#8B8FA8]" /></div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {["All", "Upcoming", "Overdue", "Completed", "Missed", "Cancelled"].map((t, i) => <button key={t} className={`px-3 py-1 text-xs rounded ${i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t}</button>)}
        </div>
      </div>

      <div className="flex-1 px-6 py-24 flex flex-col items-center">
        <CalendarX size={56} className="text-[#1C1C34] mb-4" />
        <div className="text-white text-lg font-semibold mb-2">No calls found</div>
        <p className="text-[#4A4A6A] text-sm mb-8">Schedule your first callback to get started</p>
        <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">+ Schedule Call</button>
      </div>

      <div className="px-6 py-3 border-t border-[#1C1C34] flex justify-between text-[11px] text-[#4A4A6A]"><span>Showing 0 of 0 calls</span><span>4:35 AM</span></div>
    </div>
  );
}
