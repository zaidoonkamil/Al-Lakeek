import { Mark } from "./Mark";

/** The logo as it appears on the company's posts: white mark on a navy tile. */
export default function LogoTile({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-[24%] bg-ink text-white ${className}`}>
      <Mark className="h-full w-full overflow-visible" />
    </span>
  );
}
