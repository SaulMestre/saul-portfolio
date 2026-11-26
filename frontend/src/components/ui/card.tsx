import type { ReactNode } from "react";

type CardProps = {
  surface?: "surface" | "muted";
  children: ReactNode;
};

export function Card({ surface = "surface", children }: CardProps) {
  return (
    <div className="ui-card" data-surface={surface}>
      {children}
    </div>
  );
}
