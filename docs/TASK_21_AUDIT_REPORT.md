# TASK 21 — TYPOGRAPHY, CARDS & COMPONENTS REFINEMENT AUDIT REPORT
**Visual Consistency Phase (Phase 03 — Task 21)**

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Current Status:** `AUDIT COMPLETED — AWAITING IMPLEMENTATION APPROVAL`
- **Execution Mode:** AUDIT & PLANNING ONLY (Zero application source code modified)
- **Latest Commit Baseline:** `e188a29` (Task 17 accepted commit)

---

## 1. EXECUTIVE SUMMARY

A rigorous, exhaustive visual consistency audit of typography hierarchy, card systems, and reusable UI components was conducted across the entire BIZWORK-IT web platform.

The audit surveyed all 37 `.tsx` files across `app/` and `components/`, inspecting font sizes, weights, line heights, letter spacing, heading hierarchy, card backgrounds, borders, shadows, hover transitions, buttons, action links, badges, icon containers, and form elements across desktop, tablet, and mobile viewports.

### Key Audit Conclusions

1. **Robust Architectural Discipline:**
   The Modern Tech Enterprise design language is implemented with exceptional consistency. The typography scales reliably from a unified Google Font (`Plus Jakarta Sans`), the 3-tier card system respects strict column-width rules, and all 4 dark CTA banners share an identical 100% harmonized layout.
2. **Definitive Visual Defect Identified (Double Arrow Rendering):**
   A concrete visual defect was discovered where directional arrows (`→`) are rendered twice (`"→ →"`) across 5 critical interactive links and buttons. The root cause is that raw Unicode arrows `" →"` were previously appended into dictionary strings (`en.ts` and `vi.ts`) while the JSX markup in components also explicitly appends `<span aria-hidden="true">→</span>` or literal `→`. This impacts Home, About, and Services.
3. **Targeted Micro-Inconsistencies Identified:**
   - `ValuePillarsSection` 3-column cards omit `shadow-xs` in their default resting state and use slight border opacity deviations (`border-slate-200/90` and `hover:border-blue-400/60`), whereas sister cards in `TechnicalStrengths`, `TechnicalSupportSection`, and `WhatHappensNext` use canonical `border-slate-200`, `shadow-xs`, and `hover:border-blue-400/50`.
   - `ValuePillarsSection` card divider spacing uses `pt-5` (20px) instead of the standard `pt-4` (16px) established in `TechnicalStrengths` and `TechnicalSupportSection`.
   - The Verified Corporate Registration badge in `CorporateProfile.tsx` uses `px-2` horizontal padding versus `px-2.5` in `ContactInfo.tsx`, and location text size differs (`text-xs` vs `text-sm`).
4. **Intentional Variations Documented & Preserved:**
   Progressive typography scaling across 2-column (`text-2xl`), 3-column (`text-xl`), and 4-column (`text-lg`) card titles is intentional and optically proportional to column width. Similarly, the primary Blue (`#2563EB`) and secondary Sky (`#0EA5E9`) two-tone accent hierarchy is intentional and preserved.

---

## 2. AUDIT METHODOLOGY

1. **Static AST & Regex Component Analysis:**
   - Parsed all 37 `.tsx` files in `components/` and `app/`.
   - Extracted all typography classes (`text-*`, `font-*`, `leading-*`, `tracking-*`, `uppercase`).
   - Cataloged all card containers (`rounded-3xl`, `rounded-2xl`, `rounded-xl`, `border-*`, `bg-*`, `shadow-*`).
   - Mapped all button usages (`<Button />`, native `<button>`, action `<Link>`).
   - Mapped all badge paradigms (`rounded-full`, `rounded-md`, `ring-1`, `border`).
2. **Cross-Component Comparative Matrices:**
   - Hero hierarchy parity (`HeroSection` vs `AboutHero` vs `ServicesHero` vs `ContactHero`).
   - 3-column feature card parity (`ValuePillars` vs `TechnicalStrengths` vs `TechnicalSupport` vs `WhatHappensNext`).
   - CTA banner parity (`ConversionCtaSection` vs `PartnershipCta` vs `ServicesCta` vs `ContactClosingCta`).
   - Corporate identity card parity (`CorporateProfile` vs `ContactInfo`).
   - Step process card parity (`WorkingMethodology` vs `WhatHappensNext`).
3. **Accessibility & Screen-Reader Verification:**
   - Evaluated semantic heading hierarchy (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3` $\rightarrow$ `h4`).
   - Evaluated decorative element masking (`aria-hidden="true"` on icons and arrows).
   - Evaluated touch target sizing (`min-h-[44px]` for mobile interactive controls).

---

## 3. GLOBAL TYPOGRAPHY SYSTEM AUDIT

### 3.1. Typography Stack & Font Configuration
- **Primary Typeface:** `Plus Jakarta Sans` imported via `next/font/google` in `app/layout.tsx` (`--font-plus-jakarta-sans`) and mapped to `--font-sans` in `app/globals.css`.
- **Base Smoothing:** `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` active on `html`.
- **Body Styling:** `font-family: var(--font-sans); background-color: #f8fafc; color: #0f172a;`.

### 3.2. Heading Hierarchy Matrix

| Heading Level | Component / Section | Classes Applied | Visual Render | Status |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | `HeroSection` (Home) | `text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.12]` | 36px/48px/60px, leading 1.12 | Standard |
| **H1** | `AboutHero`, `ServicesHero`, `ContactHero` | `text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.15]` | 36px/48px/60px, leading 1.15 | Standard |
| **H1** | `NotFoundContent` (404) | `mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl` | 36px/48px | Standard |
| **H2** | `SectionHeader` (9 sections) | `text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl` | 30px/36px | Standard |
| **H2** | `CorporateProfile`, `ItOutsourcing` | `text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl` | 30px/36px | Standard |
| **H2** | CTA Banners (4 dark banners) | `text-3xl font-extrabold tracking-tight text-white sm:text-4xl` | 30px/36px, Inverted | Standard |
| **H2** | `ContactForm` (Form Card) | `text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl` | 24px/30px | Standard |
| **H3** | `ServicesOverviewSection` (2-col) | `text-2xl font-bold tracking-tight text-slate-900` | 24px | Standard |
| **H3** | `ValuePillars`, `TechnicalStrengths`, `TechnicalSupport`, `WhatHappensNext` (3-col) | `text-xl font-bold tracking-tight text-slate-900` | 20px | Standard |
| **H3** | `WorkingMethodologySection` (4-col) | `text-lg font-bold tracking-tight text-slate-900` | 18px | Standard |
| **H3** | `ItOutsourcingSection` (Benefit Cards) | `text-sm font-bold text-slate-900` | 14px | Standard |
| **H3** | `Footer` (Column Headings) | `text-xs font-bold tracking-wider text-white uppercase` | 12px, Uppercase | Standard |
| **H3** | `ContactInfo` (Cards 2 & 3) | `text-xs font-bold uppercase tracking-wider text-slate-700 / text-blue-900` | 12px, Uppercase | Standard |
| **H4** | `TechnicalSupportSection` (CTA Banner) | `text-base font-bold text-slate-900` | 16px | Standard |

### 3.3. Subtitles, Taglines & Supporting Text
- **Hero Taglines:** Uniformly `mt-4 text-xl font-bold tracking-tight text-blue-600 sm:text-2xl` across all 4 Hero components (`HeroSection`, `AboutHero`, `ServicesHero`, `ContactHero`).
- **Section Subtitles (`SectionHeader`):** Uniformly `mt-4 text-base leading-relaxed text-slate-600 sm:text-lg`.
- **CTA Banner Subtitles:** Uniformly `mt-3 text-lg font-bold text-sky-400`.
- **Card Descriptions:** Standardized at `mt-3 text-xs leading-relaxed text-slate-600` for 3-col and 4-col cards; `mt-4 text-sm leading-relaxed text-slate-600` for 2-col cards.
- **Labels & Micro-copy:** Form labels use `text-xs font-bold text-slate-800 uppercase tracking-wider`; card category tags use `text-[11px] font-semibold uppercase tracking-wider`.

---

## 4. CARD SYSTEM & VISUAL ELEVATION AUDIT

### 4.1. Corner Radius Hierarchy
The application follows a disciplined 5-tier corner radius system:
1. `rounded-3xl` (24px): Top-level focal containers — all 4 Dark CTA Banners, `CustomerCommitment` Hero Card, `ContactForm` Outer Card.
2. `rounded-2xl` (16px): Primary content cards — all 3-column feature cards, 2-column solution cards, 4-column methodology cards, `CorporateProfile` registration card, `FaqAccordion` container, `ValueComparisonSection` table container, `ContactInfo` cards, `TechVisual` main card.
3. `rounded-xl` (12px): Secondary nested cards, form inputs, and large icon badges — Hero 2x2 stat cards, step number badges (`h-12 w-12`), principle cards, contact form inputs/textarea, `TechVisual` floating metric pills.
4. `rounded-lg` (8px): Interactive controls and small icon tiles — `Button` `sm` and `md`, secondary icon badges (`h-9 w-9`, `h-7 w-7`), mobile menu hamburger.
5. `rounded-full` (9999px): Pills, indicator dots, language switcher container.

### 4.2. 3-Column Feature Card Elevation Comparison

| Component | Container Class | Initial Shadow | Hover Border | Hover Lift |
| :--- | :--- | :---: | :---: | :---: |
| `TechnicalStrengths.tsx` | `rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300` | `shadow-xs` | `border-blue-400/50` | None |
| `TechnicalSupportSection.tsx` | `rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300` | `shadow-xs` | `border-blue-400/50` | None |
| `WhatHappensNext.tsx` | `rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300` | `shadow-xs` | `border-blue-400/50` | None |
| `ValuePillarsSection.tsx` | `rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5` | **None** | `border-blue-400/60` | `hover:-translate-y-1` |

**Observation:** `ValuePillarsSection` omits `shadow-xs` at rest and uses `border-slate-200/90` and `hover:border-blue-400/60` instead of `border-slate-200` and `hover:border-blue-400/50`. Adding `shadow-xs` and normalizing the border tokens achieves complete visual cohesion across all 3-column card sets.

---

## 5. BUTTONS, LINKS, BADGES & INTERACTIVE COMPONENTS AUDIT

### 5.1. Button System (`components/common/Button.tsx`)
- **Variant Consistency:**
  - `primary`: Standard across Header, Hero primary CTAs, CTA Banner primary CTAs, and Contact Submit.
  - `secondary`: Standard across Hero secondary CTAs, section secondary buttons (`ItOutsourcingSection`, `ServicesOverviewSection`, `NotFoundContent`).
  - `secondary-dark`: Standard across all 4 Dark CTA Banners (`min-w-[180px]`).
- **Sizing Tokens:**
  - `sm`: `min-h-[36px]` (Header desktop CTA).
  - `md`: `min-h-[44px]` (Section CTAs, mobile menu CTA, Contact reset button).
  - `lg`: `min-h-[48px]` (Hero CTAs, CTA Banner CTAs, Contact submit button).
- **Accessibility:** All variants include `focus-visible:ring-2` with appropriate color-matched offsets and `disabled:pointer-events-none disabled:opacity-50`.

### 5.2. Action Links & The Double-Arrow Defect

The website features inline text action links with directional arrows (`→`). The established project pattern (correctly executed in `ValuePillarsSection` and `Footer`) is:
```tsx
<Link href={...} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">
  <span>{linkText}</span>
  <span aria-hidden="true">→</span>
</Link>
```
In this pattern, the dictionary string holds only clean text (e.g. `"Explore our technical scope"`), and the visual arrow is rendered in JSX with `aria-hidden="true"`.

#### The Defect
In 5 locations, the dictionary string already contains `" →"`, AND the JSX markup also renders `→` or `<span aria-hidden="true">→</span>`. This results in visual duplication: `"→ →"`:

| Location | Component | JSX Implementation | Dictionary Key | Dictionary String (EN / VI) | Rendered Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** | `ServicesOverviewSection.tsx:114` | `{data.catalogButton} →` | `catalogButton` | `"View Complete Services Breakdown →"` / `"Xem Toàn bộ Danh mục Dịch vụ →"` | `"View Complete Services Breakdown → →"` |
| **Home** | `WorkingMethodologySection.tsx:153-154` | `<span>{data.supportLink}</span> <span aria-hidden="true">→</span>` | `supportLink` | `"Learn more about our corporate background and service philosophy →"` / `"Tìm hiểu thêm về hồ sơ doanh nghiệp và triết lý dịch vụ của chúng tôi →"` | `"Learn more about our corporate background and service philosophy → →"` |
| **About** | `CorporateProfile.tsx:145-146` | `<span>{profile.cardButton}</span> <span aria-hidden="true">→</span>` | `cardButton` | `"Connect With Our Team via Contact →"` / `"Kết nối với Đội ngũ qua Liên hệ →"` | `"Connect With Our Team via Contact → →"` |
| **About** | `TechnicalStrengths.tsx:135-136` | `<span>{strength.link}</span> <span aria-hidden="true">→</span>` | `link` (x3) | `"Discover our services in detail →"` / `"Tìm hiểu chi tiết các dịch vụ của chúng tôi →"` | `"Discover our services in detail → →"` |
| **Services** | `TechnicalSupportSection.tsx:139-140` | `<span>{domain.linkText}</span> <span aria-hidden="true">→</span>` | `linkText` (x3) | `"Inquire about this support scope →"` / `"Trao đổi về phạm vi hỗ trợ này →"` | `"Inquire about this support scope → →"` |

**Accessibility Impact:** When the arrow is embedded in the translation string, screen readers read out "Right arrow" or raw Unicode symbols. By removing the trailing arrow from the dictionary and ensuring JSX renders `<span aria-hidden="true">→</span>`, screen readers cleanly announce only the actionable label, and sighted users see exactly one sharp arrow.

### 5.3. Badges & Pills System
1. **Hero Eyebrows:** `rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-xs` with internal 2x2 dot (`animate-pulse` on Home).
2. **Section Header Badges:** `rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 ring-1 ring-inset ring-blue-700/10`.
3. **CTA Dark Banner Badges:** `rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300`.
4. **Card Category Tags:** `rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10`.
5. **Verified Entity Badges:** `rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20`.

---

## 6. CLASSIFICATION OF FINDINGS

### CATEGORY A: ACTUAL DEFECTS / CLEAR VISUAL INCONSISTENCIES

- **ISSUE-21-01: Double Arrow Rendering on Interactive Links & Buttons**
  - **Type:** Visual & Accessibility Defect
  - **Files:** `lib/i18n/dictionaries/en.ts`, `lib/i18n/dictionaries/vi.ts`, `components/home/ServicesOverviewSection.tsx`
  - **Description:** Five interactive links render `"→ →"` due to duplicate arrow definitions in dictionary strings and JSX markup.
  - **Action:** Remove trailing `" →"` from the 5 dictionary keys; update `ServicesOverviewSection.tsx` to use `<span aria-hidden="true">→</span>`.

- **ISSUE-21-02: Initial Shadow & Border Opacity Inconsistency in ValuePillars 3-Column Cards**
  - **Type:** Visual Inconsistency
  - **File:** `components/home/ValuePillarsSection.tsx` (line 99)
  - **Description:** `ValuePillarsSection` omits `shadow-xs` at rest and uses `border-slate-200/90` and `hover:border-blue-400/60` instead of `border-slate-200` and `hover:border-blue-400/50`.
  - **Action:** Add `shadow-xs` and normalize border classes to match `TechnicalStrengths.tsx`, `TechnicalSupportSection.tsx`, and `WhatHappensNext.tsx`.

- **ISSUE-21-03: Feature Card Internal Divider Spacing Parity (`pt-5` vs `pt-4`)**
  - **Type:** Spacing Inconsistency
  - **File:** `components/home/ValuePillarsSection.tsx` (line 126)
  - **Description:** `ValuePillarsSection` uses `pt-5` (20px) above the bottom action link, while sister components `TechnicalStrengths` and `TechnicalSupportSection` use `pt-4` (16px).
  - **Action:** Normalize divider padding to `pt-4`.

- **ISSUE-21-04: Corporate Registration Card Verified Badge & Location Font Size Parity**
  - **Type:** Visual Inconsistency
  - **Files:** `components/about/CorporateProfile.tsx` (lines 97, 119) vs `components/contact/ContactInfo.tsx` (lines 39, 58)
  - **Description:** Verified badge uses `px-2` in `CorporateProfile` vs `px-2.5` in `ContactInfo`; location value uses `text-xs` in `CorporateProfile` vs `text-sm` in `ContactInfo`.
  - **Action:** Standardize badge to `px-2.5` and location text to `text-sm font-semibold text-slate-800` in `CorporateProfile.tsx`.

### CATEGORY B: MINOR INCONSISTENCIES WITH LOW VISUAL IMPACT

- **ISSUE-21-05: Step Card Secondary Icon Container Background Parity**
  - **Type:** Minor Inconsistency / Intentional Styling
  - **Files:** `components/home/WorkingMethodologySection.tsx` (line 126) vs `components/contact/WhatHappensNext.tsx` (line 99)
  - **Description:** Methodology step cards use `bg-slate-50 text-slate-600` for the secondary icon, whereas `WhatHappensNext` uses `bg-blue-50 text-blue-600`.
  - **Assessment:** In `WorkingMethodologySection`, the card already features a prominent blue number badge (`bg-blue-600 text-white`). The neutral gray secondary icon prevents color competition on a 4-column card. In `WhatHappensNext`, the 3-column width accommodates the blue tint comfortably. This is classified as an acceptable contextual variation, requiring no change.

### CATEGORY C: INTENTIONAL DESIGN VARIATIONS (JUSTIFIED & PRESERVED)

1. **IV-01 — Hero H1 Scale vs Section H2 Scale:**
   Hero titles use `text-4xl sm:text-5xl lg:text-6xl` (`36px/48px/60px`), while section headers use `text-3xl sm:text-4xl` (`30px/36px`). This establishes an intentional page hierarchy.
2. **IV-02 — Hero Eyebrow Badges vs SectionHeader Badges:**
   Hero eyebrows feature `border border-blue-200/80 bg-blue-50/80 shadow-xs` with a status dot indicator, while section headers use flat `ring-1 ring-inset ring-blue-700/10` pills. This emphasizes the hero entrance.
3. **IV-03 — Card Title Progressive Scaling by Column Density:**
   - 2-Column Cards (`ServicesOverviewSection`): `text-2xl font-bold` (24px)
   - 3-Column Cards (`ValuePillars`, `TechnicalStrengths`, `TechnicalSupport`, `WhatHappensNext`): `text-xl font-bold` (20px)
   - 4-Column Cards (`WorkingMethodology`): `text-lg font-bold` (18px)
   This proportional scaling perfectly matches card content width.
4. **IV-04 — Light Surface Cards vs Inverted Dark CTA Banners:**
   Standard sections employ light surfaces (`bg-white` or `bg-slate-50/50`) with dark typography. Final conversion sections employ `bg-slate-900 border-slate-800` with `text-white` and `shadow-2xl`. This provides conversion punch.
5. **IV-05 — Two-Tone Accent Hierarchy (Royal Blue & Sky Blue):**
   Royal Blue (`#2563EB`) acts as the primary brand anchor (buttons, main headings, primary badges), while Sky Blue (`#0EA5E9`) acts as a secondary accent for IT Outsourcing, high-ROI badges, and CTA banner subtitles. Both are declared in `--color-brand-blue` and `--color-brand-sky`.
6. **IV-06 — Contact Form Elevation & Radius:**
   `ContactForm` is styled with `rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm`, distinct from surrounding informational cards, emphasizing its status as the interactive centerpiece of the Contact page.

---

## 7. CROSS-PAGE VISUAL BALANCE ASSESSMENT

| Page | Hero Rhythm | Section Card Consistency | CTA Banner Alignment | Visual Balance Rating |
| :--- | :---: | :---: | :---: | :---: |
| **Home (`/`)** | Verified (Title, Tagline, Visual, Dual CTA) | Verified (Pillars, Overview, Methodology) | Verified (Dark Banner, Dual CTA `min-w-[180px]`) | **Excellent** |
| **About (`/about`)** | Verified (Title, Tagline, Fact Grid, Dual CTA) | Verified (Profile, Commitment, Strengths) | Verified (Dark Banner, Dual CTA `min-w-[180px]`) | **Excellent** |
| **Services (`/services`)** | Verified (Title, Tagline, Scope Grid, Dual CTA) | Verified (Outsourcing, TechSupport, Comparison, FAQ) | Verified (Dark Banner, Dual CTA `min-w-[180px]`) | **Excellent** |
| **Contact (`/contact`)** | Verified (Title, Tagline, Dual CTA) | Verified (Form 3xl, Info Stack, WhatHappensNext) | Verified (Dark Banner, Dual CTA `min-w-[180px]`) | **Excellent** |
| **404 (`/not-found`)** | Verified (Eyebrow, H1, Description, Dual CTA) | N/A (Standalone centered card layout) | N/A | **Excellent** |

---

## 8. RISK ASSESSMENT & VERIFICATION STRATEGY

- **Risk Level:** Extremely Low.
- **Surface Area:** Only 5 files (3 component files, 2 dictionary files).
- **TypeScript Impact:** Zero schema changes. Dictionary keys remain `string`; no interfaces in `lib/i18n/types.ts` are touched.
- **Bilingual Parity:** Guaranteed 100% parity across EN and VI dictionaries.
- **Verification Commands:**
  1. `npx tsc --noEmit` — Type check.
  2. `npm run lint` — ESLint strict verification.
  3. `npm run build` — Prerender and production build verification.
  4. `node scratch/audit_i18n.js` — Full EN/VI dictionary key parity check.
  5. Dedicated scratch script verifying zero double arrows across the entire codebase.
