"use client";

import React from "react";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function WhatHappensNext() {
  const { t } = useLanguage();
  const data = t.contact.whatHappensNext;

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
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
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
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-.927 0-1.84-.044-2.738-.13a7.487 7.487 0 01-3.262-.977M9.75 16.5H6.75a3 3 0 01-3-3V6.75a3 3 0 013-3h10.5a3 3 0 013 3v2.25"
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
            d="M9 12.75L11.25 15 15 9.75m-2.182 7.082l-3.328 1.664a1.5 1.5 0 01-2.148-1.558l.635-3.705-2.69-2.623a1.5 1.5 0 01.831-2.56l3.72-.54 1.663-3.371a1.5 1.5 0 012.692 0l1.664 3.371 3.72.54a1.5 1.5 0 01.83 2.56l-2.69 2.623.636 3.705a1.5 1.5 0 01-2.149 1.558l-3.328-1.664z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="what-happens-next-heading"
      className="py-16 sm:py-24 bg-white"
    >
      <Container>
        <SectionHeader
          id="what-happens-next-heading"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* 3 Step Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-sm shadow-xs">
                    {step.number}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {step.subtitle}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Unified Consultation Note */}
        <div className="mt-12 text-center">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-600">
            {data.footerNote}
          </span>
        </div>
      </Container>
    </section>
  );
}
