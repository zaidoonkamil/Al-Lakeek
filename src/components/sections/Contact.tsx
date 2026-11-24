import { HeadphonesIcon, Mail, MapPin } from "lucide-react";
import { Chevron } from "../brand/Mark";
import IraqMap from "../contact/IraqMap";
import Container from "../layout/Container";
import Balls from "../motion/Balls";
import Reveal from "../motion/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { SITE } from "@/lib/constants";

export default function Contact() {
  const info = [
    { icon: MapPin, tile: "bg-yellow", title: "موقعنا", value: SITE.location.full, href: SITE.mapsUrl, external: true },
    { icon: HeadphonesIcon, tile: "bg-coral", title: "الدعم الفني", value: "التواصل من داخل التطبيق - الدعم الفني" },
    { icon: Mail, tile: "bg-teal", title: "البريد الإلكتروني", value: SITE.email, href: `mailto:${SITE.email}`, ltr: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-violet py-24 text-white sm:py-32">
      <Balls
        items={[
          { x: -14, y: -18, size: "clamp(360px, 66vw, 1060px)", color: "rgb(255 255 255 / .06)", drift: 30 },
          { x: -2, y: 6, size: "clamp(240px, 42vw, 680px)", color: "rgb(255 255 255 / .06)", drift: 50 },
          { x: 94, y: 70, size: "clamp(60px, 8vw, 130px)", color: "var(--yellow)", drift: 110 },
          { x: 47, y: 10, size: "clamp(18px, 2.2vw, 34px)", color: "var(--teal)", drift: 150 },
        ]}
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            tone="violet"
            tag="تواصل معنا"
            title="نحن هنا"
            accent="لمساعدتك"
            description="لأي استفسار عن الشركة أو الباقات فريقنا جاهز للرد عليك."
          />
          <ul className="mt-12">
            {info.map((item, i) => {
              const body = (
                <>
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-ink transition-transform duration-500 ease-[var(--ease)] group-hover:-rotate-12 group-hover:scale-110 ${item.tile}`}
                  >
                    <item.icon size={23} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-white/80">{item.title}</span>
                    <span
                      dir={item.ltr ? "ltr" : undefined}
                      className={`mt-1 block text-lg font-semibold ${item.ltr ? "text-right" : ""}`}
                    >
                      {item.value}
                    </span>
                  </span>
                  {item.href && (
                    <Chevron className="h-4 w-4 shrink-0 text-yellow transition-transform duration-500 group-hover:-translate-x-2" />
                  )}
                </>
              );
              const row = "group flex items-center gap-5 border-b border-white/20 py-6";
              return (
                <li key={item.title}>
                  <Reveal variant="right" delay={i * 110}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={row}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={row}>{body}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
        <IraqMap />
      </Container>
    </section>
  );
}
