# Repository instructions

Before making any change, read:
1. [Constitution](.specify/memory/constitution.md) — binding requirements.
2. [Product brief](docs/product-brief.md) — product scope.
3. [Architecture](docs/architecture.md) — current and proposed boundaries.
4. The applicable specification, plan and tasks under `specs/`.

## Working rules

- Write all code, identifiers, filenames, comments, commits, PR descriptions and technical documents in English. Keep localized UI copy in translation resources.
- Inspect the existing code and approved scope before editing. Do not invent functionality, create unrelated abstractions or refactor unrelated modules.
- Preserve module boundaries: API -> Application -> Domain; Infrastructure implements ports and is registered in the composition root. Do not access persistence or AI providers directly from the frontend.
- Keep frontend code feature-oriented; use one source of truth for each piece of state.
- Never commit secrets, private prompts, real visitor conversations, unapproved personal facts or proprietary code from other projects. Use synthetic examples.
- Write and run relevant tests, format and lint code, check strict typing and build the affected projects. Report commands and actual results; do not claim unexecuted checks passed.
- Preserve security, accessibility, localization, performance and error states. Review public-facing AI outputs and events against the constitution.
- Use small English-named branches and pull requests. Do not merge on behalf of the owner or bypass required checks.
- For changes beyond a small fix, confirm that requirements, plan and tasks exist and are approved before implementation. If a rule conflicts with the constitution, stop that conflicting change and document the conflict.
- Follow the PR checklist and record limitations. Update architecture documentation only when a decision or implementation changes.

## Spec Kit

- The approved constitution overrides generic upstream templates. Tests are mandatory; use the project task-template override.
- Announce extension hooks when they run. Respect optional hook prompts and all permissions; review third-party extensions before installation. Never use an extension to bypass review or merge gates.
- Preserve the managed integration manifests. Run `python scripts/verify_spec_kit.py` when changing Spec Kit files or overrides.
