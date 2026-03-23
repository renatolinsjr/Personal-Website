import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, type Dictionary } from "../../dictionaries";
import dynamic from "next/dynamic";
import { Hero } from "../../components/Hero";
import { Navigation } from "../../components/Navigation";
import { JsonLd } from "../../components/json-ld";

const Skills = dynamic(() => import("../../components/Skills").then(mod => mod.Skills), {
  loading: () => <div className="h-96 animate-pulse bg-surface-container-low rounded-xl m-8" />,
});

const Experience = dynamic(() => import("../../components/Experience").then(mod => mod.Experience), {
  loading: () => <div className="h-96 animate-pulse bg-surface-container-low rounded-xl m-8" />,
});

const Contact = dynamic(() => import("../../components/Contact").then(mod => mod.Contact), {
  loading: () => <div className="h-96 animate-pulse bg-surface-container-low rounded-xl m-8" />,
});

import { env } from "../../env";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = env.SITE_URL;
  const dict = dictionaries[locale as keyof typeof dictionaries];
  if (!dict) return {};

  return {
    title: dict.hero.title,
    description: dict.hero.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en-US": `${baseUrl}/en-US`,
        "pt-BR": `${baseUrl}/pt-BR`,
        "x-default": `${baseUrl}/en-US`,
      },
    },
  };
}


export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "en-US" && locale !== "pt-BR") {
    notFound();
  }

  const dict: Dictionary = dictionaries[locale];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Renato Lins",
    jobTitle: "Senior Software Engineer",
    url: "https://renatolins.com",
    sameAs: [
      "https://github.com/renatolins",
      "https://linkedin.com/in/renatolins",
    ],
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Renato Lins Portfolio",
    programmingLanguage: ["TypeScript", "Next.js", "React"],
    author: {
      "@type": "Person",
      name: "Renato Lins",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <JsonLd data={[personJsonLd, softwareJsonLd]} />

      <Navigation dict={dict} />

      <main className="flex-1 w-full overflow-x-hidden">
        <Hero dict={dict} />
        <Skills dict={dict} />
        <Experience dict={dict} />
        <Contact dict={dict} />
      </main>

      <footer className="w-full py-12 px-8 bg-surface-container-low mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <p className="text-sm font-label tracking-wide uppercase text-secondary">
            {dict.footer.copy}
          </p>
          <div className="flex gap-8">
            <a className="text-secondary hover:text-primary transition-colors text-sm font-label tracking-wide uppercase opacity-80 hover:opacity-100" href="https://linkedin.com/in/renatolins" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="text-secondary hover:text-primary transition-colors text-sm font-label tracking-wide uppercase opacity-80 hover:opacity-100" href="https://github.com/renatolins" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
