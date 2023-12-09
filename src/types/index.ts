import type { Tuple } from '@/types/utils';

type QuadrantSize = 3;
export type GridSize = number;

export type EmptySudokuCell = 'x';
export type FilledSudokuCell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SudokuCellElement = EmptySudokuCell | FilledSudokuCell;

export type UnstrictSudokuEntries = string[];
export type StrictSudokuEntry = SudokuCellElement[];
export type StrictSudokuEntries = StrictSudokuEntry[];

export type Quadrant = StrictSudokuEntries;
export type Quadrants = Quadrant[];
export type QuadrantsSets = Set<FilledSudokuCell>[];
export type QuadrantId = number;
export type IllegalQuadrantsArchive = Set<QuadrantId>;

export type XCoord = number;
export type YCoord = number;
export type Index = number;

export type VerboseMode = boolean;
export type LegalFinalOutput = 'legal';
export type IllegalFinalOutput = string;
export type FinalOutput = LegalFinalOutput | IllegalFinalOutput;

export type Config = {
  DEFAULT_GRID_SIZE: 9;
  QUADRANT_SIZE: QuadrantSize;
  DEFAULT_VERBOSE_MODE: VerboseMode;
};

export type ProgramOptions = Partial<{
  gridSize: GridSize;
  isVerbose: VerboseMode;
}>;

export type BuiltProgramOptions = Tuple<GridSize, VerboseMode>;

export type MutateValuesEffect = void;
