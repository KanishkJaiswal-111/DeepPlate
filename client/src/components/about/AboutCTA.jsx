import { ArrowRight, Sparkles, UploadCloud } from "lucide-react";
import { FONT } from "../../constants/ui";
import { ROUTES } from "../../constants/routes";
import Rivet from "../Rivet";
import Reveal from "../Reveal";

export default function AboutCTA() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-4 border-[#111111] bg-[#111111] p-8 text-white shadow-[12px_12px_0_0_#FFD600] sm:p-14">
            <Rivet className="absolute left-4 top-4" />
            <Rivet className="absolute right-4 top-4" />
            <Rivet className="absolute bottom-4 left-4" />
            <Rivet className="absolute bottom-4 right-4" />

            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8">
                <span
                  className={`${FONT.mono} inline-flex items-center gap-2 rounded-sm border border-[#FFD600] bg-[#FFD600]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600]`}
                >
                  <Sparkles className="h-3.5 w-3.5" /> Next Steps
                </span>
                <h2 className={`${FONT.display} mt-4 text-4xl leading-[0.95] text-white sm:text-6xl lg:text-7xl`}>
                  EXPERIENCE THE <br />
                  <span className="text-[#FFD600]">PRECISION FIRSTHAND.</span>
                </h2>
                <p className={`${FONT.body} mt-6 max-w-2xl text-base text-white/75 sm:text-lg`}>
                  Now that you understand the 5-stage architecture, the two-step decomposition, and how PlateGuard
                  handles difficult traffic footage, try the detection system yourself or review the codebase.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={ROUTES.demo}
                    className={`${FONT.tech} inline-flex items-center gap-3 rounded-md bg-[#FFD600] px-8 py-4 text-lg font-bold uppercase tracking-[0.16em] text-[#111111] shadow-[6px_6px_0_0_#ffffff] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#ffffff]`}
                  >
                    Start Number Plate Detection
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href={ROUTES.home}
                    className={`${FONT.tech} inline-flex items-center gap-2 rounded-md border-2 border-white/30 bg-white/10 px-6 py-4 text-base font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#111111]`}
                  >
                    Return to Homepage
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="rounded-2xl border-2 border-white/20 bg-white/5 p-6 text-center w-full max-w-xs">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFD600] text-[#111111]">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <h3 className={`${FONT.tech} mt-4 text-xl font-bold uppercase tracking-wider text-white`}>
                    Instant Inference
                  </h3>
                  <p className="mt-2 text-xs text-white/60">
                    Upload vehicle images and let the model detect plates, extract crops, and score OCR confidence.
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <span className={`${FONT.mono} text-[11px] text-[#FFD600] block`}>
                      DEPLOYED VIA FASTAPI / FLASK
                    </span>
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
