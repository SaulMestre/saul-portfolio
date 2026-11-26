// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";

describe("Root redirect", () => {
  it("redirects to the Spanish home page", () => {
    const response = proxy(new NextRequest("https://example.test/"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://example.test/es");
  });

  it("only matches the root path", () => {
    expect(config.matcher).toEqual(["/"]);
  });
});
