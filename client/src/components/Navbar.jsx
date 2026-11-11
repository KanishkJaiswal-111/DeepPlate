import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { ROUTES } from "../constants/routes";
import { FONT } from "../constants/ui";

const LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "How It Works", href: ROUTES.howItWorks },
];

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${FONT.tech} group relative py-1 text-base font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white`}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#FFD600] transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

function GetStartedButton({ className = "" }) {
  return (
    <a
      href={ROUTES.predict}
      className={`${FONT.tech} group inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD600] px-5 py-2.5 text-base font-bold uppercase tracking-[0.16em] text-[#111111] transition-all duration-200 hover:bg-white hover:shadow-[0_0_0_3px_#FFD600] ${className}`}
    >
      Get Started
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#FFD600] bg-[#111111]">
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.label} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <GetStartedButton />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border-2 border-white/30 p-2 text-white transition-colors hover:border-[#FFD600] hover:text-[#FFD600] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-white/10 bg-[#111111] px-5 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <NavLink key={l.label} href={l.href} onClick={close}>
                {l.label}
              </NavLink>
            ))}
            <GetStartedButton className="mt-1 w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
