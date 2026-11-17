"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export function SkipToContent() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
    >
      {t.common.skipToContent}
    </a>
  );
}
