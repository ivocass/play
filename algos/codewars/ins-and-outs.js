/**
 * Improvements:
 * -when building the solution (at the end of insAndOuts()), I could've used loop().
 * -this passed all the tests, but it might fail with a random test if the conditions
 * are right. to make it work perfectly, a solution would be:
 * 1) compress the oItems. if some still remain, make them "infect" neighboring E and O
 * items (except diagonally).
 * 2) for every new item infected, check if it's next to the outside. if so, compress those
 * infected items so that they're all outside.
 * 3) repeat for every oItem still inside.
 * 4) when no oItems remain, compress eItems.
 */

const surround = (matrix, w, h) => {
  const firstRow = matrix[0];
  const lastRow = matrix[matrix.length - 1];

  firstRow.forEach((val, i) => {
    firstRow[i] = lastRow[i] = '-';
  });

  matrix.forEach((row) => {
    row[0] = '-';
    row[row.length - 1] = '-';
  });
};

const cornerBottomRight = [' ', ' ', '-', ' ', 'X', '-', '-', '-', '-'];
const cornerBottomLeft = ['-', ' ', ' ', '-', 'X', ' ', '-', '-', '-'];
const cornerTopRight = ['-', '-', '-', ' ', 'X', '-', ' ', ' ', '-'];
const cornerTopLeft = ['-', '-', '-', '-', 'X', ' ', '-', ' ', ' '];
const leftLine = ['-', ' ', ' ', '-', 'X', ' ', '-', ' ', ' '];
const topLine = ['-', '-', '-', ' ', 'X', ' ', ' ', ' ', ' '];
const rightLine = [' ', ' ', '-', ' ', 'X', '-', ' ', ' ', '-'];
const bottomLine = [' ', ' ', ' ', ' ', 'X', ' ', '-', '-', '-'];
const leftOpening = ['-', '-', '-', ' ', 'X', '-', '-', '-', '-'];
const topOpening = ['-', ' ', '-', '-', 'X', '-', '-', '-', '-'];
const rightOpening = ['-', '-', '-', '-', 'X', ' ', '-', '-', '-'];
const bottomOpening = ['-', '-', '-', '-', 'X', '-', '-', ' ', '-'];

// patterns and their anti-patterns
const patterns = [
  [cornerBottomRight, cornerTopLeft],
  [cornerBottomLeft, cornerTopRight],
  [cornerTopLeft, cornerBottomRight],
  [cornerTopRight, cornerBottomLeft],
  [leftLine, leftOpening],
  [topLine, topOpening],
  [rightLine, rightOpening],
  [bottomLine, bottomOpening],
  [leftOpening, leftLine],
  [topOpening, topLine],
  [rightOpening, rightLine],
  [bottomOpening, bottomLine],
];

const getAntiPattern = (miniMatrix) => {
  for (let i = 0; i < patterns.length; i++) {
    const duo = patterns[i];

    if (duo[0].every((a, idx) => a === miniMatrix[idx])) {
      return duo[1];
    }
  }

  return null;
};

// @x, @y: the location of 'E' or 'O'
const applyAntiPattern = (matrix, x, y, antiPattern) => {
  // top row
  matrix[y - 1][x - 1] = antiPattern[0];
  matrix[y - 1][x] = antiPattern[1];
  matrix[y - 1][x + 1] = antiPattern[2];

  // middle row
  matrix[y][x - 1] = antiPattern[3];
  // matrix[y][x] = 'E' or 'O';
  matrix[y][x + 1] = antiPattern[5];

  // bottom row
  matrix[y + 1][x - 1] = antiPattern[6];
  matrix[y + 1][x] = antiPattern[7];
  matrix[y + 1][x + 1] = antiPattern[8];
};

const loop = (matrix, w, h, callback) => {
  // traverse left to right for each row
  for (let y = 0; y < h; y++) {
    const row = matrix[y];

    for (let x = 0; x < w; x++) {
      const item = row[x];

      callback(item, x, y);
    }
  }
};

const compressItem = (matrix, x, y) => {
  const miniMatrix = [
    // top row
    matrix[y - 1][x - 1],
    matrix[y - 1][x],
    matrix[y - 1][x + 1],

    // middle row
    matrix[y][x - 1],
    'X',
    matrix[y][x + 1],

    // bottom row
    matrix[y + 1][x - 1],
    matrix[y + 1][x],
    matrix[y + 1][x + 1],
  ];

  const antiPattern = getAntiPattern(miniMatrix);

  if (!antiPattern) return false;

  applyAntiPattern(matrix, x, y, antiPattern);

  return true;
};

const compressItems = (matrix, items, compressed) => {
  const prevLength = items.length;

  while (items.length > 0) {
    let successCount = 0;

    for (let i = items.length - 1; i > -1; i--) {
      const item = items[i];
      const success = compressItem(matrix, item.x, item.y);

      if (success) {
        successCount++;
        items.splice(i, 1);

        if (compressed) compressed.push(item);
      }
    }

    if (successCount === 0) {
      break;
    }
  }

  return prevLength - items.length;
};

const containsItem = (target, items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (target.x === item.x && target.y === item.y) {
      return true;
    }
  }

  return false;
};

const compress = (matrix, w, h) => {
  const oItems = [];
  const eItems = [];

  loop(matrix, w, h, (item, x, y) => {
    if (item === 'O') oItems.push({ x, y });
    else if (item === 'E') eItems.push({ x, y });
  });

  compressItems(matrix, oItems);

  // debugger;
  if (oItems.length > 0) {
    const compressed = [];
    const mixedItems = [];

    loop(matrix, w, h, (item, x, y) => {
      if (item === 'E') mixedItems.push({ x, y });
      else if (item === 'O' && containsItem({ x, y }, oItems)) {
        mixedItems.push({ x, y });
      }
    });

    compressItems(matrix, mixedItems, compressed);

    compressed.forEach((item) => {
      for (let i = 0; i < oItems.length; i++) {
        const oItem = oItems[i];

        if (item.x === oItem.x && item.y === oItem.y) {
          oItems.splice(i, 1);
          break;
        }
      }
    });
  } else {
    compressItems(matrix, eItems);
  }

  return oItems.length === 0;
};

const validate = (matrix, startingX, startingY) => {
  const w = matrix[0].length;
  const h = matrix.length;
  const visited = [startingX.toString() + '-' + startingY.toString()];
  const up = 'up';
  const right = 'right';
  const down = 'down';
  const left = 'left';
  let loopComplete = false;

  const directions = [right, down, left, up];
  const pos = { x: startingX, y: startingY };
  const prevPos = { x: -1, y: -1 };

  const getNextPos = (pos, direction) => {
    switch (direction) {
      case right:
        return { x: pos.x + 1, y: pos.y };

      case down:
        return { x: pos.x, y: pos.y + 1 };

      case left:
        return { x: pos.x - 1, y: pos.y };

      case up:
        return { x: pos.x, y: pos.y - 1 };
    }
  };

  while (!loopComplete) {
    let foundNextItem = false;
    let nextPos;

    // try moving one step in any direction (except diagonally) and ignore the previous position
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];

      nextPos = getNextPos(pos, direction);

      if (nextPos.x === prevPos.x && nextPos.y === prevPos.y) continue;

      const nextItem =
        matrix[nextPos.y] !== undefined
          ? matrix[nextPos.y][nextPos.x]
          : undefined;

      if (nextItem !== '-') continue;

      foundNextItem = true;

      if (nextPos.x === startingX && nextPos.y === startingY) {
        loopComplete = true;
      }

      break;
    }

    if (loopComplete) break;

    // this means we met a dead end
    if (!foundNextItem) {
      return false;
    }

    const index = nextPos.x.toString() + '-' + nextPos.y.toString();

    // the path visits and old item, so it's not a loop
    if (visited.includes(index)) {
      return false;
    }

    visited.push(index);

    prevPos.x = pos.x;
    prevPos.y = pos.y;

    pos.x = nextPos.x;
    pos.y = nextPos.y;
  }

  // if every '-' has been visited, its a proper loop
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const item = matrix[y][x];

      if (item !== '-') continue;

      const index = x.toString() + '-' + y.toString();

      if (!visited.includes(index)) {
        return false;
      }
    }
  }

  return true;
};

function insAndOuts(gamemap) {
  const matrix = gamemap
    .split('\n')
    .slice()
    .map((a) => a.split(''));
  const flatMatrix = gamemap.replace(/\n/g, '');

  const matrixOriginal = matrix.slice().map((a) => a.slice());

  const w = matrix[0].length;
  const h = matrix.length;

  let index = flatMatrix.indexOf('I');
  let startingX = index % w;
  let startingY = Math.floor(index / w) - 1;

  surround(matrix, w, h);

  const compressionResult = compress(matrix, w, h, flatMatrix);

  if (!compressionResult) {
    return '';
  }

  if (!validate(matrix, startingX, startingY)) {
    return '';
  }

  let solution = '';

  // build solution. traverse left to right for each row
  for (let y = 0; y < h; y++) {
    const row = matrix[y];

    for (let x = 0; x < row.length; x++) {
      let item = row[x];

      if (item === '-') item = '.';

      solution += item;

      if (x === row.length - 1 && y !== matrix.length - 1) solution += '\n';
    }
  }

  return solution;
}

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

let map0 =
  '       \n' +
  ' I I O \n' +
  '       \n' +
  ' O E I \n' +
  '       \n' +
  ' O I I \n' +
  '       ';
let sol0 =
  '.....  \n' +
  '.I I.O \n' +
  '... ...\n' +
  ' O.E I.\n' +
  '  .   .\n' +
  ' O.I I.\n' +
  '  .....';

let map1 =
  '       \n' +
  ' I I O \n' +
  '       \n' +
  ' O E I \n' +
  '       \n' +
  ' O I E \n' +
  '       ';
let sol1 =
  '.....  \n' +
  '.I I.O \n' +
  '... ...\n' +
  ' O.E I.\n' +
  '  . ...\n' +
  ' O.I.E \n' +
  '  ...  ';

let map2 =
  '       \n' +
  ' I I I \n' +
  '       \n' +
  ' O E I \n' +
  '       \n' +
  ' O E I \n' +
  '       ';
let sol2 =
  '.......\n' +
  '.I I I.\n' +
  '..... .\n' +
  ' O E.I.\n' +
  '    . .\n' +
  ' O E.I.\n' +
  '    ...';

let map3 =
  '       \n' +
  ' O O O \n' +
  '       \n' +
  ' O I O \n' +
  '       \n' +
  ' O O O \n' +
  '       ';
let sol3 =
  '       \n' +
  ' O O O \n' +
  '  ...  \n' +
  ' O.I.O \n' +
  '  ...  \n' +
  ' O O O \n' +
  '       ';

let map4 =
  '       \n' +
  ' O E O \n' +
  '       \n' +
  ' E I E \n' +
  '       \n' +
  ' O E O \n' +
  '       ';
let sol4 =
  '       \n' +
  ' O E O \n' +
  '  ...  \n' +
  ' E.I.E \n' +
  '  ...  \n' +
  ' O E O \n' +
  '       ';

let map5 =
  '       \n' +
  ' E E E \n' +
  '       \n' +
  ' I I I \n' +
  '       \n' +
  ' O E O \n' +
  '       ';
let sol5 =
  '       \n' +
  ' E E E \n' +
  '.......\n' +
  '.I I I.\n' +
  '.......\n' +
  ' O E O \n' +
  '       ';

let map6 =
  '       \n' +
  ' I I I \n' +
  '       \n' +
  ' E E I \n' +
  '       \n' +
  ' I I I \n' +
  '       ';
let sol6 =
  '.......\n' +
  '.I I I.\n' +
  '..... .\n' +
  ' E E.I.\n' +
  '..... .\n' +
  '.I I I.\n' +
  '.......';

let map7 =
  '           \n' +
  ' I I O I E \n' +
  '           \n' +
  ' O E I E O \n' +
  '           \n' +
  ' O I I E I \n' +
  '           \n' +
  ' O O O E E \n' +
  '           \n' +
  ' I E I I O \n' +
  '           ';
let sol7 = `..... ...  
.I I.O.I.E 
... ... .  
 O.E I E.O 
  .     ...
 O.I I E I.
  ..... ...
 O O O.E.E 
....... .  
.I E I I.O 
.........  `;

let map8 =
  '       \n' +
  ' I I I \n' +
  '       \n' +
  ' O O O \n' +
  '       \n' +
  ' I I I \n' +
  '       ';
let sol8 = '';

let map9 =
  '       \n' +
  ' I O I \n' +
  '       \n' +
  ' O E I \n' +
  '       \n' +
  ' I I I \n' +
  '       ';
let sol9 = '';

let map11 =
  '       \n' +
  ' I O I \n' +
  '       \n' +
  ' O E I \n' +
  '       \n' +
  ' I I I \n' +
  '       ';

let sol11 = `
.................\n
.I E I I I I I I.\n
. .........     .\n
.I.E E E E.I I I.\n
. ...     ...   .\n
.I I.E E O E.I I.\n
.   ..... ...   .\n
.I I I I.E.I I I.\n
......... .......\'';`;

let randomMap2 =
  '           \n' +
  ' E I I I O \n' +
  '           \n' +
  ' O O I I O \n' +
  '           \n' +
  ' E I I I I \n' +
  '           \n' +
  ' O O O O E \n' +
  '           ';

let randomMap4 =
  '           \n I I I I I \n           \n I E I I I \n           \n I O I I I \n           \n O E I I I \n           \n E I I I I \n           \n E I I I I \n           \n I I I I I \n           ';
let solutionRandomMap4 =
  '...........\n.I I I I I.\n. ...     .\n.I.E.I I I.\n. . .     .\n.I.O.I I I.\n... .     .\n O E.I I I.\n  ...     .\n E.I I I I.\n  .       .\n E.I I I I.\n...       .\n.I I I I I.\n...........';

let randomMap4n2 =
  '             \n I I I I I I \n             \n I I E I I I \n             \n O I I I I I \n             \n I E I I I I \n             \n I I I I O O \n             \n O I I I I I \n             \n I I I I I I \n             \n I I I I I I \n             ';
let randomMap4n2Solution =
  '.............\n.I I I I I I.\n.           .\n.I I E I I I.\n...         .\n O.I I I I I.\n...         .\n.I E I I I I.\n.       .....\n.I I I I.O O \n...     .....\n O.I I I I I.\n...         .\n.I I I I I I.\n.           .\n.I I I I I I.\n.............';

let randomMap18 =
  '             \n I I O I I I \n             \n I I O O I I \n             \n I I I E I O \n             \n I I I I I I \n             \n I I I I I I \n             \n E I I I E E \n             \n I O I I I I \n             ';
let randomMap18Solution =
  '..... .......\n.I I.O.I I I.\n.   . ...   .\n.I I.O O.I I.\n.   ... . ...\n.I I I.E.I.O \n.     ... ...\n.I I I I I I.\n.           .\n.I I I I I I.\n.       .....\n.E I I I.E E \n. ...   .....\n.I.O.I I I I.\n... .........';

let example11 =
  '                 \n I E I I I I I I \n                 \n I E E E E I I I \n                 \n I I E E O E I I \n                 \n I I I I E I I I \n                 ';
let example11Solution =
  '.................\n.I E I I I I I I.\n. .........     .\n.I.E E E E.I I I.\n. ...     ...   .\n.I I.E E O E.I I.\n.   ..... ...   .\n.I I I I.E.I I I.\n......... .......';

let random18 =
  '                 \n I I I I E E E I \n                 \n I I I O I O O I \n                 \n O I I E I I I I \n                 \n I I I O O I I I \n                 ';
let random18Sol =
  '...........   ...\n.I I I I E.E E.I.\n.     ... .   . .\n.I I I.O.I.O O.I.\n...   . . ..... .\n O.I I.E.I I I I.\n...   . ...     .\n.I I I.O O.I I I.\n.......   .......';

let answer;
// answer = insAndOuts(map0);
// assert(answer, sol0);

// answer = insAndOuts(map1);
// assert(answer, sol1);

// answer = insAndOuts(map2);
// assert(answer, sol2);

// answer = insAndOuts(map3);
// assert(answer, sol3);

// answer = insAndOuts(map4);
// assert(answer, sol4);

// answer = insAndOuts(map5);
// assert(answer, sol5);

// answer = insAndOuts(map6);
// assert(answer, sol6);

answer = insAndOuts(example11);
assert(answer, example11Solution);

// answer = insAndOuts(map8);
// assert(answer, sol8);

// answer = insAndOuts(map9);
// assert(answer, sol9);
