import InvalidCellValue from "../InvalidCellValue";

describe("InvalidCellValue", () => {
  it("should warn the number is not in the expected closed interval", () => {
    const value = 0;
    const gridSize = 9;
    const message = `The value '${value}' is not in the closed interval: [1, ${gridSize}]`;
    const error = new InvalidCellValue(value, gridSize);

    expect(error.message).toBe(message);
  });

  it("should warn that the value is not an integer", () => {
    const value = 1.25;
    const gridSize = 9;
    const message = `The value '${value}' is not an integer`;
    const error = new InvalidCellValue(value, gridSize);

    expect(error.message).toBe(message);
  });
});
