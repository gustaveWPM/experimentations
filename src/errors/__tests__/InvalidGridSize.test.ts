import InvalidGridSizeError from "../InvalidGridSize";

describe("InvalidGridSize", () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const message = "$";
    const error = new InvalidGridSizeError(message);
    expect(error.message).toBe(message);
  });
});
