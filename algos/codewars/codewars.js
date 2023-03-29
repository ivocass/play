
/**
 * Here I'm saving all the simple Codewars challenges.
 * The complex ones are saved on their own files and linked here.
 * I'm adding the solution I submitted and then solutions I liked the most from other devs.
 */

/**
 * 1 - 202302XX
 * ?
 */

/**
 * 2 - 20230222 - Who likes it? 
 * https://www.codewars.com/kata/5266876b8f4bf2da9b000362/train/javascript
 */

function likes(names) {
  switch (names.length) {	
    case 0:
      return 'no one likes this';
    
    case 1:
      return `${names[0]} likes this`;

    case 2:
      return `${names[0]} and ${names[1]} like this`;

    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    
    default:		
    return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`;
  }
}

// other solutions

function likes(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`, 
    2: `${names[0]} and ${names[1]} like this`, 
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`, 
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`, 
  }[Math.min(4, names.length)]
}

function likes(names) {
  names.length === 0 && (names = ["no one"]);
  let [a, b, c, ...others] = names;
  switch (names.length) {
    case 1: return `${a} likes this`;
    case 2: return `${a} and ${b} like this`;
    case 3: return `${a}, ${b} and ${c} like this`;
    default: return `${a}, ${b} and ${others.length + 1} others like this`;
  }
}

/**
 * 3 - 20230222 - Sum of Digits / Digital Root
 * https://www.codewars.com/kata/541c8630095125aba6000c00/train/javascript
 */

function digitalRoot(n) {
  let total = 0;
  let num = n;
  while (num > 0) {
    total += num % 10;
    num = Math.floor(num / 10);
  }

  if (total < 10) {
    return total;
  }
  return digitalRoot(total);
}

// other solutions

function digital_root(n) {
  if (n < 10) return n;
  
  return digital_root(
    n.toString().split('').reduce(function(acc, d) { return acc + +d; }, 0));
}

function digital_root(n) {
  if (n < 10) return n
  return digital_root(n % 10 + digital_root(Math.floor(n / 10)))
}

/**
 * 4 - 20230222 - Friend or Foe?
 * https://www.codewars.com/kata/55b42574ff091733d900002f/train/javascript
 */

function friend(friends){
  return friends.filter( (name) => {
    if (name.length === 4) return true;;
    return false;
  });
}

// solutions

function friend(friends){
  return friends.filter(n => n.length === 4)
}

/**
 * 5 - 20230222 - Two to One
 * https://www.codewars.com/kata/5656b6906de340bd1b0000ac
 */

function longest(s1, s2) {
  const chars = (s1 + s2).split('').sort();

  return chars.reduce((acc, char) => acc + (acc.includes(char) ? '' : char));
}

// other solutions

const longest = (s1, s2) => [...new Set(s1+s2)].sort().join('');

/**
 * 6 - 20230223 - Moving zeroes to the end
 * 
 */

function moveZeros(arr) {
  const notZeroes = [];
  const zeroes = [];

  arr.forEach((val) => {
    if (val === 0) {
      zeroes.push(0);
    } else {
      notZeroes.push(val);
    }
  });

  return notZeroes.concat(zeroes);
}

// other solutions

function moveZeros(arr) {
  return [...arr.filter((val) => val !== 0), ...arr.filter((val) => val === 0)];
}


function moveZeros(arr) {
  return [
    ...arr.filter((val) => val !== 0),
    ...arr.filter((val) => val === 0)
  ];
}

/**
 * Array.sort()
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * > 0	sort a after b
 * < 0	sort a before b
 * === 0	keep original order of a and b
 */
return arr.sort((a, b) => (b === 0 ? -1 : 0));

function moveZeros (arr) {
  return arr.reduceRight(function(prev, curr) {
    if (curr !== 0) {
      prev.unshift(curr);
    }
    else {
      prev.push(curr);
    }
    return prev;
  }, []);
}

/**
 * 7 - 20230223 - Maximum subarray sum
 * https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/train/javascript
 */

function maxSequence(arr) {
  const arrCopy = [...arr];
  let sum = 0;

  while (arrCopy.length > 1) {
    arrCopy.reduceRight((acc, val) => {
      acc += val;

      if (acc > sum) {
        sum = acc;
      }

      return acc;
    }, 0);

    arrCopy.pop();
  }

  return sum;
};

// other solutions

function maxSequence(arr) {
  var currentSum = 0;
  return arr.reduce(function(maxSum, number){
      currentSum = Math.max(currentSum+number, 0);
      return Math.max(currentSum, maxSum);
  }, 0);
}


function maxSequence(arr) {
  var min = 0, ans = 0, i, sum = 0;
  for (i = 0; i < arr.length; ++i) {
    sum += arr[i];
    min = Math.min(sum, min);
    ans = Math.max(ans, sum - min);
  }
  return ans;
}


function maxSequence(arr) {
  var max = 0
  
  for (var i = 0; i < arr.length; i++) {
    for (var sum = 0, j = i; j < arr.length; j++) {
      sum += arr[j]
      if (sum > max) max = sum
    }
  }
  
  return max
}


function maxSequence(arr) {
  let sum = 0;
  let max = 0;
  for (let val of arr) {
    sum += val;

    sum = Math.max(sum, 0);
    max = Math.max(sum, max);
  }
  return max;
};


/**
 * 8 - 20230223 - Are they the "same"?
 * https://www.codewars.com/kata/550498447451fbbd7600041c/train/javascript
 */

function comp(array1, array2) {
  if (!array1 || !array2) return false;

  const numbers = [...array1];
  const numbersSq = [...array2];

  for (let i = 0; i < numbers.length; i++) {
    const squared = numbers[i] ** 2;

    const index = numbersSq.indexOf(squared);

    if (index === -1) return false;

    numbersSq[index] = -1;
  }

  return true;
}

// other solutions

function comp(array1, array2) {
  if (!array1 || !array2) return false;

  const numbers = array1.sort((a, b) => a - b);
  const numbersSq = array2.sort((a, b) => a - b);

  return numbers.map((num) => num ** 2).every((num, i) => num === numbersSq[i]);
}

function comp(a, b) {
  return !!a && !!b && a.map(x => x*x).sort().join() == b.sort().join();
}


/**
 * 9 - 20230223 - Tribonacci Sequence
 * https://www.codewars.com/kata/556deca17c58da83c00002db/train/javascript
 */

function tribonacci(signature, n) {
  const result = [...signature];
  
  if (n < signature.length) return result.slice(0, n);

  let [a, b, c] = signature;
  const length = n - 3;

  for (let i = 0; i < length; i++) {
    const sum = a + b + c;

    a = b;
    b = c;
    c = sum;

    result.push(sum);
  }

  return result;
}


// other solutions

function tribonacci(signature,n){  
  for (var i = 0; i < n-3; i++) { // iterate n times
    signature.push(signature[i] + signature[i+1] + signature[i+2]); // add last 3 array items and push to trib
  }
  return signature.slice(0, n); //return trib - length of n
}


function tribonacci(signature, n) {
  while(signature.length < n) {
    signature.push(signature.slice(-3).reduce((a, b) => a + b ));
  }
  return signature.slice(0, n);
}


/**
 * 10 - 20230223 - Find the missing letter
 * https://www.codewars.com/kata/5839edaa6754d6fec10000a2/train/javascript
 */

function findMissingLetter(array) {
  for (let i = 1; i < array.length; i++) {
    const prevChar = array[i - 1];
    const currChar = array[i];

    if (prevChar.charCodeAt(0) !== currChar.charCodeAt(0) - 1) {
      return String.fromCharCode(currChar.charCodeAt(0) - 1);
    }
  }

  return '';
}

// other solutions

function findMissingLetter(array) {
  let first = array[0].charCodeAt(0)
  for (let i = 1; i < array.length; i++) {
    if (first + i !== array[i].charCodeAt(0)) {
      return String.fromCharCode(first + i)
    }
  }
  throw new Error("Invalid input")
}


/**
 * 11 - 20230223 - Snail
 * https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript
 * 
 * algos/codewars/snail.js
 */


/**
 * 12 - 20230224 - Human readable duration format
 * https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript
 * 
 * algos/codewars/human-readable-duration-format.js
 */


/**
 * 13 - 20230227 - parseInt() reloaded
 * https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/train/javascript
 * 
 * algos/codewars/parseint-reloaded.js
 * 
 */


/**
 * 14 - 20230227 - String incrementer
 * https://www.codewars.com/kata/54a91a4883a7de5d7800009c/train/javascript
 * 
 * algos/codewars/increment-string.js
 */


/**
 * 15 - 20230227 - Decode the Morse Code
 * https://www.codewars.com/kata/decode-the-morse-code
 * 
 * algos/codewars/decode-the-morse-code.js
 */


/**
 * 16 - 20230228 - Decode the Morse code, advanced
 * https://www.codewars.com/kata/54b72c16cd7f5154e9000457/train/javascript
 * 
 * algos/codewars/decode-the-morse-code-advanced.js
 */


/**
 * 17 - 20230301 - Scramblies
 * https://www.codewars.com/kata/55c04b4cc56a697bb0000048/train/javascript
 * 
 * algos/codewars/scramblies.js
 */


/**
 * 18 - 20230303 - Roman Numerals Helper
 * https://www.codewars.com/kata/51b66044bce5799a7f000003/train/javascript
 * 
 * algos/codewars/roman-numerals-helper.js
 */


/**
 * 19 - 20230303 - Catching Car Mileage Numbers
 * https://www.codewars.com/kata/52c4dd683bfd3b434c000292/train/javascript
 * 
 * algos/codewars/catching-car-mileage-numbers.js
 */


/**
 * 20 - 20230306 - Sum of Intervals
 * https://www.codewars.com/kata/52b7ed099cdc285c300001cd/train/javascript
 * 
 * algos/codewars/sum-of-intervals.js
 */


/**
 * 21 - 20230307 - Validate Sudoku with size `NxN`
 * https://www.codewars.com/kata/540afbe2dc9f615d5e000425/javascript
 * 
 * algos/codewars/validate-sudoku-with-size.js
 */


/**
 * 22 - 20230308 - Counting Change Combinations
 * https://www.codewars.com/kata/541af676b589989aed0009e7/train/javascript
 * 
 * algos/codewars/counting-change-combinations.js
 */


/**
 * 23 - 20230309 - Magnet particules in boxes 
 * https://www.codewars.com/kata/56c04261c3fcf33f2d000534/train/javascript
 * 
 * algos/codewars/magnet-particules-in-boxes.js
 */


/**
 * 24 - 20230309 - Codewars style ranking system
 * https://www.codewars.com/kata/51fda2d95d6efda45e00004e/train/javascript
 * 
 * algos/codewars/codewars-style-ranking-system.js
 */


/**
 * 25 - Vigenere cipher helper
 * https://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3/javascript
 * 
 * algos/codewars/vigenere-cipher-helper.js
 */


/**
 * 26 - 20230310 - Ten pin bowling
 * https://www.codewars.com/kata/5531abe4855bcc8d1f00004c/train/javascript
 * 
 * algos/codewars/ten-pin-bowling.js
 */


/**
 * 27 - 20230314 - Texas Hold'em Hands
 * https://www.codewars.com/kata/524c74f855025e2495000262/train/javascript
 * 
 * algos/codewars/texas-holdem-hands.js
 */
 

/**
 * 28 - 20230324 - Closest pair of points in linearithmic time
 * https://www.codewars.com/kata/5376b901424ed4f8c20002b7/train/javascript
 * 
 * see algos/codewars/closest-pair-of-points.js
 */


/**
 * 29 - 20230327 - Sudoku solver
 * https://www.codewars.com/kata/5296bc77afba8baa690002d7/train/javascript
 * 
 * see algos/codewars/sudoku-solver.js
 */


/**
 * 30 - 20230329 - Evaluate mathematical expression
 * https://www.codewars.com/kata/52a78825cdfc2cfc87000005/train/javascript
 * 
 * see algos/codewars/evaluate-mathematical-expression.js
 */