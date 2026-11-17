"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";

interface FormState {
  fullName: string;
  email: string;
  company: string;
  serviceOfInterest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  serviceOfInterest?: string;
  message?: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  company: "",
  serviceOfInterest: "technical-support",
  message: "",
};

export function ContactForm() {
  const { t } = useLanguage();
  const formText = t.contact.contactForm;

  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validationSuccess, setValidationSuccess] = useState(false);

  const serviceOptions = [
    { value: "technical-support", label: formText.serviceOpt1 },
    { value: "it-outsourcing", label: formText.serviceOpt2 },
    { value: "general-inquiry", label: formText.serviceOpt3 },
  ];

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case "fullName":
        if (!value.trim()) {
          return formText.errorRequiredName;
        }
        if (value.trim().length < 2) {
          return formText.errorNameLength;
        }
        return undefined;
      case "email":
        if (!value.trim()) {
          return formText.errorRequiredEmail;
        }
        // Standard email format validation regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return formText.errorEmailFormat;
        }
        return undefined;
      case "message":
        if (!value.trim()) {
          return formText.errorRequiredMessage;
        }
        if (value.trim().length < 10) {
          return formText.errorMessageLength;
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setValidationSuccess(true);
    } else {
      setValidationSuccess(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setTouched({});
    setValidationSuccess(false);
  };

  return (
    <div
      id="contact-form"
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          {formText.badge}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {formText.title}
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
          {formText.subtitle}
        </p>
      </div>

      {/* Transparent Validation Confirmation Banner */}
      {validationSuccess ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-blue-200 bg-blue-50/80 p-6 text-slate-900 space-y-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5">
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
              <h3 className="text-sm font-bold text-blue-950">
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
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
            >
              {formText.buttonReset}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Row 1: Full Name & Business Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {formText.labelFullName} <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
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
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus-visible:ring-2 ${
                  errors.fullName
                    ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400 bg-red-50/20"
                    : "border-slate-300 focus:border-blue-600 focus-visible:ring-blue-600"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Business Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {formText.labelEmail} <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
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
                className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus-visible:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400 bg-red-50/20"
                    : "border-slate-300 focus:border-blue-600 focus-visible:ring-blue-600"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errors.email}</span>
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
                {formText.labelCompany} <span className="text-slate-400 font-normal">{formText.labelCompanyOptional}</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder={formText.placeholderCompany}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
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
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
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
              {formText.labelMessage} <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
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
              className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus-visible:ring-2 ${
                errors.message
                  ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400 bg-red-50/20"
                  : "border-slate-300 focus:border-blue-600 focus-visible:ring-blue-600"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                <span>⚠</span>
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Privacy & Scope Notice */}
          <div className="rounded-xl border border-slate-200/60 bg-slate-50/60 p-3.5 text-[11px] leading-relaxed text-slate-500">
            <p>{formText.privacyNotice}</p>
          </div>

          {/* Submit Action Area */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>{formText.buttonSubmit}</span>
              <span className="ml-2 text-xs font-normal text-blue-200">{formText.buttonSubmitDemo}</span>
            </button>

            <span className="text-xs text-slate-500 text-center sm:text-right">
              {formText.footerAssurance}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
