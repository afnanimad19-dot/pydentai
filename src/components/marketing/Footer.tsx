import { Link } from "@tanstack/react-router";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

type ColumnLink = { label: string; href: string };

const PRODUCT: ColumnLink[] = [
  { label: "Features", href: "/features" },
  { label: "AI Agents", href: "#" },
  { label: "Campaigns", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Roadmap", href: "#" },
];

const COMPANY: ColumnLink[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Partners", href: "#" },
];

const RESOURCES: ColumnLink[] = [
  { label: "Documentation", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Status", href: "#" },
  { label: "Community", href: "#" },
];

const LEGAL: ColumnLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Security", href: "#" },
  { label: "GDPR / PDPL", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const SOCIALS = [
  { label: "Twitter", Icon: Twitter, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "YouTube", Icon: Youtube, href: "#" },
];

function FooterLogo() {
  return (
    <Link to="/" className="flex items-baseline no-underline group">
      <span className="font-display font-bold text-lg text-white group-hover:text-[#9B84FF] transition-colors">
        pydent
      </span>
      <span className="font-display font-bold text-lg text-[#7B5CFC]">.ai</span>
    </Link>
  );
}

function LinkColumn({ title, links }: { title: string; links: ColumnLink[] }) {
  return (
    <div>
      <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[#8B8FA8] text-sm hover:text-white cursor-pointer transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#04040C] border-t border-[#1C1C34] relative overflow-hidden">
      <div className="pt-16 pb-0 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <FooterLogo />
            </div>
            <p className="text-[#8B8FA8] text-sm leading-relaxed max-w-xs">
              AI-powered patient communication for dental clinics. Automate every
              conversation — 24/7.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIALS.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-xl bg-[#0B0B1A] border border-[#1C1C34] hover:border-[#7B5CFC]/40 flex items-center justify-center transition-all cursor-pointer text-[#8B8FA8] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Product" links={PRODUCT} />
          <LinkColumn title="Company" links={COMPANY} />
          <LinkColumn title="Resources" links={RESOURCES} />
          <LinkColumn title="Legal" links={LEGAL} />
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-[#1C1C34] py-6 gap-3">
          <p className="text-[#4A4A6A] text-xs text-center md:text-left">
            © 2026 pydent.ai · All rights reserved. · Built for dental clinics worldwide 🦷
          </p>
          <p className="text-[#4A4A6A] text-xs">🇦🇪 Dubai, UAE</p>
        </div>
      </div>

      {/* Giant clipped watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 text-center pb-0 overflow-hidden pointer-events-none select-none"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(80px, 14vw, 160px)",
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 0.8,
        }}
      >
        PYDENT
      </div>
    </footer>
  );
}

export default Footer;
