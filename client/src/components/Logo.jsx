import { ROUTES } from "../constants/routes";
import { FONT } from "../constants/ui";

/**
 * DeepPlate logo: a miniature number plate.
 * Black "country strip" on the left, yellow plate body.
 */
export default function Logo({ className = "" }) {
  return (
    <a
      href={ROUTES.home}
      aria-label="DeepPlate home"
      className={`group inline-flex items-stretch rounded-md border-2 border-white bg-[#FFD600] text-[#111111] shadow-[0_0_0_2px_#111111] transition-transform duration-200 hover:-rotate-1 hover:scale-105 ${className}`}
    >
      <span
        className={`${FONT.mono} flex w-7 flex-col items-center justify-center gap-0.5 rounded-l-[4px] bg-[#111111] text-[9px] font-bold leading-none tracking-widest text-[#FFD600]`}
      >
        <span className="h-1.5 w-1.5 rounded-full border border-[#FFD600]" />
        DP
      </span>
      <span className="flex items-center px-3 py-1">
        <span className={`${FONT.display} text-2xl leading-none tracking-[0.12em] sm:text-[1.7rem]`}>
          DEEP<span className="text-white [-webkit-text-stroke:1.5px_#111111]">PLATE</span>
        </span>
      </span>
    </a>
  );
}
