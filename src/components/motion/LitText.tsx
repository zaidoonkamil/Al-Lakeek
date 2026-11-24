"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Word({
  text,
  range,
  progress,
}: {
  text: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.span className="motion-reduce:!opacity-100" style={{ opacity }}>
      {text}{" "}
    </motion.span>
  );
}

/** A paragraph whose words light up as it is scrolled through. */
export default function LitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.trim().split(/\s+/);
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          text={word}
          progress={scrollYProgress}
          range={[(i / words.length) * 0.92, Math.min(1, (i + 3) / words.length)]}
        />
      ))}
    </p>
  );
}
