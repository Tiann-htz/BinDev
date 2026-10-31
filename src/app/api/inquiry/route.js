import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation";

// Very small in-memory rate limiter. Good enough for a single instance;
// replace with Upstash/Supabase-based limiting in production if needed.
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

  // Honeypot: silently reject but look successful to bots.
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

  // TODO (1.12 backend): insert into Supabase table "inquiries"
  // (id, name, email, need, budget, timeline, message, created_at).
  // TODO: send an email alert via Resend to process.env.NOTIFY_EMAIL.
  // For now we only validate and return success.

  return NextResponse.json({ ok: true });
}
