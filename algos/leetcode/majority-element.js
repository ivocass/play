function majorityElement(nums) {
  let candidate;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }

    count += num === candidate ? 1 : -1;
  }

  return candidate;
}

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

assert(majorityElement([2, 2, 1, 1, 1, 2, 2]), 2);
assert(majorityElement([8, 8, 8, 8, 8, 1, 2, 3, 4, 5, 6, 7]), 8);
assert(majorityElement([8, 1, 2, 3, 4, 5, 6, 7, 8]), 8);
assert(majorityElement([3, 2, 3]), 3);

// other solutions -----------------------------------------------------------------------

var majorityElement = function (nums) {
  // sort the array and the middle is the majority
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};

var majorityElement = function (nums) {
  let currNum = nums[0],
    count = 0;

  for (let x of nums) {
    if (currNum == x) count++;
    else {
      count--;
      if (!count) {
        currNum = x;
        count = 1;
      }
    }
  }
  return currNum;
};

var majorityElement = function (nums) {
  // Initialize sol and cnt to store the solution and its frequency for respective iterations...
  let sol = 0,
    cnt = 0;
  // For every element i in the array...
  for (let i = 0; i < nums.length; i++) {
    // If cnt is equal to zero, update sol as sol = i
    if (cnt == 0) {
      sol = nums[i];
      cnt = 1;
    }
    // If i is equal to candidate, increment cnt...
    else if (sol == nums[i]) {
      cnt++;
    }
    // Otherwise, decrement cnt...
    else {
      cnt--;
    }
  }
  // Return & print the solution...
  return sol;
};
