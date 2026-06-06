import { createFileRoute } from "@tanstack/react-router";
import {
  Check, MessageCircle, Phone, CalendarCheck, Send, BarChart3, Globe,
  Megaphone, Activity, Users, GitBranch, PieChart, Webhook, ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — pydent.ai" },
      { name: "description", content: "Everything your dental practice needs to automate patient communication — voice, WhatsApp, SMS, email, and Instagram." },
      { property: "og:title", content: "Features — pydent.ai" },
      { property: "og:description", content: "Complete AI communication stack for dental clinics." },
    ],
  }),
  component: FeaturesPage,
});

const PrimaryBtn = ({ children }: { children: React.ReactNode }) => (
  <a href="/signup" className="inline-flex items-center gap-2 bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold px-6 h-11 rounded-xl transition-colors">
    {children} <ArrowRight size={16} />
  </a>
);
const GhostBtn = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a href={href} className="inline-flex items-center gap-2 border border-[#1C1C34] hover:bg-white/5 text-white text-sm font-semibold px-6 h-11 rounded-xl transition-colors">
    {children}
  </a>
);

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block bg-[#7B5CFC]/10 text-[#9B84FF] text-xs font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-full">{children}</span>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-6">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2.5">
          <Check size={16} className="text-[#7B5CFC] mt-0.5 flex-shrink-0" />
          <span className="text-sm text-white">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function FeatureRow({ reverse, tag, title, body, bullets, mockup }: {
  reverse?: boolean; tag: string; title: string; body: string; bullets: string[]; mockup: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 border-b border-[#1C1C34]/50">
      <div className={reverse ? "lg:order-2" : ""}>
        <Tag>{tag}</Tag>
        <h2 className="font-display font-bold text-white text-[34px] md:text-[40px] tracking-[-0.03em] leading-[1.1] mt-4">{title}</h2>
        <p className="text-[#8B8FA8] text-[15px] leading-[1.7] mt-5">{body}</p>
        <Bullets items={bullets} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{mockup}</div>
    </div>
  );
}

/* ---------- Mockups ---------- */
function AgentStudioMockup() {
  const rows = [
    { name: "Dental Assistant", type: "Chat", status: "Live", color: "#22C55E", pct: 87, ch: "WA • IG" },
    { name: "Appointment Setter", type: "Voice", status: "Live", color: "#22C55E", pct: 92, ch: "Phone" },
    { name: "Follow-Up Agent", type: "Omnichannel", status: "Testing", color: "#FFAB00", pct: 65, ch: "All" },
  ];
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-5 overflow-hidden">
      <div className="text-[11px] text-[#4A4A6A] uppercase tracking-wider mb-3">Agent Studio</div>
      <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1fr_0.8fr] gap-3 text-[11px] text-[#4A4A6A] uppercase tracking-wider pb-2 border-b border-[#1C1C34]">
        <span>Agent</span><span>Type</span><span>Status</span><span>Readiness</span><span>Channels</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1fr_0.8fr] gap-3 items-center h-10 border-b border-[#1C1C34] text-[13px] text-white">
          <span className="font-medium">{r.name}</span>
          <span className="text-[#8B8FA8]">{r.type}</span>
          <span className="flex items-center gap-2 text-[#8B8FA8]"><span className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />{r.status}</span>
          <span className="flex items-center gap-2">
            <span className="flex-1 h-1 bg-[#1C1C34] rounded-full overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${r.pct}%`, background: "#7B5CFC" }} /></span>
            <span className="text-[11px] text-[#8B8FA8] w-8 text-right">{r.pct}%</span>
          </span>
          <span className="text-[#8B8FA8] text-xs">{r.ch}</span>
        </div>
      ))}
    </div>
  );
}

function WorkflowMockup() {
  const nodes = ["Inbound WhatsApp", "AI Greeting", "Collect Info", "Book Appointment", "Send Confirmation"];
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-5" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
      <div className="text-[11px] text-[#4A4A6A] uppercase tracking-wider mb-4">Workflow Canvas</div>
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`rounded-xl px-3 py-2.5 text-xs text-white border ${n === "Book Appointment" ? "border-[#7B5CFC] bg-[#7B5CFC]/10" : "bg-[#141428] border-[#1C1C34]"}`}>{n}</div>
            {i < nodes.length - 1 && <ArrowRight size={14} className="text-[#7B5CFC]/60" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsAppMockup() {
  const convos = [
    { n: "Omar A.", m: "Can I book a cleaning?", t: "2m" },
    { n: "Sara A.", m: "What time tomorrow?", t: "8m" },
    { n: "Khalid M.", m: "Thanks!", t: "1h" },
  ];
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl overflow-hidden">
      <div className="grid grid-cols-[40%_60%] h-[280px]">
        <div className="border-r border-[#1C1C34] p-3 space-y-2 overflow-hidden">
          {convos.map((c) => (
            <div key={c.n} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#141428]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B5CFC]/40 to-[#00D4AA]/30 flex items-center justify-center text-[10px] text-white font-semibold">{c.n[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[11px] text-white"><span className="truncate font-medium">{c.n}</span><span className="text-[#4A4A6A]">{c.t}</span></div>
                <div className="text-[11px] text-[#8B8FA8] truncate">{c.m}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-2 bg-[#06060F]/50">
          <div className="self-start max-w-[80%] bg-[#141428] border border-[#1C1C34] rounded-lg px-3 py-2 text-xs text-white">Hi, can I book a cleaning?</div>
          <div className="self-end max-w-[80%] bg-[#7B5CFC]/20 border border-[#7B5CFC]/30 rounded-lg px-3 py-2 text-xs text-white">Of course! We have openings tomorrow at 10am and 2pm.</div>
          <div className="self-start max-w-[80%] bg-[#141428] border border-[#1C1C34] rounded-lg px-3 py-2 text-xs text-white">10am works.</div>
          <div className="mt-auto flex gap-2">
            <input disabled placeholder="Type a message" className="flex-1 bg-[#141428] border border-[#1C1C34] rounded-lg px-3 py-2 text-xs text-[#4A4A6A]" />
            <button className="bg-[#7B5CFC] rounded-lg px-3 text-white text-xs">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntelligenceMockup() {
  const metrics = [
    { label: "Intent", value: "Appointment Booking", pct: 90, color: "#22C55E" },
    { label: "Sentiment", value: "Positive", pct: 78, color: "#00D4AA" },
    { label: "Deal Score", value: "84 / 100", pct: 84, color: "#7B5CFC" },
    { label: "Urgency", value: "High", pct: 70, color: "#FFAB00" },
  ];
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-5">
      <div className="text-[11px] text-[#4A4A6A] uppercase tracking-wider mb-4">Conversation Analysis</div>
      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1.5"><span className="text-[#8B8FA8]">{m.label}</span><span className="text-white font-medium">{m.value}</span></div>
            <div className="h-1.5 bg-[#1C1C34] rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-5 border border-[#FFAB00]/40 bg-[#FFAB00]/5 rounded-xl p-3">
        <div className="text-[10px] uppercase tracking-wider text-[#FFAB00] mb-1">Recommended Action</div>
        <div className="text-xs text-white">Send appointment confirmation and pricing details</div>
      </div>
    </div>
  );
}

function LiveMonitorMockup() {
  const cards = [
    { n: "Omar A.", ch: "WhatsApp", m: "Looking to book a cleaning…" },
    { n: "Sara A.", ch: "Voice", m: "What are your prices for whitening?" },
    { n: "Khalid M.", ch: "Instagram", m: "Do you accept insurance?" },
  ];
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-white font-semibold">Live Monitor</div>
        <div className="flex items-center gap-2 text-xs text-[#8B8FA8]"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />3 active conversations</div>
      </div>
      <div className="space-y-2.5">
        {cards.map((c) => (
          <div key={c.n} className="bg-[#141428] border border-[#1C1C34] rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7B5CFC]/20 flex items-center justify-center text-[10px] text-white font-semibold">{c.n[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white font-medium flex items-center gap-2">{c.n} <span className="text-[10px] text-[#4A4A6A]">· {c.ch}</span></div>
              <div className="text-[11px] text-[#8B8FA8] truncate">{c.m}</div>
            </div>
            <span className="text-[10px] bg-[#7B5CFC]/15 text-[#9B84FF] px-2 py-0.5 rounded-full">AI handling</span>
            <button className="text-[11px] border border-[#1C1C34] hover:bg-white/5 rounded-lg px-2.5 py-1 text-white">Take Over</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
const FEATURE_GRID = [
  { icon: MessageCircle, color: "#7B5CFC", title: "WhatsApp AI Inbox", body: "Full Business API inbox with AI responses and human override" },
  { icon: Phone, color: "#00D4AA", title: "Voice AI Receptionist", body: "Vapi.ai-powered voice agents with sub-500ms latency" },
  { icon: CalendarCheck, color: "#FFAB00", title: "Smart Appointment Booking", body: "Patients book directly via chat or voice call, no forms" },
  { icon: Send, color: "#7B5CFC", title: "Patient Recall Campaigns", body: "Automated WhatsApp and SMS re-engagement sequences" },
  { icon: BarChart3, color: "#00D4AA", title: "Lead Scoring Engine", body: "AI scores 0–100 for booking probability on every inquiry" },
  { icon: Globe, color: "#FFAB00", title: "Arabic + English AI", body: "Automatic language detection and bilingual responses" },
  { icon: Megaphone, color: "#7B5CFC", title: "Broadcast Campaigns", body: "Marketing, utility, and broadcast campaign types" },
  { icon: Activity, color: "#00D4AA", title: "Live Conversation Monitor", body: "Watch and override any AI conversation in real time" },
  { icon: Users, color: "#FFAB00", title: "Patient CRM", body: "Unified database with lead scores, tags, and conversation history" },
  { icon: GitBranch, color: "#7B5CFC", title: "Workflow Builder", body: "30+ node visual drag-and-drop automation canvas" },
  { icon: PieChart, color: "#00D4AA", title: "Performance Analytics", body: "Campaign rates, agent uptime, channel health reports" },
  { icon: Webhook, color: "#FFAB00", title: "API & Webhooks", body: "Connect pydent.ai to any existing system via REST + webhooks" },
];

const INTEGRATIONS = [
  { name: "WhatsApp", color: "#22C55E" },
  { name: "Meta", color: "#1877F2" },
  { name: "Twilio", color: "#F22F46" },
  { name: "Google Calendar", color: "#4285F4" },
  { name: "Stripe", color: "#7B5CFC" },
  { name: "Resend", color: "#00D4AA" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Vapi.ai", color: "#9B84FF" },
  { name: "Instagram", color: "#E1306C" },
  { name: "Supabase", color: "#3ECF8E" },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#06060F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-beam-purple py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block bg-[#7B5CFC]/[0.08] border border-[#7B5CFC]/20 text-[#9B84FF] text-xs px-4 py-1.5 rounded-full tracking-[0.04em] font-semibold">All Features</span>
          <h1 className="font-display font-bold text-white tracking-[-0.035em] mt-6 leading-[1.05]" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
            Everything Your Dental Practice<br />Needs to Automate Communication
          </h1>
          <p className="text-[#8B8FA8] text-[17px] max-w-xl mx-auto mt-6 leading-[1.7]">
            pydent.ai gives dental clinics and polyclinics a complete AI communication stack — voice, WhatsApp, SMS, email, and Instagram — all managed from one dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <PrimaryBtn>Start Free Trial</PrimaryBtn>
            <GhostBtn href="/pricing">View Pricing</GhostBtn>
          </div>
        </div>
      </section>

      {/* ALTERNATING ROWS */}
      <section className="max-w-7xl mx-auto px-6">
        <FeatureRow
          tag="AI Agent Studio"
          title="Deploy AI Agents Across Every Channel"
          body="Build and configure chat agents for WhatsApp, Instagram, and web — or voice agents for inbound phone calls. Each agent has its own system prompt, knowledge base, escalation rules, and assigned channels."
          bullets={[
            "Chat agents for WhatsApp, Instagram, and website",
            "Voice AI agents via Vapi.ai — sub-500ms response time",
            "Omnichannel agents across all platforms simultaneously",
            "5-step wizard: Type → Intelligence → Identity → Behavior → Channels",
          ]}
          mockup={<AgentStudioMockup />}
        />
        <FeatureRow
          reverse
          tag="Automation Engine"
          title="Visual Workflow Builder — No Code Required"
          body="Build patient journeys with a drag-and-drop canvas. 30+ node types including AI Response, Condition, Sentiment Check, Delay, Collect Data, Schedule Meeting, Transfer Call, and Agent Handoff."
          bullets={[
            "30+ node types: triggers, logic, channels, actions",
            "Test in sandbox before publishing to live patients",
            "Version control — every publish creates a new version",
            "Workflow templates for common dental scenarios",
          ]}
          mockup={<WorkflowMockup />}
        />
        <FeatureRow
          tag="WhatsApp"
          title="Full WhatsApp Business API — In One Dashboard"
          body="Connect your WhatsApp Business number and manage every conversation, campaign, and template in one place. pydent.ai handles Meta API compliance, webhook verification, and delivery status automatically."
          bullets={[
            "Real-time inbox with AI + human conversation switching",
            "Campaign builder: Marketing, Utility, and Broadcast types",
            "Template manager with Meta approval submission",
            "Rate limit monitoring — Tier 1 (1,000/day) to Tier 3 (100,000/day)",
          ]}
          mockup={<WhatsAppMockup />}
        />
        <FeatureRow
          reverse
          tag="Intelligence Layer"
          title="Understand Every Patient Conversation"
          body="pydent.ai runs AI analysis on every conversation and call. Get intent detection, emotion mapping, deal scoring, objection identification, and recommended next actions — automatically."
          bullets={[
            "Conversation Intelligence: paste any transcript for instant analysis",
            "AI Brain: cross-channel predictive analytics and recommendations",
            "Lead scoring 0–100 based on conversation signals",
            "Post-call summaries with sentiment score and outcome",
          ]}
          mockup={<IntelligenceMockup />}
        />
        <FeatureRow
          tag="Engage"
          title="Monitor Every Call and Live Conversation"
          body="Watch all active AI conversations in real time from the Live Monitor. Override any conversation with a single click. Review call recordings, full transcripts, and sentiment scores from the Call History."
          bullets={[
            "Live Monitor: real-time view of all active AI conversations",
            "Override any AI conversation with one click",
            "Call History: recordings, transcripts, and AI-scored outcomes",
            "Upcoming Calls scheduler with assigned agent and script",
          ]}
          mockup={<LiveMonitorMockup />}
        />
      </section>

      {/* 12-FEATURE GRID */}
      <section className="py-24 px-6 bg-[#04040C] bg-grid-faint relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-display font-bold text-white text-center tracking-[-0.03em]" style={{ fontSize: "clamp(32px, 4vw, 42px)" }}>
            The Complete Feature Set
          </h2>
          <p className="text-[#8B8FA8] text-center mt-4 mb-16 max-w-xl mx-auto">
            Every tool your dental practice needs to automate patient communication end-to-end.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_GRID.map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6 hover:border-[#7B5CFC]/30 hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${color}26` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-white text-[15px] font-semibold mt-4 mb-2">{title}</h3>
                <p className="text-[#8B8FA8] text-[13px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="font-display font-bold text-white tracking-[-0.03em]" style={{ fontSize: "clamp(32px, 4vw, 42px)" }}>
          Connect With Your Existing Stack
        </h2>
        <p className="text-[#8B8FA8] mt-4 max-w-xl mx-auto">
          pydent.ai connects with all the tools dental teams already use — no middleware needed
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-14 max-w-3xl mx-auto">
          {INTEGRATIONS.map((i) => (
            <div key={i.name} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 text-center hover:border-[#7B5CFC]/25 transition-all">
              <div className="w-8 h-8 rounded-xl mx-auto flex items-center justify-center text-white text-xs font-semibold" style={{ background: i.color }}>{i.name[0]}</div>
              <div className="text-[#8B8FA8] text-xs mt-3">{i.name}</div>
            </div>
          ))}
        </div>
        <p className="text-[#4A4A6A] text-sm mt-12">Full API documentation available for custom integrations</p>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-beam-purple py-24 px-6 relative">
        <div className="max-w-3xl mx-auto bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-12 text-center relative z-10">
          <h2 className="font-display font-bold text-white tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
            Start Automating Your Dental Practice
          </h2>
          <p className="text-[#8B8FA8] mt-4 max-w-md mx-auto">Join 200+ dental clinics automating patient communication.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <PrimaryBtn>Get Started Free</PrimaryBtn>
            <GhostBtn>Request a Demo</GhostBtn>
          </div>
          <p className="text-[#4A4A6A] text-xs mt-6">No credit card required · 14-day free trial · Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
