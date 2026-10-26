import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("glass glow-hover rounded-card p-6", className)}>
      {children}
    </div>
  );
}