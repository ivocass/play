var titleToNumber = function (columnTitle) {
  const length = columnTitle.length;

  return columnTitle.split('').reduce((acc, val, idx) => {
    const charCode = val.charCodeAt() - 64;

    acc += charCode * 26 ** (length - idx - 1);

    return acc;
  }, 0);
};

// --------------------------
function assert(output, expected) {
  if (Array.isArray(output) && Array.isArray(expected)) {
    const isEqualSize = output.length === expected.length;
    const areValuesEqual = output.every((a, i) => a === expected[i]);
    console.log('test is', isEqualSize && areValuesEqual, output, '/expected:', expected);
  } else {
    console.log('test is', output === expected, output, '/expected:', expected);
  }
}

assert(titleToNumber('B'), 2);
assert(titleToNumber('AA'), 27);
assert(titleToNumber('AB'), 28);
assert(titleToNumber('AAA'), 703);
assert(titleToNumber('GJH'), 5000);

// other solutions -----------------------------------------------------------------------

/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  let res = 0;
  for (let i = 0; i < columnTitle.length; i++) {
    res = res * 26 + (columnTitle.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return res;
};

var titleToNumber = function (s) {
  const charCodeBase = 'A'.charCodeAt(0) - 1;
  const n = s.length;
  let number = 0;

  /*
   * Think of it as base 26. For example,
   * Column number of "AB" = 1 * 26^1 + 2 * 26^0
   */
  for (let i = 0; i < n; i++) {
    number += (s.charCodeAt(i) - charCodeBase) * Math.pow(26, n - i - 1);
  }

  return number;
};
