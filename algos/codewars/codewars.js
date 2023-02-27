


/**
 * -------------------- 2 - 20230222 - Who likes it? 
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

// solutions

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

// solutions

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

// solutions

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

// solutions

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

// solutions

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

// solutions

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

// solutions

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

// solutions

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
 * see algos/codewars/snail.js
 */


/**
 * 12 - 20230224 - Human readable duration format
 * https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript
 * 
 * see algos/codewars/human-readable-duration-format.js
 */

