import MissingRowsError from '../MissingRows';

describe('InvalidGridSize', () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const [rowsAmount, expected] = [2, 1];
    const error = new MissingRowsError(rowsAmount, expected);
    const expectedErrorMsg = `Got: ${rowsAmount}` + '\n' + `Expected: ${expected}`;
    expect(error.message).toBe(expectedErrorMsg);
  });
});
