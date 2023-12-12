import FailedToInitializeError from "@/errors/FailedToInitialize";
import buildOptions from "@/lib/buildOptions";
import { buildQuadrants } from "@/lib/buildQuadrants";
import { toStrict } from "@/lib/convert";
import { throwIfInvalidCellValue, throwIfInvalidConfig, throwIfInvalidGridSize, throwIfInvalidRowsLength } from "@/lib/validators";
import type { FinalOutput, GridSize, ProgramOptions, Quadrants, StrictSudokuEntries, UnstrictSudokuEntries, VerboseMode } from "@/types";
import checkGrid from "./checkers";

async function processGrid(input: StrictSudokuEntries, gridSize: GridSize, isVerbose: VerboseMode): Promise<FinalOutput> {
  const quadrants: Quadrants = buildQuadrants(input, gridSize);
  const finalOutput: FinalOutput = await checkGrid(input, quadrants, gridSize, isVerbose);
  return finalOutput;
}

/**
 * @throws {FailedToInitializeError}
 */
export async function unstrictSudokuKata(unstrictInput: UnstrictSudokuEntries, options?: ProgramOptions): Promise<FinalOutput> {
  const input: StrictSudokuEntries = [];
  const [gridSize, isVerbose] = buildOptions(options ?? {});

  try {
    throwIfInvalidConfig();
    input.push(...toStrict(unstrictInput, gridSize));
  } catch (error: unknown) {
    // @ts-ignore
    throw new FailedToInitializeError(error.message, error);
  }
  const finalOutput: FinalOutput = await processGrid(input, gridSize, isVerbose);
  return finalOutput;
}

/**
 * @throws {FailedToInitializeError}
 */
export async function strictSudokuKata(input: StrictSudokuEntries, options?: ProgramOptions): Promise<FinalOutput> {
  const [gridSize, isVerbose] = buildOptions(options ?? {});

  try {
    throwIfInvalidConfig();
    throwIfInvalidGridSize(gridSize);
    throwIfInvalidRowsLength(input, gridSize);
    throwIfInvalidCellValue(input, gridSize);
  } catch (error: unknown) {
    // @ts-ignore
    throw new FailedToInitializeError(error.message, error);
  }

  const finalOutput: FinalOutput = await processGrid(input, gridSize, isVerbose);
  return finalOutput;
}
