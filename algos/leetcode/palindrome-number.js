/**
 * Improvements:
 * -the last line should've been "return originalNumber === mirrored;"
 */

// the requirement was to avoid using String
var isPalindrome = function (x) {
  let originalNumber = x;

  if (x < 0) {
    return false;
  }

  const numbers = [];

  while (x > 0) {
    let lastNum = x % 10;

    numbers.push(lastNum);

    x = Math.floor(x / 10);
  }

  let mirrored = 0;

  numbers.forEach((num, idx) => {
    let tensAmount = numbers.length - idx - 1;

    while (tensAmount > 0) {
      num *= 10;
      tensAmount--;
    }

    mirrored += num;
  });

  if (originalNumber === mirrored) {
    return true;
  }

  return false;
};

// other solutions -----------------------------------------------------------------------

var isPalindrome = function (x) {
  var reverse = 0;
  var copy = x;

  //The loop break when the copy of original number becomes zero
  //Also negative number cannot be a palindrome
  while (copy > 0) {
    const digit = copy % 10;
    reverse = reverse * 10 + digit;
    copy = ~~(copy / 10);
  }

  return reverse == x;
};

// compares the first and last numbers, then advances the indices (but uses String)
var isPalindrome = function (x) {
  //TIME-COMPLEXITY: O(n);
  //MEMORY: O(1);
  const str = x.toString();
  let leftIndex = 0;
  let rightIndex = str.length - 1;

  while (leftIndex < rightIndex) {
    if (str.charAt(leftIndex) !== str.charAt(rightIndex)) {
      return false;
    }
    leftIndex++;
    rightIndex--;
  }

  return true;
};

var isPalindrome = function (x) {
  if (x < 0) return false;

  let rev = 0;
  for (let i = x; i >= 1; i = Math.floor(i / 10)) rev = rev * 10 + (i % 10);
  return rev === x;
};
