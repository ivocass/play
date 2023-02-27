/**
 * Improvements:
 * -could have done return morseCode.trim().split...
 * -could have made it easier to understand, like the other solution
 */

const MORSE_CODE = [];
MORSE_CODE['....'] = 'H';
MORSE_CODE['.'] = 'E';
MORSE_CODE['-.--'] = 'Y';
MORSE_CODE['.---'] = 'J';
MORSE_CODE['..-'] = 'U';
MORSE_CODE['-..'] = 'D';

const decodeMorse = function (morseCode) {
  morseCode = morseCode.trim();

  return morseCode
    .split('   ')
    .map((word) => {
      return word
        .split(' ')
        .map((char) => MORSE_CODE[char])
        .join('');
    })
    .join(' ');
};

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(decodeMorse('.... . -.--   .--- ..- -.. .'), 'HEY JUDE');


// solutions

decodeMorse = function(morseCode){
  function decodeMorseLetter(letter) {
    return MORSE_CODE[letter];
  }
  function decodeMorseWord(word) {
    return word.split(' ').map(decodeMorseLetter).join('');
  }
  return morseCode.trim().split('   ').map(decodeMorseWord).join(' ');
}