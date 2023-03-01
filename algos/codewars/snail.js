function snail(array) {
  if (array[0].length === 0) return [];

  const output = [];
  const length = array.length ** 2;
  let stepDirection = -1;
  let leftIndex = 0;
  let rightIndex = -1;
  let leftStepper = 0;
  let rightStepper = 1;
  let cycleLength = array[0].length;
  let cyclesDone = 0;
  let cyclesLeftToChangeLength = 1;

  for (let i = 0; i < length; i++) {
    leftIndex += leftStepper;
    rightIndex += rightStepper;

    output.push(array[leftIndex][rightIndex]);

    cyclesDone++;
    if (cyclesDone === cycleLength) {
      cyclesDone = 0;

      cyclesLeftToChangeLength--;
      if (cyclesLeftToChangeLength === 0) {
        cycleLength--;
        cyclesLeftToChangeLength = 2;
      }

      leftStepper = rightStepper;

      rightStepper += stepDirection;

      if (Math.abs(rightStepper) === 2) {
        rightStepper = 0;
        stepDirection *= -1;
      }
    }
  }

  return output;
}

function assertDeepEquals(output, expected) {
  console.log(
    'testing',
    output.every((val, i) => val === expected[i]),
    output,
    expected
  );
}

assertDeepEquals(snail([[]]), []);
assertDeepEquals(snail([[1]]), [1]);
assertDeepEquals(
  snail([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
  [1, 2, 3, 6, 9, 8, 7, 4, 5]
);
/* assertDeepEquals(
  snailOld([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ]),
  [
    1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19,
    18, 17, 12, 13,
  ]
); */
assertDeepEquals(
  snail([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ]),
  [
    1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19,
    18, 17, 12, 13,
  ]
);
assertDeepEquals(
  snail([
    [1, 2, 3, 4, 5, 6],
    [20, 21, 22, 23, 24, 7],
    [19, 32, 33, 34, 25, 8],
    [18, 31, 36, 35, 26, 9],
    [17, 30, 29, 28, 27, 10],
    [16, 15, 14, 13, 12, 11],
  ]),
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ]
);


// other solutions
// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/solutions/javascript

// 1246ms
snail = function(array) {
  if (array.length === 0) return [];
  
  return [
    ...array.shift(),
    ...array.map(_ => _.pop()),
    ...snail(array.reverse().map(line => line.reverse()))
  ];  
}


// 963ms
const snail = function(array) {
  const list = [];

  while(array.length) {
    list.push(...array.shift(), ...array.map(row => row.pop()));
    
     array.reverse().map(row => row.reverse());
  }

  return list;
}


// 390ms
const snail = (array) => {
  const result = [];
  
  while (array.length) {
    result.push(...array.shift());
    array.forEach((it) => result.push(it.pop()));
    result.push(...(array.pop() || []).reverse());
    array.reduceRight((accum, curr) => accum.push(curr.shift()) && result, result);
  }
  
  return result;
};


/**
 * spreads always the first row, then rotates the remaining arrays counter-clockwise and repeats
 * 1565ms 
 */
rotateLeft = function(array) {
  var result = [];
  while (array[0].length > 0) {
    result.push(array.map(function(item){
      return item.pop();
    }))
  }
  return result;
}

snail = function(array) {
  if (array.length === 0) { return [] }
  var head = array.shift();
  if (array.length === 0) {
    return head;
  } else {
    array = rotateLeft(array);
    return head.concat(snail(array));
  }
}


/**
 * spreads the first, then removes it, rotates the rest (it's a weird rotation, not CW and not CCW. someone called it "transpose". basically,
 * the first row ends up being the first column and viceversa. it's usually done before reverse)
 * (reverses that), and repeats recursively
 * 2534ms
 */
const rotate = arr => arr.length ? arr[0].map((_, i) => arr.map((_, j) => arr[j][i])) : [];
const snail = arr => arr.length ? [...arr[0], ...snail(rotate(arr.slice(1)).reverse())] : [];


// 848ms
const bToT = arr => arr ? arr.map(v => v[0])
  .reverse().concat(snail(arr.map(v => v.slice(1)))) : [];

const rToL = arr => arr[arr.length - 1] ? arr[arr.length - 1]
  .reverse().concat(bToT(arr.slice(0, -1))) : [];

const tToB = arr => arr ? arr.map(v => v[v.length - 1])
  .concat(rToL(arr.map(v => v.slice(0, -1)))) : [];

const lToR = arr => arr[0] ? arr[0].concat(tToB(arr.slice(1))) : [];

const snail = arr => arr ? lToR(arr) : [];


snail = function(array) {
  var snail = [];
  var direction = 0;
  var cycle = 0;
  var pointer = {x: 0, y: 0};
  
  for (var i = 0; i < array.length * array[0].length; i++) {
    snail.push( array[ pointer.y ][ pointer.x ] );
    
    // Turn by 90 degrees if a 'wall' is hit, additionally increment
    // cycle counter if necessary
    if(( direction == 0 && pointer.x == array   .length-1 - cycle )
    || ( direction == 1 && pointer.y == array[0].length-1 - cycle )
    || ( direction == 2 && pointer.x == cycle  )
    || ((direction == 3 && pointer.y == cycle+1) && ++cycle))
      direction = (direction + 1) % 4;
    
    // Moving the pointer depending on reading direction
    [ ()=>pointer.x++
    , ()=>pointer.y++
    , ()=>pointer.x--
    , ()=>pointer.y--
    ][ direction ]();
  }
  
  return snail;
}


snail = function(arr)
{
    let snailArr = []; let i = 0; let j = 0; let k = 0; let c = 0;

    while(k < arr[0].length * arr.length)
    {
        //right
        for ( ; j < arr[0].length - c; j++, k++)
            snailArr[k] = arr[i][j];

        //down
        for (i++, j-- ; i <= j; i++, k++)
            snailArr[k] = arr[i][j];

        //left
        for (i--, j-- ; j >= c; j--, k++)
            snailArr[k] = arr[i][j];
	
        //top
        for (i--, j++ ; i > j; i--, k++)
            snailArr[k] = arr[i][j];

        i++; j++; c++;
    }
    return snailArr;
}


snail = function(array) {
  const result = [];
  while (array.length) {
    result.push(...array.shift());
    if (array.length) {
      array.forEach(subArr => {
        result.push(subArr.pop());
        subArr.reverse();
      })
      array.reverse()
    }
  }
  
  return result
}


function snail(m) {
  if (m.length === 1) return m[0];
  let transpose = m => m[0].map((_, i) => m.map(r => r[i])), rotate = m => transpose(m).reverse();
  return m[0].concat(snail(rotate(m.slice(1))));
}


snail = function(array) {
  var result = array[0].slice();
  var times = array.length;
  var i=0, j=times-1, step=1,  c=0;
  
  while (times>0) {
	  times-=1;
	  for(c=0;c<times;c++) {
		i+=step;
		result.push(array[i][j])
	  }
	  step*=-1;
	  for(c=0;c<times;c++) {
		j+=step;
		result.push(array[i][j])
	  }
  }
  return result
}


var snail = function (array) {
  
  var answer = [];
  for (var size = array.length, i = 0, j = 0; size > 0; size -= 2, ++j) {
    for (var k = 0; k < size - 1; ++k, ++j) answer.push(array[i][j]);
    for (var k = 0; k < size - 1; ++k, ++i) answer.push(array[i][j]);
    for (var k = 0; k < size - 1; ++k, --j) answer.push(array[i][j]);
    for (var k = 0; k < size - 2; ++k, --i) answer.push(array[i][j]);
    if (array[i][j]) answer.push(array[i][j]);
  }
  return answer;
};


var snail = function (array) {
  var rotations = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];

  var currentRotation = 0;
  var seen = {};
  var result = [];

  var startx = 0;
  var starty = 0;

  while (Object.keys(seen).length < (array.length * (array[0] || []).length)) {
      console.log("enter : " + Object.keys(seen).length + " - " + (array.length * array.length));

      result = result.concat(array[startx][starty]);
      seen[startx + "-" + starty] = true;

      var rotation = rotations[currentRotation];
      var nextx = startx + rotation.x, nexty = starty + rotation.y;
      if (seen[nextx + "-" + nexty] || nextx >= array.length || nexty >= array.length || nextx < 0 || nexty < 0) {
          currentRotation = (currentRotation + 1) % 4;
          rotation = rotations[currentRotation];
      }

      startx += rotation.x;
      starty += rotation.y;
  }

  return result;
};


// CHATGPT
function snail(array) {
  let result = [];

  while (array.length > 0) {
    // Move right
    result = result.concat(array.shift());

    // Move down
    for (let i = 0; i < array.length; i++) {
      result.push(array[i].pop());
    }

    // Move left
    if (array.length > 0) {
      result = result.concat(array.pop().reverse());
    }

    // Move up
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i].length > 0) {
        result.push(array[i].shift());
      }
    }
  }

  return result;
}