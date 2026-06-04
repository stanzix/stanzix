import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    try {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_uid: user.id },
      });
      customerId = customer.id;
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create customer";
      console.error("Stripe customer creation error:", err);
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  try {
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      req.headers.get("origin") ??
      "https://app.stanzix.com";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: appUrl,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Portal failed";
    console.error("Stripe portal error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
