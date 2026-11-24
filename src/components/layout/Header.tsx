"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import LogoTile from "../brand/LogoTile";
import { Chevron, Mark } from "../brand/Mark";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const line = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const before = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    if (Math.abs(y - before) > 4) setHidden(y > before && y > 500);
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-500 ease-[var(--ease)] focus-within:translate-y-0 sm:px-6 ${
          hidden && !open ? "-translate-y-[120%]" : ""
        }`}
      >
        <div
          className={`relative mx-auto flex h-16 max-w-6xl items-center justify-between overflow-hidden rounded-full pe-2.5 ps-3 transition-colors duration-500 ${
            solid && !open
              ? `bg-white text-ink ${hidden ? "" : "shadow-[0_18px_50px_-16px_rgba(24,18,60,.4)]"}`
              : "text-white"
          }`}
        >
          <a href="#top" className="logo-link flex items-center gap-3" aria-label={SITE.name}>
            <LogoTile />
            <span className="font-display text-lg font-bold">{SITE.name}</span>
          </a>

          <nav className="hidden items-center lg:flex" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
                className="relative px-4 py-2 text-[15px] font-semibold opacity-85 transition-opacity hover:opacity-100 aria-[current]:opacity-100"
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${solid ? "bg-lav" : "bg-white/15"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={SITE.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn hidden px-6 py-2.5 text-[15px] lg:inline-flex ${solid ? "btn-violet" : "btn-main"}`}
          >
            حمّل التطبيق
            <Chevron className="go" />
          </a>

          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${solid && !open ? "bg-lav" : "bg-ink/15"}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <motion.span
            className="absolute inset-x-7 bottom-0 h-[3px] origin-right rounded-full bg-[linear-gradient(270deg,var(--violet-2),var(--coral),var(--yellow),var(--teal))]"
            style={{ scaleX: line, opacity: solid ? 1 : 0 }}
            aria-hidden
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-violet px-8 text-white lg:hidden"
            initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 50%, 100% 100%, 100% 100%)" }}
            animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 50%, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Mark
              frame={false}
              className="pointer-events-none absolute -left-24 bottom-0 w-96 text-white opacity-[.07]"
            />
            <nav className="flex flex-col" aria-label="قائمة الجوال">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/20 py-4 font-display text-3xl font-bold"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                  <Chevron className="h-4 w-4 text-yellow" />
                </motion.a>
              ))}
            </nav>
            <a
              href={SITE.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-main mt-10"
            >
              حمّل التطبيق
              <Chevron className="go" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
