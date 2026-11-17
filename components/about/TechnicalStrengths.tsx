"use client";

import React from "react";
import Link from "next/link";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function TechnicalStrengths() {
  const { t } = useLanguage();
  const data = t.about.technicalStrengths;

  const strengths = [
    {
      ...data.strength1,
      id: "os-support",
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
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      ),
    },
    {
      ...data.strength2,
      id: "network-support",
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
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"
          />
        </svg>
      ),
    },
    {
      ...data.strength3,
      id: "database-support",
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
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="technical-strengths-title"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/80"
    >
      <Container>
        <SectionHeader
          id="technical-strengths-title"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* 3 Columns Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {strengths.map((strength) => (
            <div
              key={strength.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-xs">
                    {strength.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {strength.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {strength.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {strength.desc}
                </p>

                {/* Checklist */}
                <div className="mt-6 border-t border-slate-200/60 pt-4">
                  <ul className="space-y-2 text-xs text-slate-700">
                    {strength.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link to Services */}
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
                >
                  <span>{strength.link}</span>
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
