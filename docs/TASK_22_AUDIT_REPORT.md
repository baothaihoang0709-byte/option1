# TASK 22 AUDIT REPORT: RESPONSIVE & INTERACTION REFINEMENT

**Project:** BIZWORK-IT Website Redesign  
**Workspace:** `D:\job\1_bizwork-redesign`  
**Phase:** 04 — Responsive & Interactivity  
**Task:** 22 — Responsive & Interaction Refinement  
**Date:** 2026-11-19  
**Audit Status:** COMPLETED (AUDIT ONLY — NO CODING AUTHORIZED)  
**Git Baseline Commit:** `e188a29481aca8d4434076a23ea30126bfb90803` (HEAD)

---

## 1. EXECUTIVE SUMMARY

An exhaustive audit of responsive behavior, cross-viewport layout stability, interactive states, and accessibility was conducted across the BIZWORK-IT website. The audit evaluated all five application routes (`/`, `/about`, `/services`, `/contact`, and `/not-found`), as well as all global shared components (`Header`, `Footer`, `LanguageSwitcher`, `SkipToContent`, `Container`, `Button`, `TypographicLogo`, and `NotFoundContent`).

### Key Findings Summary:
- **Core Architecture & Modern Tech Enterprise Design:** The responsive foundation built on Tailwind CSS utility breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`) is robust and structurally sound.
- **Horizontal Overflow Prevention:** All pages utilize standard container constraints (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) with zero unconditional fixed widths exceeding mobile viewports. The `ValueComparisonSection` implements a dual-mode pattern (desktop `<table>` vs mobile stacked cards) that cleanly avoids horizontal scrolling on mobile.
- **Form & Input Usability:** `ContactForm` enforces `text-base sm:text-sm` on input fields, successfully preventing iOS Safari auto-zoom on focus while preserving compact typography on desktop. Programmatic focus management and localized error handling from Tasks 18 & 19 operate cleanly.
- **Identified Refinements (4 issues, 1 observation):**
  - **ISSUE-22-01 (Medium):** `FaqAccordion` question trigger button has compact vertical padding (`py-1`), resulting in single-line touch target heights (~32–36px) below the recommended enhanced target size of 44px (Apple HIG / Android Material / WCAG AAA).
  - **ISSUE-22-02 (Low):** Quick fact strip cards in `AboutHero` and `ServicesHero` use `gap-4` and `p-4` in a 2-column grid at 320px–375px viewports, leaving only 104px inner text width and causing long Vietnamese labels ("TRẠNG THÁI DOANH NGHIỆP") to wrap into 3–4 lines.
  - **ISSUE-22-03 (Low):** Narrow mobile header at 320px screen width contains brand logo (~135px), language switcher (~96px), and hamburger button (44px), leaving a tight 5px margin without explicit `shrink-0` safeguards on the logo and hamburger button.
  - **ISSUE-22-04 (Low):** `NotFoundContent` renders action buttons in a horizontal row (`flex justify-center gap-4`) rather than the responsive `flex-col sm:flex-row` pattern used across other hero and CTA components, risking tight crowding at 320px width.
  - **ISSUE-22-05 (Observation):** Mobile navigation drawer in `Header` provides Escape key handling, backdrop overlay, and body scroll lock, but does not implement an active keyboard focus trap or `inert` attribute for background content.

---

## 2. AUDIT SCOPE AND METHODOLOGY

### 2.1 Supported Target Viewports
The audit evaluated the layout across the full spectrum of modern responsive screen widths:

| Device Category | Target Viewport Widths | Focus Areas |
| :--- | :--- | :--- |
| **Mobile (Compact)** | **320px**, **375px**, **390px**, **430px** | Horizontal overflow, text wrapping, touch targets ($\ge 44$px), hamburger drawer, form input zoom prevention, button stacking. |
| **Tablet / Small Laptop** | **768px**, **820px**, **1024px** | Breakpoint transitions (`sm:` to `md:` to `lg:`), grid column scaling (1 $\to$ 2 $\to$ 3 $\to$ 4), navigation switch from mobile drawer to desktop menu. |
| **Desktop / Widescreen** | **1280px**, **1440px**, **1920px** | Max-width container boundaries (`max-w-7xl`), horizontal centering, visual balance, whitespace distribution. |

### 2.2 Input Methods Evaluated
- **Touch Input (Mobile & Tablet):** Tap target dimensions, touch padding, spacing between adjacent interactive elements, absence of hover-only critical information.
- **Mouse & Pointer (Desktop):** Hover transitions, cursor indicators (`cursor-pointer`), visual feedback states.
- **Keyboard Navigation:** Tab order, skip link functionality (`#main-content`), focus rings (`focus-visible:ring-2`), Escape key listeners for overlays/menus.

### 2.3 Pages & Routes Inspected
1. **Homepage (`/`):** `HeroSection`, `ServicesOverviewSection`, `ValuePillarsSection`, `WorkingMethodologySection`, `ConversionCtaSection`.
2. **About (`/about`):** `AboutHero`, `CorporateProfile`, `CoreStrengths`, `MethodologyPillars`, `CustomerCommitment`, `PartnershipCta`.
3. **Services (`/services`):** `ServicesHero`, `TechnicalSupportSection`, `ItOutsourcingSection`, `ValueComparisonSection`, `FaqAccordion`, `ServicesCta`.
4. **Contact (`/contact`):** `ContactHero`, `ContactForm`, `ContactInfo`, `WhatHappensNext`.
5. **Custom 404 (`/not-found`):** `NotFoundContent`.
6. **Shared Global Shell:** `Header`, `Footer`, `LanguageSwitcher`, `SkipToContent`.

---

## 3. BROWSER & RUNTIME TESTING ENVIRONMENT

### 3.1 Testing Methodology & Tooling
- **Static DOM & Tailwind Token Inspection:** Exhaustive AST and source regex audits conducted via Node.js scripts across all 37 components in `components/` and `app/`.
- **Next.js Production Build Validation:** Executed `npm run build` and `npm run lint` under Node.js v24.11.1 / Next.js 16.4.3. Verified static prerendering of all 5 production routes.
- **Viewport Dimension Calculations:** Calculated container margins, grid track widths, and element bounding boxes across 320px, 375px, 768px, 1024px, 1280px, and 1920px.

### 3.2 Testing Limitations & Runtime Boundary Notice
> [!NOTE]
> Testing was performed via local Node.js CLI inspection, code analysis, and static build generation. A live graphical browser rendering pipeline (such as Chrome DevTools or Playwright) was not active in this sandbox session. Therefore, results are derived from verified static DOM structure, CSS/Tailwind class logic, and geometric calculation. Dynamic runtime browser behaviors (e.g. physical touch screen inertia scrolling, physical device virtual keyboard viewport resizing) are identified in Section 10 as requiring physical device verification during final acceptance. No screenshots were fabricated.

---

## 4. PAGE-BY-PAGE RESPONSIVE AUDIT RESULTS

### 4.1 Homepage (`/`)
- **HeroSection:**
  - *Mobile (320px–430px):* Headline scales smoothly (`text-3xl sm:text-4xl lg:text-5xl`). Subtitle `text-xl sm:text-2xl`. CTAs stack vertically (`flex-col sm:flex-row`) with full-width buttons (`w-full sm:w-auto`). Competency tags wrap cleanly (`flex flex-wrap gap-2`).
  - *TechVisual Graphic:* Floating accent badges specify `hidden sm:flex`, successfully preventing horizontal overflow on mobile viewports.
  - *Tablet & Desktop (768px–1920px):* Clean 2-column flex/grid transition. Content contained within `max-w-7xl mx-auto`.
  - *Status:* **PASS (Clean)**.

- **ServicesOverviewSection:**
  - *Mobile & Desktop:* 1-column grid (`grid-cols-1`) on mobile transitioning to 3 columns (`md:grid-cols-3`) on tablet/desktop. Trailing arrows verified singular from Task 21.
  - *Status:* **PASS (Clean)**.

- **ValuePillarsSection:**
  - *Mobile & Desktop:* 1-column grid on mobile, transitioning to 3 columns (`md:grid-cols-3`) on tablet/desktop. Padding and card elevation consistent with Modern Tech Enterprise design.
  - *Status:* **PASS (Clean)**.

- **WorkingMethodologySection:**
  - *Mobile & Desktop:* 1-column step cards on mobile, transitioning to 2 columns on tablet (`md:grid-cols-2`) and 4 columns on desktop (`lg:grid-cols-4`). Connecting lines and badges scale without clipping.
  - *Status:* **PASS (Clean)**.

- **ConversionCtaSection:**
  - *Mobile & Desktop:* Responsive card padding (`px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20`). CTAs stack vertically on mobile (`flex-col sm:flex-row`).
  - *Status:* **PASS (Clean)**.

---

### 4.2 About Page (`/about`)
- **AboutHero:**
  - *Headline & Text:* Clean typography wrapping in English and Vietnamese.
  - *Fact Strip Grid:* Configured with `grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6`. At 320px viewport, available card width is 136px, with `p-4` leaving 104px text width. Long Vietnamese uppercase labels ("TRẠNG THÁI DOANH NGHIỆP") break into 3–4 lines.
  - *Finding:* **ISSUE-22-02 (Low / Refinement)**.

- **CorporateProfile:**
  - *Mobile & Desktop:* 2-column grid on mobile (`grid-cols-2`) transitioning to 4-column metrics (`sm:grid-cols-4`). Corporate credentials card displays clean key-value rows. Trailing arrow verified singular from Task 21.
  - *Status:* **PASS (Clean)**.

- **CoreStrengths & MethodologyPillars:**
  - *Mobile & Desktop:* Clean responsive grids (`grid-cols-1 md:grid-cols-3` and `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). Link targets meet touch accessibility standards.
  - *Status:* **PASS (Clean)**.

- **CustomerCommitment & PartnershipCta:**
  - *Spacing & Layout:* Outer section padding and inner card padding verified consistent following Task 20 adjustments (`py-16 sm:py-24`).
  - *Status:* **PASS (Clean)**.

---

### 4.3 Services Page (`/services`)
- **ServicesHero:**
  - *Headline & Scope:* Clean responsive typography and CTA button stacking.
  - *Capabilities Strip Grid:* Configured with `grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6` and `p-4`. Similar to `AboutHero`, dense card padding at 320px–375px constrains Vietnamese text.
  - *Finding:* **ISSUE-22-02 (Low / Refinement)**.

- **TechnicalSupportSection & ItOutsourcingSection:**
  - *Service Details:* Alternating layout (`order-1 lg:order-2`) displays cleanly on mobile without media/text inversion defects. Feature checklists wrap smoothly.
  - *Status:* **PASS (Clean)**.

- **ValueComparisonSection:**
  - *Responsive Strategy:* Implements dedicated views:
    - Desktop/Tablet: `hidden sm:block` renders full comparative table.
    - Mobile: `sm:hidden` renders stacked comparison cards with distinct visual containers.
  - *Overflow Status:* Zero horizontal overflow. Completely responsive.
  - *Status:* **PASS (Clean)**.

- **FaqAccordion:**
  - *Interaction:* Keyboard and click toggling with accessible SVG chevron rotation.
  - *Touch Target:* Question trigger `<button>` has `py-1 px-1`. At single-line questions, total height is 32–36px, which fails the enhanced 44px touch target recommendation.
  - *Finding:* **ISSUE-22-01 (Medium / Refinement)**.

- **ServicesCta:**
  - *Mobile & Desktop:* Responsive card with dual stacked buttons on mobile.
  - *Status:* **PASS (Clean)**.

---

### 4.4 Contact Page (`/contact`)
- **ContactHero:**
  - *Spacing & Alignment:* Verified consistent with other hero sections.
  - *Status:* **PASS (Clean)**.

- **ContactForm:**
  - *Input Font Size:* Uses `text-base sm:text-sm`. Enforces 16px font size on mobile viewports (< 640px) to prevent iOS Safari auto-zooming into form inputs on focus.
  - *Validation & Error UX:* Localized inline error messages with `aria-invalid`, `aria-describedby`, and `aria-live="polite"` error notice. Programmatic focus management correctly targets the first invalid input post-render via `useEffect`.
  - *Touch Targets:* Form inputs and submit button exceed 44px height (`py-3`, `min-h-[44px]`).
  - *Status:* **PASS (Clean)**.

- **ContactInfo & WhatHappensNext:**
  - *Border & Divider:* Verified single 1px divider between Contact section and WhatHappensNext section following Task 20 fix.
  - *Status:* **PASS (Clean)**.

---

### 4.5 Custom 404 Page (`/not-found`)
- **NotFoundContent:**
  - *Visual Presentation:* Centered error badge ("404 — ERROR"), title, and description.
  - *Button Container:* Uses `<div className="mt-8 flex justify-center gap-4">`. Unlike all other CTA blocks in the project which use `flex-col sm:flex-row`, this container keeps buttons side-by-side on all screen widths. On a 320px screen, the two localized buttons ("Về trang chủ" and "Liên hệ hỗ trợ") consume ~281px inside a 288px container, creating tight horizontal crowding.
  - *Finding:* **ISSUE-22-04 (Low / Refinement)**.

---

## 5. INTERACTION & NAVIGATION AUDIT RESULTS

### 5.1 Desktop Navigation
- Navigation items (`navItems`) render with semantically correct `<nav aria-label="...">` and active route detection via `usePathname()`.
- Active item indicator uses blue color accent (`text-blue-600`) and subtle underline indicator.
- Focus rings are styled with `focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4`.
- *Status:* **PASS (Compliant)**.

### 5.2 Mobile Header & Menu Drawer
- **Hamburger Button:**
  - Renders at `h-11 w-11` (44px $\times$ 44px), meeting mobile touch target requirements.
  - Dynamically updates `aria-expanded` and toggles between hamburger and close (X) SVG icons.
- **Drawer Behavior:**
  - Body scroll lock is activated when open (`document.body.style.overflow = "hidden"`).
  - Listens for `Escape` key and automatically closes drawer.
  - Automatically closes upon route navigation (`useEffect` on `pathname`).
  - Mobile menu navigation links provide `min-h-[44px]` touch targets.
- **320px Viewport Spacing:**
  - The mobile header action container (`<div className="flex items-center gap-2 lg:hidden">`) sits alongside the brand logo. At 320px width, margin of error is only 5px.
  - *Finding:* **ISSUE-22-03 (Low / Refinement)**.
- **Focus Trapping:**
  - While Escape key closes the menu and backdrop intercepts pointer events, Tab key can theoretically traverse to background elements.
  - *Finding:* **ISSUE-22-05 (Observation / Architecture)**.

### 5.3 Language Switcher (EN / VI)
- Uses segmented button group pattern with `role="group"` and `aria-label`.
- Buttons enforce `aria-pressed` for current active language.
- Mobile touch targets on small size (`size="sm"`) explicitly enforce `min-h-[44px] min-w-[44px]` on mobile screens (`lg:min-h-[28px] lg:min-w-0`), providing touch target accessibility on phones while maintaining compact pill styling on desktop.
- *Status:* **PASS (Compliant)**.

### 5.4 Form Interactions & States
- Real-time client-side validation on field blur and submit.
- Disabled state styling on submit button during submission (`disabled:bg-slate-400 disabled:cursor-not-allowed`).
- Animated SVG spinner during async submission.
- Focus automatically moves to the first invalid field upon validation failure.
- *Status:* **PASS (Compliant)**.

---

## 6. ACCESSIBILITY (A11Y) AUDIT FINDINGS

| Criteria / Guideline | Current Implementation | Status |
| :--- | :--- | :--- |
| **WCAG 2.1 SC 2.4.1 (Bypass Blocks)** | `SkipToContent` component mounted at root layout targeting `#main-content`. | **PASS** |
| **WCAG 2.1 SC 2.4.7 (Focus Visible)** | Tailwind `focus-visible:ring-2 focus-visible:ring-blue-600` implemented on all interactive links, buttons, and inputs. | **PASS** |
| **WCAG 2.2 SC 2.5.8 (Target Size - Min 24px)** | All interactive controls exceed the 24px minimum threshold. | **PASS** |
| **Enhanced Target Size ($\ge 44$px)** | Header, LanguageSwitcher, Button, and Contact inputs enforce $\ge 44$px. `FaqAccordion` button trigger is ~32–36px on single lines. | **ISSUE-22-01** |
| **WCAG 2.1 SC 4.1.2 (Name, Role, Value)** | ARIA roles and attributes implemented (`aria-expanded`, `aria-controls`, `aria-pressed`, `aria-invalid`, `aria-describedby`, `aria-live`). | **PASS** |
| **WCAG 2.1 SC 1.4.10 (Reflow - 320px)** | Content reflows without vertical cut-off or loss of information. Minor 320px label density in fact strips noted. | **ISSUE-22-02** |
| **Reduced Motion Preference** | CSS transitions use standard duration (`duration-200`) without vestibular-triggering full-screen animations. | **PASS** |

---

## 7. CROSS-PAGE CONSISTENCY FINDINGS

- **Container Bounds:** All 5 pages uniformly use `components/common/Container.tsx` with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Button Standards:** All CTA buttons consistently utilize `components/common/Button.tsx` variants (`primary`, `secondary`, `secondary-dark`, `outline`).
- **Typography Scale:** Heading levels (`h1`, `h2`, `h3`) utilize consistent font sizes, weights (`font-extrabold`, `font-bold`), and color tokens (`text-slate-900`, `text-slate-600`, `text-blue-600`).
- **Bilingual Fidelity:** All copy is powered by localization dictionaries (`en.ts`, `vi.ts`) without hardcoded strings. Long Vietnamese phrases fit comfortably across all layouts with the minor exception of the fact strip at 320px.

---

## 8. ISSUE REGISTER

### ISSUE-22-01: FaqAccordion Touch Target Height
- **Component:** `components/services/FaqAccordion.tsx` (Line 72)
- **Viewport / Interaction Context:** Mobile & Tablet touch interactions (< 1024px).
- **Current Behavior:** Accordion trigger button specifies `py-1 px-1`. On questions with single-line text, total trigger box height is approximately 32–36px. While passing the baseline WCAG 2.2 AA SC 2.5.8 minimum (24px), it falls short of the widely accepted enhanced standard of 44px (Apple Human Interface Guidelines, Android Material Design, WCAG AAA).
- **Expected Behavior:** Touch target should offer at least 44px of vertical tappable space on mobile screens to prevent missed taps.
- **Reproduction Steps:**
  1. Inspect `components/services/FaqAccordion.tsx` line 72.
  2. Compute bounding box height: 28px icon + 8px vertical padding = 36px.
- **Evidence:** `<button ... className="... rounded-lg py-1 px-1 cursor-pointer">`
- **Severity:** **MEDIUM**
- **Suggested Resolution:** Update padding to `py-2.5 sm:py-2 px-1` so that on mobile the vertical padding adds 20px, guaranteeing $\ge 48$px total height, while adjusting to 44px on tablet/desktop.
- **Affected Files:** `components/services/FaqAccordion.tsx`
- **Dependencies / Risks:** Low risk. Increases vertical rhythm between questions by 8px on mobile, improving readability.

---

### ISSUE-22-02: Hero Quick Fact Strip Card Density at 320px–375px
- **Component:** `components/about/AboutHero.tsx` (Line 75) & `components/services/ServicesHero.tsx` (Line 75)
- **Viewport / Interaction Context:** Narrow mobile viewports (320px–375px).
- **Current Behavior:** Fact cards are arranged in a 2-column grid (`grid-cols-2 gap-4 ... p-4`). On a 320px viewport, total container content width is 288px. After accounting for a 16px gap (`gap-4`), each card has a width of 136px. With 32px horizontal padding (`p-4`), the available text width is only 104px. In Vietnamese, uppercase labels such as "TRẠNG THÁI DOANH NGHIỆP" wrap into 3–4 lines.
- **Expected Behavior:** Fact cards should provide adequate internal space on compact mobile screens to minimize awkward multi-line text fragmentation.
- **Reproduction Steps:**
  1. Inspect `AboutHero.tsx:75` and `ServicesHero.tsx:75`.
  2. Calculate width at 320px: `(320 - 32 - 16) / 2 = 136px`. Inner width = `136 - 32 = 104px`.
- **Evidence:** `grid grid-cols-2 gap-4 ... sm:grid-cols-4 sm:gap-6` and `p-4 shadow-xs`.
- **Severity:** **LOW**
- **Suggested Resolution:** Adjust mobile grid gap to `gap-3 sm:gap-6` and card padding to `p-3 sm:p-4`. This recovers 10px of horizontal text width per card on mobile without affecting desktop layout.
- **Affected Files:** `components/about/AboutHero.tsx`, `components/services/ServicesHero.tsx`
- **Dependencies / Risks:** Zero regression risk. Pure styling refinement.

---

### ISSUE-22-03: Mobile Header Narrow Spacing Safeguards at 320px
- **Component:** `components/common/Header.tsx` (Lines 66, 110, 117)
- **Viewport / Interaction Context:** Mobile viewports $\le 320$px.
- **Current Behavior:** Mobile header displays brand logo (~135px width) and right action group containing `LanguageSwitcher` (~96px width) and hamburger button (44px width) with `gap-2` (8px). Total required width is $135 + 96 + 8 + 44 = 283$px. On a 320px screen with 32px padding, available container width is 288px (margin of error is only 5px). Neither the logo container nor the hamburger button explicitly declare `shrink-0`.
- **Expected Behavior:** Header items should have explicit `shrink-0` safeguards and adaptive gap (`gap-1.5 sm:gap-2`) to prevent any potential flex shrinking or accidental element wrapping.
- **Reproduction Steps:**
  1. Inspect `Header.tsx` lines 66, 110, and 117.
  2. Observe that logo wrapper and hamburger button lack `shrink-0`.
- **Evidence:**
  - Line 66: `<div className="flex items-center">`
  - Line 110: `<div className="flex items-center gap-2 lg:hidden">`
  - Line 117: `className="inline-flex h-11 w-11 items-center justify-center..."`
- **Severity:** **LOW**
- **Suggested Resolution:** Add `shrink-0` to the logo container and hamburger button; update action container to `gap-1.5 sm:gap-2`.
- **Affected Files:** `components/common/Header.tsx`
- **Dependencies / Risks:** Zero regression risk. Strengthens flex layout stability.

---

### ISSUE-22-04: Custom 404 Action Buttons Stacking on Narrow Viewports
- **Component:** `components/common/NotFoundContent.tsx` (Line 24)
- **Viewport / Interaction Context:** Mobile viewports $\le 375$px (particularly 320px).
- **Current Behavior:** Action buttons in `NotFoundContent` are arranged horizontally: `<div className="mt-8 flex justify-center gap-4">`. On a 320px viewport, localized buttons ("Về trang chủ" and "Liên hệ hỗ trợ") take ~281px inside a 288px container, creating tight horizontal crowding without full touch button width.
- **Expected Behavior:** Action buttons should follow the project standard pattern (`flex flex-col sm:flex-row gap-3 sm:gap-4`) with `w-full sm:w-auto` for comfortable thumb tapping on mobile screens.
- **Reproduction Steps:**
  1. Inspect `NotFoundContent.tsx` lines 24–31.
  2. Observe horizontal-only flex container.
- **Evidence:** `<div className="mt-8 flex justify-center gap-4">`
- **Severity:** **LOW**
- **Suggested Resolution:** Change container to `flex flex-col sm:flex-row justify-center gap-3 sm:gap-4` and add `className="w-full sm:w-auto"` to both `<Button>` components.
- **Affected Files:** `components/common/NotFoundContent.tsx`
- **Dependencies / Risks:** Zero regression risk. Enhances mobile touch usability.

---

### ISSUE-22-05: Focus Trap in Mobile Navigation Drawer (Observation)
- **Component:** `components/common/Header.tsx` (Lines 161–208)
- **Viewport / Interaction Context:** Keyboard navigation when mobile menu is open.
- **Current Behavior:** The mobile drawer successfully traps pointer events, locks body scroll, and handles the Escape key. However, pressing the `Tab` key repeatedly will cycle through drawer links and can eventually navigate into obscured DOM elements behind the drawer.
- **Expected Behavior:** For enhanced WCAG 2.1 SC 2.4.3 compliance, focus should cycle strictly within the open drawer, or the background `<main>` and `<footer>` elements should receive `inert`.
- **Severity:** **OBSERVATION**
- **Suggested Resolution:** Recommend evaluating a lightweight focus trap or React `inert` attribute in a future task if strict WCAG AAA certification is required.
- **Affected Files:** `components/common/Header.tsx`
- **Dependencies / Risks:** Architectural enhancement. No immediate action required.

---

## 9. EVIDENCE & CODE AUDIT CITATIONS

| Issue ID | File Path | Existing Line(s) | Code Snippet |
| :--- | :--- | :--- | :--- |
| **ISSUE-22-01** | `components/services/FaqAccordion.tsx` | 72 | `className="flex w-full ... rounded-lg py-1 px-1 cursor-pointer"` |
| **ISSUE-22-02** | `components/about/AboutHero.tsx` | 75, 76, 85, 95, 105 | `grid grid-cols-2 gap-4 ... sm:grid-cols-4 sm:gap-6` with `p-4` |
| **ISSUE-22-02** | `components/services/ServicesHero.tsx` | 75, 76, 85, 94, 104 | `grid grid-cols-2 gap-4 ... sm:grid-cols-4 sm:gap-6` with `p-4` |
| **ISSUE-22-03** | `components/common/Header.tsx` | 66, 110, 117 | `gap-2 lg:hidden` and missing `shrink-0` |
| **ISSUE-22-04** | `components/common/NotFoundContent.tsx` | 24, 25, 28 | `<div className="mt-8 flex justify-center gap-4">` |

---

## 10. UNTESTED ITEMS & AUDIT LIMITATIONS

1. **Physical Device Touch Screen Inertia:** Testing was conducted via DOM analysis and viewport calculations. Physical touch gestures, momentum scrolling, and gesture navigation on iOS (Safari) and Android (Chrome) could not be physically executed.
2. **Mobile Virtual Keyboard Reflow:** The dynamic viewport height (`dvh`) behavior when the on-screen virtual keyboard is opened in `ContactForm` could not be tested in a headless CLI environment.
3. **Screen Reader Audio Verification:** ARIA attributes, landmarks, and live regions were verified through static code analysis; physical audio output (VoiceOver, NVDA, TalkBack) was not tested.
4. **Browser Hardware Acceleration:** GPU rendering performance during CSS transforms and drawer animations was not measured on low-end hardware.

---

## 11. RECOMMENDED IMPLEMENTATION ORDER

Should the Project Owner authorize implementation, the recommended execution order is:

1. **Step 1 — ISSUE-22-01 (`FaqAccordion.tsx`):** Increase accordion trigger padding to ensure $\ge 44$px touch targets.
2. **Step 2 — ISSUE-22-02 (`AboutHero.tsx` & `ServicesHero.tsx`):** Adjust fact card padding and gap on mobile for improved text legibility.
3. **Step 3 — ISSUE-22-03 (`Header.tsx`):** Add `shrink-0` safeguards and adaptive gap to mobile header action bar.
4. **Step 4 — ISSUE-22-04 (`NotFoundContent.tsx`):** Make 404 action buttons responsive (`flex-col sm:flex-row`).
5. **Step 5 — Verification:** Run `tsc`, `npm run lint`, and `npm run build` to ensure zero regressions.

---

## 12. POTENTIALLY AFFECTED FILES

Only 5 files are proposed for modification in Task 22:
1. `components/services/FaqAccordion.tsx` (ISSUE-22-01)
2. `components/about/AboutHero.tsx` (ISSUE-22-02)
3. `components/services/ServicesHero.tsx` (ISSUE-22-02)
4. `components/common/Header.tsx` (ISSUE-22-03)
5. `components/common/NotFoundContent.tsx` (ISSUE-22-04)

---

## 13. EXPLICIT OUT-OF-SCOPE ITEMS

The following items are strictly excluded from Task 22:
- No changes to backend, database, API routes, or environment variables.
- No changes to translation dictionaries (`en.ts`, `vi.ts`) or i18n keys.
- No modification of Task 20 spacing tokens or Task 21 typography/card tokens.
- No third-party dependency additions or updates.
- No package security upgrade (`next upgrade`).
- **NO APPLICATION SOURCE CODE MODIFICATION IS AUTHORIZED DURING THIS AUDIT PHASE.**
