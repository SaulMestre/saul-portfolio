import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PortfolioShell } from "./portfolio-shell";

afterEach(cleanup);

describe("PortfolioShell", () => {
  it("renders the Spanish content without duplicating layout landmarks", () => {
    render(<PortfolioShell locale="es" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Portfolio en desarrollo");
    expect(screen.getByText("Esta es la base técnica del portfolio.")).toBeTruthy();
    expect(screen.queryByRole("main")).toBeNull();
  });

  it("renders the English content without duplicating layout landmarks", () => {
    render(<PortfolioShell locale="en" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Portfolio in development");
    expect(screen.getByText("This is the technical foundation of the portfolio.")).toBeTruthy();
    expect(screen.queryByRole("main")).toBeNull();
  });
});
