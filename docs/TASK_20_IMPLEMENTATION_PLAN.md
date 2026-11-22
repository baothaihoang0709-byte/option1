# TASK 20 — SPACING & LAYOUT REFINEMENT IMPLEMENTATION PLAN
**Visual Consistency Phase (Phase 03 — Task 20)**

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Current Status:** `PLANNING COMPLETED — AWAITING CODING AUTHORIZATION`
- **Execution Mode:** IMPLEMENTATION PLAN ONLY (Coding Strictly Prohibited until Approved)
- **Baseline Commit:** `e188a29` (Task 17 accepted commit)

---

## 1. OBJECTIVE & SCOPE DEFINITION

This implementation plan details the exact surgical modifications required to resolve the 5 layout and spacing issues identified in `docs/TASK_20_AUDIT_REPORT.md`.

### Core Principles:
1. **Minimal Surface Area:** Exactly **5 source files** will be modified.
2. **Zero Functional or Copy Regressions:** No text strings, translation keys, state logic, focus management, or event handlers will be altered.
3. **Preservation of Tasks 18 & 19:** All previous enhancements (bilingual dictionary parity, accessible landmarks, focus management, WCAG contrast) will remain completely intact.
4. **Token Normalization:** Aligning spacing tokens to the project's established standards (`py-16 sm:py-24`, `mt-14`, `min-w-[180px]`).

---

## 2. AUTHORIZED FILE LIST

The following 5 files constitute the entire implementation scope:

1. `app/contact/page.tsx`
2. `components/contact/WhatHappensNext.tsx`
3. `components/about/PartnershipCta.tsx`
4. `components/about/CustomerCommitment.tsx`
5. `components/services/FaqAccordion.tsx`

*No other source file, dictionary file, or configuration file may be edited.*

---

## 3. PROPOSED IMPLEMENTATION SEQUENCE & DETAILED CODE CHANGES

### STEP 1: Normalize Contact Page Main Section Spacing & Border (ISSUE-20-01)
- **File:** `app/contact/page.tsx`
- **Lines:** 24–27
- **Target Code:**
  ```tsx
  <section
    aria-labelledby="contact-form-heading"
    className="py-12 sm:py-16 bg-slate-50/50 border-y border-slate-200/80"
  >
  ```
- **Replacement Code:**
  ```tsx
  <section
    aria-labelledby="contact-form-heading"
    className="py-16 sm:py-24 bg-slate-50/50 border-y border-slate-200/80"
  >
  ```
- **Expected Outcome:** Contact section vertical padding expands from 64px to 96px on desktop (and 48px to 64px on mobile), aligning with all other standard page sections.

---

### STEP 2: Eliminate Double Border at Contact Section Junction & Normalize Note Margin (ISSUE-20-02, ISSUE-20-05)
- **File:** `components/contact/WhatHappensNext.tsx`
- **Lines:** 77–78 & 120
- **Target Code 1 (Section boundary):**
  ```tsx
  <section
    aria-labelledby="what-happens-next-heading"
    className="py-16 sm:py-24 bg-white border-t border-slate-200/80"
  >
  ```
- **Replacement Code 1:**
  ```tsx
  <section
    aria-labelledby="what-happens-next-heading"
    className="py-16 sm:py-24 bg-white"
  >
  ```
- **Target Code 2 (Post-grid auxiliary note spacing):**
  ```tsx
  {/* Unified Consultation Note */}
  <div className="mt-10 text-center">
  ```
- **Replacement Code 2:**
  ```tsx
  {/* Unified Consultation Note */}
  <div className="mt-12 text-center">
  ```
- **Expected Outcome:**
  - The double border (2px) between Contact Form and WhatHappensNext is resolved into a crisp, single 1px divider drawn by the preceding section's bottom border.
  - Spacing below the 3-column card grid matches the `mt-12` standard used in `ServicesOverviewSection` and `WorkingMethodologySection`.

---

### STEP 3: Standardize Dark CTA Banner Button Widths (ISSUE-20-03)
- **File:** `components/about/PartnershipCta.tsx`
- **Lines:** 56–68
- **Target Code:**
  ```tsx
  <Button
    href="/contact"
    variant="primary"
    size="lg"
    className="w-full sm:w-auto min-w-[190px]"
  >
    {data.ctaPrimary}
  </Button>
  <Button
    href="/services"
    variant="secondary-dark"
    size="lg"
    className="w-full sm:w-auto min-w-[190px]"
  >
    {data.ctaSecondary}
  </Button>
  ```
- **Replacement Code:**
  ```tsx
  <Button
    href="/contact"
    variant="primary"
    size="lg"
    className="w-full sm:w-auto min-w-[180px]"
  >
    {data.ctaPrimary}
  </Button>
  <Button
    href="/services"
    variant="secondary-dark"
    size="lg"
    className="w-full sm:w-auto min-w-[180px]"
  >
    {data.ctaSecondary}
  </Button>
  ```
- **Expected Outcome:** Buttons in `PartnershipCta` match the exact `min-w-[180px]` specification shared by `ConversionCtaSection` (Home), `ServicesCta` (Services), and `ContactClosingCta` (Contact).

---

### STEP 4: Standardize Margin Below SectionHeader in CustomerCommitment (ISSUE-20-04)
- **File:** `components/about/CustomerCommitment.tsx`
- **Line:** 46
- **Target Code:**
  ```tsx
  {/* Featured Commitment Hero Card */}
  <div className="mt-12 overflow-hidden rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 p-8 sm:p-12 lg:p-14 shadow-sm relative">
  ```
- **Replacement Code:**
  ```tsx
  {/* Featured Commitment Hero Card */}
  <div className="mt-14 overflow-hidden rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 p-8 sm:p-12 lg:p-14 shadow-sm relative">
  ```
- **Expected Outcome:** Card spacing below SectionHeader increases by 8px, matching the standard `mt-14` across the site.

---

### STEP 5: Standardize Margin Below SectionHeader in FaqAccordion (ISSUE-20-04)
- **File:** `components/services/FaqAccordion.tsx`
- **Line:** 58
- **Target Code:**
  ```tsx
  <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
  ```
- **Replacement Code:**
  ```tsx
  <div className="mx-auto mt-14 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
  ```
- **Expected Outcome:** Accordion spacing below SectionHeader increases by 8px, matching the standard `mt-14` across the site.

---

## 4. REGRESSION RISKS & MITIGATION STRATEGY

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **Bilingual Translation Drift** | None | Low | Zero dictionary files (`en.ts`, `vi.ts`) or `types.ts` are touched. Automated parity audit will verify 362/362 key consistency. |
| **Contact Form Focus Regression** | None | High | `ContactForm.tsx` is completely untouched. Focus ref logic from Task 19 remains unaltered. |
| **Responsive Grid Overflow** | Low | Medium | Only padding and margins are modified; all grid column definitions (`grid-cols-*`) and container wrappers remain intact. |
| **Next.js Prerendering Failure** | Low | High | Full production build (`npm run build`) will be executed with all 5 static pages verified. |

---

## 5. VERIFICATION CHECKLIST (UPON CODING AUTHORIZATION)

Upon receiving Project Owner authorization to implement, the following automated checks will be conducted:

1. **Static Analysis & Compilations:**
   - [ ] `npx tsc --noEmit` $\rightarrow$ 0 errors.
   - [ ] `npm run lint` $\rightarrow$ 0 errors, 0 warnings.
   - [ ] `npm run build` $\rightarrow$ Code 0, 5 static routes generated (`/`, `/_not-found`, `/about`, `/contact`, `/services`).
   - [ ] `node scratch/audit_i18n.js` $\rightarrow$ 362/362 parity preserved.
2. **Layout & Spacing Specific Verifications:**
   - [ ] Confirm Contact Form section has `py-16 sm:py-24`.
   - [ ] Confirm boundary between Contact Form section and WhatHappensNext has exactly 1 border (no double border).
   - [ ] Confirm `PartnershipCta` buttons use `min-w-[180px]`.
   - [ ] Confirm all 9 `<SectionHeader />` content gaps are uniformly `mt-14`.
   - [ ] Confirm `WhatHappensNext` auxiliary note has `mt-12`.
3. **Viewport References:**
   - [ ] Desktop (1440px): Section padding 96px (`py-24`), container max 1280px (`max-w-7xl`).
   - [ ] Tablet (768px): Section padding 96px (`sm:py-24`), container horizontal padding 24px (`sm:px-6`).
   - [ ] Mobile (390px): Section padding 64px (`py-16`), container horizontal padding 16px (`px-4`), single-column stacked grids.

---

## 6. EXPLICIT OUT-OF-SCOPE ITEMS

The following areas are strictly out of scope for Task 20:
- Responsive touch gesture animations or micro-interactions (reserved for Task 22).
- Font family, typography sizing, or color palette changes (reserved for Task 21 / already approved in Task 16).
- Dictionary copy or translation modifications.
- Form validation algorithms or schema changes.
- Backend, API, database, or deployment configurations.
- Resetting or committing any existing changes from Task 18 or Task 19.

---

## 7. STOP CONDITION

Upon delivery of this plan and the accompanying audit report:
**STOP IMMEDIATELY.**
Wait for explicit review and coding authorization from the Project Owner.
