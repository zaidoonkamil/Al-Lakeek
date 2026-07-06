import {
  HeadphonesIcon,
  MessagesSquare,
  PackageOpen,
  ShieldCheck,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import { FEATURES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Users,
  MessagesSquare,
  PackageOpen,
  Smartphone,
  ShieldCheck,
  HeadphonesIcon,
};

export default function Features() {
  return (
    <section id="features" className="section-pad relative overflow-hidden bg-[#fbfaf8]">
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-green/5 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob-delay pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-brand-purple/5 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="مزايا المنصة"
          title="كل ما تحتاجه لاستثمار ناجح"
          description="يقدم خدمات التواصل، مجتمع تفاعلي،   النقاط، الباقات، والمتاجر الإلكترونية.
توفر المتاجر الإلكترونية داخل التطبيق شراء النقاط والباقات والخدمات عبر القنوات الرسمية فقط."
        />

        <div className="reveal-stagger mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <div
                key={feature.title}
                className="glow-card tilt-hover group relative overflow-hidden rounded-2xl border border-border-soft bg-white p-8 transition-shadow hover:shadow-2xl hover:shadow-purple-100"
              >
                <span className="pointer-events-none absolute -left-4 -top-6 text-7xl font-black text-neutral-50 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="animate-icon-pop relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy transition-colors duration-300 group-hover:brand-gradient"
                  style={{ animationDelay: `${(i % 3) * 0.4}s` }}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="relative mt-6 text-xl font-bold text-brand-navy">
                  {feature.title}
                </h3>
                <p className="relative mt-3 text-sm leading-7 text-neutral-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
