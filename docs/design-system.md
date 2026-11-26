# Design system

The shared visual layer is the source of truth for the portfolio. It is not a
public component library. Use it for every new feature instead of introducing
per-page action styles.

## Ownership

- `frontend/src/styles/tokens.css`: semantic palette, typography, spacing,
  borders, radii, shadow, motion and control dimensions. Native CSS
  `light-dark()` resolves colors under the root color scheme; system preference
  is automatic, explicit light/dark root overrides are applied by the
  shared theme control. Tailwind aliases reference the same tokens.
- `frontend/src/styles/primitives.css`: shared variant, size, state, surface
  and container rules. Both Button and ActionLink consume `ui-action`.
- `frontend/src/app/globals.css`: imports shared styles and defines base
  typography and focus rules.
- `frontend/src/components/ui`: typed native UI contracts; use the approved
  variants instead of supplying arbitrary className or style overrides.
- `frontend/src/components/layout`: reusable layout primitives.

Use semantic utilities such as `bg-canvas`, `text-ink`,
`text-ink-muted`, `border-divider` and the shared spacing scale.
Do not paste palette hex values into feature components. Do not mix the
default Tailwind color palette into the portfolio identity. Use normal
layout utilities for composition; component visual rules belong in primitives.

## Usage

```tsx
<Button variant="primary" size="lg">Action</Button>
<Button variant="secondary" isLoading>Save</Button>
<ActionLink href="/en" variant="outline">English</ActionLink>
<Card surface="muted">Content</Card>
<Container>Page content</Container>
```

Action variants: primary, secondary, outline, ghost, destructive.
Sizes: sm, md, lg. Default: primary/md. Button defaults to native type
button to avoid accidental form submissions; request submit or reset
explicitly. Disabled and busy buttons cannot be activated; busy keeps the
accessible name and sets aria-busy. Supply a localized busy label as needed.
ActionLink retains native link semantics and must have a valid destination.
Use documentNavigation for locale changes across localized root layouts so
that the new document runs the early theme bootstrap. Other internal links
use Next Link client navigation; both paths share the same visual rules.
Cards are surfaces, not buttons. Container uses responsive width and padding.

Tokens support reduced motion and system appearance. The shared site layout
contains the localized native theme selector. The validated browser-local
preference is stored as portfolio.theme; system mode removes data-theme so
CSS follows the OS. A static synchronous head script restores explicit modes
before rendering. The development showcase is available at /es/design-system and /en/design-system
when running npm run dev; production requests must return not-found. It uses
real shared primitives, with every action variant and size, disabled and busy
states, and both card surfaces. The site theme selector controls its appearance.
New components should be added only
when a feature needs them. Keep component behavior tests and the existing
coverage gates. See the approved visual foundation plan and research for
the design decisions and verification matrix.

## Verification

Run npm run format before committing frontend changes, then the existing lint,
typecheck, coverage, build and browser checks. If CI rejects formatting, it
retains the actual Prettier-generated diff as frontend-format-patch without
waiving the failed check. The development browser config runs the showcase
separately. Axe-core 4.14.1 is an exact development dependency for automated
WCAG checks; it is not included in the application runtime. Browser checks
and screenshots inform, but do not replace, manual accessibility review.
