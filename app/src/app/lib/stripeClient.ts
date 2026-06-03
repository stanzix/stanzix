const mode = process.env.NEXT_PUBLIC_STRIPE_MODE === "test" ? "TEST" : "LIVE";

export const stripeProPriceId =
  process.env[`NEXT_PUBLIC_STRIPE_${mode}_PRO_PRICE_ID`] ??
  process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ??
  "";

export const stripeTeamPriceId =
  process.env[`NEXT_PUBLIC_STRIPE_${mode}_TEAM_PRICE_ID`] ??
  process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID ??
  "";
