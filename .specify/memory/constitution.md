# Saül Portfolio Constitution

## Core Principles

### I. Public by design, private by default
The repository is public. All committed content, specifications, test fixtures, logs and history MUST be safe for public disclosure. Secrets, private knowledge, visitor conversations and third-party proprietary code MUST remain outside Git. Use server-side configuration, secret storage and access-controlled persistence. Never embed credentials in frontend bundles. No private project code may be copied without explicit authorization and review.

### II. Specification-driven development
Every feature MUST start with an explicit user outcome, requirements, acceptance scenarios and scope. Use Spec Kit artifacts (specification, plan and tasks) before implementation. Record architectural decisions and trade-offs. Prefer small reviewable pull requests; AI-assisted contributions remain subject to the same human review and validation as any other code.

### III. Modular, maintainable architecture
Use a React/TypeScript frontend and ASP.NET Core backend, with PostgreSQL when persistent storage is required. Keep domain logic independent of transport, persistence and AI vendors. Prefer feature-oriented boundaries, typed contracts and dependency injection. Avoid speculative abstractions and unnecessary services. A shared conversational engine may be considered after reviewing reuse rights and boundaries; no dependency on private code is assumed.

### IV. Grounded and observable conversational AI
The public assistant MUST answer from explicitly approved public knowledge, distinguish unsupported questions from out-of-scope or restricted requests, and abstain rather than invent facts. Handle contextual follow-ups and topic tracking. Expose structured, user-safe decision events (classification, knowledge availability, outcome, topics covered), not hidden reasoning, prompts, secrets or raw provider internals. Treat visitor input and retrieved content as untrusted. Enforce authorization and policy on the server; provider output is not a security boundary. Use bounded input, rate limits, token budgets and session isolation. No arbitrary tools or private data access for public chat.

### V. Quality, accessibility and performance
Features MUST have measurable acceptance criteria, automated tests appropriate to their risk, and reproducible local builds. Critical chat behavior requires deterministic policy tests and evaluation cases, including unknown facts, off-topic questions, injection attempts and cross-session isolation. CI MUST validate builds and tests before merge once configured. Support keyboard access, responsive layouts, accessible alternatives and reduced motion; timeline navigation must work without animation.

### VI. Product honesty and internationalization
Project claims MUST reflect verified functionality and current status. Clearly label concepts and demos. Keep source and technical documentation in English and design UI text for Spanish and English localization from the start. Do not publish personal milestones, client information, third-party media or contact details without owner approval.

## Technical and operational constraints

- Monorepo with frontend, backend, tests, specs and documentation.
- Use stable supported dependencies, lockfiles and documented configuration.
- Separate public and admin APIs; admin operations require authenticated authorization.
- Store only necessary visitor data. Define retention, privacy notice and deletion procedures before retaining conversations. Avoid logging raw conversation text by default.
- Use HTTPS, least privilege, dependency and secret scanning, sanitized logs, and fail closed for sensitive operations. A gitignore is not a security control by itself.
- Deploy through reviewed CI/CD; keep environment configuration outside source. Render is the proposed hosting platform, not a hard architectural dependency.
- Provide fallback behavior when AI is unavailable or over budget.

## Development workflow

1. Specify user stories, acceptance scenarios and data/publication boundaries.
2. Plan implementation, architecture and risk controls.
3. Break work into independently reviewable tasks.
4. Implement with tests and update documentation.
5. Review changes, validate CI and obtain owner approval before merge.
6. Deploy and verify behavior; capture feedback without exposing private data.

## Governance

This constitution supersedes conflicting implementation guidance. Every feature plan must include a constitution check. Exceptions require a documented rationale, risk mitigation and owner approval. Amendments are reviewed in a pull request and versioned: major for incompatible governance changes, minor for new or materially expanded principles, patch for clarifications.

**Version**: 1.0.0 (proposed) | **Ratified**: Pending owner review | **Last Amended**: 2026-11-25
