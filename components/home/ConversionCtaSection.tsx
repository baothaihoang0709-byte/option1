"use client";

import React from "react";
import { Container, Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function ConversionCtaSection() {
  const { t } = useLanguage();
  const data = t.home.conversionCta;

  return (
    <section aria-labelledby="cta-banner-title" className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* Subtle background ambient gradients */}
          <div
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            {/* Status / Category Pill */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-6">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"
                aria-hidden="true"
              />
              <span>{data.pill}</span>
            </span>

            {/* Headline */}
            <h2
              id="cta-banner-title"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {data.title}
            </h2>

            {/* Sub-tagline */}
            <p className="mt-3 text-lg font-bold text-sky-400">
              {data.tagline}
            </p>

            {/* Context description */}
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-w-[180px]"
              >
                {data.ctaPrimary}
              </Button>
              <Button
                href="/services"
                variant="secondary-dark"
                size="lg"
                className="w-full sm:w-auto min-w-[180px]"
              >
                {data.ctaSecondary}
              </Button>
            </div>

            {/* Assurance line */}
            <p className="mt-6 text-xs text-slate-400">
              {data.assurance}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
