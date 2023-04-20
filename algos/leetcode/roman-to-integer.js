// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000

const romanDictComplex = {
  CM: 900,
  CD: 400,
  XC: 90,
  XL: 40,
  IX: 9,
  IV: 4,
};

const romanDictSimple = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

var romanToInt = function (s) {
  let output = 0;

  for (const [key, value] of Object.entries(romanDictComplex)) {
    if (s.includes(key)) {
      output += value;

      s = s.replace(key, '');
    }
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    output += romanDictSimple[char];
  }

  return output;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(romanToInt('MCMXCIV'), 1994);

// Input: s = "III"
// Output: 3
// Explanation: III = 3.
// Example 2:

// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// Example 3:

// Input: s = "MCMXCIV"
// Output: 1994
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

// other solutions -----------------------------------------------------------------------

const symbols = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

var romanToInt = function (s) {
  value = 0;
  for (let i = 0; i < s.length - 1; i += 1) {
    symbols[s[i]] < symbols[s[i + 1]]
      ? (value -= symbols[s[i]])
      : (value += symbols[s[i]]);
  }
  return value + symbols[s[s.length - 1]];
};

// https://leetcode.com/problems/roman-to-integer/solutions/2706813/js-hash-table-with-exlanation/
var romanToInt = function (s) {
  const sym = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = sym[s[i]];
    const next = sym[s[i + 1]];

    if (cur < next) {
      result += next - cur;
      i++;
    } else {
      result += cur;
    }
  }

  return result;
};
