import InvalidQuadrantSizeError from "../InvalidQuadrantSize";

describe("InvalidQuadrantSize", () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const message = "$";
    const error = new InvalidQuadrantSizeError(message);
    expect(error.message).toBe(message);
  });
});
