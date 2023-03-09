/**
 * Improvements:
 * -the comparison with < 0 could have been simplified with > 0 (removing the "continue")
 */

function countChange(money, coins) {
  if (money === 0) return 1;

  const firstCoin = coins[0];
  const maxMultiplier = money / firstCoin + 1;
  let count = 0;

  for (let i = 0; i < maxMultiplier; i++) {
    const subtractionResult = money - firstCoin * i;

    if (subtractionResult === 0) {
      count++;
      continue;
    }

    if (subtractionResult < 0) continue;

    count += countChange(subtractionResult, coins.slice(1));
  }

  return count;
}

// -----------------

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert(countChange(4, [1, 2]), 3);
// assert(countChange(10, [5, 2, 3]), 4);
// assert(countChange(11, [5, 7]), 0);
// assert(countChange(300, [5, 10, 20, 50, 100, 200, 500]), 1022);
// assert(countChange(0, []), 1);
// assert(countChange(100, [2, 3, 20]), -1);
// assert(countChange(100, [2, 11, 21]), -1);
assert(countChange(100, [5, 10, 20]), 36);
// assert(countChange(100, [4, 10]), -1);
