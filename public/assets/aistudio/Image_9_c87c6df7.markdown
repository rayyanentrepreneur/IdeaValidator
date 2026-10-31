---
name: Precision Analytical Minimal
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system embodies the calculated rigor of modern enterprise productivity tools, drawing direct philosophical lineage from Linear, Notion, and Stripe. The target audience comprises founders, product strategists, and venture analysts who require uncompromised data density paired with visual poise.

The visual style is **Corporate / Modern Minimalist** driven by functional clarity:
- **Pragmatic Utility:** Pure utility without decorative noise. Visual weight is reserved strictly for actionable state and analytical conclusions.
- **Calibrated Restraint:** Information density remains compact and orderly, utilizing hairline dividers, crisp borders, and subtle contrast shifts to articulate structure rather than heavy fills.
- **Confidence & Rigor:** Interactions feel instantaneous and sharp. States transition smoothly with subdued micro-feedback, cultivating trust, deep work focus, and analytical momentum.

## Colors

The palette leverages high-clarity neutrals punctuated by an authoritative indigo primary and calibrated semantic signals.

### Core Roles
- **Canvas Base (`#F8F9FA`):** Foundations and page backgrounds rest on an ultra-soft cool off-white that prevents display glare during prolonged research sessions.
- **Surface Elevation (`#FFFFFF`):** Work surfaces, table panels, flyouts, and modal sheets are crisp white, framed by micro-hairline borders (`#E2E8F0` / `#E5E7EB`).
- **Primary Typography (`#0F172A`):** Deep near-black slate yields maximum legibility without the harshness of pure black.
- **Secondary & Auxiliary Typography (`#64748B` / `#6B7280`):** Neutral slate for metadata, inline timestamps, and structural labels.
- **Primary Interactive (`#4F46E5` / `#6366F1`):** Indigo accents drive key conversions, active tabs, and focused inputs, backed by an interactive surface tint (`#EEF2FF`).

### Semantic Evidence Indicators
- **Supported / Validated Evidence:** Emerald Green (`#10B981`), paired with tint fill (`#ECFDF5`) and boundary (`#A7F3D0`).
- **In-Progress / Warning:** Warm Amber (`#F59E0B`), paired with tint fill (`#FFFBEB`) and boundary (`#FDE68A`).
- **Invalidated / High Risk:** Crimson Red (`#EF4444`), paired with tint fill (`#FEF2F2`) and boundary (`#FECACA`).
- **Neutral / Backlogged:** Slate Neutral (`#94A3B8`), paired with tint fill (`#F1F5F9`) and boundary (`#E2E8F0`).

## Typography

The typographic system utilizes **Inter** across all layers, with **JetBrains Mono** applied selectively for quantitative figures, metrics, and data IDs. 

- **Negative Tracking:** Headings use slight negative letter-spacing (`-0.01em` to `-0.02em`) to produce a chiseled, editorial finish typical of high-end software.
- **Systematic Scale:** Ranging strictly from 11px micro-labels to 24px primary headers, the scale intentionally foregoes oversized marketing display sizes to preserve enterprise screen real estate.
- **Tabular Numerics:** For tabular metrics, probability percentages, and confidence scores, apply `font-feature-settings: "tnum"` to guarantee visual vertical alignment across complex tables.

## Layout & Spacing

The layout model is architectured around a **fluid 12-column analytical canvas** anchored by fixed collapsable utility panels (e.g., standard Notion/Linear left navigation tree at 240px and right contextual inspect drawers at 360px).

### Breakpoints & Adaptation
- **Desktop (1280px+):** Tri-pane support enabled (Navigation Sidebar + Central Evidence Grid + Right Inspection Drawer). Gutters maintain `1.5rem` (`24px`).
- **Tablet (768px - 1279px):** Inspection drawers transition into slide-over overlays; secondary columns fold into tabbed sub-views; gutters compress to `1rem` (`16px`).
- **Mobile (< 768px):** Navigation tucks into a global sheet drawer. Grids collapse to single-column flex-stacks with `1rem` canvas margins.

### Spacing Cadence
The system adheres to an exact 4px/8px internal step scale. Micro-gaps between status dots and badges utilize `space-xs` (4px); compact input padding leverages `space-sm` (8px) vertically and `space-md` (12px) horizontally.

## Elevation & Depth

This system avoids expressive, heavy, or multi-directional drop shadows. Depth is established through **low-contrast outlines** paired with **ambient micro-shadows**.

- **Level 0 (Flat / Canvas):** Applied to the base background (`#F8F9FA`). No shadow, no border.
- **Level 1 (Card / Structural Panel):** Pure white background (`#FFFFFF`), enclosed by a crisp hairline border (`1px solid #E2E8F0`), supplemented by a subtle ambient drop: `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Popovers / Dropdowns / Segmented Sliders):** Elevated interaction components use `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` over a `1px solid #E2E8F0` frame.
- **Level 3 (Modal Sheets / Flyout Drawers):** High-focus overlays carry `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Backdrops use `rgba(15, 23, 42, 0.35)` with an optional subtle blur (`backdrop-filter: blur(2px)`).

## Shapes

The design system maintains a **Soft (Level 1)** structural curvature, emphasizing geometric precision and software-like cohesion.

- **Base Radius (`0.25rem` / `4px`):** Used for micro-badges, checkbox/radio frames, inline code tags, and tight button chips.
- **Container Radius (`0.375rem` - `0.5rem` / `6px - 8px`):** Used for form inputs, standard action buttons, segmented controls, and nested list items.
- **Panel Radius (`0.5rem` / `8px`):** Used for structural cards, data modules, and modal viewports.
- **Pill Exception (`9999px`):** Reserved exclusively for live telemetry chips (e.g., active sync indicators) and categorical pill tags where maximum differentiation from data boxes is necessary.

## Components

### Buttons
- **Primary:** Background `#4F46E5`, text `#FFFFFF`, border `1px solid transparent`. Hover: `#4338CA`. Active: scale `0.99`. Subtle inset top highlight `inset 0 1px 0 rgba(255, 255, 255, 0.15)`.
- **Secondary / Outline:** Background `#FFFFFF`, text `#0F172A`, border `1px solid #E2E8F0`. Hover: `#F8F9FA`, border `#CBD5E1`.
- **Ghost:** Text `#64748B`, background transparent. Hover: `#F1F5F9`, text `#0F172A`.

### Status Badges & Chips
- Compact, high-density components (height 20px-22px). Built with an outer 1px border, light semantic background tint, medium text weight (`11px` / `label-sm`), and a 6px circular status beacon.
- *Evidence Supported:* Tint `#ECFDF5`, Border `#A7F3D0`, Text `#065F46`, Indicator `#10B981`.
- *Evidence Invalidated:* Tint `#FEF2F2`, Border `#FECACA`, Text `#991B1B`, Indicator `#EF4444`.

### Input Fields & Controls
- **Inputs:** Height 32px (compact) or 36px (standard). Background `#FFFFFF`, border `1px solid #E2E8F0`, typography `14px`, text `#0F172A`. Focus state: border `#6366F1` with an outer ring `box-shadow: 0 0 0 2px #EEF2FF`.
- **Checkboxes & Radios:** 14px × 14px square/circle with 1px border `#CBD5E1`. Active state: `#4F46E5` fill with pure white icon check.

### Tables & List Rows
- Edge-to-edge layout, header background `#F8F9FA`, border bottom `1px solid #E2E8F0`. Row heights locked to 40px (compact) or 48px (detailed).
- Hover: smooth background tint `#F8F9FA` with immediate pointer cursor. Selected state highlights row with `#EEF2FF` and an active 2px left boundary in `#4F46E5`.

### Cards & Work Surfaces
- Surface `#FFFFFF`, border `1px solid #E2E8F0`, corner radius `6px` to `8px`. Headers separated by hairline divider `1px solid #F1F5F9`.

### Specialized Panels (Linear/Notion-Style Patterns)
- **Segmented Control Tabs:** Pill or recessed container (`#F1F5F9`, 4px padding) hosting interactive tab chips. Active tab shifts to `#FFFFFF` with Level 1 shadow and crisp text `#0F172A`.
- **Contextual Inspection Drawers:** Fixed-width 360px side pane anchored to the right border (`1px solid #E2E8F0`), allowing deep data drill-down without context departure.