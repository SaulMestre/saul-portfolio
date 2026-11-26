# Data model: Visual Foundation

No server data, database schema, API or personal identifiers are introduced. This document describes the local UI contracts; see [contracts/ui.md](contracts/ui.md).

## DesignToken

- DesignToken.role: stable semantic name defined in tokens.css; consumers must not redefine canonical values.
- DesignToken.lightValue / DesignToken.darkValue: required for theme-dependent roles; theme-independent scales are defined once.
- DesignToken.category: color, typography, spacing, radius, border, shadow or motion.
- Validation: roles used by foreground/background combinations must meet applicable contrast criteria; see research.md and SC-004. Decorative borders are not control boundaries.

## ThemePreference

- ThemePreference.mode: required enum light | dark | system. Missing or invalid persisted input resolves to system.
- ThemePreference.storageKey: fixed value `portfolio.theme`.
- ThemePreference.resolvedAppearance: light | dark, derived from explicit mode or CSS system media query with light fallback; not a second persisted field.
- ThemePreference.rootOverride: absent in system mode, otherwise exactly light or dark on the document root.
- State transitions: initial read -> validated preference -> apply explicit override or remove override -> user chooses -> update root and attempt persistence. Storage failure must not throw or prevent current page interaction.
- No account, timestamp, identity or cross-site tracking.

## SharedPrimitive

- SharedPrimitive.variant: button and action-link visual variants are primary | secondary | outline | ghost | destructive. Non-action links may use the documented text-link style.
- SharedPrimitive.size: sm | md | lg for action controls.
- SharedPrimitive.disabled / SharedPrimitive.isLoading: optional booleans for button only; either prevents activation, busy sets aria-busy. Navigation links remain links without simulated disabled or loading semantics.
- SharedPrimitive.type: button | submit | reset, defaults to button.
- SharedPrimitive.children: required accessible content/name; icon-only controls must have an accessible name.
- SharedPrimitive.surface: card uses surface or muted semantic surface, with one shared padding/radius contract.

## NavigationDestination

- NavigationDestination.locale: es | en; Spanish is default for root redirect.
- NavigationDestination.path: existing internal localized path only; initial home is /es or /en.
- NavigationDestination.label: required localized nonempty string, from localization resources.
- NavigationDestination.current: derived from current route; aria-current on current link.
- Future destinations are added when their routes and content are approved and available; do not persist a second route registry for a single destination.

## ShowcaseExample

- ShowcaseExample.primitive: reference to an actual shipped shared primitive.
- ShowcaseExample.coverage: all supported variants, sizes and applicable states, tested in both themes.
- ShowcaseExample.available: true only in the development server. Server guard returns not-found for production, regardless of URL guessing.
- ShowcaseExample.label: localized descriptive text; no visitor data or production publication.
