import { useState } from "react";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import { FONT } from "../../constants/ui";
import Reveal from "../Reveal";

const OBJECTIVES = [
  {
    n: "01",
    title: "Automated Video-Based ANPR System",
    text: "Develop an automated, video-based number plate detection and recognition system.",
    category: "System",
    milestone: "End-to-End Pipeline Ingestion",
  },
  {
    n: "02",
    title: "YOLO Plate Localisation",
    text: "Detect registration plate regions in video frames using a YOLO object detector.",
    category: "Detection",
    milestone: "High IoU Bounding Box Accuracy",
  },
  {
    n: "03",
    title: "Bounding-Box Region Extraction",
    text: "Extract each detected plate region from the frame using its bounding-box coordinates.",
    category: "Detection",
    milestone: "Full-Resolution Coordinate Slicing",
  },
  {
    n: "04",
    title: "Adaptive Image Preprocessing",
    text: "Apply suitable image preprocessing to prepare plate crops for OCR.",
    category: "Preprocessing",
    milestone: "CLAHE Contrast & Bilateral Denoising",
  },
  {
    n: "05",
    title: "PaddleOCR Multi-Layout Character Recognition",
    text: "Recognise registration characters with PaddleOCR on plates of different layouts, with particular attention to Indian plates.",
    category: "Recognition",
    milestone: "Robust Indian Registration Parsing",
  },
  {
    n: "06",
    title: "OCR Confidence Score Retention",
    text: "Extract and retain the OCR confidence score for every recognised plate.",
    category: "Recognition",
    milestone: "Per-Plate & Per-Character Confidence",
  },
  {
    n: "07",
    title: "Zero-Manual Video Processing",
    text: "Process recorded traffic videos automatically, without manual frame selection.",
    category: "System",
    milestone: "Continuous Automated Frame Pipeline",
  },
  {
    n: "08",
    title: "Sound Evaluation Protocol",
    text: "Define a sound evaluation protocol for plate detection, character recognition and end-to-end video processing.",
    category: "Evaluation",
    milestone: "Rigorous Precision, Recall & CER Metrics",
  },
  {
    n: "09",
    title: "Structured Output Presentation",
    text: "Present the recognised registration numbers and their confidence scores in a clear, structured output.",
    category: "Evaluation",
    milestone: "Real-Time Dashboard & JSON/CSV Export",
  },
];

export default function ProjectObjectivesSection() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "System", "Detection", "Preprocessing", "Recognition", "Evaluation"];

  const filtered =
    filter === "All" ? OBJECTIVES : OBJECTIVES.filter((obj) => obj.category === filter);

  return (
    <section id="objectives" className="scroll-mt-20 border-b-4 border-[#111111] bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl">
            <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#111111]/60`}>
              Section 1.5 · Mission & Scope
            </p>
            <h2 className={`${FONT.display} mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-[#111111]`}>
              OBJECTIVES OF <br />
              <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-3 pb-1 pt-2 shadow-[6px_6px_0_0_#111111]">
                THE PROJECT.
              </span>
            </h2>
            <p className={`${FONT.body} mt-6 text-base leading-relaxed text-[#111111]/80 sm:text-lg`}>
              The nine core research and engineering milestones defined for PlateGuard to deliver an automated,
              robust, and scalable number plate recognition platform.
            </p>
          </div>
        </Reveal>

        {/* Filter categories */}
        <Reveal delay={100} className="mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${FONT.mono} mr-2 text-xs font-bold uppercase text-[#111111]/60 flex items-center gap-1`}>
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filter by Area:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-md border-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                  filter === cat
                    ? "border-[#111111] bg-[#FFD600] text-[#111111] shadow-[2px_2px_0_0_#111111]"
                    : "border-[#111111]/20 bg-white text-[#111111]/70 hover:border-[#111111]"
                }`}
              >
                {cat} {cat === "All" ? `(${OBJECTIVES.length})` : `(${OBJECTIVES.filter((o) => o.category === cat).length})`}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Objectives Grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((obj, idx) => (
            <Reveal key={obj.n} delay={idx * 60}>
              <div className="group h-full rounded-2xl border-4 border-[#111111] bg-white p-6 shadow-[5px_5px_0_0_#111111] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD600] hover:shadow-[8px_8px_0_0_#111111] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`${FONT.mono} text-sm font-bold tracking-[0.25em] text-[#111111]/50 group-hover:text-[#111111]`}
                    >
                      OBJECTIVE {obj.n}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                        obj.category === "Detection"
                          ? "bg-blue-100 text-blue-800"
                          : obj.category === "Recognition"
                          ? "bg-purple-100 text-purple-800"
                          : obj.category === "Preprocessing"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-black/10 text-black/80"
                      }`}
                    >
                      {obj.category}
                    </span>
                  </div>

                  <h3 className={`${FONT.tech} mt-4 text-xl font-bold uppercase tracking-wider text-[#111111]`}>
                    {obj.title}
                  </h3>

                  <p className={`${FONT.body} mt-3 text-sm text-[#111111]/80 leading-relaxed group-hover:text-[#111111]`}>
                    {obj.text}
                  </p>
                </div>

                <div className="mt-6 border-t-2 border-[#111111]/10 pt-4 flex items-center justify-between text-xs font-mono text-[#111111]/70 group-hover:text-[#111111]">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#111111]" /> {obj.milestone}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
