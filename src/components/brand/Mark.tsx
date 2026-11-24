import { useId } from "react";
import { CHEVRON_PATH, MARK_PATHS, MARK_VIEWBOX } from "@/lib/logo";

export function Mark({
  className,
  frame = true,
  draw = false,
}: {
  className?: string;
  frame?: boolean;
  /** Plays the one-time assemble animation (pure CSS). */
  draw?: boolean;
}) {
  const id = useId();
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      data-draw={draw || undefined}
      aria-hidden
      focusable="false"
    >
      {frame && (
        <>
          <defs>
            <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8B54FF" />
              <stop offset=".5" stopColor="#4A84B4" />
              <stop offset="1" stopColor="#00C06A" />
            </linearGradient>
          </defs>
          <rect
            className="mark-frame"
            x={22}
            y={46}
            width={1874}
            height={1826}
            rx={185}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={37}
            pathLength={1}
          />
        </>
      )}
      <g fill="currentColor">
        <path className="mark-piece mark-piece-1" d={MARK_PATHS.arcTop} />
        <path className="mark-piece mark-piece-2" d={MARK_PATHS.chevron} />
        <path className="mark-piece mark-piece-3" d={MARK_PATHS.leg} />
        <path className="mark-piece mark-piece-4" d={MARK_PATHS.arcSide} />
      </g>
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <path d={CHEVRON_PATH} fill="currentColor" />
    </svg>
  );
}
