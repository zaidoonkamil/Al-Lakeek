import Magnetic from "../motion/Magnetic";
import { SITE } from "@/lib/constants";

function GooglePlay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 2.6v18.8L13.4 12z" fill="#00a0ff" />
      <path d="M16.7 8.7 5.6 2.3 13.4 12z" fill="#00d95f" />
      <path d="M16.7 15.3 13.4 12 5.6 21.7z" fill="#ff3a44" />
      <path d="m20.6 10.9-3.9-2.2L13.4 12l3.3 3.3 3.9-2.2c1.2-.7 1.2-1.5 0-2.2z" fill="#ffd400" />
    </svg>
  );
}

function Apple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.37 12.76c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.89 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.88-1.28 1.24-2.52 1.26-2.59-.03-.01-2.41-.93-2.43-3.67zM14.08 6.02c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27z" />
    </svg>
  );
}

const STORES = [
  { href: SITE.appStoreUrl, small: "حمّله من", name: "App Store", icon: Apple },
  { href: SITE.playStoreUrl, small: "حمّله من", name: "Google Play", icon: GooglePlay },
];

/** Both store badges. `tone` matches the surface they sit on. */
export default function StoreButtons({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {STORES.map(({ href, small, name, icon: Icon }) => (
        <Magnetic key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${small} ${name}`}
            className={`btn gap-3 py-2.5 ps-5 pe-6 ${tone === "dark" ? "btn-dark" : "btn-light"}`}
          >
            <Icon className="h-7 w-7 shrink-0" />
            <span className="flex flex-col items-start leading-tight" dir="ltr">
              <span className="text-[11px] font-medium opacity-75" dir="rtl">
                {small}
              </span>
              <span className="text-[17px] font-bold">{name}</span>
            </span>
          </a>
        </Magnetic>
      ))}
    </div>
  );
}
