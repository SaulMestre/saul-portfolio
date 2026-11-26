# UI contracts: Visual Foundation

This is an internal frontend contract, not an HTTP API. The existing backend health response and public locale routes are unchanged.

## Shared actions

- Button accepts native button props, typed variant and size, optional isLoading; defaults primary/md/button. Use native disabled when disabled or loading; expose aria-busy while loading; preserve accessible name; ensure a busy indicator does not create an extra focus stop. Prefer visible localized busy text where needed. Decorative icons are hidden from assistive technology. No arbitrary style override for visual variants.
- ActionLink renders a real Next Link/anchor with href and native navigation behavior. It consumes the same variant/size style rules as Button without disabled/busy button semantics. Text links have a recognizable underline/focus style. Preserve hrefLang, lang and aria-current where relevant.
- Card is a shared semantic surface, not an automatically clickable control. Container provides width and responsive horizontal spacing. Feature-level composition can use semantic Tailwind utilities; do not duplicate component appearance.
- Consumers import shared components directly; no wrapper per screen, no second theme palette.

## Theme

```ts
type ThemeMode = "light" | "dark" | "system";
```

Canonical storage key: portfolio.theme. Root attribute data-theme is light, dark or absent. CSS system appearance applies when absent. Missing/invalid stored mode maps to system. Storage exceptions are contained. The initial static head bootstrap and client control must agree on validation, key and root effects; tests exercise both using the same input cases.

The selector is a native labeled select with three localized options. Explicit selection updates root and persists when storage is available. The selector indicates selected mode, not a fabricated OS preference. No arbitrary stored value is inserted into HTML or executable script. Under no JavaScript, ordinary content/navigation remains readable; theme interaction/persistence is not promised.

## Layout and routes

- GET / redirects to /es as before.
- GET /es and /en render the existing minimal localized shell and noindex metadata.
- Unsupported locale and unknown paths retain not-found behavior.
- Language links switch the equivalent available locale path, with hrefLang and lang. Only live destinations appear.
- Shared skip link targets the unique main landmark. Header, nav and footer are semantic and responsive; no inaccessible hidden controls.
- GET /es/design-system and /en/design-system: development server renders showcase; production server denies access with not-found and no showcase content. No production navigation entry. Test the actual production build, not only a mocked environment.

## Verification interface

Public acceptance tests observe DOM, roles, keyboard behavior, resolved styles, navigation, storage and actual first paint. Test fixtures never require real personal data. Coverage remains 100% on application TypeScript; CSS behavior is verified in browser tests. Tests and visual artifacts must not misrepresent production readiness.
