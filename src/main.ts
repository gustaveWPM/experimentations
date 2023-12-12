import { strictSudokuKata } from "@/core/app";
import type { FilledSudokuCell, MaybeUndefined, VerboseMode } from "@/types";

const isVerbose: VerboseMode = false;
const doBenchmark = true;
const doStressTest = false;

const startTime: MaybeUndefined<number> = doBenchmark ? performance.now() : undefined;

async function stressMe() {
  const v = (): FilledSudokuCell => Math.floor(Math.random() * 9) + 1;
  for (let stress = 0; stress < 1_000_000; stress++) {
    await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
          [v(), v(), v(),  v(), v(), v(),  v(), v(), v()],
        ],
      { isVerbose },
    );
  }
}

async function runMe() {
  console.log(
    await strictSudokuKata(
      // biome-ignore format: the array should not be formatted
      [
        [5, 8, 1, 4, 2, 7, 6, 9, 3],
        [3, 7, 4, 5, 9, 6, 8, 1, 2],
        [9, 6, 2, 1, 3, 8, 4, 7, 5],

        [6, 2, 9, 3, 8, 5, 7, 4, 1],
        [1, 5, 7, 9, 6, 4, 3, 2, 8],
        [8, 4, 3, 2, 7, 1, 5, 6, 9],

        [4, 1, 8, 7, 5, 2, 9, 3, 6],
        [2, 9, 5, 6, 4, 3, 1, 8, 7],
        [7, 3, 6, 8, 1, 9, 2, 5, 4],
      ],
      { isVerbose },
    ),
  );

  if (doStressTest) await stressMe();

  if (!doBenchmark) return;

  const benchmark = (startTime: number, endTime: number = performance.now()) => {
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(5);
    console.log(`Done in: ~${elapsedTime}s`);
  };

  benchmark(startTime as number);
}

runMe();
