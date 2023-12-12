import type { Index, Quadrant } from "@/types";
import { EMPTY_CELL as _ } from "@/utils/emptyCell";
import dumpQuadrant from "../dumpQuadrant";

describe("dumpQuadrant", () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const sampleQuadrant: Quadrant = [
      [1, 2, 3],
      [4, 5, 6],
      [7, _, 9],
    ];

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(jest.fn());
    dumpQuadrant(sampleQuadrant);

    const expectedOutput = ["[1, 2, 3]", "[4, 5, 6]", "[7, _, 9]"];

    for (let i: Index = 0; i < expectedOutput.length; i++) {
      expect(consoleErrorSpy.mock.calls[i][0]).toContain(expectedOutput[i]);
    }
    consoleErrorSpy.mockRestore();
  });
});
