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
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 lg:p-0.5 select-none transition-colors ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`rounded-full font-semibold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 flex items-center justify-center ${
          isSmall
            ? "px-3 py-2 text-xs min-h-[44px] min-w-[44px] lg:min-h-[28px] lg:min-w-0 lg:px-2.5 lg:py-1"
            : "px-4 py-2 text-sm min-h-[44px] min-w-[44px]"
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
        className={`rounded-full font-semibold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 flex items-center justify-center ${
          isSmall
            ? "px-3 py-2 text-xs min-h-[44px] min-w-[44px] lg:min-h-[28px] lg:min-w-0 lg:px-2.5 lg:py-1"
            : "px-4 py-2 text-sm min-h-[44px] min-w-[44px]"
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
