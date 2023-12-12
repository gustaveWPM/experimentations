import type { FilledSudokuCell, GridSize } from '@/types';

class InvalidCellValueError extends Error {
  constructor(value: FilledSudokuCell, gridSize: GridSize) {
    if (!Number.isInteger(value)) super(`The value '${value}' is not an integer`);
    else super(`The value '${value}' is not in the closed interval: [1, ${gridSize}]`);
    this.name = 'InvalidCellValue';
  }
}

export default InvalidCellValueError;
