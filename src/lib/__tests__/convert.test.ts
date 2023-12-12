import InvalidRowLengthError from "@/errors/InvalidRowLength";
import type { FilledSudokuCell, QuadrantsSets, StrictSudokuEntries } from "@/types";
import { EMPTY_CELL as _ } from "@/utils/emptyCell";
import { fromPointToQuadrantId, quadrantsToSets, toAsc, toStrict, toUnstrict } from "../convert";

describe("toStrict", () => {
  it("should pass, given a valid unstrict grid and expecting its valid converted value as a strict grid", () => {
    const gridSize = 6;

    expect(
      toStrict(
        // biome-ignore format: the array should not be formatted
        [
          '1,,,,2.0,3,4,5,6', 'x,2,x,4,5,6',
          'X,2,X,4,5,6', '1,,,,2,3,4,5,6',
          'x,2,X,4,5,6', 'X,2,X,4,5,6'
        ],
        gridSize,
      ),
    ).toStrictEqual(
      // biome-ignore format: the array should not be formatted
      [
        [1, 2, 3, 4, 5, 6],
        [_, 2, _, 4, 5, 6],
        [_, 2, _, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [_, 2, _, 4, 5, 6],
        [_, 2, _, 4, 5, 6],
      ] satisfies StrictSudokuEntries,
    );
  });

  it("should pass, given an invalid unstrict grid and expecting the function to throw", () => {
    const gridSize = 6;

    expect(() =>
      toStrict(
        // biome-ignore format: the array should not be formatted
        [
          '1,,,,2,3,4,5', 'x,2,x,4,5,6',
          'X,2,X,4,5,6', '1,,,,2,3,4,5,6',
          'x,2,X,4,5,6', 'X,2,X,4,5,6'
        ],
        gridSize,
      ),
    ).toThrow(InvalidRowLengthError);
  });
});

describe("toUnstrict", () => {
  it("should pass, given a valid strict grid and expecting its valid converted value as an unstrict grid", () => {
    const gridSize = 6;

    expect(
      toUnstrict(
        // biome-ignore format: the array should not be formatted
        [
          [1, 2, 3, 4, 5, 6], [_, 2, _, 4, 5, 6],
          [_, 2, _, 4, 5, 6], [1, 2, 3, 4, 5, 6],
          [_, 2, _, 4, 5, 6], [_, 2, _, 4, 5, 6]
        ],
        gridSize,
      ),
    ).toStrictEqual(
      // biome-ignore format: the array should not be formatted
      ["1,2,3,4,5,6", "x,2,x,4,5,6", "x,2,x,4,5,6", "1,2,3,4,5,6", "x,2,x,4,5,6", "x,2,x,4,5,6"],
    );
  });

  it("should pass, given an invalid strict grid and expecting the function to throw", () => {
    const gridSize = 6;

    expect(() =>
      toUnstrict(
        // biome-ignore format: the array should not be formatted
        [
          [1, 2, 3, 4, 5], [_, 2, _, 4, 5, 6],
          [_, 2, _, 4, 5, 6], [1, 2, 3, 4, 5, 6],
          [_, 2, _, 4, 5, 6], [_, 2, _, 4, 5, 6]
        ],
        gridSize,
      ),
    ).toThrow(InvalidRowLengthError);
  });
});

describe("quadrantsToSets", () => {
  it("should pass, given a valid input and expecting the valid output", () => {
    expect(
      quadrantsToSets([
        [
          [1, _, 3],
          [1, 2, _],
          [1, _, 3],
        ],
        [
          [4, _, 6],
          [_, 5, 6],
          [4, 5, _],
        ],
        [
          [7, 8, 9],
          [7, _, 9],
          [7, 8, 9],
        ],
        [
          [_, 2, 3],
          [1, 2, 3],
          [1, 2, _],
        ],
        [
          [4, 5, _],
          [4, 5, 6],
          [_, 5, 6],
        ],
        [
          [_, 8, 9],
          [7, 8, 9],
          [7, 8, 9],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, _],
        ],
        [
          [_, 5, 6],
          [4, 5, 6],
          [4, 5, 6],
        ],
        [
          [7, 8, 9],
          [_, 8, 9],
          [7, 8, 9],
        ],
      ]),
    ).toStrictEqual([
      new Set<FilledSudokuCell>([1, 3, 2]),
      new Set<FilledSudokuCell>([4, 6, 5]),
      new Set<FilledSudokuCell>([7, 8, 9]),
      new Set<FilledSudokuCell>([2, 3, 1]),
      new Set<FilledSudokuCell>([4, 5, 6]),
      new Set<FilledSudokuCell>([8, 9, 7]),
      new Set<FilledSudokuCell>([1, 2, 3]),
      new Set<FilledSudokuCell>([5, 6, 4]),
      new Set<FilledSudokuCell>([7, 8, 9]),
    ] satisfies QuadrantsSets);
  });
});

describe("toAsc", () => {
  it("should pass, given an already sorted input and expecting the valid output", () => {
    expect(toAsc([1, 2, 3])).toStrictEqual([1, 2, 3]);
  });

  it("should pass, given a valid input and expecting the valid output", () => {
    expect(toAsc([1, 3, 2])).toStrictEqual([1, 2, 3]);
  });

  it("should pass, given a valid input with duplicates and expecting the valid output", () => {
    expect(toAsc([1, 3, 1, 2, 2, 3, 2])).toStrictEqual([1, 1, 2, 2, 2, 3, 3]);
  });

  it("should pass, given an empty input and expecting the valid output", () => {
    expect(toAsc([])).toStrictEqual([]);
  });
});

describe("fromPointToQuadrantId", () => {
  const gridSize = 9;

  it("should pass", () => {
    expect(fromPointToQuadrantId(0, 0, gridSize)).toBe(1);
    expect(fromPointToQuadrantId(3, 0, gridSize)).toBe(2);
    expect(fromPointToQuadrantId(6, 0, gridSize)).toBe(3);
    expect(fromPointToQuadrantId(0, 4, gridSize)).toBe(4);
    expect(fromPointToQuadrantId(3, 4, gridSize)).toBe(5);
    expect(fromPointToQuadrantId(6, 4, gridSize)).toBe(6);
    expect(fromPointToQuadrantId(0, 8, gridSize)).toBe(7);
    expect(fromPointToQuadrantId(5, 8, gridSize)).toBe(8);
    expect(fromPointToQuadrantId(8, 8, gridSize)).toBe(9);
  });
});
