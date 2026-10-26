"use client";

import { Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navSections, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Nav");
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Header background + reset of the active link at the very top
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY < 120) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: the section crossing the middle of the viewport is active
  useEffect(() => {
    const elements = navSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const cvLink = (
    <a
      href={siteConfig.cvPath}
      download={siteConfig.cvFileName}
      aria-label={t("downloadCv")}
      className={buttonStyles("primary", "px-4 py-2")}
    >
      <Download aria-hidden className="size-4" />
      <span className="hidden xl:inline">{t("downloadCv")}</span>
      <span className="xl:hidden">{t("cvShort")}</span>
    </a>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-border bg-background/70 backdrop-blur-xl"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a
          href="#main"
          aria-label={t("home")}
          className="font-display text-xl font-semibold tracking-tight"
        >
          <span className="text-gradient">SAB</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label={t("mainNav")} className="hidden items-center gap-1 lg:flex">
          {navSections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "relative isolate rounded-full px-3 py-1.5 text-sm transition-colors",
                active === id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          {cvLink}
        </div>

        {/* Animated burger */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="glass inline-flex size-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
        >
          <span
            className={cn(
              "block h-0.5 w-5 rounded bg-current transition-transform duration-300",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded bg-current transition-opacity duration-300",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded bg-current transition-transform duration-300",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label={t("mobileNav")}
              className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-6"
            >
              {navSections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className={cn(
                    "font-display rounded-lg py-2 text-3xl font-semibold tracking-tight transition-colors",
                    active === id ? "text-gradient" : "text-foreground",
                  )}
                >
                  {t(id)}
                </a>
              ))}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LocaleSwitcher />
                <ThemeToggle />
                {cvLink}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}