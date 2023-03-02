/**
 * Improvements:
 * -none
 */

function scramble(str1, str2) {
  const visitedIndices = [];

  for (let i = 0, len = str2.length; i < len; i++) {
    const char = str2.charAt(i);
    const fromIndex = visitedIndices[char] || 0;

    const index = str1.indexOf(char, fromIndex);

    if (index === -1) return false;

    visitedIndices[char] = index + 1;
  }

  return true;
}

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(scramble('rkqodlw', 'world'), true);
assert(scramble('cedewaraaossoqqyt', 'codewars'), true);
assert(scramble('katas', 'steak'), false);
assert(scramble('scriptjavx', 'javascript'), false);
assert(scramble('scriptingjava', 'javascript'), true);
assert(scramble('scriptsjava', 'javascripts'), true);
assert(scramble('javscripts', 'javascript'), false);
assert(scramble('jscripts', 'javascript'), false);
assert(scramble('aabbcamaomsccdd', 'commas'), true);
assert(scramble('commas', 'commas'), true);
assert(scramble('sammoc', 'commas'), true);


// other solutions
// https://www.codewars.com/kata/55c04b4cc56a697bb0000048/solutions/javascript
// (I didn't find a better solution, as most devs used split('') and then 
// stored a count of every character in the first string)


// misc

/**
 * My initial solution, which was rejected because of low performance (it 
 * tests with very long inputs).
 * I assumed the problem was the use of split(''), but then I saw that
 * most solutions used it.
 */
function scrambleOld(str1, str2) {
  const str1Chars = str1.split('');

  for (let i = 0, len = str2.length; i < len; i++) {
    const index = str1Chars.indexOf(str2.charAt(i));

    if (index === -1) return false;

    str1Chars[index] = '.';
  }

  return true;
}