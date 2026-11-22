# TASK 22 IMPLEMENTATION PLAN — REVISION 1

**Project:** BIZWORK-IT Website Redesign  
**Workspace:** `D:\job\1_bizwork-redesign`  
**Phase:** 04 — Responsive & Interactivity  
**Task:** 22 — Responsive & Interaction Refinement  
**Date:** 2026-11-19  
**Revision:** 1 (Updated per Project Owner review)  
**Status:** DRAFT — PENDING PROJECT OWNER APPROVAL  
**Coding Authorization:** **STRICTLY NOT AUTHORIZED (AUDIT & PLAN ONLY)**  
**Reference Document:** `docs/TASK_22_AUDIT_REPORT.md`  
**Revision Note:** `docs/TASK_22_PLAN_REVISION_NOTE.md`

---

## 1. OBJECTIVE & SCOPE DEFINITION

This document defines the implementation plan for **Task 22 — Responsive & Interaction Refinement** (Revision 1). The plan is derived strictly from the verified findings documented in `docs/TASK_22_AUDIT_REPORT.md` and incorporates all clarifications required by the Project Owner.

### Authorization Boundary Notice:
> [!IMPORTANT]
> This is a **DRAFT implementation plan only**. No application source code changes may be made until explicit authorization is granted by the Project Owner. This document does not authorize implementation.

### Authorized Target Scope (5 Files Only):
Only the following five application source files are authorized for modification upon subsequent authorization:
1. `components/services/FaqAccordion.tsx` (ISSUE-22-01)
2. `components/about/AboutHero.tsx` (ISSUE-22-02)
3. `components/services/ServicesHero.tsx` (ISSUE-22-02)
4. `components/common/Header.tsx` (ISSUE-22-03)
5. `components/common/NotFoundContent.tsx` (ISSUE-22-04)

`ISSUE-22-05` (Mobile drawer focus trap) remains an **Observation** and is strictly excluded from implementation in this task. No other files, shared components (including `Button.tsx`), packages, or backend configs may be modified.

---

## 2. PROPOSED CODE MODIFICATIONS & DETAILED GEOMETRY SPECIFICATIONS

### ITEM 1 — ISSUE-22-01: FaqAccordion Touch Target Height
- **Issue Addressed:** `ISSUE-22-01` (Medium)
- **Target File:** `components/services/FaqAccordion.tsx`
- **Intended Behavior:**
  Ensure that the computed bounding-box height of the FAQ question trigger `<button>` satisfies the project acceptance criterion: **minimum computed bounding-box height $\ge$ 44 CSS px** across mobile, tablet, and desktop viewports (mobile $< 640$px, tablet $640\text{px} \dots 1023\text{px}$, and desktop $\ge 1024$px).
- **Icon, Typography & Line-Height Verification:**
  - *Icon Container:* `flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600` has fixed height = 28px.
  - *Text Container:* `<span className="pr-4 leading-snug">{faq.question}</span>` with `text-sm sm:text-base`.
    - In Tailwind CSS, `text-sm` font-size is 14px with `leading-snug` (1.375 multiplier) = computed line-height of 19.25px (rendered ~19px–20px).
    - `text-base` font-size is 16px with `leading-snug` (1.375 multiplier) = computed line-height of 22px.
  - *Flex Alignment:* The button uses `items-start`, so inner row height is governed by $\max(\text{textHeight}, \text{iconHeight})$.
    - On single-line questions: inner height = $\max(19.25\text{px}, 28\text{px}) = 28$px.
    - On two-line questions (mobile wrap): inner height = $\max(38.5\text{px}, 28\text{px}) = 38.5$px.
- **Computed Bounding-Box Height Math:**
  - *Current Implementation (`py-1`):*
    - Mobile padding: `py-1` = 4px top + 4px bottom = 8px.
    - Single-line height: $28\text{px} + 8\text{px} = 36$ CSS px. (**FAILS** the 44 CSS px acceptance standard).
  - *Proposed Revision (`py-2.5 sm:py-2`):*
    - Mobile padding ($< 640$px): `py-2.5` = 10px top + 10px bottom = 20px.
    - Computed single-line height on mobile: $28\text{px} + 20\text{px} = \mathbf{48\text{ CSS px}}$ (satisfies the minimum $\ge 44$ CSS px acceptance standard).
    - Tablet / Desktop padding ($\ge 640$px): `sm:py-2` = 8px top + 8px bottom = 16px.
    - Computed single-line height on desktop: $28\text{px} + 16\text{px} = \mathbf{44\text{ CSS px}}$ (satisfies the minimum $\ge 44$ CSS px acceptance standard).
    - Computed multiline height on mobile: $38.5\text{px} + 20\text{px} = 58.5\text{ CSS px}$ ($> 44$ CSS px).
- **Acceptance Criterion:**
  The project acceptance criterion requires a **minimum computed bounding-box height $\ge$ 44 CSS px** on mobile, tablet, and desktop viewports, verified via computed style inspection rather than Tailwind class assumption.
- **Exact Proposed Change:**

```diff
--- a/components/services/FaqAccordion.tsx
+++ b/components/services/FaqAccordion.tsx
@@ -69,5 +69,5 @@ export function FaqAccordion() {
                   onClick={() => toggleItem(faq.id)}
                   aria-expanded={isOpen}
                   aria-controls={contentId}
-                  className="flex w-full items-start justify-between text-left text-sm sm:text-base font-bold text-slate-900 transition-colors hover:text-blue-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-1 px-1 cursor-pointer"
+                  className="flex w-full items-start justify-between text-left text-sm sm:text-base font-bold text-slate-900 transition-colors hover:text-blue-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-2.5 sm:py-2 px-1 cursor-pointer"
                 >
```

- **Regression Risks & Mitigations:**
  - *Risk:* Expanding vertical padding from `py-1` to `py-2.5` on mobile adds 12px per item (60px total over 5 FAQ items).
  - *Mitigation & Verification:* Inspect vertical spacing between `FaqAccordion` and the subsequent `ServicesCta` section. Confirm that the outer section padding (`py-16 sm:py-24`) maintains balanced vertical rhythm. Confirm that expanded content area (`mt-3 text-xs sm:text-sm`) remains properly aligned.

---

### ITEM 2 — ISSUE-22-02: Quick Fact Strip Card Density on Mobile Viewports
- **Issue Addressed:** `ISSUE-22-02` (Low)
- **Target Files:**
  - `components/about/AboutHero.tsx`
  - `components/services/ServicesHero.tsx`
- **Intended Behavior:**
  Reduce card padding and horizontal grid gap on mobile screens (`< 640px`) from `p-4` and `gap-4` to `p-3 sm:p-4` and `gap-3 sm:gap-6`. On narrow viewports (320px and 375px), this increases available internal card width to minimize excessive wrapping of long uppercase labels.
- **Estimated Card Width Calculations:**
  - *At 320px Viewport:*
    - Container padding (`px-4` in `Container.tsx`) = 16px left + 16px right = 32px.
    - Available content width = $320 - 32 = 288$px.
    - *Current (`gap-4`, `p-4`):*
      - Track width: $(288 - 16) / 2 = 136$px per card.
      - Inner text width: $136 - 32\text{px padding} = \mathbf{104\text{px}}$.
    - *Proposed (`gap-3`, `p-3`):*
      - Track width: $(288 - 12) / 2 = 138$px per card.
      - Inner text width: $138 - 24\text{px padding} = \mathbf{114\text{px}}$.
      - *Estimated Width Gain:* $\approx \mathbf{+10\text{px}}$ per card (+9.6% text area).
  - *At 375px Viewport:*
    - Available content width = $375 - 32 = 343$px.
    - *Current:* $(343 - 16) / 2 = 163.5$px. Inner width = $163.5 - 32 = \mathbf{131.5\text{px}}$.
    - *Proposed:* $(343 - 12) / 2 = 165.5$px. Inner width = $165.5 - 24 = \mathbf{141.5\text{px}}$.
    - *Estimated Width Gain:* $\approx \mathbf{+10\text{px}}$ per card (+7.6% text area).
  - *Important Qualification:*
    The +10px increase is a geometric box-model estimate. Text wrapping behavior depends on browser font anti-aliasing, OS font rasterization, and language syllable lengths. Verification must inspect the actual rendered text rather than assuming an exact line-count reduction.
- **Desktop Invariance Confirmation:**
  At screen widths $\ge 640$px (`sm:` breakpoint), the classes `sm:grid-cols-4 sm:gap-6` and `sm:p-4` take precedence, guaranteeing that desktop and tablet layouts remain **100% identical** to existing production styling.
- **Exact Proposed Change (AboutHero.tsx):**

```diff
--- a/components/about/AboutHero.tsx
+++ b/components/about/AboutHero.tsx
@@ -74,9 +74,9 @@ export function AboutHero() {
         {/* Fact Strip: Entity & Scope */}
-        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-6">
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-6">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
               {hero.fact1Label}
             </p>
@@ -84,3 +84,3 @@ export function AboutHero() {
           </div>
 
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
               {hero.fact2Label}
@@ -94,3 +94,3 @@ export function AboutHero() {
           </div>
 
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
               {hero.fact3Label}
@@ -104,3 +104,3 @@ export function AboutHero() {
           </div>
 
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
```

- **Exact Proposed Change (ServicesHero.tsx):**

```diff
--- a/components/services/ServicesHero.tsx
+++ b/components/services/ServicesHero.tsx
@@ -74,9 +74,9 @@ export function ServicesHero() {
         {/* Quick Capabilities Strip */}
-        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-6">
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-6">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
               {hero.cap1Label}
             </p>
@@ -84,3 +84,3 @@ export function ServicesHero() {
           </div>
 
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
               {hero.cap2Label}
@@ -93,3 +93,3 @@ export function ServicesHero() {
           </div>
 
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
               {hero.cap3Label}
@@ -103,3 +103,3 @@ export function ServicesHero() {
           </div>
 
-          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
+          <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
             <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
```

- **Regression Risks & Mitigations:**
  - *Risk:* Reducing padding to `p-3` places text 12px from the card edge instead of 16px. If card heights vary due to unequal text lines across the 2-column grid, visual alignment could look uneven.
  - *Mitigation & Verification:* Inspect all 4 cards in `AboutHero` and all 4 cards in `ServicesHero` across 320px, 375px, 390px, and 430px in both EN and VI. Verify that card borders, status dots (`bg-emerald-500`), and typography maintain visual harmony without clipping.

---

### ITEM 3 — ISSUE-22-03: Mobile Header Spacing Safeguards at 320px
- **Issue Addressed:** `ISSUE-22-03` (Low)
- **Target File:** `components/common/Header.tsx`
- **Intended Behavior:**
  Prevent accidental flex shrinking or element wrapping in the mobile header at 320px viewport by adding `shrink-0` to the brand logo wrapper and hamburger button, and setting the action container gap to `gap-1.5 sm:gap-2`.
- **Detailed Component Width Calculations at 320px:**
  - *Container Available Width:* 320px viewport minus 32px (`px-4` = 16px left + 16px right) = **288px**.
  - *Brand Logo (`TypographicLogo size="md"`):*
    - Text: "BIZWORK" + "-IT" in Inter 800 at `text-xl` (20px, `tracking-tight`) $\approx 125$px.
    - Gap (4px) + Animated Sky Dot (8px) $\approx 12$px.
    - Total Logo Width: $\approx \mathbf{135\text{px}}$ (in both EN and VI).
  - *LanguageSwitcher (`size="sm"`):*
    - Border (2px) + Padding (`p-1` = 8px) = 10px container overhead.
    - EN button: `min-w-[44px]` = 44px.
    - VI button: `min-w-[44px]` = 44px.
    - Total Switcher Width: $44\text{px} + 44\text{px} + 10\text{px} = \mathbf{98\text{px}}$ (constant in both EN and VI).
  - *Hamburger Button:* `h-11 w-11` = **44px**.
  - *Action Container Gap (`gap-1.5`):* $0.375\text{rem} = \mathbf{6\text{px}}$ (reduced from `gap-2` = 8px).
  - *Right Action Group Combined Width:* $98\text{px} + 6\text{px} + 44\text{px} = \mathbf{148\text{px}}$.
  - *Total Header Content Width:* $135\text{px (Logo)} + 148\text{px (Actions)} = \mathbf{283\text{px}}$.
  - *Remaining Clearance at 320px:* $288\text{px} - 283\text{px} = \mathbf{+5\text{px}}$ positive clearance buffer (theoretical estimate).
- **Theoretical Clearance Estimate vs. Real Browser Fit:**
  The calculated 5px remaining header clearance is strictly a **theoretical estimate** based on nominal font metrics; it is **not proof of real browser fit**. Actual rendered widths must be verified under real browser rendering in both **English (`en`)** and **Vietnamese (`vi`)**.
- **Real Browser Verification Requirements at 320px:**
  Testing at **320px viewport width** must verify:
  1. Zero horizontal overflow (no horizontal scrolling).
  2. Zero element clipping on the logo or action controls.
  3. Zero unintended flex compression (hamburger remains full 44px $\times$ 44px, logo text does not shrink).
- **Clarification on `shrink-0` Functionality:**
  Adding `shrink-0` ensures that neither the logo nor the hamburger button can be compressed by CSS flexbox if font metrics vary. However, `shrink-0` **does not create additional space**—if intrinsic width were to exceed 288px, `shrink-0` would cause horizontal overflow rather than compression. Therefore, both `shrink-0` and the gap adjustment (`gap-1.5 sm:gap-2`) are necessary.
- **Contingency Stop Condition:**
  If the test fails (i.e. real browser rendering reveals horizontal overflow, clipping, or unintended flex compression at 320px), **do not silently expand implementation scope**. Stop immediately and request separate Project Owner approval before taking any further action.
- **Exact Proposed Change:**

```diff
--- a/components/common/Header.tsx
+++ b/components/common/Header.tsx
@@ -65,3 +65,3 @@ export function Header() {
         {/* Brand Logo */}
-        <div className="flex items-center">
+        <div className="flex items-center shrink-0">
           <TypographicLogo size="md" ariaLabel={t.common.header.logoHomeAria} />
@@ -109,7 +109,7 @@ export function Header() {
         {/* Mobile Header Actions (Switcher on small screens + Hamburger) */}
-        <div className="flex items-center gap-2 lg:hidden">
+        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
           <LanguageSwitcher size="sm" />
 
           <button
             ref={menuButtonRef}
             type="button"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
-            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
+            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
```

- **Regression Risks & Mitigations:**
  - *Risk:* Reducing gap to 6px places the LanguageSwitcher closer to the hamburger button.
  - *Mitigation & Verification:* Both elements maintain distinct hit targets $\ge 44$px. Verify visually and through geometry inspection that touch targets do not overlap and that the 6px boundary prevents accidental taps.

---

### ITEM 4 — ISSUE-22-04: Custom 404 Action Buttons Stacking on Mobile
- **Issue Addressed:** `ISSUE-22-04` (Low)
- **Target File:** `components/common/NotFoundContent.tsx`
- **Intended Behavior:**
  Reorganize the 404 action buttons from a horizontal-only row (`flex justify-center gap-4`) into a responsive flex layout (`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4`) with `w-full sm:w-auto` on both buttons, ensuring thumb-friendly full-width touch targets on mobile screens.
- **`components/common/Button.tsx` Compatibility Audit:**
  - *Source Code Verification:* Inspected `components/common/Button.tsx`.
  - *Props Interface:* `ButtonBaseProps` explicitly declares `className?: string`.
  - *Class Merging Implementation:*
    ```tsx
    const resolvedClasses = `${baseClasses} ${variantStyles[variant]} ${
      variant === "link" ? "" : sizeStyles[size]
    } ${className}`;
    ```
  - *Width Specificity:* Neither `baseClasses` nor `sizeStyles` contains an unconditional `w-auto` or `w-full` class. `baseClasses` declares `inline-flex`. Passing `className="w-full sm:w-auto"` appends `w-full sm:w-auto` at the end of `resolvedClasses`.
  - *Precedent Verification:* This exact pattern is already proven in:
    - `HeroSection.tsx:56`: `<Button ... className="w-full sm:w-auto">`
    - `AboutHero.tsx:65`: `<Button ... className="w-full sm:w-auto">`
    - `ServicesHero.tsx:65`: `<Button ... className="w-full sm:w-auto">`
    - `PartnershipCta.tsx:75`: `<Button ... className="w-full sm:w-auto">`
  - *Conclusion:* `Button.tsx` is **100% compatible**. No modifications to `Button.tsx` are needed or permitted.
- **Exact Proposed Change:**

```diff
--- a/components/common/NotFoundContent.tsx
+++ b/components/common/NotFoundContent.tsx
@@ -23,9 +23,9 @@ export function NotFoundContent() {
         </p>
-        <div className="mt-8 flex justify-center gap-4">
-          <Button href="/" variant="primary" size="md">
+        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
+          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
             {notFound.buttonHome}
           </Button>
-          <Button href="/contact" variant="secondary" size="md">
+          <Button href="/contact" variant="secondary" size="md" className="w-full sm:w-auto">
             {notFound.buttonContact}
           </Button>
         </div>
```

- **Regression Risks & Mitigations:**
  - *Risk:* Full-width stacked buttons on mobile increase the vertical height of the button block by ~52px on mobile screens ($< 640$px).
  - *Mitigation & Verification:* Verify that the overall 404 container (`py-24 sm:py-32`) remains vertically centered in the viewport and does not cause unwanted vertical scrolling on short mobile screens (e.g. 568px height).

---

## 3. REGRESSION RISK ASSESSMENT MATRIX

| Target Area | Potential Risk | Likelihood | Impact | Mitigation & Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **FAQ Accordion** | Vertical section expansion (+60px on mobile) disrupts spacing to `ServicesCta`. | Low | Low | Inspect vertical rhythm across `/services`. Verify accordion toggle animations remain smooth. |
| **Hero Fact Strips** | Uneven card heights if text wrapping varies between adjacent cards in 2-column grid. | Medium | Low | Verify all 4 cards in `AboutHero` and `ServicesHero` in EN and VI at 320px and 375px. Verify desktop $\ge 640$px is unchanged. |
| **Header Spacing** | 6px gap between language switcher and hamburger risks finger mis-taps; 5px margin at 320px risks clipping on custom system fonts. | Low | Medium | Verify computed bounding boxes. Verify EN and VI states at 320px. Stop and report if overflow occurs. |
| **404 Action Buttons** | Button height expansion causes vertical scroll on short mobile viewports. | Very Low | Low | Test 404 page at 320px $\times$ 568px (iPhone SE 1st gen). Verify buttons revert to side-by-side at $\ge 640$px. |
| **Shared Button Styles** | CSS class collision between `sizeStyles` and `className="w-full sm:w-auto"`. | None | None | Confirmed compatible via `Button.tsx` source audit and production precedents. |

---

## 4. VERIFICATION SPECIFICATIONS

### 4.1 Automated Tooling Checks
Upon implementation authorization, the following CLI checks are mandatory:
1. `npx tsc --noEmit` — Zero TypeScript compilation errors.
2. `npm run lint` — Zero ESLint warnings or errors.
3. `npm run build` — Successful static prerendering of all 5 production routes (`/`, `/about`, `/services`, `/contact`, `/not-found`).

### 4.2 Explicit Responsive Breakpoint Checks
Every affected component must be verified across exactly **8 viewport widths** (preserving the required list: **320px**, **375px**, **390px**, **430px**, **768px**, **820px**, **1024px**, and **1280px**):

| Breakpoint Tier | Target Widths | Testing Focus |
| :--- | :--- | :--- |
| **Mobile Compact** | **320px**, **375px**, **390px**, **430px** | - `Header`: Zero overflow; logo + actions fit within 288px container.<br>- `AboutHero` & `ServicesHero`: Fact cards render in 2 columns with reduced padding.<br>- `NotFoundContent`: Buttons stack vertically to 100% width.<br>- `FaqAccordion`: Rendered button height $\ge 44$px. |
| **Tablet** | **768px**, **820px**, **1024px** | - `Header`: Transitions smoothly to desktop nav at `lg:` (1024px).<br>- `AboutHero` & `ServicesHero`: Fact cards render in 4 columns (`sm:grid-cols-4 sm:gap-6 sm:p-4`).<br>- `NotFoundContent`: Buttons display side-by-side (`sm:flex-row sm:w-auto`).<br>- `FaqAccordion`: Rendered button height $\ge 44$px (`sm:py-2`). |
| **Desktop** | **1280px** | - Container bounds constrained to `max-w-7xl mx-auto`.<br>- Desktop layouts 100% identical to production baseline. |

### 4.3 Bilingual Content Verification
All responsive checks must be executed in both **English (`en`)** and **Vietnamese (`vi`)** to confirm that longer Vietnamese strings ("TRẠNG THÁI DOANH NGHIỆP", "Về trang chủ", "Liên hệ hỗ trợ") wrap gracefully without layout breakage.

### 4.4 Evidence Reporting Standards
In all subsequent reporting, findings must be strictly categorized into:
1. **Static Source Inspection:** Exact file paths and line numbers verified from code.
2. **Automated Geometry & DOM Calculations:** Box-model calculations (padding, margins, track widths).
3. **Physical Browser Testing:** Clearly state whether live browser rendering was executed or unavailable. **Never claim browser testing passed unless physically executed.**

---

## 5. STRICT STOP CONDITION

**NO CODING AUTHORIZED AT THIS STAGE.**  
This document represents **Revision 1** of the Task 22 Implementation Plan. The agent will stop immediately and wait for explicit Project Owner approval before modifying any application source code.
