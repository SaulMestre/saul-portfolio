# Verification: Visual Foundation

## Approved inputs

- Specification PR #9 merged at dc27876d67c015297b4f64c37ba9dc1b317370d5.
- Plan and tasks PR #10 merged at a1e45d1e9e53fa5b9979224e0ea3a6f2b82aabbe.
- PR #10 engineering checks 45833462725 and secret scanning 45833462912 completed successfully.

## Pre-feature baseline (T001 — complete)

Engineering checks 45836657610 and secret scanning 45836657350 passed on the unchanged application source. Frontend coverage: 100% in every metric. Browser Chromium 141.0.7390.37, Node v24.22.3, Linux runner, Spanish, light system theme, 390x844, DPR 1, CPU slowdown 4x, 150ms latency, 200000/93750 bytes/s download/upload, 5000ms observation. Three samples LCP 372/372/372ms; CLS 0/0/0. Medians 372ms and 0. Artifact 15126685733 contains report and mobile/desktop screenshots; retain within CI. These are laboratory measurements only.

### Baseline procedure

The initial commit in the implementation PR adds only test instrumentation and
CI artifact retention; no application source, dependency or visual style is
changed. The production shell therefore remains the approved pre-feature
bootstrap. Capture three mobile samples using the profile in quickstart.md
plus mobile and desktop screenshots. Record actual metrics and run/artifact
identifiers after the CI run succeeds. The result above completes T001.

## Tests-first and implementation

Tests for shared primitives, token propagation and contrast are added before the corresponding implementation. Await the deliberate red run; no new UI behavior is claimed yet. Keep the approved coverage floors and four required
CI contexts. The first implementation PR remains a draft until the baseline,
negative tests and final implementation checks have been verified.

## Tests-first run

Engineering checks 45840166317 on 0e6274eb4dd8f376da35f9f85956fb3c9c14df1d rejected the new component tests at TypeScript checking because the button, action-link, card and container modules did not exist (TS2307). Backend, Spec Kit and secrets passed. This confirms the pre-implementation contract is absent; the runtime assertions and browser tests were not reached in this run. The implementation and formatting adjustments are now submitted for CI; do not mark the remaining tasks complete until verified.

## PR B — merged and verified

PR #11 merged at bf9eca09e050efdcf991f9ee803e3c8e4d5012d9. Engineering checks 45844203608 and secret scanning 45844203586 passed: 31 unit tests, 5 production browser tests, 100% frontend coverage in all metrics, negative fixtures rejected and zero reported npm vulnerabilities. Token propagation and planned contrast pairs passed. Mobile LCP samples 412/416/400 ms (median 412 ms), CLS 0 in all three. T003–T010 are complete. Full feature accessibility and final performance comparison remain pending.

## PR C — theme and layout

New tests are committed before implementation. No new theme/layout behavior or passing result is claimed yet.

The tests-first run 45845536344 rejected the new component imports (TS2307) before the theme and layout modules existed. Backend, Spec Kit and secret scanning passed (45845535206). Runtime assertions were not reached. This commit implements the missing contracts and integrates them in the locale layout; the final green run and manual checks remain pending.

Engineering checks 45849396759 on 354c3e75325d70ebd015074d360d0eeffecd1765 passed lint, typecheck, formatting, build and 53 unit tests at 100% in all coverage metrics. Production browser checks: 22 passed, 5 failed. Four explicit-theme locale transitions reset the selector to system, while the original keyboard test expected the language link immediately after the skip link and did not account for the new Home link. The correction uses a native full-document locale link sharing ActionLink styles, restores the theme through the existing head bootstrap, and checks both keyboard stops. The theme matrix additionally checks persisted storage and the reverse locale transition. Await CI before marking these tasks complete.

## PR C — merged and verified

PR #12 merged at fa4a8e369ae0c3bdc57b46ac4acbd56f11f80400. Engineering checks 45853034556 and secret scanning 45853034533 passed: 53 unit tests, 27 production browser tests, 100% frontend coverage in all metrics, negative fixtures rejected and zero reported npm vulnerabilities. Theme modes survive reload and both directions of locale navigation; system changes, storage denial, early bootstrap, viewport matrix, keyboard and reduced-motion tests passed. LCP samples 392/388/384ms (median 388ms), CLS 0 in all three. T011–T021 are verified. T022 manual zoom/touch/visual review remains open; automated browser evidence is not a substitute for that review.

## PR D — showcase and final verification

Axe-core 4.14.1 (MPL-2.0) is already present transitively in the approved npm lock via eslint-plugin-jsx-a11y. Promote the same version to an exact direct development dependency using npm, retain generated manifests in an artifact, review the diff and remove the temporary preparation workflow before merging. No runtime package addition. Showcase tests precede implementation; pending CI and final verification.

Engineering checks 45854994021 rejected the initial tests-first commit at typecheck (missing showcase and page modules, TS2307); no application defect or runtime test result was measured. Secret scanning 45854994032 and dependency preparation 45854994254 passed. The generated artifact 15135072880 was downloaded and independently verified against SHA-256 898a6aaeacdd5eef3bc2208779e90c315fe479380693692e745bdf3e85a086b0. Git blob hashes ee73fd747f8c551375029249f995c4312f382cf8 (package.json) and 2b89e126e6e4a0784205fbaf00ebdfe4368d0319 (package-lock.json) match the exact generated manifests. The only lock change is the root dev dependency declaration; the existing axe-core package remains unchanged. The temporary preparation workflow is removed. Final showcase, accessibility, production denial and performance results remain pending CI. Format failures now retain the real formatter diff without bypassing the required check.
