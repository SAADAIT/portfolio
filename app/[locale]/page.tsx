import { setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { CursorGlow } from "@/components/ui/cursor-glow";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        {/* Part 3: Projects, Skills, Education, Languages, Contact */}
      </main>
      <Footer />
    </>
  );
}