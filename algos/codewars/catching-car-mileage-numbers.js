/**
 * Improvements:
 * -the test for 'all equal numbers' can be skipped, as they are also palyndromes.
 * -to check if it's incrementing or decrementing in one line: 
 * return '1234567890'.includes(String(num)) || '9876543210'.includes(String(num));
 * or 
 * return RegExp(n).test(1234567890) || RegExp(n).test(9876543210);
 * 
 * -to check if it's a palindrome:
 * return String(num) === String(num).split('').reverse().join('');
 * 
 * -for performance, it's better to convert the number into an array only once, then reuse
 */


function isInteresting(number, awesomePhrases, modifier = 0) {
  if (number < 98) return 0;

  const originalNumber = number;
  const tests = [
    testAllZeroes,
    testAllEqual,
    testIncremental,
    testDecremental,
    testPalindrome,
    testAwesomePhrases,
  ];

  number += modifier;

  while (number < 100) {
    number++;
    modifier++;
  }

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];

    if (test(number, awesomePhrases) === true) {
      if (modifier === 0) return 2;
      if (modifier === 1 || modifier === 2) return 1;
    }
  }

  modifier++;
  if (modifier > 2) return 0;

  return isInteresting(originalNumber, awesomePhrases, modifier);
}

// "Any digit followed by all zeros: 100, 90000"
function testAllZeroes(number) {
  const restOfString = String(number).slice(1);

  return Number(restOfString) === 0;
}

// "Every digit is the same number: 1111"
function testAllEqual(number) {
  const chars = String(number).split('');
  const char0 = chars[0];

  return chars.every((char) => char === char0);
}

// "The digits are sequential, incementing†: 1234"
function testIncremental(number) {
  const numbers = String(number)
    .split('')
    .map((s) => Number(s));

  if (numbers[0] === 9) return false;

  for (let i = 1; i < numbers.length; i++) {
    number = numbers[i];
    const prevNumber = numbers[i - 1];

    if (number === 0) {
      // zero can only be the last number
      if (i !== numbers.length - 1) return false;
      number = 10;
    }

    if (number !== prevNumber + 1) return false;
  }

  return true;
}

// The digits are sequential, decrementing‡: 4321
function testDecremental(number) {
  const numbers = String(number)
    .split('')
    .map((s) => Number(s));

  if (numbers[0] === 0) return false;

  for (let i = 1; i < numbers.length; i++) {
    number = numbers[i];
    const prevNumber = numbers[i - 1];

    if (number === 0) {
      // zero can only be the last number
      if (i !== numbers.length - 1) return false;
    }

    if (number !== prevNumber - 1) return false;
  }

  return true;
}

// "The digits are a palindrome: 1221 or 73837"
function testPalindrome(number) {
  const chars = String(number);

  let rightIndex = chars.length - 1;
  for (let i = 0; i < chars.length; i++) {
    const left = chars[i];
    const right = chars[rightIndex];

    if (left !== right) return false;

    rightIndex--;
  }

  return true;
}

// "The digits match one of the values in the awesomePhrases array"
function testAwesomePhrases(number, awesomePhrases) {
  return awesomePhrases.includes(number);
}

// --------------------

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert(isInteresting(1000, [1337, 256]), 2);
// assert(isInteresting(3, [1337, 256]), 0);
// assert(isInteresting(1336, [1337, 256]), 1);
// assert(isInteresting(1337, [1337, 256]), 2);
// assert(isInteresting(11208, [1337, 256]), 0);
// assert(isInteresting(11209, [1337, 256]), 1);
// assert(isInteresting(11211, [1337, 256]), 2);
assert(isInteresting(98, [1337, 256]), 1);


// other solutions


const isInteresting = (n, a) => check(n.toString(), a) ? 2 : (check((n + 1).toString(), a) || check((n + 2).toString(), a)) ? 1 : 0;
const check = (n, a) => n.length > 2 && (checkZeroes(n) || checkSame(n) || checkPalindrome(n) || checkAwesome(n, a) || checkIncrement(n) || checkDecrement(n))
const checkZeroes = n => /^\d0+$/.test(n);
const checkSame = n => /^(\d)\1+$/.test(n);
const checkPalindrome = n => n === n.split``.reverse().join``;
const checkAwesome = (n, a) => a.includes(+n);
const checkIncrement = n => RegExp(n).test(1234567890);
const checkDecrement = n => RegExp(n).test(9876543210);



const chars = n => n.toString().split('')
const match = s => n => new RegExp(n).test(s)
const regex = r => n => r.test(n)

const tests = [
  match('1234567890'),                  // incremental
  match('9876543210'),                  // decremental
  regex(/^\d0+$/),                      // all zeroes
  regex(/^(\d)\1+$/),                   // repeated
  n => n == chars(n).reverse().join('') // palindrome
]

const test = (n, xs) => n > 99 && 
  (xs.indexOf(n) > -1 || tests.map(t => t(n)).some(x => !!x))
  
const isInteresting = (n, xs) =>
  test(n, xs) ? 2 : +(test(n + 1, xs) || test(n + 2, xs))



// hard to read but super short
function isInteresting(number, awesomePhrases) {
  
  const CRITERIA = [
                    num => /^\d0+$|^(\d)\1+$/.test(num),
                    num => `${num}` === `${num}`.split``.reverse().join``,
                    num => `${num}`.split``.every((dgt, idx, arr) =>
                             !idx || dgt - arr[idx-1] === Math.sign(arr[1] - arr[0]) || !+dgt && +arr[idx-1] === 9),
                    num => awesomePhrases.includes(num),
                   ];
  
  const analyze = num => num > 99 && CRITERIA.some(cb => cb(num));
  
  return 2*analyze(number) || +analyze(number+1) || +analyze(number+2);

}