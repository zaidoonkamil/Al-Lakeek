"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

/** Pulls its child slightly toward a mouse pointer. */
export default function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.span
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - box.left - box.width / 2) * strength);
        y.set((event.clientY - box.top - box.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
