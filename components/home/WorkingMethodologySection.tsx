"use client";

import React from "react";
import Link from "next/link";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function WorkingMethodologySection() {
  const { t } = useLanguage();
  const data = t.home.methodology;

  const steps = [
    {
      number: "01",
      ...data.step1,
      icon: (
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      ...data.step2,
      icon: (
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
            d="M9 12.75L11.25 15 15 9.75m-2.182 7.082l-3.328 1.664a1.5 1.5 0 01-2.148-1.558l.635-3.705-2.69-2.623a1.5 1.5 0 01.831-2.56l3.72-.54 1.663-3.371a1.5 1.5 0 012.692 0l1.664 3.371 3.72.54a1.5 1.5 0 01.83 2.56l-2.69 2.623.636 3.705a1.5 1.5 0 01-2.149 1.558l-3.328-1.664z"
          />
        </svg>
      ),
    },
    {
      number: "03",
      ...data.step3,
      icon: (
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
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.32l-3.276 3.277a3.004 3.004 0 01-2.25 2.25l-3.276-3.276a4.5 4.5 0 00-6.32 4.486c.048.58.072 1.193-.092 1.743"
          />
        </svg>
      ),
    },
    {
      number: "04",
      ...data.step4,
      icon: (
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
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="methodology-title"
      className="py-16 sm:py-24 bg-white border-t border-slate-200/80"
    >
      <Container>
        <SectionHeader
          id="methodology-title"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* 4 Steps Grid */}
        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Subtle horizontal line connecting steps on large screens */}
          <div
            className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-200 via-sky-200 to-blue-200 -z-0"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-blue-400/50 hover:shadow-md transition-all duration-300"
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-sm shadow-sm ring-4 ring-white">
                  {step.number}
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                  {step.icon}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                {step.subtitle}
              </p>

              {/* Description */}
              <p className="mt-3 text-xs leading-relaxed text-slate-600 flex-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Supporting Link */}
        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
          >
            <span>{data.supportLink}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
