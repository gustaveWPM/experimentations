import { config } from "@/config";
import type { BuiltProgramOptions, GridSize, ProgramOptions, VerboseMode } from "@/types";

const { DEFAULT_GRID_SIZE, DEFAULT_VERBOSE_MODE, DEFAULT_QUADRANT_SIZE } = config;

function buildOptions(
  options: ProgramOptions = {
    gridSize: DEFAULT_GRID_SIZE,
    quadrantSize: DEFAULT_QUADRANT_SIZE,
    isVerbose: DEFAULT_VERBOSE_MODE,
  },
): BuiltProgramOptions {
  const gridSize: GridSize = options.gridSize ?? DEFAULT_GRID_SIZE;
  const quadrantSize: GridSize = options.quadrantSize ?? DEFAULT_QUADRANT_SIZE;
  const isVerbose: VerboseMode = options.isVerbose ?? DEFAULT_VERBOSE_MODE;

  return [gridSize, quadrantSize, isVerbose];
}

export default buildOptions;
