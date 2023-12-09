import { EMPTY_CELL as _ } from '@/utils/emptyCell';
import { isInvalidQuadrant } from '../checkers';

describe('isInvalidQuadrant', () => {
  it('should pass, given an invalid quadrant and expecting the function to return true', () => {
    expect(
      // prettier-ignore
      isInvalidQuadrant([
        [_, _, _], [_, _, _], [_, 1, _],
        [_, 1, _], [_, _, _], [_, _, _],
        [_, _, _], [_, _, _], [_, _, _]
      ])
    ).toBe(true);
  });

  it('should pass, given a valid quadrant and expecting the function to return false', () => {
    expect(
      // prettier-ignore
      isInvalidQuadrant([
        [_, _, _], [_, _, _], [_, 1, _],
        [_, 2, _], [_, _, _], [_, _, _],
        [_, _, _], [_, _, _], [_, _, _]
      ])
    ).toBe(false);
  });
});
