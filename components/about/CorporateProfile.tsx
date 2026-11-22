"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function CorporateProfile() {
  const { t } = useLanguage();
  const profile = t.about.corporateProfile;

  return (
    <section
      aria-labelledby="corporate-profile-title"
      className="py-16 sm:py-24 bg-white border-y border-slate-200/80"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Mission & Business Values */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
              {profile.badge}
            </span>
            <h2
              id="corporate-profile-title"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              {profile.title}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              <p>{profile.p1}</p>
              <p>{profile.p2}</p>
              <p>{profile.p3}</p>
            </div>

            {/* Core Operational Principles */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white text-[11px]">
                    ✓
                  </span>
                  {profile.principle1Title}
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {profile.principle1Desc}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white text-[11px]">
                    ✓
                  </span>
                  {profile.principle2Title}
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {profile.principle2Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Corporate Registration Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-7 sm:p-8 shadow-sm">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-slate-900">
                      {profile.cardTitle}
                    </p>
                    <p className="text-[11px] text-slate-500">{profile.cardSubtitle}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  {profile.cardVerifiedBadge}
                </span>
              </div>

              {/* Information Rows */}
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {profile.entityLabel}
                  </p>
                  <p className="mt-1 text-base font-extrabold text-slate-900">
                    BIZWORKIT (S) PTE LTD
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {profile.locationLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    Singapore
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {profile.scopeLabel}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {profile.scopeValue}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {profile.inquiriesLabel}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {profile.inquiriesValue}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-6 pt-5 border-t border-slate-200/80">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-50 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span>{profile.cardButton}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
