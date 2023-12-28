import { render } from "@solidjs/testing-library";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import Zoomer from "./Zoomer";

describe("should render", () => {
  it("should render the buttons", () => {
    const { getByText } = render(() => <Zoomer />);
    expect(getByText("50%")).toBeInTheDocument();
    expect(getByText("100%")).toBeInTheDocument();
    expect(getByText("200%")).toBeInTheDocument();
  });
});
