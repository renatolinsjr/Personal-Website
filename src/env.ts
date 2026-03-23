import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  FORMSPREE_ENDPOINT: z.string().url(),
  SITE_URL: z.string().url().default("https://renatolins.com"),
});

const isServer = typeof window === "undefined";

const _env = envSchema.safeParse({
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || undefined,
  RECAPTCHA_SECRET_KEY: isServer ? process.env.RECAPTCHA_SECRET_KEY : "dummy",
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  FORMSPREE_ENDPOINT: isServer ? process.env.FORMSPREE_ENDPOINT : "https://dummy.com",
  SITE_URL: process.env.SITE_URL || undefined,
});

const isBuildMode = process.env.npm_lifecycle_event === "build";

if (!_env.success && !isBuildMode) {
  if (isServer) {
    console.error(
      "❌ Invalid environment variables:",
      _env.error.format()
    );
    throw new Error("Invalid environment variables");
  }
}

export const env = _env.success ? _env.data : {
  NEXT_PUBLIC_GA_ID: undefined,
  RECAPTCHA_SECRET_KEY: "",
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "",
  FORMSPREE_ENDPOINT: "",
  SITE_URL: "https://renatolins.com",
};
