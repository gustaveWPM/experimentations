# Kata - Sudoku grid validation

Passing a _Sudoku_ grid as a `string[]`, like:

<!-- prettier-ignore -->
```ts
[
  "x,x,x,  1,2,3,  x,x,x",
  "x,x,x,  4,5,6,  x,x,x",
  "x,x,x,  7,8,9,  x,x,x",

  "x,x,x,  x,x,x,  x,x,x",
  "x,x,x,  x,x,x,  x,x,x",
  "x,x,x,  x,x,x,  x,x,x",

  "3,2,1,  x,x,x,  9,8,7",
  "7,8,9,  x,x,x,  4,5,6",
  "6,5,4,  x,x,x,  3,2,1",
]
```

Where:

- `x` is an empty cell.

The program must evaluate the grid, then return a `string` result.

- If the grid is valid:

  - returns `'legal'`

- Otherwise:
  - returns a string, as: `'1,2,4,8'`.
  - where `1`, `2`, `4`, `8` are the IDs of the invalid quadrants, ASC sorted.

## Workflow

This project is built with a super mega cool workflow, you should give a look to its:

- [`package.json` file](/package.json)
- [`webpack.config.cjs` file](/webpack.config.cjs)
- [_husky_ hooks](/.husky)
- [_ts-prune_ hotfix](/.ts-prune)

It's a tad more captivating than a downright silly kata, as it might come in handy for your real-world projects too!

## Insights

<div align="center">
  <h3>Stress test (1 million random 9x9 grids)</h3>

  <table>
    <tr>
      <td><code>bundle.js</code> generated file</td>
      <td><code>ts-node</code> script, using <em>bun</em>'s <em>TypeScript</em> runtime</td>
    </tr>
    <tr>
      <td>~34.85156s seconds</td>
      <td>~24.69157s seconds</td>
    </tr>
    <tr>
      <td>~34.8µs per grid</td>
      <td>~24.6µs per grid</td>
    </tr>
  </table>
  <em>(Benchmarked with a poor <strong>Intel i3-10110U (4) @ 4.100GHz</strong>, and <strong>7675MiB of RAM</strong>.)</em>
</div>

---

<div align="center">
  <h3>Coverage</h3>

  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>% Funcs</th>
        <th>% Lines</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>All files</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/config/_/config.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/config/index.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/core/app.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/core/checkers.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/errors/FailedToInitialize.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/errors/InvalidCellValue.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/errors/InvalidGridSize.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/errors/InvalidRowLength.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/errors/MissingRows.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/lib/buildOptions.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/lib/buildQuadrants.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/lib/convert.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/lib/dumpQuadrant.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/lib/validators.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
      <tr>
        <td>src/utils/emptyCell.ts</td>
        <td>100.00</td>
        <td>100.00</td>
      </tr>
    </tbody>
  </table>
</div>

## Tips for getting the most out of this project

Try:

- [bun](https://bun.sh/)
- [SWC minification with webpack](https://webpack.js.org/plugins/terser-webpack-plugin/#swc)
- [this ts-prune wrapper](https://github.com/gustaveWPM/ts-prune-with-false-positives-handling)

Read:

- [`package.json` file ("scripts" section)](/package.json)

## Bonus

- Handling _n_ x _n_ grid sizes

## ToDo

- Handling _n_ quadrant sizes (maybe one day!)
