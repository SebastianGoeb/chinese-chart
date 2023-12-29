import { describe, expect, it } from "vitest";
import { fuzzyContains, fuzzyContainsWithScoring } from "./fuzzy";

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

  it("should reject repeat chars", () => {
    expect(fuzzyContains("bla", "baaaaa")).toBe(false);
  });
});

describe("fuzzyContainsScored", () => {
  it("should rate exact match 1", () => {
    expect(fuzzyContainsWithScoring("abc", "abc")).toBe(1);
  });

  it("should rate substring match 1", () => {
    expect(fuzzyContainsWithScoring("--abc--", "abc")).toBe(1);
  });

  it("should rate fuzzy match < 1", () => {
    expect(fuzzyContainsWithScoring("Berlin", "el")).toBe(2 / 3);
  });

  it("should reject out-of-order fuzzy match", () => {
    expect(fuzzyContainsWithScoring("bleach", "el")).toBe(0);
  });

  it("should reject repeat chars", () => {
    expect(fuzzyContainsWithScoring("bla", "baaaaa")).toBe(0);
  });
});
