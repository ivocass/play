function validateBattlefield(fieldOriginal) {
  const field = fieldOriginal.slice().map((a) => a.slice());
  const length = field.length;
  const ships = [0, 4, 3, 2, 1];
  const right = 'R';
  const down = 'D';

  const measure = (array, fromIndex) => {
    let count = 0;
    for (let i = fromIndex; i < length; i++) {
      const cell = array[i];

      if (cell === 1) count++;
      else break;
    }
    return count;
  };

  const getColumn = (colNum) => {
    if (colNum < 0 || colNum >= length) return undefined;

    return field.reduce((acc, array) => {
      acc.push(array[colNum]);
      return acc;
    }, []);
  };

  const deleteShip = (count, direction, rowNum, colNum) => {
    if (direction === right) {
      const row = field[rowNum];

      for (let i = 0; i < count; i++) {
        row[colNum] = 0;
        colNum++;
      }
    } else {
      for (let i = 0; i < count; i++) {
        const row = field[rowNum];

        row[colNum] = 0;

        rowNum++;
      }
    }
  };

  const checkSurroundings = (count, direction, rowNum, colNum) => {
    const check = (rows, fromIndex, count) => {
      for (const row of rows) {
        if (!row) continue;

        const area = row.slice(fromIndex, fromIndex + count);
        const left = row[fromIndex - 1];
        const right = row[fromIndex + count];
        const all = [left, ...area, right];

        if (all.includes(1)) return false;
      }

      return true;
    };

    if (direction === right) {
      const rows = [field[rowNum - 1], field[rowNum], field[rowNum + 1]];

      return check(rows, colNum, count);
    }

    const cols = [
      getColumn(colNum - 1),
      getColumn(colNum),
      getColumn(colNum + 1),
    ];

    return check(cols, rowNum, count);
  };

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const cell = field[i][j];

      if (cell === 0) continue;

      let direction = right;
      let count = measure(field[i], j);

      if (count === 1) {
        let countDown = measure(getColumn(j), i);

        if (countDown > 1) {
          count = countDown;
          direction = down;
        }
      }

      ships[count] -= 1;

      deleteShip(count, direction, i, j);

      if (!checkSurroundings(count, direction, i, j)) return false;
    }
  }

  return ships.every((a) => a === 0);
}

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

function doTest(field, expected) {
  const log = `for field:\n${field.map((row) => row.join(',')).join('\n')}\n`;
  const actual = validateBattlefield(field);
  assert(actual, expected, log);
}

doTest(
  [
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  true
);

/**
 * There must be
 * single battleship (size of 4 cells),
 * 2 cruisers (size 3),
 * 3 destroyers (size 2) and
 * 4 submarines (size 1).
 */
