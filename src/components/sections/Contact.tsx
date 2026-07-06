import { HeadphonesIcon, Mail, MapPin, Navigation } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import { SITE } from "@/lib/constants";

const INFO = [
  {
    icon: MapPin,
    title: "موقعنا",
    value: SITE.location.full,
  },
  {
    icon: HeadphonesIcon,
    title: "الدعم الفني",
    value: "التواصل من داخل التطبيق - الدعم الفني",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: SITE.email,
    dir: "ltr" as const,
  },
];

const MAPS_URL = "https://maps.google.com/maps?q=Al-Musayyib%2C+Babil%2C+Iraq";

function LocationMap() {
  return (
    <div className="tilt-hover relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-border-soft bg-brand-navy p-8">
      <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-30" />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand-purple/25 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob-delay pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-brand-green/25 blur-3xl"
      />

      {/* abstract road grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="70" x2="400" y2="55" stroke="white" strokeWidth="2" />
        <line x1="0" y1="180" x2="400" y2="200" stroke="white" strokeWidth="2" />
        <line x1="0" y1="270" x2="400" y2="255" stroke="white" strokeWidth="1.5" />
        <line x1="90" y1="0" x2="70" y2="320" stroke="white" strokeWidth="2" />
        <line x1="230" y1="0" x2="250" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="330" y1="0" x2="345" y2="320" stroke="white" strokeWidth="1.5" />
      </svg>

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">
          <Navigation size={12} className="text-brand-green" />
          موقع الشركة
        </span>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>

      {/* pin marker */}
      <div className="relative flex flex-1 items-center justify-center py-8">
        <span className="absolute h-24 w-24 animate-ping rounded-full bg-brand-green/20" />
        <span className="absolute h-16 w-16 rounded-full bg-brand-green/10" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full brand-gradient shadow-xl shadow-black/30">
          <MapPin size={26} className="text-white" fill="white" fillOpacity={0.15} />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right">
        <div>
          <p className="text-lg font-extrabold text-white">
            {SITE.location.city} - {SITE.location.governorate}
          </p>
          <p className="text-xs font-medium text-white/60">{SITE.location.country}</p>
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-brand-navy shadow-lg transition-transform hover:scale-105"
        >
          <Navigation size={14} />
          افتح في خرائط Google
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-[#fbfaf8]">
      <Container>
        <SectionHeading
          eyebrow="تواصل معنا"
          title="نحن هنا لمساعدتك"
          description="لأي استفسار عن الشركة أو الباقات الاستثمارية، فريقنا في المسيب - بابل جاهز للرد عليك."
        />

        <div className="reveal-stagger mt-16 grid gap-8 lg:grid-cols-5">
          <div className="glow-card tilt-hover lg:col-span-2 flex flex-col justify-between rounded-3xl border border-border-soft bg-white p-8">
            <div className="space-y-6">
              {INFO.map((item) => (
                <div key={item.title} className="group flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl brand-gradient transition-transform group-hover:scale-110">
                    <item.icon size={20} className="text-white" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-neutral-500">
                      {item.title}
                    </p>
                    <p
                      dir={item.dir}
                      className="mt-1 text-sm font-semibold text-brand-navy"
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <LocationMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
