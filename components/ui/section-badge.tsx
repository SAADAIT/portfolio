import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionBadgeProps = {
  icon: LucideIcon;
  children: ReactNode;
};

/** Small pill above each section title, like in the reference. */
export function SectionBadge({ icon: Icon, children }: SectionBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium">
      <span
        aria-hidden
        className="bg-accent-gradient grid size-5 place-items-center rounded-md text-on-accent"
      >
        <Icon className="size-3" />
      </span>
      {children}
    </span>
  );
}