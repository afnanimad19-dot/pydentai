import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  Globe,
  Inbox,
  LayoutGrid,
  List,
  RefreshCw,
  Search,
  Upload,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/documents")({
  component: DocumentsPage,
});

const STATS = [
  ["0", "Total Docs"],
  ["0", "Projects"],
  ["0", "FAQs"],
  ["0", "Ready"],
  ["0", "Processing"],
  ["0", "Pending"],
  ["0", "Assigned"],
  ["0.0 MB", "Storage"],
];

function DocumentsPage() {
  const [view, setView] = useState<"projects" | "list" | "grid">("projects");
  const [status, setStatus] = useState("All");

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <BookOpen size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
              Document Library
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Centralized knowledge hub · AI-powered document management &
              delivery
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {["Sync", "Export CSV", "Scrape URL"].map((b) => (
            <button
              key={b}
              className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm"
            >
              {b}
            </button>
          ))}
          <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2">
            <Upload size={14} />
            Upload
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-2 grid grid-cols-8 gap-3">
        {STATS.map(([v, l]) => (
          <div
            key={l}
            className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center"
          >
            <div className="text-white font-bold text-lg leading-none">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1.5">
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-5">
        <div className="bg-[#1C1C34] h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-[#7B5CFC] rounded-full" style={{ width: "0%" }} />
        </div>
        <div className="text-[#4A4A6A] text-[10px] text-right mt-1">
          0% parsed
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-6 mb-4 flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["projects", "list", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize ${
                view === v
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {v === "list" ? <List size={12} /> : v === "grid" ? <LayoutGrid size={12} /> : "Projects"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {["All", "Completed", "Processing", "Pending"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                status === s
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-xs">
          <option>Most Recent</option>
          <option>Oldest</option>
          <option>Name A-Z</option>
        </select>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]"
            />
            <input
              placeholder="Search documents..."
              className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
            />
          </div>
          <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">
            + New Project
          </button>
        </div>
      </div>

      {/* Empty */}
      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl flex flex-col items-center justify-center py-20">
          <Inbox size={48} className="text-[#1C1C34] mx-auto mb-4" />
          <div className="text-white text-lg font-semibold mb-2">
            Your library is empty
          </div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
            Upload your first document or scrape a website to start building
            your AI-powered knowledge base.
          </div>
          <div className="flex gap-3 justify-center">
            <button className="h-10 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
              <Globe size={14} />
              Scrape URL
            </button>
            <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2">
              <Upload size={14} />
              Upload Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
