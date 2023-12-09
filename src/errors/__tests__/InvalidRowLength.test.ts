import type { StrictSudokuEntry } from '@/types';
import InvalidRowLength from '../InvalidRowLength';

describe('InvalidGridSize', () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const row: StrictSudokuEntry = ['x', 1, 2];
    const expected = 4;
    const error = new InvalidRowLength(row, expected);
    const expectedErrorMsg = `Got: ${row.length}` + '\n' + `Expected: ${expected}` + '\n' + `Row dump: [${row.join(', ')}]`;

    expect(error.message).toBe(expectedErrorMsg);
  });

  it("should increase the coverage, given it's the only purpose of this test (bis)", () => {
    const [row, expected, etc]: [StrictSudokuEntry, number, object] = [['x', 1, 2], 4, { lol: 'hello' }];
    const error = new InvalidRowLength(row, expected, etc);
    const expectedErrorMsg =
      `Got: ${row.length}` +
      '\n' +
      `Expected: ${expected}` +
      '\n' +
      `Row dump: [${row.join(', ')}]` +
      '\n' +
      'Additional dump:' +
      '\n' +
      JSON.stringify(etc, null, 2);

    expect(error.message).toBe(expectedErrorMsg);
  });
});
