// avoiding the naive solution (split, reverse, join)
var isPalindrome = function (s) {
  let length = s.length;
  let validString = '';

  for (let i = 0; i < length; i++) {
    const char = s[i].toLowerCase();
    const charCode = char.charCodeAt(0);

    if ((charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58)) {
      validString += char;
    }
  }

  length = validString.length;

  let midIndex = Math.floor(length / 2);
  let left = 0;
  let right = length - 1;

  while (midIndex > 0) {
    if (validString[left] !== validString[right]) {
      return false;
    }

    left++;
    right--;

    midIndex--;
  }

  return true;
};

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

assert(isPalindrome('asdsa'), true);
assert(isPalindrome('asds,a'), true);
assert(isPalindrome('asdsaa'), false);
assert(isPalindrome('A man, a plan, a canal: Panama'), true);
assert(isPalindrome('0P'), false);

// other solutions -----------------------------------------------------------------------

const isPalindrome = (s) => {
  s = s.toLowerCase().replace(/[^a-z0-9]/gi, '');
  for (let i = 0, j = s.length - 1; i <= j; i++, j--) {
    if (s.charAt(i) !== s.charAt(j)) return false;
  }
  return true;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (input) {
  var start = 0;
  var end = input.length - 1;
  while (start < end) {
    var s = input.charCodeAt(start);
    var e = input.charCodeAt(end);

    if (!isLetter(s)) {
      start++;
      continue;
    }
    if (!isLetter(e)) {
      end--;
      continue;
    }

    if (toLowerCase(s) !== toLowerCase(e)) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};

var isLetter = function (code) {
  if (
    (code >= 48 && code <= 57) || // numbers
    (code >= 65 && code <= 90) || // uppercase
    (code >= 97 && code <= 122)
  ) {
    // lowercase
    return true;
  } else {
    return false;
  }
};

var toLowerCase = function (code) {
  if (code >= 65 && code <= 90) {
    return code + 32;
  } else {
    return code;
  }
};

var isPalindrome = function (s) {
  // Base case
  if (s == null) return false;
  // Take in lowercase character...
  s = s.toLowerCase();
  // Initialize two pointer variables, left and right and point them with the two ends of the input string...
  let left = 0;
  let right = s.length - 1;
  // Traverse all elements through the loop...
  while (left < right) {
    // Move the left pointer to right so it points to a alphanumeric character...
    while (left < right && !((s.charAt(left) >= 'a' && s.charAt(left) <= 'z') || (s.charAt(left) >= '0' && s.charAt(left) <= '9'))) {
      left++;
    }
    // Similarly move right pointer to left so it also points to a alphanumeric character...
    while (left < right && !((s.charAt(right) >= 'a' && s.charAt(right) <= 'z') || (s.charAt(right) >= '0' && s.charAt(right) <= '9'))) {
      right--;
    }
    // Check if both the characters are same...
    // If it is not equal then the string is not a valid palindrome, hence return false...
    if (s.charAt(left) != s.charAt(right)) {
      return false;
    }
    // If same, then continue to next iteration and move both pointers to point to next alphanumeric character till left < right...
    left++;
    right--;
  }
  // After loop finishes, the string is said to be palindrome, hence return true...
  return true;
};
