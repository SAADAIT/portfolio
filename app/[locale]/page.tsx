import { setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Skills />
        {/* Part 2: Projects, Journey, Hobbies, Contact */}
      </main>
    </>
  );
}