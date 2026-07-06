import { Building2, FileCheck2, Gavel, MapPin, Users, Wallet } from "lucide-react";
import Container from "../layout/Container";
import SectionHeading from "../ui/SectionHeading";
import { SITE } from "@/lib/constants";

const CARDS = [
  {
    icon: Building2,
    title: "شركة عراقية موثوقة",
    text: "اللكيك للاستثمار شركة عراقية مسجلة رسمياً، تعمل وفق الأنظمة والقوانين المحلية بكل شفافية. كما تعمل الشركة على تنظيم خدماتها التجارية والتسويقية بما ينسجم مع طبيعة نشاطها والقوانين النافذة",
    big: true,
  },
  {
    icon: FileCheck2,
    title: "مسجلة في دائرة تسجيل الشركات",
    text: "مسجلة رسمياً في دائرة تسجل الشركات، وتخضع لمتطلبات الترخيص والمتابعة القانونية.",
  },
  {
    icon: Wallet,
    title: "رأس مال 150 مليون دينار",
    text: "رأس مال يعكس قوة الشركة المالية وقدرتها على النمو والتوسع.",
  },
  {
    icon: MapPin,
    title: "مقرها بابل - المسيب",
    text: "ننطلق من قضاء المسيب لنصل بخدماتنا  لكل العراق والدول العربيه",
  },
  {
    icon: Users,
    title: "الموزعون",
    text: "يعتمد تطبيق اللكيك على موزعين معتمدين لتقديم خدمات النقاط والباقات للمستخدمين عبر القنوات الرسمية، بما يضمن تجربة آمنة وموثوقة.",
  },
  {
    icon: Gavel,
    title: "صلاحيات الشركة",
    text: "تمارس شركة اللكيك أعمالها وصلاحياتها وفق القوانين النافذة، بما يشمل إبرام العقود، وإدارة الأنشطة التجارية والتسويقية، والتعامل مع الجهات الرسمية والمصارف، وتملك الأموال اللازمة لتحقيق أهدافها.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-purple/5 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob-delay pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-green/5 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="من نحن"
          title="نشاط الشركة في التسويق الإلكتروني"
          description="تعمل الشركة في مجال التسويق الإلكتروني من خلال استثمار رؤوس الأموال في الأنشطة التسويقية، وتسويق المنتجات والسلع والبضائع عبر شبكة الإنترنت، وتقديم خدمات تساعد على تسهيل التواصل المستمر مع المستهلكين والعملاء."
        />

        <div className="mt-16 grid gap-6">
          {CARDS.filter((c) => c.big).map((card) => (
            <div
              key={card.title}
              className="reveal glow-card tilt-hover group flex flex-col items-center gap-6 rounded-2xl border border-border-soft bg-[#fbfaf8] p-8 text-center transition-shadow hover:shadow-xl hover:shadow-purple-100 sm:flex-row sm:text-right"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl brand-gradient transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <card.icon size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-navy">{card.title}</h3>
                <p className="mt-2 max-w-2xl leading-7 text-neutral-600">{card.text}</p>
              </div>
            </div>
          ))}

          <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.filter((c) => !c.big).map((card) => (
              <div
                key={card.title}
                className="glow-card tilt-hover group rounded-2xl border border-border-soft bg-[#fbfaf8] p-7 transition-shadow hover:shadow-xl hover:shadow-purple-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl brand-gradient transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <card.icon size={22} className="text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-8 overflow-hidden rounded-3xl brand-gradient-animated relative">
          <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative grid gap-8 p-10 sm:grid-cols-3 sm:p-14">
            <div className="text-center text-white sm:text-right">
              <p className="text-3xl font-extrabold sm:text-4xl">
                {SITE.capitalLabel}
              </p>
              <p className="mt-2 text-sm font-medium text-white/85">
                رأس مال الشركة
              </p>
            </div>
            <div className="text-center text-white sm:text-right">
              <p className="text-3xl font-extrabold sm:text-4xl">
                {SITE.location.governorate} - {SITE.location.city}
              </p>
              <p className="mt-2 text-sm font-medium text-white/85">
                مقر الشركة الرئيسي
              </p>
            </div>
            <div className="text-center text-white sm:text-right">
              <p className="text-3xl font-extrabold sm:text-4xl">
                مسجلة رسمياً
              </p>
              <p className="mt-2 text-sm font-medium text-white/85">
                في دائرة تسجل الشركات
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
