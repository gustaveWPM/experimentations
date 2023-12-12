import InvalidRowLengthError from "@/errors/InvalidRowLength";
import { throwIfInvalidGridSize, throwIfInvalidQuadrantSize, throwIfMissingRows } from "@/lib/validators";
import type {
  EmptySudokuCell,
  FilledSudokuCell,
  GridSize,
  QuadrantId,
  QuadrantSize,
  Quadrants,
  QuadrantsSets,
  StrictSudokuEntries,
  StrictSudokuEntry,
  SudokuCellElement,
  UnstrictSudokuEntries,
  XCoord,
  YCoord,
} from "@/types";
import { EMPTY_CELL } from "@/utils/emptyCell";

/**
 * @throws {InvalidGridSizeError}
 * @throws {InvalidRowLengthError}
 * @throws {MissingRowsError}
 * Unused, just here for the vine.
 */
export function toUnstrict(input: StrictSudokuEntries, gridSize: GridSize, quadrantSize: QuadrantSize): UnstrictSudokuEntries {
  throwIfInvalidQuadrantSize(quadrantSize);
  throwIfInvalidGridSize(gridSize, quadrantSize);
  throwIfMissingRows(input, gridSize);

  const toUnstrictResult: UnstrictSudokuEntries = [];
  for (const entity of input) {
    if (entity.length !== gridSize) {
      throw new InvalidRowLengthError(entity, gridSize);
    }
    toUnstrictResult.push(entity.map((e) => e.toString()).join(","));
  }

  return toUnstrictResult;
}

/**
 * @throws {InvalidGridSizeError}
 * @throws {InvalidRowLengthError}
 * @throws {MissingRowsError}
 */
export function toStrict(input: UnstrictSudokuEntries, gridSize: GridSize, quadrantSize: QuadrantSize): StrictSudokuEntries {
  throwIfInvalidQuadrantSize(quadrantSize);
  throwIfInvalidGridSize(gridSize, quadrantSize);
  throwIfMissingRows(input, gridSize);

  const isEmptyCell = (c: string): c is EmptySudokuCell => c === "x";
  const isFilledCell = (c: number): c is FilledSudokuCell => !Number.isNaN(c) && 1 <= c && c <= gridSize;

  const toStrictResult: StrictSudokuEntries = [];

  for (const row of input) {
    const currentRowList: StrictSudokuEntry = [];
    const maybeCells = row.split(",");

    for (const maybeCell of maybeCells) {
      const cell = maybeCell.trim().toLowerCase();
      const cellAsFilledCell = Number(cell);

      if (isFilledCell(cellAsFilledCell)) currentRowList.push(Math.trunc(cellAsFilledCell));
      else if (isEmptyCell(cell)) currentRowList.push(cell);
    }

    if (currentRowList.length !== gridSize) {
      throw new InvalidRowLengthError(currentRowList, gridSize, { fromUnstrictRow: row });
    }
    toStrictResult.push(currentRowList);
  }
  return toStrictResult;
}

export function quadrantsToSets(quadrants: Quadrants): QuadrantsSets {
  const quadrantsSets: Set<FilledSudokuCell>[] = quadrants.map((quadrant) => {
    const s = new Set<SudokuCellElement>(quadrant.flat());
    if (s.has(EMPTY_CELL)) s.delete(EMPTY_CELL);
    return s as Set<FilledSudokuCell>;
  });
  return quadrantsSets;
}

export const toAsc = (array: number[]): number[] => array.sort((n1, n2) => n1 - n2);

export const fromPointToQuadrantId = (x: XCoord, y: YCoord, gridSize: GridSize, quadrantSize: QuadrantSize): QuadrantId =>
  Math.trunc(x / quadrantSize) + 1 + Math.trunc(y / quadrantSize) * (gridSize / quadrantSize);
