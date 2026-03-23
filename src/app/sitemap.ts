import type { MetadataRoute } from "next";
import { i18n } from "../i18n-config";
import { env } from "../env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL;

  const routes = [""];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: i18n.locales.reduce(
        (acc, locale) => {
          acc[locale] = `${baseUrl}/${locale}${route}`;
          return acc;
        },
        {} as Record<string, string>
      ),
    },
  }));
}
