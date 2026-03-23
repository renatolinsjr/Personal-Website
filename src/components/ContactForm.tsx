"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type Dictionary } from "../dictionaries";
import { createContactSchema } from "@/lib/contact-schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";  
import { motion } from "framer-motion";
import { PhoneInput } from "./ui/phone-input";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";


export function ContactForm({ dict }: { dict: Dictionary }) {
  const contactSchema = createContactSchema(dict);

  type ContactFormValues = z.infer<typeof contactSchema>;

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [cooldown, setCooldown] = useState(0);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      company: "",
    },
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function onSubmit(data: ContactFormValues) {
    if (cooldown > 0) return;
    
    setIsLoading(true);
    setFormStatus({ type: null, message: null });

    try {
      if (!executeRecaptcha) {
        throw new Error("ReCAPTCHA not initialized");
      }

      const token = await executeRecaptcha("contact_form");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      });

      const result = await response.json();

      if (result.ok) {
        toast.success(dict.contact.form.success); 
        setFormStatus({
          type: "success",
          message: dict.contact.form.successDescription,
        });
        form.reset();
        setCooldown(60); // 60s cooldown
      } else {
        throw new Error(result.error || dict.contact.form.error);
      }
    } catch {
      toast.error(dict.contact.form.error);
      setFormStatus({
        type: "error",
        message: dict.contact.form.errorDescription,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      {formStatus.type && (
        <Alert variant={formStatus.type === "success" ? "success" : "destructive"} className="animate-in fade-in slide-in-from-top-1">
          {formStatus.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {formStatus.type === "success" ? dict.contact.form.success : dict.contact.form.error}
          </AlertTitle>
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}

      {/* Honeypot field - visually hidden */}
      <input 
        type="text" 
        {...form.register("company")} 
        style={{ display: "none" }} 
        tabIndex={-1} 
        autoComplete="off" 
      />

      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-label text-secondary uppercase tracking-widest">{dict.contact.form.name}</label>
        <Input id="name" placeholder={dict.contact.form.placeholders.name} {...form.register("name")} className="w-full bg-surface-container-low border-none rounded-md p-4 focus:bg-surface-container-lowest focus:ring-0 focus:border-l-4 focus:border-primary transition-all text-on-surface h-12" />
        {form.formState.errors.name && (
          <p className="text-sm text-error">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-label text-secondary uppercase tracking-widest">{dict.contact.form.email}</label>
          <Input id="email" placeholder={dict.contact.form.placeholders.email} type="email" {...form.register("email")} className="w-full bg-surface-container-low border-none rounded-md p-4 focus:bg-surface-container-lowest focus:ring-0 focus:border-l-4 focus:border-primary transition-all text-on-surface h-12" />
          {form.formState.errors.email && (
            <p className="text-sm text-error">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-label text-secondary uppercase tracking-widest">{dict.contact.form.phone}</label>
          <Controller
            name="phone"
            control={form.control}
            render={({ field }) => (
              <PhoneInput
                id="phone"
                {...field}
                defaultCountry="BR"
                className="w-full bg-surface-container-low border-none rounded-md focus-within:bg-surface-container-lowest focus-within:ring-0 focus-within:border-l-4 focus-within:border-primary transition-all text-on-surface h-12"
              />
            )}
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-error">{form.formState.errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-label text-secondary uppercase tracking-widest">{dict.contact.form.message}</label>
        <Textarea 
          id="message"
          placeholder={dict.contact.form.placeholders.message}
          className="w-full bg-surface-container-low border-none rounded-md p-4 focus:bg-surface-container-lowest focus:ring-0 focus:border-l-4 focus:border-primary transition-all text-on-surface min-h-[120px]" 
          {...form.register("message")} 
        />
        {form.formState.errors.message && (
          <p className="text-sm text-error">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || cooldown > 0}
        className="w-full kinetic-gradient py-6 rounded-md font-bold text-on-primary ambient-shadow hover:opacity-95 active:scale-[0.98] transition-all border-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {dict.contact.form.sending}...
          </>
        ) : cooldown > 0 ? (
          `${dict.contact.form.cooldown} ${cooldown}s`
        ) : (
          dict.contact.form.submit
        )}
      </Button>
    </motion.form>
  );
}

