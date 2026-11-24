"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export type Ball = {
  /** Position in %, from the left and the top of the section. */
  x: number;
  y: number;
  /** CSS length. */
  size: string;
  color: string;
  /** Pixels travelled while the section crosses the screen. */
  drift: number;
};

function Dot({ ball, index }: { ball: Ball; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [ball.drift, -ball.drift]);
  return (
    <span
      ref={ref}
      className="absolute"
      style={{ left: `${ball.x}%`, top: `${ball.y}%`, width: ball.size, height: ball.size }}
    >
      <motion.span className="block h-full w-full motion-reduce:!transform-none" style={{ y }}>
        <span
          className="hover-float block h-full w-full rounded-full"
          style={{ background: ball.color, animationDelay: `${index * -1.7}s` }}
        />
      </motion.span>
    </span>
  );
}

/** The brand's flat circles, drifting at different speeds. Decoration only. */
export default function Balls({ items }: { items: Ball[] }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {items.map((ball, i) => (
        <Dot key={i} ball={ball} index={i} />
      ))}
    </div>
  );
}
