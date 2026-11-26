# Feature Specification: Visual Foundation

**Feature Branch**: `003-visual-foundation`

**Created**: 2026-11-26

**Status**: Draft — owner review required

**Input**: Owner-approved premium technological and creative visual direction, light and dark themes, emerald green accent, moderate animations, and centralized frontend styling and reusable controls.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent visual language (Priority: P1)

As a visitor, I want the portfolio to feel like a cohesive, polished product so that I can explore it without learning different interaction patterns on each screen.

**Why this priority**: Consistency is the foundation for all future public features and demonstrates engineering quality.

**Independent Test**: Review the existing localized shell and the component showcase in both themes; compare primary actions, secondary actions, links, surfaces and type hierarchy.

**Acceptance Scenarios**:

1. **Given** two instances of an action with the same semantic variant and size, **When** they appear in different contexts, **Then** they use the same visual rules and interaction states.
2. **Given** a reviewed change to a shared color, type scale or button variant, **When** the change is applied, **Then** all consumers of that design decision reflect it without individual page edits.
3. **Given** an action is hovered, focused, pressed, disabled or busy, **When** its state changes, **Then** its presentation remains consistent, its accessible meaning is retained, and unavailable actions cannot be activated.
4. **Given** the visual foundation in either theme, **When** a visitor views it, **Then** the base aesthetic is premium and technological, with restrained emerald accents and deliberate space for creative experiences.

---

### User Story 2 - Comfortable theme preferences (Priority: P1)

As a visitor, I want to use a light or dark appearance that matches my preference and remains consistent when I return or navigate.

**Why this priority**: Both themes are owner-approved and must be first-class experiences, not a later retrofit.

**Independent Test**: Open the site with each system preference, choose a theme, refresh, navigate between languages, and return using the same browser.

**Acceptance Scenarios**:

1. **Given** no explicit saved preference, **When** the site first appears, **Then** its theme matches the system preference when available, otherwise light.
2. **Given** the theme selector, **When** the visitor selects Light, Dark or System, **Then** the appearance changes and the selector communicates the selected mode.
3. **Given** an explicit choice, **When** the visitor reloads or switches locale, **Then** that choice remains effective, including the first rendered appearance under normal supported browser conditions.
4. **Given** System mode, **When** the system appearance changes, **Then** the portfolio follows it without requiring a reload; explicit Light or Dark overrides system changes.
5. **Given** preference persistence is unavailable or invalid, **When** the page loads or the user selects a theme, **Then** the site remains usable and a valid theme is applied without an uncaught error.

---

### User Story 3 - Navigate on any device and in either language (Priority: P1)

As a visitor, I want clear navigation and language selection on mobile and desktop so that I can reach published content in Spanish or English.

**Why this priority**: The shared shell will support all later portfolio sections.

**Independent Test**: Navigate the existing localized home, switch language and operate the shared header and footer at narrow, tablet and desktop widths with pointer and keyboard.

**Acceptance Scenarios**:

1. **Given** either supported locale, **When** the visitor uses the language selector, **Then** the equivalent available route opens in the other language and its document language and navigation labels agree.
2. **Given** a 320 CSS pixel viewport or desktop viewport, **When** the visitor navigates, **Then** the header, selectors, content and footer remain usable without unintended horizontal overflow.
3. **Given** keyboard-only navigation, **When** the visitor tabs through the page, **Then** a skip link, visible focus, logical order and usable controls are available.
4. **Given** future sections are not published, **When** the visitor sees navigation, **Then** no active link leads to a fabricated, empty or nonexistent page. Navigation can grow when subsequent features publish routes.
5. **Given** an unsupported locale or unknown route, **When** requested, **Then** existing not-found behavior is preserved and the root still redirects to Spanish.

---

### User Story 4 - Accessible, restrained motion (Priority: P2)

As a visitor sensitive to movement or using assistive technology, I want an accessible experience that does not depend on animation or color alone.

**Why this priority**: Creative presentation must not prevent access to core content or controls.

**Independent Test**: Exercise both themes with reduced motion enabled and disabled, keyboard navigation, browser zoom and accessibility checks.

**Acceptance Scenarios**:

1. **Given** normal motion preferences, **When** a control changes state, **Then** short, moderate transitions enhance feedback without delaying navigation or obscuring content.
2. **Given** reduced motion, **When** the same interactions occur, **Then** nonessential motion is removed or reduced and all outcomes remain available.
3. **Given** either theme, **When** text, interactive controls and focus indicators are inspected, **Then** contrast, accessible names and state indicators satisfy applicable WCAG 2.2 AA criteria.
4. **Given** a 200% zoom level, **When** a visitor uses primary controls, **Then** text and controls remain readable and functional without content loss.

---

### User Story 5 - Maintain and review shared UI (Priority: P2)

As a maintainer, I want a single documented design language and a development-only reference of supported components so that new features reuse consistent behavior instead of copying styles.

**Why this priority**: It directly addresses the owner's requirement to centralize button aesthetics and other frontend conventions.

**Independent Test**: Start the documented development environment, inspect the component examples in both themes and verify that the showcase is not reachable in the production build.

**Acceptance Scenarios**:

1. **Given** the development showcase, **When** a maintainer reviews it, **Then** supported variants, sizes and applicable states of each shipped shared primitive are visible.
2. **Given** a new feature needs a button, link or shared layout element, **When** it consumes an existing supported variant, **Then** it does not duplicate its visual rules or accessibility behavior.
3. **Given** a production build, **When** a visitor requests the showcase, **Then** no development showcase page is available.
4. **Given** a future primitive is not yet needed, **When** the foundation is reviewed, **Then** the design system remains extensible without speculative empty components or unrelated product functionality.

### Edge Cases

- A saved theme is malformed, missing, or unavailable; system preference detection is unavailable or changes after the first render.
- Scripts fail or storage access is denied: core readable content and ordinary navigation remain available; preference persistence may be unavailable.
- Longer Spanish or English labels, 200% zoom, small touch screens, keyboard focus and reduced motion.
- Disabled or busy buttons receive repeated pointer or keyboard input; navigation links retain link semantics rather than masquerading as buttons.
- Locale changes must not reset theme, publish untranslated placeholders or introduce broken URLs.
- Future routes are not published yet; production users must not reach development examples.
- Existing noindex protection remains until an approved release; no unapproved biography, project or contact information is introduced.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST use one authoritative, documented set of shared design decisions covering semantic colors, typography, spacing, radii, borders, shadows and motion.
- **FR-002**: The visual identity MUST combine a restrained premium technological base with creative accents, using emerald green as the primary accent family; the future timeline and conversational experiences may have richer feature-specific presentation.
- **FR-003**: The portfolio MUST offer coherent Light, Dark and System appearance modes with appropriate theme-specific contrast.
- **FR-004**: With no valid explicit preference, the portfolio MUST follow the system appearance when available, otherwise Light; System mode MUST respond to system changes.
- **FR-005**: An explicit appearance choice MUST persist in the same browser across reloads, revisits and locale changes when persistence is available. The feature MUST require no account or server-side visitor preference.
- **FR-006**: Shared buttons MUST support primary, secondary, outline, ghost and destructive variants and small, medium and large sizes. Applicable default, hover, pressed, focus, disabled and busy states MUST have centrally defined presentation and behavior. Buttons and navigation links MUST retain native semantic roles; busy actions MUST prevent repeat activation and communicate their state.
- **FR-007**: Shared visual rules MUST also cover links, cards/surfaces, accessible focus and layout spacing. Initial reusable elements MUST serve the shell or showcase; forms, dialogs, tooltips and other advanced primitives are introduced only when an approved feature needs them. Consumers MUST use supported variant and size choices rather than duplicate arbitrary styling.
- **FR-008**: The shared header, main content container and footer MUST form a responsive layout suitable for future sections. Navigation MUST expose only available destinations and preserve the existing home route in both locales.
- **FR-009**: Spanish and English MUST be supported throughout the shell, theme controls and all visitor-facing copy introduced in this feature. Language switching MUST preserve the equivalent available route; existing Spanish root redirect and unsupported-locale behavior MUST remain intact.
- **FR-010**: Normal transitions MUST be moderate and nonblocking. Nonessential motion MUST respect the user's reduced-motion preference. No autoplay, timeline animation or decorative continuous motion is required here.
- **FR-011**: Core controls and navigation MUST satisfy applicable WCAG 2.2 AA requirements, including visible focus, keyboard use, semantic landmarks, accessible names, text contrast, non-text contrast and reflow. Color MUST NOT be the sole indicator of meaning.
- **FR-012**: A documented development-only showcase MUST display every shipped shared visual primitive and supported variant, size and applicable state in both themes. Production users MUST NOT be able to access it.
- **FR-013**: Shared design decisions and supported usage MUST be documented for maintainers. Verification MUST include automated behavior, accessibility and navigation tests, plus manual keyboard, viewport, theme and reduced-motion review. Existing required quality gates and verified coverage floors remain in force unless changed through a separate approved justification.
- **FR-014**: On supported browsers with normal script and preference access, first paint MUST use the resolved appearance without a visible incorrect-theme flash. Failure to resolve preferences MUST degrade to a readable, usable theme.
- **FR-015**: The portfolio MUST remain visually consistent when changing theme, language and viewport; no theme choice may remove functionality or compromise the shared design contract.
- **FR-016**: This feature MUST preserve the noindex bootstrap state, existing route behavior and backend health contract, and MUST introduce no external service, tracking, credentials or unapproved public personal information.

### Key Entities

- **Design decision**: A semantic visual role and its approved values for each applicable theme or state.
- **Appearance preference**: Light, Dark or System; distinct from the currently resolved light/dark appearance and scoped to the visitor's browser.
- **Shared UI primitive**: An element with defined semantics, supported variants, sizes and interaction states.
- **Navigation destination**: A published localized route and reviewed label.
- **Showcase example**: A development reference for a supported design-system element, never a public product feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All new shared buttons in the shell and showcase use the documented shared variant definitions; one representative accent and variant change propagates to all matching consumers without editing their individual usage sites.
- **SC-002**: All six combinations of initial system appearance (light/dark) and selected mode (Light/Dark/System) produce the expected appearance, including reload and locale switch; malformed or unavailable preference storage produces a usable fallback.
- **SC-003**: At 320, 768 and 1440 CSS pixels in both languages and both themes, the shell has no unintended horizontal overflow, clipped controls or broken navigation; primary navigation remains usable at 200% zoom.
- **SC-004**: All primary controls are keyboard operable with a visible focus indication; normal text meets a 4.5:1 contrast ratio (3:1 for qualifying large text) and applicable non-text UI contrast meets 3:1. Automated accessibility review reports no violations in the agreed core test scenarios; manual review addresses applicable criteria automation cannot verify.
- **SC-005**: In all tested first-load and reload scenarios with valid preferences and normal browser capabilities, no incorrect-theme flash is visible; reduced-motion mode removes nonessential motion without changing available actions.
- **SC-006**: Every supported shared primitive, variant, size and applicable state is demonstrated in the development showcase; the showcase is unreachable from production routes and production navigation.
- **SC-007**: Both locale routes, the Spanish root redirect and unsupported-locale handling continue to work; no active navigation link targets an unavailable route.
- **SC-008**: All previously required quality checks and new feature acceptance tests pass, and the existing coverage floors remain enforced. The public shell does not introduce new network-dependent services.
- **SC-009**: In a production preview under a documented repeatable mobile test profile, three runs have a median largest contentful paint of at most 2.5 seconds and median cumulative layout shift of at most 0.1. Record the environment and compare with the current bootstrap; laboratory measurements are not a claim about real-user performance.

## Assumptions

- Spanish remains the default locale, consistent with the implemented foundation; English is equally supported.
- The owner selected the aesthetic direction, emerald accent, both themes and moderate motion. Exact palette values, typography, icon treatment and spacing scale remain proposed design decisions to review in the plan and visual preview. The previous concept palette is a starting point, not an approved final palette.
- System appearance is the first-visit default; explicit choices are browser-local and contain no identity or account data.
- The current minimal localized content remains until the separately approved homepage feature; a navigation shell does not imply publication of future pages.
- Browser support and visual review environments will be documented in the technical plan. Existing CI and repository governance apply.
- No new third-party dependencies are presumed. Any necessary dependency must be justified and reviewed during planning.

### Scope boundaries and non-goals

This feature delivers the shared visual system, theme behavior, development reference and responsive localized shell only. Final homepage messaging, personal illustrations, biographical data, timeline interactions, project case studies, methodology content, assistant behavior, admin, authentication, persistence services, analytics and production deployment are separate features. No speculative UI library, empty public destination or unrelated backend change is authorized.
