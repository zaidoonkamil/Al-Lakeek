"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Chevron } from "../brand/Mark";
import Container from "../layout/Container";
import Reveal from "../motion/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { Phone, SCREENS } from "../features/Screens";
import { FEATURES } from "@/lib/constants";

// The room changes colour with each screen.
const STAGE = [
  { bg: "#6d28d9", fg: "#ffffff", a: "#ffc93c", b: "#8b5cf6" },
  { bg: "#ff7a59", fg: "#18123c", a: "#7c3aed", b: "#ffa58f" },
  { bg: "#ffc93c", fg: "#18123c", a: "#ff7a59", b: "#ffe08a" },
  { bg: "#22c3f0", fg: "#18123c", a: "#ffffff", b: "#7fe0fa" },
  { bg: "#2dd4a4", fg: "#18123c", a: "#6d28d9", b: "#8eecd0" },
  { bg: "#7c3aed", fg: "#ffffff", a: "#2dd4a4", b: "#a174f5" },
];

export default function Features() {
  const list = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.6", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const tilt = useTransform(progress, [0, 0.5, 1], [-9, 7, -7]);

  useEffect(() => {
    const items = list.current?.querySelectorAll("[data-feature]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.feature));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="relative overflow-x-clip py-24 transition-colors duration-700 sm:py-32"
      style={{ backgroundColor: STAGE[active].bg, color: STAGE[active].fg }}
    >
      <Container>
        <SectionHeading
          tone="inherit"
          tag="المزايا"
          title="مزايا"
          accent="التطبيق"
          description="يقدم خدمات التواصل، مجتمع تفاعلي، النقاط، الباقات، والمتاجر الإلكترونية. توفر المتاجر الإلكترونية داخل التطبيق شراء النقاط والباقات والخدمات عبر القنوات الرسمية فقط."
        />

        <div ref={list} className="relative mt-16 grid gap-x-12 lg:mt-0 lg:grid-cols-2">
          <div className="relative">
            {/* Track that fills as you read */}
            <div className="absolute inset-y-0 right-0 my-[24vh] hidden w-1 rounded-full bg-current/20 lg:block" aria-hidden>
              <motion.div
                className="h-full w-full origin-top rounded-full bg-current"
                style={{ scaleY: progress }}
              />
            </div>

            {FEATURES.map((feature, i) => {
              const Screen = SCREENS[i];
              return (
                <div
                  key={feature.title}
                  data-feature={i}
                  className="flex flex-col justify-center py-10 lg:min-h-[72vh] lg:py-0 lg:pe-4 lg:ps-12"
                >
                  <div
                    className={`transition-[opacity,transform] duration-700 ease-[var(--ease)] ${
                      active === i ? "" : "lg:translate-x-5 lg:opacity-50"
                    }`}
                  >
                    <h3 className="font-display text-3xl font-extrabold leading-snug sm:text-5xl">{feature.title}</h3>
                    <p className="mt-5 max-w-xl text-lg font-medium leading-9 opacity-90">{feature.description}</p>
                  </div>

                  <Reveal variant="scale" className="mt-10 flex justify-center [zoom:.84] lg:hidden">
                    <Phone className="max-w-full">
                      <div className="screen absolute inset-0" data-on="true">
                        <Screen />
                      </div>
                    </Phone>
                  </Reveal>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center justify-center [perspective:1400px]">
              {/* Two forward chevrons behind the phone, recoloured per screen */}
              {[
                { key: "a" as const, className: "-translate-x-[36%] w-[34rem]" },
                { key: "b" as const, className: "translate-x-[30%] w-[25rem]" },
              ].map(({ key, className }) => (
                <span
                  key={key}
                  className={`absolute transition-colors duration-700 ${className}`}
                  style={{ color: STAGE[active][key] }}
                  aria-hidden
                >
                  <Chevron className="hover-float w-full" />
                </span>
              ))}
              <motion.div style={{ rotateY: tilt, rotateZ: useTransform(tilt, (v) => v * 0.22) }}>
                <Phone>
                  {SCREENS.map((Screen, i) => (
                    <div key={i} className="screen absolute inset-0" data-on={active === i}>
                      <Screen />
                    </div>
                  ))}
                </Phone>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
