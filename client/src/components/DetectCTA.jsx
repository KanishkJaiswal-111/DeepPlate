import { ArrowRight, ScanLine, UploadCloud } from "lucide-react";
import Rivet from "./Rivet";
import { ROUTES } from "../constants/routes";
import { FONT } from "../constants/ui";

/** Upload-inspired illustration: a dashed drop zone whose scan line sweeps on hover. */
function UploadIllustration() {
  return (
    <div className="relative mx-auto flex h-40 w-40 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-white/40 bg-white/[0.04] transition-colors duration-300 group-hover/cta:border-[#FFD600] sm:h-48 sm:w-48">
      {/* corner brackets */}
      <span className="absolute left-2 top-2 h-5 w-5 border-l-4 border-t-4 border-[#FFD600]" />
      <span className="absolute right-2 top-2 h-5 w-5 border-r-4 border-t-4 border-[#FFD600]" />
      <span className="absolute bottom-2 left-2 h-5 w-5 border-b-4 border-l-4 border-[#FFD600]" />
      <span className="absolute bottom-2 right-2 h-5 w-5 border-b-4 border-r-4 border-[#FFD600]" />

      {/* scan line */}
      <span className="absolute inset-x-[8%] top-[12%] h-[3px] bg-[#FFD600] shadow-[0_0_14px_2px_rgba(255,214,0,0.75)] transition-all duration-[1500ms] ease-in-out group-hover/cta:top-[86%]" />

      <div className="flex flex-col items-center gap-2 text-white">
        <UploadCloud
          className="h-14 w-14 animate-pulse text-[#FFD600] sm:h-16 sm:w-16"
          strokeWidth={1.6}
        />
        <span className={`${FONT.mono} text-[10px] font-bold uppercase tracking-[0.25em] text-white/70`}>
          Drop image
        </span>
      </div>
    </div>
  );
}

export default function DetectCTA() {
  return (
    <div className="group/cta relative overflow-hidden rounded-2xl border-4 border-white bg-[#111111] p-3 shadow-[10px_10px_0_0_#FFD600] transition-transform duration-300 hover:-translate-y-1 sm:p-4">
      {/* inner plate frame */}
      <div className="relative rounded-xl border-2 border-[#FFD600] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
        <Rivet className="absolute left-3 top-3" />
        <Rivet className="absolute right-3 top-3" />
        <Rivet className="absolute bottom-3 left-3" />
        <Rivet className="absolute bottom-3 right-3" />

        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          <UploadIllustration />

          <div className="text-center md:text-left">
            <p
              className={`${FONT.mono} mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#FFD600]`}
            >
              <ScanLine className="h-4 w-4" /> Step 01
            </p>
            <h2 className={`${FONT.display} text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl`}>
              READY TO IDENTIFY A <span className="text-[#FFD600]">NUMBER PLATE?</span>
            </h2>
            <p className={`${FONT.body} mx-auto mt-4 max-w-xl text-base text-white/70 md:mx-0 md:text-lg`}>
              Upload an image and let DeepPlate do the analysis. Discover number plates with precision.
            </p>

            <a
              href={ROUTES.predict}
              className={`${FONT.tech} group mt-8 inline-flex items-center justify-center gap-3 rounded-md bg-[#FFD600] px-8 py-4 text-xl font-bold uppercase tracking-[0.18em] text-[#111111] shadow-[6px_6px_0_0_#ffffff] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#ffffff] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none sm:px-10 sm:text-2xl`}
            >
              Start Detection
              <ArrowRight
                className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}