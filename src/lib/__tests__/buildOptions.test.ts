import { config } from '@/config';
import buildOptions from '../buildOptions';

const { DEFAULT_GRID_SIZE, DEFAULT_VERBOSE_MODE } = config;

describe('buildOptions', () => {
  it('should pass, given no input and expecting the valid default output', () => {
    expect(buildOptions()).toStrictEqual([DEFAULT_GRID_SIZE, DEFAULT_VERBOSE_MODE]);
  });

  it('should pass, given a partial input and expecting the valid output', () => {
    const gridSize = 9;
    expect(
      buildOptions({
        gridSize
      })
    ).toStrictEqual([gridSize, DEFAULT_VERBOSE_MODE]);
  });

  it('should pass, given a partial input and expecting the valid output', () => {
    const isVerbose = false;
    expect(
      buildOptions({
        isVerbose
      })
    ).toStrictEqual([DEFAULT_GRID_SIZE, isVerbose]);
  });

  it('should pass, given a full input and expecting the valid output', () => {
    const gridSize = 6;
    const isVerbose = false;
    expect(
      buildOptions({
        isVerbose,
        gridSize
      })
    ).toStrictEqual([gridSize, isVerbose]);
  });
});
