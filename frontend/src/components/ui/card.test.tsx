import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Card } from "./card";

afterEach(cleanup);

describe("Card", () => {
  it("renders a surface by default without interactive semantics", () => {
    render(<Card>Content</Card>);
    const card = screen.getByText("Content");
    expect(card.dataset.surface).toBe("surface");
    expect(card.className).toBe("ui-card");
    expect(card.hasAttribute("role")).toBe(false);
  });

  it("supports the muted semantic surface", () => {
    render(<Card surface="muted">Content</Card>);
    expect(screen.getByText("Content").dataset.surface).toBe("muted");
  });
});
