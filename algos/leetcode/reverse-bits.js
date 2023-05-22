// other solutions -----------------------------------------------------------------------

function reverseBits(n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    // find the last bit of n
    const lastBit = n & 1;

    // shift the last bit of n to the left
    const reversedLastBit = lastBit << (31 - i);

    // insert the reversed last bit of n into the result
    result |= reversedLastBit;

    // the last bit of n is already taken care of, so we need to drop it
    n >>>= 1;
  }

  // convert the result to an unsigned 32-bit integer
  return result >>> 0;
}

var reverseBits = function (n) {
  var result = 0;
  var count = 32;

  while (count--) {
    result *= 2;
    result += n & 1;
    n = n >> 1;
  }
  return result;
};

/*
Process the right-most bit for 32 times (at most)
*/
var reverseBits = function (n) {
  let res = 0,
    pow = 31;
  while (n > 0) {
    let rightMost = n & 1;
    res = res + (rightMost << pow);
    pow--;
    n = n >>> 1;
  }
  // take negative into positive
  return res >>> 0;
  // T.C: O(1)
  // S.C: O(1)
};

function reverseBits(n) {
  return Number.parseInt(n.toString(2).split('').reverse().join('').padEnd(32, '0'), 2);
}

var reverseBits = function (n) {
  let str = (n >>> 0).toString(2).padStart(32, '0');
  let strReverse = str.split('').reverse().join('');
  let output = parseInt(strReverse, 2);
  return output;
};
