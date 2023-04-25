let count = 0;
const binarySearch = (target, start, end) => {
  // count++
  if (start > end) {
    return start;
  }

  const middle = start + Math.floor((end - start) / 2);
  const squared = middle * middle;

  if (squared === target) {
    return middle;
  } else if (squared > target) {
    return binarySearch(target, start, middle - 1);
  }

  return binarySearch(target, middle + 1, end);
};

// avoiding built-in functions
var mySqrt = function (x) {
  const start = 1;
  const end = Math.floor(x / 2) + 1;
  const root = binarySearch(x, start, end);

  if (root * root > x) {
    return root - 1;
  }

  return root;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(mySqrt(1000000), 1000);
// assert(mySqrt(400), 20);
// assert(mySqrt(8), 2);
// assert(mySqrt(10), 3);
// assert(mySqrt(1024), 32);
console.log('count', count);
// other solutions -----------------------------------------------------------------------

var mySqrt = function (x) {
  var left = 1;
  var right = Math.floor(x / 2) + 1;
  var mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (mid * mid > x) {
      right = mid - 1;
    } else if (mid * mid < x) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return right;
};
