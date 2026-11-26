import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { ActionSize, ActionVariant } from "./button";

type ActionLinkProps = Omit<ComponentProps<typeof Link>, "className" | "style" | "children"> & {
  variant?: ActionVariant;
  size?: ActionSize;
  children: ReactNode;
};

export function ActionLink({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link {...props} className="ui-action" data-variant={variant} data-size={size}>
      {children}
    </Link>
  );
}
