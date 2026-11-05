import Image from "next/image";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type ProfilePhotoProps = {
  /** contain: cut-out portrait. cover: framed photo. */
  fit?: "contain" | "cover";
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Portrait, or a monogram while no photo is configured in data/site.ts. */
export function ProfilePhoto({
  fit = "cover",
  priority = false,
  sizes = "36rem",
  className,
}: ProfilePhotoProps) {
  const t = useTranslations("Hero");

  if (!siteConfig.photo) {
    return (
      <div className={cn("grid place-items-center", className)}>
        <span className="bg-accent-gradient grid size-56 place-items-center rounded-full p-1">
          <span className="text-gradient grid size-full place-items-center rounded-full bg-surface text-6xl font-extrabold">
            {siteConfig.shortName}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={siteConfig.photo}
        alt={t("photoAlt")}
        fill
        priority={priority}
        sizes={sizes}
        className={
          fit === "contain"
            ? "object-contain object-bottom"
            : "object-cover object-top"
        }
      />
    </div>
  );
}