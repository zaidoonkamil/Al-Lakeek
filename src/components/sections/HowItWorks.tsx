import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import { STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad relative overflow-hidden bg-white">
      <div className="dot-grid noise-fade pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative">
        <SectionHeading
          eyebrow="كيف تبدأ"
          title="ابدأ رحلتك معنا  في اربع خطوات بسيطة"
          description="رحلتك الاستثمارية مع اللكيك تبدأ بخطوات واضحة وسهلة، من التحميل حتى متابعة الأرباح."
        />

        <div className="reveal-stagger relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="absolute top-8 hidden h-0.5 w-full overflow-hidden rounded-full bg-neutral-100 lg:block">
            <div className="relative h-full w-full brand-gradient-animated">
              <span className="animate-dash-travel absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="group relative flex flex-col items-center text-center lg:items-start lg:text-right"
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl brand-gradient text-xl font-extrabold text-white shadow-lg shadow-purple-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
