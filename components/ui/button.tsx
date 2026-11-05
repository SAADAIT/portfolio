import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Dark text on the gradient keeps the contrast above WCAG AA
  primary:
    "bg-accent-gradient text-on-accent hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_var(--glow)]",
  secondary:
    "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-accent-from/60",
  ghost: "text-muted hover:text-foreground",
};

/** Class names to style any element (a, Link, button) as a button. */
export function buttonStyles(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(base, variants[variant], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles(variant, className)} {...props} />
  );
}