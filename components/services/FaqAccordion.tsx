"use client";

import React, { useState } from "react";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function FaqAccordion() {
  const { t } = useLanguage();
  const data = t.services.faq;

  const faqs = [
    {
      id: "faq-small-business-fit",
      question: data.q1,
      answer: data.a1,
    },
    {
      id: "faq-os-support",
      question: data.q2,
      answer: data.a2,
    },
    {
      id: "faq-outsourcing-workflow",
      question: data.q3,
      answer: data.a3,
    },
    {
      id: "faq-scope-consultation",
      question: data.q4,
      answer: data.a4,
    },
  ];

  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "faq-small-business-fit": true, // First item open by default for immediate engagement
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 bg-slate-50/50"
    >
      <Container>
        <SectionHeader
          id="faq-heading"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
          {faqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            const buttonId = `faq-btn-${faq.id}`;
            const contentId = `faq-content-${faq.id}`;

            return (
              <div key={faq.id} className="py-4 first:pt-2 last:pb-2">
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="flex w-full items-start justify-between text-left text-sm sm:text-base font-bold text-slate-900 transition-colors hover:text-blue-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-1 px-1 cursor-pointer"
                >
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-transform duration-200">
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 pr-8 pl-1"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
