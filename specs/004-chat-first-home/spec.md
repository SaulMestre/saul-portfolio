# Feature Specification: Chat-first Home

**Feature Branch**: `004-chat-first-home`

**Created**: 2026-11-26

**Status**: Draft — owner review required

**Input**: The owner wants the chat to be the principal element of the home page: a simple "Pregúntame" box, followed by featured projects. Keep the initial layout simple and leave the final creative direction open.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the conversational entry point (Priority: P1)

As a visitor, I want to immediately see the invitation to ask a question so that I understand the portfolio's distinctive interaction.

**Why this priority**: The conversational experience is the owner's primary product direction.

**Independent Test**: Open the Spanish and English home pages in each theme at desktop and mobile widths; inspect the content order and availability state.

**Acceptance Scenarios**:

1. **Given** either localized home page, **When** it loads, **Then** "Pregúntame" or "Ask me" is the primary heading and the conversational entry point precedes featured projects.
2. **Given** the conversational engine is not yet available, **When** the visitor sees the entry point, **Then** its unavailable state is explicit, no question can be submitted, and no fabricated answer or successful submission is shown.
3. **Given** either theme and a narrow viewport, **When** the visitor reads the home page, **Then** the entry point remains readable and visually prominent without horizontal overflow.

---

### User Story 2 - Discover selected projects (Priority: P2)

As a visitor, I want to discover featured projects beneath the conversational entry point so that I can explore the owner's work.

**Why this priority**: Project discovery supports the main experience without competing with it.

**Independent Test**: Inspect the featured projects area with zero and with approved project entries using synthetic test fixtures.

**Acceptance Scenarios**:

1. **Given** approved featured projects, **When** the home page displays them, **Then** each entry has its approved title, brief description and a link only when a real destination exists.
2. **Given** no approved entries, **When** the page loads, **Then** the section uses an honest localized empty state without fictional projects, client facts or broken links.

---

### User Story 3 - Use a simple, accessible home (Priority: P2)

As a visitor, I want the home page to be usable regardless of language, theme, screen size or input method.

**Independent Test**: Use the existing theme and language controls, keyboard navigation and responsive browser checks.

**Acceptance Scenarios**:

1. **Given** either locale and theme, **When** the visitor navigates, **Then** the shared shell remains usable and preference behavior is preserved.
2. **Given** reduced motion or keyboard navigation, **When** the visitor accesses the home, **Then** no decorative animation or inaccessible control prevents access.

### Edge Cases

- The assistant is unavailable; the input must not collect or transmit questions.
- There are no approved project entries; do not publish mock case studies.
- Long localized text, small screens and zoom must not obscure content.
- Existing development-only showcase and noindex behavior remain unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST prioritize the conversational invitation "Pregúntame" (Spanish) and "Ask me" (English).
- **FR-002**: The conversational entry area MUST be a simple, clearly recognizable question box; until a separately approved conversational feature is implemented, it MUST explicitly communicate unavailability and MUST NOT accept or transmit questions.
- **FR-003**: A featured-projects section MUST follow the conversational entry area; only approved project content and working destinations may appear.
- **FR-004**: With no approved featured projects, the page MUST use a truthful localized empty state.
- **FR-005**: The page MUST reuse the shared visual system, responsive layout and theme/language controls; no duplicate styling system or runtime dependency is introduced.
- **FR-006**: All visitor-facing copy MUST be localized in Spanish and English, with no unapproved biographical or client details.
- **FR-007**: The page MUST preserve applicable WCAG 2.2 AA criteria, keyboard access, reduced motion and current route behavior.
- **FR-008**: Existing noindex protection and CI quality gates MUST remain in effect. The change MUST NOT deploy the site, integrate AI, persist messages or add external services.
- **FR-009**: The initial visual treatment MUST be restrained and easy to revise; final branding, decorative illustration, detailed hero copy and animation are deferred.

### Key Entities

- **Conversational entry**: localized invitation, visible availability state and question-area presentation.
- **Featured project**: approved title, description and optional valid destination; no real records are presumed approved in this feature.

## Success Criteria *(mandatory)*

- **SC-001**: In both locales, the conversational heading and question area precede the featured-projects heading in document order and are visually dominant at 320, 768 and 1440 CSS pixels.
- **SC-002**: Before assistant integration, the question area has a localized unavailable explanation and generates zero assistant requests or stored messages.
- **SC-003**: With no approved entries, zero fictional project cards or unavailable links are displayed; synthetic test entries exercise the approved-content rendering contract.
- **SC-004**: Both themes and locales pass the existing responsive, keyboard and automated accessibility checks; all required CI checks pass without lowering the approved coverage floors.
- **SC-005**: Existing noindex, locale redirects, production showcase denial and backend health behavior are preserved.

## Assumptions

- The owner approved the chat-first hierarchy and simplicity, not final copy beyond the primary invitation or a finished creative style.
- The first increment is a home-page presentation, not a working assistant. The conversational engine, approved knowledge, safety rules, interaction events and AI provider require their own specification before implementation.
- Project inventory and public facts remain unapproved. No invented project content is committed.
- Existing visual foundation decisions remain in effect. Outstanding manual visual acceptance and zoom review remain tracked in feature 003.

## Scope boundaries

Home page only. No chat backend, model calls, session persistence, event panel, case study pages, timeline, admin, new public navigation destinations or deployment. Prioritize a separately specified minimal conversational feature after this home-page increment rather than expanding unrelated sections first.
