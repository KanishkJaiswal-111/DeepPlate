import examples from "../assets/number-plate-examples.png";
import Reveal from "./Reveal";
import Rivet from "./Rivet";
import { FONT } from "../constants/ui";
import { ROUTES } from "../constants/routes";
import { ArrowRight } from "lucide-react";

const TAGS = ["Blur", "Angle", "Low light", "Speed", "Low-res", "Icons", "Multi-vehicle", "2-row plates"];

export default function Showcase() {
  return (
    <section id="scenarios" className="scroll-mt-20 bg-[#111111] text-white">
      {/* Ticker strip */}
      <div aria-hidden="true" className="overflow-hidden border-y-4 border-[#111111] bg-[#FFD600] px-5 py-3">
        <div
          className={`${FONT.display} flex flex-wrap items-center justify-center gap-x-4 text-2xl tracking-[0.2em] text-[#111111] sm:gap-x-8 sm:text-4xl`}
        >
          <span>DETECT</span>
          <span className="text-white">◆</span>
          <span>ANALYSE</span>
          <span className="text-white">◆</span>
          <span>IDENTIFY</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#FFD600]`}>
            Real-world conditions
          </p>
          <h2 className={`${FONT.display} mt-4 text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]`}>
            BUILT FOR <span className="text-[#FFD600]">EVERY ANGLE.</span>
          </h2>
          <p className={`${FONT.body} mt-8 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl`}>
            From blurry images and low-resolution captures to moving vehicles and difficult lighting
            conditions, explore the different scenarios our detection system is designed to handle.
          </p>
        </Reveal>

        {/* Image frame */}
        <Reveal delay={150} className="mt-14 sm:mt-20">
          <figure className="relative rounded-2xl border-4 border-[#FFD600] bg-white p-2 shadow-[10px_10px_0_0_#FFD600] transition-transform duration-300 hover:-translate-y-1 sm:p-4">
            <Rivet className="absolute left-2 top-2 hidden sm:block" />
            <Rivet className="absolute right-2 top-2 hidden sm:block" />
            <Rivet className="absolute bottom-2 left-2 hidden sm:block" />
            <Rivet className="absolute bottom-2 right-2 hidden sm:block" />

            <img
              src={examples}
              alt="Eight examples of number plate detection: blurry images, angled plates, dark environments, fast-moving vehicles, low-resolution images, plates with icons, multiple vehicles, and two-row plates."
              width={1884}
              height={848}
              loading="lazy"
              className="block h-auto w-full rounded-lg"
            />
          </figure>
        </Reveal>

        {/* Scenario tags + link to About page problem breakdown */}
        <Reveal delay={250} className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <ul className="flex flex-wrap gap-3">
            {TAGS.map((t) => (
              <li
                key={t}
                className={`${FONT.mono} rounded-sm border-2 border-white/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#FFD600] hover:bg-[#FFD600] hover:text-[#111111]`}
              >
                {t}
              </li>
            ))}
          </ul>

          <a
            href={ROUTES.problem}
            className={`${FONT.tech} inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#FFD600] underline-offset-4 hover:underline sm:text-base`}
          >
            Read Problem Statement & Solutions
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
