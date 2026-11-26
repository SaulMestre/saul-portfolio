# Research and design decisions: Visual Foundation

## R1 — Styling architecture

**Decision**: Native CSS custom properties in tokens.css; use Tailwind 4 theme aliases referencing those semantic values, not a second palette. primitives.css owns variant/state rules. Components choose constrained variants and sizes; feature code uses semantic utilities for composition, not raw color/spacing values.

**Rationale**: One edit propagates to all consumers, CSS handles themes without JS, and the existing stack is sufficient.

**Alternatives considered**: Tailwind arbitrary values scattered in views (inconsistent); a second JS theme object (duplicated truth); external UI kit or class variant library (unnecessary dependencies for this scope). Revisit only when concrete need is demonstrated.

## R2 — Proposed visual tokens

**Decision**: Emerald accent on restrained near-neutral green-tinted surfaces. The palette below is a proposed reviewed baseline, not a claim that final rendered screens are accessible. All CSS values live in one token layer; this table documents the contract. Semantic names may use kebab-case in CSS.

| Semantic role | Light | Dark |
| --- | --- | --- |
| Background | #F6F8F7 | #0B1411 |
| Surface | #FFFFFF | #15231D |
| Muted surface | #E7EFEA | #20342A |
| Text | #14251E | #F1F5F9 |
| Muted text | #52645B | #A5B5AC |
| Accent | #047857 | #10B981 |
| On accent | #FFFFFF | #052E21 |
| Accent hover | #065F46 | #34D399 |
| Accent pressed | #064E3B | #0DAD79 |
| Focus | #047857 | #34D399 |
| Decorative border | #A5B6AD | #40574B |
| Control border | #64766C | #789589 |
| Destructive | #B91C1C | #FCA5A5 |
| On destructive | #FFFFFF | #450A0A |
| Destructive hover | #991B1B | #FECACA |
| Destructive pressed | #7F1D1D | #F87171 |

Preliminary WCAG relative-luminance calculations (rounded): primary text/background 14.99:1 light, 17.08:1 dark; muted text/surface 6.30:1 and 7.60:1; on-accent/accent 5.48:1 and 5.83:1; on-accent/pressed 9.72:1 and 5.12:1; control border/surface 4.83:1 and 5.01:1; focus/surface 5.48:1 and 8.47:1. The dark pressed accent was adjusted from #059669 because that original combination yielded only 3.93:1. Decorative borders are not relied upon for essential control boundaries. Verify all actual pairings, focus boundaries and forced colors in implementation.

Typography: system sans stack (system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif), monospace system stack for future technical accents. Use weights 400, 500, 600, 700. Type scale 0.75, 0.875, 1, 1.125, 1.25, 1.5, 2, 2.5, 3 rem; body line height 1.6, heading 1.15. Avoid remote font fetches. Owner may review a licensed locally hosted font in a separate decision later.

Spacing: 0.25 rem base; named steps 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 6 rem. Radius: small 0.375 rem, medium 0.625 rem, large 1 rem, pill. Border: 1px decorative/control, 2px focus ring with offset. Shared shadows subtle and theme-specific; no heavy glow by default. Button minimum heights: 2rem small, 2.5rem medium, 3rem large; interactive controls must meet applicable 24 CSS px minimum or spacing exception; prefer 44px for primary touch actions. Container width up to 72rem, padding 1rem narrow / 1.5rem tablet / 2rem desktop. Responsive thresholds use the existing Tailwind sm/md/lg scale (40/48/64rem); no conflicting breakpoint system.

Motion: 120ms fast, 180ms standard, 260ms emphasis; shared ease-out curve. Restrict transition properties to intended visual properties, not all. Disable nonessential motion under prefers-reduced-motion. No autoplay, infinite decorative animation or rich timeline animation now.

**Alternatives considered**: exact same green in both modes (contrast problems); remote web font (network cost and privacy); heavy glassmorphism (contrast and readability risk).

## R3 — Theme source of truth and first paint

**Decision**: CSS follows prefers-color-scheme by default. Only explicit light/dark sets a root data-theme attribute. System mode removes that attribute so CSS tracks OS changes automatically. One guarded browser storage key stores the selected mode. A reviewed inline, synchronous early bootstrap in the localized root head reads the stored mode before rendering; no external request or user interpolation. The bootstrap derives its validation literals and key from the canonical preference contract, not a separately editable copy. The client selector reads the same preference, updates storage and root state; storage failure leaves current page usable.

**Rationale**: No server cookies or dynamic rendering requirement, no matchMedia state duplication, preserves prerendering and works when JS is unavailable for ordinary content. Use narrowly scoped root hydration suppression only if necessary for the attribute set by the script; do not suppress unrelated hydration warnings.

**Alternatives considered**: useEffect-only theme (first-paint flash); server cookie (personalized server render and cache complexity); next-themes (useful but unnecessary runtime dependency). For a future strict CSP, use a reviewed hash/nonce strategy rather than broad unsafe-inline policy. No CSP weakening is included here.

## R4 — UI semantics and shell

**Decision**: Native button and link remain separate components sharing visual variant rules. Default button type is button; busy disables repeat activation and communicates busy state without replacing its accessible name. Native select for Light/Dark/System, localized label and options, keyboard handling provided by browser. Use semantic header/nav/main/footer and shared container. Header wraps at narrow widths; no hamburger menu for only one published destination. The only active destination now is the current locale home; no fake contact/project/timeline links.

**Alternatives considered**: polymorphic as-child button (unneeded semantic complexity); custom dropdown (focus and keyboard work without value); mobile menu for empty navigation (misleading).

## R5 — Development reference

**Decision**: Small development-only localized showcase using real shared primitives and a server-side production not-found guard. Cover every variant, size, disabled/busy state, and demonstrate hover/active/focus through actual interaction. Both themes selectable using the same real selector. Do not include production navigation or external service. Verify production returns 404/unavailable content and dev renders. This is access denial, not a promise that Next excludes every showcase module from the build.

**Alternatives considered**: Storybook (valuable when component count grows, not justified now); public playground (not approved); CSS mock samples (not testing actual components).

## R6 — Verification and dependency choice

**Decision**: Keep Vitest and Playwright, test every branch of new TS source, and retain 100% coverage floors. Add axe-core as a development-only dependency for automated browser accessibility scanning. Exact version and license must be checked against the package registry at implementation; use an authentic package-manager-generated lock, not a hand-invented lock. Run local browser injection from the installed package, never a remote CDN. Add explicit Playwright tests for theme preference, first paint, route/locale behavior, responsive layout and reduced motion. Review focus, zoom, touch targets, visual consistency and contrast manually as well; automation is not WCAG certification.

Performance: compare the production bootstrap at the approved spec merge and final production preview under identical documented Chromium/viewport/CDP throttle conditions, fresh contexts and three measured runs each. Save actual LCP and CLS evidence. No new runtime network service or real user tracking.

**Alternatives considered**: automated roles/contrast checks alone (insufficient coverage); a larger visual testing platform (unneeded services/cost); removing coverage floors (contradicts approved baseline).

## R7 — Scope and governance

**Decision**: Keep current public copy, noindex and backend health. Introduce no public personal data, external contact link or unavailable destination. Plan and tasks reviewed together; implementation in small PRs. Record all unresolved implementation test results as pending. Do not describe CI script verification as interactive Copilot execution.
