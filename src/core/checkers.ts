import { fromPointToQuadrantId, quadrantsToSets, toAsc } from "@/lib/convert";
import dumpQuadrant from "@/lib/dumpQuadrant";
import type {
  CheckerMemory,
  ErrorCtx,
  FilledSudokuCell,
  FinalOutput,
  GridSize,
  IllegalFinalOutput,
  IllegalQuadrantsArchive,
  Index,
  LegalFinalOutput,
  MaybeUndefined,
  MutateValuesEffect,
  Quadrant,
  QuadrantId,
  QuadrantSize,
  Quadrants,
  QuadrantsSets,
  SafeCheckerMemoryValues,
  StrictSudokuEntries,
  UnsafeCheckerMemoryValues,
  VerboseMode,
  XCoord,
  YCoord,
} from "@/types";
import { EMPTY_CELL } from "@/utils/emptyCell";

const mallocValuesOccurrencesMemory = (gridSize: GridSize, isVerbose: VerboseMode): CheckerMemory =>
  Array.from({ length: gridSize }, (_, i) => i + 1).reduce((memory, cellValue) => {
    memory[cellValue] = isVerbose ? new Set<QuadrantId>() : [];
    return memory;
  }, {} as CheckerMemory);

export function isInvalidQuadrant(quadrant: Quadrant) {
  const filteredQuadrant = quadrant.flat().filter((cell) => cell !== EMPTY_CELL) as FilledSudokuCell[];
  const filteredQuadrantAsSet = new Set<FilledSudokuCell>(filteredQuadrant);

  return filteredQuadrant.length !== filteredQuadrantAsSet.size;
}

function populateIllegalQuadrantsArchivesWithMemory(
  memory: CheckerMemory,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  illegalQuadrantsArchive2: MaybeUndefined<IllegalQuadrantsArchive>,
  gridSize: GridSize,
  isVerbose: VerboseMode,
): MutateValuesEffect {
  for (let i: FilledSudokuCell = 1; i <= gridSize; i++) {
    if ((!isVerbose && (memory[i] as UnsafeCheckerMemoryValues).length > 1) || (isVerbose && (memory[i] as SafeCheckerMemoryValues).size > 1)) {
      for (const quadrantId of memory[i]) {
        illegalQuadrantsArchive.add(quadrantId);
        if (isVerbose) (illegalQuadrantsArchive2 as IllegalQuadrantsArchive).add(quadrantId);
      }
    }
  }
}

function dumpError(describe: string, quadrants: Quadrants, illegalQuadrantsArchive2: IllegalQuadrantsArchive) {
  function dumpInvalidQuadrants() {
    const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2);
    const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;
    if (!errorCtx) return;

    const lastId: QuadrantId = illegalQuadrantsIds[illegalQuadrantsIds.length - 1];

    for (const id of illegalQuadrantsIds) {
      const i = id - 1;
      console.error(`${describe}, id: ${id}`);
      dumpQuadrant(quadrants[i]);
      if (id !== lastId) console.error();
    }
    console.error();
  }

  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;

  if (errorCtx) dumpInvalidQuadrants();
}

async function checkQuadrants(
  quadrants: Quadrants,
  quadrantsSets: QuadrantsSets,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  isVerbose: VerboseMode,
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: MaybeUndefined<IllegalQuadrantsArchive> = isVerbose ? new Set<QuadrantId>() : undefined;

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
  const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;

  if (errorCtx) {
    dumpError("INVALID QUADRANT (contains the same element twice)", quadrants, illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  }
}

async function checkRows(
  input: StrictSudokuEntries,
  gridSize: GridSize,
  quadrantSize: QuadrantSize,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  isVerbose: VerboseMode,
  quadrants: Quadrants,
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: MaybeUndefined<IllegalQuadrantsArchive> = isVerbose ? new Set<QuadrantId>() : undefined;

  for (let y: YCoord = 0; y < gridSize; y++) {
    const rowMemory: CheckerMemory = mallocValuesOccurrencesMemory(gridSize, isVerbose);

    for (let x: XCoord = 0; x < gridSize; x++) {
      const cellValue = input[y][x];
      if (cellValue === EMPTY_CELL) continue;
      const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize, quadrantSize);
      if (!isVerbose) (rowMemory[cellValue] as UnsafeCheckerMemoryValues).push(quadrantId);
      else (rowMemory[cellValue] as SafeCheckerMemoryValues).add(quadrantId);
    }

    populateIllegalQuadrantsArchivesWithMemory(rowMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, gridSize, isVerbose);
  }

  if (!isVerbose) return;

  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;

  if (errorCtx) {
    dumpError(
      "INVALID QUADRANT (contains an element which is also in an another quadrant, in the same row)",
      quadrants,
      illegalQuadrantsArchive2 as IllegalQuadrantsArchive,
    );
  }
}

async function checkColumns(
  input: StrictSudokuEntries,
  gridSize: GridSize,
  quadrantSize: QuadrantSize,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  isVerbose: VerboseMode,
  quadrants: Quadrants,
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: MaybeUndefined<IllegalQuadrantsArchive> = isVerbose ? new Set<QuadrantId>() : undefined;

  for (let x: XCoord = 0; x < gridSize; x++) {
    const columnMemory: CheckerMemory = mallocValuesOccurrencesMemory(gridSize, isVerbose);

    for (let y: YCoord = 0; y < input.length; y++) {
      const cellValue = input[y][x];
      if (cellValue === EMPTY_CELL) continue;
      const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize, quadrantSize);
      if (!isVerbose) (columnMemory[cellValue] as UnsafeCheckerMemoryValues).push(quadrantId);
      else (columnMemory[cellValue] as SafeCheckerMemoryValues).add(quadrantId);
    }

    populateIllegalQuadrantsArchivesWithMemory(columnMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, gridSize, isVerbose);
  }

  if (!isVerbose) return;

  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;

  if (errorCtx) {
    dumpError(
      "INVALID QUADRANT (contains an element which is also in an another quadrant, in the same column)",
      quadrants,
      illegalQuadrantsArchive2 as IllegalQuadrantsArchive,
    );
  }
}

async function checkDiagonalFromTopLeftToBottomRight(
  input: StrictSudokuEntries,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  gridSize: GridSize,
  quadrantSize: QuadrantSize,
  isVerbose: VerboseMode,
  quadrants: Quadrants,
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: MaybeUndefined<IllegalQuadrantsArchive> = isVerbose ? new Set<QuadrantId>() : undefined;
  const diagonalMemory: CheckerMemory = mallocValuesOccurrencesMemory(gridSize, isVerbose);

  for (let x: XCoord = 0, y: YCoord = 0; y < gridSize; x++, y++) {
    const cellValue = input[y][x];
    if (cellValue === EMPTY_CELL) continue;
    const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize, quadrantSize);
    if (!isVerbose) (diagonalMemory[cellValue] as UnsafeCheckerMemoryValues).push(quadrantId);
    else (diagonalMemory[cellValue] as SafeCheckerMemoryValues).add(quadrantId);
  }

  populateIllegalQuadrantsArchivesWithMemory(diagonalMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, gridSize, isVerbose);

  if (!isVerbose) return;

  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;

  if (errorCtx) {
    dumpError(
      "INVALID QUADRANT (duplicate value in the top left to bottom right diagonal)",
      quadrants,
      illegalQuadrantsArchive2 as IllegalQuadrantsArchive,
    );
  }
}

async function checkDiagonalFromBottomLeftToTopRight(
  input: StrictSudokuEntries,
  illegalQuadrantsArchive: IllegalQuadrantsArchive,
  gridSize: GridSize,
  quadrantSize: QuadrantSize,
  isVerbose: VerboseMode,
  quadrants: Quadrants,
): Promise<MutateValuesEffect> {
  const illegalQuadrantsArchive2: MaybeUndefined<IllegalQuadrantsArchive> = isVerbose ? new Set<QuadrantId>() : undefined;
  const diagonalMemory: CheckerMemory = mallocValuesOccurrencesMemory(gridSize, isVerbose);

  for (let x: XCoord = gridSize - 1, y: YCoord = 0; y < gridSize; x--, y++) {
    const cellValue = input[y][x];
    if (cellValue === EMPTY_CELL) continue;
    const quadrantId: QuadrantId = fromPointToQuadrantId(x, y, gridSize, quadrantSize);
    if (!isVerbose) (diagonalMemory[cellValue] as UnsafeCheckerMemoryValues).push(quadrantId);
    else (diagonalMemory[cellValue] as SafeCheckerMemoryValues).add(quadrantId);
  }

  populateIllegalQuadrantsArchivesWithMemory(diagonalMemory, illegalQuadrantsArchive, illegalQuadrantsArchive2, gridSize, isVerbose);

  if (!isVerbose) return;

  const illegalQuadrantsIds: QuadrantId[] = Array.from(illegalQuadrantsArchive2 as IllegalQuadrantsArchive);
  const errorCtx: ErrorCtx = illegalQuadrantsIds.length > 0;

  if (errorCtx) {
    dumpError(
      "INVALID QUADRANT (duplicate value in the bottom left to top right diagonal)",
      quadrants,
      illegalQuadrantsArchive2 as IllegalQuadrantsArchive,
    );
  }
}

async function checkGrid(
  input: StrictSudokuEntries,
  quadrants: Quadrants,
  gridSize: GridSize,
  quadrantSize: QuadrantSize,
  isVerbose: VerboseMode,
): Promise<FinalOutput> {
  const sharedIllegalQuadrantsArchive: IllegalQuadrantsArchive = new Set<QuadrantId>();
  const quadrantsSets = quadrantsToSets(quadrants);

  const tasks = [
    checkQuadrants(quadrants, quadrantsSets, sharedIllegalQuadrantsArchive, isVerbose),
    checkRows(input, gridSize, quadrantSize, sharedIllegalQuadrantsArchive, isVerbose, quadrants),
    checkColumns(input, gridSize, quadrantSize, sharedIllegalQuadrantsArchive, isVerbose, quadrants),
    checkDiagonalFromTopLeftToBottomRight(input, sharedIllegalQuadrantsArchive, gridSize, quadrantSize, isVerbose, quadrants),
    checkDiagonalFromBottomLeftToTopRight(input, sharedIllegalQuadrantsArchive, gridSize, quadrantSize, isVerbose, quadrants),
  ];

  await Promise.all(tasks);

  if (sharedIllegalQuadrantsArchive.size === 0) return "legal" as LegalFinalOutput;

  const illegalStatement: IllegalFinalOutput = toAsc(Array.from(sharedIllegalQuadrantsArchive)).join(",");
  return illegalStatement;
}

export default checkGrid;
