"use client";

import React from "react";
import { Container, SectionHeader } from "@/components/common";
import { useLanguage } from "@/lib/i18n";

export function ValueComparisonSection() {
  const { t } = useLanguage();
  const data = t.services.valueComparison;

  const comparisonData = [
    {
      dimension: data.row1Dimension,
      inHouse: data.row1InHouse,
      outsourcing: data.row1Outsource,
      highlightNote: data.row1Badge,
    },
    {
      dimension: data.row2Dimension,
      inHouse: data.row2InHouse,
      outsourcing: data.row2Outsource,
      highlightNote: data.row2Badge,
    },
    {
      dimension: data.row3Dimension,
      inHouse: data.row3InHouse,
      outsourcing: data.row3Outsource,
      highlightNote: data.row3Badge,
    },
    {
      dimension: data.row4Dimension,
      inHouse: data.row4InHouse,
      outsourcing: data.row4Outsource,
      highlightNote: data.row4Badge,
    },
  ];

  return (
    <section
      aria-labelledby="comparison-heading"
      className="py-16 sm:py-24 bg-white border-y border-slate-200/80"
    >
      <Container>
        <SectionHeader
          id="comparison-heading"
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* Desktop / Tablet Table View (Hidden on mobile < 640px) */}
        <div className="mt-14 hidden sm:block overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                  {data.tableHeaderAspect}
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-600 uppercase tracking-wider w-3/8">
                  {data.tableHeaderInHouse}
                </th>
                <th className="py-4 px-6 text-xs font-bold text-blue-700 bg-blue-50/60 uppercase tracking-wider w-3/8 border-l border-blue-100">
                  {data.tableHeaderOutsource}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {comparisonData.map((row, index) => (
                <tr
                  key={row.dimension}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50/30"}
                >
                  <td className="py-5 px-6 align-top">
                    <p className="text-sm font-bold text-slate-900">
                      {row.dimension}
                    </p>
                    <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      {row.highlightNote}
                    </span>
                  </td>
                  <td className="py-5 px-6 align-top text-xs leading-relaxed text-slate-600">
                    {row.inHouse}
                  </td>
                  <td className="py-5 px-6 align-top text-xs leading-relaxed text-slate-800 bg-blue-50/20 border-l border-blue-100 font-medium">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold shrink-0">✓</span>
                      <span>{row.outsourcing}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Card View (Visible on mobile < 640px) */}
        <div className="mt-10 sm:hidden space-y-5">
          {comparisonData.map((row) => (
            <div
              key={row.dimension}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {row.dimension}
                </h3>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  {row.highlightNote}
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {data.tableHeaderInHouse}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {row.inHouse}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50/50 border border-blue-100 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    {data.tableHeaderOutsource}
                  </p>
                  <p className="mt-1 text-xs text-slate-800 font-medium leading-relaxed">
                    {row.outsourcing}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Objective Assessment Disclaimer Note */}
        <div className="mt-8 rounded-xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5 text-center">
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
            <strong>{data.disclaimerPrefix}</strong> {data.disclaimerText}
          </p>
        </div>
      </Container>
    </section>
  );
}
