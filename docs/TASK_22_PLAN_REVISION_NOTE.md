# TASK 22 PLAN REVISION NOTE — REVISION 1

**Project:** BIZWORK-IT Website Redesign  
**Workspace:** `D:\job\1_bizwork-redesign`  
**Phase:** 04 — Responsive & Interactivity  
**Task:** 22 — Responsive & Interaction Refinement  
**Date:** 2026-11-19  
**Document Updated:** `docs/TASK_22_IMPLEMENTATION_PLAN.md` (Updated from Initial Draft to Revision 1)  
**Status:** REVISION COMPLETED — PENDING CODING AUTHORIZATION

---

## 1. PURPOSE & CONTEXT

Following the Project Owner's review of `docs/TASK_22_AUDIT_REPORT.md` and the initial draft of `docs/TASK_22_IMPLEMENTATION_PLAN.md`, this Revision Note documents all clarifications, geometric calculations, compatibility proofs, and risk assessments incorporated into **Revision 1** of the implementation plan.

---

## 2. DETAILED SUMMARY OF CLARIFICATIONS INCORPORATED

### 2.1 ISSUE-22-01: FAQ Touch Target Height & Acceptance Criteria
- **Class Retained:** `py-2.5 sm:py-2` on `components/services/FaqAccordion.tsx` trigger `<button>`.
- **Project Acceptance Standard:**
  - Defined the explicit project acceptance criterion: **minimum computed bounding-box height $\ge$ 44 CSS px** across mobile, tablet, and desktop viewports.
  - Eliminated external platform unit ambiguities and any reliance on class names alone to assert compliance.
- **Mathematical Proof & Geometry:**
  - *Icon Container:* Fixed height of 28px (`h-7 w-7` = $1.75\text{rem} = 28\text{px}$).
  - *Question Text:* `text-sm` (14px) with `leading-snug` (1.375 multiplier) = 19.25px line-height (desktop `text-base` 16px with `leading-snug` = 22px).
  - *Flex Alignment:* `items-start` dictates inner height is $\max(19.25, 28) = 28$px on single lines.
  - *Mobile ($< 640$px):* `py-2.5` adds 10px top + 10px bottom = 20px padding. Total computed height = $28 + 20 = \mathbf{48\text{ CSS px}}$ (satisfies the minimum $\ge 44$ CSS px acceptance standard).
  - *Desktop ($\ge 640$px):* `sm:py-2` adds 8px top + 8px bottom = 16px padding. Total computed height = $28 + 16 = \mathbf{44\text{ CSS px}}$ (satisfies the minimum $\ge 44$ CSS px acceptance standard).
  - *Multiline Wrap on Mobile:* Inner height = $38.5 + 20 = 58.5\text{ CSS px}$ ($> 44$ CSS px).

---

### 2.2 ISSUE-22-02: Fact Card Width & Geometric Estimation
- **Classes Retained:** `gap-3 sm:gap-6` and `p-3 sm:p-4` on `AboutHero.tsx` and `ServicesHero.tsx`.
- **Estimation Clarification:**
  - Documented the expected width gain (+10px per card) strictly as a **geometric estimate based on CSS box models**, rather than a guaranteed result.
  - Noted that actual text wrapping depends on browser font anti-aliasing, OS font rasterization, and language syllable lengths.
- **Box Model Breakdown:**
  - At 320px viewport (288px container):
    - Current (`gap-4`, `p-4`): $(288 - 16) / 2 = 136$px card; inner width = $136 - 32 = 104$px.
    - Proposed (`gap-3`, `p-3`): $(288 - 12) / 2 = 138$px card; inner width = $138 - 24 = 114$px.
    - Estimated width gain: $+10$px per card (+9.6% text area).
- **Verification Plan:**
  - Inspection across 320px and 375px in both English and Vietnamese.
  - Testing all 4 cards in `AboutHero` and all 4 cards in `ServicesHero`.
  - Zero clipping or awkward fragmentation.
  - Desktop invariance: layouts at $\ge 640$px remain 100% identical (`sm:grid-cols-4 sm:gap-6 sm:p-4`).

---

### 2.3 ISSUE-22-03: Header Spacing, Geometry & `shrink-0` Behavior
- **Changes Retained:**
  - Add `shrink-0` to the brand logo wrapper (`Header.tsx:66`).
  - Add `shrink-0` to the mobile hamburger button (`Header.tsx:117`).
  - Adjust action container gap to `gap-1.5 sm:gap-2` (`Header.tsx:110`).
- **`shrink-0` Behavioral Clarification:**
  - Clarified that `shrink-0` only prevents CSS flexbox from compressing elements below their intrinsic widths; it **does not create additional space**. If combined intrinsic widths exceed the container, `shrink-0` produces horizontal overflow. Both `shrink-0` and spacing optimization (`gap-1.5 sm:gap-2`) are necessary.
- **Calculated Component Widths at 320px:**
  - Container content width: $320 - 32\text{px padding} = \mathbf{288\text{px}}$.
  - Logo (`TypographicLogo size="md"`): $\approx \mathbf{135\text{px}}$ (constant across EN/VI).
  - LanguageSwitcher (`size="sm"`): $44\text{px (EN)} + 44\text{px (VI)} + 10\text{px (container)} = \mathbf{98\text{px}}$ (constant across EN/VI).
  - Hamburger button: $\mathbf{44\text{px}}$.
  - Action container gap (`gap-1.5`): $\mathbf{6\text{px}}$.
  - Combined actions width: $98 + 6 + 44 = \mathbf{148\text{px}}$.
  - Total header content width: $135 + 148 = \mathbf{283\text{px}}$.
  - Remaining buffer clearance at 320px: $288 - 283 = \mathbf{+5\text{px}}$ (theoretical estimate).
- **Theoretical Estimate vs. Real Browser Fit Clarification:**
  - The calculated 5px remaining clearance is strictly a **theoretical estimate** based on nominal font metric calculations, **not proof of real browser fit**.
  - Actual rendered widths must be verified under real browser rendering in both **English (`en`)** and **Vietnamese (`vi`)**.
  - The layout must be tested at **320px viewport width** to confirm **zero horizontal overflow, zero clipping, and zero unintended flex compression** (hamburger button must retain full 44px $\times$ 44px hit target, logo must not compress or wrap).
- **Contingency Stop Condition:**
  - If the test fails (i.e. real browser rendering reveals overflow, clipping, or unintended flex compression at 320px), the agent will **not silently expand the implementation scope**. It will stop immediately and request separate Project Owner approval before taking any further action.

---

### 2.4 ISSUE-22-04: Button.tsx Compatibility Proof
- **Source Inspection Conducted:** Inspected `components/common/Button.tsx`.
- **Props Compatibility:** `ButtonProps` extends `ButtonBaseProps`, which explicitly declares `className?: string`.
- **Class Concatenation:** Merges classes via template literal: `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.
- **No Style Conflicts:** Neither `baseClasses` nor `sizeStyles` specifies an unconditional `w-auto` or `w-full` class. Passing `className="w-full sm:w-auto"` appends the classes at the end with full CSS specificity.
- **Production Precedents:** Confirmed identical pattern already used in `HeroSection.tsx:56`, `AboutHero.tsx:65`, `ServicesHero.tsx:65`, and `PartnershipCta.tsx:75`.
- **Conclusion:** `Button.tsx` is 100% compatible. No changes to `Button.tsx` are required or permitted.

---

### 2.5 Realistic Regression Risk Assessment
Replaced generic "None" statements with a detailed Regression Risk Matrix evaluating:
1. **FAQ Section:** Vertical rhythm changes (+60px section height on mobile) affecting flow to `ServicesCta`.
2. **Hero Fact Strips:** Card height uniformity when text wrapping varies across 2-column mobile cards.
3. **Header Actions:** 6px gap proximity between LanguageSwitcher and hamburger button; 5px margin at 320px.
4. **404 Action Buttons:** Vertical height expansion (~52px) on short mobile viewports (e.g. 568px height).
5. **Shared Button Styles:** Verification of zero class collision with `Button.tsx`.

---

### 2.6 Comprehensive Responsive Verification Plan
- **8 Viewport Widths:** Exactly 8 viewport widths: **320px**, **375px**, **390px**, **430px**, **768px**, **820px**, **1024px**, and **1280px**.
- **Bilingual Verification:** Testing all affected components in both English (`en`) and Vietnamese (`vi`).
- **Reporting Truthfulness:** Categorizing all evidence into static source code inspection, automated geometry/DOM calculations, and physical browser testing. Strict prohibition against claiming browser testing passed unless physically performed.

---

## 3. SCOPE PRESERVATION & REVISION STATUS

- **Target Files (5 Only):**
  1. `components/services/FaqAccordion.tsx`
  2. `components/about/AboutHero.tsx`
  3. `components/services/ServicesHero.tsx`
  4. `components/common/Header.tsx`
  5. `components/common/NotFoundContent.tsx`
- **ISSUE-22-05:** Preserved strictly as an **Observation** (no implementation).
- **Source Code Status:** **ZERO application source code modified.**
- **Tracker Status:** `docs/TASK_TRACKER.md` untouched.
- **Git State:** Uncommitted changes from Tasks 18–21 strictly preserved. Zero stages, zero commits, zero pushes.

---

## 4. STOP CONDITION

Documentation revision is complete. Coding is **NOT AUTHORIZED**.  
Awaiting explicit Project Owner approval of **Revision 1** before proceeding.
