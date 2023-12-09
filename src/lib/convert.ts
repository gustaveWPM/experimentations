/* For JSDoc */
// eslint-disable-next-line no-unused-vars
import MissingRowsError from '@/errors/MissingRows';
// eslint-disable-next-line no-unused-vars
import InvalidGridSizeError from '@/errors/InvalidGridSize';

import config from '@/config';
import InvalidRowLengthError from '@/errors/InvalidRowLength';
import { throwIfInvalidGridSize, throwIfMissingRows } from '@/lib/validators';
import type {
  FilledSudokuCell,
  GridSize,
  QuadrantId,
  Quadrants,
  QuadrantsSets,
  StrictSudokuEntries,
  StrictSudokuEntry,
  SudokuCellElement,
  UnstrictSudokuEntries,
  XCoord,
  YCoord
} from '@/types';
import { EMPTY_CELL } from '@/utils/emptyCell';

const { QUADRANT_SIZE } = config;

/**
 * @throws {InvalidGridSizeError}
 * @throws {InvalidRowLengthError}
 * @throws {MissingRowsError}
 * Won't be used, just here for the vine.
 */
export function toUnstrict(input: StrictSudokuEntries, gridSize: GridSize): UnstrictSudokuEntries {
  throwIfInvalidGridSize(gridSize);
  throwIfMissingRows(input, gridSize);

  const toUnstrictResult: UnstrictSudokuEntries = [];
  for (const entity of input) {
    if (entity.length !== gridSize) {
      throw new InvalidRowLengthError(entity, gridSize);
    }
    toUnstrictResult.push(entity.map((e) => e.toString()).join(','));
  }

  return toUnstrictResult;
}

/**
 * @throws {InvalidGridSizeError}
 * @throws {InvalidRowLengthError}
 * @throws {MissingRowsError}
 */
export function toStrict(input: UnstrictSudokuEntries, gridSize: GridSize): StrictSudokuEntries {
  throwIfInvalidGridSize(gridSize);
  throwIfMissingRows(input, gridSize);

  const regex = /[1-9|x]/;
  const toStrictResult: StrictSudokuEntries = [];

  for (const row of input) {
    const currentRowList: StrictSudokuEntry = [];
    for (const char of row) {
      const normalizedChar = char.toLowerCase();
      if (regex.test(normalizedChar)) {
        if (normalizedChar === 'x') currentRowList.push(normalizedChar);
        else currentRowList.push(Number(normalizedChar) as SudokuCellElement);
      }
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

export const fromPointToQuadrantId = (x: XCoord, y: YCoord, gridSize: GridSize): QuadrantId =>
  Math.trunc(x / QUADRANT_SIZE) + 1 + Math.trunc(y / QUADRANT_SIZE) * (gridSize / QUADRANT_SIZE);
