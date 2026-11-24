"use client";

import type { PointerEvent, ReactNode } from "react";

/** Card that lights up under the pointer (CSS reads --mx / --my). */
export default function PointerGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glow ${className}`}
      onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
      }}
    >
      {children}
    </div>
  );
}
