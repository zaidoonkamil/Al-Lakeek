import { Coins, Crown, Infinity as InfinityIcon, Zap } from "lucide-react";
import clsx from "clsx";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import { PACKAGES, PACKAGES_NOTE, SITE } from "@/lib/constants";

export default function Packages() {
  return (
    <section id="packages" className="section-pad relative overflow-hidden bg-[#fbfaf8]">
      <div className="dot-grid noise-fade pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative">
        <SectionHeading
          eyebrow="باقات الأسهم"
          title="اختر باقة الأسهم المناسبة لك"
          description="كل باقة أسهم تمنحك رصيد نقاط يومي ثابت، تستطيع ان تستخدمه داخل التطبيق وفق سياسات وشروط الاستخدام."
        />

        <div className="reveal-stagger mt-16 grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={clsx(
                "relative flex flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1",
                pkg.highlight
                  ? "animate-ring-pulse brand-gradient text-white shadow-2xl shadow-purple-200/70 lg:-translate-y-5 lg:hover:-translate-y-6"
                  : "glow-card border border-border-soft bg-white"
              )}
            >
              {pkg.highlight && (
                <>
                  <div className="dot-grid-light pointer-events-none absolute inset-0 rounded-3xl opacity-30" />
                  <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-brand-purple shadow-lg">
                    <Crown size={13} className="fill-brand-purple animate-icon-pop" />
                    الأكثر طلباً
                  </span>
                </>
              )}

              <h3
                className={clsx(
                  "relative text-xl font-extrabold",
                  pkg.highlight ? "text-white" : "text-brand-navy"
                )}
              >
                {pkg.name}
              </h3>

              <div className="relative mt-6 flex items-baseline gap-2">
                <span
                  className={clsx(
                    "text-3xl font-extrabold",
                    pkg.highlight ? "text-white" : "text-brand-navy"
                  )}
                >
                  {pkg.price}
                </span>
                <span
                  className={clsx(
                    "text-sm font-semibold",
                    pkg.highlight ? "text-white/80" : "text-neutral-500"
                  )}
                >
                  نقطة
                </span>
              </div>

              <ul className="relative mt-7 flex-1 space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <span
                    className={clsx(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      pkg.highlight ? "bg-white/20" : "bg-brand-green/10"
                    )}
                  >
                    <Zap size={15} className={pkg.highlight ? "text-white" : "text-brand-green"} />
                  </span>
                  <span className={pkg.highlight ? "text-white/90" : "text-neutral-700"}>
                    تضيف{" "}
                    <b className={pkg.highlight ? "text-white" : "text-brand-navy"}>
                      {pkg.dailyPoints} نقطة
                    </b>{" "}
                    لحسابك يومياً
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span
                    className={clsx(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      pkg.highlight ? "bg-white/20" : "bg-brand-purple/10"
                    )}
                  >
                    <InfinityIcon size={15} className={pkg.highlight ? "text-white" : "text-brand-purple"} />
                  </span>
                  <span className={pkg.highlight ? "text-white/90" : "text-neutral-700"}>
                    مدة العطاء: <b className={pkg.highlight ? "text-white" : "text-brand-navy"}>{pkg.duration}</b>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span
                    className={clsx(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      pkg.highlight ? "bg-white/20" : "bg-brand-green/10"
                    )}
                  >
                    <Coins size={15} className={pkg.highlight ? "text-white" : "text-brand-green"} />
                  </span>
                  <span className={pkg.highlight ? "text-white/90" : "text-neutral-700"}>
                    يمكن للمستخدم استخدام النقاط داخل التطبيق وفق سياسات التطبيق وشروطه
                  </span>
                </li>
              </ul>

              <a
                href={SITE.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "btn-shine relative mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-105",
                  pkg.highlight
                    ? "bg-white text-brand-purple"
                    : "brand-gradient text-white"
                )}
              >
                فعّل الباقة عبر التطبيق
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500">
          * {PACKAGES_NOTE}
        </p>
      </Container>
    </section>
  );
}
