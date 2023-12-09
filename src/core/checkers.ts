import { MAX_CELL_VALUE } from '@/config/constants';
import { fromPointToQuadrantId, quadrantsToSets, toAsc } from '@/lib/convert';
import dumpQuadrant from '@/lib/dumpQuadrant';
import type {
  FilledSudokuCell,
  FinalOutput,
  GridSize,
  IllegalFinalOutput,
  IllegalQuadrantsArchive,
  Index,
  LegalFinalOutput,
  MutateValuesEffect,
  Quadrant,
  QuadrantId,
  Quadrants,
  QuadrantsSets,
  StrictSudokuEntries,
  VerboseMode,
  XCoord,
  YCoord
} from '@/types';
import { EMPTY_CELL } from '@/utils/emptyCell';

const mallocValuesOccurrencesMemory: () => Record<FilledSudokuCell, QuadrantId[]> = () =>
  Array.from({ length: MAX_CELL_VALUE }, (_, i) => i + 1).reduce(
    (acc, val) => {
      acc[val as FilledSudokuCell] = [];
      return acc;
    },
    {} as Record<FilledSudokuCell, QuadrantId[]>
  );

export function isInvalidQuadrant(quadrant: Quadrant) {
  const filteredQuadrant = quadrant.flat().filter((cell) => cell !== EMPTY_CELL) as FilledSudokuCell[];
  const filteredQuadrantAsSet = new Set<FilledSudokuCell>(filteredQuadrant);

  return filteredQuadrant.length !== filteredQuadrantAsSet.size;
}

function populateIllegalQuadrantsArchivesWithMemory(
  memory: Record<FilledSudokuCell, QuadrantId[]>,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  illegalQuadrantsArchive2: IllegalQuadrantsArchive | undefined,
  isVerbose: VerboseMode
): MutateValuesEffect {
  for (let i: FilledSudokuCell = 1; i <= MAX_CELL_VALUE; i++) {
    if (memory[i as FilledSudokuCell].length > 1) {
      for (const quadrantId of memory[i as FilledSudokuCell]) {
        illegalQuadrantsArchive.add(quadrantId);
        if (isVerbose) (illegalQuadrantsArchive2 as IllegalQuadrantsArchive).add(quadrantId);
      }
    }
  }
}

function processDump(describe: string, quadrants: Quadrants, illegalQuadrantsArchive2: IllegalQuadrantsArchive) {
  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2);
  const errorCtx = illegalQuadrantsIds.length > 0;
  if (!errorCtx) return;

  const lastId: QuadrantId = illegalQuadrantsIds[illegalQuadrantsIds.length - 1];

  for (const id of illegalQuadrantsIds) {
    const i = id - 1;
    console.warn(`${describe}: ${id}`);
    dumpQuadrant(quadrants[i]);
    if (id !== lastId) console.warn();
  }
  console.log();
}

async function checkQuadrants(
  quadrants: Quadrants,
  quadrantsSets: QuadrantsSets,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  isVerbose: VerboseMode
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: IllegalQuadrantsArchive | undefined = isVerbose ? new Set<QuadrantId>() : undefined;

  for (let i: Index = 0; i < quadrants.length; i++) {
    const curQuadrantFiltered = quadrants[i].flat().filter((cell) => cell !== EMPTY_CELL) as FilledSudokuCell[];

    if (curQuadrantFiltered.length !== quadrantsSets[i].size) {
      const id: QuadrantId = i + 1;
      illegalQuadrantsArchive.add(id);
      if (isVerbose) (illegalQuadrantsArchive2 as IllegalQuadrantsArchive).add(id);
    }
  }

  // @ts-ignore - mfree
  quadrantsSets = undefined;

  if (!isVerbose) return;

  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  const errorCtx = illegalQuadrantsIds.length > 0;
  const lastId: QuadrantId = errorCtx ? illegalQuadrantsIds[illegalQuadrantsIds.length - 1] : -1;

  for (const id of illegalQuadrantsIds) {
    const i = id - 1;
    console.warn(`INVALID QUADRANT (contains the same element twice): ${id}`);
    dumpQuadrant(quadrants[i]);
    if (id !== lastId) console.warn();
  }
  if (errorCtx) console.log();
  console.log('... checkInvalidQuadrants done.' + '\n');
}

async function checkRows(
  input: StrictSudokuEntries,
  gridSize: GridSize,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  isVerbose: VerboseMode,
  quadrants: Quadrants
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: IllegalQuadrantsArchive | undefined = isVerbose ? new Set<QuadrantId>() : undefined;

  for (let y: YCoord = 0; y < gridSize; y++) {
    const rowMemory: Record<FilledSudokuCell, QuadrantId[]> = mallocValuesOccurrencesMemory();

    for (let x: XCoord = 0; x < gridSize; x++) {
      const cellValue = input[y][x];
      if (cellValue === EMPTY_CELL) continue;
      const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize);
      rowMemory[cellValue].push(quadrantId);
    }

    populateIllegalQuadrantsArchivesWithMemory(rowMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, isVerbose);
  }

  if (!isVerbose) return;

  processDump(
    'INVALID QUADRANT (contains an element which is also in an another quadrant, in the same row)',
    quadrants,
    illegalQuadrantsArchive2 as IllegalQuadrantsArchive
  );
  console.log('... checkRows done.' + '\n');
}

async function checkColumns(
  input: StrictSudokuEntries,
  gridSize: GridSize,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  isVerbose: VerboseMode,
  quadrants: Quadrants
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: IllegalQuadrantsArchive | undefined = isVerbose ? new Set<QuadrantId>() : undefined;

  for (let x: XCoord = 0; x < gridSize; x++) {
    const columnMemory: Record<FilledSudokuCell, QuadrantId[]> = mallocValuesOccurrencesMemory();

    for (let y: YCoord = 0; y < input.length; y++) {
      const cellValue = input[y][x];
      if (cellValue === EMPTY_CELL) continue;
      const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize);
      columnMemory[cellValue].push(quadrantId);
    }

    populateIllegalQuadrantsArchivesWithMemory(columnMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, isVerbose);
  }

  if (!isVerbose) return;

  processDump(
    'INVALID QUADRANT (contains an element which is also in an another quadrant, in the same column)',
    quadrants,
    illegalQuadrantsArchive2 as IllegalQuadrantsArchive
  );
  console.log('... checkColumns done.' + '\n');
}

async function checkDiagonalFromTopLeftToBottomRight(
  input: StrictSudokuEntries,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  gridSize: GridSize,
  isVerbose: VerboseMode,
  quadrants: Quadrants
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: IllegalQuadrantsArchive | undefined = isVerbose ? new Set<QuadrantId>() : undefined;
  const diagonalMemory: Record<FilledSudokuCell, QuadrantId[]> = mallocValuesOccurrencesMemory();

  for (let x: XCoord = 0, y: YCoord = 0; y < gridSize; x++, y++) {
    const cellValue = input[y][x];
    if (cellValue === EMPTY_CELL) continue;
    const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize);
    diagonalMemory[cellValue].push(quadrantId);
  }

  populateIllegalQuadrantsArchivesWithMemory(diagonalMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, isVerbose);

  if (!isVerbose) return;

  processDump(
    'INVALID QUADRANT (duplicate value in the top left to bottom right diagonal)',
    quadrants,
    illegalQuadrantsArchive2 as IllegalQuadrantsArchive
  );
  console.log('... checkDiagonalFromTopLeftToBottomRight done.' + '\n');
}

async function checkDiagonalFromBottomLeftToTopRight(
  input: StrictSudokuEntries,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  gridSize: GridSize,
  isVerbose: VerboseMode,
  quadrants: Quadrants
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: IllegalQuadrantsArchive | undefined = isVerbose ? new Set<QuadrantId>() : undefined;
  const diagonalMemory: Record<FilledSudokuCell, QuadrantId[]> = mallocValuesOccurrencesMemory();

  for (let x: XCoord = gridSize - 1, y: YCoord = 0; y < gridSize; x--, y++) {
    const cellValue = input[y][x];
    if (cellValue === EMPTY_CELL) continue;
    const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize);
    diagonalMemory[cellValue].push(quadrantId);
  }

  populateIllegalQuadrantsArchivesWithMemory(diagonalMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, isVerbose);

  if (!isVerbose) return;

  processDump(
    'INVALID QUADRANT (duplicate value in the bottom left to top right diagonal)',
    quadrants,
    illegalQuadrantsArchive2 as IllegalQuadrantsArchive
  );
  console.log('... checkDiagonalFromBottomLeftToTopRight done.' + '\n');
}

async function checkGrid(input: StrictSudokuEntries, quadrants: Quadrants, gridSize: GridSize, isVerbose: VerboseMode): Promise<FinalOutput> {
  const illegalQuadrantsArchive = new Set<QuadrantId>();
  const quadrantsSets = quadrantsToSets(quadrants);

  const tasks = [
    checkQuadrants(quadrants, quadrantsSets, illegalQuadrantsArchive, isVerbose),
    checkRows(input, gridSize, illegalQuadrantsArchive, isVerbose, quadrants),
    checkColumns(input, gridSize, illegalQuadrantsArchive, isVerbose, quadrants),
    checkDiagonalFromTopLeftToBottomRight(input, illegalQuadrantsArchive, gridSize, isVerbose, quadrants),
    checkDiagonalFromBottomLeftToTopRight(input, illegalQuadrantsArchive, gridSize, isVerbose, quadrants)
  ];

  await Promise.all(tasks);

  if (illegalQuadrantsArchive.size === 0) return 'legal' as LegalFinalOutput;

  const illegalStatement: IllegalFinalOutput = toAsc(Array.from(illegalQuadrantsArchive)).join(',');
  return illegalStatement;
}

export default checkGrid;
