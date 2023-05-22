var hammingWeight = function (n) {
  let counter = 0;

  for (let i = 0; i < 32; i++) {
    const lastBit = n & 1;

    if (lastBit === 1) {
      counter++;
    }

    // get rid of the last bit
    n = n >>> 1;
  }

  return counter;
};

// other solutions -----------------------------------------------------------------------

var hammingWeight = function (n) {
  let num_of_1s = 0;

  for (let i = 0; i < 32; i++) {
    num_of_1s += n & 1;

    n >>= 1;
  }

  return num_of_1s;
};

var hammingWeight = function (n) {
  return n.toString(2).split('0').join('').length;
};

var hammingWeight = function (n) {
  let sum = 0;

  while (n != 0) {
    sum += n & 1;
    n = n >>> 1;
  }

  return sum;
};

var hammingWeight = function (n) {
  // remove 0s from base2 representation of the number
  return n.toString(2).replace(/0/g, '').length;
};

var hammingWeight = function (n) {
  if (n === 0) return 0;
  return 1 + hammingWeight((n &= n - 1));
};
