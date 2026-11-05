import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  badge: string;
  icon: LucideIcon;
  /** Use <span className="text-gradient"> around the highlighted words. */
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  id,
  badge,
  icon,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <SectionBadge icon={icon}>{badge}</SectionBadge>
      <h2 id={id} className="mt-5 text-4xl font-extrabold sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}