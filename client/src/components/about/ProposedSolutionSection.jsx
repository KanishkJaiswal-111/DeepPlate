import { useState } from "react";
import { Film, Crosshair, Cpu, CheckCircle, ArrowRight } from "lucide-react";
import { FONT } from "../../constants/ui";
import Reveal from "../Reveal";
import Rivet from "../Rivet";

const COMPONENTS = [
  {
    n: "01",
    title: "Video Input & Frame Extraction",
    icon: Film,
    points: [
      "Recorded traffic videos are opened with OpenCV and converted into a sequence of frames.",
      "Every frame is tagged with its sequential frame index and millisecond-accurate timestamp.",
      "An optional sampling rule (e.g. every n-th frame) trades processing time against the chance of capturing a clear view of each vehicle.",
    ],
  },
  {
    n: "02",
    title: "Number Plate Detection & Cropping",
    icon: Crosshair,
    points: [
      "A YOLO model, fine-tuned on annotated number plate datasets, predicts the bounding box and detection confidence.",
      "Predicted coordinates [x1, y1, x2, y2] are used to crop the plate region directly from the original full-resolution frame.",
      "Preserves maximum character fidelity without downsampling the entire frame.",
    ],
  },
  {
    n: "03",
    title: "Preprocessing, OCR & Result Generation",
    icon: Cpu,
    points: [
      "Each crop is resized, contrast-enhanced with CLAHE, denoised, and perspective-corrected where needed.",
      "PaddleOCR reads the characters and calculates an OCR confidence score.",
      "Text is normalised, validated against layout heuristics, and stored with confidence, timestamp, frame index, and bounding box.",
      "Results are exported in structured JSON or tabular formats.",
    ],
  },
];

export default function ProposedSolutionSection() {
  const [selectedDecompositionStep, setSelectedDecompositionStep] = useState("decompose");

  return (
    <section id="solution" className="scroll-mt-20 border-b-4 border-[#111111] bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl">
            <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#111111]/60`}>
              Section 1.3 · Engineering Design
            </p>
            <h2 className={`${FONT.display} mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-[#111111]`}>
              PROPOSED SOLUTION: <br />
              <span className="text-[#111111] underline decoration-[#FFD600] decoration-4">
                TWO-STEP DECOMPOSITION
              </span>
            </h2>
            <p className={`${FONT.body} mt-6 text-base leading-relaxed text-[#111111]/80 sm:text-lg`}>
              PlateGuard integrates video processing, deep-learning-based object detection, image preprocessing and
              OCR into a unified application. Instead of trying to read characters directly from a whole frame, the
              system first solves the easier problem of finding <em>where</em> each plate is, and only then reads the
              characters inside that small region.
            </p>
          </div>
        </Reveal>

        {/* Two-step Advantages Visualizer */}
        <Reveal delay={150} className="mt-14">
          <div className="relative rounded-2xl border-4 border-[#111111] bg-[#111111] p-6 text-white shadow-[8px_8px_0_0_#FFD600] sm:p-10">
            <Rivet className="absolute left-3 top-3" />
            <Rivet className="absolute right-3 top-3" />
            <Rivet className="absolute bottom-3 left-3" />
            <Rivet className="absolute bottom-3 right-3" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/15 pb-6">
              <div>
                <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}>
                  Core Architectural Principle
                </span>
                <h3 className={`${FONT.display} mt-1 text-3xl sm:text-4xl text-white`}>
                  WHY DECOMPOSE DETECTION & RECOGNITION?
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDecompositionStep("direct")}
                  className={`rounded px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                    selectedDecompositionStep === "direct"
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Naive Whole-Frame OCR
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDecompositionStep("decompose")}
                  className={`rounded px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                    selectedDecompositionStep === "decompose"
                      ? "bg-[#FFD600] text-[#111111]"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  PlateGuard Two-Step
                </button>
              </div>
            </div>

            {selectedDecompositionStep === "direct" ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 items-center">
                <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-6 text-red-200">
                  <h4 className={`${FONT.tech} text-xl font-bold uppercase text-red-400`}>
                    Naive Approach: Whole-Frame Character Search
                  </h4>
                  <p className={`${FONT.body} mt-2 text-sm text-red-300/80`}>
                    Running OCR across an entire 1920×1080 frame forces the engine to search over 2,000,000 pixels.
                    Billboards, road signage, shop signs, and car badges cause massive false-positive readings and
                    crippling latency.
                  </p>
                  <div className="mt-4 text-xs font-mono text-red-400">
                    Search Area: 2,073,600 px · High False Positives · ~350ms/frame
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/50 p-6 text-center">
                  <span className={`${FONT.mono} text-xs text-red-400 block mb-2`}>UNCONSTRAINED SCENE NOISE</span>
                  <div className="h-32 rounded border border-dashed border-red-500/50 flex items-center justify-center text-xs font-mono text-white/40">
                    OCR Confused by signs, text on trucks, decals & reflections
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FFD600] shrink-0 mt-1" />
                    <div>
                      <h4 className={`${FONT.tech} text-lg font-bold uppercase text-white`}>
                        Advantage 1: Zero Scene Clutter for OCR
                      </h4>
                      <p className={`${FONT.body} text-xs text-white/70`}>
                        The OCR engine never searches the full 2M pixels. It operates strictly inside a localized crop
                        of ~10,000 pixels, eliminating shop signs, bumper stickers, and gantry text.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FFD600] shrink-0 mt-1" />
                    <div>
                      <h4 className={`${FONT.tech} text-lg font-bold uppercase text-white`}>
                        Advantage 2: Independent Subsystem Optimization
                      </h4>
                      <p className={`${FONT.body} text-xs text-white/70`}>
                        The YOLO detector can be fine-tuned or upgraded (e.g. YOLOv8 to YOLOv11) without touching OCR,
                        and PaddleOCR can be adapted for new multilingual characters independently.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/15 bg-black/60 p-5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#FFD600] mb-3">
                    <span>STEP 1: YOLO DETECT</span>
                    <span>STEP 2: PADDLEOCR</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded border border-[#FFD600] bg-zinc-900 p-2 text-center flex-1">
                      <span className="text-[10px] font-mono text-white/60 block">Whole Frame</span>
                      <span className={`${FONT.tech} text-sm font-bold text-[#FFD600]`}>Find Bounding Box</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#FFD600]" />
                    <div className="rounded border border-green-500 bg-zinc-900 p-2 text-center flex-1">
                      <span className="text-[10px] font-mono text-white/60 block">Cropped ROI</span>
                      <span className={`${FONT.tech} text-sm font-bold text-green-400`}>Read Characters</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* The 3 Core Components Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {COMPONENTS.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <Reveal key={comp.n} delay={idx * 150}>
                <div className="group h-full rounded-2xl border-4 border-[#111111] bg-white p-6 shadow-[6px_6px_0_0_#111111] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#FFD600] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`${FONT.mono} text-sm font-bold tracking-[0.25em] text-[#111111]/50`}>
                        COMPONENT {comp.n}
                      </span>
                      <Icon className="h-6 w-6 text-[#111111]" />
                    </div>

                    <h3 className={`${FONT.display} mt-5 text-2xl sm:text-3xl text-[#111111] leading-tight`}>
                      {comp.title}
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {comp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#111111]/80 leading-relaxed">
                          <span className="text-[#FFD600] font-bold mt-0.5 select-none text-base leading-none">■</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t-2 border-[#111111]/10 pt-4 flex items-center justify-between text-xs font-mono text-[#111111]/60">
                    <span>STAGE {comp.n} OF 03</span>
                    <span className="text-[#111111] font-bold">MODULAR API</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
