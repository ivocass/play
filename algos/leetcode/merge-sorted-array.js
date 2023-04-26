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

var merge = function (nums1, m, nums2, n) {
  // Initialize i and j to store indices of the last element of 1st and 2nd array respectively...
  let i = m - 1,
    j = n - 1;
  // Initialize a variable k to store the last index of the 1st array...
  let k = m + n - 1;
  // Create a loop until either of i or j becomes zero...
  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
    // Either of i or j is not zero, which means some elements are yet to be merged.
    // Being already in a sorted manner, append them to the 1st array in the front.
  }
  // While i does not become zero...
  while (i >= 0) nums1[k--] = nums1[i--];
  // While j does not become zero...
  while (j >= 0) nums1[k--] = nums2[j--];
  // Now 1st array has all the elements in the required sorted order...
  return;
};

var merge = function (nums1, m, nums2, n) {
  let idx1 = m - 1;
  let idx2 = n - 1;
  let idx3 = m + n - 1;

  while (idx2 >= 0) {
    nums1[idx3--] = nums1[idx1] > nums2[idx2] ? nums1[idx1--] : nums2[idx2--];
  }
};
