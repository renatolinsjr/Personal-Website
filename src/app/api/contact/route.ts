import { NextResponse } from "next/server";
import { createContactSchema } from "@/lib/contact-schema";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;
const contactSchema = createContactSchema();


export async function POST(req: Request) {
  try {
    // Validate ReCAPTCHA secret is configured — fail fast if not
    if (!RECAPTCHA_SECRET) {
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return NextResponse.json(
        { ok: false, error: "SERVER_ERROR" },
        { status: 500 }
      );
    }

    if (!FORMSPREE_ENDPOINT) {
      console.error("FORMSPREE_ENDPOINT is not configured");
      return NextResponse.json(
        { ok: false, error: "SERVER_ERROR" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { name, email, message, phone, company, recaptchaToken } = parsed.data;

    // Verify ReCAPTCHA — mandatory, not optional
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
      }
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
      return NextResponse.json(
        { ok: false, error: "VERIFICATION_FAILED" },
        { status: 400 }
      );
    }

    // Honeypot: silently succeed without forwarding
    if (company && company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Forward to Formspree
    const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message, phone }),
    });

    const formspreeData = await formspreeRes.json();

    if (!formspreeRes.ok) {
      console.error("Formspree error:", formspreeData);
      return NextResponse.json(
        { ok: false, error: "SUBMISSION_FAILED" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
