type RowsAmount = number;

class MissingRowsError extends Error {
  constructor(rowsAmount: RowsAmount, expected: RowsAmount) {
    super(`Got: ${rowsAmount}` + '\n' + `Expected: ${expected}`);
    this.name = 'InvalidRowLength';
  }
}

export default MissingRowsError;
