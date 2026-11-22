"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TypographicLogo } from "./TypographicLogo";
import { Button } from "./Button";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const navItems = [
    { label: t.common.header.nav.home, href: "/" },
    { label: t.common.header.nav.about, href: "/about" },
    { label: t.common.header.nav.services, href: "/services" },
    { label: t.common.header.nav.contact, href: "/contact" },
  ];

  // Close mobile menu during render when pathname changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Handle ESC key to close mobile menu
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling while menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <Container className="flex h-18 items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center shrink-0">
          <TypographicLogo size="md" ariaLabel={t.common.header.logoHomeAria} />
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label={t.common.header.mainNavAria}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 rounded-sm ${
                  active
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Utilities (Language switch & CTA) */}
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />

          <Button href="/contact" variant="primary" size="sm">
            {t.common.header.cta}
          </Button>
        </div>

        {/* Mobile Header Actions (Switcher on small screens + Hamburger) */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          <LanguageSwitcher size="sm" />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={
              mobileMenuOpen
                ? t.common.header.mobileMenuCloseAria
                : t.common.header.mobileMenuOpenAria
            }
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          ref={mobileMenuRef}
          className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-xl lg:hidden sm:px-6"
        >
          <nav aria-label={t.common.header.mobileNavAria} className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 py-2 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium text-slate-500">
                {t.common.header.mobileLangLabel}
              </span>
              <LanguageSwitcher size="sm" />
            </div>

            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.common.header.cta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
