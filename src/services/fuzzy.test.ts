import { describe, expect } from "vitest";
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
});
