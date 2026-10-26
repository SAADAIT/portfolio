import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const icons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

export function SocialLinks({ className }: { className?: string }) {
  const t = useTranslations("Social");

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socialLinks.map(({ id, href }) => {
        const Icon = icons[id];
        const external = id !== "email";

        return (
          <li key={id}>
            <a
              href={href}
              aria-label={t(id)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="glass glow-hover inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
            >
              <Icon aria-hidden className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}