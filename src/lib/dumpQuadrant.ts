import type { Quadrant } from '@/types';
import { EMPTY_CELL } from '@/utils/emptyCell';

const dumpQuadrant = (quadrant: Quadrant) =>
  quadrant.forEach((row) => console.error(JSON.stringify(row).split(`"${EMPTY_CELL}"`).join('_').replace(/,/g, ', ')));

export default dumpQuadrant;
