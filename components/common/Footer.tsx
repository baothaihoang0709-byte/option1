"use client";

import React from "react";
import Link from "next/link";
import { TypographicLogo } from "./TypographicLogo";
import { Container } from "./Container";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const navLinks = [
    { label: t.common.header.nav.home, href: "/" },
    { label: t.common.header.nav.about, href: "/about" },
    { label: t.common.header.nav.services, href: "/services" },
    { label: t.common.header.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Verified Tagline */}
          <div className="space-y-4">
            <TypographicLogo inverted size="md" />
            <p className="text-sm font-semibold text-sky-400">
              {t.common.footer.tagline}
            </p>
            <p className="text-xs leading-relaxed text-slate-400">
              {t.common.footer.subtitle}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              {t.common.footer.navHeading}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Corporate Info */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              {t.common.footer.corporateHeading}
            </h3>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p className="font-semibold text-slate-200">
                BIZWORKIT (S) PTE LTD
              </p>
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                {t.common.footer.registeredInSingapore}
              </p>
              <p className="text-xs text-slate-500 pt-1">
                {t.common.footer.corporateDesc}
              </p>
            </div>
          </div>

          {/* Column 4: Contact & Inquiries */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              {t.common.footer.inquiriesHeading}
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p className="text-xs text-slate-400">
                {t.common.footer.inquiriesDesc}
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                >
                  <span>{t.common.footer.inquiriesLink}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <p className="text-[11px] text-slate-500">
                {t.common.footer.inquiriesNote}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} {t.common.footer.copyright}</p>
          <p className="text-[11px] text-slate-500">
            {t.common.footer.entityLine}
          </p>
        </div>
      </Container>
    </footer>
  );
}
