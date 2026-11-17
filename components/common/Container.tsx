import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Semantic HTML element type to render.
   * Default: 'div'
   */
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
  /**
   * Inner content.
   */
  children: React.ReactNode;
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

export function Container({
  as: Component = "div",
  children,
  className = "",
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
