import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  CheckCircle,
  ChevronDown,
  FileText,
  Globe,
  HelpCircle,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  Upload,
  UploadCloud,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/knowledge")({
  component: KnowledgePage,
});

const TABS = ["Sources (1)", "FAQs (68)", "Auto-Learning", "Insights"];

const FAQS = [
  {
    q: "What services does the clinic offer?",
    a: "We offer general dentistry, cosmetic procedures, orthodontics, implants, and emergency care...",
  },
  {
    q: "What are your opening hours?",
    a: "We are open Monday to Saturday from 9 AM to 9 PM. Closed on Sundays...",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes, we work with most major insurance providers. Please contact us with your provider details...",
  },
];

function KnowledgePage() {
  const [tab, setTab] = useState(TABS[0]);
  const [upTab, setUpTab] = useState<"files" | "web">("files");

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <Sparkles size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                Knowledge Base
              </div>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-xs px-2 py-0.5 rounded-full">
                AI-Powered
              </span>
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Train your agents with documents, websites, and FAQs
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 flex items-center gap-2 cursor-pointer text-sm">
            <Bot size={14} className="text-[#22C55E]" />
            <span className="text-white">Dental Assistant</span>
            <ChevronDown size={14} className="text-[#4A4A6A]" />
          </div>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
            <RefreshCw size={14} />
            Refresh
          </button>
          <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">
            Test in Messaging Lab →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-5 grid grid-cols-5 gap-3">
        <SmallStat value="75/100" label="Score" tone="text-amber-400" />
        <SmallStat value="1" label="Documents" tone="text-[#7B5CFC]" />
        <SmallStat value="68" label="FAQs Generated" tone="text-blue-400" />
        <SmallStat value="68" label="Voice Ready" tone="text-[#00D4AA]" />
        <SmallStat
          value="4K"
          label="Content Size"
          tone="text-[#22C55E]"
          extra={
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded ml-auto">
              Synced
            </span>
          }
        />
      </div>

      {/* Progress */}
      <div className="px-6 mb-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-[#8B8FA8] text-xs">
              Knowledge completeness
            </span>
            <span className="text-white text-xs font-semibold">75%</span>
          </div>
          <div className="h-2 bg-[#1C1C34] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7B5CFC] to-[#00D4AA]"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-5 flex gap-5 border-b border-[#1C1C34]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm ${
              tab === t
                ? "text-white border-b-2 border-[#7B5CFC] font-medium"
                : "text-[#4A4A6A] hover:text-[#8B8FA8]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === TABS[0] && (
        <div className="px-6 pb-6">
          <div className="flex bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden mb-5 w-fit">
            <button
              onClick={() => setUpTab("files")}
              className={`px-6 py-3 text-sm font-medium flex items-center gap-2 ${
                upTab === "files"
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              <Upload size={14} />
              Upload Files
            </button>
            <button
              onClick={() => setUpTab("web")}
              className={`px-6 py-3 text-sm flex items-center gap-2 ${
                upTab === "web"
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              <Globe size={14} />
              Website
            </button>
          </div>

          <div className="bg-[#0B0B1A] border-2 border-dashed border-[#1C1C34] rounded-xl p-16 text-center mb-5">
            <UploadCloud size={48} className="text-[#7B5CFC]/40 mx-auto mb-4" />
            <div className="text-white text-base font-semibold mb-2">
              Drag & drop files
            </div>
            <div className="text-[#4A4A6A] text-sm">
              PDF, DOCX, TXT, XLSX, MD, CSV — up to 10MB each
            </div>
            <button className="h-9 px-5 mt-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">
              Browse Files
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-[#8B8FA8] text-sm">1 source · 68 FAQs</span>
            <button className="h-8 px-3 rounded-md border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1">
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center">
              <FileText size={18} className="text-[#7B5CFC]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">
                Dental_Knowledge_Standard.pdf
              </div>
              <div className="text-[#4A4A6A] text-xs">
                236.0 KB · about 6 hours ago · 4K chars
              </div>
            </div>
            <span className="bg-blue-500/12 text-blue-400 text-xs px-2 py-0.5 rounded-full">
              68 FAQs
            </span>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle size={12} />
              Ready
            </span>
            <button className="text-[#8B8FA8] hover:text-white">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      )}

      {tab === TABS[1] && (
        <div className="px-6 pb-6 space-y-2">
          {FAQS.map((f) => (
            <FaqRow key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      )}

      {(tab === TABS[2] || tab === TABS[3]) && (
        <div className="px-6 py-16 text-center text-[#4A4A6A] text-sm">
          {tab} coming soon.
        </div>
      )}
    </div>
  );
}

function SmallStat({
  value,
  label,
  tone,
  extra,
}: {
  value: string;
  label: string;
  tone: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-2">
      <div className="flex-1">
        <div className={`text-[20px] font-bold leading-none ${tone}`}>
          {value}
        </div>
        <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
          {label}
        </div>
      </div>
      {extra}
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 cursor-pointer hover:border-[#7B5CFC]/30"
    >
      <div className="flex items-start gap-3">
        <HelpCircle size={16} className="text-[#7B5CFC] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="text-white text-sm font-medium">{q}</div>
          {open && (
            <div className="text-[#8B8FA8] text-xs mt-1.5">{a}</div>
          )}
        </div>
        <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">
          Voice Ready
        </span>
      </div>
    </div>
  );
}
