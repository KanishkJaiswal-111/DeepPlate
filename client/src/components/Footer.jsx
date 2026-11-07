import Logo from "./Logo";
import { ROUTES } from "../constants/routes";
import { FONT } from "../constants/ui";

const LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t-4 border-[#FFD600] bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo />
            <p className={`${FONT.display} mt-6 text-3xl tracking-[0.12em] text-[#FFD600] sm:text-4xl`}>
              PRECISION IN EVERY PLATE.
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-8">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`${FONT.tech} group relative text-base font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-[#FFD600]`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#FFD600] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={`${FONT.body} text-sm text-white/60`}>© 2026 DeepPlate. All rights reserved.</p>
          <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-white/40`}>
            DP · 2026 · ANPR
          </p>
        </div>
      </div>
    </footer>
  );
}