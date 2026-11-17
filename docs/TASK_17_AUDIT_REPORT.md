# TASK 17 AUDIT REPORT — CTA & BUTTON VISIBILITY, CONTRAST & BEHAVIOR AUDIT
## BIZWORK-IT WEBSITE REDESIGN — PHASE 01: CRITICAL FIXES

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Phase:** 01 — Critical Fixes
- **Task:** 17 — CTA/Button Visibility & Contrast Fix
- **Baseline Git Commit:** `e0f2124`
- **Documentation Commit:** `a755fb4`
- **Audit Revision:** 2.0 (Post-Validation & Technical Clarification)
- **Audit Date:** 2026-11-17
- **Audit Execution Mode:** AUDIT & ANALYSIS ONLY — NO CODE OR STYLESHEET MODIFICATIONS

---

## 1. EXECUTIVE SUMMARY

This revised audit report provides a rigorous technical evaluation of all Call-to-Action (CTA) buttons, interactive navigation triggers, form controls, and bilingual switches across the BIZWORK-IT website. The audit covers all four production routes (`/`, `/about`, `/services`, `/contact`), the custom 404 page, and all shared global components.

### Definitive Technical Audit Highlights:
1. **Critical CSS Class Collision Confirmed on Dark CTA Banners (ISSUE-17-02):**  
   Inspection of the compiled production stylesheet (`.next/static/chunks/3p3agb29ca5w2.css`) confirms that inline overrides on dark banner secondary buttons collide with the default styles of `Button.tsx`. Because `.bg-white` (byte index 27,453) appears *after* `.bg-slate-800` (byte index 26,930), and `.text-white` (byte index 38,430) appears *after* `.text-slate-800` (byte index 38,340), the W3C CSS Cascade determines that **white background** and **white text** both win. In default state, these buttons render with **white text on a white background** ($1.00:1$ contrast — completely unreadable).
2. **Focus Indicator Contrast Deficit (ISSUE-17-01):**  
   Secondary and Ghost button variants implement `focus-visible:ring-slate-400` (`#94A3B8`). While satisfying WCAG 2.2 SC 2.4.7 (Focus Visible, Level A) and SC 2.4.11 (Focus Not Obscured, Level AA), it yields a contrast of only **2.56:1** against white canvas and **2.45:1** against `slate-50`. This fails **WCAG 2.2 SC 1.4.11 Non-text Contrast (Level AA)**, which mandates $\ge 3.0:1$ for visual state indicators.
3. **Contact Form Submit Demo Tag Text Contrast (ISSUE-17-04):**  
   The supplementary tag `text-blue-200` (`#BFDBFE`) rendered on `bg-blue-600` (`#2563EB`) inside the submit button measures **3.64:1**, failing **WCAG 2.2 SC 1.4.3 Contrast (Minimum, Level AA)** for normal 12px text ($\ge 4.5:1$).
4. **Touch Target Size Clarification (ISSUE-17-03):**  
   The small `LanguageSwitcher` (`size="sm"`) measures $24$px height $\times$ $38$px width. It satisfies the technical minimum of **WCAG 2.2 SC 2.5.8 Target Size (Minimum, Level AA)** ($\ge 24 \times 24$px), but falls below our **Modern Tech Enterprise design target of $44 \times 44$px** for handheld touch ergonomics.
5. **Form Reset Action Re-evaluated (ISSUE-17-05):**  
   Inspection confirms the "Reset Form to Test Again" button is located strictly inside the post-submission confirmation banner. It is the sole primary action on the success screen; hence its primary blue styling is intentional and appropriate. The only remediation needed is refactoring it to the shared `Button` component for architectural consistency.

---

## 2. AUDIT SCOPE

The audit evaluated all interactive controls across:
- **Routes:**
  - `/` (Home): Hero dual CTAs, Value Pillars links, Services Overview links & section button, Working Methodology link, Conversion Banner dual CTAs.
  - `/about` (About): About Hero dual CTAs, Corporate Profile card button, Technical Strengths links, Partnership Banner dual CTAs.
  - `/services` (Services): Services Hero dual CTAs, Technical Support card links & banner CTA, IT Outsourcing dual CTAs, FAQ Accordion buttons, Consultation Banner dual CTAs.
  - `/contact` (Contact): Contact Hero dual CTAs, Interactive Contact Form submit button & demo banner reset button, Contact Closing Banner dual CTAs.
  - `/_not-found` (404 Error Page): "Return to Home" primary button and "Contact Support" secondary button.
- **Shared Site-Wide Components:**
  - `Header`: Desktop CTA button, mobile hamburger button, mobile drawer navigation links & drawer CTA button.
  - `LanguageSwitcher`: Desktop header instance and mobile drawer instance.
  - `Footer`: Navigation links, Inquiries portal link.
  - `SkipToContent`: A11y skip navigation link.
  - `Button.tsx`: Polyvariant button component (`primary`, `secondary`, `outline`, `ghost`, `link`).

---

## 3. GIT AND REPOSITORY PRE-CHECK

Real-time CLI inspection verified repository state prior to conducting this audit:
- **Workspace:** `D:\job\1_bizwork-redesign` (Verified).
- **Active Branch:** `master`.
- **Working Tree:** Completely clean (`nothing to commit, working tree clean`).
- **Commit History:**
  - `a755fb4` — `docs: finalize phase 00 workflow and acceptance` (Documentation Commit).
  - `e0f2124` — `chore: establish project baseline before UI UX refinement` (Baseline Commit).
- **Integrity Confirmation:** Zero unauthorized file modifications, 0 uncommitted changes.

---

## 4. BUTTON INVENTORY

The following inventory details every button and interactive action across the codebase:

| Ref ID | Page / Area | Component File | Accessible Name / Label | Implementation Type | Variant | Current Background & Text | Border & Radius | Stacking & Touch Size |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BTN-01** | Header (Desktop) | [components/common/Header.tsx#L104](file:///d:/job/1_bizwork-redesign/components/common/Header.tsx#L104) | "Get in Touch" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-lg` | Desktop inline, $36$px height |
| **BTN-02** | Header (Mobile) | [components/common/Header.tsx#L113](file:///d:/job/1_bizwork-redesign/components/common/Header.tsx#L113) | "Open navigation menu" / "Close..." | `<button>` (Native) | Icon Toggle | Transparent / `#334155` | None / `rounded-lg` | $44 \times 44$px (`h-11 w-11`) |
| **BTN-03** | Header (Mobile Drawer) | [components/common/Header.tsx#L197](file:///d:/job/1_bizwork-redesign/components/common/Header.tsx#L197) | "Get in Touch" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-lg` | Full width ($100\%$), $44$px height |
| **BTN-04** | Language Switcher | [components/common/LanguageSwitcher.tsx#L26](file:///d:/job/1_bizwork-redesign/components/common/LanguageSwitcher.tsx#L26) | "EN" / "VI" | `<button>` (Native) | Dual Pill | Active: `#FFFFFF` / `#2563EB`<br>Inactive: `#F1F5F9` / `#475569` | Outer `#CBD5E1` / `rounded-full` | $24$px height $\times$ $38$px width (`sm`) |
| **BTN-05** | Home (Hero Primary) | [components/home/HeroSection.tsx#L56](file:///d:/job/1_bizwork-redesign/components/home/HeroSection.tsx#L56) | "Get in Touch" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-06** | Home (Hero Secondary) | [components/home/HeroSection.tsx#L59](file:///d:/job/1_bizwork-redesign/components/home/HeroSection.tsx#L59) | "Explore Services" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-07** | Home (Value Pillars) | [components/home/ValuePillarsSection.tsx#L128](file:///d:/job/1_bizwork-redesign/components/home/ValuePillarsSection.tsx#L128) | "Learn more →" (3 cards) | `<Link>` (Next.js) | Text Action | Transparent / `#2563EB` | None / Inline text | Inline card footer, $\sim 20$px height |
| **BTN-08** | Home (Services Scope) | [components/home/ServicesOverviewSection.tsx#L100](file:///d:/job/1_bizwork-redesign/components/home/ServicesOverviewSection.tsx#L100) | "Explore solutions →" (2 cards) | `<Link>` (Next.js) | Text Action | Transparent / `#2563EB` | None / Inline text | Inline card footer, $\sim 20$px height |
| **BTN-09** | Home (Catalog CTA) | [components/home/ServicesOverviewSection.tsx#L113](file:///d:/job/1_bizwork-redesign/components/home/ServicesOverviewSection.tsx#L113) | "View Complete Service Scope →" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-lg` | Centered, $44$px height |
| **BTN-10** | Home (Methodology) | [components/home/WorkingMethodologySection.tsx#L150](file:///d:/job/1_bizwork-redesign/components/home/WorkingMethodologySection.tsx#L150) | "Learn more about our methodology →" | `<Link>` (Next.js) | Sub-Action | Transparent / `#475569` | None / Inline text | Centered text link, $\sim 18$px height |
| **BTN-11** | Home (Conversion Banner 1) | [components/home/ConversionCtaSection.tsx#L55](file:///d:/job/1_bizwork-redesign/components/home/ConversionCtaSection.tsx#L55) | "Contact Our Engineers" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile, $48$px height |
| **BTN-12** | Home (Conversion Banner 2) | [components/home/ConversionCtaSection.tsx#L63](file:///d:/job/1_bizwork-redesign/components/home/ConversionCtaSection.tsx#L63) | "Explore Service Scope" | `Button` (Link) | `secondary` (Collided) | Collided `#FFFFFF` + `#1E293B` | Collided `#CBD5E1` + `#334155` | Stacks mobile, $48$px height |
| **BTN-13** | About (Hero Primary) | [components/about/AboutHero.tsx#L65](file:///d:/job/1_bizwork-redesign/components/about/AboutHero.tsx#L65) | "Get in Touch" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-14** | About (Hero Secondary) | [components/about/AboutHero.tsx#L68](file:///d:/job/1_bizwork-redesign/components/about/AboutHero.tsx#L68) | "Explore Services" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-15** | About (Corporate Card) | [components/about/CorporateProfile.tsx#L141](file:///d:/job/1_bizwork-redesign/components/about/CorporateProfile.tsx#L141) | "Inquire about our corporate profile →" | `<Link>` (Custom) | Card Button | `#EFF6FF` / `#1D4ED8` | None / `rounded-lg` | Full card width, $36$px height |
| **BTN-16** | About (Strengths Links) | [components/about/TechnicalStrengths.tsx#L131](file:///d:/job/1_bizwork-redesign/components/about/TechnicalStrengths.tsx#L131) | "Explore related services →" (4 cards) | `<Link>` (Next.js) | Text Action | Transparent / `#2563EB` | None / Inline text | Inline card footer, $\sim 18$px height |
| **BTN-17** | About (Partnership Primary) | [components/about/PartnershipCta.tsx#L52](file:///d:/job/1_bizwork-redesign/components/about/PartnershipCta.tsx#L52) | "Contact Our Team" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile, $48$px height |
| **BTN-18** | About (Partnership Sec) | [components/about/PartnershipCta.tsx#L60](file:///d:/job/1_bizwork-redesign/components/about/PartnershipCta.tsx#L60) | "Explore Service Scope" | `Button` (Link) | `secondary` (Collided) | Collided `#FFFFFF` + `#1E293B` | Collided `#CBD5E1` + `#334155` | Stacks mobile, $48$px height |
| **BTN-19** | Services (Hero Primary) | [components/services/ServicesHero.tsx#L65](file:///d:/job/1_bizwork-redesign/components/services/ServicesHero.tsx#L65) | "Get in Touch" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-20** | Services (Hero Secondary) | [components/services/ServicesHero.tsx#L68](file:///d:/job/1_bizwork-redesign/components/services/ServicesHero.tsx#L68) | "Explore Solutions ↓" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-21** | Services (Tech Inquire) | [components/services/TechnicalSupportSection.tsx#L135](file:///d:/job/1_bizwork-redesign/components/services/TechnicalSupportSection.tsx#L135) | "Inquire about..." (3 cards) | `<Link>` (Next.js) | Text Action | Transparent / `#2563EB` | None / Inline text | Inline card footer, $\sim 18$px height |
| **BTN-22** | Services (Banner CTA) | [components/services/TechnicalSupportSection.tsx#L157](file:///d:/job/1_bizwork-redesign/components/services/TechnicalSupportSection.tsx#L157) | "Request Support Assessment" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-lg` | Inline flex, $44$px height |
| **BTN-23** | Services (Outsourcing Pri) | [components/services/ItOutsourcingSection.tsx#L72](file:///d:/job/1_bizwork-redesign/components/services/ItOutsourcingSection.tsx#L72) | "Discuss IT Outsourcing" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-lg` | Stacks mobile, $44$px height |
| **BTN-24** | Services (Outsourcing Sec) | [components/services/ItOutsourcingSection.tsx#L75](file:///d:/job/1_bizwork-redesign/components/services/ItOutsourcingSection.tsx#L75) | "About BIZWORK-IT" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-lg` | Stacks mobile, $44$px height |
| **BTN-25** | Services (FAQ Accordion) | [components/services/FaqAccordion.tsx#L66](file:///d:/job/1_bizwork-redesign/components/services/FaqAccordion.tsx#L66) | 4 Question Triggers | `<button>` (Native) | Accordion Header | Transparent / `#0F172A` | None / `rounded-lg` | Full width, $44$px+ expandable |
| **BTN-26** | Services (Consultation Pri)| [components/services/ServicesCta.tsx#L52](file:///d:/job/1_bizwork-redesign/components/services/ServicesCta.tsx#L52) | "Schedule a Consultation" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile, $48$px height |
| **BTN-27** | Services (Consultation Sec)| [components/services/ServicesCta.tsx#L60](file:///d:/job/1_bizwork-redesign/components/services/ServicesCta.tsx#L60) | "Learn About Our Company" | `Button` (Link) | `secondary` (Collided) | Collided `#FFFFFF` + `#1E293B` | Collided `#CBD5E1` + `#334155` | Stacks mobile, $48$px height |
| **BTN-28** | Contact (Hero Primary) | [components/contact/ContactHero.tsx#L65](file:///d:/job/1_bizwork-redesign/components/contact/ContactHero.tsx#L65) | "Drop Us a Message ↓" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-29** | Contact (Hero Secondary) | [components/contact/ContactHero.tsx#L68](file:///d:/job/1_bizwork-redesign/components/contact/ContactHero.tsx#L68) | "Explore All Services" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-30** | Contact (Form Submit) | [components/contact/ContactForm.tsx#L373](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx#L373) | "Send Message [Preview Demo Mode]" | `<button>` (Submit) | Form Submit | `#2563EB` / `#FFFFFF` + `#BFDBFE` | None / `rounded-xl` | Stacks mobile ($100\%$), $48$px height |
| **BTN-31** | Contact (Form Reset) | [components/contact/ContactForm.tsx#L198](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx#L198) | "Reset Form to Test Again" | `<button>` (Native) | Success Action | `#2563EB` / `#FFFFFF` | None / `rounded-lg` | $36$px height (`px-4 py-2`) |
| **BTN-32** | Contact (Closing Primary) | [components/contact/ContactClosingCta.tsx#L52](file:///d:/job/1_bizwork-redesign/components/contact/ContactClosingCta.tsx#L52) | "Explore Our Services" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-xl` | Stacks mobile, $48$px height |
| **BTN-33** | Contact (Closing Sec) | [components/contact/ContactClosingCta.tsx#L60](file:///d:/job/1_bizwork-redesign/components/contact/ContactClosingCta.tsx#L60) | "About BIZWORK-IT" | `Button` (Link) | `secondary` (Collided) | Collided `#FFFFFF` + `#1E293B` | Collided `#CBD5E1` + `#334155` | Stacks mobile, $48$px height |
| **BTN-34** | 404 (Return to Home) | [app/not-found.tsx#L18](file:///d:/job/1_bizwork-redesign/app/not-found.tsx#L18) | "Return to Home" | `Button` (Link) | `primary` | `#2563EB` / `#FFFFFF` | None / `rounded-lg` | Inline flex, $44$px height |
| **BTN-35** | 404 (Contact Support) | [app/not-found.tsx#L21](file:///d:/job/1_bizwork-redesign/app/not-found.tsx#L21) | "Contact Support" | `Button` (Link) | `secondary` | `#FFFFFF` / `#1E293B` | `#CBD5E1` / `rounded-lg` | Inline flex, $44$px height |
| **BTN-36** | Footer Inquiries CTA | [components/common/Footer.tsx#L86](file:///d:/job/1_bizwork-redesign/components/common/Footer.tsx#L86) | "Drop us a line via Contact →" | `<Link>` (Next.js) | Dark Surface Link | Transparent / `#60A5FA` | None / Inline text | Inline text link, $\sim 18$px height |
| **BTN-37** | Skip to Content Link | [components/common/SkipToContent.tsx#L10](file:///d:/job/1_bizwork-redesign/components/common/SkipToContent.tsx#L10) | "Skip to main content" | `<a>` (Bypass) | Accessibility | Visible on focus: `#2563EB` / `#FFFFFF` | None / `rounded-lg` | Fixed top-4 left-4, $44$px height |

---

## 5. CONTRAST & WCAG 2.2 SPECIFICATION AUDIT

All contrast measurements were calculated using the official W3C Relative Luminance formula:
$L = 0.2126 \cdot R + 0.7152 \cdot G + 0.0722 \cdot B$  
$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$

### 5.1. Rigorous Separation of Applicable WCAG 2.2 Criteria:
- **WCAG 2.2 SC 1.4.3 Contrast (Minimum) (Level AA):** Applies to text and images of text ($\ge 4.5:1$ for text under 18pt/24px normal or 14pt/18.66px bold).
- **WCAG 2.2 SC 1.4.11 Non-text Contrast (Level AA):** Applies to visual information required to identify user interface components and states ($\ge 3.0:1$ against adjacent colors).
- **WCAG 2.2 SC 2.4.7 Focus Visible (Level A):** Requires that any keyboard operable interface has a mode of operation where the keyboard focus indicator is visible.
- **WCAG 2.2 SC 2.4.11 Focus Not Obscured (Minimum) (Level AA):** Requires that when an item receives keyboard focus, it is not entirely covered or obscured by author-created content (e.g. sticky header).
- **WCAG 2.2 SC 2.5.8 Target Size (Minimum) (Level AA):** Requires pointer input targets to be at least $24 \times 24$ CSS pixels, unless spacing offsets are sufficient.

### 5.2. Mathematical Contrast Measurements:

| Interaction Element & State | Foreground Color | Background Color | Exact Contrast | Applicable WCAG 2.2 Criterion | Status & Evaluation |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Primary Button Text (Default)** | `#FFFFFF` | `#2563EB` (Blue 600) | **5.17:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |
| **Primary Button Text (Hover)** | `#FFFFFF` | `#1D4ED8` (Blue 700) | **6.70:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |
| **Primary Button Text (Active)** | `#FFFFFF` | `#1E40AF` (Blue 800) | **8.72:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |
| **Primary Focus Ring** | `#2563EB` | `#FFFFFF` (Canvas) | **5.17:1** | SC 1.4.11 Non-text Contrast | **PASS** ($\ge 3.0:1$) |
| **Secondary Button Text (Default)**| `#1E293B` | `#FFFFFF` (Button BG) | **14.63:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |
| **Secondary Button Text (Hover)** | `#0F172A` | `#F8FAFC` (Hover BG) | **17.06:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |
| **Secondary Focus Ring on White** | `#94A3B8` (Slate 400) | `#FFFFFF` (Canvas) | **2.56:1** | SC 1.4.11 Non-text Contrast | **FAIL** ($< 3.0:1$) |
| **Secondary Focus Ring on Slate 50**| `#94A3B8` (Slate 400) | `#F8FAFC` (Canvas) | **2.45:1** | SC 1.4.11 Non-text Contrast | **FAIL** ($< 3.0:1$) |
| **Secondary Focus Ring vs Button BG**| `#94A3B8` (Slate 400) | `#FFFFFF` (Ring-offset)| **2.56:1** | SC 1.4.11 Non-text Contrast | **FAIL** ($< 3.0:1$) |
| **Ghost Focus Ring on White** | `#94A3B8` (Slate 400) | `#FFFFFF` (Canvas) | **2.56:1** | SC 1.4.11 Non-text Contrast | **FAIL** ($< 3.0:1$) |
| **Ghost Focus Ring on Slate 50** | `#94A3B8` (Slate 400) | `#F8FAFC` (Canvas) | **2.45:1** | SC 1.4.11 Non-text Contrast | **FAIL** ($< 3.0:1$) |
| **Secondary Border (Default)** | `#CBD5E1` (Slate 300) | `#FFFFFF` (Canvas) | **1.48:1** | SC 1.4.11 Non-text Contrast | Informational (Needs shadow) |
| **Secondary Border (Canvas)** | `#CBD5E1` (Slate 300) | `#F8FAFC` (Canvas) | **1.42:1** | SC 1.4.11 Non-text Contrast | Informational (Needs shadow) |
| **Dark Secondary Button (Target)** | `#FFFFFF` | `#1E293B` (Slate 800) | **14.63:1** | SC 1.4.3 Contrast (Text) | **PASS** (When uncollided) |
| **Dark Secondary Hover (Target)** | `#FFFFFF` | `#334155` (Slate 700) | **10.35:1** | SC 1.4.3 Contrast (Text) | **PASS** (When uncollided) |
| **Dark Secondary Focus Ring (Sky)**| `#38BDF8` (Sky 400) | `#0F172A` (Slate 900) | **8.43:1** | SC 1.4.11 Non-text Contrast | **PASS** ($\ge 3.0:1$) |
| **Contact Form Demo Tag** | `#BFDBFE` (Blue 200) | `#2563EB` (Blue 600) | **3.64:1** | SC 1.4.3 Contrast (Text 12px)| **FAIL** ($< 4.5:1$) |
| **Contact Form Demo Tag (Proposed)**| `#DBEAFE` (Blue 100) | `#2563EB` (Blue 600) | **4.54:1** | SC 1.4.3 Contrast (Text 12px)| **PASS** ($\ge 4.5:1$) |
| **Footer Inquiries Link** | `#60A5FA` (Blue 400) | `#0F172A` (Slate 900) | **7.02:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |
| **Footer Inquiries Link (Hover)**| `#93C5FD` (Blue 300) | `#0F172A` (Slate 900) | **9.90:1** | SC 1.4.3 Contrast (Text) | **PASS** ($\ge 4.5:1$) |

---

## 6. TAILWIND CLASS COLLISION ANALYSIS & COMPILED CSS EVIDENCE (ISSUE-17-02)

### 6.1. Source Code Mechanism
In `components/common/Button.tsx`:
```tsx
const baseClasses =
  "inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

const resolvedClasses = `${baseClasses} ${variantStyles[variant]} ${
  variant === "link" ? "" : sizeStyles[size]
} ${className}`;
```
In `components/home/ConversionCtaSection.tsx` (and lines 60-68 in `PartnershipCta.tsx`, `ServicesCta.tsx`, `ContactClosingCta.tsx`):
```tsx
<Button
  href="/services"
  variant="secondary"
  size="lg"
  className="w-full sm:w-auto min-w-[180px] bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:text-white"
>
```
The application **does not use** `tailwind-merge` or any runtime class deduplication utility. The rendered DOM `class` string contains:
`... bg-white text-slate-800 border-slate-300 ... bg-slate-800 text-white border-slate-700 ...`

### 6.2. Deterministic CSS Cascade Resolution
According to the W3C CSS Cascading and Inheritance Level 4 specification (§ 6.4):
> When multiple declarations have the same origin and equal specificity (here both utility classes have specificity `0,1,0`), the declaration that comes **last in document order within the stylesheet** wins.

Inspection of the actual compiled stylesheet `.next/static/chunks/3p3agb29ca5w2.css` reveals the exact order generated by the Tailwind CSS compiler:

1. **Background Color Collision:**
   - Byte offset `26,930`: `.bg-slate-800 { background-color: var(--color-slate-800); }`
   - Byte offset `27,453`: `.bg-white { background-color: var(--color-white); }`  
   **Result:** `.bg-white` is defined **after** `.bg-slate-800`. Therefore, `.bg-white` **WINS**. The rendered background is **pure white** (`#FFFFFF`).
2. **Text Color Collision:**
   - Byte offset `38,340`: `.text-slate-800 { color: var(--color-slate-800); }`
   - Byte offset `38,430`: `.text-white { color: var(--color-white); }`  
   **Result:** `.text-white` is defined **after** `.text-slate-800`. Therefore, `.text-white` **WINS**. The rendered text is **white** (`#FFFFFF`).
3. **Border Color Collision:**
   - Byte offset `23,166`: `.border-slate-300 { border-color: var(--color-slate-300); }`
   - Byte offset `23,274`: `.border-slate-700 { border-color: var(--color-slate-700); }`  
   **Result:** `.border-slate-700` wins, yielding a dark border around a white box.

### 6.3. Rendered Bug Manifestation
The secondary CTA on all four dark banners renders as:
- **Default State:** A solid white rectangular button (`#FFFFFF`) containing **white text** (`#FFFFFF`). Contrast ratio: **1.00:1 (completely invisible text)**.
- **Hover State:** When hovered, `.hover:bg-slate-700:hover` (byte 49,678) wins over `.hover:bg-slate-50:hover` (byte 49,546), turning the background dark grey (`#334155`), which suddenly reveals the white text.
- **Focus State:** Inherits `focus-visible:ring-offset-2` (`ring-offset-white`). On dark `#0F172A` cards, this produces a glaring white outline gap.

---

## 7. SECONDARY-DARK VARIANT VALIDATION

### 7.1. Banner Background Verification
Inspection of the containing wrappers in all four files:
- `components/home/ConversionCtaSection.tsx` (line 14): `bg-slate-900` (`#0F172A`)
- `components/about/PartnershipCta.tsx` (line 14): `bg-slate-900` (`#0F172A`)
- `components/services/ServicesCta.tsx` (line 14): `bg-slate-900` (`#0F172A`)
- `components/contact/ContactClosingCta.tsx` (line 14): `bg-slate-900` (`#0F172A`)

All four sections share the **identical** dark container background: `bg-slate-900`.

### 7.2. Proposed `secondary-dark` Variant Specification
To eliminate the class collision and preserve the intended Modern Tech Enterprise visual style:
```ts
"secondary-dark":
  "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:text-white active:bg-slate-900 active:border-slate-500 shadow-sm focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
```

### 7.3. Computed State Validation:
- **Default:** `bg-slate-800` (`#1E293B`) + `text-white` (`#FFFFFF`) on `bg-slate-900` (`#0F172A`). Text contrast = **14.63:1** (PASS).
- **Hover:** `bg-slate-700` (`#334155`) + `text-white` (`#FFFFFF`). Text contrast = **10.35:1** (PASS).
- **Active:** `bg-slate-900` (`#0F172A`) with darker border, providing tactile depression feedback.
- **Focus:** `focus-visible:ring-sky-400` (`#38BDF8`) against `#0F172A`. Contrast = **8.43:1** (PASS SC 1.4.11).
- **Ring Offset:** Explicitly set to `focus-visible:ring-offset-slate-900`, eliminating the white halo artifact.

---

## 8. TOUCH TARGET AND FORM UX VALIDATION

### 8.1. Language Switcher Dimensions & Touch Target (ISSUE-17-03)
- **Measured Dimensions:** With `px-2.5 py-1 text-xs`, each pill toggle renders at approximately $24$px height $\times$ $38$px width.
- **WCAG 2.2 SC 2.5.8 Target Size (Minimum, Level AA):**  
  SC 2.5.8 requires a target size of at least $24 \times 24$ CSS pixels. Because the button measures $24 \times 38$px, it **technically satisfies SC 2.5.8**.
- **Modern Tech Enterprise Ergonomic Target:**  
  Industry mobile standards (Apple HIG / Android Material) and WCAG SC 2.5.5 (Level AAA) recommend $44 \times 44$ CSS pixels. On touchscreens, a 24px height button has higher error rates for thumb interaction.
- **Remediation Classification:** Downgraded from defect to **Low / Ergonomic Enhancement**. In the mobile drawer context (`Header.tsx#L194`), we recommend providing enhanced touch padding without modifying the desktop header compact appearance.

### 8.2. Contact Form Reset Button Validation (ISSUE-17-05)
- **Context Inspection:** The reset button is **NOT** present in the active form. It only appears inside the success state banner (`validationSuccess === true`) after client-side submission succeeds.
- **Label & Purpose:** Labeled *"Reset Form to Test Again"* (EN) / *"Đặt lại Biểu mẫu để Thử lại"* (VI). Its functional purpose is to allow testing another inquiry.
- **Hierarchy Evaluation:** Because it is the **sole interactive action** inside the confirmation banner, styling it with primary blue (`bg-blue-600 text-white`) is intentional and guides the user clearly. Changing it to a low-contrast secondary style would weaken recovery affordance.
- **Remediation Classification:** Downgraded from hierarchy defect to **Low / Architectural Consistency**. The button should simply be refactored from an inline `<button>` to the shared `Button` component (`<Button onClick={handleReset} variant="primary" size="sm">`) to ensure consistent typography and focus ring handling.

---

## 9. REVISED FINDINGS & SEVERITY CLASSIFICATION

| Issue ID | Severity | Category | Affected File & Lines | Description & Root Cause | Proposed Solution |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **ISSUE-17-01** | **HIGH** | A11y (WCAG SC 1.4.11) | [Button.tsx#L43, L47](file:///d:/job/1_bizwork-redesign/components/common/Button.tsx#L43) | Secondary and Ghost focus ring (`ring-slate-400`) yields only **2.56:1** contrast against white canvas, violating the $\ge 3.0:1$ threshold for UI state indicators. | Change focus ring for Secondary and Ghost to `focus-visible:ring-blue-600` (5.17:1 contrast). |
| **ISSUE-17-02** | **CRITICAL** | Visual Defect / Collision | `ConversionCtaSection.tsx#L67`<br>`PartnershipCta.tsx#L64`<br>`ServicesCta.tsx#L64`<br>`ContactClosingCta.tsx#L64` | CSS class collision: `.bg-white` and `.text-white` override `.bg-slate-800` due to stylesheet order, rendering **invisible white text on white background** in default state. | Introduce `secondary-dark` variant in `Button.tsx`; refactor the 4 CTA banners to use this variant without inline class overrides. |
| **ISSUE-17-03** | **LOW** | Touch Ergonomics | [LanguageSwitcher.tsx#L30](file:///d:/job/1_bizwork-redesign/components/common/LanguageSwitcher.tsx#L30) | Switcher height is $24$px. Passes SC 2.5.8 ($24 \times 24$px), but falls below $44 \times 44$px touch recommendation in mobile drawer. | Enhance vertical touch padding in mobile drawer instance. |
| **ISSUE-17-04** | **MEDIUM**| A11y (WCAG SC 1.4.3) | [ContactForm.tsx#L378](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx#L378) | Demo tag `text-blue-200` on `bg-blue-600` yields **3.64:1**, failing the $\ge 4.5:1$ requirement for 12px text. | Change class to `text-blue-100` (**4.54:1** contrast) to achieve full WCAG AA compliance. |
| **ISSUE-17-05** | **LOW** | Code Consistency | [ContactForm.tsx#L201](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx#L201) | Success state reset button uses inline HTML `<button>` instead of shared `Button` component. | Refactor to `<Button variant="primary" size="sm">` while preserving primary recovery action role. |
| **ISSUE-17-06** | **LOW** | Micro-interaction | [Button.tsx#L43](file:///d:/job/1_bizwork-redesign/components/common/Button.tsx#L43) | Secondary button lacks an `active:` tactile depression state. | Add `active:bg-slate-100 active:border-slate-400` to `variantStyles.secondary`. |

---

## 10. FINAL REVISED IMPLEMENTATION PLAN

### Step 1: Core Button Component Polish (`components/common/Button.tsx`)
1. Extend `ButtonVariant` union type: add `"secondary-dark"`.
2. Add `variantStyles["secondary-dark"]`:
   `"bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:text-white active:bg-slate-900 active:border-slate-500 shadow-sm focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"`
3. Fix focus ring on `secondary` and `ghost` variants:
   Replace `focus-visible:ring-slate-400` with `focus-visible:ring-blue-600` (ensuring 5.17:1 contrast on canvas).
4. Add tactile active state and subtle shadow to `secondary`:
   `active:bg-slate-100 active:border-slate-400 shadow-xs`.

### Step 2: Refactor Secondary Buttons in 4 Dark CTA Banners
Replace colliding inline utility overrides with `variant="secondary-dark"`:
- [components/home/ConversionCtaSection.tsx#L63](file:///d:/job/1_bizwork-redesign/components/home/ConversionCtaSection.tsx#L63)
- [components/about/PartnershipCta.tsx#L60](file:///d:/job/1_bizwork-redesign/components/about/PartnershipCta.tsx#L60)
- [components/services/ServicesCta.tsx#L60](file:///d:/job/1_bizwork-redesign/components/services/ServicesCta.tsx#L60)
- [components/contact/ContactClosingCta.tsx#L60](file:///d:/job/1_bizwork-redesign/components/contact/ContactClosingCta.tsx#L60)

### Step 3: Polish Contact Form Triggers (`components/contact/ContactForm.tsx`)
1. Upgrade demo mode disclaimer tag from `text-blue-200` to `text-blue-100` (achieving 4.54:1 text contrast).
2. Refactor the reset action button in the confirmation banner from raw `<button>` to shared `Button` component with `size="sm"` and `variant="primary"`.

### Step 4: Enhance Mobile Language Switcher Touch Area (`components/common/LanguageSwitcher.tsx`)
Ensure the switcher in the mobile drawer context has adequate touch padding ($44$px touch area).

---

## 11. APPROVED-SCOPE CANDIDATE FILE LIST

| Candidate File | Scope of Modification | Justification |
| :--- | :--- | :--- |
| [components/common/Button.tsx](file:///d:/job/1_bizwork-redesign/components/common/Button.tsx) | Add `secondary-dark` variant; update focus ring to `ring-blue-600`; add `active:` state. | Resolves ISSUE-17-01, ISSUE-17-02, ISSUE-17-06. |
| [components/home/ConversionCtaSection.tsx](file:///d:/job/1_bizwork-redesign/components/home/ConversionCtaSection.tsx) | Update secondary button to `variant="secondary-dark"`; remove colliding classes. | Resolves ISSUE-17-02 (white-on-white text bug). |
| [components/about/PartnershipCta.tsx](file:///d:/job/1_bizwork-redesign/components/about/PartnershipCta.tsx) | Update secondary button to `variant="secondary-dark"`; remove colliding classes. | Resolves ISSUE-17-02 (white-on-white text bug). |
| [components/services/ServicesCta.tsx](file:///d:/job/1_bizwork-redesign/components/services/ServicesCta.tsx) | Update secondary button to `variant="secondary-dark"`; remove colliding classes. | Resolves ISSUE-17-02 (white-on-white text bug). |
| [components/contact/ContactClosingCta.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactClosingCta.tsx) | Update secondary button to `variant="secondary-dark"`; remove colliding classes. | Resolves ISSUE-17-02 (white-on-white text bug). |
| [components/contact/ContactForm.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx) | Update demo tag to `text-blue-100`; refactor reset button to `Button` component. | Resolves ISSUE-17-04, ISSUE-17-05. |
| [components/common/LanguageSwitcher.tsx](file:///d:/job/1_bizwork-redesign/components/common/LanguageSwitcher.tsx) | Provide enhanced touch target padding for mobile drawer. | Resolves ISSUE-17-03. |

*Total files in approved scope:* Exactly **7 files**. Zero modifications to routes, data schemas, or dependencies.

---

## 12. MANDATORY STOP CONFIRMATION

- **No application source code was modified during this audit revision.**
- **No CSS stylesheets were altered.**
- **`docs/TASK_TRACKER.md` was NOT modified.**
- **No Git commits were created.**
- **Task 17 remains in AUDIT / WAITING APPROVAL.**
- **Task 18 has NOT been started.**

**HỆ THỐNG ĐÃ DỪNG HOÀN TOÀN VÀ CHỜ NGƯỜI DÙNG PHÊ DUYỆT CHÍNH THỨC KẾ HOẠCH TRIỂN KHAI ĐỂ BƯỚC VÀO GIAI ĐOẠN CODING CỦA TASK 17.**
