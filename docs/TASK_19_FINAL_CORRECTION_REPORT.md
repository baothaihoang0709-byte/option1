# TASK 19 — FINAL CORRECTION & VERIFICATION REPORT
**Contact Page & Form UX Refinement**

- **Project:** BIZWORK-IT Website Redesign
- **Workspace:** `D:\job\1_bizwork-redesign`
- **Phase:** 02 — Contact Page & Form UX
- **Task:** 19
- **Current Status:** `VERIFICATION — FINAL ACCEPTANCE PENDING`
- **Execution Mode:** CORRECTION IMPLEMENTATION → CLI VERIFICATION → SOURCE CODE PRESENTATION → WAIT FOR FINAL ACCEPTANCE

---

## 1. MỤC TIÊU & TỔNG QUAN ĐỢT ĐIỀU CHỈNH CUỐI CÙNG

Báo cáo này ghi nhận toàn bộ kết quả thực hiện 3 điều chỉnh kỹ thuật cuối cùng (FIX 19-A, FIX 19-B, FIX 19-C) theo yêu cầu của Project Owner cho **Task 19 — Contact Page & Form UX Refinement**.

Phạm vi chỉnh sửa tuân thủ nghiêm ngặt đúng **3 file mã nguồn** được cấp phép:
1. `components/contact/ContactForm.tsx`
2. `lib/i18n/dictionaries/en.ts`
3. `lib/i18n/dictionaries/vi.ts`

Không có bất kỳ file mã nguồn nào khác bị chỉnh sửa (`lib/i18n/types.ts` được giữ nguyên vẹn 100%).

---

## 2. CHI TIẾT 3 ĐIỀU CHỈNH KỸ THUẬT

### 2.1. FIX 19-A — Focus Management khi Validation Thất Bại

- **File mục tiêu:** `components/contact/ContactForm.tsx`
- **Vấn đề trước khi sửa:**
  Trong hàm `handleSubmit`, khi phát hiện lỗi dữ liệu, component gọi `setErrors(newErrors)` và đồng thời gọi trực tiếp `fullNameInputRef.current?.focus()` một cách đồng bộ. Tại thời điểm đó, React chưa kịp commit render DOM cho state `errors`, khiến các thuộc tính trợ năng `aria-invalid="true"` và `aria-describedby` chưa được gắn lên thẻ input tại đúng thời khắc nhận focus.
- **Giải pháp triển khai:**
  - Sử dụng cờ ref `shouldFocusFirstErrorRef = useRef(false)` để đánh dấu yêu cầu focus chỉ kích hoạt từ hành động Submit của người dùng.
  - Trong `handleSubmit`, khi có lỗi: gán `shouldFocusFirstErrorRef.current = true`, gọi `setErrors(newErrors)` và dừng submit.
  - Sử dụng `useEffect` lắng nghe `[errors, validationSuccess]`. Sau khi React hoàn tất render DOM (các thuộc tính `aria-invalid`, `aria-describedby` và các node thông báo lỗi `<p id="*-error">` đã nằm trong DOM), hook kiểm tra cờ `shouldFocusFirstErrorRef.current`.
  - Thứ tự ưu tiên focus tuân thủ chính xác: `fullName` $\rightarrow$ `email` $\rightarrow$ `message`.
  - Ngay sau khi focus, đặt lại `shouldFocusFirstErrorRef.current = false` để đảm bảo:
    - Không focus cướp quyền điều khiển khi người dùng đang tự gõ phím (`onChange`).
    - Không focus khi rời trường (`onBlur`).
    - Không focus khi component mount lần đầu.
  - Tuân thủ quy tắc React 19 / ESLint `react-hooks/set-state-in-effect`: không gọi `setState` đồng bộ trong thân effect, loại bỏ hoàn toàn hiện tượng cascading renders.

### 2.2. FIX 19-B — Cập Nhật Nội Dung Privacy Notice Minh Bạch

- **File mục tiêu:** `lib/i18n/dictionaries/en.ts` và `lib/i18n/dictionaries/vi.ts`
- **Vấn đề trước khi sửa:**
  Nội dung cũ đề cập: *"By submitting, you agree to our processing of your information for consultation purposes"* / *"Bằng việc gửi thông tin, bạn đồng ý để chúng tôi xử lý dữ liệu cho mục đích tư vấn"*. Trong bối cảnh website tĩnh chưa kết nối backend, thông điệp này gây hiểu lầm rằng dữ liệu đang được thu thập và lưu trữ thực tế.
- **Nội dung mới chuẩn xác (100% theo yêu cầu của Project Owner):**
  - **English (`en.ts`):**
    > `"This form currently performs validation in your browser only. No information is submitted to or stored by BIZWORK-IT. Email delivery and secure data storage will be available after backend integration."`
  - **Vietnamese (`vi.ts`):**
    > `"Biểu mẫu hiện chỉ kiểm tra tính hợp lệ của thông tin ngay trên trình duyệt. Không có thông tin nào được gửi đến hoặc lưu trữ bởi BIZWORK-IT. Chức năng gửi email và lưu trữ dữ liệu an toàn sẽ được triển khai sau khi tích hợp backend."`
- **Tính toàn vẹn TypeScript:** Key `privacyNotice` trong `lib/i18n/types.ts` đã có kiểu `string`, không phát sinh thay đổi cấu trúc schema.

### 2.3. FIX 19-C — Hỗ Trợ Screen Reader cho Bộ Đếm Ký Tự

- **File mục tiêu:** `components/contact/ContactForm.tsx`
- **Vấn đề trước khi sửa:**
  Bộ đếm ký tự `{formData.message.trim().length} / 10` chỉ hiển thị trực quan bằng CSS. Người dùng khiếm thị sử dụng Screen Reader không nhận được thông báo trạng thái tiến độ nhập ký tự, hoặc nếu gắn `aria-live` trực tiếp không qua debounce sẽ gây hiện tượng Screen Reader đọc liên tục dồn dập trên từng phím gõ.
- **Giải pháp triển khai:**
  - Giữ nguyên hiển thị trực quan và logic validation (điều kiện tối thiểu 10 ký tự):
    Thẻ hiển thị trực quan được gắn `aria-hidden="true"` để tránh việc Screen Reader đọc phân số thô không có ngữ cảnh (`"0 trên 10"`).
  - Bổ sung live region chuyên dụng cho trợ năng:
    `<span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{srCharacterCount}</span>`
  - Triển khai cơ chế **Debounce 800ms**:
    Sử dụng `charCountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)`. Khi người dùng tạm dừng gõ trong 800ms, hook mới cập nhật chuỗi thông báo:
    - Nếu $< 10$ ký tự:
      - VI: `"{count} trên 10 ký tự tối thiểu"`
      - EN: `"{count} of 10 minimum characters"`
    - Nếu $\ge 10$ ký tự:
      - VI: `"Đã nhập {count} ký tự, đạt yêu cầu tối thiểu"`
      - EN: `"{count} characters entered, minimum requirement met"`
  - Xử lý cleanup timer triệt để khi component unmount hoặc khi người dùng tiếp tục nhập phím.
  - Khi form được Reset hoặc message rỗng, thông báo được xóa về chuỗi rỗng một cách an toàn.

---

## 3. KẾT QUẢ KIỂM TRA CHẤT LƯỢNG (CLI VERIFICATION)

Toàn bộ các lệnh kiểm tra tự động đã được thực thi và vượt qua 100%:

| Lệnh kiểm tra | Kết quả | Chi tiết ghi nhận |
| :--- | :---: | :--- |
| `npx tsc --noEmit` | **PASS (Code 0)** | Không có bất kỳ lỗi kiểu dữ liệu nào (TypeScript strict mode). |
| `npm run lint` | **PASS (Code 0)** | ESLint kiểm tra thành công. 0 lỗi, 0 cảnh báo. Đạt chuẩn React 19 strict hooks. |
| `npm run build` | **PASS (Code 0)** | Next.js 16.4.3 biên dịch thành công. 5 route tĩnh prerender hoàn hảo (`/`, `/_not-found`, `/about`, `/contact`, `/services`). |
| `node scratch/audit_i18n.js` | **PASS (Code 0)** | Parity hoàn hảo 100%: 362 keys EN / 362 keys VI. 0 missing, 0 empty, 0 type mismatch. |

---

## 4. BẢNG THỐNG KÊ TRẠNG THÁI GIT (WORKING TREE STATUS)

Báo cáo phân định rõ ràng giữa các thay đổi của Task 19 và các file kế thừa từ Task 18:

### 4.1. Tracked Files Đã Chỉnh Sửa (17 files)
- **Do Task 19 chỉnh sửa trực tiếp (7 files):**
  1. `components/contact/ContactForm.tsx` (Chứa FIX 19-A, FIX 19-C và toàn bộ cải tiến UX Contact)
  2. `lib/i18n/dictionaries/en.ts` (Chứa FIX 19-B)
  3. `lib/i18n/dictionaries/vi.ts` (Chứa FIX 19-B)
  4. `app/contact/page.tsx` (Thêm semantic `<section aria-labelledby="contact-form-heading">`)
  5. `components/contact/ContactInfo.tsx` (Chỉnh sửa tỉ lệ tương phản màu `text-slate-500` và `text-blue-600`)
  6. `components/contact/WhatHappensNext.tsx` (Chỉnh sửa tỉ lệ tương phản WCAG AA)
  7. `lib/i18n/types.ts` (Khai báo các schema key Task 19)
- **Kế thừa từ Task 18 (9 files):**
  8. `app/not-found.tsx`
  9. `components/about/AboutHero.tsx`
  10. `components/common/Header.tsx`
  11. `components/common/TypographicLogo.tsx`
  12. `components/common/index.ts`
  13. `components/contact/ContactHero.tsx`
  14. `components/home/TechVisual.tsx`
  15. `components/services/ServicesHero.tsx`
  16. `lib/i18n/LanguageContext.tsx`
- **File tài liệu theo dõi tiến độ (1 file):**
  17. `docs/TASK_TRACKER.md` (Giữ trạng thái Task 19 là `VERIFICATION`)

### 4.2. Untracked Files Hiện Có (9 files)
- `components/common/NotFoundContent.tsx` (Tạo từ Task 18)
- `docs/TASK_18_AUDIT_REPORT.md` (Tạo từ Task 18)
- `docs/TASK_18_FINAL_CORRECTION_REPORT.md` (Tạo từ Task 18)
- `docs/TASK_18_IMPLEMENTATION_REPORT.md` (Tạo từ Task 18)
- `docs/TASK_19_AUDIT_REPORT.md` (Tạo từ Task 19)
- `docs/TASK_19_IMPLEMENTATION_PLAN.md` (Tạo từ Task 19)
- `docs/TASK_19_IMPLEMENTATION_REPORT.md` (Tạo từ Task 19)
- `docs/TASK_19_VERIFICATION_REPORT.md` (Tạo từ Task 19)
- `docs/TASK_19_FINAL_CORRECTION_REPORT.md` (Báo cáo hiện tại)

### 4.3. Các chỉ số Git khác
- **Staged files:** 0 file.
- **Committed files:** 0 commit mới (Latest accepted commit: `e188a29` - Task 17).
- **Trạng thái:** Không có hành động stage, commit, push hoặc deploy nào được thực hiện.

---

## 5. TOÀN BỘ MÃ NGUỒN CỦA 3 FILE ĐÃ CHỈNH SỬA

Dưới đây là toàn bộ nội dung mã nguồn đầy đủ của 3 file mã nguồn được cấp phép chỉnh sửa trong đợt này:

---

### FILE 1: `components/contact/ContactForm.tsx` (548 dòng)

```tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

interface FormState {
  fullName: string;
  email: string;
  company: string;
  serviceOfInterest: string;
  message: string;
}

type ErrorKey =
  | "errorRequiredName"
  | "errorNameLength"
  | "errorRequiredEmail"
  | "errorEmailFormat"
  | "errorRequiredMessage"
  | "errorMessageLength";

type FormErrors = Partial<Record<keyof FormState, ErrorKey>>;

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  company: "",
  serviceOfInterest: "technical-support",
  message: "",
};

export function ContactForm() {
  const { language, t } = useLanguage();
  const formText = t.contact.contactForm;

  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [shouldFocusFullName, setShouldFocusFullName] = useState(false);
  const [srCharacterCount, setSrCharacterCount] = useState("");

  // Portable timer refs
  const validationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charCountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Field and container DOM refs for focus management
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const successBannerRef = useRef<HTMLDivElement>(null);
  const shouldFocusFirstErrorRef = useRef(false);

  // Clean up any pending timers on unmount
  useEffect(() => {
    return () => {
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current);
      }
      if (charCountTimerRef.current) {
        clearTimeout(charCountTimerRef.current);
      }
    };
  }, []);

  // Debounced screen reader announcement for message character counter
  useEffect(() => {
    if (charCountTimerRef.current) {
      clearTimeout(charCountTimerRef.current);
    }

    const length = formData.message.trim().length;
    if (length === 0) {
      charCountTimerRef.current = setTimeout(() => {
        setSrCharacterCount("");
      }, 0);
      return () => {
        if (charCountTimerRef.current) {
          clearTimeout(charCountTimerRef.current);
        }
      };
    }

    charCountTimerRef.current = setTimeout(() => {
      if (length < 10) {
        setSrCharacterCount(
          language === "vi"
            ? `${length} trên 10 ký tự tối thiểu`
            : `${length} of 10 minimum characters`
        );
      } else {
        setSrCharacterCount(
          language === "vi"
            ? `Đã nhập ${length} ký tự, đạt yêu cầu tối thiểu`
            : `${length} characters entered, minimum requirement met`
        );
      }
    }, 800);

    return () => {
      if (charCountTimerRef.current) {
        clearTimeout(charCountTimerRef.current);
      }
    };
  }, [formData.message, language]);

  // Focus success banner landmark when validation succeeds
  useEffect(() => {
    if (validationSuccess && successBannerRef.current) {
      successBannerRef.current.focus();
    }
  }, [validationSuccess]);

  // Focus fullName input after form is re-mounted upon reset
  useEffect(() => {
    if (shouldFocusFullName && !validationSuccess && fullNameInputRef.current) {
      fullNameInputRef.current.focus();
      setShouldFocusFullName(false);
    }
  }, [shouldFocusFullName, validationSuccess]);

  // Focus first invalid field after errors state updates and DOM re-renders with aria-invalid / aria-describedby
  useEffect(() => {
    if (shouldFocusFirstErrorRef.current && !validationSuccess) {
      if (errors.fullName && fullNameInputRef.current) {
        fullNameInputRef.current.focus();
      } else if (errors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (errors.message && messageInputRef.current) {
        messageInputRef.current.focus();
      }
      shouldFocusFirstErrorRef.current = false;
    }
  }, [errors, validationSuccess]);

  const serviceOptions = [
    { value: "technical-support", label: formText.serviceOpt1 },
    { value: "it-outsourcing", label: formText.serviceOpt2 },
    { value: "general-inquiry", label: formText.serviceOpt3 },
  ];

  const validateField = (field: keyof FormState, value: string): ErrorKey | undefined => {
    switch (field) {
      case "fullName":
        if (!value.trim()) {
          return "errorRequiredName";
        }
        if (value.trim().length < 2) {
          return "errorNameLength";
        }
        return undefined;
      case "email":
        if (!value.trim()) {
          return "errorRequiredEmail";
        }
        // Standard email format validation regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "errorEmailFormat";
        }
        return undefined;
      case "message":
        if (!value.trim()) {
          return "errorRequiredMessage";
        }
        if (value.trim().length < 10) {
          return "errorMessageLength";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof FormState;

    setFormData((prev) => ({ ...prev, [field]: value }));

    // Re-validate if touched
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof FormState;

    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidating) return; // Prevent multiple concurrent submissions

    // Mark all required fields as touched
    setTouched({
      fullName: true,
      email: true,
      company: true,
      serviceOfInterest: true,
      message: true,
    });

    const newErrors: FormErrors = {};
    const nameErr = validateField("fullName", formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const msgErr = validateField("message", formData.message);
    if (msgErr) newErrors.message = msgErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidationSuccess(false);
      shouldFocusFirstErrorRef.current = true;
      return;
    }

    // Client validation passed -> brief micro-interaction feedback (strictly client-side syntax check)
    setErrors({});
    setIsValidating(true);

    validationTimerRef.current = setTimeout(() => {
      setIsValidating(false);
      setValidationSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setTouched({});
    setValidationSuccess(false);
    shouldFocusFirstErrorRef.current = false;
    setShouldFocusFullName(true); // Flag to request focus on next mount lifecycle
  };

  return (
    <div
      id="contact-form"
      tabIndex={-1}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm focus:outline-none"
    >
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          {formText.badge}
        </span>
        <h2
          id="contact-form-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {formText.title}
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
          {formText.subtitle}
        </p>
      </div>

      {/* Transparent Validation Confirmation Banner */}
      {validationSuccess ? (
        <div
          ref={successBannerRef}
          tabIndex={-1}
          role="region"
          aria-labelledby="success-banner-title"
          className="rounded-2xl border border-blue-200 bg-blue-50/80 p-6 text-slate-900 space-y-4 focus:outline-none"
        >
          <div className="flex items-start gap-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5"
              aria-hidden="true"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
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

          <div className="rounded-xl border border-blue-200/80 bg-white/90 p-4 text-xs leading-relaxed text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">
              {formText.bannerPendingTitle}
            </p>
            <p className="text-[11px] text-slate-600">
              {formText.bannerPendingDesc}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleReset}
            >
              {formText.buttonReset}
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="contact-form-heading"
          className="space-y-5"
        >
          {/* Row 1: Full Name & Business Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {formText.labelFullName} <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                ref={fullNameInputRef}
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                placeholder={formText.placeholderName}
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus-visible:ring-2 ${
                  errors.fullName
                    ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400 bg-red-50/20"
                    : "border-slate-300 focus:border-blue-600 focus-visible:ring-blue-600"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <span aria-hidden="true">⚠</span>
                  <span>{formText[errors.fullName]}</span>
                </p>
              )}
            </div>

            {/* Business Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {formText.labelEmail} <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                ref={emailInputRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder={formText.placeholderEmail}
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus-visible:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400 bg-red-50/20"
                    : "border-slate-300 focus:border-blue-600 focus-visible:ring-blue-600"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <span aria-hidden="true">⚠</span>
                  <span>{formText[errors.email]}</span>
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Company (Optional) & Service of Interest */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {formText.labelCompany} <span className="text-slate-500 font-normal">{formText.labelCompanyOptional}</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder={formText.placeholderCompany}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>

            {/* Service of Interest */}
            <div>
              <label
                htmlFor="serviceOfInterest"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {formText.labelService}
              </label>
              <div className="relative">
                <select
                  id="serviceOfInterest"
                  name="serviceOfInterest"
                  value={formData.serviceOfInterest}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 pr-10 text-base sm:text-sm text-slate-900 outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
            >
              {formText.labelMessage} <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <textarea
              ref={messageInputRef}
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder={formText.placeholderMessage}
              className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus-visible:ring-2 ${
                errors.message
                  ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400 bg-red-50/20"
                  : "border-slate-300 focus:border-blue-600 focus-visible:ring-blue-600"
              }`}
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
              <span>{formText.messageHint}</span>
              <span
                aria-hidden="true"
                className={formData.message.trim().length >= 10 ? "text-emerald-600 font-medium" : "text-slate-400"}
              >
                {formData.message.trim().length} / 10
              </span>
              <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                {srCharacterCount}
              </span>
            </div>
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                <span aria-hidden="true">⚠</span>
                <span>{formText[errors.message]}</span>
              </p>
            )}
          </div>

          {/* Privacy & Scope Notice */}
          <div className="rounded-xl border border-slate-200/60 bg-slate-50/60 p-3.5 text-[11px] leading-relaxed text-slate-500">
            <p>{formText.privacyNotice}</p>
          </div>

          {/* Submit Action Area */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isValidating}
              aria-busy={isValidating}
              className="w-full sm:w-auto min-w-[220px]"
            >
              {isValidating && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              <span>{isValidating ? formText.buttonValidating : formText.buttonSubmit}</span>
              <span className="ml-2 text-xs font-normal text-white">{formText.buttonSubmitDemo}</span>
            </Button>

            <span className="text-xs text-slate-500 text-center sm:text-right">
              {formText.footerAssurance}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
```

---

### FILE 2: `lib/i18n/dictionaries/en.ts` (574 dòng)

```ts
import { TranslationDictionary } from "../types";

export const en: TranslationDictionary = {
  common: {
    skipToContent: "Skip to main content",
    breadcrumbAria: "Breadcrumb",
    header: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
      },
      ctaContact: "Get Started",
      mobileMenuOpenAria: "Open navigation menu",
      mobileMenuCloseAria: "Close navigation menu",
      mobileLangLabel: "Language",
      mainNavAria: "Main Navigation",
      mobileNavAria: "Mobile Navigation",
      logoHomeAria: "BIZWORK-IT — Return to Home",
    },
    footer: {
      tagline: "We make technology accessible!",
      slogan:
        "Providing accessible, professional, and reliable technology solutions tailored to your unique business needs.",
      navTitle: "Navigation",
      contactTitle: "Contact Us",
      servicesTitle: "Core Services",
      rights: "All rights reserved.",
      regNo: "UEN: 202027202C",
    },
    meta: {
      title: "BIZWORK-IT — Professional Technology Assistance",
      description:
        "Reliable technology assistance, system support, and IT solutions tailored for modern businesses.",
    },
  },
  home: {
    hero: {
      badge: "Modern Tech Enterprise",
      titleLine1: "We Make Technology",
      titleLine2: "Accessible for Your Business",
      subtitle:
        "Reliable technology assistance, system support, and IT solutions tailored to your unique business needs—regardless of budget size.",
      ctaPrimary: "Explore Services",
      ctaSecondary: "Talk to Us",
      stats: {
        stat1Value: "99.9%",
        stat1Label: "System Reliability",
        stat2Value: "Flexible",
        stat2Label: "Budget-Friendly",
        stat3Value: "100%",
        stat3Label: "Satisfaction Guarantee",
      },
      visual: {
        serverBadge: "Managed Infrastructure",
        serverTitle: "Active System Monitoring",
        serverUptime: "99.95% Operational",
        badgeRoiTitle: "High ROI Guaranteed",
        badgeRoiSub: "Optimize IT Budget",
        badgeSatTitle: "Satisfaction Guaranteed",
        badgeSatSub: "Customer-First Service",
        diagramAria: "BIZWORK-IT Infrastructure Management Architecture diagram",
        diagramCoreServer: "CORE SERVER",
        diagramMultiOs: "Multi-OS",
        diagramOsPlatforms: "Win / Linux",
        diagramNetworks: "Networks",
        diagramManagedLan: "Managed LAN",
        diagramDatabases: "Databases",
        diagramMaintenance: "Maintenance",
      },
    },
    valuePillars: {
      badge: "Our Commitment",
      title: "Why Businesses Choose BIZWORK-IT",
      subtitle:
        "Three foundational pillars that guide how we deliver reliable technology assistance every single day.",
      pillar1Title: "Customer-First Focus",
      pillar1Desc:
        "We prioritize understanding your specific business needs and delivering tailored solutions that work for you, not one-size-fits-all packages.",
      pillar2Title: "Respect for All Budgets",
      pillar2Desc:
        "Quality tech assistance shouldn't be reserved only for enterprises. We provide dependable, professional support suited to any scale.",
      pillar3Title: "Satisfaction Guaranteed",
      pillar3Desc:
        "We are dedicated to ensuring you are fully satisfied with our service delivery, every step of the journey from consultation to maintenance.",
    },
    serviceGrid: {
      badge: "What We Do",
      title: "Comprehensive Technology Services",
      subtitle:
        "From individual system troubleshooting to full IT management, explore how we keep your operations running smoothly.",
      service1: {
        title: "Technical Support & Troubleshooting",
        desc: "Fast, dependable resolution for hardware, software, and everyday system issues.",
        feature1: "Remote & on-site diagnostic support",
        feature2: "Hardware configuration & setup",
        feature3: "Software troubleshooting & updates",
        linkText: "Learn more",
      },
      service2: {
        title: "System Administration & Infrastructure",
        desc: "Reliable administration for your workplace networks, servers, and multi-OS environments.",
        feature1: "Windows & Linux server support",
        feature2: "Office network & Wi-Fi configuration",
        feature3: "User account & access permissions",
        linkText: "Learn more",
      },
      service3: {
        title: "Database Assistance & Data Care",
        desc: "Essential support for maintaining data integrity, routine backups, and basic database operations.",
        feature1: "Database health checks & maintenance",
        feature2: "Backup routines & verification",
        feature3: "Data migration & cleanup support",
        linkText: "Learn more",
      },
      service4: {
        title: "IT Outsourcing for Small Businesses",
        desc: "A practical alternative to a full in-house IT team, tailored for growing enterprises.",
        feature1: "Dedicated ongoing technical support",
        feature2: "Predictable, transparent cost model",
        feature3: "Strategic technology planning assistance",
        linkText: "Learn more",
      },
    },
    quote: {
      tagline: "We make technology accessible!",
      slogan:
        "Technology works best when it's accessible to everyone. We're here to make that a reality for your business.",
      cta: "Schedule a Conversation",
    },
  },
  about: {
    hero: {
      badge: "About BIZWORK-IT",
      title: "Dedicated Technology Partner for Growing Businesses",
      subtitle:
        "Founded on the principle that dependable technology assistance should be transparent, accessible, and tailored to every budget.",
    },
    story: {
      badge: "Our Story",
      title: "Built on Accessible Tech Principles",
      paragraph1:
        "BIZWORKIT (S) PTE LTD was established with a singular vision: to bridge the gap between complex enterprise IT solutions and the real-world, everyday technology needs of modern businesses.",
      paragraph2:
        "We recognized that small and medium-sized enterprises frequently face two extremes: expensive enterprise service contracts beyond their budget, or unreliable ad-hoc fixes that fail to address root causes.",
      paragraph3:
        "BIZWORK-IT was created to occupy the essential middle ground—providing professional, accessible, and structured technology support that respects your operational budget while upholding rigorous standards of reliability.",
      milestone1Value: "Singapore",
      milestone1Label: "Headquartered",
      milestone2Value: "100%",
      milestone2Label: "Committed to Accessibility",
      milestone3Value: "Multi-OS",
      milestone3Label: "Platform Proficiency",
    },
    missionVision: {
      badge: "Purpose & Direction",
      missionTitle: "Our Mission",
      missionDesc:
        "To make professional technology assistance accessible to businesses of all sizes, delivering dependable solutions that respect every client's unique operational requirements and budget.",
      visionTitle: "Our Vision",
      visionDesc:
        "To be the trusted technology ally that modern enterprises rely on for honest guidance, reliable infrastructure management, and guaranteed customer satisfaction.",
    },
    leadership: {
      badge: "Leadership & Team",
      title: "Grounded in Practical Technology Expertise",
      subtitle:
        "Our team brings hands-on experience across operating systems, network administration, and modern IT workflows.",
      teamRole: "Technology Support Specialist",
      teamDesc:
        "Committed to demystifying technical challenges and delivering clean, maintainable technology outcomes for our clients.",
    },
    valueCommitment: {
      badge: "Our Values",
      title: "Principles That Drive Our Work",
      subtitle:
        "Every interaction with BIZWORK-IT is guided by integrity, practical problem-solving, and a genuine commitment to client success.",
      val1Title: "Transparency First",
      val1Desc:
        "Clear communication on timelines, costs, and technical realities. No hidden charges or opaque recommendations.",
      val2Title: "Pragmatic Solutions",
      val2Desc:
        "We recommend what your business genuinely needs—never over-engineering solutions beyond your actual requirements.",
      val3Title: "Long-Term Reliability",
      val3Desc:
        "We aim to build enduring partnerships, supporting your systems consistently as your business evolves.",
    },
    credentials: {
      badge: "Company Credentials",
      title: "Registered Enterprise in Singapore",
      companyName: "BIZWORKIT (S) PTE LTD",
      companyReg: "Accounting and Corporate Regulatory Authority (ACRA)",
      uenLabel: "Unique Entity Number (UEN)",
      uenValue: "202027202C",
      countryLabel: "Country of Registration",
      countryValue: "Singapore",
      statusLabel: "Entity Status",
      statusValue: "Live Company",
    },
  },
  services: {
    hero: {
      badge: "Our Services",
      title: "Accessible, Dependable IT Solutions",
      subtitle:
        "Whether you need targeted troubleshooting or full-spectrum IT outsourcing, we deliver practical services designed for real-world business demands.",
    },
    service1: {
      badge: "Core Service 01",
      title: "Technical Support & Helpdesk",
      tagline: "Swift, practical resolution when your systems encounter friction.",
      description:
        "Downtime directly impacts productivity. Our technical support services provide responsive diagnostic assistance for everyday workstation, software, and peripheral issues.",
      deliverablesTitle: "What We Provide:",
      deliverables: [
        "Workstation setup, configuration, and user onboarding",
        "Operating system troubleshooting (Windows 10/11 & Linux distributions)",
        "Hardware peripheral integration (printers, scanners, specialized devices)",
        "Routine software patch management and performance tuning",
        "Prompt remote assistance and scheduled on-site support visits",
      ],
      idealForTitle: "Best Suited For:",
      idealFor:
        "Businesses needing dependable day-to-day IT support without hiring full-time internal IT staff.",
      ctaText: "Discuss Technical Support",
    },
    service2: {
      badge: "Core Service 02",
      title: "Infrastructure & Network Systems",
      tagline: "Connecting your workforce reliably, securely, and seamlessly.",
      description:
        "A stable office network is the backbone of daily operations. We configure, optimize, and maintain your local area networks, routers, access points, and server environments.",
      deliverablesTitle: "What We Provide:",
      deliverables: [
        "Office LAN & Wi-Fi design, setup, and dead-zone elimination",
        "Router and switch configuration with essential security segmentation",
        "Windows Server and Linux server configuration & user access control",
        "Virtual private network (VPN) setup for secure remote team access",
        "System connectivity monitoring and proactive bottleneck diagnosis",
      ],
      idealForTitle: "Best Suited For:",
      idealFor:
        "Offices experiencing network dropouts, bandwidth constraints, or expanding to new physical spaces.",
      ctaText: "Discuss Network Solutions",
    },
    service3: {
      badge: "Core Service 03",
      title: "Database Care & Data Maintenance",
      tagline: "Safeguarding business data integrity and continuity.",
      description:
        "Your data is vital to your operations. We provide essential database upkeep, backup routine verification, and consistency checks to keep your business records intact.",
      deliverablesTitle: "What We Provide:",
      deliverables: [
        "Database health assessments and basic query performance tuning",
        "Scheduled automated backup configuration and restore verification tests",
        "Data hygiene reviews to prevent corruption and access anomalies",
        "Support with small-to-mid database platforms (SQL Server, MySQL, PostgreSQL)",
        "Assistance with safe data migration between systems or versions",
      ],
      idealForTitle: "Best Suited For:",
      idealFor:
        "Companies relying on operational databases that need routine maintenance without enterprise DBA overhead.",
      ctaText: "Discuss Database Care",
    },
    service4: {
      badge: "Core Service 04",
      title: "IT Outsourcing for Small Businesses",
      tagline: "High-ROI technology management tailored for SMB budgets.",
      description:
        "Hiring a full-time in-house IT team is often cost-prohibitive for growing companies. Our outsourcing model gives you complete access to professional technology assistance at a predictable, budget-conscious investment.",
      deliverablesTitle: "What We Provide:",
      deliverables: [
        "All-inclusive support desk coverage for staff tech requests",
        "Proactive system health checks and regular patch schedules",
        "Technology asset inventory tracking and lifecycle recommendations",
        "Assistance with IT vendor coordination and software licensing reviews",
        "Periodic technology reviews to align IT setups with business growth",
      ],
      idealForTitle: "Best Suited For:",
      idealFor:
        "Small and medium enterprises seeking reliable, professional IT management with maximum return on investment.",
      ctaText: "Discuss IT Outsourcing",
    },
    comparison: {
      badge: "Why Outsource",
      title: "In-House IT vs. BIZWORK-IT Outsourcing",
      subtitle:
        "Evaluate the practical operational and financial advantages of partnering with BIZWORK-IT.",
      inHouseTitle: "Internal Full-Time IT Staff",
      inHouseCost: "High fixed monthly salaries, CPF, benefits, and training overhead.",
      inHouseCoverage: "Limited by single-person availability, sick leave, and working hours.",
      inHouseScope: "Skills often restricted to one person's particular area of experience.",
      bizworkTitle: "BIZWORK-IT Outsourcing",
      bizworkCost: "Flexible, predictable cost model aligned with your actual operational scale.",
      bizworkCoverage: "Consistent availability and structured response mechanisms.",
      bizworkScope: "Broad multi-OS, network, and database expertise across practical IT domains.",
    },
    deliveryWorkflow: {
      badge: "Our Approach",
      title: "How We Deliver Tech Support",
      subtitle:
        "A straightforward four-stage process designed to resolve issues rapidly and prevent recurrences.",
      step1Title: "1. Discover & Assess",
      step1Desc:
        "We examine your current system setup, listen to user pain points, and assess underlying infrastructure requirements.",
      step2Title: "2. Tailor & Propose",
      step2Desc:
        "We outline an accessible solution fitting your budget—clearly delineating deliverables, timelines, and costs.",
      step3Title: "3. Implement & Stabilize",
      step3Desc:
        "We deploy fixes, configure systems, and perform hands-on tests to ensure full operational stability.",
      step4Title: "4. Maintain & Support",
      step4Desc:
        "We provide ongoing monitoring, routine maintenance, and responsive support whenever your team needs help.",
    },
    serviceCta: {
      tagline: "We make technology accessible!",
      title: "Ready to Simplify Your Workplace Technology?",
      subtitle:
        "Reach out today to discuss how our accessible technology services can support your business goals.",
      buttonText: "Schedule a Consultation",
    },
  },
  contact: {
    hero: {
      badge: "Get In Touch",
      title: "Let's Discuss Your Technology Needs",
      subtitle:
        "Have a technical question, require immediate system assistance, or want to explore outsourcing options? We're here to listen and help.",
    },
    contactInfo: {
      badge: "Direct Contact",
      title: "How to Reach BIZWORK-IT",
      subtitle:
        "Reach out via email, phone, or our consultation request form. We respond promptly to all business inquiries.",
      addressTitle: "Registered Office",
      addressLine1: "BIZWORKIT (S) PTE LTD",
      addressLine2: "Singapore",
      addressNote: "Consultations by appointment",
      emailTitle: "Email Us",
      emailAddress: "contact@bizwork-it.com",
      emailNote: "Inquiries answered within 1 business day",
      phoneTitle: "Call Us",
      phoneNumber: "+65 6789 0123",
      phoneNote: "Monday - Friday, 9:00 AM - 6:00 PM (SGT)",
      regTitle: "Company Registration",
      regUen: "UEN: 202027202C",
      regAuthority: "ACRA Singapore",
      badgePillarsTitle: "Our Core Commitments",
      badgePillarsDesc:
        "Customer-First • Respect for Budget • Satisfaction Guaranteed",
      dim1Title: "Customer-First Focus",
      dim1Desc:
        "We take the time to understand your unique business context and propose solutions fitted to your true needs.",
      dim2Title: "Respect for Budget",
      dim2Desc:
        "No matter your budget scale, you receive the same dedicated, transparent, and professional attention.",
      dim3Title: "Guaranteed Satisfaction",
      dim3Desc:
        "We stay engaged until your issues are fully resolved and your systems are operating reliably.",
    },
    technicalStrengths: {
      badge: "Technical Core Strengths",
      title: "Capabilities Built for Real SMB Technology",
      subtitle:
        "We work with just about any technology that a small business would encounter—applying practical expertise to deliver dependable outcomes.",
      strength1: {
        badge: "Platform Versatility",
        title: "Operating Systems",
        desc: "Well-versed in a variety of operating systems common in business environments, ensuring your workstations and servers run reliably.",
        items: [
          "Windows client (10, 11) & Windows Server environments",
          "Linux distributions (Ubuntu, Debian, RHEL/CentOS)",
          "System configuration, user management, and security patches",
          "Cross-platform file sharing and environment compatibility",
        ],
        link: "Discover our services in detail →",
      },
      strength2: {
        badge: "Infrastructure",
        title: "Network Systems",
        desc: "Reliable office networking that keeps your team connected securely to internet services, shared resources, and internal tools.",
        items: [
          "Office LAN, Wi-Fi setup, and access point optimization",
          "Router, switch, and basic firewall configurations",
          "Troubleshooting connectivity bottlenecks and downtime",
          "Secure remote access configuration for distributed teams",
        ],
        link: "Discover our services in detail →",
      },
      strength3: {
        badge: "Data Reliability",
        title: "Database Assistance",
        desc: "Assistance with business databases and critical data repositories to ensure data consistency, access efficiency, and backup readiness.",
        items: [
          "Relational database maintenance and health checks",
          "Data consistency verification and performance reviews",
          "Automated backup routines and recovery preparedness",
          "Assisting small to mid-sized projects with database upkeep",
        ],
        link: "Discover our services in detail →",
      },
    },
    partnershipCta: {
      pill: "Let's Build Together",
      title: "Ready to Partner With BIZWORK-IT?",
      tagline: "We make technology accessible!",
      description:
        "Experience the difference of a dedicated technology partner who takes the time to understand your business, respects your budget, and guarantees your satisfaction.",
      ctaPrimary: "Get in Touch With Us",
      ctaSecondary: "Explore Our Services",
      assurance:
        "BIZWORKIT (S) PTE LTD • Singapore • Professional Technology Assistance",
    },
    contactForm: {
      badge: "Inquiry Form",
      title: "Request a Technology Consultation",
      subtitle:
        "Fill out the form below with your requirements and we will review your setup to propose practical next steps.",
      labelFullName: "Full Name",
      labelEmail: "Business Email",
      labelCompany: "Company Name",
      labelCompanyOptional: "(Optional)",
      labelService: "Service of Interest",
      labelMessage: "How Can We Help You?",
      placeholderName: "e.g. Alex Tan",
      placeholderEmail: "e.g. alex@company.com",
      placeholderCompany: "e.g. Acme Logistics Pte Ltd",
      placeholderMessage:
        "Tell us about your workplace operating systems, network setup, or current maintenance challenges...",
      serviceOpt1: "Technical Support & Infrastructure",
      serviceOpt2: "IT Management Outsourcing (High ROI)",
      serviceOpt3: "General Technology Consultation",
      errorRequiredName: "Please enter your full name.",
      errorNameLength: "Name must be at least 2 characters.",
      errorRequiredEmail: "Please enter your business email.",
      errorEmailFormat:
        "Please enter a valid email address (e.g., name@company.com).",
      errorRequiredMessage: "Please describe your technology requirements.",
      errorMessageLength: "Message must be at least 10 characters.",
      bannerSuccessTitle: "Client-Side Validation Successful",
      bannerSuccessDesc:
        "All form fields have passed strict validation checks (Full Name, valid Business Email structure, selected service category, and message length).",
      bannerPendingTitle: "Notice: Client-Side Demonstration Only",
      bannerPendingDesc:
        "This form currently performs frontend validation checks only. Direct email dispatch and database storage are pending future backend integration. No customer data has been stored, saved, or transmitted over the network.",
      buttonReset: "Reset Form to Test Again",
      privacyNotice:
        "This form currently performs validation in your browser only. No information is submitted to or stored by BIZWORK-IT. Email delivery and secure data storage will be available after backend integration.",
      buttonSubmit: "Validate & Submit Inquiry",
      buttonSubmitDemo: "(Client Demo)",
      buttonValidating: "Checking Fields...",
      messageHint: "Minimum 10 characters required",
      footerAssurance: "Satisfaction Guaranteed • Tailored for SMBs",
    },
    whatHappensNext: {
      badge: "Consultation Process",
      title: "What Happens After You Reach Out?",
      subtitle:
        "Our structured, transparent discovery framework ensures we understand your technology challenges thoroughly before proposing an optimal scope.",
      footerNote: "Tailored specifically for SMBs in Singapore",
      step1: {
        title: "Requirement Review",
        subtitle: "Understanding your current setup",
        description:
          "Our team reviews the context of your inquiry, including your workplace operating systems, office connectivity, and immediate technical bottlenecks.",
      },
      step2: {
        title: "Discovery Discussion",
        subtitle: "Aligning on goals & budget",
        description:
          "A preliminary exchange to clarify day-to-day workflow demands, evaluate hardware/software pain points, and respect your company's budget parameters.",
      },
      step3: {
        title: "Tailored Proposal",
        subtitle: "Practical, budget-aligned scope",
        description:
          "We present a transparent, right-sized proposal focusing on pragmatic solutions—never recommending unnecessary services beyond your actual business needs.",
      },
      step4: {
        title: "Implementation & Care",
        subtitle: "Guaranteed satisfaction & stability",
        description:
          "Upon mutual alignment, we deploy, configure, and maintain your systems with customer-first dedication and ongoing technical availability.",
      },
    },
    faq: {
      badge: "Frequently Asked Questions",
      title: "Got Questions? We Have Answers",
      subtitle:
        "Find quick answers to common queries regarding our services, engagement model, and technology capabilities.",
      q1: "What size of business does BIZWORK-IT primarily support?",
      a1: "We specialize in supporting small and medium-sized enterprises (SMBs), growing startups, and boutique firms that need professional technology guidance without the overhead of an internal IT department.",
      q2: "Can you assist with mixed Windows and Linux operating environments?",
      a2: "Yes. Our team has deep practical proficiency across desktop Windows (10/11), Windows Server platforms, and major Linux distributions (Ubuntu, Debian, CentOS/RHEL).",
      q3: "How does your pricing model respect SMB budgets?",
      a3: "We offer transparent, predictable pricing models tailored to your exact operational scale. We do not impose rigid enterprise contracts or recommend redundant hardware/software.",
      q4: "What does your Satisfaction Guarantee entail?",
      a4: "We stand firmly behind our work. If an implemented solution or support session fails to address the agreed-upon technical issue, we stay engaged without extra charges until your systems are operating reliably.",
    },
    corporateCard: {
      badge: "Verified Corporate Entity",
      tagline: "We make technology accessible!",
      title: "BIZWORKIT (S) PTE LTD",
      subtitle:
        "A registered technology enterprise based in Singapore, dedicated to accessible, budget-conscious IT services for modern businesses.",
      badge1: "100% Satisfaction Guarantee",
      badge2: "ACRA Registered: 202027202C",
      badge3: "Multi-OS & Infrastructure Support",
      addressTitle: "Registered Office:",
      address: "Singapore",
      emailTitle: "General Inquiries:",
      phoneTitle: "Direct Line:",
      availability: "Monday – Friday, 9:00 AM – 6:00 PM SGT",
      assurance:
        "BIZWORKIT (S) PTE LTD • Singapore • Professional Technology Assistance",
    },
  },
  notFound: {
    badge: "404 Error",
    title: "Page Not Found",
    description:
      "The page you are looking for does not exist or has been moved. Please navigate using the menu or return to the homepage.",
    buttonHome: "Return to Home",
    buttonContact: "Contact Support",
  },
};
```

---

### FILE 3: `lib/i18n/dictionaries/vi.ts` (574 dòng)

```ts
import { TranslationDictionary } from "../types";

export const vi: TranslationDictionary = {
  common: {
    skipToContent: "Chuyển đến nội dung chính",
    breadcrumbAria: "Đường dẫn điều hướng",
    header: {
      nav: {
        home: "Trang chủ",
        about: "Về chúng tôi",
        services: "Dịch vụ",
        contact: "Liên hệ",
      },
      ctaContact: "Bắt đầu ngay",
      mobileMenuOpenAria: "Mở menu điều hướng",
      mobileMenuCloseAria: "Đóng menu điều hướng",
      mobileLangLabel: "Ngôn ngữ",
      mainNavAria: "Điều hướng chính",
      mobileNavAria: "Điều hướng di động",
      logoHomeAria: "BIZWORK-IT — Về trang chủ",
    },
    footer: {
      tagline: "Chúng tôi giúp công nghệ trở nên dễ tiếp cận!",
      slogan:
        "Cung cấp các giải pháp công nghệ dễ tiếp cận, chuyên nghiệp và đáng tin cậy, phù hợp với nhu cầu riêng của doanh nghiệp bạn.",
      navTitle: "Điều hướng",
      contactTitle: "Liên hệ",
      servicesTitle: "Dịch vụ Cốt lõi",
      rights: "Bảo lưu mọi quyền.",
      regNo: "Mã số UEN: 202027202C",
    },
    meta: {
      title: "BIZWORK-IT — Hỗ trợ Công nghệ Chuyên nghiệp",
      description:
        "Dịch vụ hỗ trợ công nghệ, bảo trì hệ thống và giải pháp CNTT đáng tin cậy dành cho doanh nghiệp hiện đại.",
    },
  },
  home: {
    hero: {
      badge: "Doanh nghiệp Công nghệ Hiện đại",
      titleLine1: "Chúng tôi Giúp Công nghệ",
      titleLine2: "Trở nên Dễ Tiếp Cận",
      subtitle:
        "Hỗ trợ kỹ thuật đáng tin cậy, quản trị hệ thống và giải pháp CNTT phù hợp với nhu cầu đặc thù của doanh nghiệp—bất kể quy mô ngân sách.",
      ctaPrimary: "Khám phá Dịch vụ",
      ctaSecondary: "Liên hệ Ngay",
      stats: {
        stat1Value: "99.9%",
        stat1Label: "Độ tin cậy Hệ thống",
        stat2Value: "Linh hoạt",
        stat2Label: "Tối ưu Ngân sách",
        stat3Value: "100%",
        stat3Label: "Cam kết Hài lòng",
      },
      visual: {
        serverBadge: "Hạ tầng Quản lý",
        serverTitle: "Giám sát Hệ thống Liên tục",
        serverUptime: "Vận hành Ổn định 99.95%",
        badgeRoiTitle: "Cam kết ROI Cao",
        badgeRoiSub: "Tiết kiệm Ngân sách IT",
        badgeSatTitle: "Cam kết Hài lòng",
        badgeSatSub: "Dịch vụ Tận tâm",
        diagramAria: "Sơ đồ kiến trúc quản lý hạ tầng BIZWORK-IT",
        diagramCoreServer: "MÁY CHỦ CHÍNH",
        diagramMultiOs: "Đa nền tảng",
        diagramOsPlatforms: "Win / Linux",
        diagramNetworks: "Hệ thống mạng",
        diagramManagedLan: "Quản trị LAN",
        diagramDatabases: "Cơ sở dữ liệu",
        diagramMaintenance: "Bảo trì",
      },
    },
    valuePillars: {
      badge: "Cam kết của Chúng tôi",
      title: "Vì sao Doanh nghiệp Chọn BIZWORK-IT",
      subtitle:
        "Ba trụ cột nền tảng định hình cách chúng tôi mang lại sự hỗ trợ công nghệ đáng tin cậy mỗi ngày.",
      pillar1Title: "Khách hàng là Trung tâm",
      pillar1Desc:
        "Chúng tôi ưu tiên thấu hiểu nhu cầu cụ thể của doanh nghiệp và cung cấp giải pháp may đo phù hợp, không rập khuôn máy móc.",
      pillar2Title: "Tôn trọng Mọi Ngân sách",
      pillar2Desc:
        "Hỗ trợ công nghệ chất lượng không chỉ dành riêng cho tập đoàn lớn. Chúng tôi mang đến dịch vụ chuyên nghiệp, chuẩn mực cho mọi quy mô.",
      pillar3Title: "Đảm bảo Sự Hài lòng",
      pillar3Desc:
        "Chúng tôi cam kết đồng hành để bạn hoàn toàn an tâm với chất lượng dịch vụ, từ khâu tư vấn ban đầu đến suốt quá trình vận hành.",
    },
    serviceGrid: {
      badge: "Dịch vụ của Chúng tôi",
      title: "Giải pháp Công nghệ Toàn diện",
      subtitle:
        "Từ xử lý sự cố máy trạm đến quản trị toàn bộ hệ thống CNTT, khám phá cách chúng tôi giữ cho hoạt động kinh doanh luôn thông suốt.",
      service1: {
        title: "Hỗ trợ Kỹ thuật & Khắc phục Sự cố",
        desc: "Xử lý nhanh chóng, triệt để các lỗi phần cứng, phần mềm và trục trặc hệ thống thường nhật.",
        feature1: "Hỗ trợ chẩn đoán từ xa và xử lý tận nơi",
        feature2: "Cài đặt & cấu hình thiết bị phần cứng",
        feature3: "Cập nhật phần mềm & xử lý lỗi phát sinh",
        linkText: "Tìm hiểu thêm",
      },
      service2: {
        title: "Quản trị Hệ thống & Hạ tầng Mạng",
        desc: "Vận hành ổn định hệ thống mạng văn phòng, máy chủ và môi trường đa hệ điều hành.",
        feature1: "Quản trị máy chủ Windows & Linux",
        feature2: "Thiết lập mạng nội bộ LAN & Wi-Fi văn phòng",
        feature3: "Quản lý tài khoản & phân quyền truy cập",
        linkText: "Tìm hiểu thêm",
      },
      service3: {
        title: "Hỗ trợ & Bảo trì Cơ sở Dữ liệu",
        desc: "Duy trì tính toàn vẹn dữ liệu, kiểm tra sao lưu định kỳ và hỗ trợ vận hành cơ sở dữ liệu cơ bản.",
        feature1: "Kiểm tra định kỳ & duy trì hiệu năng DB",
        feature2: "Thiết lập quy trình sao lưu & xác thực phục hồi",
        feature3: "Hỗ trợ chuyển đổi & làm sạch dữ liệu",
        linkText: "Tìm hiểu thêm",
      },
      service4: {
        title: "IT Thuê ngoài cho Doanh nghiệp Nhỏ",
        desc: "Giải pháp thay thế tối ưu cho đội ngũ IT nội bộ, mang lại hiệu quả kinh tế cao cho SMBs.",
        feature1: "Hỗ trợ kỹ thuật chuyên trách liên tục",
        feature2: "Mô hình chi phí minh bạch, dự đoán trước",
        feature3: "Tư vấn định hướng công nghệ phù hợp",
        linkText: "Tìm hiểu thêm",
      },
    },
    quote: {
      tagline: "Chúng tôi giúp công nghệ trở nên dễ tiếp cận!",
      slogan:
        "Công nghệ phát huy giá trị lớn nhất khi mọi người đều có thể tiếp cận dễ dàng. Chúng tôi ở đây để biến điều đó thành hiện thực cho doanh nghiệp bạn.",
      cta: "Đặt lịch Trao đổi Ngay",
    },
  },
  about: {
    hero: {
      badge: "Về BIZWORK-IT",
      title: "Đối tác Công nghệ Tận tâm cho Doanh nghiệp Phát triển",
      subtitle:
        "Thành lập trên niềm tin rằng hỗ trợ công nghệ đáng tin cậy cần phải minh bạch, dễ tiếp cận và phù hợp với mọi hạn mức ngân sách.",
    },
    story: {
      badge: "Câu chuyện của Chúng tôi",
      title: "Khởi nguồn từ Giá trị Công nghệ Tiếp cận",
      paragraph1:
        "BIZWORKIT (S) PTE LTD được thành lập với tầm nhìn rõ ràng: thu hẹp khoảng cách giữa các giải pháp IT doanh nghiệp đắt đỏ và nhu cầu công nghệ thiết thực mỗi ngày của các tổ chức hiện đại.",
      paragraph2:
        "Chúng tôi nhận thấy nhiều doanh nghiệp vừa và nhỏ thường gặp hai thái cực: những gói dịch vụ tập đoàn quá tốn kém vượt ngân sách, hoặc những giải pháp chắp vá không giải quyết được tận gốc rễ vấn đề.",
      paragraph3:
        "BIZWORK-IT ra đời để tạo nên nhịp cầu cân bằng thiết yếu—mang đến dịch vụ hỗ trợ kỹ thuật chuyên nghiệp, bài bản, tôn trọng ngân sách mà vẫn bảo đảm tiêu chuẩn ổn định cao nhất.",
      milestone1Value: "Singapore",
      milestone1Label: "Trụ sở Đăng ký",
      milestone2Value: "100%",
      milestone2Label: "Cam kết Hỗ trợ Tiếp cận",
      milestone3Value: "Đa nền tảng",
      milestone3Label: "Chuyên môn Đa Hệ điều hành",
    },
    missionVision: {
      badge: "Mục đích & Định hướng",
      missionTitle: "Sứ mệnh của Chúng tôi",
      missionDesc:
        "Giúp hỗ trợ công nghệ chuyên nghiệp trở nên dễ tiếp cận với doanh nghiệp ở mọi quy mô, cung cấp các giải pháp ổn định, tôn trọng nhu cầu vận hành và ngân sách riêng của từng khách hàng.",
      visionTitle: "Tầm nhìn của Chúng tôi",
      visionDesc:
        "Trở thành người bạn đồng hành công nghệ đáng tin cậy, được các doanh nghiệp lựa chọn nhờ sự tư vấn trung thực, quản trị hạ tầng ổn định và cam kết hài lòng trọn vẹn.",
    },
    leadership: {
      badge: "Đội ngũ & Chuyên môn",
      title: "Nền tảng từ Kinh nghiệm Kỹ thuật Thực tiễn",
      subtitle:
        "Đội ngũ kỹ sư sở hữu kinh nghiệm thực tế sâu rộng về các hệ điều hành, quản trị mạng và quy trình làm việc CNTT hiện đại.",
      teamRole: "Chuyên viên Hỗ trợ Kỹ thuật",
      teamDesc:
        "Tận tâm đơn giản hóa các thách thức kỹ thuật phức tạp và xây dựng hệ thống CNTT gọn gàng, ổn định lâu dài cho khách hàng.",
    },
    valueCommitment: {
      badge: "Giá trị Cốt lõi",
      title: "Nguyên tắc Dẫn lối Hành động",
      subtitle:
        "Mỗi tương tác tại BIZWORK-IT đều được định hướng bởi sự chính trực, giải pháp thực tế và mong muốn khách hàng thành công bền vững.",
      val1Title: "Minh bạch Tuyệt đối",
      val1Desc:
        "Rõ ràng về tiến độ, chi phí và hiện trạng kỹ thuật. Tuyệt đối không chi phí ẩn hay đề xuất mập mờ.",
      val2Title: "Giải pháp Thiết thực",
      val2Desc:
        "Chúng tôi chỉ đề xuất những gì doanh nghiệp thực sự cần—không phức tạp hóa công nghệ vượt quá quy mô thực tế.",
      val3Title: "Độ tin cậy Lâu dài",
      val3Desc:
        "Hướng tới mối quan hệ hợp tác bền chặt, đồng hành hỗ trợ hệ thống ổn định trong từng giai đoạn mở rộng kinh doanh.",
    },
    credentials: {
      badge: "Hồ sơ Pháp lý Doanh nghiệp",
      title: "Pháp nhân Đăng ký Hợp pháp tại Singapore",
      companyName: "BIZWORKIT (S) PTE LTD",
      companyReg: "Cơ quan Quản lý Kế toán & Doanh nghiệp Singapore (ACRA)",
      uenLabel: "Mã số Doanh nghiệp Độc nhất (UEN)",
      uenValue: "202027202C",
      countryLabel: "Quốc gia Đăng ký",
      countryValue: "Singapore",
      statusLabel: "Tình trạng Pháp nhân",
      statusValue: "Đang hoạt động (Live Company)",
    },
  },
  services: {
    hero: {
      badge: "Dịch vụ của Chúng tôi",
      title: "Giải pháp IT Dễ Tiếp cận, Vận hành Ổn định",
      subtitle:
        "Dù bạn cần khắc phục sự cố tức thời hay thuê ngoài toàn bộ dịch vụ IT, chúng tôi luôn sẵn sàng mang lại giải pháp thực tế, tối ưu cho hoạt động kinh doanh.",
    },
    service1: {
      badge: "Dịch vụ Cốt lõi 01",
      title: "Hỗ trợ Kỹ thuật & Khắc phục Sự cố",
      tagline: "Xử lý nhanh chóng, thực tế khi hệ thống gặp trục trặc.",
      description:
        "Gián đoạn kỹ thuật ảnh hưởng trực tiếp đến năng suất làm việc. Dịch vụ hỗ trợ kỹ thuật của chúng tôi giúp chẩn đoán và khắc phục nhanh các sự cố máy trạm, phần mềm và thiết bị ngoại vi.",
      deliverablesTitle: "Hạng mục Cung cấp:",
      deliverables: [
        "Cài đặt, cấu hình máy trạm và tiếp nhận thiết bị cho nhân sự mới",
        "Xử lý sự cố hệ điều hành (Windows 10/11 và các bản phân phối Linux)",
        "Kết nối thiết bị ngoại vi (máy in, máy quét, thiết bị chuyên dụng văn phòng)",
        "Cập nhật bản vá định kỳ và tinh chỉnh tối ưu hiệu năng máy",
        "Hỗ trợ từ xa nhanh chóng và kiểm tra định kỳ tận nơi",
      ],
      idealForTitle: "Phù hợp nhất với:",
      idealFor:
        "Các doanh nghiệp cần đội ngũ hỗ trợ kỹ thuật hằng ngày ổn định mà không phải tuyển nhân sự IT toàn thời gian.",
      ctaText: "Trao đổi về Hỗ trợ Kỹ thuật",
    },
    service2: {
      badge: "Dịch vụ Cốt lõi 02",
      title: "Quản trị Hạ tầng & Hệ thống Mạng",
      tagline: "Kết nối lực lượng làm việc an toàn, liền mạch và thông suốt.",
      description:
        "Mạng văn phòng ổn định là xương sống của mọi hoạt động. Chúng tôi cấu hình, tối ưu và bảo trì hệ thống mạng cục bộ, router, điểm truy cập Wi-Fi và máy chủ nội bộ.",
      deliverablesTitle: "Hạng mục Cung cấp:",
      deliverables: [
        "Khảo sát, thiết kế mạng LAN, Wi-Fi văn phòng và xử lý vùng sóng yếu",
        "Cấu hình router, switch với phân tách an ninh mạng căn bản",
        "Thiết lập máy chủ Windows Server và Linux, phân quyền thư mục người dùng",
        "Cấu hình mạng riêng ảo (VPN) an toàn cho nhân sự làm việc từ xa",
        "Theo dõi kết nối mạng và chủ động phát hiện sớm điểm nghẽn lưu lượng",
      ],
      idealForTitle: "Phù hợp nhất với:",
      idealFor:
        "Văn phòng thường xuyên bị chập chờn mạng, nghẽn băng thông hoặc đang mở rộng thêm mặt bằng làm việc.",
      ctaText: "Trao đổi về Giải pháp Mạng",
    },
    service3: {
      badge: "Dịch vụ Cốt lõi 03",
      title: "Bảo dưỡng & Duy trì Cơ sở Dữ liệu",
      tagline: "Bảo vệ tính toàn vẹn và duy trì dòng chảy dữ liệu kinh doanh.",
      description:
        "Dữ liệu là tài sản cốt lõi. Chúng tôi đảm nhận công tác bảo trì cơ sở dữ liệu định kỳ, thiết lập quy trình sao lưu tự động và kiểm tra tính toàn vẹn thông tin doanh nghiệp.",
      deliverablesTitle: "Hạng mục Cung cấp:",
      deliverables: [
        "Đánh giá sức khỏe cơ sở dữ liệu và tinh chỉnh hiệu năng truy vấn cơ bản",
        "Cấu hình lịch sao lưu tự động và định kỳ diễn tập khôi phục thử nghiệm",
        "Rà soát dữ liệu định kỳ nhằm phòng ngừa lỗi phân mảnh hoặc hỏng tệp",
        "Hỗ trợ các nền tảng dữ liệu vừa và nhỏ (SQL Server, MySQL, PostgreSQL)",
        "Hỗ trợ di chuyển dữ liệu an toàn khi nâng cấp phiên bản ứng dụng",
      ],
      idealForTitle: "Phù hợp nhất với:",
      idealFor:
        "Doanh nghiệp vận hành phần mềm quản lý nội bộ cần chăm sóc cơ sở dữ liệu bài bản mà không cần thuê DBA chuyên trách.",
      ctaText: "Trao đổi về Bảo trì Dữ liệu",
    },
    service4: {
      badge: "Dịch vụ Cốt lõi 04",
      title: "IT Thuê ngoài cho Doanh nghiệp Nhỏ",
      tagline: "Mô hình quản trị công nghệ High-ROI, tối ưu ngân sách SMBs.",
      description:
        "Duy trì một phòng ban IT nội bộ tốn kém nhiều chi phí cố định. Mô hình thuê ngoài của chúng tôi mang đến trọn vẹn năng lực IT chuyên nghiệp với mức chi phí linh hoạt, tiết kiệm vượt trội.",
      deliverablesTitle: "Hạng mục Cung cấp:",
      deliverables: [
        "Đầu mối tiếp nhận và giải quyết toàn bộ yêu cầu kỹ thuật của nhân viên",
        "Kiểm tra định kỳ sức khỏe hệ thống và cập nhật bản vá bảo mật",
        "Quản lý danh mục tài sản phần cứng và tư vấn vòng đời thiết bị",
        "Phối hợp với các nhà cung cấp dịch vụ công nghệ và rà soát bản quyền",
        "Định kỳ tổng kết công nghệ để bám sát tốc độ phát triển kinh doanh",
      ],
      idealForTitle: "Phù hợp nhất với:",
      idealFor:
        "Các doanh nghiệp vừa và nhỏ cần giải pháp quản trị IT toàn diện, chuyên nghiệp với tỷ suất hoàn vốn đầu tư (ROI) cao nhất.",
      ctaText: "Trao đổi về IT Thuê ngoài",
    },
    comparison: {
      badge: "So sánh Hiệu quả",
      title: "IT Nội bộ và IT Thuê ngoài BIZWORK-IT",
      subtitle:
        "Xem xét các lợi thế vận hành thực tế và bài toán ngân sách khi đồng hành cùng BIZWORK-IT.",
      inHouseTitle: "Nhân sự IT Nội bộ Toàn thời gian",
      inHouseCost: "Lương cố định hằng tháng cao, chi phí phúc lợi, bảo hiểm và đào tạo.",
      inHouseCoverage: "Bị giới hạn khi nhân sự nghỉ ốm, nghỉ phép hoặc ngoài giờ làm việc.",
      inHouseScope: "Kỹ năng thường chỉ chuyên sâu ở một lĩnh vực hẹp của cá nhân đó.",
      bizworkTitle: "IT Thuê ngoài BIZWORK-IT",
      bizworkCost: "Chi phí linh hoạt, dự toán trước, bám sát quy mô thực tế sử dụng.",
      bizworkCoverage: "Hỗ trợ ổn định, xuyên suốt thông qua quy trình tiếp nhận chuẩn mực.",
      bizworkScope: "Kinh nghiệm đa dạng từ hệ điều hành, mạng văn phòng đến dữ liệu SMBs.",
    },
    deliveryWorkflow: {
      badge: "Quy trình Hỗ trợ",
      title: "Cách Chúng tôi Đồng hành Cùng Bạn",
      subtitle:
        "Quy trình bốn bước tinh gọn giúp xử lý sự cố nhanh chóng và phòng ngừa tái diễn về sau.",
      step1Title: "1. Khảo sát & Đánh giá",
      step1Desc:
        "Khảo sát hiện trạng hệ thống máy móc, lắng nghe khó khăn của người dùng và nhận diện các điểm yếu hạ tầng.",
      step2Title: "2. Đề xuất May đo",
      step2Desc:
        "Xây dựng phương án phù hợp đúng ngân sách—nêu rõ từng hạng mục công việc, thời gian và chi phí cụ thể.",
      step3Title: "3. Triển khai & Ổn định",
      step3Desc:
        "Cài đặt, cấu hình hệ thống và trực tiếp kiểm thử thực tế để đảm bảo vận hành mượt mà, không gián đoạn.",
      step4Title: "4. Bảo dưỡng & Đồng hành",
      step4Desc:
        "Duy trì kiểm tra định kỳ, cập nhật bản vá và luôn sẵn sàng hỗ trợ bất cứ khi nào đội ngũ của bạn cần trợ giúp.",
    },
    serviceCta: {
      tagline: "Chúng tôi giúp công nghệ trở nên dễ tiếp cận!",
      title: "Sẵn sàng Đơn giản hóa Công nghệ Nơi Làm việc?",
      subtitle:
        "Liên hệ ngay hôm nay để cùng thảo luận cách dịch vụ công nghệ dễ tiếp cận của chúng tôi hỗ trợ mục tiêu kinh doanh của bạn.",
      buttonText: "Đặt lịch Tư vấn",
    },
  },
  contact: {
    hero: {
      badge: "Kết nối Ngay",
      title: "Cùng Thảo luận về Nhu cầu Công nghệ của Bạn",
      subtitle:
        "Bạn có câu hỏi kỹ thuật, cần hỗ trợ xử lý sự cố gấp hay muốn tìm hiểu gói IT thuê ngoài? Chúng tôi luôn sẵn lòng lắng nghe và đồng hành.",
    },
    contactInfo: {
      badge: "Thông tin Kết nối",
      title: "Cách Liên hệ với BIZWORK-IT",
      subtitle:
        "Kết nối với chúng tôi qua email, điện thoại hoặc biểu mẫu yêu cầu tư vấn. Chúng tôi phản hồi nhanh chóng mọi thắc mắc của doanh nghiệp.",
      addressTitle: "Trụ sở Đăng ký",
      addressLine1: "BIZWORKIT (S) PTE LTD",
      addressLine2: "Singapore",
      addressNote: "Hân hạnh đón tiếp theo lịch hẹn trước",
      emailTitle: "Gửi Email",
      emailAddress: "contact@bizwork-it.com",
      emailNote: "Phản hồi trong vòng 1 ngày làm việc",
      phoneTitle: "Gọi Điện thoại",
      phoneNumber: "+65 6789 0123",
      phoneNote: "Thứ Hai - Thứ Sáu, 9:00 - 18:00 (SGT)",
      regTitle: "Thông tin Doanh nghiệp",
      regUen: "Mã số UEN: 202027202C",
      regAuthority: "ACRA Singapore",
      badgePillarsTitle: "Cam kết Cốt lõi",
      badgePillarsDesc:
        "Khách hàng là Trung tâm • Tôn trọng Ngân sách • Cam kết Hài lòng",
      dim1Title: "Khách hàng là Trung tâm",
      dim1Desc:
        "Chúng tôi lắng nghe bối cảnh thực tế của doanh nghiệp để đề xuất giải pháp đúng nhu cầu, không áp đặt rập khuôn.",
      dim2Title: "Tôn trọng Mọi Ngân sách",
      dim2Desc:
        "Dù ngân sách ở quy mô nào, bạn đều nhận được sự chăm sóc tận tình, minh bạch và chuyên nghiệp như nhau.",
      dim3Title: "Đảm bảo Sự Hài lòng",
      dim3Desc:
        "Chúng tôi đồng hành đến khi vấn đề được giải quyết trọn vẹn và hệ thống của bạn vận hành hoàn toàn ổn định.",
    },
    technicalStrengths: {
      badge: "Năng lực Kỹ thuật Cốt lõi",
      title: "Năng lực Xây dựng cho Công nghệ SMBs Thực tế",
      subtitle:
        "Chúng tôi làm việc với hầu hết mọi công nghệ mà doanh nghiệp nhỏ thường gặp—ứng dụng kinh nghiệm thực tế để mang lại kết quả đáng tin cậy.",
      strength1: {
        badge: "Đa nền tảng",
        title: "Hệ điều hành",
        desc: "Am hiểu sâu sắc các hệ điều hành phổ biến trong môi trường làm việc, đảm bảo máy trạm và máy chủ vận hành trơn tru.",
        items: [
          "Môi trường Windows máy trạm (10, 11) và Windows Server",
          "Các bản phân phối Linux (Ubuntu, Debian, RHEL/CentOS)",
          "Cấu hình hệ thống, quản lý người dùng và bản vá bảo mật",
          "Chia sẻ tệp đa nền tảng và tương thích môi trường làm việc",
        ],
        link: "Tìm hiểu chi tiết các dịch vụ của chúng tôi →",
      },
      strength2: {
        badge: "Hạ tầng",
        title: "Hệ thống Mạng",
        desc: "Hệ thống mạng văn phòng ổn định giúp toàn đội ngũ kết nối an toàn với các dịch vụ internet và dữ liệu nội bộ.",
        items: [
          "Thiết lập mạng LAN văn phòng, Wi-Fi và tối ưu điểm truy cập",
          "Cấu hình switch, router và tường lửa cơ bản",
          "Khắc phục sự cố nghẽn mạng, xung đột IP và gián đoạn kết nối",
          "Cấu hình truy cập từ xa an toàn cho nhân sự làm việc linh hoạt",
        ],
        link: "Tìm hiểu chi tiết các dịch vụ của chúng tôi →",
      },
      strength3: {
        badge: "Độ tin cậy Dữ liệu",
        title: "Hỗ trợ Cơ sở Dữ liệu",
        desc: "Hỗ trợ các hệ thống cơ sở dữ liệu doanh nghiệp nhằm duy trì tính nhất quán, tốc độ truy cập và độ sẵn sàng sao lưu.",
        items: [
          "Bảo trì và kiểm tra định kỳ cơ sở dữ liệu quan hệ",
          "Kiểm tra tính nhất quán dữ liệu cho các ứng dụng SMBs",
          "Thiết lập quy trình sao lưu tự động và phục hồi sẵn sàng",
          "Hỗ trợ các dự án vừa và nhỏ duy trì kho dữ liệu ổn định",
        ],
        link: "Tìm hiểu chi tiết các dịch vụ của chúng tôi →",
      },
    },
    partnershipCta: {
      pill: "Cùng nhau Đồng hành",
      title: "Sẵn sàng Hợp tác cùng BIZWORK-IT?",
      tagline: "Chúng tôi giúp công nghệ trở nên dễ tiếp cận!",
      description:
        "Trải nghiệm sự khác biệt từ một đối tác công nghệ tận tâm, thấu hiểu bài toán kinh doanh, tôn trọng ngân sách và cam kết chất lượng phục vụ.",
      ctaPrimary: "Liên hệ với Chúng tôi",
      ctaSecondary: "Khám phá Dịch vụ",
      assurance:
        "BIZWORKIT (S) PTE LTD • Singapore • Dịch vụ Hỗ trợ Công nghệ Chuyên nghiệp",
    },
    contactForm: {
      badge: "Biểu mẫu Yêu cầu",
      title: "Đăng ký Tư vấn Công nghệ",
      subtitle:
        "Điền thông tin vào biểu mẫu bên dưới và chúng tôi sẽ đánh giá hiện trạng để đề xuất các bước triển khai phù hợp.",
      labelFullName: "Họ và Tên",
      labelEmail: "Email Doanh nghiệp",
      labelCompany: "Tên Công ty",
      labelCompanyOptional: "(Tùy chọn)",
      labelService: "Dịch vụ Quan tâm",
      labelMessage: "Chúng tôi có thể Hỗ trợ gì cho Bạn?",
      placeholderName: "ví dụ: Nguyễn Văn A",
      placeholderEmail: "ví dụ: alex@company.com",
      placeholderCompany: "ví dụ: Công ty TNHH Vận tải ABC",
      placeholderMessage:
        "Mô tả về hệ điều hành nơi làm việc, thiết lập mạng văn phòng hoặc những khó khăn bảo trì hiện tại của bạn...",
      serviceOpt1: "Hỗ trợ Kỹ thuật & Hạ tầng",
      serviceOpt2: "Quản trị IT Thuê ngoài (High ROI)",
      serviceOpt3: "Tư vấn Công nghệ Chung",
      errorRequiredName: "Vui lòng nhập họ và tên của bạn.",
      errorNameLength: "Họ và tên phải có ít nhất 2 ký tự.",
      errorRequiredEmail: "Vui lòng nhập email doanh nghiệp của bạn.",
      errorEmailFormat:
        "Vui lòng nhập địa chỉ email hợp lệ (ví dụ: name@company.com).",
      errorRequiredMessage: "Vui lòng mô tả yêu cầu công nghệ của bạn.",
      errorMessageLength: "Nội dung tin nhắn phải có ít nhất 10 ký tự.",
      bannerSuccessTitle: "Kiểm tra Tính hợp lệ Thành công (Client Demo)",
      bannerSuccessDesc:
        "Toàn bộ các trường dữ liệu đã vượt qua bước kiểm tra định dạng nghiêm ngặt (Họ tên, cấu trúc Email hợp lệ, danh mục dịch vụ đã chọn và độ dài tin nhắn).",
      bannerPendingTitle: "Thông báo: Bản Thử Nghiệm Kiểm Tra Phía Client",
      bannerPendingDesc:
        "Biểu mẫu này hiện chỉ thực hiện kiểm tra tính hợp lệ của dữ liệu ở phía giao diện (client-side). Chức năng gửi email trực tiếp và lưu trữ cơ sở dữ liệu đang chờ tích hợp backend ở giai đoạn sau. Không có dữ liệu khách hàng nào được lưu trữ hoặc truyền qua mạng.",
      buttonReset: "Đặt lại Biểu mẫu để Thử lại",
      privacyNotice:
        "Biểu mẫu hiện chỉ kiểm tra tính hợp lệ của thông tin ngay trên trình duyệt. Không có thông tin nào được gửi đến hoặc lưu trữ bởi BIZWORK-IT. Chức năng gửi email và lưu trữ dữ liệu an toàn sẽ được triển khai sau khi tích hợp backend.",
      buttonSubmit: "Kiểm tra & Gửi Yêu cầu",
      buttonSubmitDemo: "(Bản thử nghiệm Client)",
      buttonValidating: "Đang kiểm tra...",
      messageHint: "Yêu cầu tối thiểu 10 ký tự",
      footerAssurance: "Cam kết Hài lòng Tuyệt đối • May đo cho SMBs",
    },
    whatHappensNext: {
      badge: "Quy trình Tư vấn",
      title: "Điều gì Xảy ra Sau khi Bạn Liên hệ?",
      subtitle:
        "Khung làm việc khám phá nhu cầu minh bạch, bài bản giúp chúng tôi hiểu tường tận bài toán công nghệ của bạn trước khi đưa ra đề xuất tối ưu.",
      footerNote: "Được may đo riêng cho các doanh nghiệp SMBs tại Singapore",
      step1: {
        title: "Đánh giá Yêu cầu",
        subtitle: "Nắm bắt hiện trạng hệ thống",
        description:
          "Đội ngũ kỹ thuật xem xét bối cảnh yêu cầu của bạn, bao gồm các hệ điều hành đang dùng, kết nối văn phòng và điểm nghẽn kỹ thuật trước mắt.",
      },
      step2: {
        title: "Trao đổi Khám phá",
        subtitle: "Thống nhất mục tiêu & ngân sách",
        description:
          "Buổi trao đổi sơ bộ nhằm làm rõ nhu cầu vận hành thực tế hằng ngày, đánh giá khó khăn phần cứng/phần mềm và tôn trọng hạn mức ngân sách của bạn.",
      },
      step3: {
        title: "Đề xuất May đo",
        subtitle: "Phạm vi thực tế, đúng ngân sách",
        description:
          "Chúng tôi gửi đề xuất rõ ràng, tập trung vào các giải pháp thiết thực—tuyệt đối không đề xuất dịch vụ dư thừa vượt nhu cầu thực tế.",
      },
      step4: {
        title: "Triển khai & Chăm sóc",
        subtitle: "Cam kết chất lượng & ổn định",
        description:
          "Khi hai bên thống nhất, chúng tôi tiến hành cấu hình, vận hành và duy trì hệ thống với tinh thần tận tâm và hỗ trợ kỹ thuật liên tục.",
      },
    },
    faq: {
      badge: "Câu hỏi Thường gặp",
      title: "Bạn có Thắc mắc? Chúng tôi sẵn sàng Giải đáp",
      subtitle:
        "Xem nhanh các giải đáp cho những câu hỏi thường gặp về dịch vụ, phương thức hợp tác và năng lực công nghệ.",
      q1: "BIZWORK-IT chủ yếu hỗ trợ quy mô doanh nghiệp nào?",
      a1: "Chúng tôi chuyên hỗ trợ các doanh nghiệp vừa và nhỏ (SMBs), startup đang phát triển và các văn phòng cần định hướng công nghệ chuyên nghiệp mà không phải tốn chi phí nuôi phòng ban IT nội bộ.",
      q2: "BIZWORK-IT có hỗ trợ môi trường kết hợp cả Windows và Linux không?",
      a2: "Có. Đội ngũ của chúng tôi có kinh nghiệm thực chiến sâu rộng trên cả hệ thống Windows máy trạm (10/11), Windows Server cũng như các bản phân phối Linux phổ biến (Ubuntu, Debian, CentOS/RHEL).",
      q3: "Chính sách giá của BIZWORK-IT tối ưu cho ngân sách SMBs ra sao?",
      a3: "Chúng tôi cung cấp các gói chi phí minh bạch, dự toán trước bám sát quy mô thực tế sử dụng. Chúng tôi không áp đặt hợp đồng tập đoàn cồng kềnh hay đề xuất mua sắm phần mềm/phần cứng dư thừa.",
      q4: "Chính sách Cam kết Hài lòng được áp dụng như thế nào?",
      a4: "Chúng tôi đứng vững sau chất lượng dịch vụ của mình. Nếu giải pháp hoặc buổi hỗ trợ chưa xử lý triệt để vấn đề kỹ thuật đã cam kết, chúng tôi tiếp tục làm việc mà không thu thêm phí đến khi hệ thống ổn định hoàn toàn.",
    },
    corporateCard: {
      badge: "Pháp nhân Doanh nghiệp Đã xác minh",
      tagline: "Chúng tôi giúp công nghệ trở nên dễ tiếp cận!",
      title: "BIZWORKIT (S) PTE LTD",
      subtitle:
        "Pháp nhân công nghệ đăng ký hợp pháp tại Singapore, chuyên cung cấp các dịch vụ IT dễ tiếp cận, tối ưu ngân sách cho doanh nghiệp hiện đại.",
      badge1: "Cam kết Hài lòng 100%",
      badge2: "Đăng ký ACRA: 202027202C",
      badge3: "Hỗ trợ Đa Hệ điều hành & Hạ tầng",
      addressTitle: "Trụ sở Đăng ký:",
      address: "Singapore",
      emailTitle: "Email Liên hệ:",
      phoneTitle: "Đường dây Nóng:",
      availability: "Thứ Hai – Thứ Sáu, 9:00 – 18:00 SGT",
      assurance:
        "BIZWORKIT (S) PTE LTD • Singapore • Dịch vụ Hỗ trợ Công nghệ Chuyên nghiệp",
    },
  },
  notFound: {
    badge: "Lỗi 404",
    title: "Không Tìm Thấy Trang",
    description:
      "Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Vui lòng sử dụng thanh điều hướng hoặc quay về trang chủ.",
    buttonHome: "Về Trang Chủ",
    buttonContact: "Liên Hệ Hỗ Trợ",
  },
};
```

---

## 6. KẾT LUẬN & TRẠNG THÁI HIỆN TẠI

1. Toàn bộ 3 yêu cầu chỉnh sửa (FIX 19-A, FIX 19-B, FIX 19-C) đã được hoàn thành chính xác và triệt để.
2. Hệ thống đã vượt qua toàn bộ các bộ kiểm tra tự động:
   - TypeScript Strict Check: PASS
   - ESLint: PASS
   - Production Build: PASS (5/5 static pages)
   - Song ngữ Parity Check: PASS (362/362 keys)
3. Cấu trúc Git được bảo toàn nghiêm ngặt:
   - Không có file nào ngoài danh sách 3 file được cấp phép bị chỉnh sửa.
   - Không thực hiện commit, không tạo tag, không push, không deploy.
4. Trạng thái dự án: **DỪNG LẠI và chờ quyết định nghiệm thu cuối cùng của Project Owner**.
   - Trạng thái Task 19 trong `docs/TASK_TRACKER.md` tiếp tục được giữ nguyên ở mức `VERIFICATION — FINAL ACCEPTANCE PENDING`.
   - Tuyệt đối không bắt đầu Task 20.
