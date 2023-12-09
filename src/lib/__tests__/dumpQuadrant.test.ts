import type { Quadrant } from '@/types';
import { EMPTY_CELL as _ } from '@/utils/emptyCell';
import dumpQuadrant from '../dumpQuadrant';

describe('dumpQuadrant', () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const sampleQuadrant: Quadrant = [
      [1, 2, 3],
      [4, 5, 6],
      [7, _, 9]
    ];

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
    dumpQuadrant(sampleQuadrant);

    const expectedOutput = ['[1, 2, 3]', '[4, 5, 6]', '[7, _, 9]'];

    expectedOutput.forEach((output, index) => {
      expect(consoleErrorSpy.mock.calls[index][0]).toContain(output);
    });
    consoleErrorSpy.mockRestore();
  });
});
