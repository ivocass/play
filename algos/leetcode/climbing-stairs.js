var climbStairs = function (n) {
  let output = 1;
  let prevOutput = 0;

  while (n) {
    let temp = output;
    output = output + prevOutput;
    prevOutput = temp;
    n--;
  }

  return output;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(climbStairs(1), -1);
assert(climbStairs(2), -1);
assert(climbStairs(3), -1);
assert(climbStairs(4), -1);
assert(climbStairs(5), -1);
assert(climbStairs(6), -1);

// other solutions -----------------------------------------------------------------------

var climbStairs = function (n, memo = { 1: 1, 2: 2 }) {
  if (memo[n] !== undefined) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
};

var climbStairs = function (n) {
  let prev = 0;
  let cur = 1;
  let temp;

  for (let i = 0; i < n; i++) {
    temp = prev;
    prev = cur;
    cur += temp;
  }
  return cur;
};

// by ChatGPT
function climbStairs(n) {
  if (n <= 1) {
    // There's only one way to climb 0 or 1 step
    return 1;
  } else {
    // The number of ways to climb n steps is equal to
    // the sum of the number of ways to climb n-1 and n-2 steps
    return climbStairs(n - 1) + climbStairs(n - 2);
  }
}

// by ChatGPT. outputs all combinations (not efficient. just for fun)
function climbStairsCombinations(n) {
  const result = [];

  // Define a helper function to generate all combinations recursively
  function generateCombinations(steps, path) {
    if (steps === 0) {
      // If we've used all the steps, add the current path to the result
      result.push([...path]);
    } else if (steps >= 1) {
      // If we still have steps left, try taking one step
      path.push(1);
      generateCombinations(steps - 1, path);
      path.pop();

      if (steps >= 2) {
        // If we still have at least 2 steps left, try taking two steps
        path.push(2);
        generateCombinations(steps - 2, path);
        path.pop();
      }
    }
  }

  // Call the helper function to generate all possible combinations
  generateCombinations(n, []);

  return result;
}
