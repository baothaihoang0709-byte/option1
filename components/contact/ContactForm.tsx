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
