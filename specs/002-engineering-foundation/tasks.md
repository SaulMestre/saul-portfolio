# Tasks: Engineering foundation

## Phase 1 — Governance and design

- [x] T001 Draft agent and Copilot instructions.
- [x] T002 Draft editor settings and pull request template.
- [x] T003 Document architecture, specification, plan and tasks.
- [x] T004 Owner reviews and approves the foundation proposal.

## Phase 2 — Scaffolding (after approval)

- [x] T005 Verify supported Node/.NET/Spec Kit versions and pin toolchains.
- [x] T006 Initialize official Spec Kit tooling; preserve and align existing artifacts.
- [x] T007 Scaffold strict TypeScript frontend with localization resources.
- [x] T008 Scaffold .NET solution and allowed project references.
- [x] T009 Implement a real minimal health endpoint and safe configuration.
- [x] T010 Implement minimal accessible, responsive frontend shell.

## Phase 3 — Quality and verification

- [x] T011 Configure formatting, lint, type checks and .NET analyzers.
- [x] T012 Add backend unit/integration and architecture tests.
- [x] T013 Add frontend behavior/accessibility tests and critical smoke E2E.
- [x] T014 Configure CI with reproducible restores, build, test and security checks.
- [ ] T015 Run checks and document actual results, failure behavior and coverage baseline.
- [ ] T016 Document verified development commands and proposed branch protections.
- [x] T017 Owner reviews implementation PR; merge only after required checks.

## Verification notes

PR #3 was merged after engineering checks (45653173663) and secret scanning
(45653173649) passed. T006: official Spec Kit integration verified in CI run 45802488317; PR #6 merged. Interactive Copilot invocation remains a separate manual verification.
T015 and T016 remain open for the coverage baseline, explicit negative tests,
local command verification and branch protection configuration.

Owner confirmation (2026-11-26): active main protection ruleset created; Specify 1.4.4 installed locally and Copilot skill discovery confirmed. Actual skill execution remains pending. Initial frontend and backend coverage reports were obtained from runs 45807068825 and 45807068727. The TypeScript negative fixture was correctly rejected with TS2322; the verifier's expected diagnostic marker is corrected in PR #7. Backend negative fixture passed. Final coverage and negative checks remain pending the revised CI run.
