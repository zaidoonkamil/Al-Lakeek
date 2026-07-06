import Image from "next/image";
import { MapPin, Mail, HeadphonesIcon } from "lucide-react";
import Container from "./Container";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-neutral-300">
      <div className="h-[2px] w-full brand-gradient-animated" />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob-delay pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl"
      />

      <Container className="relative grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
              <Image
                src="/images/logo.png"
                alt={SITE.name}
                fill
                sizes="44px"
                className="object-contain p-1"
              />
            </div>
            <span className="text-lg font-extrabold text-white">
              {SITE.name}
            </span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-neutral-400">
            {SITE.description}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-white">روابط سريعة</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative inline-flex text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 h-px w-0 brand-gradient transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-white">تواصل معنا</h4>
          <ul className="space-y-4">
            <li className="group flex items-start gap-3 text-sm text-neutral-400">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-green transition-transform group-hover:scale-110" />
              <span>{SITE.location.full}</span>
            </li>
            <li className="group flex items-center gap-3 text-sm text-neutral-400">
              <HeadphonesIcon size={18} className="shrink-0 text-brand-green transition-transform group-hover:scale-110" />
              <span>التواصل من داخل التطبيق - الدعم الفني</span>
            </li>
            <li className="group flex items-center gap-3 text-sm text-neutral-400">
              <Mail size={18} className="shrink-0 text-brand-green transition-transform group-hover:scale-110" />
              <span dir="ltr">{SITE.email}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.</p>
          <p>شركة مسجلة رسمياً في دائرة تسجيل الشركات </p>
        </Container>
      </div>
    </footer>
  );
}
