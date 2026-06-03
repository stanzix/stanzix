import Stripe from "stripe";

const mode = process.env.NEXT_PUBLIC_STRIPE_MODE === "test" ? "test" : "live";

function env(key: string): string {
  const moded = process.env[`STRIPE_${mode.toUpperCase()}_${key}`];
  if (moded) return moded;
  const fallback = process.env[`STRIPE_${key}`];
  if (fallback) return fallback;
  throw new Error(`Missing env: STRIPE_${mode.toUpperCase()}_${key} (and no STRIPE_${key} fallback)`);
}

export const stripeSecretKey = env("SECRET_KEY");
export const stripeWebhookSecret = env("WEBHOOK_SECRET");
export const stripeProPriceId = env("PRO_PRICE_ID");
export const stripeTeamPriceId = env("TEAM_PRICE_ID");

export const stripe = new Stripe(stripeSecretKey);
