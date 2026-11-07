/** Tiny metal rivet used on plate-style frames. Pass positioning via className. */
export default function Rivet({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#bdbdbd_45%,#6b6b6b_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)] ${className}`}
    />
  );
}