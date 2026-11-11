import { ImageUp, ScanSearch, BadgeCheck, ArrowRight, Sparkles, Cpu } from "lucide-react";
import DetectCTA from "./DetectCTA";
import Reveal from "./Reveal";
import Rivet from "./Rivet";
import { FONT } from "../constants/ui";
import { ROUTES } from "../constants/routes";

const STEPS = [
  { n: "01", icon: ImageUp, title: "Upload", text: "Choose a photo or recorded traffic video of any vehicle." },
  { n: "02", icon: ScanSearch, title: "Analyse", text: "PlateGuard YOLO detector extracts the plate region with high precision." },
  { n: "03", icon: BadgeCheck, title: "Discover", text: "PaddleOCR reads registration characters with confidence scoring." },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-x-clip bg-white bg-[radial-gradient(rgba(17,17,17,0.12)_1px,transparent_1px)] bg-[length:22px_22px]"
    >
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:pt-28">
        {/* Label */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p
              className={`${FONT.mono} inline-flex items-center gap-3 rounded-sm border-2 border-[#111111] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#111111] sm:text-xs`}
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FFD600] ring-2 ring-[#111111]" />
              AI-Powered Number Plate Recognition
            </p>
            <span
              className={`${FONT.mono} hidden items-center gap-2 rounded-sm border-2 border-[#111111]/30 bg-[#FFD600]/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] sm:inline-flex`}
            >
              <Sparkles className="h-3 w-3 text-[#111111]" />
              YOLO + PaddleOCR Architecture
            </span>
          </div>
        </Reveal>

        {/* Heading */}
        <h1 className={`${FONT.display} mt-8 text-[clamp(2.9rem,12.5vw,11.5rem)] leading-[0.86] text-[#111111]`}>
          <Reveal as="span" delay={100} className="block">
            YOUR PLATE.
          </Reveal>
          <Reveal as="span" delay={250} className="mt-2 block">
            <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-2 pb-1 pt-2 shadow-[6px_6px_0_0_#111111] sm:px-5 sm:shadow-[8px_8px_0_0_#111111]">
              OUR PRECISION.
            </span>
          </Reveal>
        </h1>

        {/* Supporting text + action buttons */}
        <Reveal delay={400}>
          <p className={`${FONT.body} mt-12 max-w-2xl text-lg leading-relaxed text-[#111111]/75 sm:text-xl`}>
            PlateGuard is an intelligent ANPR system built for real-world traffic footage. Combining YOLO object
            detection and PaddleOCR recognition, it locates plates and extracts registration numbers with verified
            confidence scores.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={ROUTES.howItWorks}
              className={`${FONT.tech} inline-flex items-center gap-2 rounded-md border-2 border-[#111111] bg-white px-6 py-3 text-base font-bold uppercase tracking-[0.16em] text-[#111111] shadow-[4px_4px_0_0_#111111] transition-all duration-200 hover:bg-[#FFD600] hover:shadow-[2px_2px_0_0_#111111] active:translate-x-0.5 active:translate-y-0.5`}
            >
              How It Works
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={ROUTES.demo}
              className={`${FONT.tech} inline-flex items-center gap-2 rounded-md border-2 border-[#111111] bg-[#FFD600] px-6 py-3 text-base font-bold uppercase tracking-[0.16em] text-[#111111] shadow-[4px_4px_0_0_#111111] transition-all duration-200 hover:bg-[#111111] hover:text-[#FFD600] hover:shadow-[2px_2px_0_0_#111111] active:translate-x-0.5 active:translate-y-0.5`}
            >
              Try the Demo
              <Cpu className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={500} className="mt-16 sm:mt-20">
          <DetectCTA />
        </Reveal>

        {/* How it works */}
        <div id="how-it-works" className="mt-24 scroll-mt-20 sm:mt-32">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#111111]/60`}>
                  Pipeline Overview
                </p>
                <h3 className={`${FONT.display} mt-2 text-3xl tracking-wider text-[#111111] sm:text-4xl lg:text-5xl`}>
                  HOW IT WORKS
                </h3>
              </div>
              <a
                href={ROUTES.howItWorks}
                className={`${FONT.tech} inline-flex items-center gap-2 rounded-md border-2 border-[#111111] bg-[#FFD600] px-5 py-2.5 text-base font-bold uppercase tracking-[0.16em] text-[#111111] shadow-[4px_4px_0_0_#111111] transition-all hover:bg-white hover:shadow-[2px_2px_0_0_#111111]`}
              >
                Interactive 5-Stage Deep Dive
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ n, icon: Icon, title, text }, i) => (
              <Reveal key={n} delay={i * 120}>
                <div className="group h-full rounded-xl border-4 border-[#111111] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#FFD600] hover:shadow-[6px_6px_0_0_#111111]">
                  <div className="flex items-start justify-between">
                    <span
                      className={`${FONT.mono} text-sm font-bold tracking-[0.3em] text-[#111111]/60 group-hover:text-[#111111]`}
                    >
                      {n}
                    </span>
                    <Icon className="h-7 w-7 text-[#111111]" strokeWidth={1.8} />
                  </div>
                  <h4 className={`${FONT.display} mt-6 text-4xl text-[#111111]`}>{title}</h4>
                  <p className={`${FONT.body} mt-2 text-[#111111]/70 group-hover:text-[#111111]`}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Deep dive banner linking to About page */}
          <Reveal delay={350} className="mt-8">
            <div className="relative overflow-hidden rounded-2xl border-4 border-[#111111] bg-[#111111] p-6 text-white shadow-[8px_8px_0_0_#FFD600] sm:p-8">
              <Rivet className="absolute left-3 top-3" />
              <Rivet className="absolute right-3 top-3" />
              <Rivet className="absolute bottom-3 left-3" />
              <Rivet className="absolute bottom-3 right-3" />

              <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <span
                    className={`${FONT.mono} inline-block rounded border border-[#FFD600] bg-[#FFD600]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFD600]`}
                  >
                    PlateGuard Technical Architecture
                  </span>
                  <h4 className={`${FONT.display} mt-3 text-3xl leading-tight sm:text-4xl`}>
                    Curious how the 2-step <span className="text-[#FFD600]">YOLO + PaddleOCR</span> chain works?
                  </h4>
                  <p className={`${FONT.body} mt-2 text-sm text-white/70 sm:text-base`}>
                    See how our 5-stage pipeline handles motion blur, low-resolution camera feeds, night lighting, and visually similar characters (O vs 0, B vs 8).
                  </p>
                </div>

                <a
                  href={ROUTES.howItWorks}
                  className={`${FONT.tech} inline-flex shrink-0 items-center gap-3 rounded-md bg-[#FFD600] px-7 py-3.5 text-lg font-bold uppercase tracking-[0.16em] text-[#111111] shadow-[4px_4px_0_0_#ffffff] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ffffff]`}
                >
                  Learn How It Works
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
