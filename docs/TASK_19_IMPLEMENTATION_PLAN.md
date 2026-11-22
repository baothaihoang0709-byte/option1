# TASK 19 IMPLEMENTATION PLAN — CONTACT PAGE & CONTACT FORM UX
## PHASE 02 — CONTACT REFINEMENT (REVISION 1)

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Phase:** 02 — Contact Refinement
- **Task:** 19 — Contact Page & Form UX Refinement
- **Revision:** 01 (Addressing Project Owner Review Requirements)
- **Plan Date:** 2026-11-18
- **Latest Accepted Git Commit:** `e188a29`
- **Execution Mode:** IMPLEMENTATION PLAN REVISION ONLY (Coding NOT Authorized)
- **Status:** WAITING APPROVAL

---

## 1. OBJECTIVE & REVISION CONTEXT

Following external code review of the initial Task 19 plan, this revised document addresses all six mandatory architectural directives issued by the Project Owner:
1. **Focus Restoration on Form Reset:** Eliminating race conditions by replacing synchronous focus calls with an asynchronous `useEffect` pattern to guarantee that the `fullName` input is fully mounted before programmatic focus is requested.
2. **Success Banner Focus & Screen Reader Strategy:** Eliminating duplicate/competing vocalization between `role="status"` / `aria-live` and programmatic focus by adopting a structured container region pattern with concrete keyboard/screen-reader test criteria.
3. **Controlled Validation Micro-Interaction:** Implementing anti-concurrency submission guards (`isValidating`), a clear `disabled` state, explicit timer cleanup on unmount, and strictly restricting feedback to client validation (no simulated email dispatch or server transmission).
4. **Standard sRGB WCAG Relative Luminance Recalculations:** Resolving all numerical discrepancies with exact mathematical computations for `#94A3B8` ($2.56:1$), `#64748B` ($4.76:1$), `#EF4444` ($3.76:1$), and `#DC2626` ($4.83:1$).
5. **Unified Landmark ID & Verified Visible Heading:** Aligning `aria-labelledby` on both the outer `<section>` in `page.tsx` and `<form>` in `ContactForm.tsx` to the existing, visible `<h2>` heading `id="contact-form-heading"`.
6. **Truthful Demo Notices:** Completely removing internal sprint codes (`Task 13`) from user-facing copy in EN and VI dictionaries, transparently communicating that the form is a frontend verification demonstration.

---

## 2. STRICT 8-FILE SCOPE

The implementation is strictly restricted to exactly **8 files**:

| # | File Path | Scope of Planned Modifications | Risk Level |
| :-: | :--- | :--- | :---: |
| **1** | [components/contact/ContactForm.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx) | Focus restoration (`useEffect` on reset, error field focus on submit), success banner focus management, contrast fixes, iOS Safari font scale (`text-base sm:text-sm`), `aria-hidden` on `⚠`, simulated validation micro-interaction with timer cleanup, unified `Button`. | Medium |
| **2** | [app/contact/page.tsx](file:///d:/job/1_bizwork-redesign/app/contact/page.tsx) | Wrap main contact section in semantic `<section aria-labelledby="contact-form-heading">` linked to the verified visible `<h2>` heading. | Low |
| **3** | [components/contact/ContactInfo.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactInfo.tsx) | Standardize card titles to consistent `<h3>` elements to resolve heading hierarchy skips. | Low |
| **4** | [components/contact/ContactHero.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactHero.tsx) | Ensure `#contact-form` target coordination with `tabIndex={-1}`. | Low |
| **5** | [components/contact/WhatHappensNext.tsx](file:///d:/job/1_bizwork-redesign/components/contact/WhatHappensNext.tsx) | De-duplicate 3x repeated card footer note by elevating it to a single centered section note below the grid. | Low |
| **6** | [lib/i18n/dictionaries/en.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/dictionaries/en.ts) | Remove internal sprint task label `"(Task 13: ...)"` from `bannerPendingDesc`; add `buttonValidating` and `messageHint` keys. | Low |
| **7** | [lib/i18n/dictionaries/vi.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/dictionaries/vi.ts) | Remove internal sprint task label `"(Task 13: ...)"` from `bannerPendingDesc`; add `buttonValidating` and `messageHint` keys. | Low |
| **8** | [lib/i18n/types.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/types.ts) | Update dictionary TypeScript interface for any refined keys, guaranteeing 100% compile-time parity. | Low |

No other files in the workspace will be modified.

---

## 3. DETAILED TECHNICAL ARCHITECTURE & RESOLUTIONS

### 3.1 Requirement 1 — Focus Restoration on Form Reset (`ISSUE-19-01`)

#### Problem in Initial Plan:
Calling `fullNameInputRef.current?.focus()` synchronously immediately after `setValidationSuccess(false)` causes a race condition: React batches state updates, so at the moment the synchronous reset handler runs, the `<form>` DOM tree has **not yet mounted**. Consequently, `fullNameInputRef.current` is `null` and focus silently fails, leaving focus on `document.body`.

#### Corrected Solution (State Flag + `useEffect` Pattern):
1. State Declaration:
   ```tsx
   const [validationSuccess, setValidationSuccess] = useState(false);
   const [shouldFocusFullName, setShouldFocusFullName] = useState(false);
   const fullNameInputRef = useRef<HTMLInputElement>(null);
   ```
2. Reset Handler Execution:
   ```tsx
   const handleReset = () => {
     setFormData(INITIAL_STATE);
     setErrors({});
     setTouched({});
     setValidationSuccess(false);
     setShouldFocusFullName(true); // Request focus on next mount lifecycle
   };
   ```
3. Lifecycle Hook Execution:
   ```tsx
   useEffect(() => {
     if (shouldFocusFullName && !validationSuccess && fullNameInputRef.current) {
       fullNameInputRef.current.focus();
       setShouldFocusFullName(false); // Reset flag
     }
   }, [shouldFocusFullName, validationSuccess]);
   ```
4. Exact Execution Sequence:
   - **Step 1:** User clicks "Reset Form to Test Again".
   - **Step 2:** `handleReset()` resets form state, sets `validationSuccess: false`, and sets `shouldFocusFullName: true`.
   - **Step 3:** React renders the update: unmounts the confirmation banner, mounts the `<form>` DOM tree, and populates `fullNameInputRef.current` with the `<input id="fullName">` DOM node.
   - **Step 4:** React commits the DOM and triggers `useEffect`.
   - **Step 5:** `useEffect` evaluates `shouldFocusFullName === true && !validationSuccess && fullNameInputRef.current !== null`.
   - **Step 6:** Programmatic focus is cleanly applied: `fullNameInputRef.current.focus()`.
   - **Step 7:** `setShouldFocusFullName(false)` clears the flag to prevent re-focusing on unrelated state updates.

---

### 3.2 Requirement 2 — Success Banner Focus & Screen Reader Strategy (`ISSUE-19-01`)

#### Problem in Initial Plan:
Combining `role="status"` / `aria-live="polite"` with programmatic container `.focus()` causes dual-announcement collision in screen readers (e.g. NVDA, JAWS, VoiceOver). The screen reader receives both an aria-live insertion event and a focus change event simultaneously, causing it to read the content twice or cut itself off.

#### Corrected Solution:
1. **Container Definition:**
   Replace `role="status"` / `aria-live="polite"` with a structured landmark region with `tabIndex={-1}`:
   ```tsx
   <div
     ref={successBannerRef}
     tabIndex={-1}
     role="region"
     aria-labelledby="success-banner-title"
     className="rounded-2xl border border-blue-200 bg-blue-50/80 p-6 text-slate-900 space-y-4 focus:outline-none"
   >
     <div className="flex items-start gap-3">
       {/* Checkmark Icon */}
       <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5" aria-hidden="true">
         <svg ... />
       </span>
       <div>
         <h3 id="success-banner-title" className="text-sm font-bold text-blue-950">
           {formText.bannerSuccessTitle}
         </h3>
         <p className="mt-1 text-xs leading-relaxed text-blue-900/90">
           {formText.bannerSuccessDesc}
         </p>
       </div>
     </div>
     {/* Transparent Notice Panel */}
     <div className="rounded-xl border border-blue-200/80 bg-white/90 p-4 text-xs leading-relaxed text-slate-700 space-y-2">
       <p className="font-semibold text-slate-900">
         {formText.bannerPendingTitle}
       </p>
       <p className="text-[11px] text-slate-600">
         {formText.bannerPendingDesc}
       </p>
     </div>
     {/* Reset Action */}
     <div className="pt-2 flex flex-wrap items-center gap-3">
       <Button type="button" variant="primary" size="md" onClick={handleReset}>
         {formText.buttonReset}
       </Button>
     </div>
   </div>
   ```
2. **Focus Handoff Hook:**
   ```tsx
   useEffect(() => {
     if (validationSuccess && successBannerRef.current) {
       successBannerRef.current.focus();
     }
   }, [validationSuccess]);
   ```
3. **Screen Reader Vocalization Flow:**
   - Programmatic focus lands on the container region `aria-labelledby="success-banner-title"`.
   - The screen reader announces the region label: *"Client-Side Validation Successful, region"*.
   - Because `aria-live` is removed from the focused node, there is **zero duplicate reading**.
   - Pressing Tab advances focus directly to the next interactive child: the "Reset Form to Test Again" button.
4. **Concrete Verification Test Criteria:**
   - **Keyboard Navigation Test:** Fill out valid form data $\rightarrow$ Press Enter on submit button $\rightarrow$ Verify active DOM focus (`document.activeElement`) is `div#submission-success-banner` $\rightarrow$ Press Tab once $\rightarrow$ Verify focus lands squarely on the "Reset Form to Test Again" button $\rightarrow$ Press Enter $\rightarrow$ Verify focus returns to `input#fullName`.
   - **Screen Reader Test (NVDA / VoiceOver):** Verify banner title is vocalized exactly once upon mount; verify no conflicting announcements occur.

---

### 3.3 Requirement 3 — Controlled Validation Micro-Interaction (`ISSUE-19-09`)

#### Architectural Constraints:
- Must prevent multiple concurrent form submissions.
- Must provide clear `disabled` and `aria-busy` states on the submit button.
- Must cleanly cancel pending timers when the component unmounts.
- **Strict Prohibition:** Do NOT simulate email dispatch, server latency, or network requests. The micro-interaction represents strictly **client-side syntax & format verification**.

#### Technical Implementation:
1. **State & Ref Definitions:**
   ```tsx
   const [isValidating, setIsValidating] = useState(false);
   const validationTimerRef = useRef<NodeJS.Timeout | null>(null);
   ```
2. **Submission Guard & Client Validation Pipeline:**
   ```tsx
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if (isValidating) return; // Prevent double-clicks / multi-submit

     // Mark required fields as touched
     setTouched({ fullName: true, email: true, company: true, serviceOfInterest: true, message: true });

     // 1. Synchronous Client Validation
     const newErrors: FormErrors = {};
     const nameErr = validateField("fullName", formData.fullName);
     if (nameErr) newErrors.fullName = nameErr;
     const emailErr = validateField("email", formData.email);
     if (emailErr) newErrors.email = emailErr;
     const msgErr = validateField("message", formData.message);
     if (msgErr) newErrors.message = msgErr;

     // 2. Error handling: auto-focus first invalid field immediately
     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       setValidationSuccess(false);
       if (newErrors.fullName) fullNameInputRef.current?.focus();
       else if (newErrors.email) emailInputRef.current?.focus();
       else if (newErrors.message) messageInputRef.current?.focus();
       return;
     }

     // 3. Validation passed: brief tactile feedback (400ms)
     setErrors({});
     setIsValidating(true);

     validationTimerRef.current = setTimeout(() => {
       setIsValidating(false);
       setValidationSuccess(true);
     }, 400);
   };
   ```
3. **Unmount Timer Cleanup Hook:**
   ```tsx
   useEffect(() => {
     return () => {
       if (validationTimerRef.current) {
         clearTimeout(validationTimerRef.current);
       }
     };
   }, []);
   ```
4. **Button Feedback & Copy:**
   ```tsx
   <Button
     type="submit"
     variant="primary"
     size="lg"
     disabled={isValidating}
     aria-busy={isValidating}
     className="w-full sm:w-auto"
   >
     {isValidating && (
       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
       </svg>
     )}
     <span>{isValidating ? formText.buttonValidating : formText.buttonSubmit}</span>
     <span className="ml-2 text-xs font-normal text-white">{formText.buttonSubmitDemo}</span>
   </Button>
   ```
   - EN `formText.buttonValidating`: `"Checking Fields..."`
   - VI `formText.buttonValidating`: `"Đang kiểm tra..."`

---

### 3.4 Requirement 4 — Standard sRGB WCAG Relative Luminance Recalculations

#### Official WCAG Relative Luminance Formula:
For an sRGB color with channel $C \in \{R, G, B\} \in [0, 255]$:
$$C_{\text{srgb}} = C / 255$$
$$C_{\text{lin}} = \begin{cases} C_{\text{srgb}} / 12.92 & \text{if } C_{\text{srgb}} \le 0.04045 \\ \left(\frac{C_{\text{srgb}} + 0.055}{1.055}\right)^{2.4} & \text{if } C_{\text{srgb}} > 0.04045 \end{cases}$$
$$L = 0.2126 \times R_{\text{lin}} + 0.7152 \times G_{\text{lin}} + 0.0722 \times B_{\text{lin}}$$
Contrast Ratio between $L_1$ and $L_2$ (where $L_1 > L_2$):
$$\text{CR} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

#### Exact Calculation Matrix on `#FFFFFF` ($L_2 = 1.00000$):

| Element & Target | Class | Hex Value | Linearized RGB Components | Relative Luminance ($L$) | Exact Contrast Ratio | WCAG 2.2 Level AA Status |
| :--- | :--- | :---: | :--- | :---: | :---: | :---: |
| **Current Optional Label** | `text-slate-400` | `#94A3B8` | $R_{\text{lin}} = 0.29614$<br>$G_{\text{lin}} = 0.36632$<br>$B_{\text{lin}} = 0.47649$ | **$0.35951$** | **$2.56:1$** | **FAIL** ($< 4.5:1$) |
| **Proposed Optional Label** | `text-slate-500` | `#64748B` | $R_{\text{lin}} = 0.12744$<br>$G_{\text{lin}} = 0.17646$<br>$B_{\text{lin}} = 0.25827$ | **$0.17064$** | **$4.76:1$** | **PASS AA** ($\ge 4.5:1$) |
| *Alternative (High Contrast)* | `text-slate-600` | `#475569` | $R_{\text{lin}} = 0.06301$<br>$G_{\text{lin}} = 0.09228$<br>$B_{\text{lin}} = 0.14126$ | **$0.08857$** | **$7.58:1$** | **PASS AAA** ($\ge 7.0:1$) |
| **Current Asterisk `*`** | `text-red-500` | `#EF4444` | $R_{\text{lin}} = 0.86431$<br>$G_{\text{lin}} = 0.05781$<br>$B_{\text{lin}} = 0.05781$ | **$0.22902$** | **$3.76:1$** | **FAIL** ($< 4.5:1$) |
| **Proposed Asterisk `*`** | `text-red-600` | `#DC2626` | $R_{\text{lin}} = 0.71691$<br>$G_{\text{lin}} = 0.01878$<br>$B_{\text{lin}} = 0.01878$ | **$0.16742$** | **$4.83:1$** | **PASS AA** ($\ge 4.5:1$) |

#### Resolution:
- Replace `text-slate-400 font-normal` on line 292 with `text-slate-500 font-normal` (**$4.76:1$** contrast, comfortably exceeding the $4.5:1$ threshold).
- Replace `text-red-500` on lines 221, 255, 343 with `text-red-600` (**$4.83:1$** contrast, fully compliant with Level AA).
- Both calculations are now 100% harmonized between [TASK_19_AUDIT_REPORT.md](file:///d:/job/1_bizwork-redesign/docs/TASK_19_AUDIT_REPORT.md) and this plan.

---

### 3.5 Requirement 5 — Semantic Section Wrapper & Unified Heading ID

#### Problem in Initial Plan:
The previous proposal suggested generating a new ID `contact-portal-heading` or adding a visually hidden heading without confirming whether a visible heading already existed in the section.

#### Verified Inspection of Contact Page DOM:
Inside `ContactForm.tsx`, lines 153-155:
```tsx
<h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
  {formText.title}
</h2>
```
- `formText.title` renders:
  - EN: `"Inquiry & Project Form"`
  - VI: `"Biểu mẫu Yêu cầu & Dự án"`
This is a prominent, visible, primary section heading (`<h2>`) that accurately defines the central portal action of this section.

#### Unified Architecture:
1. Assign `id="contact-form-heading"` to this exact `<h2>` in [components/contact/ContactForm.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx):
   ```tsx
   <h2
     id="contact-form-heading"
     className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
   >
     {formText.title}
   </h2>
   ```
2. Update the outer container in [app/contact/page.tsx](file:///d:/job/1_bizwork-redesign/app/contact/page.tsx):
   ```tsx
   {/* Sections 2 & 3: Corporate Info & Interactive Contact Form */}
   <section
     aria-labelledby="contact-form-heading"
     className="py-12 sm:py-16 bg-slate-50/50 border-y border-slate-200/80"
   >
     <Container>
       <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
         <div className="lg:col-span-5">
           <ContactInfo />
         </div>
         <div className="lg:col-span-7">
           <ContactForm />
         </div>
       </div>
     </Container>
   </section>
   ```
3. Update the inner `<form>` tag in [components/contact/ContactForm.tsx](file:///d:/job/1_bizwork-redesign/components/contact/ContactForm.tsx):
   ```tsx
   <form
     onSubmit={handleSubmit}
     noValidate
     aria-labelledby="contact-form-heading"
     className="space-y-5"
   >
   ```
4. **Result:**
   - The section landmark is labeled directly by a verified, existing, visible `<h2>`.
   - The `<form>` landmark is labeled by the same heading.
   - Screen reader landmark navigation vocalizes: `"Inquiry & Project Form, region"` and `"Inquiry & Project Form, form"`.
   - No hidden elements, no phantom IDs, zero duplication.

---

### 3.6 Requirement 6 — Truthful Demo Notice (Removing "Task 13")

#### Dictionary Refinement:
Completely eliminate any mention of internal developer backlog codes (`Task 13`). Ensure the wording truthfully and professionally communicates that the form functions as a frontend validation verification interface without network dispatch or data storage.

#### In [lib/i18n/dictionaries/en.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/dictionaries/en.ts):
```ts
bannerPendingTitle: "Notice: Client-Side Demonstration Only",
bannerPendingDesc:
  "This form currently performs frontend validation checks only. Direct email dispatch and database storage are pending future backend integration. No customer data has been stored, saved, or transmitted over the network.",
```

#### In [lib/i18n/dictionaries/vi.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/dictionaries/vi.ts):
```ts
bannerPendingTitle: "Thông báo: Bản Thử Nghiệm Kiểm Tra Phía Client",
bannerPendingDesc:
  "Biểu mẫu này hiện chỉ thực hiện kiểm tra tính hợp lệ của dữ liệu ở phía giao diện (client-side). Chức năng gửi email trực tiếp và lưu trữ cơ sở dữ liệu đang chờ tích hợp backend ở giai đoạn sau. Không có dữ liệu khách hàng nào được lưu trữ hoặc truyền qua mạng.",
```

#### New Supportive Dictionary Keys Added to [lib/i18n/types.ts](file:///d:/job/1_bizwork-redesign/lib/i18n/types.ts):
```ts
buttonValidating: string;
messageHint: string;
```
- **EN:**
  - `buttonValidating: "Checking Fields..."`
  - `messageHint: "Minimum 10 characters required"`
- **VI:**
  - `buttonValidating: "Đang kiểm tra..."`
  - `messageHint: "Yêu cầu tối thiểu 10 ký tự"`

---

## 4. REMAINING SUBTASKS FROM INITIAL PLAN

### 4.1 Mobile Safari Auto-Zoom Prevention (`ISSUE-19-05`)
- In `ContactForm.tsx`, replace `text-sm` with `text-base sm:text-sm` across all inputs (`fullName`, `email`, `company`), `<select id="serviceOfInterest">`, and `<textarea id="message">`.
- Prevents iOS Safari from auto-zooming viewports on mobile while retaining compact enterprise styling on desktop.

### 4.2 Error Icon Screen Reader Protection (`ISSUE-19-06`)
- In `ContactForm.tsx`, replace raw `<span>⚠</span>` with `<span aria-hidden="true">⚠</span>`.
- Prevents screen readers from announcing "warning sign" character strings before the localized message.

### 4.3 Heading Hierarchy in `ContactInfo.tsx` (`ISSUE-19-08`)
- In `ContactInfo.tsx`, standardize card headings to `<h3>`:
  - Line 33: `<h3 className="text-xs font-bold tracking-tight text-slate-900">{info.cardTitle}</h3>`
  - Line 94: Keep existing `<h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">{info.inviteHeading}</h3>`
  - Line 116: Change `<h4 className="text-xs font-bold...">{info.commitmentTitle}</h4>` to `<h3 className="text-xs font-bold...">{info.commitmentTitle}</h3>`.
- Generates a valid heading hierarchy: `<h1>` (ContactHero) $\rightarrow$ `<h2>` (ContactForm) $\rightarrow$ `<h3>` (Cards).

### 4.4 De-duplicate Footer Note in `WhatHappensNext.tsx` (`ISSUE-19-12`)
- Remove the repeated `{data.footerNote}` border block from inside each of the 3 step cards.
- Add a single, centered footer badge/note below the 3-card grid:
  ```tsx
  <div className="mt-10 text-center">
    <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-600">
      {data.footerNote}
    </span>
  </div>
  ```

### 4.5 Focus Handoff for Hero CTA Anchor (`ISSUE-19-13`)
- Add `tabIndex={-1}` and `className="scroll-mt-24 focus:outline-none ..."` to `div#contact-form` in `ContactForm.tsx`.
- Ensures smooth scrolling from Hero button delivers keyboard focus directly to the form container.

---

## 5. REVISED ACCEPTANCE CRITERIA MATRIX

| ID | Verification Area | Exact Test Procedure | Expected Pass Result |
| :---: | :--- | :--- | :--- |
| **AC-01** | **Form Reset Focus** | Submit valid form $\rightarrow$ Success banner appears $\rightarrow$ Click "Reset Form" | Focus lands squarely on `<input id="fullName">` via post-render `useEffect` |
| **AC-02** | **Error Auto-Focus** | Leave form blank $\rightarrow$ Click "Validate & Submit Inquiry" | Focus automatically shifts to `<input id="fullName">` and scrolls into view |
| **AC-03** | **Success Banner Focus** | Complete all fields $\rightarrow$ Click Submit $\rightarrow$ 400ms passes | Focus lands on success container (`tabIndex={-1}`) without duplicate live region echo |
| **AC-04** | **WCAG 2.2 Contrast** | Inspect computed CSS luminance | `(Optional)` is `#64748B` ($4.76:1 \ge 4.5:1$); Asterisks are `#DC2626` ($4.83:1 \ge 4.5:1$) |
| **AC-05** | **Mobile Safari Zoom** | Test input focus on 375px viewport simulation | Viewport scale remains $1.0$; no auto-zoom occurs |
| **AC-06** | **Micro-Interaction** | Click submit $\rightarrow$ Double click during 400ms window | Second click is ignored (`isValidating: true`); spinner displays; timer cleans up on unmount |
| **AC-07** | **Semantic Section** | Inspect HTML accessibility tree | Section has `aria-labelledby="contact-form-heading"` pointing to visible `<h2>` |
| **AC-08** | **Sprint Code Removal** | Search dictionaries for `Task 13` | 0 occurrences in `en.ts`, `vi.ts`, and rendered HTML |
| **AC-09** | **TypeScript Strict** | `npx tsc --noEmit` | Exit code 0, 0 errors |
| **AC-10** | **ESLint Clean** | `npm run lint` | Exit code 0, 0 warnings/errors |
| **AC-11** | **Static Prerender** | `npm run build` | Exit code 0, 5 static routes generated |

---

## 6. EXPLICIT EXCLUSIONS

The following remain strictly **EXCLUDED**:
- ❌ No backend API route creation (`app/api/contact/route.ts`).
- ❌ No email delivery services (Resend, SendGrid, Nodemailer, SMTP).
- ❌ No database schemas (Prisma, Drizzle, MongoDB, Supabase).
- ❌ No simulated server latency or fake network requests.
- ❌ No removal of `PC-01` (phone) or `PC-02` (address) pending notices.
- ❌ No modifications to other pages (`/`, `/about`, `/services`, `/404`).
- ❌ No third-party package installations (`npm install ...`).

---

## 7. STOP & APPROVAL GATE

Following strict project governance:
- **This revised implementation plan is fully prepared for final review.**
- **NO APPLICATION SOURCE CODE HAS BEEN WRITTEN.**
- **NO COMMIT HAS BEEN CREATED.**
- **The system is HALTED awaiting explicit Project Owner authorization to begin coding.**
