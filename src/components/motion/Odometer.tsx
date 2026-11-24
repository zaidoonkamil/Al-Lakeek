"use client";

import { useRef, type CSSProperties } from "react";
import { useInViewOnce } from "./useInView";

/**
 * Rolling digits. The resting state (server HTML included) is the real number;
 * rolling only plays as an animation once it scrolls into view.
 */
export default function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInViewOnce(ref);
  return (
    <span ref={ref} dir="ltr" className={`odo ${className ?? ""}`} data-run={seen || undefined}>
      <span className="sr-only">{value}</span>
      {value.split("").map((char, i) =>
        /\d/.test(char) ? (
          <span key={i} className="odo-cell" aria-hidden>
            <span className="invisible">{char}</span>
            <span
              className="odo-strip"
              style={{ "--d": Number(char), "--i": i } as CSSProperties}
            >
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>
            {char}
          </span>
        )
      )}
    </span>
  );
}
