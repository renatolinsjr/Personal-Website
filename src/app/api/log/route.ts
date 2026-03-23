import { NextResponse } from "next/server";
import { z } from "zod";

const logSchema = z.object({
  message: z.string().max(1000),
  stack: z.string().max(3000).optional(),
  url: z.string().url().max(500).optional(),
  info: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = logSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "VALIDATION_FAILED" }, { status: 400 });
    }

    const { message, stack, url, info } = parsed.data;

    // This logs to Vercel Runtime Logs (stdout/stderr)
    console.error("Client-side error captured:", {
      message,
      stack,
      url,
      info,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
