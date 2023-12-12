import { config } from "@/config";
import InvalidCellValueError from "@/errors/InvalidCellValue";
import InvalidGridSizeError from "@/errors/InvalidGridSize";
import InvalidRowLengthError from "@/errors/InvalidRowLength";
import MissingRowsError from "@/errors/MissingRows";
import type { Config, StrictSudokuEntries } from "@/types";
import { throwIfInvalidCellValue, throwIfInvalidConfig, throwIfInvalidGridSize, throwIfInvalidRowsLength, throwIfMissingRows } from "../validators";

const { QUADRANT_SIZE } = config;

describe("throwIfInvalidCellValue", () => {
  it("should pass, given an invalid input and expecting the function to throw", () => {
    expect(() => throwIfInvalidCellValue([[1, 2, 3]], 2)).toThrow(InvalidCellValueError);
  });

  it("should pass, given an invalid input and expecting the function to throw", () => {
    expect(() => throwIfInvalidCellValue([[1, 2.2, 3]], 3)).toThrow(InvalidCellValueError);
  });
});

describe("throwIfInvalidGridSize", () => {
  it("should pass, given a grid size which isn't a multiple of QUADRANT_SIZE and expecting the function to throw", () => {
    expect(() => throwIfInvalidGridSize(QUADRANT_SIZE + 1)).toThrow(InvalidGridSizeError);
  });

  it("should pass, given a grid size which is less than QUADRANT_SIZE * 2, even if it is a multiple of QUADRANT_SIZE, and expecting the function to throw", () => {
    expect(() => throwIfInvalidGridSize(QUADRANT_SIZE)).toThrow(InvalidGridSizeError);
  });

  it("should pass, given a grid size which is negative and expecting the function to throw", () => {
    expect(() => throwIfInvalidGridSize(-1)).toThrow(InvalidGridSizeError);
  });
});

describe("throwIfInvalidRowsLength", () => {
  it("should pass, given a row which length isn't equal to gridSize and expecting the function to throw", () => {
    const rows: StrictSudokuEntries = [["x", 1, 2]];
    expect(() => throwIfInvalidRowsLength(rows, rows.length * 2)).toThrow(InvalidRowLengthError);
  });
});

describe("throwIfMissingRows", () => {
  it("should pass, given an input which is missing rows and expecting the function to throw", () => {
    const rows: StrictSudokuEntries = [[1, 2, 3, 4, 5, 6, 7, 8, 9]];
    expect(() => throwIfMissingRows(rows, 9)).toThrow(MissingRowsError);
  });
});

describe("throwIfInvalidConfig", () => {
  it("should pass, given an input which is missing rows and expecting the function to throw", () => {
    const fakeConfig = {
      QUADRANT_SIZE: 3,
      DEFAULT_GRID_SIZE: 10,
    } satisfies Pick<Config, "QUADRANT_SIZE"> & { DEFAULT_GRID_SIZE: number } satisfies Partial<Record<keyof Config, any>>;

    expect(() => throwIfInvalidConfig(fakeConfig as any)).toThrow(InvalidGridSizeError);
  });
});
