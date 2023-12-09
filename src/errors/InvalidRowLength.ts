type RowLength = number;

class InvalidRowLengthError extends Error {
  constructor(row: unknown[], expected: RowLength, etc?: object) {
    super(
      `Got: ${row.length}` +
        '\n' +
        `Expected: ${expected}` +
        '\n' +
        `Row dump: [${row.join(', ')}]` +
        (etc ? '\n' + 'Additional dump:' + '\n' + JSON.stringify(etc, null, 2) : '')
    );
    this.name = 'InvalidRowLength';
  }
}

export default InvalidRowLengthError;
