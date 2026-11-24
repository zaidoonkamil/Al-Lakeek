"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "right" | "left" | "scale";

/**
 * Entrance on scroll. The server HTML is always visible: an element is hidden
 * only by this effect, and only while it is still below the fold, so a page
 * without JS, a crawler or a full-page capture never ends up blank.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.rv = "wait";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.rv = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-rv-kind={variant}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
