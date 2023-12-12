import { config } from "@/config";
import type { GridSize, Index, Quadrant, Quadrants, StrictSudokuEntries, XCoord, YCoord } from "@/types";

const { QUADRANT_SIZE } = config;

const mallocQuadrant: () => Quadrant = () => Array.from({ length: QUADRANT_SIZE }, () => new Array(QUADRANT_SIZE));

export function buildQuadrants(input: StrictSudokuEntries, gridSize: GridSize): Quadrants {
  function getCurrentQuadrant(input_start_x: XCoord, input_start_y: YCoord): Quadrant {
    const quadrant: Quadrant = mallocQuadrant();

    for (let y_delta: Index = 0; y_delta < QUADRANT_SIZE; y_delta++) {
      for (let x_delta: Index = 0; x_delta < QUADRANT_SIZE; x_delta++) {
        quadrant[y_delta][x_delta] = input[input_start_y + y_delta][input_start_x + x_delta];
      }
    }
    return quadrant;
  }

  const quadrants: Quadrants = [];
  const maxQuadrantIndex = gridSize / QUADRANT_SIZE;

  for (let quadrantYIndex: Index = 0; quadrantYIndex < maxQuadrantIndex; quadrantYIndex++) {
    const input_start_y: YCoord = quadrantYIndex * QUADRANT_SIZE;
    for (let quadrantXIndex: Index = 0; quadrantXIndex < maxQuadrantIndex; quadrantXIndex++) {
      const input_start_x: XCoord = quadrantXIndex * QUADRANT_SIZE;
      quadrants.push(getCurrentQuadrant(input_start_x, input_start_y));
    }
  }
  return quadrants;
}
