import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { checkUsage, MONTHLY_FREE_LIMIT } from "@/lib/usage";

export const maxDuration = 300;

// --- Server-side request constraints (do not trust the client) ---
const ALLOWED_MODELS = new Set([
  "claude-opus-4-8",
  "claude-sonnet-5",
]);
const MAX_TOKENS_CAP = 8192;        // matches the app's own maximum request
const MAX_MESSAGES = 4;             // app only ever sends 1 user message
const MAX_INPUT_CHARS = 60_000;     // system + all message content combined

type IncomingBody = {
  model?: unknown;
  max_tokens?: unknown;
  system?: unknown;
  messages?: unknown;
};

function validateBody(raw: IncomingBody):
  | { ok: true; body: { model: string; max_tokens: number; system: string; messages: { role: "user"; content: string }[] } }
  | { ok: false; reason: string } {
  const model = typeof raw.model === "string" ? raw.model : "";
  if (!ALLOWED_MODELS.has(model)) {
    return { ok: false, reason: "model_not_allowed" };
  }

  const requested = typeof raw.max_tokens === "number" ? raw.max_tokens : NaN;
  if (!Number.isFinite(requested) || requested < 1) {
    return { ok: false, reason: "invalid_max_tokens" };
  }
  const max_tokens = Math.min(Math.floor(requested), MAX_TOKENS_CAP);

  const system = typeof raw.system === "string" ? raw.system : "";
  if (!system) return { ok: false, reason: "missing_system" };

  if (!Array.isArray(raw.messages) || raw.messages.length === 0 || raw.messages.length > MAX_MESSAGES) {
    return { ok: false, reason: "invalid_messages" };
  }

  const messages: { role: "user"; content: string }[] = [];
  let totalChars = system.length;
  for (const m of raw.messages) {
    if (
      typeof m !== "object" || m === null ||
      (m as { role?: unknown }).role !== "user" ||
      typeof (m as { content?: unknown }).content !== "string"
    ) {
      return { ok: false, reason: "invalid_message_shape" };
    }
    const content = (m as { content: string }).content;
    totalChars += content.length;
    messages.push({ role: "user", content });
  }

  if (totalChars > MAX_INPUT_CHARS) {
    return { ok: false, reason: "input_too_large" };
  }

  // Only these four fields are ever forwarded. Anything else the client
  // sends (stream, tools, metadata, etc.) is dropped by construction.
  return { ok: true, body: { model, max_tokens, system, messages } };
}

function makeSupabaseClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false },
    }
  );
}

export async function POST(req: Request) {
  // 1. Require a valid session token
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = makeSupabaseClient(token);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Check tier and enforce monthly limit
  const usage = await checkUsage(user.id, supabase);

  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: "monthly_limit_reached",
        message: `You've used all ${MONTHLY_FREE_LIMIT} free prompts this month. Upgrade to Pro for unlimited access.`,
        usage: { used: usage.used, limit: usage.limit, tier: usage.tier },
      },
      { status: 429 }
    );
  }

  // 3. Validate and constrain the request server-side
  let raw: IncomingBody;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const validated = validateBody(raw);
  if (!validated.ok) {
    return NextResponse.json(
      { error: "invalid_request", reason: validated.reason },
      { status: 400 }
    );
  }

  // 4. Proxy the constrained body to Anthropic
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(validated.body),
    });

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      const text = await response.text().catch(() => "");
      console.error("Anthropic non-JSON response:", response.status, text);
      return NextResponse.json(
        { error: "upstream_error", message: text || `HTTP ${response.status}` },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error("Anthropic error:", data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Claude proxy error:", error);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
