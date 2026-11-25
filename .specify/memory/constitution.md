<!--
Sync Impact Report
- Proposed revision: 1.0.0 -> 1.1.0 (MINOR: expanded engineering principles).
- Adds binding English-language conventions, code quality, architectural boundaries,
  testing and CI gates, frontend state rules, API/data contracts, operational security,
  conversational engine evaluation, accessibility and release governance.
- Preserves the original product scope and public/private separation.
- Spec Kit templates, automated checks and tool configuration must align during foundation implementation.
- No application code or CI implementation is claimed by this amendment.
-->

# Saül Portfolio Constitution

The terms MUST, MUST NOT, SHOULD and MAY distinguish mandatory requirements,
prohibited behavior, recommended defaults and permitted options. Exceptions to
a MUST require documented owner approval before implementation. This constitution
applies equally to human and AI-generated contributions.

## I. Public by design, private by default

1. All commits, branches, pull requests, specifications, screenshots, fixtures,
   workflow output and Git history MUST be safe for public disclosure.
2. Credentials, connection strings, private prompts, unpublished knowledge,
   visitor conversations, personal information not approved for publication,
   client data and proprietary third-party code MUST remain outside Git.
3. Secrets MUST be injected through server-side environment configuration or a
   managed secret store. Public configuration MUST contain only non-sensitive
   values. Example configuration MUST use placeholders.
4. A gitignore is preventive hygiene, not access control. Secrets accidentally
   disclosed MUST be revoked or rotated immediately; deleting a file is insufficient.
5. No implementation may copy code from another private project without explicit
   authorization and a review of ownership, licenses and confidentiality.
6. Only owner-approved facts, images, project details and contact channels may be
   published. A public GitHub repository does not automatically grant a license
   to reuse its contents.

## II. English as the engineering language

1. ALL source code MUST be written in English: identifiers, variables, functions,
   methods, classes, interfaces, enums, properties, namespaces, components,
   hooks, tests, comments, source filenames, directories, configuration keys,
   database tables/columns, migrations, API routes and machine-readable errors.
2. Git branch names, commit messages, pull request titles and technical
   descriptions MUST be English. Specifications, plans, tasks, architecture
   decisions, README and technical documentation MUST be English.
3. Use descriptive domain terminology and consistent spelling. Avoid ambiguous
   names such as Manager, Helper, Utils, data, obj or temp when a specific
   responsibility can be named. Conventional loop indices and framework-required
   names are acceptable in their narrow contexts.
4. UI copy, biographies, project descriptions, translations and assistant
   responses are localized content, not source-language exceptions. Proper
   names, quotations, external API identifiers and framework-mandated names
   retain their original spelling. Locale-specific public slugs MAY be localized.
5. Internal status codes and domain values MUST remain stable English identifiers;
   translated text MUST NOT determine business behavior.

## III. Specification-driven development and scope control

1. Significant features MUST have a Spec Kit specification with user stories,
   acceptance scenarios, scope, non-goals, error cases and measurable outcomes
   before implementation. Technical plans MUST address architecture, data,
   contracts, security, accessibility, performance, testing and deployment.
2. Tasks MUST be traceable to requirements. Review consistency across spec, plan
   and tasks before coding. Resolve contradictions with the constitution first.
3. Small fixes MAY use a proportional documented description of expected behavior,
   risk, affected modules and verification instead of a full feature specification.
4. Implement only approved scope. Preserve unrelated behavior and avoid unrelated
   refactoring, speculative infrastructure or future features.
5. Record consequential architectural decisions (context, alternatives, rationale,
   implications) in ADRs. Separate current behavior from target architecture.
6. Do not claim a feature works until verified; mark prototypes, mocks and
   incomplete integrations accurately.

## IV. Architecture, modularity and single source of truth

1. Use a monorepo with independently buildable React/TypeScript frontend and
   ASP.NET Core backend. PostgreSQL is the preferred relational database when
   persistence is required. Concrete versions and rendering framework belong
   to the approved foundation plan.
2. Prefer a modular monolith with one backend host. Do not introduce microservices,
   message brokers, CQRS frameworks, generic repositories or distributed
   infrastructure without a documented concrete need.
3. Organize by business capability (portfolio content, timeline, conversational
   engine, knowledge, administration). Maintain explicit module boundaries.
4. Domain owns invariants and business rules, Application orchestrates use cases
   and defines external ports, Infrastructure implements persistence and external
   adapters, and API handles transport, authentication and composition.
   Domain MUST NOT depend on frameworks, Infrastructure or API. Application
   MUST NOT depend on Infrastructure. API may reference Infrastructure for
   composition only, not to bypass Application.
5. Endpoints MUST delegate to application use cases; no business logic in
   controllers, React components, database triggers or provider adapters as a
   substitute for explicit domain/application rules. Avoid duplicated rules.
6. Dependency inversion, dependency injection and composition MUST make external
   integrations replaceable and tests independent of real services.
7. Each fact and state has one authoritative owner. The backend is the source of
   truth for persisted content, access decisions, conversation state and
   externally exposed decision events.
8. Cross-module access MUST use explicit contracts. Cyclic dependencies and
   imports into another module's private implementation are prohibited.
9. Prefer simple solutions (KISS, YAGNI) and meaningful separation of concerns.
   Apply SOLID pragmatically; reuse real common behavior rather than inventing
   abstractions for hypothetical future requirements.
10. Shared conversational capabilities MAY be extracted after at least two
    validated use cases and explicit ownership review; no private code
    dependency is assumed.

## V. Code craftsmanship and maintainability

### Naming, responsibility and structure
- Every class, function, module and component MUST have a clear purpose.
  Prefer small cohesive units, explicit contracts, early returns where helpful,
  and composition over unnecessary inheritance.
- Avoid duplication of business rules, magic numbers, magic strings and
  unexplained thresholds. Name meaningful constants; use configuration for
  environment-specific values. Do not create abstractions merely to remove
  superficial duplication.
- Public APIs MUST have explicit types and predictable behavior. Prefer
  immutable values and pure functions when appropriate. Avoid implicit
  side effects and shared mutable state.
- Comments MUST explain non-obvious intent, invariants or trade-offs rather than
  restating code. Remove obsolete comments, commented-out code and unused
  imports. TODOs MUST identify a concrete follow-up, preferably a tracked issue.
- Production code MUST NOT contain fake implementations, debug prints,
  placeholder success responses, hardcoded credentials or silently swallowed
  failures. Test doubles and demo data must be clearly isolated.
- Use consistent formatting via .editorconfig and formatter/linter configuration.
  Formatting and analyzer suppressions require narrow scope and justification.

### Size and complexity review
These thresholds are review triggers, not targets. Count physical lines of
handwritten source; exclude generated files, migrations, translation catalogs
and declarative assets. Refactoring MUST follow real responsibilities, not
arbitrary file splitting.

| Source | Review above | Split or justify above |
| --- | ---: | ---: |
| Route/page component | 150 lines | 200 lines |
| React component | 250 lines | 350 lines |
| General TypeScript module | 300 lines | 400 lines |
| Handwritten C# source | 300 lines | 500 lines |
| Function/method | 40 lines | 80 lines |

Review deeply nested conditionals, excessive parameters, repeated branching
and complex dependencies even below these thresholds. Exceptions MUST be
explained in the PR. No blanket linter disables or test exclusions to evade review.

### TypeScript and React
- TypeScript strict mode is mandatory. Handwritten application source uses
  .ts/.tsx; JavaScript is reserved for tooling requirements. No unqualified any,
  @ts-ignore or unsafe double casts to conceal errors. Validate unknown external
  data at trust boundaries.
- Enable appropriate strictness checks, lint rules including React hooks, and
  formatting. Use discriminated unions for stateful workflows where appropriate.
- Do not mutate props or state. Render from existing values instead of storing
  derived state. useEffect is for synchronizing external systems, not redundant
  state derivation or ad hoc data-fetch orchestration.
- Keep components presentational or clearly feature-scoped. Extract complex
  data transformations and workflows into testable functions and hooks.
- Memoization and lazy loading require a real benefit; do not use them everywhere.

### C# and .NET
- Enable nullable reference types and compiler/analyzer rules. Use explicit
  access modifiers, meaningful types, value objects when justified and
  idiomatic C# naming. Interface names use the I prefix.
- Follow async/await for I/O; propagate CancellationToken through request,
  database and provider calls. Do not block asynchronous operations with
  .Result or .Wait(); avoid async void except genuine event handlers.
- Validate at boundaries and enforce domain invariants. Expected failures
  should use explicit results or consistent error handling; unexpected failures
  must reach centralized exception handling. Never return success on failure.
- Dispose resources correctly, respect DI lifetimes, avoid service locators
  and mutable singletons holding session/user data.
- Use structured logging and parameterized database access. Never expose
  stack traces, provider payloads or sensitive exception details publicly.

## VI. Frontend organization and state

### Feature-oriented structure
Prefer src/app or src/routes for routing and composition (depending on the
selected framework), src/features for feature-specific components, hooks,
schemas and API operations, src/components/ui for reusable primitives,
src/components/layout for shared layout and src/lib for shared infrastructure.

- Feature-specific code stays within its feature. Promote shared helpers,
  hooks, types and components only when at least two independent features
  need them or a genuine shared design-system primitive is required.
- Do not create catch-all folders or stores. Pages compose features and must
  not contain business logic or raw HTTP calls.
- Cross-feature imports use explicit public interfaces. No circular dependencies.
- Prefer local state and colocated tests; avoid one global store.

### State decision rules
1. Persisted server data belongs to the backend. When interactive client caching
   is needed, use TanStack Query or an approved equivalent. Do not copy server
   data into Zustand or independent state as an authoritative cache.
2. Shareable navigation, filters, search, pagination and selected resources
   belong in URL parameters when appropriate.
3. Simple transient state belongs in useState/useReducer. Use a narrowly scoped
   context or Zustand only when independent branches or routes genuinely need
   shared UI state. Review prop drilling beyond two intermediate components.
4. Complex forms use React Hook Form and a schema validator such as Zod once
   justified. The server always revalidates; frontend validation is UX.
5. Compute derived state from its source. Avoid duplicating URL, form, server
   and UI state. Document cache ownership and invalidation.
6. Persist only necessary preferences; no sensitive credentials, chat history
   or personal data in browser storage by default.

### User-facing behavior
Every asynchronous view MUST define loading, empty, success, recoverable error,
unavailable and unauthorized states where applicable. Prevent duplicate
submissions; preserve safe input when retrying; show success only after
confirmation. Provide cancellation for long-running requests where feasible.
Do not use raw backend error text as user-facing copy.

## VII. API contracts, data and external integrations

1. Publish typed, documented HTTP contracts from real endpoints via OpenAPI
   where applicable. Keep frontend contracts synchronized through generation
   or verified schemas; do not duplicate incompatible handwritten types.
2. Centralize HTTP transport, timeouts, error mapping and configuration.
   Feature-specific API operations belong in their feature. No direct database
   access or provider SDK credentials in the browser.
3. Use appropriate HTTP methods/status codes and structured errors (Problem
   Details where suitable). Distinguish 401, 403, 404, validation errors,
   conflicts, rate limits and service failures. Error identifiers are stable.
4. Validate all inbound payloads and authorization on the server. Explicitly
   map DTOs; do not serialize persistence entities or sensitive fields by default.
5. Apply cancellation, bounded timeouts and limited retries with backoff for
   transient failures. Retry mutations only when idempotency is guaranteed.
   Handle duplicate and out-of-order events without corrupting state.
6. Database schema changes MUST be versioned, reviewed and tested against the
   intended PostgreSQL version. Use constraints, transactions and indexes
   according to invariants and observed queries. Avoid N+1 queries and unbounded
   collections. Paginate potentially large datasets.
7. Destructive migrations require backup/recovery and rollout plans; no
   production reset or automatic destructive migration. Test data MUST be
   synthetic or explicitly approved and sanitized.
8. External adapters MUST isolate SDKs, credentials, rate limits and errors.
   Use configurable endpoints/models and typed options validated at startup.
   Prefer a minimal dependency set and supported versions.
9. Streaming chat contracts MUST define event types, session boundaries,
   sequence/reconnection behavior, cancellation and failure states. Events
   must correspond to actual committed or observed decisions, not UI fiction.

## VIII. Conversational engine: grounding, policy and observability

1. The assistant is a professional portfolio demo, not a general-purpose chatbot.
   It MUST use only explicitly approved public knowledge. No unrestricted
   browsing, arbitrary tools, private repository access or confidential database
   access from the public conversational path.
2. The server owns session state, allowed capabilities, topic taxonomy, policy
   and final outcome. Model output is untrusted input, not a security boundary.
   Use typed structured results, schema validation and safe fallback behavior.
3. Distinguish at least: answer supported, insufficient knowledge,
   out-of-scope, restricted, and operational failure. Do not invent facts,
   experience, metrics or completed features. Follow-up interpretation MUST
   respect the current conversation context and session isolation.
4. Classify questions and track topics consistently. A topic being mentioned is
   not necessarily a topic answered. Define exact coverage semantics in the
   feature specification, including multi-topic messages and repeated questions.
5. The UI MUST display safe structured events such as topic, scope status,
   knowledge availability and response outcome, derived from the actual
   engine execution. Never expose hidden chain of thought, private prompts,
   raw provider payloads or confidential retrieval material.
6. Knowledge entries MUST have provenance, publication status and update
   metadata. Only published/approved entries may enter retrieval. Prefer
   simple structured knowledge initially; introduce vector search only if
   measured retrieval quality warrants it.
7. Treat user input, retrieved material and generated text as untrusted.
   Separate instructions from data; validate outputs; render sanitized
   content. Test prompt injection and indirect injection. Never claim that
   prompt filtering alone prevents attacks.
8. Configure per-request/session limits, input lengths, context budgets,
   timeouts, concurrency and spend controls. No unbounded loops or
   automatic retries that amplify cost. Fail safely during provider outage.
9. Provider integrations MUST be replaceable through application interfaces;
   no vendor-specific model types in domain rules.
10. Evaluate intent classification, factual grounding, abstention,
    multilingual questions, context, scope, injection resistance, session
    isolation and event fidelity. Include deterministic fixtures and controlled
    provider evaluations; do not rely on live paid calls in routine unit tests.
11. Public transcripts are not persisted by default. Before enabling review of
    visitor questions, define minimization, lawful basis/notice, retention,
    access, redaction and deletion. Store aggregate operational metrics where
    possible. Any persisted records are private and access-controlled.

## IX. Security, identity and privacy

- All protected operations MUST authenticate and authorize on the backend.
  Hiding UI controls is not security. Validate access to each resource and
  operation, including conversation/session identifiers.
- The initial portfolio is public; do not add visitor accounts without a
  specified need. Administration requires a maintained identity solution and
  least privilege. Do not implement custom password hashing or cryptography.
- Prefer secure HttpOnly, Secure, appropriately scoped SameSite cookies for
  browser administration where architecture permits; protect cookie-authenticated
  mutations against CSRF. No reusable credentials in localStorage.
- Require MFA or an equivalently reviewed strong authentication mechanism
  before exposing privileged administration in production. Define expiry,
  logout/invalidation, recovery and abuse protection.
- Validate input lengths, formats and types; sanitize generated rich text,
  reject unsafe URLs and use parameterized queries. Use HTTPS, restrictive
  CORS, appropriate security headers/CSP and dependency scanning.
- Apply rate limiting and request size limits at appropriate endpoints.
  Separate public read/chat access from administrative mutations. Fail closed
  for unauthorized or invalid operations.
- Do not log tokens, passwords, raw prompts, complete conversations or personal
  data unnecessarily. Audit relevant security and administrative operations
  using redacted metadata.
- Evaluate third-party SDKs, assets, scripts and analytics for license,
  security, tracking and privacy. Where consent is required, nonessential
  tracking MUST remain disabled until consent and honor withdrawal.
- Private pages and data must not be indexed or cached publicly. Robots rules
  and noindex are not access controls.
- Document threat models for the chat and admin surface. Critical/high
  security findings block release until remediated or explicitly risk-accepted
  by the owner with mitigation; secret exposure never qualifies for waiver.

## X. Design system, accessibility, timeline and responsive behavior

1. Use centralized design tokens for typography, spacing, colors, radii,
   shadows and motion. Maintain reusable accessible UI primitives and variants;
   avoid duplicated arbitrary styles and unrelated visual changes.
2. Mobile-first layouts MUST preserve core functionality from narrow mobile
   to desktop, with no unintended horizontal overflow. Timeline may have
   intentional horizontal scrolling with accessible navigation and a list view.
3. Aim for WCAG 2.2 AA. Use semantic HTML, keyboard navigation, visible focus,
   meaningful accessible names, form labels, sufficient contrast, text
   alternatives and accessible dialogs. Color alone cannot communicate state.
4. Ensure zoom, touch interaction, screen-reader announcements for relevant
   dynamic changes and logical focus after navigation or dialogs. Avoid
   announcing every streamed token.
5. Timeline is an illustrated experience with milestone-based forward/backward
   navigation, evolving character stages and grouped milestones by year.
   Animation is presentation only, not the source of truth for progress.
   Support reduced motion and a nonanimated accessible alternative. Provide
   pause/stop controls for automatic motion if implemented.
6. Keep illustrations and other media optimized and appropriately licensed.
   Avoid blocking navigation while assets load. Content and final art
   direction belong in approved specifications.
7. Validate core paths with automated accessibility checks and manual keyboard,
   mobile and reduced-motion review. Do not equate passing automated checks
   with complete accessibility.

## XI. Internationalization, content and SEO

- Design for Spanish and English from the beginning. Keep UI strings in
  translation resources, not scattered in components. Avoid concatenated
  translations and fixed layouts that assume equal text length.
- Public content is localized separately from technical identifiers. Store
  canonical values, format dates and numbers by locale, and preserve proper
  names. Translation publication requires review.
- Provide explicit language selection and sensible fallback, with an initial
  default locale to be confirmed in the feature specification. No broken
  translation keys or fabricated translated pages.
- Public pages MUST have semantic content, meaningful headings, descriptive
  URLs, page metadata, canonical URLs, social metadata and appropriate
  sitemap/robots configuration. When both locales are published, use correct
  language declarations and hreflang relationships.
- Choose static generation, prerendering or server rendering where justified
  for indexable public pages; do not assume Next.js or static export before
  the foundation decision. Isolate interactive chat and timeline code to
  avoid loading unnecessary JavaScript on unrelated pages.
- Case studies MUST distinguish verified implemented features, work in
  progress and planned ideas. Do not invent project metrics or claims.
- Public content changes, asset licenses and personal facts require owner
  approval. No client information or private repository details by default.

## XII. Testing, quality gates and definition of done

### Test strategy
- Backend: prefer xUnit for unit and integration tests; domain/application
  tests MUST be deterministic and independent of real network/DB when possible.
  Integration tests exercise actual PostgreSQL behavior, authorization,
  contracts and migrations with isolated databases.
- Frontend: prefer Vitest, React Testing Library and appropriate mocks at
  transport boundaries. Test behavior and accessibility, not private
  implementation details. End-to-end critical journeys use Playwright.
- Reproduce defects with regression tests whenever practical; new or changed
  domain rules require positive, negative and boundary cases.
- Test unauthorized resource access, input validation, cancellation, outages,
  duplicate requests, session isolation and localization when applicable.
- Tests MUST be independent, repeatable and free of real credentials, personal
  data and unexpected paid calls. Do not weaken assertions or delete failing
  tests to obtain a green build. Quarantined flaky tests require a tracked
  reason and remediation plan.
- Measure coverage from CI, emphasizing critical paths. Do not confuse line
  coverage with quality. The foundation plan sets an initial threshold and
  a non-regression policy once a baseline exists.

### Mandatory CI checks once configured
1. Clean, reproducible dependency restore from committed lockfiles.
2. Formatting, linting, strict TypeScript checking and .NET compiler/analyzer
   checks; no newly introduced unexplained warnings.
3. Frontend and backend production builds.
4. Unit/integration suites and critical end-to-end suites as applicable.
5. Secret scanning, dependency vulnerability checks and relevant contract
   or architecture checks. Least-privilege CI permissions; do not expose
   secrets to untrusted pull request workflows.
6. Report test failures honestly. No merge with failing required checks.
   Document checks not yet available; do not claim they have run.

### Definition of done
A change is done only when requirements and acceptance scenarios are met,
scope and architecture are respected, errors and edge cases are handled,
tests are added/updated and executed where available, relevant docs are current,
privacy and security checks pass, accessibility/responsive behavior is reviewed,
and required CI/review is complete. Report any test not executed and why.
No feature may be declared deployed without verifying the actual environment.

## XIII. Performance, resilience and operations

- Use measurable budgets for public page loading and interactive responsiveness;
  prefer real measurements to premature optimization. Target good Core Web
  Vitals (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile
  when field data is available). Treat pre-release lab measurements as
  indicative rather than equivalent to field data.
- Optimize assets, responsive images, fonts, caching and code splitting.
  Avoid unnecessarily large dependencies and repeated requests. Respect
  reduced motion and device capability.
- Monitor sanitized request latency, error rate, availability and chat token
  usage/cost. Correlate operations without publishing private session details.
- Separate development and production configuration; use preproduction when
  warranted. Never point local tests at production data. Document environment
  variables and startup commands using placeholders.
- Provide readiness/health checks, controlled deployment, database backups
  and rollback procedures when applicable. Validate migrations and smoke
  tests before release. Hosting on Render is proposed, not a domain dependency.
- Gracefully degrade the chat if a provider fails; the portfolio and timeline
  MUST remain usable independently.

## XIV. Git workflow and AI-assisted development

1. Keep main releasable. Use descriptive English feature/fix branches and
   small coherent commits. Prefer Conventional Commits (feat, fix, docs,
   refactor, test, chore, ci).
2. No routine direct writes to main after initialization. Use PRs with
   scope, rationale, verification, screenshots for UI changes when useful,
   migration/rollback considerations and known limitations.
3. Configure branch protection and required status checks when available.
   Owner review/approval is required before merge; never bypass checks,
   force-push main or self-approve on behalf of the owner.
4. AI agents and Copilot MUST read this constitution and the relevant
   specifications before editing. Inspect existing code before adding
   abstractions, respect boundaries, and preserve unrelated behavior.
5. Review AI output like human code: verify APIs, dependencies, security,
   licenses, assumptions and tests. Never fabricate results, hide failures
   or silently expand scope. State unresolved ambiguities and actual
   verification status.
6. Dependency changes MUST be justified and reviewed. Avoid adding packages
   that duplicate existing capabilities. Pin toolchains appropriately and
   keep supported versions current through reviewed updates.

## Governance

This constitution is the highest project-level engineering authority. Specs,
plans, tasks and agent instructions MUST comply. Every feature plan includes
a constitution check and every PR records material exceptions, if any.
Amendments MUST include motivation, impact report, affected artifacts and
SemVer versioning: MAJOR for incompatible governance changes, MINOR for
new/expanded principles, PATCH for non-breaking clarification. Changes
require owner approval. The Spec Kit templates, CI rules and agent
instructions must remain aligned; documentation alone is not enforcement.

**Version**: 1.1.0 (proposed) | **Ratified**: Pending owner review | **Last Amended**: 2026-11-25
