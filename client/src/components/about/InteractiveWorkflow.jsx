import { useState, useEffect } from "react";
import {
  Video,
  Film,
  Crosshair,
  Scissors,
  Sliders,
  CheckCircle2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { FONT } from "../../constants/ui";
import Reveal from "../Reveal";
import Rivet from "../Rivet";

const STAGES = [
  {
    id: 1,
    title: "Video Input",
    short: "Video Ingestion",
    tech: "OpenCV (cv2.VideoCapture)",
    icon: Video,
    description:
      "Recorded traffic video streams are ingested and validated. Frame dimensions, frame rates (FPS), and colour spaces are decoded frame-by-frame.",
    input: "Raw traffic video file (.mp4, .avi, .mkv) from fixed or mobile roadside cameras.",
    output: "Sequential decoded video stream with millisecond-precision timestamps.",
  },
  {
    id: 2,
    title: "Frame Extraction",
    short: "Sampling & Extraction",
    tech: "OpenCV Frame Sampler",
    icon: Film,
    description:
      "OpenCV extracts individual frames tagged with frame index and timestamp. An optional sampling rule (every n-th frame) trades processing time against the chance of capturing a crisp view.",
    input: "Decoded video stream.",
    output: "Sequence of high-resolution NumPy frame arrays [H x W x 3].",
  },
  {
    id: 3,
    title: "YOLO Detection",
    short: "Plate Localisation",
    tech: "YOLO (Ultralytics / PyTorch)",
    icon: Crosshair,
    description:
      "A YOLO object detector, fine-tuned specifically on number plate datasets, predicts bounding-box coordinates [x1, y1, x2, y2] and detection confidence for every plate in the frame.",
    input: "Full-resolution video frame (e.g. 1920x1080).",
    output: "Bounding box coordinates and detection confidence score (e.g. 0.97).",
  },
  {
    id: 4,
    title: "Plate Cropping",
    short: "Region Extraction",
    tech: "NumPy Coordinate Slicing",
    icon: Scissors,
    description:
      "Using the predicted bounding-box coordinates, the plate region is cropped directly from the full-resolution frame, isolating the plate from background clutter.",
    input: "Original frame + bounding box [x1, y1, x2, y2].",
    output: "Tight plate crop image [h x w x 3].",
  },
  {
    id: 5,
    title: "Image Preprocessing",
    short: "Image Enhancement",
    tech: "OpenCV (CLAHE, Bilateral, Deskew)",
    icon: Sliders,
    description:
      "Each crop is resized, converted to grayscale, contrast-enhanced with CLAHE, denoised, and perspective-corrected to make characters sharp and clear for OCR.",
    input: "Raw cropped plate image.",
    output: "High-contrast, noise-free, rectified plate crop ready for character extraction.",
  },
  {
    id: 6,
    title: "PaddleOCR & Output",
    short: "Recognition & Scoring",
    tech: "PaddleOCR Text Recognition",
    icon: CheckCircle2,
    description:
      "PaddleOCR converts the preprocessed crop into alphanumeric text and computes an OCR confidence score. The normalised result is stored with timestamp, frame index, and coordinates.",
    input: "Preprocessed plate crop.",
    output: "Recognised plate text (e.g. OD02AB1234) + OCR Confidence (e.g. 0.96).",
  },
];

export default function InteractiveWorkflow() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [samplingRate, setSamplingRate] = useState(3);
  const [activeFilter, setActiveFilter] = useState("all");

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= STAGES.length ? 1 : prev + 1));
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = STAGES[activeStep - 1];

  return (
    <section id="workflow" className="scroll-mt-20 border-b-4 border-[#111111] bg-[#111111] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#FFD600]`}>
                Section 1.1 · System Workflow
              </p>
              <h2 className={`${FONT.display} mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9]`}>
                THE 5-STAGE <span className="text-[#FFD600]">AI PIPELINE.</span>
              </h2>
              <p className={`${FONT.body} mt-4 max-w-2xl text-base text-white/70 sm:text-lg`}>
                Fig. 1.1: Overall workflow of the PlateGuard system. Step through each phase from raw video ingestion to
                character recognition and confidence scoring.
              </p>
            </div>

            {/* Play/Pause controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`${FONT.tech} inline-flex items-center gap-2 rounded-md border-2 border-[#FFD600] bg-[#FFD600] px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#111111] transition-all hover:bg-white hover:border-white`}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause Demo" : "Auto-Play Pipeline"}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Workflow breadcrumbs ribbon (Fig. 1.1 representation) */}
        <Reveal delay={150} className="mt-12">
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-[760px] items-center justify-between gap-2 rounded-xl border-2 border-white/20 bg-white/[0.04] p-3">
              {STAGES.map((s, idx) => {
                const Icon = s.icon;
                const isActive = s.id === activeStep;
                const isPast = s.id < activeStep;
                return (
                  <div key={s.id} className="flex flex-1 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPlaying(false);
                        setActiveStep(s.id);
                      }}
                      className={`group flex w-full flex-col items-center gap-2 rounded-lg p-2.5 text-center transition-all ${
                        isActive
                          ? "bg-[#FFD600] text-[#111111] shadow-[4px_4px_0_0_#ffffff]"
                          : isPast
                          ? "bg-white/10 text-white hover:bg-white/20"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`${FONT.mono} text-[10px] font-bold tracking-wider ${
                            isActive ? "text-[#111111]" : isPast ? "text-[#FFD600]" : "text-white/40"
                          }`}
                        >
                          0{s.id}
                        </span>
                        {Icon && <Icon className="h-4 w-4" />}
                      </div>
                      <span className={`${FONT.tech} text-xs font-bold uppercase tracking-wider line-clamp-1`}>
                        {s.title}
                      </span>
                    </button>

                    {idx < STAGES.length - 1 && (
                      <span className="mx-1 text-white/30 font-mono text-sm select-none">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Interactive Workspace Simulator */}
        <Reveal delay={250} className="mt-8">
          <div className="relative rounded-2xl border-4 border-white bg-[#1a1a1a] p-4 shadow-[10px_10px_0_0_#FFD600] sm:p-8">
            <Rivet className="absolute left-3 top-3" />
            <Rivet className="absolute right-3 top-3" />
            <Rivet className="absolute bottom-3 left-3" />
            <Rivet className="absolute bottom-3 right-3" />

            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Interactive Visual Transformation Screen */}
              <div className="flex flex-col justify-between rounded-xl border-2 border-white/20 bg-black/80 p-5 lg:col-span-7">
                {/* Visual Top Bar */}
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.2em] text-white/80`}>
                      SIMULATION VIEWPORT · STEP 0{activeStep}
                    </span>
                  </div>
                  <span className={`${FONT.mono} text-xs text-[#FFD600]`}>
                    {activeStep === 1 && "VIDEO FEED · 1080p @ 30FPS"}
                    {activeStep === 2 && `SAMPLE RULE: 1 IN EVERY ${samplingRate} FRAMES`}
                    {activeStep === 3 && "YOLOv8 PLATE LOCALISER"}
                    {activeStep === 4 && "BOUNDING BOX SLICE"}
                    {activeStep === 5 && "CLAHE + BILATERAL DENOISE"}
                    {activeStep === 6 && "PADDLEOCR INFERENCE ENGINE"}
                  </span>
                </div>

                {/* Simulated Screen Graphic Content */}
                <div className="relative my-6 flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] p-4 sm:min-h-[340px]">
                  {/* Step 1: Video Input */}
                  {activeStep === 1 && (
                    <div className="relative w-full text-center">
                      <div className="relative mx-auto aspect-video max-w-md overflow-hidden rounded border border-white/20 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col justify-between">
                        <div className="flex justify-between text-[11px] font-mono text-white/60">
                          <span>CAM_04 · NH-16 TOLL PLAZA</span>
                          <span className="text-red-400">● REC 00:04:18.240</span>
                        </div>
                        {/* Wireframe car approaching */}
                        <div className="my-auto flex flex-col items-center">
                          <div className="h-20 w-44 rounded-t-2xl border-2 border-white/30 bg-white/5 relative flex items-center justify-center">
                            <span className="text-[10px] font-mono text-white/50">WINDSHIELD</span>
                            <div className="absolute -bottom-6 h-10 w-52 rounded border-2 border-white/40 bg-zinc-800/80 flex items-center justify-center">
                              {/* Plate preview */}
                              <div className="rounded border border-[#FFD600] bg-white px-2 py-0.5 text-[9px] font-bold text-black font-mono">
                                OD 02 AB 1234
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-[#FFD600]">
                          <span>CODEC: H.264 / OpenCV Mat</span>
                          <span>FRAME: #128 / 900</span>
                        </div>
                      </div>
                      <p className={`${FONT.mono} mt-3 text-xs text-white/60`}>
                        Video file opened with OpenCV cv2.VideoCapture()
                      </p>
                    </div>
                  )}

                  {/* Step 2: Frame Extraction */}
                  {activeStep === 2 && (
                    <div className="w-full space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {[126, 129, 132].map((fNum, i) => (
                          <div
                            key={fNum}
                            className={`rounded border p-2 text-center transition-all ${
                              i === 1 ? "border-[#FFD600] bg-[#FFD600]/10 ring-2 ring-[#FFD600]" : "border-white/20 bg-white/5 opacity-60"
                            }`}
                          >
                            <span className={`${FONT.mono} text-[10px] text-white/50 block`}>FRAME #{fNum}</span>
                            <div className="my-2 h-14 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-mono text-white/60">
                              {i === 1 ? "Selected Frame" : "Skipped"}
                            </div>
                            <span className={`${FONT.mono} text-[9px] text-[#FFD600]`}>
                              {i === 1 ? "t = 4.30s (Crisp)" : "t = " + (4.2 + i * 0.1).toFixed(2) + "s"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Sampling Rule Slider */}
                      <div className="rounded-lg border border-white/15 bg-white/5 p-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className={FONT.mono}>Sampling Rule: Every {samplingRate} Frames</span>
                          <span className="text-[#FFD600] font-mono">10 FPS Effective</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="6"
                          value={samplingRate}
                          onChange={(e) => setSamplingRate(Number(e.target.value))}
                          className="mt-2 w-full accent-[#FFD600]"
                        />
                        <p className="mt-1 text-[11px] text-white/50">
                          Balances CPU/GPU throughput against chance of motion blur.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: YOLO Plate Detection */}
                  {activeStep === 3 && (
                    <div className="relative w-full text-center">
                      <div className="relative mx-auto aspect-video max-w-md overflow-hidden rounded border border-white/20 bg-zinc-950 p-4 flex items-center justify-center">
                        <div className="relative h-32 w-64 rounded border border-white/10 bg-zinc-900/50 flex items-center justify-center">
                          {/* YOLO predicted bounding box */}
                          <div className="relative rounded border-2 border-[#FFD600] bg-[#FFD600]/20 px-3 py-1.5 shadow-[0_0_12px_rgba(255,214,0,0.6)] animate-pulse">
                            <span className="absolute -top-5 left-0 rounded bg-[#FFD600] px-1.5 py-0.5 text-[9px] font-bold text-[#111111] font-mono">
                              PLATE: 0.97
                            </span>
                            <span className="font-mono text-xs font-bold tracking-widest text-white">
                              OD02AB1234
                            </span>
                          </div>

                          {/* Crosshair guidelines */}
                          <span className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-[#FFD600]/30" />
                          <span className="absolute inset-y-0 left-1/2 w-px border-l border-dashed border-[#FFD600]/30" />
                        </div>
                      </div>
                      <div className={`${FONT.mono} mt-3 flex justify-center gap-4 text-xs text-white/70`}>
                        <span>BBOX: [412, 520, 604, 578]</span>
                        <span className="text-[#FFD600]">CONFIDENCE: 97.4%</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Plate Cropping */}
                  {activeStep === 4 && (
                    <div className="w-full text-center space-y-4">
                      <div className="inline-block rounded-xl border-4 border-[#FFD600] bg-white p-4 shadow-[6px_6px_0_0_#ffffff]">
                        <div className="flex items-center gap-3 bg-[#111111] px-4 py-2 rounded">
                          <span className={`${FONT.mono} bg-blue-700 text-white text-[9px] px-1 py-0.5 rounded font-bold`}>
                            IND
                          </span>
                          <span className={`${FONT.display} text-2xl tracking-[0.2em] text-[#FFD600] sm:text-3xl`}>
                            OD 02 AB 1234
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center gap-6 text-xs font-mono text-white/70">
                        <span>Original: 1920×1080</span>
                        <span className="text-[#FFD600]">Crop: 192×58 px</span>
                        <span>Aspect Ratio: 3.31 : 1</span>
                      </div>
                      <p className={`${FONT.body} text-xs text-white/60 max-w-sm mx-auto`}>
                        Isolates the plate region from the background clutter, minimizing memory and inference area.
                      </p>
                    </div>
                  )}

                  {/* Step 5: Image Preprocessing */}
                  {activeStep === 5 && (
                    <div className="w-full space-y-4">
                      <div className="flex justify-center gap-2">
                        {[
                          { id: "all", label: "Full Pipeline" },
                          { id: "gray", label: "Grayscale" },
                          { id: "clahe", label: "CLAHE Contrast" },
                          { id: "denoise", label: "Bilateral Denoise" },
                        ].map((filter) => (
                          <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveFilter(filter.id)}
                            className={`rounded px-2.5 py-1 text-xs font-mono font-bold uppercase transition-colors ${
                              activeFilter === filter.id
                                ? "bg-[#FFD600] text-black"
                                : "bg-white/10 text-white/70 hover:bg-white/20"
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <div className="rounded border border-white/20 bg-zinc-900 p-3 text-center">
                          <span className="text-[10px] font-mono text-white/50 block mb-1">RAW CROP (LOW CONTRAST)</span>
                          <div className="h-12 w-48 rounded bg-zinc-700/60 flex items-center justify-center font-mono text-xs text-white/40 blur-[0.4px]">
                            OD 02 AB 1234
                          </div>
                        </div>

                        <span className="font-mono text-[#FFD600] text-xl">→</span>

                        <div className="rounded border-2 border-[#FFD600] bg-white p-3 text-center shadow-[4px_4px_0_0_#FFD600]">
                          <span className="text-[10px] font-mono text-black font-bold block mb-1">
                            ENHANCED FOR OCR ({activeFilter.toUpperCase()})
                          </span>
                          <div className="h-12 w-48 rounded bg-black flex items-center justify-center font-mono text-base font-bold tracking-widest text-[#FFD600]">
                            OD 02 AB 1234
                          </div>
                        </div>
                      </div>

                      <p className="text-center text-xs font-mono text-white/60">
                        Increases character-to-background contrast and reduces compression artefacts.
                      </p>
                    </div>
                  )}

                  {/* Step 6: PaddleOCR & Final Output */}
                  {activeStep === 6 && (
                    <div className="w-full space-y-4 text-center">
                      <div className="inline-block rounded-xl border-4 border-[#FFD600] bg-white p-4 shadow-[8px_8px_0_0_#FFD600]">
                        <div className="flex items-center gap-3">
                          <span className={`${FONT.mono} rounded bg-blue-700 px-1.5 py-1 text-[10px] font-bold text-white`}>
                            IND 🇮🇳
                          </span>
                          <span className={`${FONT.display} text-4xl tracking-[0.16em] text-[#111111] sm:text-5xl`}>
                            OD02AB1234
                          </span>
                        </div>
                      </div>

                      {/* Character Breakdown Confidence */}
                      <div className="mx-auto max-w-md rounded-lg border border-white/15 bg-white/5 p-3">
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-white/70">AGGREGATE OCR CONFIDENCE</span>
                          <span className="font-bold text-[#FFD600] text-sm">0.96 (96%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-[#FFD600] rounded-full transition-all duration-500" style={{ width: "96%" }} />
                        </div>
                        <div className="mt-3 flex justify-between text-[10px] font-mono text-white/60">
                          <span>O: 0.98</span>
                          <span>D: 0.97</span>
                          <span>0: 0.95</span>
                          <span>2: 0.96</span>
                          <span>A: 0.97</span>
                          <span>B: 0.96</span>
                          <span>1: 0.98</span>
                          <span>4: 0.96</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between border-t border-white/15 pt-3">
                  <button
                    type="button"
                    disabled={activeStep === 1}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStep((p) => Math.max(1, p - 1));
                    }}
                    className={`${FONT.tech} inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:text-[#FFD600] disabled:opacity-30`}
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous Stage
                  </button>
                  <span className={`${FONT.mono} text-xs text-white/50`}>
                    Stage {activeStep} of {STAGES.length}
                  </span>
                  <button
                    type="button"
                    disabled={activeStep === STAGES.length}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStep((p) => Math.min(STAGES.length, p + 1));
                    }}
                    className={`${FONT.tech} inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-[#FFD600] transition-colors hover:text-white disabled:opacity-30`}
                  >
                    Next Stage <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Stage Description & Technical Specs */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`${FONT.mono} rounded bg-[#FFD600] px-2 py-0.5 text-xs font-bold text-[#111111]`}>
                      PHASE 0{current.id}
                    </span>
                    <span className={`${FONT.mono} text-xs font-semibold text-white/60`}>{current.tech}</span>
                  </div>

                  <h3 className={`${FONT.display} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                    {current.short}
                  </h3>

                  <p className={`${FONT.body} mt-4 text-sm leading-relaxed text-white/80 sm:text-base`}>
                    {current.description}
                  </p>

                  <div className="mt-6 space-y-3 rounded-lg border border-white/15 bg-white/5 p-4 text-xs font-mono">
                    <div>
                      <span className="text-[#FFD600] block font-bold mb-0.5">INPUT DATA:</span>
                      <span className="text-white/70">{current.input}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2">
                      <span className="text-[#FFD600] block font-bold mb-0.5">OUTPUT PAYLOAD:</span>
                      <span className="text-white/70">{current.output}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-[#FFD600]/40 bg-[#FFD600]/10 p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-[#FFD600] shrink-0 mt-0.5" />
                    <p className={`${FONT.body} text-xs text-white/80`}>
                      <strong>Two-Step Independence:</strong> Because detection and recognition are separate, YOLO can
                      be fine-tuned on new plate shapes without touching PaddleOCR, and OCR language models can be
                      swapped without retraining the detector.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
