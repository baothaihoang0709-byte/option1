import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "secondary-dark" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBaseProps {
  /**
   * Visual style variant.
   * Default: 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Sizing scale.
   * Default: 'md'
   */
  size?: ButtonSize;
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

export interface ButtonAsButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

export interface ButtonAsLinkProps
  extends ButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  external?: boolean;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md hover:shadow-blue-500/20 focus-visible:ring-blue-600",
  secondary:
    "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 active:bg-slate-100 active:border-slate-400 shadow-xs focus-visible:ring-blue-600",
  "secondary-dark":
    "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:text-white active:bg-slate-900 active:border-slate-500 shadow-sm focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
  outline:
    "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50/80 active:bg-blue-100 focus-visible:ring-blue-600",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 hover:text-slate-900 focus-visible:ring-blue-600",
  link:
    "bg-transparent text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline p-0 min-h-0 focus-visible:ring-blue-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs font-semibold rounded-lg min-h-[36px]",
  md: "px-5 py-2.5 text-sm font-semibold rounded-lg min-h-[44px]",
  lg: "px-6 py-3.5 text-base font-semibold rounded-xl min-h-[48px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

  const resolvedClasses = `${baseClasses} ${variantStyles[variant]} ${
    variant === "link" ? "" : sizeStyles[size]
  } ${className}`;

  if ("href" in props && typeof props.href === "string") {
    const { href, external, ...linkProps } = props as ButtonAsLinkProps;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={resolvedClasses}
          {...linkProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={resolvedClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  return (
    <button type={buttonProps.type ?? "button"} className={resolvedClasses} {...buttonProps}>
      {children}
    </button>
  );
}
