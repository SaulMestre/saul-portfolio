import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PortfolioShell } from "./portfolio-shell";

afterEach(cleanup);

describe("PortfolioShell", () => {
  it("renders the Spanish shell and the English language link", () => {
    render(<PortfolioShell locale="es" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Portfolio en desarrollo");
    expect(screen.getByRole("link", { name: "English" }).getAttribute("href")).toBe("/en");
  });

  it("renders the English shell and the Spanish language link", () => {
    render(<PortfolioShell locale="en" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Portfolio in development");
    expect(screen.getByRole("link", { name: "Español" }).getAttribute("href")).toBe("/es");
  });
});
