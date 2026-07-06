import Image from "next/image";
import { Play, Star } from "lucide-react";
import Container from "../layout/Container";
import { SITE } from "@/lib/constants";

export default function AppCTA() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-brand-navy px-8 py-16 sm:px-16">
          <div className="dot-grid-light noise-fade pointer-events-none absolute inset-0 opacity-30" />
          <div
            aria-hidden
            className="animate-blob pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-purple/25 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-blob-delay pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-green/25 blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-right">
              <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white lg:mx-0">
                <Star size={14} className="animate-icon-pop fill-brand-green text-brand-green" />
                متوفر الآن على Google Play
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
                حمّل تطبيق {SITE.name} وابدأ استثمارك اليوم
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-neutral-300 lg:mx-0">
                إدارة كاملة  من قبل شركة اللكيك، انضمام لمجتمع اللكيك، ومتابعة غرف
                باقاتك، كل ذلك من هاتفك في أي وقت ومكان.
              </p>
              <a
                href={SITE.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-brand-navy shadow-xl transition-transform hover:-translate-y-0.5 hover:scale-105"
              >
                <Play size={20} className="fill-brand-navy" />
                <span>
                  حمّل التطبيق من
                  <br className="hidden sm:block" /> Google Play
                </span>
              </a>
            </div>

            <div className="animate-float relative mx-auto flex h-56 w-56 items-center justify-center rounded-[2rem] bg-white/5 ring-1 ring-white/10 backdrop-blur">
              <div className="absolute inset-0 rounded-[2rem] brand-gradient opacity-20 blur-2xl" />
              <div className="relative h-32 w-32">
                <Image
                  src="/images/logo.png"
                  alt={SITE.name}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
