"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export function TechVisual() {
  const { t } = useLanguage();
  const visual = t.home.hero.visual;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none select-none">
      {/* Ambient background glow */}
      <div
        className="absolute -top-10 -right-10 -bottom-10 -left-10 bg-gradient-to-tr from-blue-600/15 to-sky-400/20 blur-2xl rounded-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Glassmorphic System Architecture Card */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-blue-900/5 backdrop-blur-sm sm:p-7">
        {/* Card Header: Simulated System Monitor */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold tracking-tight text-slate-800 uppercase">
              {visual.statusTitle}
            </span>
          </div>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {visual.statusBadge}
          </span>
        </div>

        {/* SVG Network & System Topology Diagram */}
        <div className="my-6">
          <svg
            className="w-full h-auto max-h-[220px]"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={visual.diagramAria}
          >
            {/* Connecting lines */}
            <path
              d="M200 45 L90 145"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M200 45 L200 145"
              stroke="#2563EB"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <path
              d="M200 45 L310 145"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Central Main Node: Cloud & Server Hub */}
            <g transform="translate(160, 15)">
              <rect
                width="80"
                height="55"
                rx="12"
                fill="#0F172A"
                stroke="#2563EB"
                strokeWidth="2"
              />
              {/* Server rack slots */}
              <line x1="12" y1="20" x2="68" y2="20" stroke="#334155" strokeWidth="2" />
              <line x1="12" y1="32" x2="68" y2="32" stroke="#334155" strokeWidth="2" />
              <circle cx="20" cy="44" r="2.5" fill="#0EA5E9" />
              <circle cx="28" cy="44" r="2.5" fill="#22C55E" />
              <circle cx="36" cy="44" r="2.5" fill="#F59E0B" />
              <text
                x="40"
                y="14"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="8"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {visual.diagramCoreServer}
              </text>
            </g>

            {/* Satellite Node 1: OS / Systems */}
            <g transform="translate(50, 125)">
              <rect
                width="80"
                height="50"
                rx="10"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1.5"
                className="drop-shadow-xs"
              />
              <circle cx="24" cy="25" r="10" fill="#EFF6FF" />
              {/* OS / Platform Icon */}
              <path
                d="M19 22h10v6H19z"
                stroke="#2563EB"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <text
                x="42"
                y="22"
                fill="#0F172A"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {visual.diagramMultiOs}
              </text>
              <text
                x="42"
                y="33"
                fill="#64748B"
                fontSize="8"
                fontFamily="sans-serif"
              >
                {visual.diagramOsPlatforms}
              </text>
            </g>

            {/* Satellite Node 2: Network / Security */}
            <g transform="translate(160, 125)">
              <rect
                width="80"
                height="50"
                rx="10"
                fill="#FFFFFF"
                stroke="#93C5FD"
                strokeWidth="1.5"
                className="drop-shadow-xs"
              />
              <circle cx="24" cy="25" r="10" fill="#E0F2FE" />
              {/* Network / Firewall Icon */}
              <path
                d="M20 28l4-8 4 8M20 25h8"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x="42"
                y="22"
                fill="#0F172A"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {visual.diagramNetworks}
              </text>
              <text
                x="42"
                y="33"
                fill="#64748B"
                fontSize="8"
                fontFamily="sans-serif"
              >
                {visual.diagramManagedLan}
              </text>
            </g>

            {/* Satellite Node 3: Databases & Backup */}
            <g transform="translate(270, 125)">
              <rect
                width="80"
                height="50"
                rx="10"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1.5"
                className="drop-shadow-xs"
              />
              <circle cx="24" cy="25" r="10" fill="#F0FDF4" />
              {/* Database Cylinder Icon */}
              <path
                d="M20 20c0-1.5 2-2 4-2s4 .5 4 2v6c0 1.5-2 2-4 2s-4-.5-4-2v-6z"
                stroke="#16A34A"
                strokeWidth="1.5"
              />
              <text
                x="42"
                y="22"
                fill="#0F172A"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {visual.diagramDatabases}
              </text>
              <text
                x="42"
                y="33"
                fill="#64748B"
                fontSize="8"
                fontFamily="sans-serif"
              >
                {visual.diagramMaintenance}
              </text>
            </g>
          </svg>
        </div>

        {/* Real-time Status Metric Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
          <div className="rounded-lg bg-slate-50 px-2 py-2">
            <p className="text-[10px] font-medium text-slate-500">{visual.metric1Label}</p>
            <p className="mt-0.5 text-xs font-bold text-slate-900">{visual.metric1Value}</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-2 py-2">
            <p className="text-[10px] font-medium text-slate-500">{visual.metric2Label}</p>
            <p className="mt-0.5 text-xs font-bold text-blue-600">{visual.metric2Value}</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-2 py-2">
            <p className="text-[10px] font-medium text-slate-500">{visual.metric3Label}</p>
            <p className="mt-0.5 text-xs font-bold text-emerald-600">{visual.metric3Value}</p>
          </div>
        </div>
      </div>

      {/* Floating Accent Badge 1: High ROI (Bottom Right) */}
      <div className="hidden sm:flex absolute -bottom-5 -right-4 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg shadow-slate-900/5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
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
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">{visual.badgeRoiTitle}</p>
          <p className="text-[11px] text-slate-500">{visual.badgeRoiSub}</p>
        </div>
      </div>

      {/* Floating Accent Badge 2: Satisfaction Guaranteed (Top Left) */}
      <div className="hidden sm:flex absolute -top-4 -left-4 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-lg shadow-slate-900/5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
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
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">{visual.badgeSatTitle}</p>
          <p className="text-[10px] text-slate-500">{visual.badgeSatSub}</p>
        </div>
      </div>
    </div>
  );
}
