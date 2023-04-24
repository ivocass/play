var removeElement = function (nums, val) {
  for (let i = 0; i < nums.length - 1; i++) {
    const num = nums[i];

    if (num !== val) {
      continue;
    }

    for (let j = nums.length - 1; j > i; j--) {
      if (nums[j] === val) {
        continue;
      }

      nums[i] = nums[j];
      nums[j] = val;
      break;
    }
  }

  const index = nums.indexOf(val);

  return index === -1 ? nums.length : index;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert((), );

// console.log('res', removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
// console.log('res', removeElement([3, 2, 2, 3], 3));
console.log('res', removeElement([2], 3));

// other solutions -----------------------------------------------------------------------

var removeElement = function (nums, val) {
  var zeroStartIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[zeroStartIdx] = nums[i];
      zeroStartIdx++;
    }
  }
  return zeroStartIdx;
};

var removeElement = function (nums, val) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      right--;
    } else {
      left++;
    }
  }

  return left;
};
