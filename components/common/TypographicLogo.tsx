import Link from "next/link";

export interface TypographicLogoProps {
  /**
   * When true, adapts colors for dark backgrounds (e.g. Footer).
   * Default: false
   */
  inverted?: boolean;
  /**
   * Size presets for the typographic logo.
   * Default: 'md'
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether to wrap the logo in a link pointing to Home ('/').
   * Default: true
   */
  withLink?: boolean;
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

export function TypographicLogo({
  inverted = false,
  size = "md",
  withLink = true,
  className = "",
}: TypographicLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  const dotSizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  }[size];

  const textColorBizwork = inverted ? "text-white" : "text-slate-900";
  const textColorIt = inverted ? "text-blue-400" : "text-blue-600";

  const content = (
    <span
      className={`inline-flex items-center gap-1 font-extrabold tracking-tight select-none ${sizeClasses} ${className}`}
    >
      <span className={textColorBizwork}>BIZWORK</span>
      <span className={textColorIt}>-IT</span>
      <span
        className={`relative inline-flex ${dotSizeClasses} rounded-full bg-sky-500`}
        aria-hidden="true"
      >
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60`}
        />
      </span>
    </span>
  );

  if (withLink) {
    return (
      <Link
        href="/"
        aria-label="BIZWORK-IT — Return to Home"
        className="inline-flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-opacity hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return content;
}
