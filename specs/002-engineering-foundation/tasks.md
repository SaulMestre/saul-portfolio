# Tasks: Engineering foundation

## Phase 1 — Governance and design

- [x] T001 Draft agent and Copilot instructions.
- [x] T002 Draft editor settings and pull request template.
- [x] T003 Document architecture, specification, plan and tasks.
- [x] T004 Owner reviews and approves the foundation proposal.

## Phase 2 — Scaffolding (after approval)

- [x] T005 Verify supported Node/.NET/Spec Kit versions and pin toolchains.
- [ ] T006 Initialize official Spec Kit tooling; preserve and align existing artifacts.
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
(45653173649) passed. T006: official files and Copilot skills are committed on the integration branch.
The original archive passed isolated core Python workflow tests. The committed
integration must pass its manifest and workflow CI checks before closing T006.
T015 and T016 remain open for the coverage baseline, explicit negative tests,
local command verification and branch protection configuration.
