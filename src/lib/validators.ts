import { config } from "@/config";
import InvalidCellValueError from "@/errors/InvalidCellValue";
import InvalidGridSizeError from "@/errors/InvalidGridSize";
import InvalidRowLengthError from "@/errors/InvalidRowLength";
import MissingRowsError from "@/errors/MissingRows";
import type { Config, GridSize, StrictSudokuEntries, UnstrictSudokuEntries } from "@/types";

const { QUADRANT_SIZE } = config;

/**
 * @throws {InvalidGridSizeError}
 */
export function throwIfInvalidGridSize(gridSize: GridSize): void {
  if (gridSize % QUADRANT_SIZE !== 0) {
    throw new InvalidGridSizeError(`The grid size must be a multiple of ${QUADRANT_SIZE}.`);
  }

  if (gridSize < QUADRANT_SIZE * 2) {
    throw new InvalidGridSizeError(
      `The grid size is too tiny. It must be greater or equal to ${QUADRANT_SIZE * 2}, and is currently equal to ${gridSize}.` +
        " " +
        "Maybe you would use isInvalidQuadrant?",
    );
  }
}

/**
 * @throws {InvalidRowLengthError}
 */
export function throwIfInvalidRowsLength(rows: StrictSudokuEntries, gridSize: GridSize): void {
  for (const row of rows) {
    if (row.length !== gridSize) {
      throw new InvalidRowLengthError(row, gridSize);
    }
  }
}

/**
 * @throws {InvalidCellValueError}
 */
export function throwIfInvalidCellValue(rows: StrictSudokuEntries, gridSize: GridSize): void {
  for (const row of rows) {
    for (const cell of row) {
      if (cell === "x" || (1 <= cell && cell <= gridSize && Number.isInteger(cell))) continue;
      throw new InvalidCellValueError(cell, gridSize);
    }
  }
}

/**
 * @throws {MissingRowsError}
 */
export function throwIfMissingRows(input: StrictSudokuEntries | UnstrictSudokuEntries, gridSize: GridSize): void {
  if (input.length !== gridSize) {
    throw new MissingRowsError(input.length, gridSize);
  }
}

/**
 * @throws {InvalidGridSizeError}
 */
export const throwIfInvalidConfig = (__CONFIG: Config = config): void => throwIfInvalidGridSize(__CONFIG.DEFAULT_GRID_SIZE);
