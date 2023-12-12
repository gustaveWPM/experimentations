import type { GridSize, Index, Quadrant, QuadrantSize, Quadrants, StrictSudokuEntries, XCoord, YCoord } from "@/types";

const mallocQuadrant = (quadrantSize: QuadrantSize): Quadrant => Array.from({ length: quadrantSize }, () => new Array(quadrantSize));

export function buildQuadrants(input: StrictSudokuEntries, gridSize: GridSize, quadrantSize: QuadrantSize): Quadrants {
  function getCurrentQuadrant(input_start_x: XCoord, input_start_y: YCoord): Quadrant {
    const quadrant: Quadrant = mallocQuadrant(quadrantSize);

    for (let y_delta: Index = 0; y_delta < quadrantSize; y_delta++) {
      for (let x_delta: Index = 0; x_delta < quadrantSize; x_delta++) {
        quadrant[y_delta][x_delta] = input[input_start_y + y_delta][input_start_x + x_delta];
      }
    }
    return quadrant;
  }

  const quadrants: Quadrants = [];
  const maxQuadrantIndex = gridSize / quadrantSize;

  for (let quadrantYIndex: Index = 0; quadrantYIndex < maxQuadrantIndex; quadrantYIndex++) {
    const input_start_y: YCoord = quadrantYIndex * quadrantSize;
    for (let quadrantXIndex: Index = 0; quadrantXIndex < maxQuadrantIndex; quadrantXIndex++) {
      const input_start_x: XCoord = quadrantXIndex * quadrantSize;
      quadrants.push(getCurrentQuadrant(input_start_x, input_start_y));
    }
  }
  return quadrants;
}
