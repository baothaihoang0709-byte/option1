import React from "react";

export interface SectionHeaderProps {
  /**
   * Optional category or status badge placed above the title.
   */
  badge?: string;
  /**
   * Primary section heading (h2).
   */
  title: string;
  /**
   * Supporting description paragraph.
   */
  subtitle?: string;
  /**
   * Horizontal alignment.
   * Default: 'center'
   */
  alignment?: "left" | "center";
  /**
   * Optional custom CSS classes.
   */
  className?: string;
  /**
   * Optional HTML id attribute.
   */
  id?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  alignment = "center",
  className = "",
  id,
}: SectionHeaderProps) {
  const isCenter = alignment === "center";

  return (
    <div
      id={id}
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
