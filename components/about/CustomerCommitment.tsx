"use client";

import React from "react";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function CustomerCommitment() {
  const { t } = useLanguage();
  const commitment = t.about.customerCommitment;

  const dimensions = [
    {
      num: "01",
      title: commitment.dim1Title,
      desc: commitment.dim1Desc,
      bg: "bg-blue-100 text-blue-700",
    },
    {
      num: "02",
      title: commitment.dim2Title,
      desc: commitment.dim2Desc,
      bg: "bg-sky-100 text-sky-700",
    },
    {
      num: "03",
      title: commitment.dim3Title,
      desc: commitment.dim3Desc,
      bg: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <section
      aria-labelledby="commitment-title"
      className="py-16 sm:py-24 bg-slate-50/50"
    >
      <Container>
        <SectionHeader
          id="commitment-title"
          badge={commitment.badge}
          title={commitment.title}
          subtitle={commitment.subtitle}
        />

        {/* Featured Commitment Hero Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 p-8 sm:p-12 lg:p-14 shadow-sm relative">
          {/* Subtle decorative shield icon background */}
          <div
            className="absolute top-4 right-4 text-blue-100/50 -z-0 pointer-events-none"
            aria-hidden="true"
          >
            <svg className="h-64 w-64" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Quote Mark & Official Source Statement */}
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
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
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold tracking-tight text-blue-800 uppercase">
                  {commitment.promiseTitle}
                </p>
                <p className="text-[11px] text-slate-500">
                  {commitment.promiseSubtitle}
                </p>
              </div>
            </div>

            {/* Verbatim Source Quote */}
            <blockquote className="text-lg font-medium leading-relaxed text-slate-800 sm:text-xl sm:leading-relaxed">
              &ldquo;{commitment.quote}&rdquo;
            </blockquote>

            <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              — {commitment.quoteAuthor}
            </p>
          </div>

          {/* 3 Value Dimensions Grid */}
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-6 border-t border-blue-200/70 pt-8 sm:grid-cols-3">
            {dimensions.map((dim) => (
              <div
                key={dim.num}
                className="rounded-xl bg-white/80 p-5 border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-900">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${dim.bg} text-xs`}>
                    {dim.num}
                  </span>
                  {dim.title}
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {dim.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
