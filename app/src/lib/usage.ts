import { SupabaseClient } from "@supabase/supabase-js";

export const MONTHLY_FREE_LIMIT = 5;

export type SubscriptionTier = "free" | "pro" | "team";

export interface UsageCheck {
  allowed: boolean;
  tier: SubscriptionTier;
  used: number;
  limit: number | null; // null = unlimited
  remaining: number | null;
}

export async function checkUsage(
  userId: string,
  supabase: SupabaseClient
): Promise<UsageCheck> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, subscription_status")
    .eq("id", userId)
    .maybeSingle();

  const tier: SubscriptionTier =
    (profile?.subscription_tier as SubscriptionTier) ?? "free";

  if (tier !== "free" && profile?.subscription_status === "active") {
    return { allowed: true, tier, used: 0, limit: null, remaining: null };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("action", "export")
    .gte("created_at", startOfMonth.toISOString());

  const used = count ?? 0;
  const remaining = Math.max(0, MONTHLY_FREE_LIMIT - used);

  return {
    allowed: used < MONTHLY_FREE_LIMIT,
    tier: "free",
    used,
    limit: MONTHLY_FREE_LIMIT,
    remaining,
  };
}

export async function logUsage(
  userId: string,
  action: "generate" | "save_template" | "export",
  supabase: SupabaseClient
): Promise<void> {
  const { error } = await supabase
    .from("usage")
    .insert({ user_id: userId, action });
  if (error) console.error("logUsage failed:", error.message);
}
