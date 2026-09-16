# Website Components - KAIROS Platform

## 1. Header Navigation

The header maintains persistent navigation across all views.

**Elements**:
- **Logo**: KAIROS wordmark with crimson editorial accent dot.
- **Nav Links**: Home, Articles, Research, Specs & Docs, About.
- **Search Trigger**: Quick command/search modal trigger button.
- **Action Button**: "Subscribe" CTA button.

---

## 2. Article Card Component

Used in article lists, topic feeds, and featured grids.

**Structure**:
1. Thumbnail Image (Aspect Ratio 16:9 or 4:3)
2. Category Pill (`RESEARCH`, `AI`, `FINANCE`, `STRATEGY`)
3. Article Title (Playfair Display 20px)
4. Short Description (Muted text, 2 lines max)
5. Metadata Bar (Author Name · Date · Read Time)

---

## 3. Article Reader Layout

The reading view is optimized for focus and academic comprehension.

**Elements**:
- **Top Bar Progress**: Crimson reading progress line at top of viewport.
- **Breadcrumb Navigation**: `Home > Articles > [Category]`.
- **Hero Title Block**: Category badge, large display title, description subtitle, author avatar & timestamp.
- **Sticky Table of Contents**: Left/Right sidebar tracking active `h2` headings dynamically on scroll.
- **Reading Controls**: Font size toggle (Small / Medium / Large) & Reading Mode toggle.
- **Key Takeaways Callout**: Muted rose container highlighted with a crimson left border.
- **Pull Quotes**: Centered italic quotes set in Playfair Display.
- **References Section**: Numbered academic citation block.

---

## 4. Documentation & Spec Explorer Modal

An in-app interactive tabbed modal allowing users to browse system documentation:
- Navigation tabs: `WEBSITE_SPEC`, `DESIGN_SYSTEM`, `COMPONENTS`, `CONTENT_GUIDELINES`, `ARTICLE_TEMPLATE`, `NAVIGATION`, `README`.
- Live markdown renderer formatted with syntax highlighting & alerts.
