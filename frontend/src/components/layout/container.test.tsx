import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Container } from "./container";

afterEach(cleanup);

it("uses the shared responsive container", () => {
  render(<Container>Content</Container>);
  expect(screen.getByText("Content").className).toBe("ui-container");
});
