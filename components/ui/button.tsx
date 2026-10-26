import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_var(--accent-from)]",
  secondary: "glass glow-hover text-foreground hover:-translate-y-0.5",
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