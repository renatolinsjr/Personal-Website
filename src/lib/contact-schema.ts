import * as z from "zod";

export const createContactSchema = (dict?: any) => z.object({ // eslint-disable-line @typescript-eslint/no-explicit-any
  name: z.string().min(1, dict?.contact?.form?.validation?.nameRequired || "Name is required").max(100),
  email: z.string().email(dict?.contact?.form?.validation?.emailInvalid || "Invalid email address").max(200),
  message: z.string().min(1, dict?.contact?.form?.validation?.messageRequired || "Message is required").max(5000),
  phone: z.string().max(30).optional(),
  company: z.string().optional(), // Honeypot field
  recaptchaToken: z.string().min(1, "ReCAPTCHA token is required"),
});
