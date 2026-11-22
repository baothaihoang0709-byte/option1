"use client";

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { Language, TranslationDictionary } from "./types";
import { en } from "./dictionaries/en";
import { vi } from "./dictionaries/vi";

const STORAGE_KEY = "bizwork_lang";
const LANG_CHANGE_EVENT = "bizwork_lang_change";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const dictionaries: Record<Language, TranslationDictionary> = {
  en,
  vi,
};

const PAGE_TITLES: Record<Language, Record<string, string>> = {
  en: {
    "/": "BIZWORK-IT — Professional Technology Assistance",
    "/about": "About Us | BIZWORK-IT",
    "/services": "Services | BIZWORK-IT",
    "/contact": "Contact | BIZWORK-IT",
    "/404": "Page Not Found | BIZWORK-IT",
  },
  vi: {
    "/": "BIZWORK-IT — Hỗ trợ Công nghệ Chuyên nghiệp",
    "/about": "Về Chúng Tôi | BIZWORK-IT",
    "/services": "Dịch vụ | BIZWORK-IT",
    "/contact": "Liên hệ | BIZWORK-IT",
    "/404": "Không Tìm Thấy Trang | BIZWORK-IT",
  },
};

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === "undefined") {
    return "en";
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "vi" || saved === "en") {
      return saved;
    }
  } catch {
    // Restricted or unavailable localStorage
  }
  return "en";
}

function getServerSnapshot(): Language {
  return "en";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore safely reads from localStorage without triggering cascading renders
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();

  // Synchronize document title and documentElement.lang whenever language or route changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      const titles = PAGE_TITLES[language];
      const matchedTitle = titles[pathname] || titles["/404"];
      if (matchedTitle) {
        document.title = matchedTitle;
      }
    }
  }, [language, pathname]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
      }
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch {
      // Graceful fallback if localStorage is unavailable
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "vi" : "en");
  }, [language, setLanguage]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage,
    t: dictionaries[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
