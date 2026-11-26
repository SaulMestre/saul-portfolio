import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ActionSize, ActionVariant } from "./button";

type ActionLinkProps = Omit<ComponentPropsWithoutRef<"a">, "className" | "style" | "children"> & {
  href: string;
  variant?: ActionVariant;
  size?: ActionSize;
  documentNavigation?: boolean;
  children: ReactNode;
};

export function ActionLink({
  variant = "primary",
  size = "md",
  documentNavigation = false,
  children,
  ...props
}: ActionLinkProps) {
  const appearance = { className: "ui-action", "data-variant": variant, "data-size": size };

  if (documentNavigation) {
    return (
      <a {...props} {...appearance}>
        {children}
      </a>
    );
  }

  return (
    <Link {...props} {...appearance}>
      {children}
    </Link>
  );
}
