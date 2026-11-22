"use client";

import React from "react";
import Link from "next/link";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function ValuePillarsSection() {
  const { t } = useLanguage();
  const data = t.home.valuePillars;

  const pillars = [
    {
      ...data.pillar1,
      id: "technical-experience",
      href: "/services",
      iconBg: "bg-blue-50 text-blue-600",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      ...data.pillar2,
      id: "high-roi",
      href: "/services",
      iconBg: "bg-sky-50 text-sky-600",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
          />
        </svg>
      ),
    },
    {
      ...data.pillar3,
      id: "satisfaction-guaranteed",
      href: "/about",
      iconBg: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="pillars-title"
      className="py-16 sm:py-24 bg-white border-y border-slate-200/80"
    >
      <Container>
        <SectionHeader
          id="pillars-title"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* 3 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div>
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${pillar.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-105`}
                  >
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                    {pillar.tag}
                  </span>
                </div>

                {/* Pillar Heading */}
                <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>

                {/* Pillar Body Text */}
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {pillar.body}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
                >
                  <span>{pillar.linkText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
