# Stanzix Build Plan

A phased build plan. Run each phase as a separate Composer session. Verify before moving to the next phase. Use Plan Mode (Shift+Tab) before executing each phase.

The persistent context lives in `.cursor/rules/stanzix.mdc`. The copy lives in `stanzix-website-copy.md`. Reference both via @file when starting each phase.

---

## Phase 1: Project Setup and Design System

**Scope:** Initialize the project, configure Tailwind with design tokens, set up fonts, create the base layout.

**Tasks:**
1. Initialize Next.js 15 project with TypeScript, Tailwind, App Router, src directory
2. Install dependencies: `framer-motion`, `@vercel/analytics`
3. Configure `tailwind.config.ts` with colors and font families from `.cursor/rules/stanzix.mdc`
4. Set up fonts in `app/layout.tsx` using next/font: Geist, Geist Mono, Fraunces
5. Update `app/globals.css` with base styles (background, text color, font smoothing)
6. Create `app/layout.tsx` with metadata, font variables, analytics
7. Create empty `app/page.tsx` with just `<main>` wrapper using design tokens

**Files created:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`
- `package.json` (updated)

**Verification:**
```bash
npm run build
npm run dev
```
Visit localhost:3000. Should see blank page with correct background color, fonts loading without flash.

**Stop gate:** Confirm the dark background renders, Fraunces and Geist load correctly, no console errors.

---

## Phase 2: Reusable UI Components

**Scope:** Build the three signature components (LeverBar, ScaffoldLine, Bracket) and the Button component.

**Tasks:**
1. Create `src/components/ui/LeverBar.tsx` - horizontal slider with label, value bar, dot indicator
2. Create `src/components/ui/ScaffoldLine.tsx` - thin amber line with transparent ends, horizontal or vertical
3. Create `src/components/ui/Bracket.tsx` - amber bracket marks wrapping children
4. Create `src/components/ui/Button.tsx` - Primary and Secondary variants
5. Create a temporary test page at `app/test/page.tsx` showing all four components rendered

**Files created:**
- `src/components/ui/LeverBar.tsx`
- `src/components/ui/ScaffoldLine.tsx`
- `src/components/ui/Bracket.tsx`
- `src/components/ui/Button.tsx`
- `src/app/test/page.tsx` (temporary, delete in Phase 7)

**Verification:**
```bash
npm run build
npx tsc --noEmit
```
Visit localhost:3000/test. Should see all components rendering with correct colors and spacing.

**Stop gate:** Confirm LeverBar animates smoothly when value prop changes, ScaffoldLine renders both orientations, Bracket wraps text correctly, Buttons show hover states.

---

## Phase 3: Hero Section

**Scope:** Build the hero with animated lever demo. This is the most complex section. Do not move on until it works smoothly.

**Tasks:**
1. Create `src/components/sections/Hero.tsx`
2. Layout: two-column on desktop (text left 60%, demo right 40%), stack on mobile
3. Left column: Stanzix wordmark + amber dot, h1 headline, subheadline, button group
4. Right column: card with 8 LeverBar components and a mono code window below
5. Implement the lever animation: cycle through 3 states every 3-4 seconds with smooth transitions using Framer Motion
6. The mono code window updates content in sync with the lever states (use the three sample prompts in the copy file)
7. Use the Hero copy from `stanzix-website-copy.md`
8. Mount Hero in `app/page.tsx`

**Files created:**
- `src/components/sections/Hero.tsx`

**Files updated:**
- `src/app/page.tsx`

**Verification:**
```bash
npm run build
npm run dev
```
Visit localhost:3000. Verify:
- Levers animate smoothly between states
- Mono code window content updates without flicker
- Layout responsive on mobile (use Chrome DevTools)
- No layout shift on font load
- Buttons functional (can be empty hrefs for now)

**Stop gate:** The hero is the most important section. Confirm visual fidelity matches intent before continuing. If animation feels jittery, fix before moving on.

---

## Phase 4: Trust Building Sections

**Scope:** SocialProof, Problem, HowItWorks, Features. Four sections that build trust and explain the product.

**Tasks:**
1. Create `src/components/sections/SocialProof.tsx` - single horizontal line beneath hero
2. Create `src/components/sections/Problem.tsx` - two-column layout with ScaffoldLine separator
3. Create `src/components/sections/HowItWorks.tsx` - three-column step layout with horizontal scaffold lines connecting
4. Create `src/components/sections/Features.tsx` - 2x3 grid of feature cards with Bracket-wrapped headlines
5. Use copy from `stanzix-website-copy.md` for each section
6. Mount all four in `app/page.tsx` in order

**Files created:**
- `src/components/sections/SocialProof.tsx`
- `src/components/sections/Problem.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/Features.tsx`

**Files updated:**
- `src/app/page.tsx`

**Verification:**
```bash
npm run build
npm run dev
```
Visit localhost:3000 and scroll. All four sections should render with consistent spacing, proper typography hierarchy, and responsive behavior.

**Stop gate:** Section transitions feel intentional (consistent padding). Feature cards have hover states. No content overflow on mobile.

---

## Phase 5: The Money Shot and Social Proof

**Scope:** BeforeAfter (highest priority section), UseCases, Testimonial. The persuasion layer.

**Tasks:**
1. Create `src/components/sections/BeforeAfter.tsx` - two-column comparison
   - Left: dim mono code block showing vague prompt
   - Right: white mono code block with amber syntax highlighting on labels (ROLE, AUDIENCE, etc.)
   - Vertical ScaffoldLine between columns
   - Use the exact prompt examples from the copy file
   - Spend extra time on the syntax highlighting - this is what sells
2. Create `src/components/sections/UseCases.tsx` - tab interface with four personas
   - Tabs: Builders, Writers, Consultants, Researchers
   - Active tab has amber underline
   - Tab content shows description + real example prompt
   - Use React state for active tab (no external libraries)
3. Create `src/components/sections/Testimonial.tsx` - centered, large Fraunces quote
   - Use the founder testimonial from the copy file
   - Small amber accent line beneath attribution
4. Mount all three in `app/page.tsx` in order

**Files created:**
- `src/components/sections/BeforeAfter.tsx`
- `src/components/sections/UseCases.tsx`
- `src/components/sections/Testimonial.tsx`

**Files updated:**
- `src/app/page.tsx`

**Verification:**
```bash
npm run build
npm run dev
```
Visit localhost:3000. BeforeAfter section is the priority - it should be visually striking and immediately persuasive. Tabs in UseCases should switch smoothly without layout shift.

**Stop gate:** The Before/After section is the most important on the entire page. Pause and verify it looks compelling. If the syntax highlighting isn't pulling its weight, iterate before moving on.

---

## Phase 6: Conversion Sections

**Scope:** Pricing, FAQ, FinalCTA, Footer. Close the visitor.

**Tasks:**
1. Create `src/components/sections/Pricing.tsx` - three pricing cards side by side
   - Free, Pro (highlighted with amber border + "Most Popular"), Team
   - Use prices and features from the copy file
   - Each card has CTA button
2. Create `src/components/sections/FAQ.tsx` - accordion with 8 questions
   - Use React state for which item is expanded
   - Question in Fraunces, answer in Geist
   - Active item has thin amber line beneath question
   - Smooth height transition on expand/collapse (Framer Motion)
3. Create `src/components/sections/FinalCTA.tsx` - centered massive Fraunces headline + primary button with scaffold lines on either side
4. Create `src/components/sections/Footer.tsx` - multi-column layout with email capture (input + button), product/company/legal links, social icons, copyright
5. Mount all four in `app/page.tsx`

**Files created:**
- `src/components/sections/Pricing.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/FinalCTA.tsx`
- `src/components/sections/Footer.tsx`

**Files updated:**
- `src/app/page.tsx`

**Verification:**
```bash
npm run build
npm run dev
```
Full page should render top to bottom. All sections present. All interactive elements functional.

**Stop gate:** Pricing card hover states feel premium. FAQ accordion animates smoothly. Footer email capture submits (even if backend not connected, the UI should respond).

---

## Phase 7: Polish, Accessibility, Performance, Deploy

**Scope:** Final pass. Run quality gates. Deploy to Vercel.

**Tasks:**
1. Delete the `app/test/page.tsx` from Phase 2
2. Add subtle scroll-reveal animations (fade in + 8px upward translate, once only) to each section using Framer Motion `whileInView`
3. Add `prefers-reduced-motion` handling - disable scroll animations when set
4. Run accessibility audit:
   - All buttons keyboard accessible
   - Visible focus states (amber outline, 2px offset)
   - Sufficient color contrast (use WebAIM contrast checker for amber on dark)
   - ARIA labels on icon-only buttons (social icons in footer)
   - Semantic HTML throughout
5. Performance optimization:
   - Add `font-display: swap` to all custom fonts
   - Preload Fraunces in `app/layout.tsx`
   - Add `loading="lazy"` to any images below the fold
6. SEO setup:
   - Verify metadata in `app/layout.tsx` matches the spec in `.cursor/rules/stanzix.mdc`
   - Add `app/robots.txt`
   - Add `app/sitemap.ts`
7. Run Lighthouse audit on local build:
   ```bash
   npm run build
   npm run start
   ```
   Then run Lighthouse against localhost:3000. Target Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
8. Fix any failures
9. Push to GitHub
10. Connect to Vercel: import repository, deploy
11. Add stanzix.com custom domain in Vercel project settings
12. Configure DNS at Namecheap to point to Vercel (nameservers or A record)
13. Verify SSL active, site loads at https://stanzix.com

**Verification:**
```bash
npm run build         # Zero errors
npm run lint          # Zero warnings
npx tsc --noEmit      # Clean
npx lighthouse https://stanzix.com --view  # 90+ across the board
```

**Stop gate:** Live at stanzix.com. SSL active. Lighthouse 90+. Mobile responsive verified on real device.

---

## Total Time Estimate

- Phase 1: 30-45 minutes
- Phase 2: 45-60 minutes
- Phase 3: 1.5-2 hours (the hero is genuinely tricky)
- Phase 4: 1-1.5 hours
- Phase 5: 1.5-2 hours (Before/After deserves time)
- Phase 6: 1-1.5 hours
- Phase 7: 1-1.5 hours

**Total: 7-10 hours of focused build time.** Can be split across multiple sessions.

---

## Recovery Pattern

If Cursor drifts mid-phase:
1. Stop the agent immediately
2. Revert the changes (git reset or Cursor's revert)
3. Refine the prompt to be more specific about what went wrong
4. Re-run from the start of the current phase

Do not try to fix drift with follow-up prompts. Cursor's own docs are explicit: refining the plan and re-running produces cleaner results than fix-on-the-fly.

---

## Reference Files

- `.cursor/rules/stanzix.mdc` - always-active design system, conventions, DO NOT list
- `stanzix-website-copy.md` - all copy for all sections
- `stanzix-build-plan.md` - this file
- `first-prompt.md` - the prompt to paste into Cursor to start
