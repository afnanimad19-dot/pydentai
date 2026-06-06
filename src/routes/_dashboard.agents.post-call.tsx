import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle,
  FileText,
  RefreshCw,
  Send,
  TrendingUp,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/post-call")({
  component: PostCallPage,
});

const STEPS = [
  "Upload a document in Document Library",
  "Open an agent in Agent Studio → Post-Call tab",
  "Toggle auto-send on the document and add trigger keywords (e.g. 'send brochure')",
  "When a real call's transcript matches a keyword, the doc is sent automatically — logged here",
];

function PostCallPage() {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <Send size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
              Post-Call Activity
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Every brochure, pricing sheet, and document automatically sent
              after a call, across all agents.
            </div>
          </div>
        </div>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6 grid grid-cols-4 gap-4">
        <BigStat icon={Send} tone="text-blue-400" value="0" label="Total Sends" />
        <BigStat icon={CheckCircle} tone="text-[#22C55E]" value="0" label="Delivered" />
        <BigStat icon={XCircle} tone="text-red-400" value="0" label="Failed" />
        <BigStat icon={TrendingUp} tone="text-[#00D4AA]" value="0.0%" label="Success Rate" />
      </div>

      {/* Delivery Log */}
      <div className="px-6 pb-6">
        <div className="text-white font-semibold text-[15px] mb-4">
          Delivery Log
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            placeholder="Search recipient, agent, document..."
            className="flex-1 h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm px-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
          />
          <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm">
            <option>All Statuses</option>
          </select>
          <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm">
            <option>All Channels</option>
          </select>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
          <div className="bg-[#06060F] h-11 grid grid-cols-7 items-center text-[10px] uppercase tracking-wider text-[#4A4A6A] px-4">
            <div>When</div>
            <div>Agent</div>
            <div>Document</div>
            <div>Recipient</div>
            <div>Channel</div>
            <div>Status</div>
            <div>Trigger</div>
          </div>

          <div className="py-20 text-center">
            <FileText size={48} className="text-[#1C1C34] mx-auto mb-4" />
            <div className="text-white text-base font-semibold mb-3">
              No post-call sends yet
            </div>
            <div className="text-[#4A4A6A] text-sm mb-6">
              This page logs every document auto-sent after a call.
            </div>

            <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5 max-w-md mx-auto text-left">
              <div className="text-white text-sm font-semibold mb-3">
                To start a flow:
              </div>
              <div className="space-y-2">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#7B5CFC]/15 text-[#7B5CFC] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="text-[#8B8FA8] text-xs">{s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-6">
              <Link to="/agents/studio" className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center">
                Open Agent Studio
              </Link>
              <Link to="/agents/documents" className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center">
                Upload Document
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BigStat({
  icon: Icon,
  tone,
  value,
  label,
}: {
  icon: typeof Send;
  tone: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-5 flex items-center gap-4">
      <Icon size={22} className={tone} />
      <div>
        <div className="text-white font-bold text-xl leading-none">{value}</div>
        <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
          {label}
        </div>
      </div>
    </div>
  );
}
