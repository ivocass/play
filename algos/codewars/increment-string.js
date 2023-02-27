/**
 * Improvements:
 * -to add 3 leading zeroes: str.padStart(3 + str.length, 0)
 * -lastChar should be: str.slice(0, -1)
 */

function incrementString(string) {
  let word = '';
  let number = '';
  let leadingZeroes = 0;

  for (let i = string.length - 1; i > -1; i--) {
    const char = string.charAt(i);

    if (isNaN(char)) {
      word = string.slice(0, i + 1);
      break;
    }

    number += char;

    if (char === '0') leadingZeroes++;
    else leadingZeroes = 0;
  }

  number = number.split('').reverse().join('');

  const lastChar = number.charAt(number.length - 1);
  if (lastChar === '9' || lastChar === '0') leadingZeroes--;

  for (let i = 0; i < leadingZeroes; i++) {
    word += '0';
  }

  number = Number(number) + 1;

  return word + String(number);
}


function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(incrementString('foobar000'), 'foobar001');
assert(incrementString('foobar999'), 'foobar1000');
assert(incrementString('foobar00999'), 'foobar01000');
assert(incrementString('foo'), 'foo1');
assert(incrementString('foobar001'), 'foobar002');
assert(incrementString('foobar1'), 'foobar2');
assert(incrementString('1'), '2');
assert(incrementString('009'), '010');
assert(incrementString('fo99obar99'), 'fo99obar100');



// solutions


function incrementString(str) {
  var c = str[str.length - 1];
  debugger;
  switch (c) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
      return str.substring(0, str.length - 1) + (parseInt(c) + 1);
    case '9':
      return incrementString(str.substring(0, str.length - 1)) + 0;
    default:
      return str + '1';
  }
}


const incrementString = (s) => s.replace(/[0-8]?9*$/, (m) => ++m);


const incrementString = (str) =>
  str.replace(/([0-8]?)(9*)$/, (num) => (num ? Number(num) + 1 : 1));
