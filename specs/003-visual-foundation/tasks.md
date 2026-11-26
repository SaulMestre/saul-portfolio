# Tasks: Visual Foundation

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Prerequisites**: Owner approval of plan and tasks. PR #9 approved the specification. All tests are required under the constitution; write tests first and observe relevant failures before implementation. Keep the existing coverage floors and four required checks.

**Format**: [ID] [P if independent] [Story] Description. All paths relative to repository root. Stories can be tested independently after shared foundation; delivery order favors small reviewable PRs.

## Phase 1: Setup

- [x] T001 Confirm main and approved documents; verify current CI baseline; record the pre-feature performance and visual evidence per quickstart.md in specs/003-visual-foundation/verification.md (SC-008, SC-009).
- [ ] T002 [P] Establish accessibility tool dependency decision: inspect current axe-core version/license, generate authentic frontend/package-lock.json via package manager for exact dev dependency in frontend/package.json, audit and review; no runtime additions (FR-011, FR-013). Defer actual dependency commit to PR D or a narrow prerequisite PR.

## Phase 2: Foundational (blocking)

- [ ] T003 Add test cases for semantic token use and contrast of actual role pairs in frontend/e2e/visual-foundation.spec.ts and relevant browser tests (FR-001, FR-002, FR-011).
- [ ] T004 Implement frontend/src/styles/tokens.css and import from frontend/src/app/globals.css; canonical DesignToken.role, DesignToken.lightValue, DesignToken.darkValue, DesignToken.category in data-model.md. Expose semantic Tailwind aliases and shared spacing/type/radius/motion scales; no duplicate palette (FR-001, FR-002).
- [ ] T005 Implement shared state/variant rules in frontend/src/styles/primitives.css, focus-visible and semantic surface styles; document tokens and consumption in docs/design-system.md (FR-001, FR-006, FR-007).

**Checkpoint**: Token foundation reviewed; no page-specific arbitrary palette.

## Phase 3: User Story 1 — Consistent visual language (P1)

**Independent test**: shared controls render documented semantics and consume identical visual variants across contexts.

- [ ] T006 [P] [US1] Write frontend/src/components/ui/button.test.tsx for all variants/sizes, native type, loading/disabled behavior, accessible names and activation; cover each constrained SharedPrimitive field in data-model.md (FR-006, SC-001).
- [ ] T007 [P] [US1] Write frontend/src/components/ui/action-link.test.tsx and card.test.tsx for native links, variant/size use, semantics and surfaces (FR-006, FR-007).
- [ ] T008 [US1] Implement frontend/src/components/ui/button.tsx with SharedPrimitive.variant, SharedPrimitive.size, SharedPrimitive.disabled, SharedPrimitive.isLoading, SharedPrimitive.type and SharedPrimitive.children per data-model.md and contracts/ui.md; no per-instance variant CSS (FR-006).
- [ ] T009 [US1] Implement frontend/src/components/ui/action-link.tsx and card.tsx with SharedPrimitive.variant, SharedPrimitive.size, SharedPrimitive.children and SharedPrimitive.surface per data-model.md; keep real navigation semantics; add shared container in frontend/src/components/layout/container.tsx with corresponding tests (FR-007).
- [ ] T010 [US1] Adopt shared components in frontend/src/features/shell/portfolio-shell.tsx where relevant; validate common variant change propagation and record PR B evidence in verification.md (FR-001, FR-015, SC-001).

**Checkpoint / PR B**: tokens, primitives and tests; owner review, required CI green.

## Phase 4: User Story 2 — Comfortable theme preferences (P1)

**Independent test**: theme works in the existing localized shell before future sections exist.

- [ ] T011 [P] [US2] Write frontend/src/components/theme/theme-preference.test.ts, theme-bootstrap.test.tsx and theme-selector.test.tsx covering all valid/missing/malformed values, blocked storage, native selection and root effects (FR-003, FR-004, FR-005, FR-014).
- [ ] T012 [US2] Implement frontend/src/components/theme/theme-preference.ts; canonical ThemePreference.mode, ThemePreference.storageKey, ThemePreference.rootOverride and ThemePreference.resolvedAppearance per data-model.md; apply guarded storage and CSS system behavior (FR-003–FR-005).
- [ ] T013 [US2] Implement frontend/src/components/theme/theme-bootstrap.tsx and integrate static synchronous early head bootstrap in frontend/src/app/[locale]/layout.tsx; CSS uses system when override absent. Verify no broad hydration suppression, unsafe data interpolation or new dynamic rendering requirement (FR-014).
- [ ] T014 [US2] Implement native localized selector in frontend/src/components/theme/theme-selector.tsx and frontend/src/localization/messages.ts; maintain readable fallback (FR-003, FR-005, FR-009).
- [ ] T015 [US2] Add browser cases to frontend/e2e/visual-foundation.spec.ts for all six theme/OS combinations, live OS changes, reload, locale switch, first paint and storage denial; retain real evidence (SC-002, SC-005).

## Phase 5: User Story 3 — Responsive localized navigation (P1)

**Independent test**: existing ES/EN shell navigable at 320, 768 and 1440px.

- [ ] T016 [P] [US3] Write frontend/src/components/layout/site-layout.test.tsx and update existing localized route tests for skip link, landmarks, labels, correct links, metadata and unsupported locales (FR-008, FR-009, FR-016).
- [ ] T017 [US3] Implement frontend/src/components/layout/site-header.tsx, site-footer.tsx and site-layout.tsx; NavigationDestination.locale, NavigationDestination.path, NavigationDestination.label and NavigationDestination.current per data-model.md. Use existing live locale routes, shared container, action link and theme selector (FR-008, FR-009).
- [ ] T018 [US3] Integrate layout via frontend/src/app/[locale]/layout.tsx and simplify frontend/src/features/shell/portfolio-shell.tsx; preserve current copy, root redirect, noindex and correct unique main target. Update frontend/src/localization/messages.ts (FR-009, FR-015, FR-016).
- [ ] T019 [US3] Extend frontend/e2e/visual-foundation.spec.ts for 320/768/1440, both locales/themes, keyboard order, skip navigation and link destinations; verify no unexpected overflow or hidden unusable controls (SC-003, SC-007).

## Phase 6: User Story 4 — Accessible restrained motion (P2)

**Independent test**: core shell accessible with and without motion.

- [ ] T020 [P] [US4] Add reduced-motion and keyboard/focus assertions in frontend/e2e/visual-foundation.spec.ts; write tests before completing motion rules (FR-010, FR-011).
- [ ] T021 [US4] Finish frontend/src/styles/tokens.css and primitives.css with named motion durations, explicit transition properties, reduced-motion override and focus/forced-colors treatment; verify behavior unchanged (FR-010, FR-011, SC-005).
- [ ] T022 [US4] Perform preliminary keyboard, zoom, touch-target and actual contrast review in both themes; record findings and fix defects in the relevant shared source before PR C review (SC-003, SC-004).

**Checkpoint / PR C**: theme + responsive localized shell + reduced motion; required CI green and owner review.

## Phase 7: User Story 5 — Shared UI reference (P2)

**Independent test**: actual primitives demonstrable only on development server.

- [ ] T023 [P] [US5] Write frontend/src/features/design-system/component-showcase.test.tsx and frontend/e2e/design-system-dev.spec.ts; define expected variant/size/state matrix and locale labels (FR-012).
- [ ] T024 [US5] Implement frontend/src/features/design-system/component-showcase.tsx and frontend/src/app/[locale]/design-system/page.tsx; ShowcaseExample.primitive, ShowcaseExample.coverage, ShowcaseExample.available and ShowcaseExample.label per data-model.md. Localize examples, use actual components and server production guard (FR-012).
- [ ] T025 [US5] Add frontend/playwright.dev.config.ts and production denial cases in frontend/e2e/visual-foundation.spec.ts; integrate dev checks into frontend job in .github/workflows/ci.yml, preserve required context name (FR-012, SC-006).
- [ ] T026 [US5] Complete docs/design-system.md and docs/development.md with variant/size usage, token ownership, theme/locale rules, showcase commands, and extension rule for future primitives; record shared style review (FR-013, SC-001).

## Phase 8: Polish and verification

- [ ] T027 Implement frontend/e2e/accessibility.spec.ts with pinned local axe-core from T002; scan agreed shell/showcase cases, explicit focus/contrast tests, no unjustified rule suppression; run automated and manual accessibility checks and document limitations (FR-011, SC-004).
- [ ] T028 Implement frontend/e2e/performance.spec.ts per quickstart.md; compare three baseline/final production samples under identical documented profile, record median LCP/CLS and retain results in frontend CI artifacts without personal data (SC-009).
- [ ] T029 Validate visual matrix and representative screenshots in both themes, both locales, narrow/desktop layouts, 200% zoom and reduced motion; resolve findings, update verification.md (FR-015, SC-003–SC-006).
- [ ] T030 Run all four CI checks, frontend test coverage, production and dev route tests, audit and existing backend tests. Record actual run IDs, coverage and acceptance matrix in verification.md; no false local Copilot or unrun browser claims (FR-013, FR-016, SC-008).
- [ ] T031 Update docs/architecture.md only for implemented frontend decisions, mark completed tasks with evidence, obtain owner visual approval and review PR D before merge. Explicitly document any remaining blockers; do not deploy (FR-013, FR-016).

## Dependencies & Execution Order

- T001 precedes application changes; capture baseline before styling. T002 can be investigated independently; required before T027.
- T003 precedes T004–T005. T006–T007 precede T008–T010. PR B depends on T001 and T003–T010.
- T011 precedes T012–T015. T016 precedes T017–T019; layout integrates the theme control after T014. T020 precedes T021. PR C depends on PR B and T011–T022.
- T023 precedes T024–T025. T027 requires dependency and relevant dev/production servers. T028 requires T001 baseline. Final PR D depends on earlier PRs and T023–T031.
- Independent test-writing tasks can be parallelized if editing distinct files; coordinate shared e2e file changes. Each story can be verified without future public content.
- Tests must observe relevant pre-implementation failure and post-implementation success. Do not reduce existing floors or skip failed checks to advance.

## Requirements coverage

| Requirements | Implementation / verification tasks |
| --- | --- |
| FR-001, FR-002 | T003–T005, T010, T029 |
| FR-003, FR-004, FR-005, FR-014 | T011–T015 |
| FR-006, FR-007 | T005–T010 |
| FR-008, FR-009, FR-015 | T014, T016–T019, T029 |
| FR-010, FR-011 | T003, T020–T022, T027, T029 |
| FR-012 | T023–T025 |
| FR-013 | T002, T026–T031 |
| FR-016 | T016, T018, T030–T031 |

## Implementation strategy

Deliver PR B first, then PR C, then PR D. Each increment has a documented scope and independent tests, requires passing CI and owner merge. Plan/tasks approval is a prerequisite; all application tasks remain unchecked. Final feature approval is separate from the present documentation review.
