# TASK 18 AUDIT REPORT — FULL BILINGUAL COVERAGE AUDIT & REFINEMENT
## BIZWORK-IT WEBSITE REDESIGN — PHASE 01: CRITICAL FIXES

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Phase:** 01 — Critical Fixes
- **Task:** 18 — Full Bilingual Coverage Audit & Refinement
- **Baseline Git Commit:** `e0f2124`
- **Task 17 Git Commit:** `e188a29`
- **Audit Revision:** 2.0 (Post-Review Plan Revision)
- **Revision Date:** 2026-11-17
- **Execution Mode:** PLAN REVISION ONLY — NO CODE OR DICTIONARY MODIFICATIONS
- **Status:** AUDIT COMPLETE — WAITING FOR PROJECT OWNER REVIEW AND IMPLEMENTATION APPROVAL

---

## 1. EXECUTIVE SUMMARY

This revised audit report provides a definitive technical evaluation and refined implementation plan for the bilingual English (EN) and Vietnamese (VI) coverage across the BIZWORK-IT website. The audit evaluated all 41 application source files across `app/`, `components/`, and `lib/i18n/`.

### Key Audit Highlights:
1. **Existing Translation Parity:** The existing dictionaries (`en.ts` and `vi.ts`) contain **343 key paths each**, exhibiting **100% key parity** (0 missing keys, 0 empty strings, 0 array length mismatches).
2. **404 Page Architecture (ISSUE-18-01, HIGH & ISSUE-18-02, MEDIUM):** Currently, `app/not-found.tsx` is an unlocalized Server Component with 5 hardcoded English strings. Dynamic document titles in `LanguageContext.tsx` default to the homepage title for unmatched routes. The implementation preserves Next.js server metadata capabilities on `app/not-found.tsx` by delegating client rendering to a dedicated `NotFoundContent` component and centralizing title fallback in `LanguageContext.tsx`.
3. **ContactForm Validation State (ISSUE-18-07, MEDIUM):** Rather than introducing a `useEffect` synchronization hook, the form will store semantic error keys (`ErrorKey`) in React state and resolve them to translated strings synchronously during render via `formText[errors.field]`.
4. **Runtime Fallback Proxy Reclassified (ISSUE-18-08, INFORMATIONAL):** Reclassified from an implementation defect to an architectural observation. TypeScript strict compilation provides 100% compile-time protection for all 343 keys; an added runtime Proxy is unnecessary and has been removed from the implementation scope.
5. **Accessibility Landmark Labels (ISSUE-18-03 to ISSUE-18-06, MEDIUM & LOW):** Hardcoded English strings on navigation landmarks (`aria-label="Main Navigation"`, `"Mobile Navigation"`), hero breadcrumbs, logo home links, and architecture diagrams will be connected to strictly typed dictionary keys.

---

## 2. TECHNICAL CLARIFICATIONS & ARCHITECTURAL RESOLUTIONS

### 2.1 ISSUE-18-08 — Runtime Fallback Proxy Clarification
- **Evaluation:** In `lib/i18n/`, `en.ts` and `vi.ts` are statically bundled TypeScript modules typed strictly against `TranslationDictionary`. Both dictionaries possess 100% parity across 343 keys.
- **Can a user-facing defect occur?** No. Because dictionaries are static and strictly typed, any missing key causes an immediate compile-time error during `npx tsc --noEmit` and halts `npm run build`. No dictionary keys are loaded dynamically or asynchronously from external APIs.
- **Is a Proxy necessary?** No. Introducing a `Proxy` introduces unnecessary runtime property lookup overhead and can mask missing translations by silently falling back to English instead of catching them at compile time.
- **Resolution:** Reclassified as **ARCHITECTURAL OBSERVATION (Informational)**. Dropped from implementation scope.

### 2.2 ISSUE-18-07 — ContactForm Validation State Architecture
- **Evaluation:** `components/contact/ContactForm.tsx` currently returns evaluated strings (e.g., `formText.errorRequiredName`) from `validateField()` and stores them in `useState<FormErrors>`. If a user toggles the language switcher while errors are active, the state holds the prior language's string.
- **Selected Architecture (No `useEffect`):**
  - Define `type ErrorKey = "errorRequiredName" | "errorNameLength" | "errorRequiredEmail" | "errorEmailFormat" | "errorRequiredMessage" | "errorMessageLength";`
  - In `validateField()`, return the semantic `ErrorKey` instead of the translated string.
  - Store `Record<string, ErrorKey>` in React state.
  - During component render, resolve: `errors.fullName ? formText[errors.fullName] : undefined`.
  - **Benefits:** When `language` toggles, React re-renders `ContactForm`, and `formText[errors.fullName]` resolves synchronously to the new language's message. Zero `useEffect` hooks, zero race conditions, and zero state lag.

### 2.3 ISSUE-18-02 & ISSUE-18-01 — 404 Page & Document Title Architecture
- **Evaluation:** In Next.js App Router, `app/not-found.tsx` is a root-level route convention. Marking `app/not-found.tsx` directly with `"use client"` disables the ability to export server `Metadata`.
- **Selected Architecture:**
  1. **Server Metadata Preservation:** Keep `app/not-found.tsx` as a Server Component. Export static server metadata:
     ```tsx
     export const metadata: Metadata = {
       title: "Page Not Found",
     };
     ```
  2. **Client UI Component:** Create `components/common/NotFoundContent.tsx` marked `"use client"`. It consumes `useLanguage()`, accessing `t.notFound.*` for the badge, title, description, and action buttons.
  3. **Centralized Dynamic Title Management:** `LanguageContext.tsx` is already the single source of truth for dynamic client-side titles across all pages. Update `PAGE_TITLES` to include `"/404"`, and update `matchedTitle` fallback:
     ```tsx
     const titles = PAGE_TITLES[language];
     const matchedTitle = titles[pathname] || titles["/404"];
     ```
     When an unmapped path (e.g., `/unknown-page`) is accessed, `LanguageContext` matches `titles["/404"]` (`"Page Not Found | BIZWORK-IT"` in EN, `"Không Tìm Thấy Trang | BIZWORK-IT"` in VI), updating dynamically upon language toggle without duplicate client-side title effects.

---

## 3. DICTIONARY KEY MAPPING TABLE

The exact key names, values, consuming components, and associated issue IDs are detailed below. All keys match 100% across `lib/i18n/types.ts`, `en.ts`, and `vi.ts`.

| Key Path | English Value (`en.ts`) | Vietnamese Value (`vi.ts`) | Consuming Component | Issue ID |
| :--- | :--- | :--- | :--- | :---: |
| `notFound.badge` | `"404 Error"` | `"Lỗi 404"` | `components/common/NotFoundContent.tsx` | `ISSUE-18-01` |
| `notFound.title` | `"Page Not Found"` | `"Không Tìm Thấy Trang"` | `components/common/NotFoundContent.tsx` | `ISSUE-18-01` |
| `notFound.description` | `"The page you are looking for does not exist or has been moved. Please navigate using the menu or return to the homepage."` | `"Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Vui lòng sử dụng thanh điều hướng hoặc quay về trang chủ."` | `components/common/NotFoundContent.tsx` | `ISSUE-18-01` |
| `notFound.buttonHome` | `"Return to Home"` | `"Về Trang Chủ"` | `components/common/NotFoundContent.tsx` | `ISSUE-18-01` |
| `notFound.buttonContact` | `"Contact Support"` | `"Liên Hệ Hỗ Trợ"` | `components/common/NotFoundContent.tsx` | `ISSUE-18-01` |
| `common.header.mainNavAria` | `"Main Navigation"` | `"Điều hướng chính"` | `components/common/Header.tsx` | `ISSUE-18-03` |
| `common.header.mobileNavAria`| `"Mobile Navigation"` | `"Điều hướng di động"` | `components/common/Header.tsx` | `ISSUE-18-03` |
| `common.header.logoHomeAria` | `"BIZWORK-IT — Return to Home"` | `"BIZWORK-IT — Về trang chủ"` | `components/common/Header.tsx` $\rightarrow$ `TypographicLogo.tsx` | `ISSUE-18-05` |
| `common.breadcrumbAria` | `"Breadcrumb"` | `"Đường dẫn điều hướng"` | `AboutHero.tsx`, `ServicesHero.tsx`, `ContactHero.tsx` | `ISSUE-18-04` |
| `home.hero.visual.diagramAria`| `"BIZWORK-IT Infrastructure Management Architecture diagram"` | `"Sơ đồ kiến trúc quản lý hạ tầng BIZWORK-IT"` | `components/home/TechVisual.tsx` | `ISSUE-18-06` |

*Note on Document Titles (`ISSUE-18-02`):*
- In `lib/i18n/LanguageContext.tsx`:
  - `PAGE_TITLES.en["/404"]` = `"Page Not Found | BIZWORK-IT"`
  - `PAGE_TITLES.vi["/404"]` = `"Không Tìm Thấy Trang | BIZWORK-IT"`

---

## 4. DEFECT REGISTER (REVISED)

| Issue ID | Severity | File Reference | Status in Plan |
| :---: | :---: | :--- | :---: |
| **ISSUE-18-01** | **HIGH** | `app/not-found.tsx` | Scheduled for Step 2 (`NotFoundContent` Client Component) |
| **ISSUE-18-02** | **MEDIUM** | `lib/i18n/LanguageContext.tsx` | Scheduled for Step 2 (`PAGE_TITLES` Fallback) |
| **ISSUE-18-03** | **MEDIUM** | `components/common/Header.tsx` | Scheduled for Step 3 (Navigation Landmark A11y Keys) |
| **ISSUE-18-04** | **LOW** | `components/{about,services,contact}/*Hero.tsx` | Scheduled for Step 3 (Breadcrumb A11y Keys) |
| **ISSUE-18-05** | **LOW** | `components/common/TypographicLogo.tsx` | Scheduled for Step 3 (Logo Link A11y Key via Prop) |
| **ISSUE-18-06** | **LOW** | `components/home/TechVisual.tsx` | Scheduled for Step 3 (SVG Diagram A11y Key) |
| **ISSUE-18-07** | **MEDIUM** | `components/contact/ContactForm.tsx` | Scheduled for Step 3 (Render-time `ErrorKey` Resolution) |
| **ISSUE-18-08** | **INFO** | `lib/i18n/LanguageContext.tsx` | **Reclassified to Architectural Observation (No Code Needed)** |

---

## 5. REVISED IMPLEMENTATION PLAN

The implementation is structured into three discrete, reviewable steps strictly avoiding unnecessary changes.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ REVISED TASK 18 IMPLEMENTATION STEPS                                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STEP 1: DICTIONARY SCHEMA & CONTENT EXTENSION                                          │
│   - Add 10 keys to types.ts, en.ts, and vi.ts                                          │
│   - Purely additive schema update verified by tsc strict mode                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STEP 2: 404 NOT FOUND ARCHITECTURE & DYNAMIC DOCUMENT TITLE                            │
│   - Add /404 title to LanguageContext.tsx PAGE_TITLES with unmapped route fallback     │
│   - Create components/common/NotFoundContent.tsx (Client Component)                    │
│   - Update app/not-found.tsx (Server Component with Metadata rendering NotFoundContent) │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STEP 3: ACCESSIBILITY LANDMARKS & CONTACT FORM ERROR RESOLUTION                        │
│   - Bind localized aria-labels in Header.tsx, TypographicLogo, Heroes, TechVisual      │
│   - Refactor ContactForm.tsx to store semantic ErrorKey, resolving during render       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Step 1: Dictionary Schema & Content Extension
- **Files Modified (3):**
  1. [lib/i18n/types.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/types.ts)
  2. [lib/i18n/dictionaries/en.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/dictionaries/en.ts)
  3. [lib/i18n/dictionaries/vi.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/dictionaries/vi.ts)
- **Issues Resolved:** Schema prerequisites for `ISSUE-18-01`, `ISSUE-18-03`, `ISSUE-18-04`, `ISSUE-18-05`, `ISSUE-18-06`.
- **Modifications:**
  - Add `notFound: { badge: string; title: string; description: string; buttonHome: string; buttonContact: string; }` to `TranslationDictionary`.
  - Add `mainNavAria: string; mobileNavAria: string; logoHomeAria: string;` to `common.header`.
  - Add `breadcrumbAria: string;` to `common`.
  - Add `diagramAria: string;` to `home.hero.visual`.
  - Populate exact EN and VI values in `en.ts` and `vi.ts`.
- **Regression Risks:** Zero. Additive type interface and dictionary properties.
- **Verification Method:** `npx tsc --noEmit` exits with 0 errors.

### Step 2: 404 Not Found Architecture & Dynamic Document Title
- **Files Modified/Created (4):**
  1. [lib/i18n/LanguageContext.tsx](file:///d:/job/1_bizwork-redesign/lib/i18n/LanguageContext.tsx) (Modified)
  2. [components/common/NotFoundContent.tsx](file:///d:/job/1_bizwork-redesign/components/common/NotFoundContent.tsx) (New file)
  3. [components/common/index.ts](file:///d:/job/1_bizwork-redesign/components/common/index.ts) (Modified)
  4. [app/not-found.tsx](file:///d:/job/1_bizwork-redesign/app/not-found.tsx) (Modified)
- **Issues Resolved:** `ISSUE-18-01`, `ISSUE-18-02`.
- **Modifications:**
  - In `LanguageContext.tsx`, add `"/404"` to `PAGE_TITLES[en]` and `PAGE_TITLES[vi]`. Update title fallback logic: `titles[pathname] || titles["/404"]`.
  - In `NotFoundContent.tsx`, create `"use client"` component consuming `const { t } = useLanguage()`, rendering `t.notFound.badge`, `title`, `description`, and action buttons (`buttonHome`, `buttonContact`).
  - Export `NotFoundContent` from `components/common/index.ts`.
  - In `app/not-found.tsx`, export `metadata: Metadata = { title: "Page Not Found" }` and render `<NotFoundContent />`.
- **Regression Risks:** Very low. Preserves Next.js Server Component boundary while isolating client language reactivity to `NotFoundContent`.
- **Verification Method:**
  - Prerender verification with `npm run build` (confirming `○ /_not-found` prerenders statically).
  - DOM inspection of text and document `<title>` in EN and VI modes.

### Step 3: Accessibility Landmarks & Contact Form Error Resolution
- **Files Modified (7):**
  1. [components/common/Header.tsx](file:///d:/job/1_bizwork-redesign/components/common/Header.tsx)
  2. [components/common/TypographicLogo.tsx](file:///d:/job/1_bizwork-redesign/components/common/TypographicLogo.tsx)
  3. [components/about/AboutHero.tsx](file:///d:/job/1_bizwork-redesign/components/about/AboutHero.tsx)
  4. [components/services/ServicesHero.tsx](file:///d:/job/1_bizwork-redesign/components/services/ServicesHero.tsx)
  5. [components/contact/ContactHero.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactHero.tsx)
  6. [components/home/TechVisual.tsx](file:///d:/job/1_bizwork-redesign/components/home/TechVisual.tsx)
  7. [components/contact/ContactForm.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx)
- **Issues Resolved:** `ISSUE-18-03`, `ISSUE-18-04`, `ISSUE-18-05`, `ISSUE-18-06`, `ISSUE-18-07`.
- **Modifications:**
  - In `Header.tsx`, bind `aria-label={t.common.header.mainNavAria}` and `aria-label={t.common.header.mobileNavAria}`. Pass `ariaLabel={t.common.header.logoHomeAria}` to `<TypographicLogo />`.
  - In `TypographicLogo.tsx`, accept optional prop `ariaLabel?: string` (defaulting to `"BIZWORK-IT — Return to Home"`).
  - In `AboutHero.tsx`, `ServicesHero.tsx`, `ContactHero.tsx`, bind `aria-label={t.common.breadcrumbAria}`.
  - In `TechVisual.tsx`, bind `aria-label={visual.diagramAria}`.
  - In `ContactForm.tsx`, refactor `validateField()` to return semantic `ErrorKey` instead of string; store `ErrorKey` in state; resolve dynamically in JSX via `formText[errors.fieldName]`.
- **Regression Risks:** Low. HTML attributes and error rendering do not alter DOM hierarchy, styling, or form submission logic.
- **Verification Method:** Inspect HTML `aria-label` attributes across all pages in EN and VI; verify error message language switching on active form. Run `npx tsc --noEmit` and `npm run lint`.

---

## 6. REVISED AFFECTED FILES LIST

Total files in implementation scope: **12 files** (11 modified, 1 new file).

1. `lib/i18n/types.ts` (Modified)
2. `lib/i18n/dictionaries/en.ts` (Modified)
3. `lib/i18n/dictionaries/vi.ts` (Modified)
4. `lib/i18n/LanguageContext.tsx` (Modified)
5. `components/common/NotFoundContent.tsx` (**New file**)
6. `components/common/index.ts` (Modified)
7. `app/not-found.tsx` (Modified)
8. `components/common/Header.tsx` (Modified)
9. `components/common/TypographicLogo.tsx` (Modified)
10. `components/about/AboutHero.tsx` (Modified)
11. `components/services/ServicesHero.tsx` (Modified)
12. `components/contact/ContactHero.tsx` (Modified)
13. `components/home/TechVisual.tsx` (Modified)
14. `components/contact/ContactForm.tsx` (Modified)

*(Note: AboutHero, ServicesHero, and ContactHero share identical breadcrumb key integration).*

---

## 7. RISKS & VERIFICATION STRATEGY

| Risk Category | Potential Concern | Mitigation Strategy | Verification Technique |
| :--- | :--- | :--- | :--- |
| **Type Integrity** | Mismatched key names between dictionaries and code | Strictly typed `TranslationDictionary` interface in `types.ts` | `npx tsc --noEmit` (compile-time gate) |
| **Build Prerendering** | 404 page failure during static export | Preserve Server Component boundary on `app/not-found.tsx` | `npm run build` static output verification |
| **Form UX** | Form reset or submission logic alteration | Validation logic returns error key; submit and reset handlers remain untouched | Manual simulated submission & reset test |
| **Code Quality** | Unused variables, ESLint warnings | Strict linting enforcement | `npm run lint` |

---

## 8. MANDATORY HALT & GIT STATUS

```powershell
$ git status
On branch master
Untracked files:
  docs/TASK_18_AUDIT_REPORT.md
nothing added to commit but untracked files present
```

### Confirmation:
- **No application code or dictionary has been modified.**
- **`docs/TASK_TRACKER.md` has NOT been updated.**
- **Task 18 coding has NOT begun.**
- **The system is HALTED awaiting explicit project owner approval to begin coding.**
