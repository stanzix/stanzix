import { track } from "@vercel/analytics";

// Single choke point for product funnel events. Swap the backend here
// (e.g. PostHog) without touching call sites. Vercel Analytics is
// cookieless, so never pass PII (email, prompt text) as a property —
// keep properties to coarse, non-identifying facts (tier, surface, plan).
export function trackEvent(name, props) {
  try {
    track(name, props);
  } catch {
    // Analytics must never break the app flow.
  }
}
