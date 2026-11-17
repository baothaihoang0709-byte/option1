"use client";

import React from "react";
import Link from "next/link";
import { Container, Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function AboutHero() {
  const { t } = useLanguage();
  const hero = t.about.hero;

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_35rem_at_top,theme(colors.blue.50),theme(colors.slate.50))] opacity-60"
        aria-hidden="true"
      />

      <Container>
        {/* Accessible Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
          >
            {hero.breadcrumbHome}
          </Link>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-blue-600" aria-current="page">
            {hero.breadcrumbCurrent}
          </span>
        </nav>

        <div className="max-w-3xl">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-xs mb-5">
            <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
            <span>{hero.badge}</span>
          </div>

          {/* Single H1 Title */}
          <h1
            id="about-hero-title"
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.15]"
          >
            {hero.title}
          </h1>

          {/* Sub-tagline */}
          <p className="mt-4 text-xl font-bold tracking-tight text-blue-600 sm:text-2xl">
            {hero.tagline}
          </p>

          {/* Lead Paragraph */}
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {hero.description}
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              {hero.ctaPrimary}
            </Button>
            <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Fact Strip: Entity & Scope */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {hero.fact1Label}
            </p>
            <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">
              {hero.fact1Value}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {hero.fact2Label}
            </p>
            <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {hero.fact2Value}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {hero.fact3Label}
            </p>
            <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">
              {hero.fact3Value}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {hero.fact4Label}
            </p>
            <p className="mt-1 text-xs font-bold text-blue-600 sm:text-sm">
              {hero.fact4Value}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
