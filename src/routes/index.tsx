import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  PlayCircle,
  TrendingUp,
  Zap,
  Star,
  Bot,
  BarChart3,
  Link as LinkIcon,
  Settings,
  Smile,
  MessageSquare,
  Calendar,
  Inbox,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { MarketingLayout } from "@/components/marketing/marketing-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "pydent.ai — AI-Powered Patient Communication for Dental Clinics" },
      {
        name: "description",
        content:
          "Automate every patient conversation across WhatsApp, phone, and SMS. pydent.ai is the AI brain for modern dental practices in UAE and the GCC.",
      },
      { property: "og:title", content: "pydent.ai — AI for Dental Clinics" },
      {
        property: "og:description",
        content:
          "Stop losing patients to slow responses. pydent.ai handles every conversation 24/7 across WhatsApp, voice, and SMS.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

/* -------------------------------------------------------------------------- */
/*  Small shared bits                                                          */
/* -------------------------------------------------------------------------- */

function Avatar({ initials, from, to }: { initials: string; from: string; to: string }) {
  return (
    <span
      className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-white border-2 border-[#06060F]"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {initials}
    </span>
  );
}

function PrimaryButton({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <button
      className={`bg-[#7B5CFC] hover:bg-[#6047DB] text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(123,92,252,0.55)] ${
        large ? "px-8 py-4 text-base" : "px-8 py-3.5 text-base"
      }`}
    >
      {children}
    </button>
  );
}

function GhostButton({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <button
      className={`border border-[#1C1C34] hover:border-[#7B5CFC]/40 text-white rounded-xl hover:bg-white/[0.04] transition-all flex items-center gap-2 ${
        large ? "px-8 py-4 text-base" : "px-8 py-3.5 text-base"
      }`}
    >
      {children}
    </button>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#7B5CFC]/[0.1] border border-[#7B5CFC]/30 rounded-full px-4 py-1.5 text-xs font-medium text-[#9B84FF] uppercase tracking-wider">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

function HomePage() {
  return (
    <MarketingLayout>
      <Navbar />
      <Hero />
      <PartnerLogos />
      <WhyPydent />
      <Stats />
      <HowItWorks />
      <ProductShowcase />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </MarketingLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Hero                                                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden pt-[72px]"
      style={{ background: "var(--gradient-hero)", minHeight: "100vh" }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#7B5CFC]/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] rounded-full bg-[#00D4AA]/[0.04] blur-[80px]" />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center max-w-[900px] mx-auto px-6 pt-16 pb-10">
        <div className="mb-8 inline-flex">
          <span className="bg-[#7B5CFC]/[0.1] border border-[#7B5CFC]/30 rounded-full px-5 py-2 inline-flex items-center gap-2">
            <Sparkles size={14} className="text-[#7B5CFC]" />
            <span className="text-sm text-[#9B84FF] font-medium">
              New: AI Voice Agents for Dental Clinics
            </span>
          </span>
        </div>

        <h1
          className="font-display text-white text-center mb-6"
          style={{ fontSize: "clamp(42px, 6.5vw, 80px)", fontWeight: 800, lineHeight: 1.05 }}
        >
          The AI-Powered Brain
          <br />
          for Your <em className="not-italic"><span className="italic text-[#7B5CFC]">Dental</span></em> Practice
        </h1>

        <p className="text-[#8B8FA8] text-xl leading-relaxed max-w-[600px] mx-auto text-center mb-10">
          Stop losing patients to slow responses. pydent.ai automates every patient
          conversation across WhatsApp, phone, and SMS — while you focus on dentistry.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <PrimaryButton>Start Free Trial →</PrimaryButton>
          <GhostButton>
            <PlayCircle size={18} /> Request a Demo
          </GhostButton>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
          <div className="flex">
            <Avatar initials="OA" from="#7B5CFC" to="#5B3FDC" />
            <span className="-ml-3"><Avatar initials="SA" from="#00D4AA" to="#0E8C7A" /></span>
            <span className="-ml-3"><Avatar initials="KM" from="#FFAB00" to="#C57B00" /></span>
            <span className="-ml-3"><Avatar initials="FR" from="#9B84FF" to="#6047DB" /></span>
          </div>
          <span className="text-[#FFAB00] text-sm">★★★★★</span>
          <span className="text-[#4A4A6A] text-sm">
            Trusted by 200+ dental clinics in UAE &amp; GCC
          </span>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 pb-0 mt-4">
        <div className="relative">
          <div
            className="group bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl overflow-hidden transition-transform duration-500"
            style={{
              boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
              transform: "perspective(1400px) rotateX(3.5deg)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "perspective(1400px) rotateX(0deg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "perspective(1400px) rotateX(3.5deg)")
            }
          >
            <BrowserBar url="pydent.ai/dashboard" />
            <DashboardMockup />
          </div>

          {/* Floating chips */}
          <FloatingChip
            className="-left-4 top-1/4 animate-float"
            icon={<TrendingUp size={18} className="text-[#00D4AA]" />}
            title="47 New Patients"
            sub="this week"
          />
          <FloatingChip
            className="-right-4 top-1/3 animate-float"
            style={{ animationDelay: "0.5s" }}
            icon={<Zap size={18} className="text-[#7B5CFC]" />}
            title="3.2s Avg Response"
            sub="AI-powered"
          />
          <FloatingChip
            className="right-8 bottom-10 animate-float"
            style={{ animationDelay: "1s" }}
            icon={<Star size={18} className="text-[#FFAB00]" />}
            title="4.9 / 5 Rating"
            sub="200+ clinics"
          />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#7B5CFC]/[0.07] blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  className = "",
  style,
  icon,
  title,
  sub,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={`absolute z-20 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 shadow-2xl shadow-black/60 hidden lg:flex items-center gap-2.5 ${className}`}
      style={style}
    >
      {icon}
      <div className="flex flex-col leading-tight">
        <span className="text-white text-sm font-semibold">{title}</span>
        <span className="text-[#8B8FA8] text-[11px]">{sub}</span>
      </div>
    </div>
  );
}

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="h-9 bg-[#0F0F22] flex items-center px-4 gap-2 border-b border-[#1C1C34]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
      <div className="h-5 w-52 bg-[#06060F] rounded-full mx-auto flex items-center justify-center">
        <span className="text-[10px] text-[#4A4A6A]">{url}</span>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="bg-[#08081A] p-4 grid grid-cols-12 gap-3">
      {/* Sidebar */}
      <div className="col-span-2 bg-[#0B0B1A] rounded-xl p-3 flex flex-col gap-2 h-[280px]">
        <div className="h-8 w-full bg-[#7B5CFC]/15 rounded-lg mb-2" />
        {[1, 0.7, 0.55, 0.4, 0.3, 0.25].map((o, i) => (
          <div
            key={i}
            className={`h-7 w-full rounded-md ${
              i === 0 ? "bg-[#7B5CFC]/20" : "bg-[#1C1C34]"
            }`}
            style={i === 0 ? undefined : { opacity: o }}
          />
        ))}
      </div>

      {/* Main */}
      <div className="col-span-10 flex flex-col gap-3">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-3">
          {[
            "bg-[#7B5CFC]/40",
            "bg-[#00D4AA]/30",
            "bg-[#FFAB00]/30",
            "bg-[#7B5CFC]/20",
          ].map((c, i) => (
            <div key={i} className="h-16 bg-[#0F0F22] rounded-xl border border-[#1C1C34] p-3">
              <div className="h-2 w-16 bg-[#1C1C34] rounded-sm mb-2" />
              <div className={`h-5 w-12 rounded-md ${c}`} />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-3 h-[180px]">
          <div className="col-span-2 bg-[#0F0F22] rounded-xl border border-[#1C1C34] p-4 flex flex-col">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="flex-1 w-full">
              <path
                d="M0,100 C30,80 60,40 90,50 S150,20 180,30 S240,10 300,20 L300,120 L0,120 Z"
                fill="rgba(123,92,252,0.12)"
                stroke="#7B5CFC"
                strokeWidth="2"
              />
              <path
                d="M0,110 C30,95 60,70 90,80 S150,60 180,65 S240,50 300,55 L300,120 L0,120 Z"
                fill="rgba(0,212,170,0.1)"
                stroke="#00D4AA"
                strokeWidth="2"
              />
            </svg>
            <div className="flex justify-between mt-2 text-[9px] text-[#4A4A6A]">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <div className="bg-[#0F0F22] rounded-xl border border-[#1C1C34] p-3 flex-1 flex flex-col gap-3 justify-center">
              {[
                { c: "bg-[#7B5CFC]/30", w: "70%", b: "bg-[#7B5CFC]" },
                { c: "bg-[#00D4AA]/30", w: "50%", b: "bg-[#00D4AA]" },
                { c: "bg-[#FFAB00]/30", w: "85%", b: "bg-[#FFAB00]" },
              ].map((r, i) => (
                <div key={i} className="h-6 flex gap-2 items-center">
                  <span className={`w-4 h-4 rounded-full ${r.c}`} />
                  <div className="flex-1 h-2 rounded-full bg-[#1C1C34] overflow-hidden">
                    <div className={`h-full ${r.b}`} style={{ width: r.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Partner logos                                                           */
/* -------------------------------------------------------------------------- */

function PartnerLogos() {
  const logos = ["WhatsApp", "Meta", "Twilio", "Google Calendar", "Stripe", "Resend", "Zapier"];
  return (
    <section className="py-12 border-y border-[#1C1C34]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[#4A4A6A] text-xs uppercase tracking-[0.15em] text-center mb-8">
          Integrated with the tools dental teams already use
        </p>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          {logos.map((logo, i) => (
            <div key={logo} className="flex items-center gap-10">
              <span className="text-[#4A4A6A] font-semibold text-sm hover:text-[#8B8FA8] transition-colors cursor-default">
                {logo}
              </span>
              {i < logos.length - 1 && (
                <span className="w-px h-4 bg-[#1C1C34] hidden md:inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Why pydent.ai                                                           */
/* -------------------------------------------------------------------------- */

function WhyPydent() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge>Why pydent.ai</SectionBadge>
          <h2
            className="font-display text-white max-w-3xl mx-auto mt-5"
            style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}
          >
            Built Specifically for{" "}
            <em className="italic text-[#7B5CFC] not-italic">
              <span className="italic">Dental Practices</span>
            </em>
          </h2>
          <p className="text-[#8B8FA8] text-lg max-w-xl mx-auto mt-4">
            Most CRMs are generic. pydent.ai understands dental workflows — from first
            patient inquiry to post-treatment follow-up and recall.
          </p>
        </div>

        {/* Row 1: 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Card 1 — AI conversations */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 overflow-hidden relative hover:border-[#7B5CFC]/30 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#7B5CFC] via-[#9B84FF] to-transparent" />
            <span className="bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 text-[#9B84FF] text-xs px-3 py-1 rounded-full inline-flex mb-4">
              AI Conversations
            </span>
            <h3 className="text-white text-2xl font-bold font-display mb-3">
              AI That Speaks Like Your Receptionist
            </h3>
            <p className="text-[#8B8FA8] text-sm leading-relaxed mb-6 max-w-sm">
              pydent.ai engages every patient in natural conversation across WhatsApp,
              voice calls, and SMS — in English and Arabic.
            </p>

            <div className="bg-[#06060F] rounded-xl p-5 border border-[#1C1C34]">
              <div>
                <div className="bg-[#141428] rounded-xl rounded-tl-[4px] px-4 py-3 text-sm text-white max-w-[80%] w-fit">
                  Hi, I'd like to book a checkup appointment 🦷
                </div>
                <div className="text-[10px] text-[#4A4A6A] mt-1">09:23 AM</div>
              </div>
              <div className="flex justify-end mt-3">
                <div className="max-w-[85%]">
                  <div className="text-[10px] text-[#7B5CFC] text-right mb-1">
                    AI Agent · Replied in 1.8s
                  </div>
                  <div className="bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 rounded-xl rounded-tr-[4px] px-4 py-3 text-sm text-white">
                    Hello! Happy to help book your checkup 😊 We have slots available
                    Thursday at 2pm or Friday at 10am. Which works for you?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Automation */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 overflow-hidden relative hover:border-[#00D4AA]/20 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00D4AA] to-transparent" />
            <span className="bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] text-xs px-3 py-1 rounded-full inline-flex mb-4">
              Automation
            </span>
            <h3 className="text-white text-2xl font-bold font-display mb-3">
              Automate Every Task With AI
            </h3>
            <p className="text-[#8B8FA8] text-sm leading-relaxed mb-6 max-w-sm">
              Appointment reminders, post-treatment follow-ups, no-show recovery, recall
              campaigns — all running automatically.
            </p>

            <div className="bg-[#06060F] rounded-xl p-4 border border-[#1C1C34] mt-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {[
                  { label: "Patient Arrives", sub: "WhatsApp DM" },
                  { label: "AI Greets", sub: "< 2 sec" },
                  { label: "Books Slot", sub: "Calendar sync" },
                  { label: "Sends Reminder", sub: "24h before" },
                ].map((n, i) => (
                  <div key={n.label} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap">
                        {n.label}
                      </div>
                      <span className="text-[10px] text-[#4A4A6A] mt-1">{n.sub}</span>
                    </div>
                    {i < 3 && <span className="text-[#7B5CFC] text-base">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 3 small cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Voice AI */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-7 hover:border-[#7B5CFC]/25 transition-all">
            <div className="h-11 w-11 rounded-xl bg-[#7B5CFC]/15 flex items-center justify-center">
              <Bot size={20} className="text-[#7B5CFC]" />
            </div>
            <h3 className="text-white font-display font-bold text-lg mb-2 mt-4">
              Human-Like Voice Agents
            </h3>
            <p className="text-[#8B8FA8] text-sm">
              AI answers every inbound call, books appointments, and follows up — in a
              natural voice patients trust.
            </p>
            <div className="flex items-end gap-[3px] h-10 mt-4">
              {[20, 35, 15, 45, 30, 50, 25, 40, 20, 55, 30, 45, 15, 35, 20].map((h, i) => {
                const isMiddle = i >= 5 && i <= 9;
                return (
                  <span
                    key={i}
                    className={`w-[2px] rounded-full ${
                      isMiddle ? "bg-[#7B5CFC] animate-pulse" : "bg-[#1C1C34]"
                    }`}
                    style={{ height: `${h}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Autopilot */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-7 hover:border-[#00D4AA]/20 transition-all">
            <div className="h-11 w-11 rounded-xl bg-[#00D4AA]/15 flex items-center justify-center">
              <Zap size={20} className="text-[#00D4AA]" />
            </div>
            <h3 className="text-white font-display font-bold text-lg mb-2 mt-4">
              Full Autopilot Mode
            </h3>
            <p className="text-[#8B8FA8] text-sm">
              Enable AI to handle 100% of conversations automatically. Override any time
              with one click.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[#8B8FA8] text-sm">Autopilot</span>
              <div className="w-11 h-6 bg-[#7B5CFC] rounded-full relative shadow-[0_0_15px_rgba(123,92,252,0.4)]">
                <span className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
              <span className="text-[#7B5CFC] text-sm font-semibold">ON</span>
            </div>
          </div>

          {/* Lead scoring */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-7 hover:border-[#FFAB00]/20 transition-all">
            <div className="h-11 w-11 rounded-xl bg-[#FFAB00]/15 flex items-center justify-center">
              <BarChart3 size={20} className="text-[#FFAB00]" />
            </div>
            <h3 className="text-white font-display font-bold text-lg mb-2 mt-4">
              Intelligent Lead Scoring
            </h3>
            <p className="text-[#8B8FA8] text-sm">
              AI scores every inquiry 0–100 for booking probability. Know exactly which
              patients to prioritize.
            </p>
            <div className="flex items-end gap-2 mt-4">
              {[
                { v: "92", lbl: "Hot", bg: "bg-[#22C55E]/15", fg: "text-[#22C55E]" },
                { v: "67", lbl: "Warm", bg: "bg-[#FFAB00]/15", fg: "text-[#FFAB00]" },
                { v: "41", lbl: "Cold", bg: "bg-[#8B8FA8]/15", fg: "text-[#8B8FA8]" },
                { v: "88", lbl: "Hot", bg: "bg-[#22C55E]/15", fg: "text-[#22C55E]" },
              ].map((s) => (
                <div key={s.v} className="flex flex-col items-center flex-1">
                  <div className={`${s.bg} ${s.fg} rounded-xl px-3 py-2 text-center font-display text-xl font-bold w-full`}>
                    {s.v}
                  </div>
                  <span className="text-[10px] text-[#4A4A6A] mt-1">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Stats                                                                   */
/* -------------------------------------------------------------------------- */

function Stats() {
  const stats = [
    { n: "3×", t: "Faster patient response time vs manual" },
    { n: "40%", t: "Increase in qualified lead conversion" },
    { n: "99.8%", t: "AI agent uptime guarantee" },
    { n: "24/7", t: "Autonomous operation across all channels" },
  ];
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7B5CFC]/[0.05] blur-[160px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-display text-white"
            style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}
          >
            Next-Level Performance
            <br />
            Driven by pydent.<em className="italic text-[#7B5CFC]">ai</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s) => (
            <div
              key={s.n}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 text-center hover:border-[#7B5CFC]/30 transition-all"
            >
              <div
                className="font-display leading-none bg-gradient-to-r from-[#7B5CFC] to-[#9B84FF] bg-clip-text text-transparent"
                style={{ fontSize: 56, fontWeight: 800 }}
              >
                {s.n}
              </div>
              <p className="text-[#8B8FA8] text-sm mt-3 leading-relaxed">{s.t}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 flex gap-4 justify-center flex-wrap">
          <PrimaryButton>Get Started →</PrimaryButton>
          <GhostButton>Request a Demo</GhostButton>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. How It Works                                                            */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      Icon: LinkIcon,
      tint: "#7B5CFC",
      title: "Connect Your Channels",
      desc: "Link WhatsApp, your clinic phone number, SMS, and email in under 15 minutes. No technical setup required.",
      visual: <ChannelRow />,
    },
    {
      n: "02",
      Icon: Settings,
      tint: "#00D4AA",
      title: "Configure Your AI Agent",
      desc: "Set your clinic name, services, pricing, and availability. The AI learns your dental practice instantly.",
      visual: <ConfigMock />,
    },
    {
      n: "03",
      Icon: Zap,
      tint: "#FFAB00",
      title: "Watch It Work 24/7",
      desc: "Patients are greeted, qualified, booked, and followed up — automatically. You just see the confirmed appointments.",
      visual: <UpChart />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#04040C]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge>How It Works</SectionBadge>
          <h2
            className="font-display text-white mt-5"
            style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}
          >
            Power Your Practice in{" "}
            <em className="italic text-[#7B5CFC]">3 Simple Steps</em>
          </h2>
          <p className="text-[#8B8FA8] text-lg max-w-xl mx-auto mt-4">
            From setup to full automation in under 15 minutes. No technical skills needed.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 relative overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full">
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(to right, ${s.tint}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-5 right-6 font-display select-none leading-none"
                  style={{ fontSize: 72, fontWeight: 800, color: "rgba(255,255,255,0.04)" }}
                >
                  {s.n}
                </div>

                <div className="relative">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.tint}26` }}
                  >
                    <s.Icon size={22} style={{ color: s.tint }} />
                  </div>
                  <span className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-[#7B5CFC] text-white text-[11px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mt-5 mb-3">
                  {s.title}
                </h3>
                <p className="text-[#8B8FA8] text-sm leading-relaxed">{s.desc}</p>

                <div className="mt-6">{s.visual}</div>
              </div>

              {i < steps.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 text-[#7B5CFC] text-2xl z-10">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelRow() {
  const ch = ["WhatsApp", "Phone", "SMS", "Email"];
  return (
    <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 flex items-center justify-between">
      {ch.map((c, i) => (
        <div key={c} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-lg bg-[#7B5CFC]/15 border border-[#7B5CFC]/20" />
            <span className="text-[10px] text-[#8B8FA8]">{c}</span>
          </div>
          {i < ch.length - 1 && <div className="w-4 h-px bg-[#1C1C34] mx-2" />}
        </div>
      ))}
    </div>
  );
}

function ConfigMock() {
  return (
    <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 space-y-2">
      <div>
        <div className="text-[10px] text-[#4A4A6A] mb-1">Clinic Name</div>
        <div className="h-7 rounded-md bg-[#0F0F22] border border-[#1C1C34] px-2 flex items-center text-xs text-white">
          Smile Zone Dental
        </div>
      </div>
      <div>
        <div className="text-[10px] text-[#4A4A6A] mb-1">Services</div>
        <div className="flex gap-1.5 flex-wrap">
          {["Checkup", "Whitening", "Implants"].map((s) => (
            <span
              key={s}
              className="text-[10px] bg-[#00D4AA]/15 border border-[#00D4AA]/20 text-[#00D4AA] rounded-full px-2 py-0.5"
            >
              ✓ {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpChart() {
  return (
    <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 h-[88px]">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,55 L40,45 L80,38 L120,25 L160,15 L200,5"
          fill="none"
          stroke="#FFAB00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0,55 L40,45 L80,38 L120,25 L160,15 L200,5 L200,60 L0,60 Z"
          fill="rgba(255,171,0,0.1)"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Product showcase                                                        */
/* -------------------------------------------------------------------------- */

function ProductShowcase() {
  const pills = [
    { icon: <MessageSquare size={16} className="text-[#7B5CFC]" />, label: "Real-time AI responses" },
    { icon: <Inbox size={16} className="text-[#00D4AA]" />, label: "Multi-channel inbox" },
    { icon: <Calendar size={16} className="text-[#FFAB00]" />, label: "Smart appointment booking" },
    { icon: <Users size={16} className="text-[#9B84FF]" />, label: "Patient analytics" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-display text-white"
            style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}
          >
            Power Your Next Move with{" "}
            <em className="italic text-[#7B5CFC]">pydent.ai</em>
          </h2>
        </div>

        <div
          className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.7)" }}
        >
          <BrowserBar url="pydent.ai/inbox" />
          <FullDashboard />
        </div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {pills.map((p) => (
            <span
              key={p.label}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-[#8B8FA8]"
            >
              {p.icon}
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullDashboard() {
  return (
    <div className="bg-[#08081A] p-5 grid grid-cols-12 gap-4 min-h-[440px]">
      {/* Sidebar */}
      <div className="col-span-2 bg-[#0B0B1A] rounded-xl p-3 flex flex-col gap-2">
        <div className="h-8 w-full bg-[#7B5CFC]/15 rounded-lg mb-2" />
        {["Inbox", "Patients", "Calendar", "Campaigns", "Analytics", "Settings"].map((n, i) => (
          <div
            key={n}
            className={`h-8 rounded-md flex items-center px-2 text-[11px] ${
              i === 0
                ? "bg-[#7B5CFC]/20 text-white"
                : "bg-[#1C1C34]/40 text-[#8B8FA8]"
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Inbox column */}
      <div className="col-span-4 bg-[#0B0B1A] rounded-xl p-3 flex flex-col gap-2">
        <div className="text-[11px] text-[#8B8FA8] uppercase tracking-wider mb-1">
          Inbox
        </div>
        {[
          { i: "OA", n: "Omar Al Rashidi", m: "Booking for tomorrow 2pm?", t: "1m", active: true },
          { i: "SA", n: "Sara Ahmed", m: "Cleaning consultation pricing?", t: "5m" },
          { i: "KM", n: "Khalid Mansoor", m: "Reschedule to Friday please", t: "12m" },
          { i: "FR", n: "Fatima Rahman", m: "Thank you! See you then 🦷", t: "1h" },
          { i: "AK", n: "Ahmed Khalid", m: "What are your prices for...", t: "3h" },
        ].map((row) => (
          <div
            key={row.n}
            className={`flex items-center gap-2.5 p-2 rounded-lg ${
              row.active ? "bg-[#7B5CFC]/10 border border-[#7B5CFC]/20" : "bg-[#0F0F22]"
            }`}
          >
            <span
              className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#7B5CFC,#5B3FDC)" }}
            >
              {row.i}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-white truncate">{row.n}</div>
              <div className="text-[10px] text-[#8B8FA8] truncate">{row.m}</div>
            </div>
            <span className="text-[9px] text-[#4A4A6A]">{row.t}</span>
          </div>
        ))}
      </div>

      {/* Conversation + metrics */}
      <div className="col-span-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { lbl: "Active Chats", val: "23", c: "text-[#7B5CFC]" },
            { lbl: "Booked Today", val: "47", c: "text-[#00D4AA]" },
            { lbl: "Avg Response", val: "1.9s", c: "text-[#FFAB00]" },
          ].map((m) => (
            <div key={m.lbl} className="bg-[#0F0F22] border border-[#1C1C34] rounded-xl p-3">
              <div className="text-[10px] text-[#8B8FA8] mb-1">{m.lbl}</div>
              <div className={`font-display font-bold text-xl ${m.c}`}>{m.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1C1C34]">
            <span
              className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#7B5CFC,#5B3FDC)" }}
            >
              OA
            </span>
            <div className="flex-1">
              <div className="text-xs text-white">Omar Al Rashidi</div>
              <div className="text-[10px] text-[#00D4AA]">● Online · WhatsApp</div>
            </div>
            <span className="text-[10px] bg-[#7B5CFC]/15 text-[#9B84FF] px-2 py-0.5 rounded-full">
              AI Active
            </span>
          </div>
          <div className="space-y-2">
            <div className="bg-[#141428] rounded-lg rounded-tl-[3px] px-3 py-2 text-xs text-white max-w-[70%] w-fit">
              Hi, can I book for tomorrow at 2pm?
            </div>
            <div className="flex justify-end">
              <div className="bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 rounded-lg rounded-tr-[3px] px-3 py-2 text-xs text-white max-w-[75%]">
                Yes! 2pm tomorrow is available with Dr. Sara. Confirm?
              </div>
            </div>
            <div className="bg-[#141428] rounded-lg rounded-tl-[3px] px-3 py-2 text-xs text-white max-w-[40%] w-fit">
              Confirmed ✅
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Testimonials                                                            */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const items = [
    {
      name: "Omar Al Rashidi",
      role: "Clinic Owner · Dubai",
      initials: "OA",
      from: "#7B5CFC",
      to: "#5B3FDC",
      quote:
        "pydent.ai completely transformed how we handle patient inquiries. We used to miss 30% of WhatsApp messages after hours. Now every patient gets an instant response and books directly.",
      clinic: "Smile Zone Dental · Dubai Marina",
    },
    {
      name: "Dr. Sara Ahmed",
      role: "Lead Dentist · Abu Dhabi",
      initials: "SA",
      from: "#00D4AA",
      to: "#0E8C7A",
      quote:
        "The voice AI is incredible — patients say it sounds like a real receptionist. Our appointment show-up rate increased by 28% just from the automated reminder system.",
      clinic: "Perfect Smile Polyclinic · Abu Dhabi",
    },
    {
      name: "Khalid Mansoor",
      role: "Operations Manager · Sharjah",
      initials: "KM",
      from: "#FFAB00",
      to: "#C57B00",
      quote:
        "We run 3 clinic locations and pydent.ai manages all patient communication centrally. The AI handles inquiries in both English and Arabic seamlessly.",
      clinic: "Al Noor Dental Group · Sharjah",
    },
    {
      name: "Fatima Rahman",
      role: "Marketing Manager · Dubai",
      initials: "FR",
      from: "#9B84FF",
      to: "#6047DB",
      quote:
        "Our WhatsApp campaigns now have a 67% open rate. The AI follow-up sequences for patients who haven't visited in 6 months brought back over 80 dormant patients last month.",
      clinic: "Brighter Smiles · JLT Dubai",
    },
    {
      name: "Ahmed Khalid",
      role: "Business Owner · Riyadh",
      initials: "AK",
      from: "#7B5CFC",
      to: "#00D4AA",
      quote:
        "I was skeptical about AI for a dental clinic. After 30 days, our response time went from hours to seconds and qualified leads tripled. It pays for itself in the first week.",
      clinic: "AlNoor Dental Center · Riyadh, KSA",
    },
    {
      name: "Layla Hassan",
      role: "Clinic Manager · Kuwait",
      initials: "LH",
      from: "#FFAB00",
      to: "#7B5CFC",
      quote:
        "Setup took literally 12 minutes. The AI knows our full services menu, prices, and availability. Patients book without any human involvement. It's magic.",
      clinic: "Kuwait Dental Specialists · Kuwait City",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#04040C]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-display text-white max-w-4xl mx-auto"
            style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}
          >
            See How Dental Clinics Are Living the{" "}
            <em className="italic text-[#7B5CFC]">Future of Patient Management</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <article
              key={t.name}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-7 hover:border-[#7B5CFC]/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={t.initials} from={t.from} to={t.to} />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-[#8B8FA8] text-xs">{t.role}</div>
                  </div>
                </div>
                <span className="text-[#FFAB00] text-xs">★★★★★</span>
              </div>

              <div className="border-t border-[#1C1C34] my-4" />

              <p className="text-[#D1D5DB] text-sm leading-relaxed italic">"{t.quote}"</p>

              <span className="bg-[#141428] text-[#8B8FA8] text-xs px-3 py-1 rounded-full inline-flex mt-4">
                {t.clinic}
              </span>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <GhostButton>View All Reviews</GhostButton>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Final CTA                                                               */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#7B5CFC]/[0.1] blur-[80px] rounded-full" />

          <div className="relative">
            <div className="mx-auto mb-8 h-16 w-16 rounded-2xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/25 flex items-center justify-center">
              <Smile size={30} className="text-[#7B5CFC]" />
            </div>

            <div className="text-[#7B5CFC] text-sm font-semibold uppercase tracking-widest mb-3">
              pydent.ai
            </div>

            <h2
              className="font-display text-white mb-4"
              style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15 }}
            >
              Experience the Power of pydent.ai
              <br />
              Start with a Free Demo Today
            </h2>

            <p className="text-[#8B8FA8] text-lg mb-10 max-w-md mx-auto">
              Join 200+ dental clinics automating patient communication.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <PrimaryButton large>Get Started Free</PrimaryButton>
              <GhostButton large>Request a Demo</GhostButton>
            </div>

            <div className="text-[#4A4A6A] text-xs mt-6">
              No credit card required · 14-day free trial · Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
