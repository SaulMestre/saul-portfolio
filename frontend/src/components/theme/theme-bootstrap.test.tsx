import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeBootstrap, themeBootstrapSource } from "./theme-bootstrap";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
});

function runBootstrap(storage: Pick<Storage, "getItem">) {
  const execute = new Function("document", "localStorage", themeBootstrapSource);
  execute(document, storage);
}

describe("Early theme bootstrap", () => {
  it.each(["light", "dark"])("applies stored %s before hydration", (mode) => {
    localStorage.setItem("portfolio.theme", mode);
    runBootstrap(localStorage);
    expect(document.documentElement.dataset.theme).toBe(mode);
  });

  it.each([null, "system", "invalid"])("clears the override for %s", (mode) => {
    document.documentElement.dataset.theme = "dark";
    if (mode !== null) localStorage.setItem("portfolio.theme", mode);
    runBootstrap(localStorage);
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("degrades to system when storage access fails", () => {
    document.documentElement.dataset.theme = "dark";
    const denied = {
      getItem() {
        throw new Error("Storage denied");
      },
    };
    expect(() => runBootstrap(denied)).not.toThrow();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("renders a synchronous static script", () => {
    const html = renderToStaticMarkup(<ThemeBootstrap />);
    expect(html).toContain("<script>");
    expect(html).toContain(themeBootstrapSource);
    expect(html).not.toContain("src=");
    expect(html).not.toContain("async");
  });
});
