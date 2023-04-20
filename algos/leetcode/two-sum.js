var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const subtracted = target - nums[i];

    const idx = nums.indexOf(subtracted, i + 1);

    if (idx === -1) {
      continue;
    }

    return [i, idx];
  }
};

// other solutions -----------------------------------------------------------------------

// Approach 1: Brute Force
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
};

// Approach 2: Two-pass Hash Table (JS object)
var twoSum = function (nums, target) {
  const indices = {};

  nums.forEach((item, index) => {
    indices[item] = index;
  });

  for (let index = 0; index < nums.length; index++) {
    const complement = target - nums[index];

    if (indices[complement] !== undefined && indices[complement] !== index) {
      return [index, indices[complement]];
    }
  }
};

// Approach 3: One-pass Hash Table
var twoSum = function (nums, target) {
  const indices = new Map();

  for (let index = 0; index < nums.length; index++) {
    const complement = target - nums[index];

    if (indices.has(complement)) {
      return [indices.get(complement), index];
    }

    indices.set(nums[index], index);
  }
};
