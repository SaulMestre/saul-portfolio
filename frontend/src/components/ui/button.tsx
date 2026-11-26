import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const actionVariants = ["primary", "secondary", "outline", "ghost", "destructive"] as const;
export const actionSizes = ["sm", "md", "lg"] as const;

export type ActionVariant = (typeof actionVariants)[number];
export type ActionSize = (typeof actionSizes)[number];

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "className" | "style" | "children"> & {
  variant?: ActionVariant;
  size?: ActionSize;
  isLoading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className="ui-action"
      data-variant={variant}
      data-size={size}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {children}
    </button>
  );
}
