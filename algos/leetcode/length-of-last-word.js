/**
 * Without trim(), split(' '), lastIndexOf(' '), etc.
 */
var lengthOfLastWord = function (s) {
  let count = 0;

  for (let i = s.length - 1; i > -1; i--) {
    if (s[i] === ' ') {
      if (count === 0) {
        continue;
      }

      break;
    } else {
      count++;
    }
  }

  return count;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(lengthOfLastWord('   fly me   to   the moon  '), 4);

// other solutions -----------------------------------------------------------------------
