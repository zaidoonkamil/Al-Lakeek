import type { CSSProperties, ReactNode } from "react";
import {
  Check,
  Gift,
  HeadphonesIcon,
  Heart,
  House,
  MessageCircle,
  Mic,
  MicOff,
  Package,
  Send,
  ShieldCheck,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { Mark } from "../brand/Mark";
import { PACKAGES } from "@/lib/constants";

/* Illustrated app screens: drawn, not captured, and without invented people. */

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const FACES = [
  "linear-gradient(135deg,#8b54ff,#c9b0ff)",
  "linear-gradient(135deg,#00c06a,#8bf0c0)",
  "linear-gradient(135deg,#4a84b4,#a8d4f5)",
  "linear-gradient(135deg,#ff8a5c,#ffd0a8)",
  "linear-gradient(135deg,#e0559b,#ffb3d7)",
  "linear-gradient(135deg,#f2b632,#ffe5a0)",
];
const Face = ({ n, className = "" }: { n: number; className?: string }) => (
  <span
    className={`block shrink-0 rounded-full ${className}`}
    style={{ backgroundImage: FACES[n % FACES.length] }}
  />
);
const Bar = ({ className = "" }: { className?: string }) => (
  <span className={`block h-2 rounded-full bg-current opacity-15 ${className}`} />
);

function Title({ children }: { children: ReactNode }) {
  return <p className="pop pb-4 text-center font-display text-[15px] font-bold">{children}</p>;
}

function Community() {
  return (
    <div className="flex h-full flex-col bg-[#f5f5fa] px-4 pt-12 text-ink">
      <Title>المجتمع</Title>
      <div className="pop flex gap-3" style={i(1)}>
        {[0, 1, 2, 3, 4].map((n) => (
          <span key={n} className="rounded-full bg-[linear-gradient(135deg,#7c3aed,#ff7a59,#ffc93c)] p-[2.5px]">
            <Face n={n} className="h-10 w-10 border-2 border-white" />
          </span>
        ))}
      </div>
      {[2, 4].map((face, n) => (
        <div key={face} className="pop mt-4 rounded-2xl bg-white p-3.5" style={i(2 + n)}>
          <div className="flex items-center gap-2.5">
            <Face n={face} className="h-8 w-8" />
            <div className="flex-1 space-y-1.5">
              <Bar className="w-20" />
              <Bar className="w-12" />
            </div>
          </div>
          <div
            className={`mt-3 rounded-xl ${n ? "h-20" : "h-32"}`}
            style={{
              backgroundImage: n
                ? "linear-gradient(120deg,#ffe9a8,#ffc93c)"
                : "linear-gradient(120deg,#7c3aed,#ff7a59 60%,#ffc93c)",
            }}
          />
          <div className="mt-3 flex items-center gap-4 text-muted">
            <Heart size={17} className={n ? "" : "heart fill-[#f0436b] text-[#f0436b]"} />
            <MessageCircle size={17} />
            <Bar className="ms-auto w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Rooms() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#7c3aed,#4c1d95)] px-4 pt-12 text-white">
      <Title>روم صوتي مباشر</Title>
      <div className="grid grid-cols-4 gap-y-4">
        {Array.from({ length: 8 }, (_, n) => {
          const talking = n === 0 || n === 2 || n === 5;
          return (
            <div key={n} className="pop flex flex-col items-center gap-2" style={i(n)}>
              <span
                className={`relative rounded-full ${talking ? "voice" : ""}`}
                style={{ "--vd": `${n * 0.27}s` } as CSSProperties}
              >
                <Face n={n} className={`h-12 w-12 ${talking ? "ring-2 ring-teal" : "opacity-70"}`} />
                <span className="absolute -bottom-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-[#3b1380]">
                  {talking ? <Mic size={11} className="text-teal" /> : <MicOff size={11} className="opacity-60" />}
                </span>
              </span>
              <Bar className="w-9" />
            </div>
          );
        })}
      </div>
      <div className="pop mt-5 flex items-center justify-center gap-1 text-teal" style={i(8)}>
        <span className="eq flex h-5 items-center gap-1">
          {Array.from({ length: 22 }, (_, n) => (
            <i key={n} style={{ animationDelay: `${n * 0.07}s` }} />
          ))}
        </span>
      </div>
      <div className="pop mt-5 flex items-center gap-3 rounded-2xl bg-white/[.08] p-3" style={i(9)}>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#f2b632,#f0436b)]">
          <Gift size={20} />
        </span>
        <div className="flex-1 space-y-2">
          <Bar className="w-24 !opacity-40" />
          <Bar className="w-16 !opacity-25" />
        </div>
      </div>
      <div className="mt-auto space-y-2.5 pb-3">
        {[60, 84, 46].map((w, n) => (
          <div key={w} className="pop flex items-center gap-2" style={i(9 + n)}>
            <Face n={n + 1} className="h-6 w-6" />
            <span className="rounded-2xl bg-white/10 px-3 py-2.5" style={{ width: `${w}%` }}>
              <Bar className="!opacity-40" />
            </span>
          </div>
        ))}
      </div>
      <div className="mb-6 flex gap-2">
        <span className="h-10 flex-1 rounded-full bg-white/10" />
        <span className="hover-float grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#f0436b,#ff8a5c)]">
          <Gift size={18} />
        </span>
      </div>
    </div>
  );
}

const TINT = { silver: "#22d3ee", gold: "#ffc93c", legend: "#7c3aed" } as const;

function PackagesScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f5f5fa] px-4 pt-12 text-ink">
      <Title>باقاتي</Title>
      <div className="space-y-3">
        {PACKAGES.map((pkg, n) => (
          <div key={pkg.key} className="pop flex items-center gap-3 rounded-2xl bg-white p-3.5" style={i(1 + n)}>
            <svg viewBox="0 0 60 60" className="h-14 w-14 -rotate-90" aria-hidden>
              <circle cx="30" cy="30" r="25" fill="none" stroke="#ececf4" strokeWidth="6" />
              <circle
                className="ring-fill"
                cx="30"
                cy="30"
                r="25"
                fill="none"
                stroke={TINT[pkg.key]}
                strokeWidth="6"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                style={{ animationDuration: `${4 + n * 1.5}s` }}
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold">{pkg.name}</p>
              <p className="mt-0.5 text-xs text-muted">{pkg.dailyPoints} نقطة يومياً</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pop mt-4 rounded-2xl bg-violet p-4 text-white" style={i(5)}>
        <p className="text-xs text-white/85">وقت جمع الباقة</p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/12">
          <span className="block h-full bg-yellow w-3/4 rounded-full" />
        </div>
      </div>
      <span className="pop mt-auto mb-7 rounded-full bg-yellow py-3 text-center text-sm font-bold text-ink" style={i(6)}>
        اجمع
      </span>
    </div>
  );
}

function Home() {
  const tiles = [
    [Users, "المجتمع", "#7c3aed"],
    [Mic, "الرومات", "#ff7a59"],
    [Package, "الباقات", "#14b88a"],
    [ShoppingBag, "المتجر", "#f2a900"],
    [Wallet, "النقاط", "#0ea5c6"],
    [HeadphonesIcon, "الدعم", "#18123c"],
  ] as const;
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-12 text-ink">
      <div className="pop relative overflow-hidden rounded-3xl bg-violet p-5 text-white">
        <Mark className="h-14 w-14" />
        <p className="mt-4 font-display text-lg font-bold">أهلاً بيك</p>
        <div className="mt-2 text-white">
          <Bar className="w-28 !opacity-30" />
        </div>
        <Mark frame={false} className="absolute -bottom-10 -left-8 w-40 text-white/[.06]" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map(([Icon, label, color], n) => (
          <div key={label} className="pop rounded-2xl bg-[#f5f5fa] px-4 py-2.5" style={i(1 + n)}>
            <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: color }}>
              <Icon size={19} />
            </span>
            <p className="mt-2 text-[13px] font-bold">{label}</p>
          </div>
        ))}
      </div>
      <div className="pop mt-auto mb-6 flex justify-around rounded-full bg-[#f5f5fa] py-3 text-muted" style={i(8)}>
        <House size={19} className="text-violet" />
        <Users size={19} />
        <Package size={19} />
        <Wallet size={19} />
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="flex h-full flex-col bg-[#def8ef] px-5 pt-12 text-ink">
      <Title>أمان وشفافية</Title>
      <div className="pop relative mx-auto mt-2 grid h-52 w-52 place-items-center" style={i(1)}>
        <span className="absolute inset-0 rounded-full border-2 border-teal/40" />
        <span className="absolute inset-6 rounded-full border-2 border-teal/70 bg-white" />
        <span className="absolute inset-x-4 h-px scan z-10 bg-[linear-gradient(90deg,transparent,#7c3aed,transparent)]" />
        <ShieldCheck size={88} strokeWidth={1.6} className="relative text-violet-2" />
      </div>
      <ul className="mt-8 space-y-3">
        {["مسجلة في دائرة تسجيل الشركات", "رأس مال 150 مليون دينار", "المقر: بابل - المسيب"].map((text, n) => (
          <li key={text} className="pop flex items-center gap-3 rounded-2xl bg-white p-3.5 text-[13px] font-medium" style={i(3 + n * 2)}>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-ink">
              <Check size={14} strokeWidth={3} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Support() {
  return (
    <div className="flex h-full flex-col bg-[#f5f5fa] px-4 pt-12 text-ink">
      <Title>الدعم الفني</Title>
      <div className="flex flex-1 flex-col gap-3">
        <p className="pop max-w-[80%] rounded-2xl rounded-tr-md bg-white p-3.5 text-[13px] leading-6" style={i(1)}>
          أهلاً، شلون نكدر نساعدك؟
        </p>
        <p className="pop max-w-[80%] self-end rounded-2xl rounded-tl-md bg-violet-2 p-3.5 text-[13px] leading-6 text-white" style={i(4)}>
          عندي سؤال عن الباقات
        </p>
        <p className="pop max-w-[80%] rounded-2xl rounded-tr-md bg-white p-3.5 text-[13px] leading-6" style={i(7)}>
          أكيد، اختار الباقة ونشرحلك كل تفاصيلها خطوة بخطوة.
        </p>
        <span className="pop dot-type flex w-16 justify-center gap-1 rounded-2xl rounded-tr-md bg-white px-4 py-4 text-muted" style={i(10)}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <span className="h-11 flex-1 rounded-full bg-white" />
        <span className="grid h-11 w-11 place-items-center rounded-full bg-coral text-ink">
          <Send size={17} className="-scale-x-100" />
        </span>
      </div>
    </div>
  );
}

export const SCREENS = [Community, Rooms, PackagesScreen, Home, Security, Support];

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-[300px] rounded-[3.2rem] bg-[linear-gradient(145deg,#4a4668,#16142a_35%,#2d2a48)] p-[3px] shadow-[0_60px_110px_-34px_rgba(24,18,60,.7)] ${className}`}
      aria-hidden
    >
      <div className="rounded-[3.05rem] bg-black p-2.5">
        <div className="relative h-[610px] overflow-hidden rounded-[2.5rem] bg-ink">
          {children}
          <span className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
