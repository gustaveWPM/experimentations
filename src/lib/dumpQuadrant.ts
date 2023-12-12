import type { Quadrant } from "@/types";
import { EMPTY_CELL } from "@/utils/emptyCell";

function dumpQuadrant(quadrant: Quadrant) {
  for (const row of quadrant) {
    console.error(JSON.stringify(row).split(`"${EMPTY_CELL}"`).join("_").replace(/,/g, ", "));
  }
}

export default dumpQuadrant;
