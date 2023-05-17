var singleNumber = function (nums) {
  let accumulator = 0;

  for (const num of nums) {
    accumulator = accumulator ^ num;
  }

  return accumulator;
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

assert(singleNumber([4, 1, 2, 1, 2]), 4);
assert(singleNumber([2, 2, 1]), 1);
assert(singleNumber([1]), 1);

// other solutions -----------------------------------------------------------------------

function singleNumber(nums) {
  return nums.reduce((prev, curr) => prev ^ curr);
}
