"use client";

import { useEffect, useState, type RefObject } from "react";

/** True once the element has entered the viewport. */
export function useInViewOnce(ref: RefObject<Element | null>, margin = "0px 0px -12% 0px") {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return seen;
}
