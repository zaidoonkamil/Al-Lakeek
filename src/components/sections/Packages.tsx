"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Coins, Infinity as InfinityIcon, Zap } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { Chevron, Mark } from "../brand/Mark";
import Container from "../layout/Container";
import Balls from "../motion/Balls";
import SectionHeading from "../ui/SectionHeading";
import { PACKAGES, PACKAGES_NOTE } from "@/lib/constants";

const METAL = {
  silver: {
    bg: "linear-gradient(135deg,#f4f6fa 0%,#b8c1cf 24%,#eef1f6 44%,#a3adbd 66%,#dde2ea 100%)",
    ink: "#1d2430",
    soft: "#39424f",
    cta: "#1d2430",
  },
  gold: {
    bg: "linear-gradient(135deg,#fff3c9 0%,#e2a92c 24%,#ffe9a6 46%,#c68a14 70%,#f7d372 100%)",
    ink: "#362300",
    soft: "#573b06",
    cta: "#362300",
  },
  legend: {
    bg: "linear-gradient(135deg,#8b45ff 0%,#5b21b6 28%,#a21caf 56%,#6d28d9 78%,#c026a3 100%)",
    ink: "#ffffff",
    soft: "#e6e2f7",
    cta: "#18123c",
  },
} as const;

type Pkg = (typeof PACKAGES)[number];

function FoilCard({ pkg }: { pkg: Pkg }) {
  const metal = METAL[pkg.key];
  const reduce = useReducedMotion();

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    el.dataset.live = "";
    el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 13}deg`);
    el.style.setProperty("--px", `${x * 100}%`);
    el.style.setProperty("--py", `${y * 100}%`);
    el.style.setProperty("--sheen", `${x * 100}%`);
  };
  const onLeave = (event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    delete el.dataset.live;
    for (const key of ["--ry", "--rx", "--px", "--py", "--sheen"]) el.style.removeProperty(key);
  };

  return (
    <article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="foil foil-idle flex h-full flex-col rounded-[2rem] p-8 shadow-[0_44px_80px_-38px_rgba(76,29,149,.75)] sm:p-9"
      style={{ ["--metal" as string]: metal.bg, color: metal.ink }}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-display text-2xl font-extrabold leading-relaxed">{pkg.name}</h3>
        <Mark frame={false} className="h-14 w-14 opacity-80" />
      </div>

      <p className="mt-9 font-display text-[2.6rem] font-extrabold leading-none">
        {pkg.dailyPoints}
        <span className="ms-2 font-sans text-lg font-semibold" style={{ color: metal.soft }}>
          نقطة يومياً
        </span>
      </p>

      <ul className="mt-8 flex-1 space-y-4 text-[15px] leading-7" style={{ color: metal.soft }}>
        <li className="flex gap-3">
          <Zap size={20} className="mt-1 shrink-0" />
          <span>تضاف لحسابك تلقائياً كل يوم</span>
        </li>
        <li className="flex gap-3">
          <InfinityIcon size={20} className="mt-1 shrink-0" />
          <span>
            مدة العطاء: <b style={{ color: metal.ink }}>{pkg.duration}</b>
          </span>
        </li>
        <li className="flex gap-3">
          <Coins size={20} className="mt-1 shrink-0" />
          <span>{PACKAGES_NOTE.replace(/\.$/, "")}</span>
        </li>
      </ul>

      <a
        href="#download"
        className="btn relative z-10 mt-10 text-white"
        style={{ background: metal.cta, ["--sweep" as string]: "#6d28d9" }}
      >
        فعّل الباقة عبر التطبيق
        <Chevron className="go" />
      </a>
    </article>
  );
}

/** The three cards start as one stacked deck and fan out as you scroll. */
function Dealt({ index, progress, pkg }: { index: number; progress: MotionValue<number>; pkg: Pkg }) {
  const side = 1 - index; // RTL: first card sits on the right
  const x = useTransform(progress, [0, 1], [`${side * -92}%`, "0%"]);
  const rotate = useTransform(progress, [0, 1], [side * 9, 0]);
  const y = useTransform(progress, [0, 1], [pkg.highlight ? 0 : 46, pkg.highlight ? -22 : 0]);
  return (
    <motion.div
      className={`relative hidden motion-reduce:!transform-none lg:block ${pkg.highlight ? "z-10" : ""}`}
      style={{ x, rotate, y }}
    >
      {pkg.highlight && <Badge />}
      <FoilCard pkg={pkg} />
    </motion.div>
  );
}

function Badge() {
  return (
    <span className="absolute -top-4 right-9 z-20 rounded-full bg-coral px-5 py-2 text-sm font-bold text-ink shadow-lg">
      الأكثر طلباً
    </span>
  );
}

export default function Packages() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.3"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });

  return (
    <section id="packages" className="relative overflow-x-clip bg-lav py-24 sm:py-32">
      <Balls
        items={[
          { x: 88, y: 4, size: "clamp(120px, 20vw, 320px)", color: "#e3d6fb", drift: 50 },
          { x: 6, y: 14, size: "clamp(40px, 5.5vw, 88px)", color: "var(--yellow)", drift: 130 },
          { x: 93, y: 84, size: "clamp(26px, 3.4vw, 54px)", color: "var(--teal)", drift: 100 },
          { x: -3, y: 70, size: "clamp(80px, 12vw, 190px)", color: "var(--coral)", drift: 70 },
        ]}
      />
      <Container className="relative">
        <SectionHeading
          center
          tag="الباقات"
          title="اختر باقة الأسهم"
          accent="المناسبة لك"
          description="كل باقة أسهم تمنحك رصيد نقاط يومي ثابت، تستطيع أن تستخدمه داخل التطبيق وفق سياسات وشروط الاستخدام."
        />

        <div ref={ref} className="mt-20 hidden grid-cols-3 gap-7 lg:grid">
          {PACKAGES.map((pkg, i) => (
            <Dealt key={pkg.key} index={i} progress={progress} pkg={pkg} />
          ))}
        </div>

        {/* Phone: cards stack over each other while scrolling */}
        <div className="mt-14 space-y-8 lg:hidden">
          {PACKAGES.map((pkg, i) => (
            <div key={pkg.key} className="sticky" style={{ top: `${88 + i * 14}px` }}>
              {pkg.highlight && <Badge />}
              <FoilCard pkg={pkg} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
