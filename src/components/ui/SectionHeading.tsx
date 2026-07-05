export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <div className={`flex items-center gap-2 ${center ? "justify-center" : ""}`}>
          <span className="h-1.5 w-1.5 rounded-full brand-gradient animate-pulse-glow" />
          <span className="brand-gradient-text text-sm font-extrabold tracking-wide">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="mt-3 text-3xl font-extrabold text-brand-navy sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-8 text-neutral-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
