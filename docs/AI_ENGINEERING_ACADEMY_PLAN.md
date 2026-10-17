# AI Engineering Academy — implementation plan

## Repository inspection

- Repository: `dipayandey1244/kairos-lab`
- Default branch: `main`
- Hosting: GitHub Pages; the current Pages workflow publishes the repository root.
- Existing site: static HTML/CSS/JS with Vite tooling available for other content, editorial serif/sans typography, warm paper background and restrained crimson accents.
- Compatibility decision: implement the Academy as a self-contained static page under `ai-engineering/` so it can deploy with the existing root-publishing workflow and does not introduce dependencies or break existing research pages.

## Delivery stages

1. **Workspace shell** — three-column desktop layout, responsive navigation, lesson canvas and persistent research companion.
2. **Module 0: AI engineering orientation** — four lessons: role distinctions, product lifecycle, system boundaries, and a diagnostic architecture lab.
3. **Research library** — lesson-specific resources with authors/organizations, year or living-documentation label, resource type, difficulty, estimated reading time, original link, extraction prompt and exercise.
4. **Practice and assessment** — four practice levels, revealable reference answers, architecture tabs, diagnostic quiz, glossary and bibliography.
5. **Local persistence** — lesson completion, reading marks, bookmarks and quiz answers stored in browser local storage, with a reset control.
6. **Expansion** — fill in the remaining curriculum, beginning with LLM foundations and PyTorch, then transformers, RAG, agents, orchestration, evaluations, reliability and research methodology.
7. **Validation** — check mobile layout, navigation, state persistence, source links, keyboard access and deployment.

## Current implementation scope

- Academy entry point: `/ai-engineering/`
- The homepage navigation links to the Academy.
- Module 0 has four substantive lessons and a diagnostic assessment.
- The bibliography currently contains selected foundational and official entry points; it is a seed library, not yet the full 16-week bibliography.
- Modules beyond orientation are visibly marked as planned, not falsely presented as completed.
- All browser progress is local to the learner's browser. It is not synchronized across devices.
- Code examples are explanatory; the current page does not execute Python in the browser.

## Acceptance checks for the first milestone

- Existing research pages remain untouched.
- Academy can be opened directly at `/ai-engineering/`.
- Desktop has navigation, lesson content and a reading panel; mobile collapses the reading panel into a drawer.
- Lesson completion, resource-read state and bookmarks persist locally.
- Exercises and reference answers are available; the diagnostic quiz provides scored feedback.
- External resources open in a new tab with `noopener noreferrer`.
