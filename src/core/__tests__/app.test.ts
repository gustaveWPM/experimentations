import { config } from "@/config";
import FailedToInitializeError from "@/errors/FailedToInitialize";
import type { BuiltProgramOptions, LegalFinalOutput } from "@/types";
import { EMPTY_CELL as _ } from "@/utils/emptyCell";
import { strictSudokuKata, unstrictSudokuKata } from "../app";

const { DEFAULT_QUADRANT_SIZE } = config;

describe("Fail to initialize", () => {
  const gridSize = 6;
  const invalidGridSize = 5;

  it("should pass, given an invalid grid size and expecting the function to throw", () => {
    expect(async () => {
      await unstrictSudokuKata([_], { gridSize: invalidGridSize });
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid (missing cell in row) and expecting the function to throw", () => {
    expect(async () => {
      await unstrictSudokuKata([_, _, _, _, _], { gridSize });
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid (missing columns) and expecting the function to throw", () => {
    expect(async () => {
      await unstrictSudokuKata([_, _, _, _, _, _], { gridSize });
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid (invalid row length) and expecting the function to throw", () => {
    expect(async () => {
      await unstrictSudokuKata(["1,2,3,4,5", "1,2,3,4,5,6", "1,2,3,4,5,6", "1,2,3,4,5,6", "1,2,3,4,5,6", "1,2,3,4,5,6"], { gridSize });
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid size and expecting the function to throw", () => {
    expect(async () => {
      await strictSudokuKata([[_]], { gridSize: invalidGridSize });
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid (missing row) and expecting the function to throw", () => {
    expect(async () => {
      await strictSudokuKata(
        [
          [_, _, _, _, _, _],
          [_, _, _, _, _, _],
          [_, _, _, _, _, _],
          [_, _, _, _, _, _],
          [_, _, _, _, _, _],
        ],
        { gridSize },
      );
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid (invalid row length) and expecting the function to throw", () => {
    expect(async () => {
      await strictSudokuKata(
        // biome-ignore format: the array should not be formatted
        [
          [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6],
          [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6],
          [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]
        ],
        { gridSize },
      );
    }).toThrow(FailedToInitializeError);
  });

  it("should pass, given an invalid grid (missing column) and expecting the function to throw", () => {
    expect(async () => {
      await strictSudokuKata(
        // biome-ignore format: the array should not be formatted
        [
          [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6],
          [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]
        ],
        { gridSize },
      );
    }).toThrow(FailedToInitializeError);
  });
});

describe("Happy path walkthrough", () => {
  const gridSize = 9;

  it("should pass, given a valid grid and expecting the function to return the legal status string", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [5, 8, 1, 4, 2, 7, 6, 9, 3],
        [3, 7, 4, 5, 9, 6, 8, 1, 2],
        [9, 6, 2, 1, 3, 8, 4, 7, 5],

        [6, 2, 9, 3, 8, 5, 7, 4, 1],
        [1, 5, 7, 9, 6, 4, 3, 2, 8],
        [8, 4, 3, 2, 7, 1, 5, 6, 9],

        [4, 1, 8, 7, 5, 2, 9, 3, 6],
        [2, 9, 5, 6, 4, 3, 1, 8, 7],
        [7, 3, 6, 8, 1, 9, 2, 5, 4],
      ],
      { gridSize, isVerbose: false },
    );
    expect(output).toBe("legal" as LegalFinalOutput);
  });

  it("should pass, given a valid grid and expecting the function to return the legal status string", async () => {
    const output = await unstrictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        "5, 8, 1,  4, 2, 7,  6, 9, 3",
        "3, 7, 4,  5, 9, 6,  8, 1, 2",
        "9, 6, 2,  1, 3, 8,  4, 7, 5",

        "6, 2, 9,  3, 8, 5,  7, 4, 1",
        "1, 5, 7,  9, 6, 4,  3, 2, 8",
        "8, 4, 3,  2, 7, 1,  5, 6, 9",

        "4, 1, 8,  7, 5, 2,  9, 3, 6",
        "2, 9, 5,  6, 4, 3,  1, 8, 7",
        "7, 3, 6,  8, 1, 9,  2, 5, 4",
      ],
      { gridSize, isVerbose: false },
    );

    expect(output).toBe("legal" as LegalFinalOutput);
  });
});

describe("Unhappy paths walkthrough", () => {
  const [gridSize, , isVerbose]: BuiltProgramOptions = [9, DEFAULT_QUADRANT_SIZE, true];

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("should pass, given an invalid grid and expecting the function to return the correct illegal status string", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [5, 8, 1,  4, 2, 7,  6, 9, 3],
        [3, 7, 4,  5, 9, 6,  8, 1, 2],
        [9, 5, 2,  1, 3, 8,  9, 7, 5],

        [6, 2, 9,  3, 8, 5,  7, 4, 1],
        [1, 5, 7,  9, _, 4,  3, 2, 8],
        [8, 4, 3,  2, 7, 1,  5, 6, 9],

        [4, 1, 8,  7, 5, 2,  9, 3, 6],
        [2, 9, 5,  6, 4, 3,  1, 5, 7],
        [7, 3, 6,  8, 1, 9,  2, 5, 4],
      ],
      { gridSize, isVerbose },
    );
    expect(output).toBe("1,3,4,7,9");
  });

  it("should pass, otherwise the checkQuadrants function is broken", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [_, _, 3, _, _, _, 9, _, _],
        [_, _, _, _, _, _, _, _, _],
        [3, _, _, _, _, _, _, _, 9],

        [_, _, _, _, _, _, _, _, _],
        [_, _, _, 6, _, _, _, _, _],
        [_, _, _, _, _, 6, _, _, _],

        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, 7, _, _],
        [_, _, _, _, _, _, _, _, 7],
      ],
      { gridSize, isVerbose },
    );
    expect(output).toBe("1,3,5,9");
  });

  it("should pass, otherwise the checkRows function is broken", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [1, _, _, _, _, _, _, _, 1],

        [_, _, _, _, _, _, _, _, _],
        [_, _, _, 1, _, _, 1, _, _],
        [_, _, _, _, _, _, _, _, _],

        [_, 1, _, _, _, _, _, 1, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
      ],
      { gridSize, isVerbose },
    );
    expect(output).toBe("1,3,5,6,7,9");
  });

  it("should pass, otherwise the checkColumns function is broken", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, 3, _, _],
        [1, _, _, _, _, _, _, _, _],

        [_, _, _, _, _, _, _, _, _],
        [1, 2, _, _, _, _, 3, _, _],
        [_, _, _, _, _, _, _, _, _],

        [_, 2, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
      ],
      { gridSize, isVerbose },
    );
    expect(output).toBe("1,3,4,6,7");
  });

  it("should pass, otherwise the checkDiagonalFromTopLeftToBottomRight function is broken", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [1, _, _, _, _, _, _, _, _],
        [_, 2, _, _, _, _, _, _, _],
        [_, _, 3, _, _, _, _, _, _],

        [_, _, _, 4, _, _, _, _, _],
        [_, _, _, _, 5, _, _, _, _],
        [_, _, _, _, _, 6, _, _, _],

        [_, _, _, _, _, _, 5, _, _],
        [_, _, _, _, _, _, _, 7, _],
        [_, _, _, _, _, _, _, _, 8],
      ],
      { gridSize, isVerbose },
    );
    expect(output).toBe("5,9");
  });

  it("should pass, otherwise the checkDiagonalFromBottomLeftToTopRight function is broken", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [_, _, _, _, _, _, _, _, 8],
        [_, _, _, _, _, _, _, 7, _],
        [_, _, _, _, _, _, 5, _, _],

        [_, _, _, _, _, 6, _, _, _],
        [_, _, _, _, 5, _, _, _, _],
        [_, _, _, 4, _, _, _, _, _],

        [_, _, 3, _, _, _, _, _, _],
        [_, 2, _, _, _, _, _, _, _],
        [1, _, _, _, _, _, _, _, _],
      ],
      { gridSize, isVerbose },
    );
    expect(output).toBe("3,5");
  });
});

describe("unstrictSudokuKata and strictSudokuKata (happy path, building options on-the-fly)", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
  });

  it("should increase the coverage, given it's the only purpose of this test (unstrict)", async () => {
    const output = await unstrictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        "5, 8, 1,  4, 2, 7,  6, 9, 3",
        "3, 7, 4,  5, 9, 6,  8, 1, 2",
        "9, 6, 2,  1, 3, 8,  4, 7, 5",

        "6, 2, 9,  3, 8, 5,  7, 4, 1",
        "1, 5, 7,  9, 6, 4,  3, 2, 8",
        "8, 4, 3,  2, 7, 1,  5, 6, 9",

        "4, 1, 8,  7, 5, 2,  9, 3, 6",
        "2, 9, 5,  6, 4, 3,  1, 8, 7",
        "7, 3, 6,  8, 1, 9,  2, 5, 4",
      ],
    );

    expect(output).toBe("legal" as LegalFinalOutput);
  });

  it("should increase the coverage, given it's the only purpose of this test (strict)", async () => {
    const output = await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [5, 8, 1, 4, 2, 7, 6, 9, 3],
        [3, 7, 4, 5, 9, 6, 8, 1, 2],
        [9, 6, 2, 1, 3, 8, 4, 7, 5],

        [6, 2, 9, 3, 8, 5, 7, 4, 1],
        [1, 5, 7, 9, 6, 4, 3, 2, 8],
        [8, 4, 3, 2, 7, 1, 5, 6, 9],

        [4, 1, 8, 7, 5, 2, 9, 3, 6],
        [2, 9, 5, 6, 4, 3, 1, 8, 7],
        [7, 3, 6, 8, 1, 9, 2, 5, 4],
      ],
    );

    expect(output).toBe("legal" as LegalFinalOutput);
  });
});
