# MASTER WORKFLOW & GOVERNANCE SPECIFICATION
## BIZWORK-IT WEBSITE REDESIGN — UI/UX REFINEMENT

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Scope:** Phase 00 through Phase 06 (Tasks 00.1 to 23 + Pre-Production Review)
- **Baseline Git Commit:** `e0f2124`
- **Governance Mode:** Controlled Step-by-Step Execution with User Approval Gates

---

## 1. PROJECT SCOPE & BOUNDARIES

### 1.1. In-Scope Work
The scope of this project is strictly focused on professional frontend UI/UX refinement, design system consistency, accessibility, and bilingual parity for BIZWORK-IT:
- Visual defect remediation and contrast optimization.
- Critical CTA/Button visibility and interaction refinement.
- Complete bilingual (EN/VI) coverage and dictionary parity.
- Contact page and form user experience refinement (client-side validation and transparency notices).
- Spacing, vertical rhythm, and layout grid standardization.
- Typography scale, card surfaces, borders, and component styling polish.
- Responsive viewport adaptation (mobile compact, mobile standard, tablet, desktop).
- Accessibility refinement targeting applicable WCAG 2.2 AA criteria (verifying relevant color contrast, keyboard navigation, focus visibility, semantic heading structure, and ARIA attributes for tested interactive components; only claiming compliance for criteria that have actually been tested).
- Final UI/UX regression auditing, acceptance reporting, and preview verification.

### 1.2. Out-of-Scope Boundaries (Strictly Prohibited)
The following domains are explicitly **out of scope** and must NOT be introduced or modified unless specifically requested and authorized by the user:
- Backend server infrastructure or custom Node.js server daemons.
- Database systems, ORMs, schemas, or persistent cloud stores.
- Authentication, session management, or user management systems.
- CRM integrations, webhook dispatchers, or third-party lead routing.
- Real SMTP/API email delivery integration (form remains client-side validation demo with transparent preview banners).
- Direct production hosting deployment.
- DNS record alteration, nameserver pointing, or migration of the active GoDaddy website.

---

## 2. MASTER PHASE STRUCTURE

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 00: Preparation & Workflow Establishment                         │
│  ├─ Task 00.1: Master Documentation & Workflow Setup   [COMPLETED]     │
│  └─ Task 00.2: Local Git Setup & Baseline Commit       [COMPLETED]     │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 01: Critical Fixes                                               │
│  ├─ Task 17: CTA & Button Visibility Fix               [NOT STARTED]   │
│  └─ Task 18: Full Bilingual Coverage Audit & Polish    [NOT STARTED]   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 02: Contact Refinement                                           │
│  └─ Task 19: Contact Page & Form UX Refinement         [NOT STARTED]   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 03: Visual Consistency                                           │
│  ├─ Task 20: Spacing & Layout Grid Standardization     [NOT STARTED]   │
│  └─ Task 21: Typography, Cards & Component Refinement  [NOT STARTED]   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 04: Responsive & Interaction                                     │
│  └─ Task 22: Responsive & Interaction Optimization     [NOT STARTED]   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 05: Final UI/UX Acceptance                                       │
│  └─ Task 23: Final Visual Polish & Full Regression     [NOT STARTED]   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 06: Preview & Pre-Production Review                              │
│  └─ Final Review, Business Info Validation & Handover  [NOT STARTED]   │
└────────────────────────────────────────────────────────────────────────┘
```

### Phase Details

#### PHASE 00 – Preparation & Workflow Establishment
- **Task 00.1:** Master Documentation & Workflow Establishment — *COMPLETED & ACCEPTED*.
- **Task 00.2:** Local Git Initialization & Baseline Commit (`e0f2124`) — *COMPLETED & ACCEPTED*.

#### PHASE 01 – Critical Fixes
- **Task 17:** CTA/Button Visibility Fix (Address visual contrast, hover states, and clear action hierarchies across primary and secondary buttons).
- **Task 18:** Full Bilingual Coverage Audit & Refinement (Integrate missing 404 page translations, audit dynamic title mapping, ensure complete EN/VI parity).

#### PHASE 02 – Contact Refinement
- **Task 19:** Contact Page & Contact Form UX Refinement (Optimize field feedback, micro-interactions, responsive form layout, and preserve transparent preview notices for PC-01/PC-02).

#### PHASE 03 – Visual Consistency
- **Task 20:** Spacing & Layout Standardization (Normalize section paddings, container max-widths, and vertical rhythm across Home, About, Services, and Contact).
- **Task 21:** Typography, Cards & Component Refinement (Standardize card elevations, borders, heading hierarchy, and typographic tokens adhering to Modern Tech Enterprise).

#### PHASE 04 – Responsive & Interaction
- **Task 22:** Responsive & Interaction Optimization (Fine-tune mobile drawer menu, accordion transitions, touch target sizes $\ge 44$px, and keyboard accessibility).

#### PHASE 05 – Final UI/UX Acceptance
- **Task 23:** Final Visual Polish & Full Regression Audit (Comprehensive 4-page audit, responsive matrix, strict TypeScript/ESLint/Build checks, and formal acceptance report).

#### PHASE 06 – Preview & Pre-Production Review
- Preview server preparation and local/shareable review setup.
- Cross-device verification across modern browsers.
- Formal tracking of pending corporate credentials (`PC-01` phone, `PC-02` address).
- Official vector logo and graphic assets confirmation.
- Production readiness assessment.  
  *Important Note: Achieving "Preview Readiness" does NOT equal "Production Go-Live Approval". Production deployment requires explicit corporate authorization, DNS scheduling, and real backend email integration.*

---

## 3. MANDATORY 8-STEP TASK EXECUTION WORKFLOW

Every single task across all phases must adhere to the rigorous 8-step execution protocol:

```
[1. AUDIT] ──► [2. ANALYSIS] ──► [3. IMPLEMENTATION PLAN] ──► [4. WAIT FOR USER APPROVAL]
                                                                        │
                                                                        ▼
[8. STOP]  ◄─── [7. REPORT]  ◄──── [6. VERIFICATION]     ◄───── [5. CODING]
```

1. **AUDIT:** Inspect current source code, stylesheets, components, and documentation relevant to the specific task. Identify exact line numbers and component behaviors.
2. **ANALYSIS:** Analyze underlying causes of issues, assess impact on other components and responsive viewports, and evaluate potential risks.
3. **IMPLEMENTATION PLAN:** Formulate a step-by-step technical plan specifying files to modify, classes to adjust, and safety boundaries.
4. **WAIT FOR USER APPROVAL:** Present the plan clearly and **STOP COMPLETELY**. No code modification is permitted before explicit user approval.
5. **CODING:** Implement exclusively the approved changes. Do not introduce refactorings or changes outside the approved plan.
6. **VERIFICATION:** Execute real-world CLI checks (`npx tsc --noEmit`, `npm run lint`, `npm run build`), verify responsive behavior, check bilingual sync, and validate DOM states.
7. **REPORT:** Generate a formal task completion report with concrete evidence, command output snippets, and pass/fail matrix.
8. **STOP:** Halt all activity, maintain a clean state, and wait for the user to review, accept, and provide authorization for the next task.

---

## 4. APPROVAL GATES & GOVERNANCE RULES

- **Zero Unapproved Implementation:** Writing code, modifying CSS, or altering translations during an AUDIT or ANALYSIS turn is strictly forbidden.
- **Scope Discipline:** If an issue outside the current task's scope is discovered during audit or coding, it must be documented as an observation and queued for an appropriate future phase, rather than resolved ad-hoc.
- **User Veto & Revision Rights:** The user retains full discretion to modify, reject, or request adjustments to any Implementation Plan before approving execution.
- **No Autonomous Transitions:** The agent must never automatically transition to the next Task or next Phase upon completing a task. Every transition requires explicit user instruction.

---

## 5. DESIGN & BRAND PRESERVATION RULES

All UI/UX refinements must preserve the foundational design choices validated in earlier phases:
- **Design Philosophy:** **Modern Tech Enterprise** — clean, dependable, high-contrast B2B aesthetic.
- **Brand Colors:**
  - Primary Brand Blue: `#2563EB` (Tailwind `blue-600`) / Hover `#1D4ED8` (`blue-700`)
  - Accent Sky: `#0EA5E9` (Tailwind `sky-500`)
  - Surface Backgrounds: `#F8FAFC` (`slate-50`) / Card White `#FFFFFF`
  - Text & Headings: `#0F172A` (`slate-900`) / Muted `#475569` (`slate-600`) / Subtle `#64748B` (`slate-500`)
  - Dark Surface (Footer): `#0F172A` (`slate-900`) / Border `#334155` (`slate-700`)
- **Typography:** Google Font `Plus Jakarta Sans` with optimized tabular and sans metrics.
- **Architecture Integrity:**
  - 4 core pages (`/`, `/about`, `/services`, `/contact`) + custom 404 (`/_not-found`).
  - Next.js 16 App Router conventions and React 19 architecture.
  - Strict TypeScript with zero `any` types.
  - Tailwind CSS v4 token system.
- **Preserved Source Content:** Core messaging (*"We make technology accessible!"*, *"Professional Technology Assistance"*, *"Satisfaction Guaranteed"*, and corporate legal entity **BIZWORKIT (S) PTE LTD**) must never be altered or diminished.

---

## 6. GIT REPOSITORY MANAGEMENT RULES

- **Local-Only Operations:** All Git operations occur strictly in the local repository at `D:\job\1_bizwork-redesign\.git`. No remotes, pushes, or external synchronizations are permitted.
- **Baseline Anchoring:** Commit `e0f2124` represents the verified baseline. It must never be amended, rebased, or reset.
- **Task-Based Commits:** Once a task is formally accepted by the user, a clean, descriptive commit should be recorded (e.g. `feat(contact): refine form validation ux - task 19`).
- **Clean Staging:** Commits must never include `.next`, `node_modules`, `.env`, credentials, or temporary OS files.
- **Pre-Execution Check:** Every task must begin by verifying that `git status` reports a clean working tree.
- **Rollback Safety:** If any change fails verification or user review, Git allows immediate, safe rollback to the previous task commit.

---

## 7. VERIFICATION STANDARDS & CRITERIA

Before any task can be submitted for user acceptance, it must satisfy applicable subsets of these testing standards:

| Test Area | Tool / Command | Verification Requirement |
| :--- | :--- | :--- |
| **TypeScript** | `npx tsc --noEmit` | Strict compilation with 0 errors, 0 type warnings. |
| **ESLint** | `npm run lint` | 0 errors, 0 warnings under React 19 and Next.js 16 rule sets. |
| **Build Optimization** | `npm run build` | Successful production build generating 5 static routes (`○ (Static)`). |
| **Bilingual Parity** | `LanguageContext` inspection | 100% text strings translated in both `en.ts` and `vi.ts`. No missing keys. |
| **Responsive Viewports** | Browser DOM verification | Tested on 1440px, 1280px, 768px, 390px, 375px (`scrollWidth <= innerWidth`). |
| **Accessibility (a11y)**| DOM & Keyboard inspection | Target applicable WCAG 2.2 AA criteria: verify relevant color contrast ($\ge 4.5:1$ text, $\ge 3:1$ UI components), keyboard navigation (Tab, Enter, Space), visible focus rings, single `h1` semantic structure, and ARIA behavior on tested components. Only claim compliance for criteria that have actually been tested. |
| **Navigation & Links** | Link & router audit | 100% active state indicators correct, all internal links and anchor scrolls operational. |
| **Runtime Cleanliness** | Console inspection | 0 hydration errors, 0 runtime exceptions. |

*Absolute Verification Rule: An agent may NEVER mark a criterion as PASS without having actually executed the command or verified the runtime DOM.*

---

## 8. PHASE ACCEPTANCE & HANDOVER PROTOCOL

Each phase is formally concluded only when:
1. All constituent tasks within the phase are marked `COMPLETED` in [docs/TASK_TRACKER.md](file:///d:/job/1_bizwork-redesign/docs/TASK_TRACKER.md).
2. All technical verification checks (`tsc`, `lint`, `build`) pass cleanly.
3. A formal Phase Summary Report is reviewed and accepted by the user.
4. The user issues explicit written authorization to advance to the subsequent Phase.
