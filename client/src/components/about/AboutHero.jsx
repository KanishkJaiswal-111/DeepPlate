import { ArrowDown, Cpu, Layers, ShieldCheck, Video, Zap } from "lucide-react";
import { FONT } from "../../constants/ui";
import { ROUTES } from "../../constants/routes";
import Reveal from "../Reveal";
import Rivet from "../Rivet";

const QUICK_SECTIONS = [
  { label: "1.1 AI Workflow", href: "#workflow" },
  { label: "1.2 Problem & Challenges", href: "#problem" },
  { label: "1.3 Proposed Solution", href: "#solution" },
  { label: "1.4 Architecture & Stack", href: "#architecture" },
  { label: "Illustrative Outputs", href: "#outputs" },
  { label: "1.5 Objectives", href: "#objectives" },
];

const METRICS = [
  {
    icon: Video,
    value: "OpenCV",
    label: "Video Ingestion",
    sub: "Automated frame decoding & extraction",
  },
  {
    icon: Cpu,
    value: "YOLO",
    label: "Plate Detection",
    sub: "Deep-learning plate bounding box localisation",
  },
  {
    icon: Layers,
    value: "2-Step",
    label: "Decomposition",
    sub: "Decoupled detection & OCR modules",
  },
  {
    icon: ShieldCheck,
    value: "PaddleOCR",
    label: "Recognition + Conf",
    sub: "Character transcription & confidence scores",
  },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-x-clip border-b-4 border-[#111111] bg-white bg-[radial-gradient(rgba(17,17,17,0.12)_1px,transparent_1px)] bg-[length:22px_22px] pb-20 pt-12 sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Breadcrumb & status badge */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <a
                href={ROUTES.home}
                className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.2em] text-[#111111]/60 hover:text-[#111111]`}
              >
                Home
              </a>
              <span className={`${FONT.mono} text-xs text-[#111111]/40`}>/</span>
              <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.2em] text-[#111111]`}>
                How It Works
              </span>
            </div>

            <div
              className={`${FONT.mono} inline-flex items-center gap-2.5 rounded-sm border-2 border-[#111111] bg-[#FFD600] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#111111] shadow-[2px_2px_0_0_#111111]`}
            >
              <span className="h-2 w-2 animate-ping rounded-full bg-[#111111]" />
              System Documentation & Technical Blueprint
            </div>
          </div>
        </Reveal>

        {/* Hero Title */}
        <div className="mt-8">
          <Reveal delay={100}>
            <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.35em] text-[#111111]/70 sm:text-sm`}>
              AI-Powered Automatic Number Plate Recognition
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className={`${FONT.display} mt-3 text-[clamp(2.8rem,9vw,8rem)] leading-[0.9] text-[#111111]`}>
              DEEPPLATE <br />
              <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-3 pb-1 pt-2 shadow-[6px_6px_0_0_#111111] sm:px-5 sm:shadow-[8px_8px_0_0_#111111]">
                ANPR ARCHITECTURE.
              </span>
            </h1>
          </Reveal>
        </div>

        {/* Narrative introduction from documentation */}
        <Reveal delay={300}>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className={`${FONT.body} text-lg leading-relaxed text-[#111111]/85 sm:text-xl`}>
                Road transport generates an enormous volume of visual information. Every vehicle carries a
                registration plate that links it to a legal owner, a registration authority and, indirectly, to a
                history of traffic events. Reading these plates automatically from camera footage is the task of{" "}
                <strong className="font-bold text-[#111111] underline decoration-[#FFD600] decoration-4">
                  Automatic Number Plate Recognition (ANPR / ALPR)
                </strong>
                , a long-standing application of computer vision used in toll collection, parking management, access
                control, traffic-law enforcement and traffic-flow analysis.
              </p>
              <p className={`${FONT.body} mt-4 text-base leading-relaxed text-[#111111]/75 sm:text-lg`}>
                <strong>PlateGuard</strong> is an AI-powered ANPR system that processes recorded traffic videos, detects
                the registration plates of vehicles that appear in them, extracts the plate regions, recognises the
                characters on each plate with Optical Character Recognition (OCR), and returns a machine-readable
                registration number together with an OCR confidence score.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className={`${FONT.mono} rounded-sm border-2 border-[#111111] bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#111111]`}>
                  Primary Test Domain: Indian Plates
                </span>
                <span className={`${FONT.mono} rounded-sm border-2 border-[#111111]/30 bg-black/5 px-2.5 py-1 text-xs font-semibold text-[#111111]/70`}>
                  Adaptable to Global Layouts
                </span>
              </div>
            </div>

            {/* Quick overview side card */}
            <div className="lg:col-span-4">
              <div className="relative rounded-xl border-4 border-[#111111] bg-[#111111] p-6 text-white shadow-[8px_8px_0_0_#FFD600]">
                <Rivet className="absolute left-2.5 top-2.5" />
                <Rivet className="absolute right-2.5 top-2.5" />
                <Rivet className="absolute bottom-2.5 left-2.5" />
                <Rivet className="absolute bottom-2.5 right-2.5" />

                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#FFD600]" />
                  <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}>
                    Core Philosophy
                  </span>
                </div>
                <h3 className={`${FONT.display} mt-3 text-2xl leading-none sm:text-3xl`}>
                  TWO-STEP DECOMPOSITION
                </h3>
                <p className={`${FONT.body} mt-3 text-xs leading-relaxed text-white/75 sm:text-sm`}>
                  Rather than searching characters directly in large, cluttered video frames, PlateGuard decomposes the
                  task: first pinpoint where each plate is via YOLO, and then read only inside that focused crop via
                  PaddleOCR.
                </p>
                <div className="mt-5 border-t border-white/15 pt-4">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span className={FONT.mono}>Frame Resolution</span>
                    <span className="font-bold text-[#FFD600]">1080p / 4K</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                    <span className={FONT.mono}>OCR Target</span>
                    <span className="font-bold text-[#FFD600]">Isolated Crop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Metric cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map(({ icon: Icon, value, label, sub }, idx) => (
            <Reveal key={label} delay={idx * 100}>
              <div className="group h-full rounded-xl border-4 border-[#111111] bg-white p-5 shadow-[4px_4px_0_0_#111111] transition-all hover:-translate-y-1 hover:bg-[#FFD600]">
                <div className="flex items-center justify-between">
                  <span className={`${FONT.display} text-3xl tracking-wide text-[#111111]`}>{value}</span>
                  <Icon className="h-6 w-6 text-[#111111]" />
                </div>
                <p className={`${FONT.tech} mt-2 text-base font-bold uppercase tracking-[0.14em] text-[#111111]`}>
                  {label}
                </p>
                <p className={`${FONT.body} mt-1 text-xs text-[#111111]/70 group-hover:text-[#111111]`}>{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick jump navigation pills */}
        <Reveal delay={450}>
          <div className="mt-12 rounded-xl border-2 border-[#111111] bg-[#111111] p-4 text-white shadow-[6px_6px_0_0_#FFD600]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className={`${FONT.mono} inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}>
                <ArrowDown className="h-4 w-4" /> Jump Directly To Section
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_SECTIONS.map((sec) => (
                  <a
                    key={sec.label}
                    href={sec.href}
                    className={`${FONT.tech} rounded border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#FFD600] hover:bg-[#FFD600] hover:text-[#111111]`}
                  >
                    {sec.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

