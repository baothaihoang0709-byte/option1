"use client";

import React from "react";
import { Container, Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function ItOutsourcingSection() {
  const { t } = useLanguage();
  const data = t.services.itOutsourcing;

  const benefits = [
    {
      num: "01",
      title: data.b1Title,
      desc: data.b1Desc,
    },
    {
      num: "02",
      title: data.b2Title,
      desc: data.b2Desc,
    },
    {
      num: "03",
      title: data.b3Title,
      desc: data.b3Desc,
    },
    {
      num: "04",
      title: data.b4Title,
      desc: data.b4Desc,
    },
  ];

  return (
    <section
      id="it-outsourcing"
      aria-labelledby="it-outsourcing-heading"
      className="py-16 sm:py-24 bg-slate-50/60 scroll-mt-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Asymmetric Problem-Solution Narrative */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-inset ring-sky-700/10 mb-4">
              {data.badge}
            </span>
            <h2
              id="it-outsourcing-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              {data.title}
            </h2>
            <p className="mt-2 text-base font-bold text-sky-600 sm:text-lg">
              {data.tagline}
            </p>

            {/* Core Verbatim / Faithful Source Text */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <p className="text-sm font-medium leading-relaxed text-slate-800 italic">
                &ldquo;{data.quote}&rdquo;
              </p>
              <p className="mt-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                — {data.quoteAuthor}
              </p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              {data.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" variant="primary" size="md">
                {data.ctaPrimary}
              </Button>
              <Button href="/about" variant="secondary" size="md">
                {data.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Right Column: 4 Strategic Benefits Cards */}
          <div className="lg:col-span-5 space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.num}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:border-sky-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 font-bold text-sm shrink-0">
                    {benefit.num}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 pl-12">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
