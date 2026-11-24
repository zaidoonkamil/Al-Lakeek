import {
  Building2,
  FileCheck2,
  Gavel,
  MapPin,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import LogoTile from "../brand/LogoTile";
import { Mark } from "../brand/Mark";
import Container from "../layout/Container";
import Balls from "../motion/Balls";
import LitText from "../motion/LitText";
import Odometer from "../motion/Odometer";
import PointerGlow from "../motion/PointerGlow";
import Reveal from "../motion/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { ABOUT_CARDS, PURPOSES, SITE } from "@/lib/constants";

const ICONS: Record<(typeof ABOUT_CARDS)[number]["icon"], LucideIcon> = {
  building: Building2,
  file: FileCheck2,
  pin: MapPin,
  users: Users,
  gavel: Gavel,
};

const PURPOSE_STYLE = [
  { icon: Package, panel: "bg-[#fff5d6]", tile: "bg-yellow" },
  { icon: ShoppingCart, panel: "bg-[#def8ef]", tile: "bg-teal" },
];

// Six-column bento in the posts' block colours.
const BLOCKS = [
  { span: "lg:col-span-4", color: "bg-violet-2 text-white", body: "text-white/90", icon: "text-violet" },
  { span: "lg:col-span-2", color: "bg-yellow text-ink", body: "text-ink/85", icon: "text-ink" },
  { span: "lg:col-span-2", color: "bg-coral text-ink", body: "text-ink/90", icon: "text-ink" },
  { span: "lg:col-span-4", color: "bg-teal text-ink", body: "text-ink/85", icon: "text-ink" },
  { span: "lg:col-span-6", color: "bg-ink text-white", body: "text-white/80", icon: "text-violet" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Balls
        items={[
          { x: 84, y: 3, size: "clamp(180px, 26vw, 420px)", color: "var(--lav)", drift: 40 },
          { x: 7, y: 5, size: "clamp(30px, 4vw, 62px)", color: "var(--yellow)", drift: 120 },
          { x: 12, y: 33, size: "clamp(16px, 2vw, 30px)", color: "var(--coral)", drift: 160 },
        ]}
      />
      <Container className="relative">
        <SectionHeading
          tag="من نحن"
          title="نشاط الشركة"
          accent="في التسويق الإلكتروني"
          description="تعمل بشفافية كاملة ضمن أغراضها القانونية المحددة."
        />

        <LitText
          text={SITE.description}
          className="mt-14 font-display text-2xl font-semibold leading-[1.85] text-ink sm:text-4xl sm:leading-[1.75]"
        />

        <div className="mt-20 grid gap-5 lg:grid-cols-2">
          {PURPOSES.map((purpose, i) => {
            const { icon: Icon, panel, tile } = PURPOSE_STYLE[i];
            return (
              <Reveal key={purpose.label} variant={i ? "left" : "right"}>
                <div className={`group h-full rounded-[2rem] p-8 sm:p-10 ${panel}`}>
                  <span
                    className={`grid h-16 w-16 place-items-center rounded-2xl text-ink transition-transform duration-500 ease-[var(--ease)] group-hover:-rotate-12 group-hover:scale-110 ${tile}`}
                  >
                    <Icon size={29} />
                  </span>
                  <h3 className="mt-7 font-display text-2xl font-bold">{purpose.label}</h3>
                  <p className="mt-3 text-lg leading-9 text-ink/80">{purpose.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="scale" className="mt-5">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-violet px-6 py-14 text-white sm:px-14 sm:py-20">
            <span className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-white/8 sm:h-[38rem] sm:w-[38rem]" />
            <span className="absolute -left-4 -top-12 h-[14rem] w-[14rem] rounded-full bg-white/8 sm:h-[22rem] sm:w-[22rem]" />
            <span className="hover-float absolute bottom-10 left-[8%] h-14 w-14 rounded-full bg-teal sm:h-20 sm:w-20" />
            <LogoTile className="relative h-16 w-16" />
            <p className="relative mt-8 text-lg font-medium text-white/90">رأس مال الشركة بالدينار العراقي</p>
            <p className="relative mt-3 font-display text-[clamp(2.4rem,9.4vw,8rem)] font-extrabold leading-none text-yellow">
              <Odometer value={SITE.capital} />
            </p>
            <div className="relative mt-12 grid gap-4 sm:grid-cols-3">
              {[
                [SITE.sharesLabel, "نسبتها إلى رأس المال"],
                [`${SITE.location.governorate} - ${SITE.location.city}`, "مقر الشركة الرئيسي"],
                ["مسجلة رسمياً", "في دائرة تسجيل الشركات"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-white p-6 text-ink">
                  <p className="font-display text-xl font-bold">{value}</p>
                  <p className="mt-1 text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-6">
          {ABOUT_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            const block = BLOCKS[i];
            return (
              <Reveal key={card.title} delay={(i % 2) * 110} className={block.span}>
                <PointerGlow
                  className={`group h-full overflow-hidden rounded-[2rem] p-8 transition-transform duration-500 ease-[var(--ease)] hover:-translate-y-2 sm:p-10 ${block.color}`}
                >
                  <Mark
                    frame={false}
                    className="absolute -bottom-16 -left-14 w-56 opacity-10 transition-transform duration-1000 ease-[var(--ease)] group-hover:-translate-x-4 group-hover:scale-110"
                  />
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-white transition-transform duration-500 ease-[var(--ease)] group-hover:-rotate-12 group-hover:scale-110 ${block.icon}`}
                  >
                    <Icon size={25} />
                  </span>
                  <h3 className="relative mt-7 font-display text-xl font-bold leading-relaxed sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className={`relative mt-3 max-w-3xl text-[17px] leading-8 ${block.body}`}>{card.text}</p>
                </PointerGlow>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
