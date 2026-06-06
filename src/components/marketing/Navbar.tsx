import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV_LINKS: Array<{ label: string; to: string; hash?: string }> = [
  { label: "Features", to: "/features" },
  { label: "How It Works", to: "/", hash: "how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center no-underline group">
      <span className="flex items-baseline">
        <span className="font-display font-bold text-lg text-white group-hover:text-[#9B84FF] transition-colors">
          pydent
        </span>
        <span className="font-display font-bold text-lg text-[#7B5CFC]">.ai</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-[#06060F]/90 backdrop-blur-xl border-b border-[#1C1C34]/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              className="text-sm text-[#8B8FA8] hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-[#8B8FA8] hover:text-white transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,92,252,0.45)]"
          >
            Start Free Trial
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-[#8B8FA8] hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0B1A] border-b border-[#1C1C34] px-6 py-6">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[#8B8FA8] hover:text-white transition-colors font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-sm text-[#8B8FA8] hover:text-white border border-[#1C1C34] rounded-xl py-3 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold py-3 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(123,92,252,0.45)]"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
