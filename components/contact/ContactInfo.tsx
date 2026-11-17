"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export function ContactInfo() {
  const { t } = useLanguage();
  const info = t.contact.contactInfo;

  return (
    <div className="space-y-6">
      {/* Verified Corporate Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold tracking-tight text-slate-900">
                {info.cardTitle}
              </p>
              <p className="text-[11px] text-slate-500">{info.cardSub}</p>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            {info.verifiedBadge}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {info.entityLabel}
            </p>
            <p className="mt-0.5 text-base font-extrabold text-slate-900">
              {info.entityName}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {info.locationLabel}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {info.locationValue}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {info.focusLabel}
            </p>
            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              {info.focusValue}
            </p>
          </div>
        </div>
      </div>

      {/* Verified Invitation & Status Transparency Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {info.inviteHeading}
          </h3>
        </div>

        <p className="text-xs leading-relaxed text-slate-600">
          {info.inviteText}
        </p>

        <div className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/70 p-3.5 text-xs leading-relaxed text-amber-900">
          <p className="font-semibold flex items-center gap-1.5 text-amber-800">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            {info.noticeTitle}
          </p>
          <p className="mt-1 text-[11px] text-amber-800/90 leading-normal">
            {info.noticeText}
          </p>
        </div>
      </div>

      {/* Service Assurance Card */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
          {info.commitmentTitle}
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
          {info.commitmentText}
        </p>
      </div>
    </div>
  );
}
