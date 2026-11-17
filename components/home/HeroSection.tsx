"use client";

import React from "react";
import { Container, Button } from "@/components/common";
import { TechVisual } from "./TechVisual";
import { useLanguage } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useLanguage();
  const hero = t.home.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      {/* Subtle background radial pattern */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.50),theme(colors.slate.50))] opacity-60"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Value Proposition & Dual CTAs */}
          <div className="lg:col-span-7">
            {/* Value Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-xs mb-6">
              <span
                className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"
                aria-hidden="true"
              />
              <span>{hero.badge}</span>
            </div>

            {/* Main H1 Title */}
            <h1
              id="hero-title"
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.12]"
            >
              {hero.title}
            </h1>

            {/* Sub-tagline */}
            <p className="mt-4 text-xl font-bold tracking-tight text-blue-600 sm:text-2xl">
              {hero.subtitle}
            </p>

            {/* Context Paragraph */}
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg max-w-2xl">
              {hero.description}
            </p>

            {/* Dual CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                {hero.ctaPrimary}
              </Button>
              <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
                {hero.ctaSecondary}
              </Button>
            </div>

            {/* Capability Tags */}
            <div className="mt-10 border-t border-slate-200/80 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {hero.competenciesTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                <span className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  {hero.tag1}
                </span>
                <span className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  {hero.tag2}
                </span>
                <span className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  {hero.tag3}
                </span>
                <span className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-xs">
                  {hero.tag4}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Tech Graphic Visual */}
          <div className="lg:col-span-5 lg:pl-4">
            <TechVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
