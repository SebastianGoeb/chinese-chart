import { describe, expect } from "vitest";
import { fuzzyContains } from "./fuzzy";

describe("fuzzyContains", () => {
  it("should find exact match", () => {
    expect(fuzzyContains("abc", "abc")).toBe(true);
  });

  it("should find substring match", () => {
    expect(fuzzyContains("--abc--", "abc")).toBe(true);
  });

  it("should find fuzzy match", () => {
    expect(fuzzyContains("Berlin", "el")).toBe(true);
  });

  it("should reject out-of-order fuzzy match", () => {
    expect(fuzzyContains("bleach", "el")).toBe(false);
  });
});
