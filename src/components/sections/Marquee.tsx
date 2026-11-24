"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { Chevron } from "../brand/Mark";
import { MARQUEE } from "@/lib/constants";

function Row({ back = false, className }: { back?: boolean; className: string }) {
  // Two identical halves, so sliding by half loops seamlessly.
  const half = [...MARQUEE, ...MARQUEE];
  return (
    <div className={`-mx-[6vw] py-2 sm:py-3 ${className}`}>
      <div className={`marquee ${back ? "marquee-back" : ""}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {half.map((text, i) => (
              <span key={i} className="flex items-center">
                <span className="px-6 font-display text-3xl font-extrabold leading-[1.6] sm:px-9 sm:text-5xl">
                  {text}
                </span>
                <Chevron className="h-5 w-5 sm:h-7 sm:w-7" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two crossing ribbons that lean with the scroll speed. */
export default function Marquee() {
  const { scrollY } = useScroll();
  const speed = useSpring(useVelocity(scrollY), { stiffness: 260, damping: 50 });
  const skewX = useTransform(speed, [-2500, 2500], [9, -9], { clamp: true });

  return (
    <div className="relative overflow-hidden bg-white pb-8 pt-16 sm:pt-24" aria-hidden>
      <motion.div style={{ skewX }} className="motion-reduce:!transform-none">
        <Row className="-rotate-2 bg-yellow text-ink" />
        <Row back className="mt-[2.6vw] rotate-[.8deg] bg-teal text-ink" />
      </motion.div>
    </div>
  );
}
