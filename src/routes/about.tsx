import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Target, Eye, Shield, Stethoscope, MapPin, Zap, Globe, TrendingUp,
  Mail, MessageCircle, Clock, ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — pydent.ai" },
      { name: "description", content: "We're building the AI operating system for dental practices — founded in Dubai, serving the GCC." },
      { property: "og:title", content: "About — pydent.ai" },
      { property: "og:description", content: "Enterprise-grade AI for every dental clinic, without the complexity." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Shield, color: "#7B5CFC", title: "Patient Data Privacy First", body: "End-to-end encryption, UAE PDPL and NABEEDH compliance, and zero third-party data sharing. Patient records belong to your clinic." },
  { icon: Stethoscope, color: "#00D4AA", title: "Built for Dental, Not Generic", body: "pydent.ai understands dental workflows — appointment types, treatment follow-ups, recall sequences, and Gulf-region terminology." },
  { icon: MapPin, color: "#FFAB00", title: "UAE-Founded, GCC-Focused", body: "Built in Dubai for the regional market. Arabic-English bilingual AI, local data residency, and compliance with GCC healthcare regulations." },
  { icon: Zap, color: "#7B5CFC", title: "24/7 Uptime, No Exceptions", body: "99.8% uptime SLA. AI agents don't sleep, don't call in sick, and don't need breaks. Every patient message gets a response." },
  { icon: Globe, color: "#00D4AA", title: "Bilingual by Design", body: "Not translated — natively bilingual. The AI understands dental Arabic terminology and switches languages naturally mid-conversation." },
  { icon: TrendingUp, color: "#FFAB00", title: "Grows With Your Practice", body: "From a single chair clinic to a 10-location polyclinic group. One platform scales across every location, channel, and agent." },
];

const TEAM = [
  { initials: "A.K.", role: "Founder & CEO", loc: "Dubai, UAE" },
  { initials: "S.M.", role: "Head of Product", loc: "Dubai, UAE" },
  { initials: "F.R.", role: "Head of Engineering", loc: "Dubai, UAE" },
  { initials: "O.H.", role: "Head of Customer Success", loc: "Dubai, UAE" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06060F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-beam-purple py-24 px-6 text-center relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-block bg-[#7B5CFC]/[0.08] border border-[#7B5CFC]/20 text-[#9B84FF] text-xs px-4 py-1.5 rounded-full tracking-[0.04em] font-semibold">About pydent.ai</span>
          <h1 className="font-display font-bold text-white tracking-[-0.035em] mt-6 leading-[1.05]" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>
            We're Building the AI Operating System<br />for Dental Practices
          </h1>
          <p className="text-[#8B8FA8] text-[17px] max-w-xl mx-auto mt-5 leading-[1.7]">
            pydent.ai was founded in Dubai with one belief: every dental clinic — from a single chair to a multi-location polyclinic — deserves enterprise-grade AI without enterprise complexity or cost.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Quote card */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#7B5CFC]/50 to-transparent" />
            <span className="font-display font-extrabold text-[96px] text-[#7B5CFC]/20 leading-none block -mb-6">&ldquo;</span>
            <p className="font-display font-medium text-[19px] text-white leading-[1.6]">
              Every dental clinic deserves an AI receptionist that never sleeps, never misses a patient message, and speaks every patient's language.
            </p>
            <div className="text-[#4A4A6A] text-sm mt-6">— pydent.ai founding team</div>
          </div>

          {/* 3 cards */}
          <div className="space-y-4">
            <MissionCard icon={Target} color="#7B5CFC" title="Our Mission" body="Make AI-powered patient communication accessible and affordable for every dental clinic and polyclinic in the Gulf region and beyond." />
            <MissionCard icon={Eye} color="#00D4AA" title="Our Vision" body="To become the operating system for patient communication — the single platform where dental practices deploy, manage, and optimise every patient conversation." />
            <MissionCard icon={Shield} color="#FFAB00" title="Our Commitment" body="PDPL and NABEEDH compliant from day one. Patient data stays in the region, encrypted at rest and in transit, and never shared with third parties." />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "200+", l: "Dental clinics onboarded" },
            { n: "UAE & GCC", l: "Region focus" },
            { n: "6", l: "Channels automated" },
            { n: "24/7", l: "AI availability" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display font-extrabold text-[48px] tracking-[-0.04em] text-white leading-none">{s.n}</div>
              <div className="text-[#4A4A6A] text-sm mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-6 bg-grid-faint">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-white tracking-[-0.03em] text-center" style={{ fontSize: "clamp(30px, 4vw, 40px)" }}>
            What We Stand For
          </h2>
          <p className="text-[#8B8FA8] text-center mt-4 mb-14 max-w-xl mx-auto">
            The principles that guide every product decision at pydent.ai.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-7 hover:border-[#7B5CFC]/25 transition-all">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${color}26` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-white font-semibold text-[15px] mt-4 mb-2">{title}</h3>
                <p className="text-[#8B8FA8] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-white tracking-[-0.03em] text-center mb-4" style={{ fontSize: "clamp(30px, 4vw, 38px)" }}>
          The Team Behind pydent.ai
        </h2>
        <p className="text-[#8B8FA8] mb-14 text-center max-w-xl mx-auto">
          A team of operators, engineers, and clinicians building the future of dental patient communication.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <div key={m.initials} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7B5CFC]/30 to-[#00D4AA]/20 border border-[#1C1C34] mx-auto mb-4 flex items-center justify-center text-[#9B84FF] font-semibold">
                {m.initials}
              </div>
              <div className="text-white text-[15px] font-semibold">{m.initials}</div>
              <div className="text-[#4A4A6A] text-sm mt-1">{m.role}</div>
              <div className="text-[#4A4A6A] text-xs mt-1">{m.loc}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <span className="inline-block bg-[#22C55E]/15 text-[#22C55E] text-xs font-semibold px-3 py-1 rounded-full mr-2">We're hiring</span>
          <span className="text-[#8B8FA8] text-sm">Join our team in Dubai</span>
          <div className="mt-4">
            <a href="#" className="inline-flex items-center gap-2 border border-[#1C1C34] hover:bg-white/5 text-white text-sm font-semibold px-6 h-11 rounded-xl transition-colors">
              View Open Roles
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      <Footer />
    </div>
  );
}

function MissionCard({ icon: Icon, color, title, body }: { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; color: string; title: string; body: string }) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6 flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}26` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div className="text-white text-[15px] font-semibold mb-1.5">{title}</div>
        <p className="text-[#8B8FA8] text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", clinic: "", email: "", phone: "", help: "Book a Demo", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  const inputCls = "w-full bg-[#06060F] border border-[#1C1C34] rounded-xl h-11 px-4 text-white text-sm focus:border-[#7B5CFC]/60 focus:ring-1 focus:ring-[#7B5CFC]/20 focus:outline-none placeholder:text-[#4A4A6A] transition-colors";

  return (
    <section className="py-24 px-6 bg-grid-faint">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-white tracking-[-0.03em] text-center" style={{ fontSize: "clamp(30px, 4vw, 40px)" }}>
          Get in Touch
        </h2>
        <p className="text-[#8B8FA8] text-center mt-4 mb-16 max-w-xl mx-auto">
          Whether you want a demo, have questions, or want to explore a partnership — we respond within 24 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Contact details */}
          <div>
            <div className="space-y-4">
              <ContactCard icon={Mail} color="#7B5CFC" label="Email" value="hello@pydent.ai" />
              <ContactCard icon={MapPin} color="#00D4AA" label="Location" value="Dubai, UAE 🇦🇪" />
              <ContactCard icon={MessageCircle} color="#FFAB00" label="WhatsApp" value="+971 XX XXX XXXX" />
            </div>
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl p-4 mt-6 flex items-center gap-3">
              <Clock size={16} className="text-[#22C55E] flex-shrink-0" />
              <span className="text-[#8B8FA8] text-sm">We typically respond within 24 hours on business days</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#7B5CFC]/40 to-transparent" />

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 flex items-center justify-center mx-auto mb-4">
                  <ArrowRight size={20} className="text-[#22C55E]" />
                </div>
                <h3 className="text-white font-semibold text-lg">Message received</h3>
                <p className="text-[#8B8FA8] text-sm mt-2">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputCls} placeholder="Full Name" maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} />
                  <input className={inputCls} placeholder="Clinic Name" maxLength={150} value={form.clinic} onChange={(e) => update("clinic", e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputCls} placeholder="Email" type="email" maxLength={255} value={form.email} onChange={(e) => update("email", e.target.value)} />
                  <div className="flex items-stretch">
                    <span className="bg-[#06060F] border border-[#1C1C34] border-r-0 rounded-l-xl px-3 flex items-center text-[#8B8FA8] text-sm">+971</span>
                    <input className={`${inputCls} rounded-l-none`} placeholder="Phone" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                </div>
                <select className={inputCls} value={form.help} onChange={(e) => update("help", e.target.value)}>
                  {["Book a Demo", "Enterprise Inquiry", "Partnership", "Support", "General Question"].map((o) => (
                    <option key={o} value={o} className="bg-[#0B0B1A]">{o}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Message"
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-3 text-white text-sm focus:border-[#7B5CFC]/60 focus:ring-1 focus:ring-[#7B5CFC]/20 focus:outline-none placeholder:text-[#4A4A6A] transition-colors min-h-[100px] resize-y"
                />
                <button onClick={submit} className="w-full h-11 rounded-xl bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold mt-2 transition-colors">
                  Send Message
                </button>
                <p className="text-[#4A4A6A] text-xs text-center mt-3">We respond within 24 hours · All conversations are confidential</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, color, label, value }: { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; color: string; label: string; value: string }) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}26` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div className="text-[#4A4A6A] text-xs uppercase tracking-wider">{label}</div>
        <div className="text-white text-sm font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
}
