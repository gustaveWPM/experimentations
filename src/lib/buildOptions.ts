import { config } from '@/config';
import type { BuiltProgramOptions, GridSize, ProgramOptions, VerboseMode } from '@/types';

const { DEFAULT_GRID_SIZE, DEFAULT_VERBOSE_MODE } = config;

function buildOptions(
  options: ProgramOptions = {
    gridSize: DEFAULT_GRID_SIZE,
    isVerbose: DEFAULT_VERBOSE_MODE
  }
): BuiltProgramOptions {
  const gridSize: GridSize = options.gridSize ?? DEFAULT_GRID_SIZE;
  const isVerbose: VerboseMode = options.isVerbose ?? DEFAULT_VERBOSE_MODE;

  return [gridSize, isVerbose];
}

export default buildOptions;
