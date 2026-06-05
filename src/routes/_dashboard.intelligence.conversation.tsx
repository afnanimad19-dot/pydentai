import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle,
  BrainCircuit,
  ChevronUp,
  DollarSign,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/intelligence/conversation")({
  component: ConversationPage,
});

const EXAMPLES = [
  {
    title: "Buying Intent",
    icon: DollarSign,
    bg: "bg-[#22C55E]/15",
    color: "text-[#22C55E]",
    preview:
      "Customer: I want to buy the premium package. What's the price? Agent: The premium is $99/month. Would you like to proceed? Customer: That's a bit high. Can you offer a discount? Agent: I can offer 20% off for annual billing.",
    tags: ["Sales", "Pricing", "Discount"],
  },
  {
    title: "Support Request",
    icon: AlertCircle,
    bg: "bg-[#F59E0B]/15",
    color: "text-amber-400",
    preview:
      "Customer: My order hasn't arrived. It's been 5 days. Agent: I apologize. Let me check your order status. Customer: This is frustrating. I need it urgently. Agent: I understand your frustration. Let me expedite this.",
    tags: ["Support", "Urgent", "Delivery"],
  },
  {
    title: "Competitor Comparison",
    icon: Users,
    bg: "bg-blue-500/15",
    color: "text-blue-400",
    preview:
      "Customer: I'm comparing you with CompetitorX. They offer similar features for less. Agent: Great question. While pricing looks similar, our platform includes AI automation.",
    tags: ["Competitor", "Features", "AI"],
  },
  {
    title: "Onboarding Follow-up",
    icon: HelpCircle,
    bg: "bg-[#7B5CFC]/15",
    color: "text-[#9B84FF]",
    preview:
      "Customer: I just signed up but I'm confused about how to set up my first campaign. Agent: Welcome aboard! I'd be happy to walk you through it.",
    tags: ["Onboarding", "Setup", "Help"],
  },
];

function ConversationPage() {
  const [text, setText] = useState("");
  const [showExamples, setShowExamples] = useState(true);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
              <MessageSquare size={22} className="text-[#00D4AA]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                  Conversation Intelligence
                </div>
                <span className="bg-[#7B5CFC]/12 border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  AI
                </span>
              </div>
              <div className="text-[#4A4A6A] text-sm">
                Deep analysis · Intent detection · Emotion mapping · Deal scoring
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[#4A4A6A] text-sm">Status</span>
            <span className="text-[#22C55E] text-sm font-medium">Ready</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 grid grid-cols-12 gap-5">
        {/* Left */}
        <div className="col-span-7 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1C1C34] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#00D4AA]" />
                <span className="text-white text-sm font-semibold">
                  Conversation Input
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#4A4A6A] text-xs">
                <span>{words} words</span>
                <div className="w-px h-3 bg-[#1C1C34]" />
                <span>{lines} lines</span>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[240px] w-full bg-transparent p-5 text-[#8B8FA8] text-sm leading-relaxed resize-none focus:outline-none font-mono"
              placeholder={`Paste a conversation here...\n\nFormat:\nCustomer: Hi, I'm interested in your premium plan.\nAgent: Great! Our premium plan includes...\nCustomer: What about pricing?\nAgent: Let me explain the value...`}
            />
            <button className="w-full h-12 bg-[#7B5CFC] hover:bg-[#6047DB] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
              <Sparkles size={16} /> Analyze Conversation
            </button>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1C1C34] flex items-center gap-2">
              <Lightbulb size={14} className="text-[#F59E0B]" />
              <span className="text-white text-sm font-semibold">Quick Examples</span>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">
                4
              </span>
              <button
                onClick={() => setShowExamples((v) => !v)}
                className="ml-auto"
              >
                <ChevronUp
                  size={16}
                  className={`text-[#4A4A6A] transition-transform ${
                    showExamples ? "" : "rotate-180"
                  }`}
                />
              </button>
            </div>
            {showExamples &&
              EXAMPLES.map((ex, i) => {
                const I = ex.icon;
                return (
                  <div
                    key={i}
                    className="px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-all border-b border-[#1C1C34]/50 last:border-0"
                    onClick={() => setText(ex.preview)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${ex.bg}`}
                      >
                        <I size={14} className={ex.color} />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold">
                          {ex.title}
                        </div>
                        <div className="text-[#4A4A6A] text-xs leading-relaxed mt-0.5 line-clamp-2">
                          {ex.preview}
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          {ex.tags.map((t) => (
                            <span
                              key={t}
                              className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right */}
        <div className="col-span-5">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl h-full flex flex-col">
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-[72px] h-[72px] rounded-2xl bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 flex items-center justify-center mb-6">
                <BrainCircuit size={36} className="text-[#7B5CFC]/40" />
              </div>
              <div className="text-white text-lg font-semibold mb-2">
                Paste & Analyze
              </div>
              <div className="text-[#4A4A6A] text-sm leading-relaxed mb-8 max-w-xs">
                Paste any conversation and the AI will detect intent, emotions,
                buying signals, objections, and suggest next actions.
              </div>
              <div className="flex flex-col gap-3 w-full max-w-[280px]">
                {[
                  {
                    icon: Target,
                    color: "text-[#7B5CFC]",
                    bg: "bg-[#7B5CFC]/15",
                    label: "Intent Detection",
                    desc: "Buying, support, churn",
                  },
                  {
                    icon: Heart,
                    color: "text-[#FF4D6D]",
                    bg: "bg-[#FF4D6D]/15",
                    label: "Emotion Mapping",
                    desc: "Frustrated, excited, neutral",
                  },
                  {
                    icon: DollarSign,
                    color: "text-[#22C55E]",
                    bg: "bg-[#22C55E]/15",
                    label: "Deal Scoring",
                    desc: "0-100 close probability",
                  },
                ].map((f, i) => {
                  const I = f.icon;
                  return (
                    <div
                      key={i}
                      className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-3 flex items-center gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${f.bg}`}
                      >
                        <I size={14} className={f.color} />
                      </div>
                      <div className="text-white text-sm font-medium">
                        {f.label}
                      </div>
                      <div className="text-[#4A4A6A] text-xs ml-auto">
                        {f.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
