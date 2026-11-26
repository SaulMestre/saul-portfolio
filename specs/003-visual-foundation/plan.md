# Implementation Plan: Visual Foundation

**Branch**: `003-visual-foundation-plan` | **Date**: 2026-11-26 | **Spec**: [spec.md](spec.md)

**Input**: Approved feature specification (PR #9, merged at dc27876d67c015297b4f64c37ba9dc1b317370d5).

**Status**: Proposed; owner approval of this plan and tasks is required before application implementation.

## Summary

Build the shared visual foundation for the existing localized shell without publishing new product content. Use semantic CSS custom properties as the single source of truth, expose the applicable tokens through Tailwind CSS 4, and use typed, accessible React primitives. Keep the static/prerendered shell and the existing server root redirect. Provide browser-local Light, Dark and System preferences, responsive navigation and a development-only reference. Build and verify in small PRs.

## Technical Context

- **Language/Version**: TypeScript 5.9.3, React 19.2.9, Node 24.22.3.
- **Primary Dependencies**: existing Next.js 16.4.6 and Tailwind CSS 4.1.17. No additional runtime package is planned. A single pinned development-only axe-core dependency is proposed for browser accessibility checks; review exact version, license, generated lockfile and audit before merging it.
- **Storage**: browser localStorage for one theme preference key; no cookies, personal data, tracking, server storage or database.
- **Testing**: existing Vitest/V8 (100% lines, functions, statements and branches), Testing Library and Playwright Chromium; add browser accessibility, theme first-paint, responsive, reduced-motion and performance checks. Preserve all four required CI contexts.
- **Target Platform**: existing Next.js web application, responsive from 320 CSS px; current evergreen browsers. Chromium is the existing CI browser; add Firefox/WebKit smoke runs for final theme/layout validation if available, documenting actual coverage rather than claiming unsupported browsers tested.
- **Project Type**: frontend feature in existing monorepo; no backend changes or new service.
- **Performance Goals**: SC-009 laboratory median LCP <= 2.5 s, CLS <= 0.1 over three fresh runs; see quickstart for fixed conditions and comparison against approved pre-feature main.
- **Constraints**: preserve Spanish default, ES/EN routes, noindex, existing health contract, strict typing, accessibility and privacy. No network fonts, UI runtime library, theme library, animation package or Storybook in this increment. Do not bypass or reduce coverage gates.
- **Scale/Scope**: shared tokens, button, styled link, card, container, localized header/footer, theme selector, development-only showcase, documentation and tests. No new public destination except the existing localized home.

## Constitution Check

| Gate | Pre-research | Post-design rationale |
| --- | --- | --- |
| Approved scope and review | Pass | PR #9 approved; plan/tasks review remains mandatory before implementation. |
| Modularity and single source | Pass | CSS token/variant layers and typed UI contracts; feature and layout separation; no duplicated palette or generic framework. |
| Accessibility, responsive and i18n | Pass | Native semantics, focus, contrast, reduced motion, ES/EN labels, mobile-first reflow and explicit acceptance tests. |
| Performance and architecture | Pass | Preserve server components, prerendering and small client theme control; no new runtime packages or external calls. |
| Privacy and public content | Pass | Browser-local mode only; no personal facts, analytics, credentials or new backend contract. |
| Tests and release governance | Pass | Tests first, existing 100% floors and check contexts, staged PRs, production showcase denial and manual review. |
| Security | Pass | Static reviewed early theme script, no user interpolation, no remote scripts; document future CSP compatibility. |
| English engineering artifacts | Pass | English technical artifacts; visitor copy localized separately. |

No constitution exception requested. These checks are a design review, not evidence that the planned application works.

## Project Structure

### Documentation (this feature)

```text
specs/003-visual-foundation/
  spec.md
  plan.md
  research.md
  data-model.md
  contracts/ui.md
  quickstart.md
  tasks.md
  checklists/requirements.md
```

### Source Code (repository root)

```text
frontend/
  src/
    app/
      globals.css
      [locale]/
        layout.tsx
        page.tsx
        design-system/page.tsx
    styles/
      tokens.css
      primitives.css
    components/
      ui/
        button.tsx
        button.test.tsx
        action-link.tsx
        action-link.test.tsx
        card.tsx
        card.test.tsx
      layout/
        container.tsx
        site-header.tsx
        site-footer.tsx
        site-layout.tsx
        site-layout.test.tsx
      theme/
        theme-preference.ts
        theme-preference.test.ts
        theme-bootstrap.tsx
        theme-bootstrap.test.tsx
        theme-selector.tsx
        theme-selector.test.tsx
    features/
      shell/portfolio-shell.tsx
      design-system/component-showcase.tsx
      design-system/component-showcase.test.tsx
    localization/messages.ts
  e2e/
    visual-foundation.spec.ts
    accessibility.spec.ts
    performance.spec.ts
    design-system-dev.spec.ts
  playwright.config.ts
  playwright.dev.config.ts
docs/
  design-system.md
  development.md
```

Existing tests remain and are updated to assert real behavior, not weakened. New tests are co-located; exact filenames may be refined in an implementation PR if responsibility stays clear and tasks are updated. CSS and TS contracts are covered by browser and behavior tests, respectively.

**Structure Decision**: Shared primitives in components/ui; shared shell in components/layout; browser preference behavior in components/theme; showcase feature remains isolated. Root globals imports the token and primitive layers once. Reuse existing localization and routes. Backend is untouched. No empty future feature directories.

## Implementation approach

1. Capture the bootstrap baseline before application changes. Define design tokens and styles; add tests before shared button/link/card/container changes.
2. Implement CSS system preference and explicit theme overrides. Use a static synchronous early script to apply only validated explicit modes before first paint; share key and mode definitions, and keep storage access guarded. No inline user data. A small client selector updates mode; no whole-page client boundary.
3. Integrate shared layout into the existing locale layout, keeping correct document language, metadata, skip target, semantic links and only live destinations. Keep the minimal home copy, not a fictional portfolio.
4. Add restrained transitions with reduced-motion overrides. Test keyboard, native semantics, contrast and focus.
5. Implement a localized development-only showcase at /es/design-system and /en/design-system; enforce a server-side production not-found guard before rendering, verify against the production server and never link it publicly. Development examples use the actual shared components.
6. Verify all stories and acceptance criteria; record measured values and evidence, not just planned outcomes. No deployment.

## Delivery and approval gates

- PR A: this plan, research, contracts and tasks; documentation only.
- PR B: tokens, basic shared UI, tests and usage documentation.
- PR C: theme preference, early paint, shared localized shell and responsive/reduced-motion tests.
- PR D: development showcase, automated accessibility and performance verification, final visual review and acceptance evidence. A narrow preliminary dependency PR is permitted if needed to generate and review a real lockfile.
- Each application PR requires the owner-approved plan and tasks, complete tests for its scope, passing existing CI and owner merge. Do not merge on the owner's behalf.

Spec Kit plan/tasks documents follow the committed v1.4.4 skill and project test-required template. GitHub connector cannot execute local Copilot or the setup scripts in the owner's checkout; do not claim that interactive verification. The existing official isolated script workflow remains tested by CI; the local interactive follow-up stays open.
