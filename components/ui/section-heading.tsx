import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl sm:mb-16", className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden className="bg-accent-gradient h-px w-10" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}