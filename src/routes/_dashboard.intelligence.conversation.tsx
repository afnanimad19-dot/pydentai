import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  BrainCircuit,
  ChevronUp,
  DollarSign,
  Heart,
  HelpCircle,
  Lightbulb,
  Loader2,
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
      "Customer: I want to buy the premium package. What's the price?\nAgent: The premium is $99/month. Would you like to proceed?\nCustomer: That's a bit high. Can you offer a discount?\nAgent: I can offer 20% off for annual billing.\nCustomer: That sounds reasonable, send me the link.\nAgent: Sending the checkout link now.",
    tags: ["Sales", "Pricing", "Discount"],
    result: {
      intent: "Booking Request",
      intentColor: "#7B5CFC",
      emotion: "Positive / Interested",
      emotionColor: "#22C55E",
      score: 82,
      objections: ["Price concern", "Annual commitment"],
    },
  },
  {
    title: "Support Request",
    icon: AlertCircle,
    bg: "bg-[#F59E0B]/15",
    color: "text-amber-400",
    preview:
      "Customer: My order hasn't arrived. It's been 5 days.\nAgent: I apologize. Let me check your order status.\nCustomer: This is frustrating. I need it urgently.\nAgent: I understand. I'm expediting now.\nCustomer: Will I get a refund if delayed again?\nAgent: Yes, we'll fully refund shipping.",
    tags: ["Support", "Urgent", "Delivery"],
    result: {
      intent: "Support Escalation",
      intentColor: "#F59E0B",
      emotion: "Frustrated",
      emotionColor: "#FF4D6D",
      score: 34,
      objections: ["Delivery delay", "Trust erosion"],
    },
  },
  {
    title: "Competitor Comparison",
    icon: Users,
    bg: "bg-blue-500/15",
    color: "text-blue-400",
    preview:
      "Customer: I'm comparing you with CompetitorX. They offer similar features for less.\nAgent: Great question. While pricing looks similar, our platform includes AI automation.\nCustomer: How much time would that save me?\nAgent: Our customers save ~12 hours per week on average.\nCustomer: Can you do a trial?\nAgent: Absolutely, 14-day free trial.",
    tags: ["Competitor", "Features", "AI"],
    result: {
      intent: "Evaluation",
      intentColor: "#3B82F6",
      emotion: "Curious",
      emotionColor: "#7B5CFC",
      score: 64,
      objections: ["Price vs competitor", "Switching cost"],
    },
  },
  {
    title: "Onboarding Follow-up",
    icon: HelpCircle,
    bg: "bg-[#7B5CFC]/15",
    color: "text-[#9B84FF]",
    preview:
      "Customer: I just signed up but I'm confused about how to set up my first campaign.\nAgent: Welcome aboard! I'd be happy to walk you through it.\nCustomer: I don't see where to add contacts.\nAgent: Top-left under Contacts → Import.\nCustomer: Got it, thanks!\nAgent: Want me to schedule a quick onboarding call?",
    tags: ["Onboarding", "Setup", "Help"],
    result: {
      intent: "Onboarding Assistance",
      intentColor: "#00D4AA",
      emotion: "Neutral / Open",
      emotionColor: "#00D4AA",
      score: 71,
      objections: ["Setup friction", "Time investment"],
    },
  },
];

type ResultShape = (typeof EXAMPLES)[number]["result"] | null;

function ConversationPage() {
  const [text, setText] = useState("");
  const [showExamples, setShowExamples] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ResultShape>(null);
  const [scoreAnim, setScoreAnim] = useState(0);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;

  const runAnalyze = (preset?: ResultShape) => {
    if (!text.trim() && !preset) return;
    setAnalyzing(true);
    setResults(null);
    setScoreAnim(0);
    setTimeout(() => {
      const r =
        preset ??
        {
          intent: "General Inquiry",
          intentColor: "#7B5CFC",
          emotion: "Neutral",
          emotionColor: "#00D4AA",
          score: 58,
          objections: ["Unclear next step", "Needs more info"],
        };
      setResults(r);
      setAnalyzing(false);
      requestAnimationFrame(() => setScoreAnim(r.score));
    }, 2500);
  };

  const pickExample = (ex: (typeof EXAMPLES)[number]) => {
    setText(ex.preview);
    setTimeout(() => runAnalyze(ex.result), 300);
  };

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
                <div className="text-white font-bold text-[22px] tracking-[-0.03em]">Conversation Intelligence</div>
                <span className="bg-[#7B5CFC]/12 border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full font-semibold">AI</span>
              </div>
              <div className="text-[#4A4A6A] text-sm">Deep analysis · Intent detection · Emotion mapping · Deal scoring</div>
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
        <div className="col-span-7 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1C1C34] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#00D4AA]" />
                <span className="text-white text-sm font-semibold">Conversation Input</span>
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
            <button
              onClick={() => runAnalyze()}
              disabled={!text.trim() || analyzing}
              className="w-full h-12 bg-[#7B5CFC] hover:bg-[#6047DB] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {analyzing ? "Analyzing..." : "Analyze Conversation"}
            </button>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1C1C34] flex items-center gap-2">
              <Lightbulb size={14} className="text-[#F59E0B]" />
              <span className="text-white text-sm font-semibold">Quick Examples</span>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">4</span>
              <button onClick={() => setShowExamples((v) => !v)} className="ml-auto">
                <ChevronUp size={16} className={`text-[#4A4A6A] transition-transform ${showExamples ? "" : "rotate-180"}`} />
              </button>
            </div>
            {showExamples &&
              EXAMPLES.map((ex, i) => {
                const I = ex.icon;
                return (
                  <div
                    key={i}
                    className="px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-all border-b border-[#1C1C34]/50 last:border-0"
                    onClick={() => pickExample(ex)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${ex.bg}`}>
                        <I size={14} className={ex.color} />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold">{ex.title}</div>
                        <div className="text-[#4A4A6A] text-xs leading-relaxed mt-0.5 line-clamp-2">{ex.preview}</div>
                        <div className="flex gap-1.5 mt-2">
                          {ex.tags.map((t) => (
                            <span key={t} className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="col-span-5">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl h-full flex flex-col">
            {!results && !analyzing && (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-[72px] h-[72px] rounded-2xl bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 flex items-center justify-center mb-6">
                  <BrainCircuit size={36} className="text-[#7B5CFC]/40" />
                </div>
                <div className="text-white text-lg font-semibold mb-2">Paste & Analyze</div>
                <div className="text-[#4A4A6A] text-sm leading-relaxed mb-8 max-w-xs">
                  Paste any conversation and the AI will detect intent, emotions, buying signals, objections, and suggest next actions.
                </div>
                <div className="flex flex-col gap-3 w-full max-w-[280px]">
                  {[
                    { icon: Target, color: "text-[#7B5CFC]", bg: "bg-[#7B5CFC]/15", label: "Intent Detection", desc: "Buying, support, churn" },
                    { icon: Heart, color: "text-[#FF4D6D]", bg: "bg-[#FF4D6D]/15", label: "Emotion Mapping", desc: "Frustrated, excited, neutral" },
                    { icon: DollarSign, color: "text-[#22C55E]", bg: "bg-[#22C55E]/15", label: "Deal Scoring", desc: "0-100 close probability" },
                  ].map((f, i) => {
                    const I = f.icon;
                    return (
                      <div key={i} className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-3 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${f.bg}`}>
                          <I size={14} className={f.color} />
                        </div>
                        <div className="text-white text-sm font-medium">{f.label}</div>
                        <div className="text-[#4A4A6A] text-xs ml-auto">{f.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {analyzing && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Loader2 size={32} className="text-[#7B5CFC] animate-spin" />
                <div className="text-white text-sm">Analyzing conversation...</div>
              </div>
            )}

            {results && !analyzing && (
              <div
                className="p-5 space-y-4 transition-all duration-500"
                style={{ opacity: 1, transform: "translateY(0)" }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-3">
                    <div className="text-[#4A4A6A] text-[10px] uppercase mb-2">Intent</div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: `${results.intentColor}26`, color: results.intentColor }}
                    >
                      {results.intent}
                    </span>
                  </div>
                  <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-3">
                    <div className="text-[#4A4A6A] text-[10px] uppercase mb-2">Emotion</div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: `${results.emotionColor}26`, color: results.emotionColor }}
                    >
                      {results.emotion}
                    </span>
                  </div>
                </div>

                <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#4A4A6A] text-[10px] uppercase">Deal Score</span>
                    <span className="text-white text-sm font-bold">{scoreAnim}/100</span>
                  </div>
                  <div className="h-2 bg-[#1C1C34] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#22C55E] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${scoreAnim}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
                  <div className="text-[#4A4A6A] text-[10px] uppercase mb-2">Objections</div>
                  <div className="space-y-1.5">
                    {results.objections.map((o, i) => (
                      <div key={i} className="flex items-center gap-2 text-white text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D]" />
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[#4A4A6A] text-[10px] uppercase">Next Actions</div>
                  {[
                    { icon: Target, t: "Send pricing breakdown" },
                    { icon: Sparkles, t: "Offer 7-day trial" },
                    { icon: MessageSquare, t: "Schedule follow-up call" },
                  ].map((a, i) => {
                    const I = a.icon;
                    return (
                      <div key={i} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 flex items-center gap-3">
                        <I size={14} className="text-[#7B5CFC]" />
                        <div className="text-white text-xs flex-1">{a.t}</div>
                        <button
                          onClick={() => toast.success("Applied")}
                          className="text-[#9B84FF] hover:text-white text-[11px] font-semibold"
                        >
                          Apply
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
