# Implementation plan: Engineering foundation

**Status:** Proposed; runtime implementation follows owner approval.

## Technical direction

- Frontend: Next.js App Router with React, strict TypeScript, Tailwind CSS.
  Choose supported versions, pin toolchain and dependencies at implementation.
  Next.js is proposed over Vite for public metadata, localization and
  prerendered project pages. Reassess static export compatibility; use
  request-time rendering only when required by approved features.
- Backend: supported .NET LTS, ASP.NET Core, C# nullable references enabled;
  Domain, Application, Infrastructure and Api projects under backend/src.
  Do not install EF Core, create database schema or add provider SDKs yet.
- Tests: xUnit, Vitest, React Testing Library and Playwright for the initial
  critical paths, with dependency-boundary verification.
- Quality: ESLint, Prettier, TypeScript checks, .NET analyzers, reproducible
  restores and GitHub Actions. Pin third-party workflow dependencies to
  reviewed immutable revisions where practical; use least privilege.
- Local environment: example configuration only; no production service
  connections. Document exact setup commands after validating them.
- Spec Kit: install the official supported tooling with an explicit version
  and review generated artifacts; preserve the existing constitution and
  align templates with it. Do not pretend hand-authored specs are a CLI setup.

## Implementation sequence

1. Add repository instructions, editor settings, PR template, architecture
   document and this specification/plan/tasks (current PR).
2. Verify supported toolchains and select exact versions. Initialize Spec Kit
   without overwriting approved artifacts.
3. Scaffold frontend and backend, respecting dependency boundaries.
4. Implement actual health endpoint and minimal accessible localized shell.
5. Configure formatting, analysis, tests and CI; verify lockfile restores.
6. Execute local or CI checks, confirm failure behavior, and document setup,
   limitations and branch-protection configuration.

## Constitution check

- Public/private separation: no secrets or private project data.
- English: all engineering artifacts are English.
- Scope: no product features beyond the skeleton; no speculative services.
- Architecture: one API host, dependency direction and feature isolation.
- Quality: actual test and build results required before completion.
- Security: public health reveals no sensitive details; CI least privilege.
- Accessibility/i18n: initial shell supports keyboard, responsive layout and
  localization resources.
- AI: no live model calls or private knowledge in this feature.
- Release: no claim of production deployment.

## Decisions pending

Exact supported versions, static export versus server deployment after
evaluating requirements, initial locale/default routing, initial coverage
baseline, branch protection availability and the precise secret-scanning
configuration. Record decisions in the implementation PR.
