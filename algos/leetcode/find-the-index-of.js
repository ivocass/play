/**
 * Avoiding the use of haystack.indexOf().
 * The problem's description should say it's not allowed.
 */
var strStr = function (haystack, needle) {
  const needle0 = needle[0];
  const needleLength = needle.length;

  for (let i = 0; i < haystack.length; i++) {
    const char = haystack[i];

    if (char !== needle0) {
      continue;
    }

    let pointer = i;
    for (let j = 0; j < needleLength; j++, pointer++) {
      if (haystack[pointer] !== needle[j]) {
        break;
      }

      if (j === needleLength - 1) {
        return i;
      }
    }
  }

  return -1;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert((), );
// console.log('res', strStr('rrrdsadbutsad', 'sad'));
console.log('res', strStr('mississippi', 'issip'));

// other solutions -----------------------------------------------------------------------

// Time Complexity: O(m*n)
// Space Complexity: O(1)
var strStr = function (haystack, needle) {
  if (needle.length == 0) return 0;
  for (let i = 0; i < haystack.length; i++) {
    let k = i,
      j = 0;
    while (haystack[k] == needle[j] && j < needle.length) {
      k++, j++;
    }
    if (j == needle.length) return i;
  }
  return -1;
};

var strStr = function (haystack, needle) {
  if (!needle) return 0;
  let idx = 0;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] != needle[idx]) {
      i = i - idx;
      idx = 0;
    } else {
      if (idx == needle.length - 1) return i - idx;
      idx++;
    }
  }
  return -1;
};
