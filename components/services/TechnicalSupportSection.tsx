"use client";

import React from "react";
import Link from "next/link";
import { Container, SectionHeader, Button } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function TechnicalSupportSection() {
  const { t } = useLanguage();
  const data = t.services.techSupport;

  const domains = [
    {
      ...data.domain1,
      id: "operating-systems",
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
      ...data.domain2,
      id: "network-connectivity",
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
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
      ),
    },
    {
      ...data.domain3,
      id: "database-maintenance",
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
      id="technical-support"
      aria-labelledby="tech-support-heading"
      className="py-16 sm:py-24 bg-white border-y border-slate-200/80 scroll-mt-20"
    >
      <Container>
        <SectionHeader
          id="tech-support-heading"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* 3 Technical Groups Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-xs hover:border-blue-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-xs">
                    {domain.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {domain.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {domain.desc}
                </p>

                {/* Checklist */}
                <div className="mt-6 border-t border-slate-200/60 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    {data.scopeTitle}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {domain.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inquire Link */}
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
                >
                  <span>{domain.linkText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting CTA */}
        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">
              {data.bannerTitle}
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {data.bannerDesc}
            </p>
          </div>
          <Button href="/contact" variant="primary" size="md" className="shrink-0">
            {data.bannerButton}
          </Button>
        </div>
      </Container>
    </section>
  );
}
