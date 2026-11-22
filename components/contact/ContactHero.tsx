"use client";

import React from "react";
import Link from "next/link";
import { Container, Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function ContactHero() {
  const { t } = useLanguage();
  const hero = t.contact.hero;

  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_35rem_at_top,theme(colors.blue.50),theme(colors.slate.50))] opacity-60"
        aria-hidden="true"
      />

      <Container>
        {/* Accessible Breadcrumb */}
        <nav aria-label={t.common.breadcrumbAria} className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
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
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-xs mb-5">
            <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
            <span>{hero.badge}</span>
          </div>

          {/* Single H1 Title */}
          <h1
            id="contact-hero-title"
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.15]"
          >
            {hero.title}
          </h1>

          {/* Sub-tagline & Verified Invitation */}
          <p className="mt-4 text-xl font-bold tracking-tight text-blue-600 sm:text-2xl">
            {hero.subtitle}
          </p>

          {/* Description */}
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {hero.description}
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#contact-form" variant="primary" size="lg" className="w-full sm:w-auto">
              {hero.ctaPrimary}
            </Button>
            <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
