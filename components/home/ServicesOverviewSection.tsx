"use client";

import React from "react";
import Link from "next/link";
import { Container, SectionHeader, Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function ServicesOverviewSection() {
  const { t } = useLanguage();
  const data = t.home.servicesOverview;

  const groups = [
    {
      ...data.group1,
      id: "technical-support",
      href: "/services",
    },
    {
      ...data.group2,
      id: "it-outsourcing",
      href: "/services",
    },
  ];

  return (
    <section
      aria-labelledby="services-overview-title"
      className="py-16 sm:py-24 bg-slate-50/60"
    >
      <Container>
        <SectionHeader
          id="services-overview-title"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* 2 Solution Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div>
                {/* Badge & Subtitle */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {group.badge}
                  </span>
                </div>

                {/* Group Title */}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-xs font-semibold text-slate-500">
                  {group.subtitle}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {group.description}
                </p>

                {/* Highlights checklist */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {data.highlightsTitle}
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={group.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
                >
                  <span>{group.linkText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Catalog Button */}
        <div className="mt-12 text-center">
          <Button href="/services" variant="secondary" size="md">
            <span>{data.catalogButton}</span>
            <span aria-hidden="true" className="ml-1.5">→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
