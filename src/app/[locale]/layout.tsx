import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "../../components/Providers";
import { env } from "../../env";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GlobalErrorLogger } from "../../components/GlobalErrorLogger";
import { dictionaries } from "../../dictionaries";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = dictionaries[locale as keyof typeof dictionaries] || dictionaries["en-US"];
  const baseUrl = env.SITE_URL;

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "pt-BR": `${baseUrl}/pt-BR`,
        "en-US": `${baseUrl}/en-US`,
        "x-default": `${baseUrl}/en-US`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale || "pt-BR"} suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalErrorLogger />
        <Providers>
          {children}
        </Providers>
        
        {env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
