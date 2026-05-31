# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Stanzix

Stanzix is a structured prompt builder. Users describe what they need, configure 10 levers (Context, Role, Expertise, Guardrails, Behavior, Priority, Safety, Format, Examples, Export), and get a compiled prompt ready to paste into any LLM's project settings. The product lives at app.stanzix.com; the marketing site lives at stanzix.com.

## Repository Structure

This is a monorepo with two independent Next.js apps at the root level:

- **`app/`** — The product app (app.stanzix.com). Next.js 16 with App Router, Turbopack dev server, Supabase auth + data, Stripe billing, Anthropic API proxy. Components are `.jsx`, API routes are `.ts`.
- **`marketing/`** — The marketing site (stanzix.com). Next.js 16 with App Router, Tailwind CSS v4, Framer Motion, Vercel Analytics. Fully TypeScript.

Each app has its own `package.json`, `node_modules`, and build pipeline. There is no shared workspace or root `package.json`.

## Build & Dev Commands

All commands must be run from inside the respective app directory.

### Product app (`app/`)
```bash
cd app
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint on src/
npx tsc --noEmit     # TypeScript check
```

### Marketing site (`marketing/`)
```bash
cd marketing
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check
```

## App Architecture (`app/`)

### Entry point
`src/app/page.tsx` renders `<Stanzix />`, which is a single-page app that switches between views: sign-in gate, dashboard, intake screen, step-by-step builder, and edit mode.

### Core state flow
- **`hooks/useAuth.js`** — Supabase auth via magic link (OTP). Provides `user`, `signInWithMagicLink`, `signOut`.
- **`hooks/useStanzix.js`** — All builder state and logic. 800+ lines. Manages the 10-step wizard, AI generation for each lever, state persistence to Supabase (`prompt_engine_states` table), prompt history, intake parsing, cascade generation, and compiled output. This is the heart of the app.
- **`lib/outputBuilder.js`** — Compiles all lever selections into the final prompt text. Exports `STEPS` (step definitions with id, label, icon, description) and `buildOutput()`.
- **`lib/claudeApi.js`** — Client-side wrapper that calls `/api/claude`. Handles JSON extraction from Claude responses with fallback parsing. Default model: `claude-opus-4-20250514`; cascade/intake uses `claude-3-5-haiku-20241022`.

### API routes (`src/app/api/`)
- **`claude/`** — Proxies requests to Anthropic's Messages API. Authenticates via Supabase JWT, enforces monthly usage limits (5 free exports/month).
- **`usage/`** — GET returns current usage stats; POST logs an export action. Usage is counted by `export` actions in the `usage` table.
- **`checkout/`** — Creates Stripe Checkout sessions for Pro/Team subscriptions.
- **`portal/`** — Creates Stripe Billing Portal sessions for subscription management.
- **`webhooks/stripe/`** — Handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`. Updates `profiles` table.

### Auth flow
`auth/callback/route.ts` exchanges the magic link code for a Supabase session via `getSupabaseServerClient()`.

### Component structure
- **`components/Stanzix.jsx`** — Root component. Orchestrates view switching (sign-in, paywall, dashboard, intake, builder), header, stepper, step rendering, preview panel.
- **`components/stanzix/steps/`** — One component per builder step: ContextStep, IdentityStep, KnowledgeStep, NegativeSpaceStep, ModesStep, PriorityStep, FailureStep, TemplatesStep, ExamplesStep, ExportStep.
- **`components/stanzix/`** — Supporting components: Dashboard, IntakeScreen, EditMode, PreviewPanel, SignInGate, PaymentGate, UsageDisplay, PromptLibraryModal, ui (shared UI primitives).

### Supabase tables
- `profiles` — User profile with Stripe fields (`stripe_customer_id`, `stripe_subscription_id`, `subscription_tier`, `subscription_status`, `current_period_end`).
- `prompt_engine_states` — Persisted builder state per user (upserted on `user_id`).
- `usage` — Action log (`user_id`, `action`, `created_at`). Free tier limited to 5 exports/month.

### Subscription tiers
`free` (5 exports/month), `pro` (unlimited), `team` (unlimited). Tier determined by `profiles.subscription_tier` + `subscription_status === "active"`.

### Environment variables (app/)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY          # webhook route only
ANTHROPIC_API_KEY                  # server-side Claude proxy
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID
NEXT_PUBLIC_APP_URL                # optional, defaults to https://app.stanzix.com
```

## Marketing Site Architecture (`marketing/`)

One-page marketing site with section components in `src/components/sections/`. Design system detailed in `.cursor/rules/stanzix.mdc`.

### Key design constraints
- Dark mode only. Background `#0A0A0A`, accent `#D4A04C` (amber).
- Fonts: Fraunces (headlines), Geist (body), Geist Mono (code). No Inter.
- Visual signature: LeverBar, ScaffoldLine, Bracket components. No gradients, glassmorphism, or animated orbs.
- No em dashes. No marketing fluff words. Builder-to-builder voice.
- Tailwind CSS only, no CSS-in-JS.

## Code Style Notes

- The product app mixes `.jsx` (components, hooks, libs) and `.ts` (API routes, usage lib). This is intentional — the frontend was built rapidly in JSX.
- Inline styles are used throughout `Stanzix.jsx` and step components (not Tailwind). The marketing site uses Tailwind.
- Path alias: `@/*` maps to `./src/*` in both apps.
- Both apps deploy to Vercel.
