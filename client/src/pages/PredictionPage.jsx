import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rivet from "../components/Rivet";
import Reveal from "../components/Reveal";
import { FONT } from "../constants/ui";
import { ROUTES } from "../constants/routes";
import {
  UploadCloud,
  ScanLine,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Sparkles,
} from "lucide-react";

// Curated presets for immediate testing
const PRESETS = [
  {
    id: "odisha",
    name: "Sample 1: Standard Plate (Odisha)",
    category: "Ideal Condition",
    plateText: "OD02AB1234",
    stateName: "Odisha (02 - Bhubaneswar)",
    series: "AB",
    seq: "1234",
    detectConf: 0.982,
    ocrConf: 0.964,
    bbox: [390, 480, 582, 538],
    charConf: [0.98, 0.97, 0.95, 0.96, 0.97, 0.96, 0.98, 0.95, 0.94, 0.96],
    carColor: "from-blue-950 to-slate-900",
    plateBg: "bg-white text-black",
  },
  {
    id: "bihar",
    name: "Sample 2: Night & Glare (Bihar)",
    category: "Low Light Condition",
    plateText: "BR01CD5678",
    stateName: "Bihar (01 - Patna)",
    series: "CD",
    seq: "5678",
    detectConf: 0.941,
    ocrConf: 0.912,
    bbox: [320, 450, 510, 508],
    charConf: [0.94, 0.92, 0.91, 0.90, 0.93, 0.91, 0.92, 0.90, 0.89, 0.91],
    carColor: "from-zinc-950 to-neutral-900",
    plateBg: "bg-white text-black",
  },
  {
    id: "maharashtra",
    name: "Sample 3: Angled Capture (Maharashtra)",
    category: "Oblique Angle",
    plateText: "MH12EF9012",
    stateName: "Maharashtra (12 - Pune)",
    series: "EF",
    seq: "9012",
    detectConf: 0.923,
    ocrConf: 0.885,
    bbox: [480, 510, 685, 575],
    charConf: [0.91, 0.89, 0.87, 0.88, 0.89, 0.88, 0.86, 0.89, 0.85, 0.88],
    carColor: "from-stone-900 to-zinc-950",
    plateBg: "bg-white text-black",
  },
  {
    id: "delhi_ev",
    name: "Sample 4: Commercial / EV (Delhi)",
    category: "Green EV Plate",
    plateText: "DL01EV4321",
    stateName: "Delhi (01 - Mall Road)",
    series: "EV",
    seq: "4321",
    detectConf: 0.967,
    ocrConf: 0.948,
    bbox: [370, 470, 560, 528],
    charConf: [0.97, 0.96, 0.94, 0.95, 0.96, 0.95, 0.96, 0.94, 0.93, 0.95],
    carColor: "from-emerald-950 to-slate-900",
    plateBg: "bg-emerald-700 text-white",
  },
];

export default function PredictionPage() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [activeFilter, setActiveFilter] = useState("enhanced"); // 'raw', 'enhanced', 'binary'
  const [confThreshold, setConfThreshold] = useState(0.5);
  const [enableClahe, setEnableClahe] = useState(true);
  const [copied, setCopied] = useState(false);
  const [customPlateInput, setCustomPlateInput] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-smooth");
    return () => root.classList.remove("scroll-smooth");
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        triggerInference();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerInference = () => {
    setIsScanning(true);
    setHasScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 1200);
  };

  const activePlate = customPlateInput.trim()
    ? {
        ...selectedPreset,
        plateText: customPlateInput.toUpperCase().replace(/\s+/g, ""),
        stateName: "Custom User Vehicle",
        ocrConf: 0.952,
        charConf: Array.from(customPlateInput.replace(/\s+/g, "")).map(() => 0.95),
      }
    : selectedPreset;

  const resultPayload = {
    model: "PlateGuard ANPR Pipeline v1.0",
    yolo_detector: {
      framework: "Ultralytics YOLO (PyTorch)",
      detection_confidence: activePlate.detectConf,
      threshold_applied: confThreshold,
      bounding_box: {
        x1: activePlate.bbox[0],
        y1: activePlate.bbox[1],
        x2: activePlate.bbox[2],
        y2: activePlate.bbox[3],
        width: activePlate.bbox[2] - activePlate.bbox[0],
        height: activePlate.bbox[3] - activePlate.bbox[1],
      },
    },
    preprocessing: {
      clahe_contrast_applied: enableClahe,
      bilateral_filter: true,
      deskew_rectification: true,
    },
    paddle_ocr: {
      recognised_plate: activePlate.plateText,
      overall_ocr_confidence: activePlate.ocrConf,
      character_count: activePlate.plateText.length,
      character_scores: activePlate.charConf,
    },
    jurisdiction: activePlate.stateName,
    inference_time_ms: 142.6,
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(resultPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${FONT.body} min-h-screen bg-white text-[#111111] antialiased`}>
      <Navbar />

      <main className="bg-white bg-[radial-gradient(rgba(17,17,17,0.12)_1px,transparent_1px)] bg-[length:22px_22px] pb-24 pt-12 sm:pb-32 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumbs & Header */}
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
                  Inference Studio
                </span>
              </div>

              <div
                className={`${FONT.mono} inline-flex items-center gap-2 rounded-sm border-2 border-[#111111] bg-[#FFD600] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] shadow-[2px_2px_0_0_#111111]`}
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#111111]" />
                PlateGuard YOLO + PaddleOCR Live Studio
              </div>
            </div>

            <div className="mt-8">
              <h1 className={`${FONT.display} text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] text-[#111111]`}>
                NUMBER PLATE <br />
                <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-3 pb-1 pt-2 shadow-[6px_6px_0_0_#111111] sm:px-5 sm:shadow-[8px_8px_0_0_#111111]">
                  DETECTION & RECOGNITION.
                </span>
              </h1>
              <p className={`${FONT.body} mt-6 max-w-2xl text-base text-[#111111]/80 sm:text-lg`}>
                Upload vehicle traffic footage or select one of our test benchmarks below. The fine-tuned YOLO model
                isolates the registration plate, applies CLAHE enhancement, and runs PaddleOCR to transcribe the text
                with confidence scoring.
              </p>
            </div>
          </Reveal>

          {/* Quick Preset Selector */}
          <Reveal delay={100} className="mt-10">
            <div className="flex flex-col gap-3">
              <span className={`${FONT.mono} text-xs font-bold uppercase tracking-[0.25em] text-[#111111]/60 flex items-center gap-1.5`}>
                <Sparkles className="h-3.5 w-3.5 text-[#111111]" /> Select Benchmark Test Case:
              </span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PRESETS.map((p) => {
                  const isSelected = !uploadedImage && selectedPreset.id === p.id && !customPlateInput;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setUploadedImage(null);
                        setCustomPlateInput("");
                        setSelectedPreset(p);
                        triggerInference();
                      }}
                      className={`rounded-xl border-2 p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-[#111111] bg-[#111111] text-white shadow-[4px_4px_0_0_#FFD600]"
                          : "border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111] hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`${FONT.mono} text-[10px] uppercase font-bold tracking-wider opacity-60`}>
                          {p.category}
                        </span>
                        <span className={`text-[11px] font-mono font-bold ${isSelected ? "text-[#FFD600]" : "text-[#111111]"}`}>
                          {(p.ocrConf * 100).toFixed(0)}% Conf
                        </span>
                      </div>
                      <div className={`${FONT.display} mt-2 text-2xl tracking-wider`}>{p.plateText}</div>
                      <div className="text-[11px] font-mono opacity-70 truncate">{p.stateName}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Main Interactive Studio Grid */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Image Canvas & Upload Dropzone */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative rounded-2xl border-4 border-[#111111] bg-[#111111] p-5 text-white shadow-[8px_8px_0_0_#FFD600]">
                <Rivet className="absolute left-2.5 top-2.5" />
                <Rivet className="absolute right-2.5 top-2.5" />
                <Rivet className="absolute bottom-2.5 left-2.5" />
                <Rivet className="absolute bottom-2.5 right-2.5" />

                {/* Viewport Topbar */}
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${isScanning ? "bg-amber-400 animate-ping" : "bg-green-400"}`} />
                    <span className={`${FONT.mono} text-xs font-bold uppercase tracking-wider text-white/80`}>
                      {isScanning ? "INFERENCE IN PROGRESS..." : "INSPECTION VIEWPORT"}
                    </span>
                  </div>
                  <span className={`${FONT.mono} text-xs text-[#FFD600]`}>
                    YOLO BOUNDING BOX OVERLAY
                  </span>
                </div>

                {/* Simulated Vehicle Frame Screen */}
                <div className="relative my-4 aspect-video overflow-hidden rounded-xl border-2 border-white/20 bg-black flex items-center justify-center">
                  {/* Background vehicle representation */}
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded vehicle"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-b ${activePlate.carColor} flex flex-col justify-between p-6`}>
                      <div className="flex justify-between text-[11px] font-mono text-white/50">
                        <span>CAMERA: CAM_02_NH_HIGHWAY</span>
                        <span>RES: 1920 × 1080 @ 30FPS</span>
                      </div>

                      {/* Stylized Vehicle Silhouette */}
                      <div className="my-auto flex flex-col items-center">
                        <div className="relative h-28 w-64 rounded-t-3xl border-2 border-white/20 bg-white/5 flex flex-col items-center justify-center shadow-inner">
                          <span className="text-[10px] font-mono text-white/30">WINDSHIELD & CABIN</span>
                          {/* Front grille */}
                          <div className="absolute -bottom-8 h-14 w-80 rounded-lg border-2 border-white/30 bg-black/80 flex items-center justify-center">
                            {/* Realistic plate mounted on vehicle */}
                            <div className="relative">
                              <div
                                className={`rounded border-2 border-black ${activePlate.plateBg} px-3 py-1 text-xs font-mono font-bold tracking-widest shadow-md flex items-center gap-1.5`}
                              >
                                <span className="bg-blue-700 text-white text-[8px] px-1 py-0.2 rounded">IND</span>
                                <span>{activePlate.plateText}</span>
                              </div>

                              {/* Bounding box animation */}
                              {hasScanned && (
                                <div className="absolute -inset-1.5 rounded border-2 border-[#FFD600] bg-[#FFD600]/15 shadow-[0_0_12px_rgba(255,214,0,0.8)] pointer-events-none">
                                  <span className="absolute -top-5 left-0 rounded bg-[#FFD600] px-1.5 py-0.5 text-[9px] font-mono font-bold text-black whitespace-nowrap">
                                    PLATE: {(activePlate.detectConf * 100).toFixed(1)}%
                                  </span>
                                  {/* Corner brackets */}
                                  <span className="absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-[#FFD600]" />
                                  <span className="absolute -right-1 -top-1 h-2 w-2 border-r-2 border-t-2 border-[#FFD600]" />
                                  <span className="absolute -left-1 -bottom-1 h-2 w-2 border-l-2 border-b-2 border-[#FFD600]" />
                                  <span className="absolute -right-1 -bottom-1 h-2 w-2 border-r-2 border-b-2 border-[#FFD600]" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] font-mono text-white/50">
                        <span>TIMESTAMP: 00:04.180</span>
                        <span>LATENCY: 142ms</span>
                      </div>
                    </div>
                  )}

                  {/* Scanning beam effect */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-[#FFD600] shadow-[0_0_20px_4px_#FFD600] animate-[bounce_1.2s_infinite]" />
                  )}
                </div>

                {/* Upload & Run Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`${FONT.tech} inline-flex items-center gap-2 rounded-md border-2 border-white/30 bg-white/10 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-[#FFD600] hover:bg-[#FFD600] hover:text-black`}
                    >
                      <UploadCloud className="h-4 w-4" /> Upload Custom Vehicle
                    </button>

                    {uploadedImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedImage(null);
                          setSelectedPreset(PRESETS[0]);
                          triggerInference();
                        }}
                        className={`${FONT.tech} inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-2 text-xs font-bold uppercase text-white/70 hover:text-white`}
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Reset
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={triggerInference}
                    disabled={isScanning}
                    className={`${FONT.tech} inline-flex items-center gap-2 rounded-md bg-[#FFD600] px-6 py-2.5 text-base font-bold uppercase tracking-wider text-black shadow-[4px_4px_0_0_#ffffff] transition-all hover:bg-white disabled:opacity-50`}
                  >
                    <ScanLine className="h-4 w-4" /> {isScanning ? "Processing..." : "Run AI Inference"}
                  </button>
                </div>
              </div>

              {/* Adjustable Pipeline Parameters */}
              <div className="rounded-xl border-2 border-[#111111] bg-white p-5 shadow-[4px_4px_0_0_#111111]">
                <div className="flex items-center justify-between">
                  <span className={`${FONT.mono} text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5`}>
                    <Sliders className="h-4 w-4" /> Hyperparameter Tuning
                  </span>
                  <span className={`${FONT.mono} text-xs text-[#111111]/60`}>Pipeline Controls</span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="flex justify-between text-xs font-mono">
                      <span>YOLO Confidence Threshold (τ):</span>
                      <span className="font-bold text-[#111111]">{confThreshold.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.25"
                      max="0.95"
                      step="0.05"
                      value={confThreshold}
                      onChange={(e) => setConfThreshold(parseFloat(e.target.value))}
                      className="mt-2 w-full accent-[#111111]"
                    />
                    <span className="text-[10px] text-[#111111]/60 block mt-1">
                      Filters low-confidence spurious background detections.
                    </span>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono">CLAHE Contrast Enhancement:</span>
                      <input
                        type="checkbox"
                        checked={enableClahe}
                        onChange={(e) => setEnableClahe(e.target.checked)}
                        className="h-4 w-4 accent-[#111111] rounded"
                      />
                    </div>
                    <span className="text-[10px] text-[#111111]/60 mt-1">
                      Adaptive histogram equalization restores text in shadows and glare.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: OCR Results & Inspection */}
            <div className="lg:col-span-5 space-y-6">
              {/* Embossed Plate & Recognition Badge */}
              <div className="rounded-2xl border-4 border-[#111111] bg-white p-6 shadow-[8px_8px_0_0_#111111]">
                <div className="flex items-center justify-between border-b-2 border-[#111111]/10 pb-4">
                  <span className={`${FONT.mono} text-xs font-bold uppercase tracking-wider text-[#111111]/60`}>
                    Inference Result
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-green-100 text-green-800 px-2 py-0.5 text-xs font-mono font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> High Confidence
                  </span>
                </div>

                {/* Authentic Embossed Indian HSRP Plate */}
                <div className="my-6 flex justify-center">
                  <div className="relative inline-flex items-center rounded-lg border-4 border-black bg-white px-5 py-3 shadow-[6px_6px_0_0_#FFD600]">
                    {/* Blue IND Strip with flag & hologram */}
                    <div className="mr-3 flex flex-col items-center justify-center rounded bg-blue-700 px-2 py-1 text-white">
                      <span className="text-[10px] leading-none">🇮🇳</span>
                      <span className={`${FONT.mono} text-[10px] font-bold tracking-widest mt-0.5`}>IND</span>
                    </div>

                    {/* Bold Alphanumeric Plate Text */}
                    <span className={`${FONT.display} text-4xl tracking-[0.18em] text-[#111111] sm:text-5xl select-all font-black`}>
                      {activePlate.plateText}
                    </span>
                  </div>
                </div>

                {/* Aggregate Confidence Gauge */}
                <div className="rounded-xl border-2 border-[#111111] bg-[#111111] p-4 text-white">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/70">PADDLEOCR AGGREGATE SCORE</span>
                    <span className={`${FONT.display} text-2xl text-[#FFD600]`}>
                      {(activePlate.ocrConf * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#FFD600] rounded-full transition-all duration-700"
                      style={{ width: `${activePlate.ocrConf * 100}%` }}
                    />
                  </div>
                </div>

                {/* Per-Character Confidence Scores */}
                <div className="mt-4">
                  <span className={`${FONT.mono} text-[11px] font-bold uppercase tracking-wider text-[#111111]/70 block mb-2`}>
                    Character-by-Character OCR Confidence:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activePlate.plateText.split("").map((ch, idx) => {
                      const score = activePlate.charConf[idx] || 0.95;
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center rounded border border-[#111111]/20 bg-black/5 px-2 py-1 text-center font-mono"
                        >
                          <span className="text-sm font-bold text-[#111111]">{ch}</span>
                          <span className="text-[9px] text-green-700 font-bold">
                            {(score * 100).toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Metadata Breakdown */}
                <div className="mt-6 border-t-2 border-[#111111]/10 pt-4 space-y-2 text-xs font-mono text-[#111111]/80">
                  <div className="flex justify-between">
                    <span className="text-[#111111]/60">State / Region:</span>
                    <span className="font-bold text-[#111111]">{activePlate.stateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#111111]/60">YOLO Detection BBox:</span>
                    <span className="font-bold text-[#111111]">
                      [{activePlate.bbox.join(", ")}]
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#111111]/60">Inference Latency:</span>
                    <span className="font-bold text-green-700">~142.6 ms</span>
                  </div>
                </div>
              </div>

              {/* Crop & Preprocessing Visualizer */}
              <div className="rounded-2xl border-4 border-[#111111] bg-white p-5 shadow-[4px_4px_0_0_#111111]">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3">
                  <span className={`${FONT.mono} text-xs font-bold uppercase tracking-wider text-[#111111]`}>
                    ROI Crop & Preprocessing
                  </span>
                  <div className="flex gap-1">
                    {["raw", "enhanced"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setActiveFilter(f)}
                        className={`rounded px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase transition-all ${
                          activeFilter === f
                            ? "bg-[#111111] text-white"
                            : "bg-black/5 text-black/60 hover:bg-black/10"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center p-3 rounded-xl border-2 border-dashed border-[#111111]/20 bg-zinc-900 text-white">
                  {activeFilter === "raw" ? (
                    <div className="h-10 w-48 rounded bg-zinc-700/80 flex items-center justify-center font-mono text-xs text-white/50 blur-[0.4px]">
                      {activePlate.plateText}
                    </div>
                  ) : (
                    <div className="h-10 w-48 rounded bg-black flex items-center justify-center font-mono text-sm font-bold tracking-widest text-[#FFD600] border border-[#FFD600]">
                      {activePlate.plateText}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-[11px] font-mono text-[#111111]/60 text-center">
                  {activeFilter === "raw"
                    ? "Raw crop before enhancement (lower contrast)"
                    : "Enhanced crop with CLAHE contrast & bilateral noise reduction"}
                </p>
              </div>

              {/* JSON Payload & Export Button */}
              <div className="relative rounded-2xl border-4 border-[#111111] bg-[#111111] p-5 text-white shadow-[4px_4px_0_0_#FFD600]">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${FONT.mono} text-xs font-bold uppercase tracking-wider text-[#FFD600]`}>
                    Exportable JSON Output
                  </span>
                  <button
                    type="button"
                    onClick={copyJSON}
                    className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 text-xs font-mono text-white/80 hover:bg-white/20 transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy Payload"}
                  </button>
                </div>
                <pre className="max-h-40 overflow-y-auto text-[11px] font-mono text-green-400 bg-black/60 p-3 rounded-lg leading-relaxed">
                  {JSON.stringify(resultPayload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
