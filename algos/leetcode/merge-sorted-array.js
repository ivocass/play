const getSwappableIndex = (nums1, m, num, startIndex) => {
  for (let i = startIndex; i < nums1.length; i++) {
    const otherNum = nums1[i];
    if (otherNum > num || i === m) {
      return i;
    }
  }

  return -1;
};

var merge = function (nums1, m, nums2, n) {
  let otherNumIndex = -1;
  let startIndex = 0;
  for (let i = 0; i < n; i++) {
    let num = nums2[i];
    let temp = num;

    let iterations = 0;
    while (otherNumIndex < m) {
      num = temp;
      otherNumIndex = getSwappableIndex(nums1, m, num, startIndex);

      /**
       * the first index returned in this loop is the pointer we'll use next time
       * we call getSwappableIndex(), so that we don't start searching from index 0
       */
      if (iterations === 0) {
        startIndex = otherNumIndex;
      }
      iterations++;

      temp = nums1[otherNumIndex];
      nums1[otherNumIndex] = num;

      if (otherNumIndex === m) {
        m++;
        break;
      }

      if (m === nums1.length) {
        return nums1;
      }
    }
  }

  return nums1;
};

// --------------------------
function assert(output, expected) {
  if (Array.isArray(output) && Array.isArray(expected)) {
    const isEqualSize = output.length === expected.length;
    const areValuesEqual = output.every((a, i) => a === expected[i]);
    console.log(
      'test is',
      isEqualSize && areValuesEqual,
      output,
      '/expected:',
      expected
    );
  } else {
    console.log('test is', output === expected, output, '/expected:', expected);
  }
}

assert(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3), [1, 2, 2, 3, 5, 6]);
assert(merge([1], 1, [], 0), [1]);
assert(merge([0], 0, [1], 1), [1]);
assert(
  merge([-1, 0, 0, 3, 3, 3, 0, 0, 0], 6, [1, 2, 2], 3),
  [-1, 0, 0, 1, 2, 2, 3, 3, 3]
);
assert(
  merge([0, 0, 3, 0, 0, 0, 0, 0, 0], 3, [-1, 1, 1, 1, 2, 3], 6),
  [-1, 0, 0, 1, 1, 1, 2, 3, 3]
);
// assert(merge(, , , ), []);

// other solutions -----------------------------------------------------------------------
