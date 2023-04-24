var plusOne = function (digits) {
  const length = digits.length;
  if (digits[length - 1] !== 9) {
    digits[length - 1] = digits[length - 1] + 1;
    return digits;
  }

  if (digits.every((num) => num === 9)) {
    return [1, ...'0'.repeat(length).split('')];
  }

  for (let i = length - 1; i > -1; i--) {
    if (digits[i] === 9) {
      digits[i] = 0;
    } else {
      digits[i] = digits[i] + 1;
      break;
    }
  }

  return digits;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(plusOne([4, 3, 2, 1]).join(''), '4322');
assert(plusOne([4, 3, 9, 9]).join(''), '4400');
assert(plusOne([9, 9, 9, 9]).join(''), '10000');

// other solutions -----------------------------------------------------------------------
