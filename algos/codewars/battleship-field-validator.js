/**
 * Improvements:
 * -It's better to use x and y instead of j and i.
 * -Another way that I just thought of is to convert the field to a single-line string,
 * then search for the ships, like fieldStr.indexOf('1111'), then delete the ship and search
 * for smaller ones. Finally, I'd check for diagonal collisions.
 * -Instead of measuring a ship and then deleting it, one could count and delete at the same time.
 * -While a ship is being counted, one could check for collisions at the same time.
 */

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


// other solutions

function validateBattlefield(field) {
  for (ships = [10,0,0,0,0], y = 0; y < 10; y++) 
    for (x = 0; x < 10; x++)
      if ( field[y][x] ) {
        if ( field[y-1]?.[x-1] || field[y-1]?.[x+1] ) return false 
        if (( field[y][x] += field[y-1]?.[x] || 0 + field[y][x-1] || 0) > 4 ) return false 
        ships[field[y][x]]++
        ships[field[y][x]-1]--
      } 
  return [0,4,3,2,1].every((s,i) => s == ships[i]);
}


const validateBattlefield = field => {
	let ships = [0,4,3,2,1]; // 4 single deck ships, 3 double deck...
	let ship = 0; // temp variable for each ship assembly

// 1. Check for diagonal collisions
	for (let i = 0; i < 10; i++) {
		for (let k = 0; k < 10; k++) {
			if (field[i][k]) {
				// (arr[i + 1]||[]) to avoid errors in the last row
				if ((field[i + 1]||[])[k - 1] || (field[i + 1]||[])[k + 1]) return false;
			}
		}
	}

// 2. Find horizontal ships, count them and remove from the field
	for (let i = 0; i < 10; i++) {
		for (let k = 0; k < 11; k++) {
			if (field[i][k] && !(field[i - 1]||[])[k] && !(field[i + 1]||[])[k]) {
				ship++;
				field[i][k] = 0;
			} else if (ship) {
				ships[ship]--;
				ship = 0;
			}
		}
	}

// 3. Find vertical ships and count them
	for (let k = 0; k < 10; k++) {
		for (let i = 0; i < 11; i++) {
			if ((field[i]||[])[k]) {
				ship++;
				field[i][k] = 0;
			} else if (ship) {
				ships[ship]--;
				ship = 0;
			}
		}
	}

// 4. If exactly 0 ships left, return true
	return ships.filter(Boolean).length ? false : true;
}


function validateBattlefield(field) {
  let ships = [0,4,3,2,1];                             // initialize ships to be found
  const s = (x, y) => field[x] && field[x][y];         // formula for "is ship at [x, y]?"
  for (let i = 0; i < 100; i++) {                      // check all spaces in field
    let x = i%10, y = i/10|0, l = 0;                   // calculate x & y, initialize length
    if (s(x, y)) {                                     // ship found at [x, y]?
      if (s(x+1, y+1) || s(x-1, y+1)) return false;    // corners touching?
      if (s(x+1, y  ) && s(x  , y+1)) return false;    // sides touching?
      while(s(x+l, y  )) { field[x+l][y  ] = 0; l++; } // find vertical ship
      while(s(x  , y+l)) { field[x  ][y+l] = 0; l++; } // find horizontal ship
      if (ships[l]) ships[l]--; else return false;     // record found ship
    }
  }
  return ships.every(s => s === 0);                    // verify all ships found
}


function validateBattlefield(field) {
  var hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];
  for (var ships = [10,0,0,0,0], row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      if ( hit(row,col) ) {
        if ( hit(row-1, col-1) || hit(row-1, col+1) ) return false; // Corner is touching
        if ( hit(row-1, col  ) && hit(row  , col-1) ) return false; // Side is touching
        if ( ( field[row][col] += hit(row-1, col) + hit(row, col-1) ) > 4 ) return false; // Ship is too long
        ships[field[row][col]]++; ships[field[row][col] - 1]--;
  } } }
  return [0,4,3,2,1].every((s,i) => s == ships[i]);
}