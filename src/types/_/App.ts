export type QuadrantSize = number;
export type GridSize = number;

export type EmptySudokuCell = "x";
export type FilledSudokuCell = number;
export type SudokuCellElement = EmptySudokuCell | FilledSudokuCell;

export type UnstrictSudokuEntries = string[];
export type StrictSudokuEntry = SudokuCellElement[];
export type StrictSudokuEntries = StrictSudokuEntry[];

export type Quadrant = StrictSudokuEntries;
export type Quadrants = Quadrant[];
export type QuadrantsSets = Set<FilledSudokuCell>[];
export type QuadrantId = number;
export type IllegalQuadrantsArchive = Set<QuadrantId>;
export type UnsafeCheckerMemoryValues = QuadrantId[];
export type SafeCheckerMemoryValues = Set<QuadrantId>;
export type CheckerMemory = Record<FilledSudokuCell, SafeCheckerMemoryValues | UnsafeCheckerMemoryValues>;

export type ErrorCtx = boolean;
export type XCoord = number;
export type YCoord = number;
export type Index = number;

export type VerboseMode = boolean;
export type LegalFinalOutput = "legal";
export type IllegalFinalOutput = string;
export type FinalOutput = LegalFinalOutput | IllegalFinalOutput;

export type Config = {
  DEFAULT_GRID_SIZE: GridSize;
  DEFAULT_QUADRANT_SIZE: QuadrantSize;
  DEFAULT_VERBOSE_MODE: VerboseMode;
};

export type ProgramOptions = Partial<{
  gridSize: GridSize;
  quadrantSize: QuadrantSize;
  isVerbose: VerboseMode;
}>;

export type BuiltProgramOptions = [GridSize, QuadrantSize, VerboseMode];

export type MutateValuesEffect = void;
