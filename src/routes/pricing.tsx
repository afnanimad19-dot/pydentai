import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, ChevronDown, ArrowRight } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — pydent.ai" },
      { name: "description", content: "Simple pricing for every dental practice. Start free. Add AI agents as you grow. Cancel anytime." },
      { property: "og:title", content: "Pricing — pydent.ai" },
      { property: "og:description", content: "Starter, Pro, and Enterprise plans for dental clinics." },
    ],
  }),
  component: PricingPage,
});

type Plan = {
  name: string;
  price: number | "Custom";
  desc: string;
  featured?: boolean;
  cta: string;
  included: string[];
  excluded?: string[];
};

const PLANS: Plan[] = [
  {
    name: "STARTER",
    price: 49,
    desc: "billed monthly",
    cta: "Get Started Free",
    included: [
      "1 AI Chat Agent (WhatsApp + SMS)",
      "Up to 1,000 messages / month",
      "Basic patient CRM",
      "3 campaign sends / month",
      "Standard analytics dashboard",
      "Email support (48h response)",
    ],
    excluded: ["Voice AI receptionist", "Lead scoring engine", "Advanced campaigns", "API access + webhooks"],
  },
  {
    name: "PRO",
    price: 149,
    desc: "billed monthly",
    featured: true,
    cta: "Start Free Trial",
    included: [
      "5 AI Chat Agents — all channels",
      "Up to 10,000 messages / month",
      "Voice AI Receptionist (inbound calls)",
      "Full patient CRM + lead scoring 0–100",
      "Unlimited campaigns (WhatsApp + SMS + Email)",
      "Advanced analytics + channel health reports",
      "Arabic + English bilingual AI",
      "Priority support (24h response)",
      "Knowledge base (PDF, DOCX, URL scraping)",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    desc: "Contact our sales team",
    cta: "Talk to Sales",
    included: [
      "Unlimited AI agents + channels",
      "Unlimited messages",
      "Custom AI model fine-tuning",
      "Multi-location management",
      "White-label option available",
      "Full API access + webhooks",
      "Dedicated account manager",
      "99.9% SLA uptime guarantee",
      "UAE data residency (PDPL + NABEEDH compliant)",
    ],
  },
];

const COMPARE_ROWS: Array<[string, string, string, string]> = [
  ["AI Chat Agents", "1", "5", "Unlimited"],
  ["Messages / month", "1,000", "10,000", "Unlimited"],
  ["Voice AI (Vapi.ai)", "—", "✓", "✓"],
  ["Campaign sends", "3 / mo", "Unlimited", "Unlimited"],
  ["WhatsApp Campaigns", "—", "✓", "✓"],
  ["Lead Scoring 0–100", "—", "✓", "✓"],
  ["Knowledge Base (docs/URL)", "—", "✓", "✓"],
  ["Arabic + English AI", "—", "✓", "✓"],
  ["Live Conversation Monitor", "—", "✓", "✓"],
  ["API Access + Webhooks", "—", "—", "✓"],
  ["Multi-location Management", "—", "—", "✓"],
  ["UAE Data Residency", "—", "—", "✓"],
  ["White-label Option", "—", "—", "✓"],
  ["Support", "Email", "Priority", "Dedicated"],
];

const FAQS = [
  {
    q: "How quickly can I get pydent.ai running?",
    a: "Most dental clinics are live within 15 minutes. Connect your WhatsApp Business number via Meta Cloud API, enter your clinic's services and availability, and the AI starts responding to patients immediately. No developers needed.",
  },
  {
    q: "Does it connect to my existing WhatsApp Business number?",
    a: "Yes. pydent.ai connects directly to your existing WhatsApp Business API number via Meta Cloud API. Patients continue messaging the same number they already know — nothing changes on their end.",
  },
  {
    q: "Can the AI respond in Arabic?",
    a: "Absolutely. pydent.ai automatically detects the patient's language and responds in Arabic or English. The AI understands Gulf-region dental terminology and clinic workflows in both languages.",
  },
  {
    q: "What happens when the AI can't handle a message?",
    a: "You configure an escalation threshold. When confidence falls below your set level, the AI automatically notifies your team and transfers the conversation to a human agent in real time — with the full conversation history visible.",
  },
  {
    q: "How is patient data stored and protected?",
    a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3 minimum). pydent.ai is compliant with UAE PDPL, GDPR, and NABEEDH regulations. Enterprise customers can choose UAE-region data residency. We never sell or share patient data.",
  },
  {
    q: "Can I use pydent.ai across multiple clinic locations?",
    a: "Yes — the Enterprise plan supports unlimited locations from a single dashboard. Each location has its own AI agent, WhatsApp number, phone number, and campaign audience. All reportable from one central account.",
  },
  {
    q: "What AI model powers pydent.ai?",
    a: "pydent.ai uses the Anthropic Claude API (claude-sonnet model) — selected for its high accuracy, safety, and speed. The AI is accessed only from our secure edge servers — your API credentials and patient data are never sent to your browser.",
  },
  {
    q: "What does the 14-day free trial include?",
    a: "Full access to the Pro plan — all features, no restrictions. No credit card required. After 14 days, choose your plan or cancel automatically. Your data is retained for 30 days after trial ends in case you decide to return.",
  },
];

function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#06060F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-beam-purple py-20 px-6 text-center relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-block bg-[#7B5CFC]/[0.08] border border-[#7B5CFC]/20 text-[#9B84FF] text-xs px-4 py-1.5 rounded-full tracking-[0.04em] font-semibold">Pricing</span>
          <h1 className="font-display font-bold text-white tracking-[-0.035em] mt-6 leading-[1.05]" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>
            Simple Pricing for Every Dental Practice
          </h1>
          <p className="text-[#8B8FA8] text-[17px] max-w-lg mx-auto mt-4 mb-12 leading-[1.7]">
            Start free. Add AI agents as your practice grows. Cancel anytime — no contracts.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? "text-white" : "text-[#8B8FA8]"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${isAnnual ? "bg-[#7B5CFC]" : "bg-[#1C1C34]"}`}
              aria-label="Toggle annual billing"
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${isAnnual ? "left-[26px]" : "left-0.5"}`} />
            </button>
            <span className={`text-sm ${isAnnual ? "text-white" : "text-[#8B8FA8]"}`}>Annual</span>
            <span className="bg-[#22C55E]/15 text-[#22C55E] text-xs rounded-full px-2.5 py-1 font-semibold">Save 20%</span>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-4">
          {PLANS.map((plan) => {
            const annual = typeof plan.price === "number" ? Math.round(plan.price * 0.8) : null;
            const displayPrice = isAnnual && annual !== null ? annual : plan.price;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative bg-[#0B0B1A] ${plan.featured ? "border-2 border-[#7B5CFC]" : "border border-[#1C1C34]"}`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7B5CFC] text-white text-xs font-semibold px-5 py-1.5 rounded-full tracking-[0.02em]">
                    Most Popular
                  </span>
                )}
                <div className={`text-[11px] font-semibold uppercase tracking-[0.1em] mb-5 ${plan.featured ? "text-[#9B84FF]" : "text-[#4A4A6A]"}`}>
                  {plan.name}
                </div>

                {typeof displayPrice === "number" ? (
                  <div className="flex items-baseline">
                    <span className="font-display font-extrabold text-[52px] text-white tracking-[-0.04em] leading-none">${displayPrice}</span>
                    <span className={`text-lg ml-1 font-normal ${plan.featured ? "text-[#9B84FF]" : "text-[#4A4A6A]"}`}>/mo</span>
                    {isAnnual && annual !== null && typeof plan.price === "number" && (
                      <span className="text-[#4A4A6A] text-sm line-through ml-2">${plan.price}</span>
                    )}
                  </div>
                ) : (
                  <span className="font-display font-bold text-[40px] text-white tracking-[-0.03em] leading-none block">Custom</span>
                )}
                <div className="text-[#4A4A6A] text-[11px] mt-1 mb-8">{plan.desc}</div>

                <div className="h-px bg-[#1C1C34] mb-6" />
                <div className="text-[#8B8FA8] text-xs uppercase tracking-[0.08em] mb-4">Includes:</div>

                <ul className="space-y-3">
                  {plan.included.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#8B8FA8]">{f}</span>
                    </li>
                  ))}
                  {plan.excluded?.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Minus size={14} className="text-[#1C1C34] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#4A4A6A]">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full h-11 rounded-xl text-sm font-semibold mt-8 transition-colors ${
                    plan.featured
                      ? "bg-[#7B5CFC] hover:bg-[#6047DB] text-white"
                      : "border border-[#1C1C34] text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-white tracking-[-0.03em] text-center mb-12" style={{ fontSize: "clamp(28px, 3.5vw, 36px)" }}>
          Compare All Plans
        </h2>
        <div className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#0F0F1C]">
              <tr className="h-12">
                <th className="text-left text-[#4A4A6A] text-xs uppercase tracking-wider pl-5 font-medium">Features</th>
                <th className="text-center text-white text-sm font-semibold">Starter</th>
                <th className="text-center text-[#9B84FF] text-sm font-semibold bg-[#7B5CFC]/[0.04]">Pro</th>
                <th className="text-center text-white text-sm font-semibold pr-5">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([feat, s, p, e]) => (
                <tr key={feat} className="h-11 border-b border-[#1C1C34]/60 last:border-b-0">
                  <td className="text-[#8B8FA8] text-sm pl-5">{feat}</td>
                  <td className="text-center text-sm">{renderCell(s)}</td>
                  <td className="text-center text-sm bg-[#7B5CFC]/[0.03]">{renderCell(p)}</td>
                  <td className="text-center text-sm pr-5">{renderCell(e)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-white tracking-[-0.03em] text-center mb-14" style={{ fontSize: "clamp(30px, 4vw, 38px)" }}>
          Common Questions
        </h2>
        <Accordion.Root type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl mb-2.5 overflow-hidden">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full justify-between items-center px-5 py-4 text-white text-[14px] font-medium cursor-pointer hover:bg-[#0F0F1C] transition-colors text-left">
                  <span>{f.q}</span>
                  <ChevronDown size={16} className="text-[#7B5CFC] transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0 ml-4" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out">
                <div className="px-5 pb-5 text-[#8B8FA8] text-[13px] leading-[1.7] border-t border-[#1C1C34] pt-4">
                  {f.a}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-beam-purple py-24 px-6 relative">
        <div className="max-w-3xl mx-auto bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-12 text-center relative z-10">
          <h2 className="font-display font-bold text-white tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
            Start Your Free Trial Today
          </h2>
          <p className="text-[#8B8FA8] mt-4 max-w-md mx-auto">14-day Pro access. No credit card. Cancel anytime.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="/signup" className="inline-flex items-center justify-center gap-2 bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold px-6 h-11 rounded-xl transition-colors">
              Get Started Free <ArrowRight size={16} />
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 border border-[#1C1C34] hover:bg-white/5 text-white text-sm font-semibold px-6 h-11 rounded-xl transition-colors">
              Talk to Sales
            </a>
          </div>
          <p className="text-[#4A4A6A] text-xs mt-6">No credit card required · 14-day free trial · Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function renderCell(v: string) {
  if (v === "✓") return <Check size={16} className="text-[#22C55E] inline" />;
  if (v === "—") return <span className="text-[#1C1C34] text-base">—</span>;
  return <span className="text-white">{v}</span>;
}
