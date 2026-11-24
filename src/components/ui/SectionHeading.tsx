import Reveal from "../motion/Reveal";

type Tone = "light" | "violet" | "inherit";

const ACCENT: Record<Tone, string> = {
  light: "text-violet-2",
  violet: "text-yellow",
  inherit: "",
};
const TAG: Record<Tone, string> = {
  light: "bg-violet-2 text-white",
  violet: "bg-white text-violet",
  inherit: "bg-ink text-white",
};
const BODY: Record<Tone, string> = {
  light: "text-muted",
  violet: "text-white/85",
  inherit: "opacity-85",
};

/** Pill, two-tone title, one line of text: the heading used across the posts. */
export default function SectionHeading({
  tag,
  title,
  accent,
  description,
  tone = "light",
  center = false,
}: {
  tag: string;
  title: string;
  accent: string;
  description: string;
  tone?: Tone;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`inline-block rounded-full px-5 py-1.5 text-[15px] font-bold ${TAG[tone]}`}>{tag}</p>
      <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.4] text-balance sm:text-[3.4rem] sm:leading-[1.35]">
        {title} <span className={ACCENT[tone]}>{accent}</span>
      </h2>
      <p className={`mt-4 text-lg leading-9 ${BODY[tone]}`}>{description}</p>
    </Reveal>
  );
}
