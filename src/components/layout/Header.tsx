"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border-soft"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div
        className="h-[2.5px] brand-gradient transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      <Container className="flex h-20 items-center justify-between">
        <Link href="#top" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-brand-navy shadow-md shadow-purple-200/60 ring-1 ring-black/5">
            <Image
              src="/images/logo.png"
              alt={SITE.name}
              fill
              sizes="44px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-brand-navy">
              {SITE.name}
            </span>
            <span className="text-[11px] font-medium text-neutral-500">
              {SITE.nameEn}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-semibold text-neutral-700 transition-colors hover:text-brand-navy"
            >
              {link.label}
              <span className="absolute -bottom-1.5 right-0 h-0.5 w-0 brand-gradient rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={SITE.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine brand-gradient inline-flex rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-200/70 transition-transform hover:scale-105"
          >
            حمّل التطبيق
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="فتح القائمة"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border-soft bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient mt-2 rounded-full px-6 py-3 text-center text-sm font-bold text-white"
            >
              حمّل التطبيق
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
