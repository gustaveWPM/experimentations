import { config } from "@/config";
import InvalidCellValueError from "@/errors/InvalidCellValue";
import InvalidGridSizeError from "@/errors/InvalidGridSize";
import InvalidQuadrantSizeError from "@/errors/InvalidQuadrantSize";
import InvalidRowLengthError from "@/errors/InvalidRowLength";
import MissingRowsError from "@/errors/MissingRows";
import type { Config, GridSize, QuadrantSize, StrictSudokuEntries, UnstrictSudokuEntries } from "@/types";

/**
 * @throws {InvalidQuadrantSizeError}
 */
export function throwIfInvalidQuadrantSize(quadrantSize: QuadrantSize): void {
  if (quadrantSize <= 1) {
    throw new InvalidQuadrantSizeError("The quadrant size must be greater than or equal to 1.");
  }

  if (!Number.isInteger(quadrantSize)) {
    throw new InvalidQuadrantSizeError("The quadrant size must be an integer.");
  }
}

/**
 * @throws {InvalidGridSizeError}
 */
export function throwIfInvalidGridSize(gridSize: GridSize, quadrantSize: QuadrantSize): void {
  if (!Number.isInteger(gridSize)) {
    throw new InvalidGridSizeError("The grid size must be an integer.");
  }

  if (gridSize <= 1) {
    throw new InvalidGridSizeError("The grid size must be greater than or equal to 1.");
  }

  if (gridSize % quadrantSize !== 0) {
    throw new InvalidGridSizeError(`The grid size must be a multiple of ${quadrantSize} (quadrantSize).`);
  }

  if (gridSize < quadrantSize * 2) {
    throw new InvalidGridSizeError(
      `The grid size is too tiny. It must be greater or equal to ${quadrantSize * 2} (quadrantSize * 2), and is currently equal to ${gridSize}.` +
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
 * @throws {InvalidQuadrantSizeError}
 */
export function throwIfInvalidConfig(__CONFIG: Config = config): void {
  throwIfInvalidGridSize(__CONFIG.DEFAULT_GRID_SIZE, __CONFIG.DEFAULT_QUADRANT_SIZE);
  throwIfInvalidQuadrantSize(__CONFIG.DEFAULT_QUADRANT_SIZE);
}
