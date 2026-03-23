"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ContactForm } from "./ContactForm";
import { type Dictionary } from "../dictionaries";
import { env } from "../env";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function ContactFormWrapper({ dict }: { dict: Dictionary }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  if (!isInView) {
    return <div ref={ref} className="h-96 animate-pulse bg-surface-container-low rounded-xl" />;
  }

  return (
    <div ref={ref}>
      <GoogleReCaptchaProvider 
        reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "head",
        }}
      >
        <ContactForm dict={dict} />
      </GoogleReCaptchaProvider>
    </div>
  );
}
