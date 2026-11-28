import type { CSSProperties } from "react";
import { Banknote, FileCheck2, HeadphonesIcon, MapPin } from "lucide-react";
import { Chevron } from "../brand/Mark";
import HeroStage from "../hero/HeroStage";
import Container from "../layout/Container";
import Balls from "../motion/Balls";
import Magnetic from "../motion/Magnetic";
import SplitWords from "../motion/SplitWords";
import StoreButtons from "../ui/StoreButtons";
import { SITE, TRUST_STATS } from "@/lib/constants";

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

const STAT_STYLE = [
  { icon: Banknote, tile: "bg-teal text-ink" },
  { icon: FileCheck2, tile: "bg-violet-2 text-white" },
  { icon: MapPin, tile: "bg-yellow text-ink" },
  { icon: HeadphonesIcon, tile: "bg-coral text-ink" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-stick flex min-h-svh flex-col overflow-hidden bg-violet text-white"
    >
      {/* Concentric circles behind the mark */}
      <div
        className="absolute left-1/2 top-[25svh] lg:left-[26%] lg:top-[46%]"
        aria-hidden
      >
        {[150, 112, 76].map((size, i) => (
          <span
            key={size}
            className="hero-ring absolute left-0 top-0 rounded-full bg-white"
            style={
              {
                width: `min(${size}vw, ${size * 1.05}svh)`,
                height: `min(${size}vw, ${size * 1.05}svh)`,
                "--o": 0.05 + i * 0.025,
                animationDelay: `${i * 0.12}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <Balls
        items={[
          { x: 97.5, y: 13, size: "clamp(56px, 7vw, 120px)", color: "var(--yellow)", drift: 0 },
          { x: 4, y: 16, size: "clamp(26px, 3.4vw, 54px)", color: "var(--teal)", drift: 110 },
          { x: 50, y: 15, size: "clamp(14px, 1.8vw, 28px)", color: "var(--coral)", drift: 0 },
        ]}
      />
      <HeroStage />

      <Container className="relative flex flex-1 items-end pb-8 pt-[49svh] lg:items-center lg:pb-6 lg:pt-28">
        <div className="lg:w-[54%]">
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.28] sm:text-6xl sm:leading-[1.25] xl:text-[4.6rem]">
            <span className="block">
              <SplitWords text="استثمارك بأمان،" />
            </span>
            <span className="block text-yellow">
              <SplitWords text="مستقبلك بثقة" start={3} />
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-base font-medium leading-8 text-white/90 sm:text-lg sm:leading-9"
            style={delay(0.65)}
          >
            {SITE.description}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(0.8)}>
            <StoreButtons />
            <Magnetic>
              <a href="#packages" className="btn btn-ghost">
                تصفح الباقات
                <Chevron className="go" />
              </a>
            </Magnetic>
          </div>
        </div>
      </Container>

      <Container className="relative pb-8 lg:pb-9">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {TRUST_STATS.map((stat, i) => {
            const { icon: Icon, tile } = STAT_STYLE[i];
            return (
              <div
                key={stat.label}
                className="rise group flex flex-col gap-3 rounded-3xl bg-white p-4 text-ink sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                style={delay(1 + i * 0.1)}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 ${tile}`}
                  aria-hidden
                >
                  <Icon size={23} />
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="mt-0.5 text-sm leading-6 text-muted">{stat.label}</dt>
                  <dd className="font-display text-lg font-bold leading-snug">{stat.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
