var longestCommonPrefix = function (words) {
  let output = '';
  let prefix = '';

  const word0 = words[0];
  for (let i = 0; i < word0.length; i++) {
    let matchesAll = true;

    prefix += word0[i];

    for (let j = 1; j < words.length; j++) {
      const otherWord = words[j];

      if (!otherWord.startsWith(prefix)) {
        matchesAll = false;
        break;
      }
    }

    if (!matchesAll) {
      break;
    }

    output = prefix;
  }

  return output;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(longestCommonPrefix(['flower', 'flow', 'flight']), 'fl');

// Example 1:

// Input: strs = ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// other solutions -----------------------------------------------------------------------

var longestCommonPrefix = function (strs) {
  if (!strs.length) return '';
  let prefix = '';
  let maxPrefixLength = Math.min(...strs.map((str) => str.length));
  for (let i = 0; i < maxPrefixLength; i++) {
    let char = strs[0][i];
    if (strs.every((str) => str[i] === char)) {
      prefix += char;
    } else {
      break;
    }
  }
  return prefix;
};
