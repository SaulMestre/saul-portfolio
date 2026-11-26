# Quickstart and validation: Visual Foundation

Planned commands and expected outcomes; this document is not a record that the feature has already been implemented.

## Prerequisites and development

Use the repository-pinned Node 24.22.3 and package lock. From frontend:

```sh
npm ci
npm run dev
```

Visit http://localhost:3000/es and /en. Visit /es/design-system and /en/design-system on the development server. Expected: localized shell, theme selector, no broken destinations, and development examples of the real shared components.

## Automated checks

```sh
npm run lint
npm run typecheck
npm run format:check
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e
npx playwright test --config playwright.dev.config.ts
npm audit --audit-level=high
```

Run browser installs with --with-deps on compatible Linux CI when needed. The dev config starts a separate dev server and uses only showcase tests; the existing production config continues to test the production build and explicitly verifies showcase denial. Stop conflicting local servers before starting tests. Keep all existing required checks. From repository root run python scripts/verify_spec_kit.py for managed tooling changes; this feature does not modify managed files.

## Acceptance matrix

| Scenario | Expected evidence |
| --- | --- |
| Both locales, light/dark/system | Six mode/OS combinations; reload and language switch retain expected mode; system responds live. |
| Invalid or denied storage | No uncaught error, valid readable fallback, current-page selection remains usable. |
| First paint | Browser init instrumentation and first-render screenshots/trace with a stored opposite-system theme; no incorrect visible first frame under normal capabilities. Test JS-disabled fallback separately. |
| Buttons/links | All five variants and three sizes, native semantics, correct default type, busy/disabled prevent repeat activation, focus preserved when applicable. |
| Layout | 320, 768, 1440 CSS px × both languages × both themes; no overflow/clipping, skip link and valid routes. |
| Accessibility | axe-core local scan of shell in both themes/locales and dev showcase; explicit contrast/focus/keyboard assertions plus manual 200% zoom and touch review. |
| Motion | Browser reducedMotion reduce/no-preference cases; nonessential transitions suppressed, same functionality. |
| Showcase | Dev routes display all real shared variants/sizes/states; production routes return unavailable/not-found and no showcase content. |
| Regression | Existing root redirect, noindex metadata, invalid locale behavior and all four CI checks pass. |
| Visual review | Capture representative desktop and mobile images in both themes, with no private information; review against agreed direction. |

## Repeatable performance comparison

Before implementation, capture the production bootstrap at dc27876d67c015297b4f64c37ba9dc1b317370d5 and repeat the same test on the final candidate. Use separate clean worktrees or CI checkouts and identical pinned browser/toolchain versions. For each run use a fresh context, 390x844 viewport, device scale factor 1, Chromium CDP CPU slowdown 4x, 150 ms latency, 1.6 Mbit/s down and 0.75 Mbit/s up; disable cache and record browser, runner and exact parameters. Use the same locale and default system theme for baseline/final comparison. Measure LCP and CLS using buffered PerformanceObserver entries until load + a fixed 5 s observation window; exclude layout shifts with recent input, compute CLS by maximum session window. Close contexts between runs. Record three runs and median for each, and retain JSON results/screenshots as CI artifacts. Target median LCP <= 2.5 s, CLS <= 0.1. Do not claim real-user Core Web Vitals from laboratory results.

If a metric is unavailable or environment is inconsistent, record that limitation and rerun before claiming SC-009 met. Do not replace missing measurements with estimates.

## Final review

Record actual CI run links, measured coverage and performance, browser/viewport matrix, accessibility findings, screenshot review and any pending manual checks in the feature verification notes. Owner approves visual direction and each PR. No production deployment or real portfolio content in this feature.
