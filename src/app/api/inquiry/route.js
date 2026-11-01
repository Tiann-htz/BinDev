import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation";

const buckets = new Map();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const bucket = buckets.get(ip) || { count: 0, reset: now + WINDOW_MS };
  if (now > bucket.reset) {
    bucket.count = 0;
    bucket.reset = now + WINDOW_MS;
  }
  bucket.count += 1;
  buckets.set(ip, bucket);
  return bucket.count > LIMIT;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const values = {
    name: payload?.name,
    email: payload?.email,
    need: payload?.need,
    budget: payload?.budget,
    timeline: payload?.timeline,
    message: payload?.message,
    company: payload?.company,
  };

  if (values.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again later." },
      { status: 429 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL || "bindevtechnologies@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  // Persist to Supabase (server-side, using the service role key).
  if (supabaseUrl && serviceRoleKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: values.name?.trim(),
          email: values.email?.trim(),
          need: values.need,
          budget: values.budget,
          timeline: values.timeline,
          message: values.message?.trim(),
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Supabase insert failed:", res.status, text);
        return NextResponse.json(
          { ok: false, error: "Could not save your inquiry. Please try again." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Supabase request error:", err);
      return NextResponse.json(
        { ok: false, error: "Could not save your inquiry. Please try again." },
        { status: 502 }
      );
    }
  } else {
    console.warn("Supabase env vars missing; inquiry not persisted.");
  }

  // Email alert via Resend.
  if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "BinDev <onboarding@resend.dev>",
          to: [notifyEmail],
          reply_to: values.email?.trim(),
          subject: `New inquiry from ${values.name?.trim()}`,
          text: `New inquiry received

Name: ${values.name}
Email: ${values.email}
Need: ${values.need}
Budget: ${values.budget}
Timeline: ${values.timeline}

Message:
${values.message}`,
        }),
      });
    } catch (err) {
      console.error("Resend email error:", err);
    }
  } else {
    console.warn("RESEND_API_KEY missing; email alert not sent.");
  }

  return NextResponse.json({ ok: true });
}
