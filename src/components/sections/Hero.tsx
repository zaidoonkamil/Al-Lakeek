import Image from "next/image";
import { ArrowDown, LineChart, Play, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import Container from "../layout/Container";
import { SITE, TRUST_STATS } from "@/lib/constants";

function GoldCoin({
  symbol,
  size = "h-16 w-16 text-xl",
}: {
  symbol: string;
  size?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full font-black text-amber-900 shadow-[0_10px_30px_-6px_rgba(217,119,6,0.6)] ring-4 ring-amber-200/40 ${size}`}
      style={{
        background:
          "radial-gradient(circle at 32% 28%, #fef3c7, #fbbf24 45%, #b45309 100%)",
      }}
    >
      {symbol}
    </div>
  );
}

function CashBill({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`animate-bill-sway pointer-events-none absolute z-10 hidden sm:block ${className ?? ""}`}>
      <div className="relative flex h-12 w-24 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-green via-emerald-600 to-brand-green-dark text-[11px] font-extrabold text-white shadow-xl ring-1 ring-white/20">
        <span className="absolute inset-1 rounded-md border border-dashed border-white/30" />
        {label}
      </div>
    </div>
  );
}

function PaymentCard({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute z-10 hidden sm:block ${className ?? ""}`}>
      <div className="animate-card-tilt relative h-28 w-44 rounded-2xl bg-gradient-to-br from-[#1c2540] via-brand-navy to-[#241338] p-4 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div className="h-5 w-8 rounded-[4px] bg-gradient-to-br from-amber-200 to-amber-500" />
          <div className="flex">
            <span className="h-6 w-6 rounded-full bg-brand-purple/85" />
            <span className="-ml-2.5 h-6 w-6 rounded-full bg-brand-green/85 mix-blend-screen" />
          </div>
        </div>
        <p className="mt-6 text-sm font-bold tracking-[0.2em] text-white/70">•••• 4821</p>
        <div className="mt-4 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-6 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-14 pb-24 sm:pt-20 sm:pb-32"
    >
      {/* decorative layers */}
      <div className="dot-grid noise-fade pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-brand-purple/15 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob-delay pointer-events-none absolute -bottom-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-green/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div className="animate-in text-center lg:text-right">
          <div className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-border-soft bg-white/80 px-4 py-2 text-xs font-bold text-neutral-600 shadow-sm backdrop-blur lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            شركة مسجلة رسمياً في دائرة تسجيل الشركات 
          </div>

          <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-brand-navy sm:text-6xl lg:text-[3.4rem]">
            استثمارك بأمان،
            <br />
            <span className="brand-gradient-animated bg-clip-text text-transparent">
              مستقبلك بثقة
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-600 lg:mx-0">
            {SITE.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href={SITE.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine brand-gradient inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-200 transition-transform hover:-translate-y-0.5 hover:scale-105"
            >
              <Play size={18} fill="white" />
              حمّل التطبيق الآن
            </a>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy px-7 py-3.5 text-sm font-bold text-brand-navy transition-all hover:-translate-y-0.5 hover:bg-brand-navy hover:text-white"
            >
              <TrendingUp size={18} />
              تصفح الباقات
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border border-border-soft bg-white/70 p-6 shadow-sm backdrop-blur sm:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-right">
                <div className="text-xl font-extrabold text-brand-navy sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-in delay-2 relative mx-auto flex w-full max-w-md items-center justify-center py-6">
          <div className="absolute inset-0 rounded-[2.5rem] brand-gradient opacity-25 blur-3xl" />

          {/* floating money showpiece */}
          <div className="animate-coin-drift pointer-events-none absolute -left-10 -top-8 z-10 hidden [perspective:600px] sm:block">
            <div className="animate-coin-spin">
              <GoldCoin symbol="$" />
            </div>
          </div>
          <div className="animate-coin-drift-slow pointer-events-none absolute -right-8 top-1/2 z-10 hidden [perspective:600px] sm:block">
            <div className="animate-coin-spin" style={{ animationDelay: "-1.6s" }}>
              <GoldCoin symbol="د.ع" size="h-14 w-14 text-sm" />
            </div>
          </div>
          <CashBill label="IQD" className="-bottom-6 -left-20" />
          <PaymentCard className="-bottom-14 -right-10 sm:-right-16" />
          <Sparkles
            size={16}
            className="animate-sparkle pointer-events-none absolute right-16 top-2 hidden text-brand-green sm:block"
          />
          <Sparkles
            size={12}
            className="animate-sparkle pointer-events-none absolute left-1/3 bottom-4 hidden text-brand-purple sm:block"
            style={{ animationDelay: "1.1s" }}
          />

          {/* floating badge: growth */}
          <div className="animate-float absolute -right-4 top-6 z-20 hidden items-center gap-2 rounded-2xl border border-border-soft bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green/10">
              <LineChart size={18} className="text-brand-green-dark" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-neutral-500">أداء ثابت</p>
              <p className="text-sm font-extrabold text-brand-navy">متابعة لحظية</p>
            </div>
          </div>

          {/* floating badge: trust */}
          <div className="animate-float-slower absolute -left-6 bottom-24 z-20 hidden items-center gap-2 rounded-2xl border border-border-soft bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple/10">
              <Sparkles size={18} className="text-brand-purple" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-neutral-500">شركة موثوقة</p>
              <p className="text-sm font-extrabold text-brand-navy">150M+ د.ع</p>
            </div>
          </div>

          <div className="relative z-10 w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-brand-navy p-8 shadow-2xl sm:p-10">
            <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-40" />

            <div className="relative flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">
                محفظتي
              </span>
            </div>

            <div className="relative mx-auto mt-8 h-28 w-28 rounded-3xl ring-1 ring-white/15">
              <Image
                src="/images/logo.png"
                alt={SITE.name}
                fill
                sizes="112px"
                className="object-contain p-3"
                priority
              />
            </div>

            <div className="relative mt-8 flex items-end justify-center gap-2">
              {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-3.5 rounded-full brand-gradient sm:w-4"
                  style={{ height: `${h * 0.6}px`, opacity: 0.5 + (i / 14) }}
                />
              ))}
            </div>

            <div className="relative mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white/70">رأس مال الشركة</p>
              <p className="mt-1 text-2xl font-extrabold brand-gradient-text">
                {SITE.capitalLabel}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative mt-16 hidden justify-center sm:flex">
        <a
          href="#about"
          aria-label="مرر للأسفل"
          className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-border-soft bg-white/70 text-brand-navy shadow-sm backdrop-blur"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
