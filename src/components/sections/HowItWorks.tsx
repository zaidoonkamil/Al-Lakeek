"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Container from "../layout/Container";
import Balls from "../motion/Balls";
import Reveal from "../motion/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { CHEVRON_PATH } from "@/lib/logo";
import { STEPS } from "@/lib/constants";

// Runs right to left (forward), one rise and fall per pair of steps.
const PATH =
  "M1150 70 C1060 70 1040 150 930 150 S 760 50 660 50 S 480 150 380 150 S 190 60 50 60";
const COLORS = ["bg-violet-2 text-white", "bg-coral text-ink", "bg-yellow text-ink", "bg-teal text-ink"];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const along = useTransform(p, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Balls
        items={[
          { x: -8, y: -12, size: "clamp(200px, 30vw, 480px)", color: "var(--lav)", drift: 40 },
          { x: 30, y: 12, size: "clamp(22px, 3vw, 46px)", color: "var(--teal)", drift: 120 },
        ]}
      />
      <Container className="relative">
        <SectionHeading
          tag="كيف تبدأ"
          title="ابدأ رحلتك معنا"
          accent="في أربع خطوات بسيطة"
          description="رحلتك الاستثمارية مع اللكيك تبدأ بخطوات واضحة وسهلة، من التحميل حتى متابعة الأرباح."
        />

        <div ref={ref} className="relative mt-16 lg:mt-20">
          <svg viewBox="0 0 1200 200" className="hidden w-full overflow-visible lg:block" aria-hidden>
            <defs>
              <linearGradient id="road" x1="1" x2="0">
                <stop offset="0" stopColor="#7C3AED" />
                <stop offset=".35" stopColor="#FF7A59" />
                <stop offset=".68" stopColor="#FFC93C" />
                <stop offset="1" stopColor="#2DD4A4" />
              </linearGradient>
            </defs>
            <path d={PATH} fill="none" stroke="#EDE6FB" strokeWidth="16" strokeLinecap="round" />
            <motion.path
              d={PATH}
              fill="none"
              stroke="url(#road)"
              strokeWidth="16"
              strokeLinecap="round"
              style={{ pathLength: p }}
            />
            <motion.g
              style={{ offsetPath: `path("${PATH}")`, offsetDistance: along, offsetRotate: "auto 180deg" }}
            >
              <circle r="34" fill="#18123C" />
              <path d={CHEVRON_PATH} fill="#fff" transform="translate(-12 -11) scale(.22)" />
            </motion.g>
          </svg>

          {/* Phone: the same road, upright */}
          <div className="absolute inset-y-4 right-[27px] w-1.5 rounded-full bg-lav lg:hidden" aria-hidden>
            <motion.div
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,var(--violet-2),var(--coral),var(--yellow),var(--teal))]"
              style={{ scaleY: p }}
            />
          </div>

          <ol className="grid gap-10 lg:mt-6 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative ps-20 lg:ps-0">
                <Reveal delay={i * 120}>
                  <span
                    className={`absolute right-0 top-0 grid h-[60px] w-[60px] place-items-center rounded-full border-[6px] border-white font-display text-xl font-bold lg:static lg:h-16 lg:w-16 lg:border-0 ${COLORS[i]}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="pt-2 font-display text-2xl font-bold lg:mt-5 lg:pt-0">{step.title}</h3>
                  <p className="mt-3 leading-8 text-muted">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
