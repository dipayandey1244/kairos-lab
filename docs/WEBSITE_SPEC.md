# Website Specification - KAIROS Platform

## 1. Objective

Build a modern, research-oriented editorial website that presents research projects, publications, articles, and high-impact insights. The platform bridges the gap between academic depth and top-tier magazine aesthetics.

## 2. Target Audience

- Researchers & Academicians
- Industry Leaders & Policy Makers
- Technology & Finance Professionals
- Students & Graduate Scholars
- Potential Academic Collaborators

## 3. Visual Direction

- **Minimalist Academic Luxury**: Refined typography, rich margins, zero visual clutter.
- **Warm Color Palette**: Warm ivory background (`#FDFBF7`), deep slate text (`#1A1918`), muted crimson accent (`#C03935`).
- **Editorial Typography**: Premium serif headings paired with highly readable sans-serif body text.
- **High Signal-to-Noise Ratio**: Subtle borders (`#EAE6E1`), zero garish drop shadows or distracting neon gradients.

## 4. Core Pages & Layout Views

1. **Editorial Home**: Hero showcase, stats bar, latest articles grid, featured research, popular reads, topic pills, newsletter CTA.
2. **Article Reader View**: Full-width reading layout, sticky Table of Contents with active section tracking, reading progress bar, font size adjuster, key takeaways box, citations.
3. **Docs & Spec Explorer Modal**: Interactive viewer rendering `WEBSITE_SPEC.md`, `DESIGN_SYSTEM.md`, `COMPONENTS.md`, etc., live inside the web app.

## 5. Engineering & Consistency Rules

- **Component Reusability**: UI elements (Article Cards, Callout Boxes, Author Badges) must strictly follow component rules in `docs/COMPONENTS.md`.
- **Markdown Source of Truth**: Content and specifications are stored in pure Markdown with YAML frontmatter.
- **Responsive Fluidity**: Desktop, tablet, and mobile views adapt seamlessly without breaking grid alignments.
