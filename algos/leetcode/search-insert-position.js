const binarySearch = (items, target, start, end) => {
  if (start > end) {
    return start;
  }

  const middle = Math.floor((start + end) / 2);

  if (items[middle] === target) {
    return middle;
  }

  if (items[middle] > target) {
    return binarySearch(items, target, start, middle - 1);
  }

  if (items[middle] < target) {
    return binarySearch(items, target, middle + 1, end);
  }
};

var searchInsert = function (nums, target) {
  return binarySearch(nums, target, 0, nums.length - 1);
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(searchInsert([1, 3, 5, 6], 5), 2);
assert(searchInsert([1, 3, 5, 6], 2), 1);
assert(searchInsert([1, 3, 5, 6], 7), 4);

// other solutions -----------------------------------------------------------------------

var searchInsert = function (nums, target) {
  let lo = 0,
    hi = nums.length; // we might need to inseart at the end
  while (lo < hi) {
    // breaks if lo == hi
    let mid = lo + Math.floor((hi - lo) / 2); // always gives the lower mid
    if (target > nums[mid]) {
      lo = mid + 1; // no way mid is a valid option
    } else {
      hi = mid; // it might be possibe to inseart @ mid
    }
  }
  return lo;
};
