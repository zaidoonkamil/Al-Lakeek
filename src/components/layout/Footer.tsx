"use client";

import type { PointerEvent } from "react";
import Container from "./Container";
import LogoTile from "../brand/LogoTile";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Container className="flex flex-col gap-10 pt-16 lg:flex-row lg:items-center lg:justify-between">
        <a href="#top" className="logo-link flex items-center gap-4">
          <LogoTile className="h-14 w-14" />
          <span className="font-display text-2xl font-bold">{SITE.name}</span>
        </a>
        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="روابط سريعة">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="bg-[linear-gradient(90deg,var(--teal),var(--yellow))] bg-[length:0%_2px] bg-[position:100%_100%] bg-no-repeat pb-1 text-white/75 transition-[background-size,color] duration-500 hover:bg-[length:100%_2px] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>

      {/* Wordmark that lights up under the pointer */}
      <div
        onPointerMove={onMove}
        className="group relative mt-10 select-none overflow-hidden text-center font-display text-[26vw] font-extrabold leading-[1.35] lg:text-[21vw]"
        aria-hidden
      >
        <span className="text-[#251d55]">{SITE.name}</span>
        <span
          className="absolute inset-0 bg-[linear-gradient(90deg,var(--teal),var(--yellow)_40%,var(--coral)_70%,#a874ff)] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            maskImage: "radial-gradient(22vw circle at var(--mx,50%) var(--my,50%), #000, transparent)",
            WebkitMaskImage: "radial-gradient(22vw circle at var(--mx,50%) var(--my,50%), #000, transparent)",
          }}
        >
          {SITE.name}
        </span>
      </div>

      <Container className="relative flex flex-col gap-2 border-t border-white/10 py-7 text-sm text-white/60 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.
        </p>
        <p>شركة مسجلة رسمياً في دائرة تسجيل الشركات</p>
      </Container>
    </footer>
  );
}
