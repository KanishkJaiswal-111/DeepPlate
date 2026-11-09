import { useState } from "react";
import { Copy, Check, Table, Code, Eye } from "lucide-react";
import { FONT } from "../../constants/ui";
import Reveal from "../Reveal";

const SAMPLES = [
  {
    text: "OD02AB1234",
    confidence: 0.96,
    state: "Odisha (02 - Bhubaneswar)",
    series: "AB",
    seq: "1234",
    frame: 128,
    timestamp: "00:04.266",
    bbox: [412, 520, 604, 578],
    charConf: [0.98, 0.97, 0.95, 0.96, 0.97, 0.96, 0.98, 0.95, 0.94, 0.96],
  },
  {
    text: "BR01CD5678",
    confidence: 0.91,
    state: "Bihar (01 - Patna)",
    series: "CD",
    seq: "5678",
    frame: 245,
    timestamp: "00:08.166",
    bbox: [320, 480, 510, 542],
    charConf: [0.94, 0.92, 0.91, 0.90, 0.93, 0.91, 0.92, 0.90, 0.89, 0.91],
  },
  {
    text: "MH12EF9012",
    confidence: 0.88,
    state: "Maharashtra (12 - Pune)",
    series: "EF",
    seq: "9012",
    frame: 412,
    timestamp: "00:13.733",
    bbox: [510, 600, 715, 665],
    charConf: [0.91, 0.89, 0.87, 0.88, 0.89, 0.88, 0.86, 0.89, 0.85, 0.88],
  },
];

export default function OutputInspectorSection() {
  const [selectedPlate, setSelectedPlate] = useState(SAMPLES[0]);
  const [viewMode, setViewMode] = useState("plate"); // 'plate', 'table', 'json'
  const [customInput, setCustomInput] = useState("");
  const [copied, setCopied] = useState(false);

  // If user typed custom input, compute mock parsing
  const displayPlate = customInput.trim()
    ? {
        text: customInput.toUpperCase().replace(/\s+/g, ""),
        confidence: 0.94,
        state: "Custom Vehicle Registration",
        series: customInput.slice(4, 6) || "--",
        seq: customInput.slice(6) || "----",
        frame: 101,
        timestamp: "00:03.366",
        bbox: [380, 490, 590, 550],
        charConf: Array.from(customInput.replace(/\s+/g, "")).map(() => 0.94),
      }
    : selectedPlate;

  const jsonPayload = {
    system: "PlateGuard ANPR Engine",
    version: "1.0.0",
    inference: {
      number_plate_text: displayPlate.text,
      ocr_confidence: displayPlate.confidence,
      detection_confidence: 0.972,
      frame_index: displayPlate.frame,
      timestamp: displayPlate.timestamp,
      bounding_box: {
        x1: displayPlate.bbox[0],
        y1: displayPlate.bbox[1],
        x2: displayPlate.bbox[2],
        y2: displayPlate.bbox[3],
      },
      metadata: {
        jurisdiction: displayPlate.state,
        character_count: displayPlate.text.length,
      },
    },
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="outputs" className="scroll-mt-20 border-b-4 border-[#111111] bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl">
            <p className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.3em] text-[#111111]/60`}>
              Table 1.1 · Output Specification
            </p>
            <h2 className={`${FONT.display} mt-3 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-[#111111]`}>
              RECOGNISED PLATE & <br />
              <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-3 pb-1 pt-2 shadow-[6px_6px_0_0_#111111]">
                OCR CONFIDENCE SCORE.
              </span>
            </h2>
            <p className={`${FONT.body} mt-6 text-base leading-relaxed text-[#111111]/80 sm:text-lg`}>
              The final output of PlateGuard for every detected plate is a pair consisting of the recognised plate text
              and its OCR confidence score. The values in Table 1.1 are illustrative samples from the system design
              specification, showing how output records are structured.
            </p>
          </div>
        </Reveal>

        {/* Interactive Explorer Container */}
        <Reveal delay={150} className="mt-14">
          <div className="rounded-2xl border-4 border-[#111111] bg-[#111111] p-6 text-white shadow-[8px_8px_0_0_#FFD600] sm:p-10">
            {/* View Mode Switcher & Sample Selector */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/15 pb-6">
              <div>
                <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}>
                  Output Format Inspector
                </span>
                <h3 className={`${FONT.display} mt-1 text-2xl sm:text-3xl text-white`}>
                  TABLE 1.1 ILLUSTRATIVE SAMPLES
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: "plate", label: "Embossed Plate View", icon: Eye },
                  { id: "table", label: "Table 1.1 View", icon: Table },
                  { id: "json", label: "JSON Record", icon: Code },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setViewMode(mode.id)}
                      className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                        viewMode === mode.id
                          ? "bg-[#FFD600] text-black shadow-[2px_2px_0_0_#ffffff]"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sample Selector Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={`${FONT.mono} text-xs text-white/60`}>Select Sample:</span>
              {SAMPLES.map((s) => (
                <button
                  key={s.text}
                  type="button"
                  onClick={() => {
                    setCustomInput("");
                    setSelectedPlate(s);
                  }}
                  className={`rounded-lg border-2 px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                    !customInput && selectedPlate.text === s.text
                      ? "border-[#FFD600] bg-[#FFD600] text-[#111111] shadow-[2px_2px_0_0_#ffffff]"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40"
                  }`}
                >
                  {s.text} ({s.confidence})
                </button>
              ))}

              {/* Custom Plate Simulator Input */}
              <div className="ml-auto flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Test custom plate (e.g. DL01AB9999)..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="rounded border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-mono text-white placeholder-white/40 focus:border-[#FFD600] focus:outline-none"
                  maxLength={10}
                />
              </div>
            </div>

            {/* View Mode: Embossed Plate View */}
            {viewMode === "plate" && (
              <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
                {/* Plate Badge Illustration */}
                <div className="md:col-span-7 flex flex-col items-center justify-center rounded-xl border-2 border-white/20 bg-black/70 p-6 sm:p-10">
                  {/* Authentic Indian Plate Component */}
                  <div className="relative inline-flex items-center rounded-lg border-4 border-black bg-white px-5 py-3 shadow-[8px_8px_0_0_#FFD600]">
                    {/* Blue IND Strip */}
                    <div className="mr-4 flex flex-col items-center justify-center rounded bg-blue-700 px-2 py-1 text-white">
                      <span className="text-[10px] leading-none">🇮🇳</span>
                      <span className={`${FONT.mono} text-[10px] font-bold tracking-widest mt-0.5`}>IND</span>
                    </div>

                    {/* Registration Text */}
                    <span
                      className={`${FONT.display} text-5xl tracking-[0.18em] text-[#111111] sm:text-6xl select-all font-black`}
                    >
                      {displayPlate.text}
                    </span>
                  </div>

                  {/* Character breakdown tags */}
                  <div className="mt-6 flex flex-wrap justify-center gap-1.5 text-[10px] font-mono">
                    {displayPlate.text.split("").map((char, cIdx) => (
                      <span
                        key={cIdx}
                        className="rounded border border-white/20 bg-white/10 px-2 py-1 text-white/80"
                        title={`Confidence: ${(displayPlate.charConf[cIdx] || 0.95) * 100}%`}
                      >
                        <span className="font-bold text-[#FFD600]">{char}</span>:{" "}
                        {((displayPlate.charConf[cIdx] || 0.95) * 100).toFixed(0)}%
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score & Metadata Card */}
                <div className="md:col-span-5 rounded-xl border border-white/15 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <span className={`${FONT.mono} text-xs uppercase tracking-wider text-white/60`}>
                      OCR Confidence
                    </span>
                    <span className="rounded bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 text-xs font-mono font-bold">
                      VERIFIED MATCH
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className={`${FONT.display} text-6xl text-[#FFD600]`}>
                      {(displayPlate.confidence * 100).toFixed(0)}%
                    </span>
                    <span className={`${FONT.mono} text-sm text-white/60`}>({displayPlate.confidence})</span>
                  </div>

                  {/* Meter bar */}
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#FFD600] rounded-full transition-all duration-500"
                      style={{ width: `${displayPlate.confidence * 100}%` }}
                    />
                  </div>

                  <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-white/70">
                    <div className="flex justify-between">
                      <span>Jurisdiction:</span>
                      <span className="text-white font-bold">{displayPlate.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Video Timestamp:</span>
                      <span className="text-[#FFD600]">{displayPlate.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frame Index:</span>
                      <span className="text-white">#{displayPlate.frame}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YOLO Bounding Box:</span>
                      <span className="text-white">[{displayPlate.bbox.join(", ")}]</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Mode: Table 1.1 View */}
            {viewMode === "table" && (
              <div className="mt-8 overflow-x-auto rounded-xl border-2 border-white/20 bg-white/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-white/20 bg-white/10">
                      <th className={`${FONT.tech} px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                        Number Plate Text
                      </th>
                      <th className={`${FONT.tech} px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                        OCR Confidence
                      </th>
                      <th className={`${FONT.tech} px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                        Confidence Bar
                      </th>
                      <th className={`${FONT.tech} px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD600]`}>
                        Registration Authority
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {SAMPLES.map((s) => (
                      <tr
                        key={s.text}
                        onClick={() => setSelectedPlate(s)}
                        className={`cursor-pointer transition-colors ${
                          selectedPlate.text === s.text ? "bg-white/10" : "hover:bg-white/[0.05]"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className={`${FONT.mono} text-lg font-bold text-white tracking-widest`}>
                            {s.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`${FONT.mono} text-base font-bold text-[#FFD600]`}>{s.confidence}</span>
                        </td>
                        <td className="px-6 py-4 w-44">
                          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-[#FFD600]" style={{ width: `${s.confidence * 100}%` }} />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-white/70">{s.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 text-right text-xs font-mono text-white/50 border-t border-white/10">
                  Table 1.1: Illustrative output format (sample values, not measured results)
                </div>
              </div>
            )}

            {/* View Mode: JSON Payload */}
            {viewMode === "json" && (
              <div className="relative mt-8 rounded-xl border-2 border-white/20 bg-black/80 p-5 font-mono text-xs">
                <button
                  type="button"
                  onClick={copyJSON}
                  className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded bg-white/10 px-3 py-1 text-xs text-white/80 transition-colors hover:bg-white/20"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy JSON"}
                </button>
                <pre className="overflow-x-auto text-green-400 leading-relaxed">
                  {JSON.stringify(jsonPayload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
