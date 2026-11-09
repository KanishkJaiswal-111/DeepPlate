import { useState } from "react";
import { Monitor, Cpu, Database, Settings } from "lucide-react";
import { FONT } from "../../constants/ui";
import Reveal from "../Reveal";
import Rivet from "../Rivet";

const LAYERS = [
  {
    id: "presentation",
    name: "Presentation Layer",
    icon: Monitor,
    tagline: "UI, Video Upload & Visualization",
    description:
      "Accepts recorded video inputs, manages client playback, and surfaces real-time bounding box visualizations, recognized registration plates, and tabular data displays.",
    elements: ["React 19 Frontend", "Tailwind CSS UI", "Interactive Video Player", "Export Controls (JSON/CSV)"],
  },
  {
    id: "controller",
    name: "Application Layer (Pipeline Controller)",
    icon: Settings,
    tagline: "Execution Coordinator & Dispatcher",
    description:
      "Coordinates sequential execution across the 7 processing modules. Manages frame queues, handles exceptions, executes the sampling rules, and dispatches crops to OCR worker threads.",
    elements: ["Video Ingestion Controller", "Frame Sampler Dispatcher", "Queue & Memory Manager", "Telemetry & Logging"],
  },
  {
    id: "modules",
    name: "Processing Layer (7 Modules)",
    icon: Cpu,
    tagline: "The 7 Core Processing Modules",
    description:
      "The sequential computational backbone: 1. Video Input → 2. Frame Extraction → 3. Plate Detection (YOLO) → 4. Cropping → 5. Preprocessing (CLAHE) → 6. OCR (PaddleOCR) → 7. Result Generation.",
    elements: [
      "OpenCV Decoding Module",
      "NumPy Frame Sampler",
      "YOLO Localisation Module",
      "Coordinate Slicer",
      "CLAHE Preprocessing Engine",
      "PaddleOCR Recogniser",
      "Format Normalisation Engine",
    ],
  },
  {
    id: "storage",
    name: "Storage Layer",
    icon: Database,
    tagline: "Model Weights & Output Records",
    description:
      "Stores trained deep learning checkpoints (.pt YOLO weights, PaddleOCR recognition models) and persists parsed vehicle records, frame timestamps, and bounding box coordinates.",
    elements: ["YOLOv8 Weights (best.pt)", "PaddleOCR Language Models", "Extracted Plate Crop Cache", "JSON / CSV Output Records"],
  },
];

const TECH_STACK = [
  {
    component: "Programming language",
    technology: "Python",
    purpose: "Main development language",
    category: "Core",
    badge: "v3.10+",
  },
  {
    component: "Object detection",
    technology: "YOLO (Ultralytics implementation)",
    purpose: "Number plate localisation & bounding box regression",
    category: "Model",
    badge: "Ultralytics",
  },
  {
    component: "Deep-learning framework",
    technology: "PyTorch",
    purpose: "Model training and inference acceleration for YOLO",
    category: "Framework",
    badge: "PyTorch 2.x",
  },
  {
    component: "Video / image processing",
    technology: "OpenCV (cv2)",
    purpose: "Frame extraction, cropping, CLAHE contrast enhancement & deskew",
    category: "Computer Vision",
    badge: "OpenCV 4.x",
  },
  {
    component: "OCR Engine",
    technology: "PaddleOCR",
    purpose: "Registration text recognition and confidence score extraction",
    category: "Model",
    badge: "PP-OCR",
  },
  {
    component: "Development environment",
    technology: "VS Code / Google Colab",
    purpose: "Interactive development, GPU model training & benchmarking",
    category: "Environment",
    badge: "CUDA Enabled",
  },
  {
    component: "Version control",
    technology: "Git and GitHub",
    purpose: "Source-code management, branching & collaborative workflows",
    category: "Tooling",
    badge: "Git Flow",
  },
];

export default function SystemArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(LAYERS[1]); // Default controller/modules
  const [techFilter, setTechFilter] = useState("all");

  const filteredTech =
    techFilter === "all"
      ? TECH_STACK
      : TECH_STACK.filter((t) => t.category.toLowerCase().includes(techFilter.toLowerCase()));

  return (
    <section id="architecture" className="scroll-mt-20 border-b-4 border-[#111111] bg-[#111111] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl">
            <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#FFD600]`}>
              Section 1.4 · System Architecture & Technologies
            </p>
            <h2 className={`${FONT.display} mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-white`}>
              MODULAR, LAYERED <br />
              <span className="text-[#FFD600]">SYSTEM TOPOLOGY.</span>
            </h2>
            <p className={`${FONT.body} mt-6 text-base leading-relaxed text-white/75 sm:text-lg`}>
              PlateGuard follows a modular, layered architecture that strictly decouples video decoding, object
              detection, image enhancement, and OCR recognition. This isolation guarantees high maintainability and
              independent upgradability.
            </p>
          </div>
        </Reveal>

        {/* 4 Layers Interactive Diagram */}
        <Reveal delay={150} className="mt-14">
          <div className="rounded-2xl border-4 border-white bg-[#1a1a1a] p-6 shadow-[8px_8px_0_0_#FFD600] sm:p-10">
            <div className="flex flex-col gap-2 border-b border-white/15 pb-6">
              <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}>
                Architecture Layer Hierarchy
              </span>
              <h3 className={`${FONT.display} text-3xl sm:text-4xl text-white`}>
                THE 4 ARCHITECTURAL LAYERS
              </h3>
            </div>

            {/* Layer tabs */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LAYERS.map((layer, idx) => {
                const Icon = layer.icon;
                const isSelected = activeLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayer(layer)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? "border-[#FFD600] bg-[#FFD600] text-[#111111] shadow-[4px_4px_0_0_#ffffff]"
                        : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`${FONT.mono} text-[10px] font-bold tracking-widest`}>LAYER 0{idx + 1}</span>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className={`${FONT.tech} mt-2 text-base font-bold uppercase tracking-wider line-clamp-1`}>
                      {layer.name}
                    </h4>
                    <p className="mt-1 text-xs opacity-75 line-clamp-1">{layer.tagline}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Layer Details */}
            <div className="relative mt-8 rounded-xl border-2 border-white/20 bg-black/70 p-6 sm:p-8">
              <Rivet className="absolute left-2.5 top-2.5" />
              <Rivet className="absolute right-2.5 top-2.5" />
              <Rivet className="absolute bottom-2.5 left-2.5" />
              <Rivet className="absolute bottom-2.5 right-2.5" />

              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-7">
                  <div className="flex items-center gap-2">
                    <span className={`${FONT.mono} rounded bg-[#FFD600] px-2 py-0.5 text-xs font-bold text-[#111111]`}>
                      ACTIVE SPECIFICATION
                    </span>
                    <span className={`${FONT.mono} text-xs text-white/60`}>{activeLayer.tagline}</span>
                  </div>
                  <h4 className={`${FONT.display} mt-3 text-3xl sm:text-4xl text-white`}>
                    {activeLayer.name}
                  </h4>
                  <p className={`${FONT.body} mt-3 text-sm text-white/80 leading-relaxed sm:text-base`}>
                    {activeLayer.description}
                  </p>
                </div>

                <div className="md:col-span-5 rounded-lg border border-white/15 bg-white/5 p-4">
                  <span className={`${FONT.mono} text-xs font-bold uppercase tracking-wider text-[#FFD600] block mb-3`}>
                    Included Sub-Elements:
                  </span>
                  <ul className="space-y-2">
                    {activeLayer.elements.map((el, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-mono text-white/90">
                        <span className="text-[#FFD600]">▸</span> {el}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Table 1.2: Summary of the technology stack */}
        <Reveal delay={250} className="mt-20">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}>
                  Table 1.2 · Official Specification
                </span>
                <h3 className={`${FONT.display} mt-2 text-3xl sm:text-4xl text-white`}>
                  SUMMARY OF THE TECHNOLOGY STACK
                </h3>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {["all", "model", "computer vision", "framework", "tooling"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setTechFilter(f)}
                    className={`rounded px-3 py-1 text-xs font-mono font-bold uppercase transition-all ${
                      techFilter === f
                        ? "bg-[#FFD600] text-black"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Table */}
            <div className="mt-6 overflow-x-auto rounded-xl border-2 border-white/20 bg-white/[0.03]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/20 bg-white/10">
                    <th className={`${FONT.tech} px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                      Component
                    </th>
                    <th className={`${FONT.tech} px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                      Technology
                    </th>
                    <th className={`${FONT.tech} px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                      Purpose in PlateGuard
                    </th>
                    <th className={`${FONT.tech} px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                      Release / Spec
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {filteredTech.map((item, i) => (
                    <tr key={i} className="transition-colors hover:bg-white/[0.05]">
                      <td className={`${FONT.tech} px-5 py-4 font-bold text-white text-base tracking-wide`}>
                        {item.component}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`${FONT.mono} font-bold text-[#FFD600]`}>{item.technology}</span>
                      </td>
                      <td className={`${FONT.body} px-5 py-4 text-white/80`}>{item.purpose}</td>
                      <td className="px-5 py-4">
                        <span className="rounded border border-white/20 bg-white/5 px-2 py-0.5 text-xs font-mono text-white/70">
                          {item.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`${FONT.mono} mt-3 text-xs text-white/50 text-right`}>
              Table 1.2: Summary of the technology stack (Source: PlateGuard System Specification)
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
