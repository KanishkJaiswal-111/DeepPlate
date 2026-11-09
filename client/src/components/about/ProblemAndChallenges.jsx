import { useState } from "react";
import {
  AlertTriangle,
  EyeOff,
  SunMedium,
  Sparkles,
  Compass,
  Layers,
  HelpCircle,
  Car,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { FONT } from "../../constants/ui";
import Reveal from "../Reveal";
import Rivet from "../Rivet";

const CHALLENGES = [
  {
    id: "blur",
    title: "Motion Blur",
    icon: Sparkles,
    severity: "High",
    cause: "High relative speed between moving vehicles and fixed roadside cameras.",
    traditionalFailure: "Edge filters blur together, causing bounding box algorithms to miss plate contours.",
    plateGuardSolution:
      "YOLO features learn holistic plate patterns even with smeared edges; OpenCV bilateral filtering restores contrast for PaddleOCR.",
  },
  {
    id: "lowres",
    title: "Low-Resolution & Distant Plates",
    icon: EyeOff,
    severity: "High",
    cause: "Distant vehicles occupying only 30-50 pixels in wide-angle traffic feeds.",
    traditionalFailure: "Connected-component analysis fails as character components merge into single pixel blobs.",
    plateGuardSolution:
      "Multi-scale feature pyramid networks in YOLO detect small targets; crops are bicubic-upscaled and CLAHE-sharpened before OCR.",
  },
  {
    id: "lighting",
    title: "Poor / Varying Illumination",
    icon: SunMedium,
    severity: "Critical",
    cause: "Night-time footage, harsh tree shadows, and blinding oncoming headlight glare.",
    traditionalFailure: "Fixed binarization thresholds (Otsu) turn shadowed plates completely black or overexposed white.",
    plateGuardSolution:
      "Deep convolutional layers are illumination-invariant; adaptive histogram equalization renormalises luminance locally.",
  },
  {
    id: "glare",
    title: "Reflective Surface Glare",
    icon: AlertTriangle,
    severity: "Medium",
    cause: "Retro-reflective High Security Registration Plates (HSRP) reflecting camera flashes or street lamps.",
    traditionalFailure: "Intense glare masks characters, breaking contour tracing and thresholding.",
    plateGuardSolution:
      "Adaptive local thresholding and PaddleOCR sequence modeling infer characters despite localized specular hotspots.",
  },
  {
    id: "angle",
    title: "Perspective Distortion",
    icon: Compass,
    severity: "High",
    cause: "Roadside cameras mounted high up on gantries or at oblique roadside angles.",
    traditionalFailure: "Skewed characters lean into adjacent letters, making horizontal projection profiles useless.",
    plateGuardSolution:
      "Corner detection and perspective rectification deskew the cropped quadrilateral into a standard frontal plane.",
  },
  {
    id: "variations",
    title: "Font, Layout & State Variations",
    icon: Layers,
    severity: "Medium",
    cause: "Different font weights, two-row plates, commercial yellow plates, EV green plates, and state codes.",
    traditionalFailure: "Template matching algorithms fail as soon as font, kerning, or background colour changes.",
    plateGuardSolution:
      "PaddleOCR's sequence recogniser is trained across millions of varied typographic samples and colour spaces.",
  },
  {
    id: "similar",
    title: "Visually Similar Characters",
    icon: HelpCircle,
    severity: "Critical",
    cause: "Homoglyphs in registration fonts: O vs 0, I vs 1, B vs 8, S vs 5, and D vs 0.",
    traditionalFailure: "Pixel difference between O and 0 at low resolution is zero, producing arbitrary transcription errors.",
    plateGuardSolution:
      "Syntax-aware heuristic filters (e.g., Indian plates: State letters at pos 1-2, Digits at pos 3-4) combined with calibrated OCR confidence.",
  },
  {
    id: "multivehicle",
    title: "Multiple Vehicles per Frame",
    icon: Car,
    severity: "Medium",
    cause: "Dense multi-lane traffic jams with 4-8 vehicles appearing simultaneously in a single frame.",
    traditionalFailure: "Single-plate heuristics latch onto the largest edge cluster and ignore adjacent cars.",
    plateGuardSolution:
      "YOLO's anchor-free grid outputs simultaneous independent bounding boxes, tagged and tracked individually.",
  },
];

const SIMILAR_PAIRS = [
  { pair: "O vs 0", letter: "O (Letter)", digit: "0 (Zero)", example: "OD02 vs 0D02", rule: "State code at pos 1-2 must be alphabetic 'OD'." },
  { pair: "B vs 8", letter: "B (Letter)", digit: "8 (Eight)", example: "AB12 vs A812", rule: "Series code at pos 5-6 is alphabetic 'AB'." },
  { pair: "I vs 1", letter: "I (Letter)", digit: "1 (One)", example: "DL1C vs DLIC", rule: "District code at pos 3-4 must be numeric '01'." },
  { pair: "S vs 5", letter: "S (Letter)", digit: "5 (Five)", example: "5678 vs S678", rule: "Vehicle sequence at pos 7-10 must be numeric '5678'." },
  { pair: "D vs 0", letter: "D (Letter)", digit: "0 (Zero)", example: "OD vs O0", rule: "Pos 2 in Odisha registration must be letter 'D'." },
];

export default function ProblemAndChallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);
  const [activePairIdx, setActivePairIdx] = useState(0);

  const activePair = SIMILAR_PAIRS[activePairIdx];

  return (
    <section id="problem" className="scroll-mt-20 border-b-4 border-[#111111] bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl">
            <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#111111]/60`}>
              Section 1.2 · The Real-World Challenge
            </p>
            <h2 className={`${FONT.display} mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-[#111111]`}>
              WHY MANUAL INSPECTION <br />
              <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-3 pb-1 pt-2 shadow-[6px_6px_0_0_#111111]">
                CANNOT SCALE.
              </span>
            </h2>
            <p className={`${FONT.body} mt-6 text-base leading-relaxed text-[#111111]/80 sm:text-lg`}>
              A single minute of video from a busy arterial highway can capture dozens of vehicles. A human operator
              must pause, zoom, scrutinise and transcribe each plate by hand. Manual inspection is slow, tiring, and
              error-prone. Automating this through conventional image processing fails because real-world road footage is
              rarely clean or frontal.
            </p>
          </div>
        </Reveal>

        {/* Traditional CV vs PlateGuard Deep Learning Comparison */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Traditional CV Card */}
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border-4 border-red-500/80 bg-red-50/40 p-6 shadow-[6px_6px_0_0_rgba(239,68,68,0.4)] sm:p-8">
              <div className="flex items-center gap-3">
                <XCircle className="h-7 w-7 text-red-600" />
                <h3 className={`${FONT.display} text-2xl text-[#111111] sm:text-3xl`}>
                  TRADITIONAL COMPUTER VISION
                </h3>
              </div>
              <p className={`${FONT.body} mt-4 text-sm text-[#111111]/75 leading-relaxed`}>
                Relies on fixed edge-density heuristics (Sobel/Canny), rigid colour thresholding (Otsu), and
                connected-component bounding.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm font-mono text-[#111111]/80">
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✕</span> Breaks with shadow gradients or night glare
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✕</span> Rigid template matching fails on angled plates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✕</span> Merges low-res characters into illegible blobs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✕</span> No confidence scoring on individual readings
                </li>
              </ul>
            </div>
          </Reveal>

          {/* PlateGuard Deep Learning Card */}
          <Reveal delay={200}>
            <div className="h-full rounded-2xl border-4 border-[#111111] bg-[#FFD600] p-6 shadow-[6px_6px_0_0_#111111] sm:p-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-7 w-7 text-[#111111]" />
                <h3 className={`${FONT.display} text-2xl text-[#111111] sm:text-3xl`}>
                  PLATEGUARD AI PIPELINE
                </h3>
              </div>
              <p className={`${FONT.body} mt-4 text-sm text-[#111111]/85 leading-relaxed`}>
                Combines fine-tuned YOLO object detection with adaptive image preprocessing and PaddleOCR text
                recognition.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm font-mono text-[#111111]">
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> Convolutional features invariant to lighting and shadows
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> Learns generalized plate bounds across oblique angles
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> Bilateral denoise + CLAHE enhances low-res crops
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">✓</span> Mathematical OCR confidence score provided for every plate
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 8 Challenges Interactive Matrix */}
        <Reveal delay={300} className="mt-16 sm:mt-20">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#111111]/60`}>
                  Interactive Matrix
                </span>
                <h3 className={`${FONT.display} text-3xl text-[#111111] sm:text-4xl`}>
                  THE 8 REAL-WORLD CHALLENGES
                </h3>
              </div>
              <span className={`${FONT.mono} text-xs text-[#111111]/60`}>Click any challenge below to inspect</span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CHALLENGES.map((c) => {
                const Icon = c.icon;
                const isSelected = selectedChallenge.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedChallenge(c)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? "border-[#111111] bg-[#111111] text-white shadow-[4px_4px_0_0_#FFD600]"
                        : "border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111] hover:bg-black/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`h-5 w-5 ${isSelected ? "text-[#FFD600]" : "text-[#111111]"}`} />
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase ${
                          c.severity === "Critical"
                            ? isSelected ? "bg-red-500 text-white" : "bg-red-100 text-red-700"
                            : isSelected ? "bg-[#FFD600] text-black" : "bg-black/10 text-black/70"
                        }`}
                      >
                        {c.severity}
                      </span>
                    </div>
                    <h4 className={`${FONT.tech} mt-3 text-base font-bold uppercase tracking-wider`}>{c.title}</h4>
                    <p className="mt-1 text-xs line-clamp-2 opacity-75">{c.cause}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Challenge Detail Card */}
            <div className="relative mt-6 rounded-2xl border-4 border-[#111111] bg-[#111111] p-6 text-white shadow-[8px_8px_0_0_#FFD600] sm:p-8">
              <Rivet className="absolute left-3 top-3" />
              <Rivet className="absolute right-3 top-3" />
              <Rivet className="absolute bottom-3 left-3" />
              <Rivet className="absolute bottom-3 right-3" />

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className={`${FONT.mono} rounded bg-[#FFD600] px-2.5 py-1 text-xs font-bold text-[#111111]`}>
                      CASE STUDY
                    </span>
                    <h4 className={`${FONT.display} text-3xl text-[#FFD600] sm:text-4xl`}>
                      {selectedChallenge.title}
                    </h4>
                  </div>
                  <p className={`${FONT.body} mt-3 text-sm text-white/80 sm:text-base`}>
                    <strong>Underlying Cause:</strong> {selectedChallenge.cause}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs font-mono">
                    <div className="rounded border border-red-500/40 bg-red-950/20 p-3 text-red-300">
                      <strong className="block text-red-400 mb-1">Traditional Method Failure:</strong>
                      {selectedChallenge.traditionalFailure}
                    </div>
                    <div className="rounded border border-[#FFD600]/40 bg-[#FFD600]/10 p-3 text-white/90">
                      <strong className="block text-[#FFD600] mb-1">PlateGuard Mitigation:</strong>
                      {selectedChallenge.plateGuardSolution}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-white/20 bg-white/5 p-4 text-center lg:w-64">
                  <span className={`${FONT.mono} text-[11px] font-bold uppercase tracking-wider text-white/60 block`}>
                    Challenging Domain
                  </span>
                  <div className={`${FONT.display} mt-2 text-4xl text-[#FFD600]`}>
                    {selectedChallenge.id.toUpperCase()}
                  </div>
                  <span className={`${FONT.mono} mt-1 text-[10px] text-white/50 block`}>
                    Validated across highway datasets
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive Feature: Similar-Character Disambiguator (O vs 0, B vs 8, etc.) */}
        <Reveal delay={400} className="mt-16 sm:mt-20">
          <div className="rounded-2xl border-4 border-[#111111] bg-white p-6 shadow-[8px_8px_0_0_#111111] sm:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#111111]/60`}>
                  Deep-Learning Disambiguation Widget
                </span>
                <h3 className={`${FONT.display} text-3xl text-[#111111] sm:text-4xl`}>
                  RESOLVING VISUALLY SIMILAR CHARACTERS
                </h3>
              </div>
              <p className={`${FONT.body} max-w-sm text-xs text-[#111111]/70`}>
                Homoglyphs like O and 0 or B and 8 are the #1 cause of OCR failure. See how syntax rules resolve them.
              </p>
            </div>

            {/* Pair Switcher Buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {SIMILAR_PAIRS.map((p, idx) => (
                <button
                  key={p.pair}
                  type="button"
                  onClick={() => setActivePairIdx(idx)}
                  className={`rounded-md border-2 px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                    activePairIdx === idx
                      ? "border-[#111111] bg-[#FFD600] text-[#111111] shadow-[2px_2px_0_0_#111111]"
                      : "border-[#111111]/20 bg-white text-[#111111]/80 hover:border-[#111111]"
                  }`}
                >
                  {p.pair}
                </button>
              ))}
            </div>

            {/* Live Disambiguation Visual Display */}
            <div className="mt-6 grid gap-6 md:grid-cols-12 rounded-xl border-2 border-[#111111] bg-[#111111] p-6 text-white">
              <div className="md:col-span-4 flex flex-col justify-center items-center rounded-lg border border-white/20 bg-black/60 p-5 text-center">
                <span className={`${FONT.mono} text-xs text-[#FFD600]`}>CONFUSION PAIR</span>
                <div className={`${FONT.display} mt-2 text-6xl tracking-widest text-white`}>
                  {activePair.pair}
                </div>
                <div className="mt-3 flex gap-3 text-xs font-mono text-white/70">
                  <span>{activePair.letter}</span>
                  <span>↔</span>
                  <span>{activePair.digit}</span>
                </div>
              </div>

              <div className="md:col-span-8 flex flex-col justify-center space-y-4">
                <div className="rounded-lg border border-white/15 bg-white/5 p-4">
                  <span className={`${FONT.mono} text-xs text-[#FFD600] font-bold block mb-1`}>
                    SYNTACTIC RULE DISAMBIGUATION:
                  </span>
                  <p className={`${FONT.body} text-sm text-white/90`}>{activePair.rule}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-3">
                  <div>
                    <span className="text-xs font-mono text-white/60 block">SAMPLE READING:</span>
                    <span className={`${FONT.display} text-2xl text-[#FFD600]`}>{activePair.example}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-white/60 block">POST-CORRECTION CONFIDENCE:</span>
                    <span className="text-sm font-mono font-bold text-green-400">97.8% (RESOLVED)</span>
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
