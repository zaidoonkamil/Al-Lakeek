"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Chevron } from "../brand/Mark";
import { Phone, SCREENS } from "../features/Screens";
import Container from "../layout/Container";
import StoreButtons from "../ui/StoreButtons";
import { SITE } from "@/lib/constants";

function Sweep({ progress, range, color }: { progress: MotionValue<number>; range: [number, number]; color: string }) {
  // Edge of the chevron, from just off the right side to past the left one.
  const edge = useTransform(progress, range, [125, -30]);
  const clipPath = useTransform(
    edge,
    (e) => `polygon(${e}% 50%, ${e + 26}% 0%, 130% 0%, 130% 100%, ${e + 26}% 100%)`
  );
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 motion-reduce:hidden"
      style={{ clipPath, backgroundColor: color }}
    />
  );
}

/**
 * Screen-sized chevrons drive forward across the section, one colour after
 * another. Navy text reads on all three, so it never depends on the sweep.
 */
export default function AppCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });
  const phoneY = useTransform(p, [0, 1], [130, -130]);
  const phoneRotate = useTransform(p, [0, 1], [-12, 5]);
  const Screen = SCREENS[3];

  return (
    <section ref={ref} id="download" className="relative overflow-hidden bg-yellow py-24 text-ink sm:py-32 lg:py-0">
      <Sweep progress={p} range={[0.1, 0.42]} color="var(--coral)" />
      <Sweep progress={p} range={[0.24, 0.56]} color="var(--teal)" />
      <Container className="relative grid items-center gap-14 lg:min-h-[46rem] lg:grid-cols-[1.25fr_1fr]">
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.4] text-balance sm:text-6xl sm:leading-[1.35]">
            حمّل تطبيق {SITE.name} وابدأ استثمارك اليوم
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium leading-9">
            إدارة كاملة من قبل شركة اللكيك، انضمام لمجتمع اللكيك، ومتابعة باقاتك، كل ذلك من هاتفك في أي وقت ومكان.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <StoreButtons tone="dark" />
            <span className="nudge flex gap-1.5" aria-hidden>
              <Chevron className="h-5 w-5" />
              <Chevron className="h-5 w-5" />
              <Chevron className="h-5 w-5" />
            </span>
          </div>
        </div>

        <motion.div
          className="hidden justify-center motion-reduce:!transform-none lg:flex"
          style={{ y: phoneY, rotate: phoneRotate }}
        >
          <Phone>
            <div className="screen absolute inset-0" data-on="true">
              <Screen />
            </div>
          </Phone>
        </motion.div>
      </Container>
    </section>
  );
}
