import { NextResponse } from "next/server";
import { Pool } from "pg";
type WaitlistPayload = {
  name: string;
  phone: string;
  email: string;
  level?: string;
  otherLevel?: string;
  challenge?: string;
  source?: string;
};

const pool =
  (globalThis as { __waitlistPool?: Pool }).__waitlistPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: false },
  });

if (!(globalThis as { __waitlistPool?: Pool }).__waitlistPool) {
  (globalThis as { __waitlistPool?: Pool }).__waitlistPool = pool;
}

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const isValidE164 = (phone: string) => /^\+[1-9]\d{1,14}$/.test(phone);

const getDebugSnapshot = () => ({
  hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
  sslMode: process.env.PGSSLMODE || "default",
  nodeEnv: process.env.NODE_ENV || "development",
});

const logDebug = (message: string, data?: Record<string, unknown>) => {
  if (process.env.WAITLIST_DEBUG === "true") {
    console.log(`[waitlist] ${message}`, data ?? {});
  }
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;
    const name = payload?.name?.trim();
    const phone = payload?.phone?.trim();
    const email = payload?.email?.trim().toLowerCase();
    const level = payload?.level?.trim();
    const otherLevel = payload?.otherLevel?.trim();
    const challenge = payload?.challenge?.trim();
    const source = payload?.source?.trim() || "hero";

    logDebug("Incoming payload", {
      nameLength: name?.length ?? 0,
      phoneLength: phone?.length ?? 0,
      email,
      level,
      otherLevelLength: otherLevel?.length ?? 0,
      challengeLength: challenge?.length ?? 0,
      source,
    });

    if (!name || !phone || !email || !isValidEmail(email) || !isValidE164(phone) || !level) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    if (level === "Other" && !otherLevel) {
      return NextResponse.json({ error: "Please specify your level." }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 });
    }

    logDebug("Inserting into waitlist_signups");
    await pool.query(
      `INSERT INTO waitlist_signups (name, phone, email, level, other_level, challenge, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, phone, email, level, level === "Other" ? otherLevel : null, challenge ?? null, source]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    const debug = getDebugSnapshot();
    return NextResponse.json(
      { error: "Unable to submit waitlist.", debug: process.env.WAITLIST_DEBUG === "true" ? debug : undefined },
      { status: 500 }
    );
  }
}
