import { ImageUp, ScanSearch, BadgeCheck } from "lucide-react";
import DetectCTA from "./DetectCTA";
import Reveal from "./Reveal";
import { FONT } from "../constants/ui";

const STEPS = [
  { n: "01", icon: ImageUp, title: "Upload", text: "Choose a photo of any vehicle." },
  { n: "02", icon: ScanSearch, title: "Analyse", text: "DeepPlate scans the image." },
  { n: "03", icon: BadgeCheck, title: "Discover", text: "See if a registration plate is present." },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-x-clip bg-white bg-[radial-gradient(rgba(17,17,17,0.12)_1px,transparent_1px)] bg-[length:22px_22px]"
    >
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:pt-28">
        {/* Label */}
        <Reveal>
          <p
            className={`${FONT.mono} inline-flex items-center gap-3 rounded-sm border-2 border-[#111111] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#111111] sm:text-xs`}
          >
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FFD600] ring-2 ring-[#111111]" />
            AI-Powered Number Plate Recognition
          </p>
        </Reveal>

        {/* Heading */}
        <h1 className={`${FONT.display} mt-8 text-[clamp(2.9rem,12.5vw,11.5rem)] leading-[0.86] text-[#111111]`}>
          <Reveal as="span" delay={100} className="block">
            YOUR PLATE.
          </Reveal>
          <Reveal as="span" delay={250} className="mt-2 block">
            <span className="inline-block -rotate-1 rounded-md border-4 border-[#111111] bg-[#FFD600] px-2 pb-1 pt-2 shadow-[6px_6px_0_0_#111111] sm:px-5 sm:shadow-[8px_8px_0_0_#111111]">
              OUR PRECISION.
            </span>
          </Reveal>
        </h1>

        {/* Supporting text */}
        <Reveal delay={400}>
          <p className={`${FONT.body} mt-12 max-w-2xl text-lg leading-relaxed text-[#111111]/75 sm:text-xl`}>
            Smart number plate detection. Upload an image, let DeepPlate analyse it, and discover
            whether it contains a vehicle registration plate.
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal delay={500} className="mt-16 sm:mt-20">
          <DetectCTA />
        </Reveal>

        {/* How it works */}
        <div id="how-it-works" className="mt-24 scroll-mt-20 sm:mt-32">
          <Reveal>
            <h3 className={`${FONT.display} text-3xl tracking-wider text-[#111111] sm:text-4xl`}>
              HOW IT WORKS
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ n, icon: Icon, title, text }, i) => (
              <Reveal key={n} delay={i * 120}>
                <div className="group h-full rounded-xl border-4 border-[#111111] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#FFD600] hover:shadow-[6px_6px_0_0_#111111]">
                  <div className="flex items-start justify-between">
                    <span
                      className={`${FONT.mono} text-sm font-bold tracking-[0.3em] text-[#111111]/60 group-hover:text-[#111111]`}
                    >
                      {n}
                    </span>
                    <Icon className="h-7 w-7 text-[#111111]" strokeWidth={1.8} />
                  </div>
                  <h4 className={`${FONT.display} mt-6 text-4xl text-[#111111]`}>{title}</h4>
                  <p className={`${FONT.body} mt-2 text-[#111111]/70 group-hover:text-[#111111]`}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}