/**
 * Improvements:
 * -some parts are probably hardcoded to work only on a 9x9 grid. that's no bueno
 * -one-liner deep clone array: puzzle.slice().map( (a) => a.slice());
 * -'cell' is a better name than 'slot'
 * -this is a simpler way to get the block index: 3 * Math.floor(row/3) + Math.floor(col/3)
 */

class SudokuSolver {
  #unsolvedCount = 0;
  #puzzle = [];
  #originalPuzzle = [];
  #length;
  #lengthSq;
  #numbers = [];
  #blocks = [];

  constructor(input) {
    this.#length = input.length;
    this.#lengthSq = input.length ** 2;

    for (let i = 0; i < input.length; i++) {
      this.#numbers.push(i + 1);

      this.#puzzle.push(input[i].concat());
      this.#originalPuzzle.push(input[i].concat());
      this.#blocks.push([]);
    }
  }

  solve() {
    this.#init();

    while (this.#unsolvedCount > 0) {
      let prevCount = this.#unsolvedCount;
      this.#updateSlots();

      if (prevCount === this.#unsolvedCount) {
        console.error("Can't solve. Unsolved count = " + this.#unsolvedCount);
        break;
      }
    }

    return this.#puzzle;
  }

  get unsolvedCount() {
    return this.#unsolvedCount;
  }

  #init() {
    const loop = (val, i, row, col) => {
      const index = this.#getBlockIndex(i);
      this.#blocks[index].push(i);

      if (val === 0) this.#unsolvedCount++;
    };

    this.#iterateAllSlots(loop, true);
  }

  #updateSolvedSlot(val, row, col) {
    this.#puzzle[row][col] = val;
    this.#unsolvedCount--;
  }

  // @flatIndex: the index of the sudoku slot in one dimension (eg 1 to 81 in a 9x9)
  #getBlockIndex(flatIndex) {
    return (Math.floor(flatIndex / 3) % 3) + Math.floor(flatIndex / 27) * 3;
  }

  // @flatIndex: the index of the sudoku slot in one dimension (eg 1 to 81 in a 9x9)
  #getBlock(flatIndex) {
    const blockIndex = this.#getBlockIndex(flatIndex);
    const blockIndices = this.#blocks[blockIndex];

    return blockIndices.map(
      (index) => this.#puzzle[Math.floor(index / 9)][index % 9]
    );
  }

  #iterateAllSlots(loop) {
    // more efficient than [Math.floor(index / 9)][index % 9]
    let row = 0;
    let col = 0;
    for (let i = 0; i < this.#lengthSq; i++) {
      const val = this.#puzzle[row][col];

      loop(val, i, row, col);

      col++;
      if (col === this.#length) {
        col = 0;
        row++;
      }
    }
  }

  #updateSlots() {
    const loop = (val, i, row, col) => {
      if (val === 0) {
        const possibleValues = this.#getPossibleValues(i, row, col);

        if (possibleValues.length === 1) {
          this.#updateSolvedSlot(possibleValues[0], row, col);
        }
      }
    };

    this.#iterateAllSlots(loop);
  }

  #getPossibleValues(flatIndex, rowNumber, colNumber) {
    const row = this.#puzzle[rowNumber];
    const col = this.#getColumn(colNumber);
    const block = this.#getBlock(flatIndex);
    const rowColBlock = [...row, ...col, ...block];

    return this.#numbers.filter((a) => !rowColBlock.includes(a));
  }

  #getColumn(colNumber) {
    return this.#puzzle.reduce((acc, row) => {
      acc.push(row[colNumber]);
      return acc;
    }, []);
  }
}

const sudoku = (puzzle) => {
  return new SudokuSolver(puzzle).solve();
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

var puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];



console.log('puzzle', puzzle);

let result = sudoku(puzzle);
console.log('result', result);

/* Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]] */


// other solutions

function sudoku(puzzle) {
  let unsolved = [];
  let blocks = new Array(9).fill(0).map(_ => new Set);
  let rows = new Array(9).fill(0).map(_ => new Set);
  let cols = new Array(9).fill(0).map(_ => new Set);
  
  for (let y = 0; y < 9; y++) {
    for(let x = 0; x < 9; x++) {
      let v = puzzle[y][x];
      if (v === 0)
        unsolved.push({y, x});
      else {
        blocks[3 * Math.floor(y/3) + Math.floor(x/3)].add(v);
        rows[y].add(v);
        cols[x].add(v);
      }
    }
  }
  
  while(unsolved.length > 0) {
    unsolved = unsolved.filter(cell => {
      let set = new Set([1,2,3,4,5,6,7,8,9]);
      let known = new Set([
        ...blocks[3 * Math.floor(cell.y/3) + Math.floor(cell.x/3)],
        ...rows[cell.y],
        ...cols[cell.x]]);
      known.forEach(v => set.delete(v));
      
      if (set.size === 1) {
        let v = [...set][0];
        rows[cell.y].add(v);
        cols[cell.x].add(v);
        blocks[3 * Math.floor(cell.y/3) + Math.floor(cell.x/3)].add(v);
        puzzle[cell.y][cell.x] = v;
        
        return false;
      }
      
      return true;
    });
  }
  
  return puzzle;
}


function sudoku(puzzle) {
  const valid = (x,y) => {
    var v = [];
    for(var i=0; i<3; i++) {
      for(var j=0; j<3; j++) {
        v.push(puzzle[x][i*3+j])
        v.push(puzzle[i*3+j][y])
        v.push(puzzle[3*Math.floor(x/3)+i][3*Math.floor(y/3)+j])
      }
    }
    return [1,2,3,4,5,6,7,8,9].filter(e => v.indexOf(e) == -1)
  }
  const rec = (x,y) => {
    if(y == 9) {
      return puzzle
    } else if (!puzzle[x][y]) {
      const correct = valid(x,y).some(i => {
        puzzle[x][y] = i;
        return rec((x+1)%9,y+(x==9?1:0))
      })
      if (correct)
        return puzzle;
      puzzle[x][y] = 0;
    } else {
      return rec((x+1)%9,y+(x==8?1:0))
    }
  }
  return rec(0,0)
}