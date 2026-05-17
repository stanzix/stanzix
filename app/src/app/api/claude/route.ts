import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { checkUsage, MONTHLY_FREE_LIMIT } from "@/lib/usage";

export const maxDuration = 300;

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

  // 3. Proxy to Anthropic
  try {
    const body = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
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
