"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

interface LanguageSwitcherProps {
  className?: string;
  size?: "sm" | "md";
}

export function LanguageSwitcher({
  className = "",
  size = "sm",
}: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  const isSmall = size === "sm";

  return (
    <div
      role="group"
      aria-label={t.common.header.languageSwitcherAria}
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 select-none transition-colors ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`rounded-full font-semibold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
          isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
        } ${
          language === "en"
            ? "bg-white text-blue-600 shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-pressed={language === "vi"}
        className={`rounded-full font-semibold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
          isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
        } ${
          language === "vi"
            ? "bg-white text-blue-600 shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        VI
      </button>
    </div>
  );
}
