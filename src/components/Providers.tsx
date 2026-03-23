"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "./ui/sonner";
import { env } from "../env";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <GoogleReCaptchaProvider 
        reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        {children}
      </GoogleReCaptchaProvider>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
