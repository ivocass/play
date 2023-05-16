var maxProfit = function (prices) {
  let max = 0;
  let buyPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] <= buyPrice) {
      buyPrice = prices[i];
    } else {
      max = Math.max(prices[i] - buyPrice, max);
    }
  }

  return max;
};

function assert(output, expected) {
  if (Array.isArray(output) && Array.isArray(expected)) {
    const isEqualSize = output.length === expected.length;
    const areValuesEqual = output.every((a, i) => a === expected[i]);
    console.log('test is', isEqualSize && areValuesEqual, output, '/expected:', expected);
  } else {
    console.log('test is', output === expected, output, '/expected:', expected);
  }
}

assert(maxProfit([7, 1, 5, 3, 6, 4]), 5);
assert(maxProfit([7, 6, 4, 3, 1]), 0);
assert(maxProfit([2, 1, 4]), 3);
assert(maxProfit([2, 4, 1]), 2);
assert(maxProfit([2, 1, 2, 0, 1]), 1);
assert(maxProfit([3, 2, 6, 5, 0, 3]), 4);

// other solutions -----------------------------------------------------------------------

const maxProfit = (prices) => {
  let left = 0; // Buy
  let right = 1; // sell
  let max_profit = 0;
  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      let profit = prices[right] - prices[left]; // our current profit

      max_profit = Math.max(max_profit, profit);
    } else {
      left = right;
    }
    right++;
  }
  return max_profit;
};

var maxProfit = function (prices) {
  var min = Number.MAX_SAFE_INTEGER;
  var max = 0;
  for (var i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    max = Math.max(max, prices[i] - min);
  }
  return max;
};

var maxProfit = function (prices) {
  let profit = 0;
  let min = prices[0];

  for (let i = 1; i < prices.length; ++i) {
    if (min > prices[i]) {
      min = prices[i];
    } else if (prices[i] - min > profit) {
      profit = prices[i] - min;
    }
  }

  return profit;
};

var maxProfit = function (prices) {
  let max = 0;
  let ans = 0;
  for (let i = prices.length - 1; i >= 0; i--) {
    ans = Math.max(ans, max - prices[i]);
    if (prices[i] > max) {
      max = prices[i];
    }
  }
  return ans;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let min = prices[0],
    max = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - min > max) {
      max = prices[i] - min;
    }

    if (prices[i] < min) min = prices[i];
  }

  return max;
};
