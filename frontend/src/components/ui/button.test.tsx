import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button, actionSizes, actionVariants } from "./button";

afterEach(cleanup);

describe("Button", () => {
  it.each(actionVariants)("uses the shared %s variant", (variant) => {
    render(<Button variant={variant}>Action</Button>);
    const button = screen.getByRole("button", { name: "Action" });
    expect(button.getAttribute("data-variant")).toBe(variant);
    expect(button.className).toContain("ui-action");
  });

  it.each(actionSizes)("uses the shared %s size", (size) => {
    render(<Button size={size}>Action</Button>);
    expect(screen.getByRole("button").getAttribute("data-size")).toBe(size);
  });

  it("defaults to primary, medium and native non-submit behavior", () => {
    render(<Button>Action</Button>);
    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.type).toBe("button");
    expect(button.dataset.variant).toBe("primary");
    expect(button.dataset.size).toBe("md");
    expect(button.disabled).toBe(false);
  });

  it.each(["submit", "reset"] as const)("preserves native %s type", (type) => {
    render(<Button type={type}>Action</Button>);
    expect((screen.getByRole("button") as HTMLButtonElement).type).toBe(type);
  });

  it.each([
    { disabled: true, isLoading: false },
    { disabled: false, isLoading: true },
  ])("prevents activation when unavailable: %j", (props) => {
    const onClick = vi.fn();
    render(
      <Button {...props} onClick={onClick}>
        Action
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Action" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button.getAttribute("aria-busy")).toBe(props.isLoading ? "true" : null);
  });

  it("supports ordinary activation and accessible names", () => {
    const onClick = vi.fn();
    render(
      <Button aria-label="Save changes" onClick={onClick}>
        Save
      </Button>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
