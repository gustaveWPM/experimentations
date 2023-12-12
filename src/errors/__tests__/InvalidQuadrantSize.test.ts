import type { QuadrantSize } from "@/types";
import InvalidQuadrantSizeError from "../InvalidQuadrantSize";

describe("InvalidQuadrantSize", () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const quadrantSize: QuadrantSize = -1;
    const message = "$";
    const error = new InvalidQuadrantSizeError(quadrantSize, message);
    expect(error.message).toBe(`Got: ${quadrantSize}` + "\n" + message);
  });
});
