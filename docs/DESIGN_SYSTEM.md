# Website Design System - KAIROS Platform

## 1. Design Philosophy

The website should feel:
- **Clean**: Spacious layouts with generous whitespace.
- **Academic**: Rigorous, authoritative structure and citations.
- **Modern**: Smooth micro-interactions and crisp responsive grids.
- **Credible**: Warm muted tones instead of noisy consumer app styling.

Avoid:
- Excessive or jarring bouncy animations.
- Dark high-contrast pure black backgrounds.
- Unstructured layouts or inconsistent line heights.

---

## 2. Color Palette Tokens

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `--bg-main` | `#FDFBF7` | Warm Ivory main page background |
| `--bg-surface` | `#FFFFFF` | Card & content surface background |
| `--bg-muted` | `#F5F0EB` | Light rose/ivory tint for callouts & stats |
| `--bg-accent-tint` | `#FAF4F2` | Subtle crimson highlight background |
| `--text-primary` | `#1A1918` | Deep Charcoal primary body text |
| `--text-secondary` | `#5C5854` | Muted slate secondary metadata text |
| `--text-muted` | `#8C8680` | Subtle timestamps and borders |
| `--accent-crimson` | `#C03935` | Signature crimson primary accent |
| `--accent-crimson-dark` | `#961C19` | Hover state for buttons & links |
| `--border-subtle` | `#EAE6E1` | Divider lines and card borders |

---

## 3. Typography System

### Fonts
- **Serif Headings**: `'Playfair Display', Georgia, serif`
- **Sans-Serif UI & Body**: `'Plus Jakarta Sans', -apple-system, sans-serif`
- **Monospace Code**: `'JetBrains Mono', monospace`

### Scale
- **Display 1**: 48px / 1.15 line-height (Playfair Display, Bold)
- **H1**: 36px / 1.2 line-height (Playfair Display, SemiBold)
- **H2**: 26px / 1.3 line-height (Playfair Display, Medium)
- **H3**: 20px / 1.4 line-height (Plus Jakarta Sans, SemiBold)
- **Body Large**: 18px / 1.7 line-height (Plus Jakarta Sans, Regular)
- **Body Base**: 16px / 1.6 line-height (Plus Jakarta Sans, Regular)
- **Caption / Meta**: 13px / 1.4 line-height (Plus Jakarta Sans, Medium)

---

## 4. Spacing Scale

Based on an 8px grid system:
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 40px
- **XXL**: 64px

Max Content Width for Reading: **760px**
Max Page Container Width: **1240px**

---

## 5. Components & Interactive States

- **Category Pills**: Uppercase 11px crimson tracking, background `#FAF4F2`, border `#F2D8D6`.
- **Buttons**:
  - Primary: Background `#C03935`, Text `#FFFFFF`, hover `#961C19`.
  - Secondary: Background `#F5F0EB`, Text `#1A1918`, border `#EAE6E1`.
- **Cards**: Surface `#FFFFFF`, border `1px solid #EAE6E1`, subtle hover translate Y (-2px).
