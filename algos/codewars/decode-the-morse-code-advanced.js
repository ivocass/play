/**
 * Improvements:
 * -the code to get an array with all the sequences of ones (from chatgpt):
 * const regex = /1+/g;
 * const arrayOfOnes = str.match(regex);
 * 
 * -the conditionals at the bottom of getTimeUnits() can be simplified.
 * -regex to trim zeroes: replace(/^0+|0+$/g, '')
 * -string.repeat() exists 😂
 */

const MORSE_CODE = [];
MORSE_CODE['....'] = 'H';
MORSE_CODE['.'] = 'E';
MORSE_CODE['-.--'] = 'Y';
MORSE_CODE['.---'] = 'J';
MORSE_CODE['..-'] = 'U';
MORSE_CODE['-..'] = 'D';

MORSE_CODE['--'] = 'M';
MORSE_CODE['..'] = 'I';
MORSE_CODE['-'] = 'T';

const decodeBits = function (bits) {
  // trim leading and trailing zeroes
  bits = bits.slice(bits.indexOf('1'), bits.lastIndexOf('1') + 1);

  const timeUnit = getTimeUnit(bits);

  const dictionary = [
    [multiplyText('1', timeUnit * 3), '-'],
    [multiplyText('1', timeUnit), '.'],
    [multiplyText('0', timeUnit * 7), '   '],
    [multiplyText('0', timeUnit * 3), ' '],
    [multiplyText('0', timeUnit), ''],
  ];

  for (let i = 0; i < dictionary.length; i++) {
    const [key, value] = dictionary[i];

    bits = replaceAll(bits, key, value);
  }

  return bits;
};

const decodeMorse = function (morseCode) {
  const decodeChar = (char) => MORSE_CODE[char];
  const decodeWord = (word) => word.split(' ').map(decodeChar).join('');

  return morseCode.trim().split('   ').map(decodeWord).join(' ');
};

function getTimeUnit(bits) {
  // replace zeroes with spaces, then compress multiple spaces to one
  const bitsTemp = replaceAll(bits, '0', ' ').replace(/ +(?= )/g, '');

  // the length of every sequence of '1's
  const sequenceLengths = bitsTemp.split(' ').map((seq) => seq.length);

  // if no zeroes in between, return the amount of '1's
  if (sequenceLengths.length === 1) {
    return sequenceLengths[0];
  }

  // the lengths of the shortest and longest sequences
  const min = Math.min(...sequenceLengths);
  const max = Math.max(...sequenceLengths);

  // get the length of the first sequence of zeroes
  let indexOf0 = bits.indexOf('0');
  let indexOf1 = bits.indexOf('1', indexOf0);
  const zeroSequenceLength = bits.slice(indexOf0, indexOf1).length;

  // if we only have a single sequence of '1's
  if (min === max) {
    // if the '1's weren't separated by a zero, return the amount of '1's
    if (zeroSequenceLength === 0 || zeroSequenceLength > max) {
      return min;
    }

    return zeroSequenceLength;
  }

  return min;
}

/**
 * string.replaceAll() isn't available
 */
function replaceAll(string, replaceWhat, replaceWith) {
  const searchRegExp = new RegExp(replaceWhat, 'g');

  return string.replace(searchRegExp, replaceWith);
}

function multiplyText(text, multiplier) {
  return text.padStart(text.length * multiplier, text);
}

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert(decodeMorse(

// const res = decodeBits(
//   '1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011'
// );

const bits = [
  // '11111100111111',
  // '1110111',
  // '110011',
  // '01110',
  // '0001111111100',
  // '111111000000111111000000111111000000111111000000000000000000111111000000000000000000111111111111111111000000111111000000111111111111111111000000111111111111111111000000000000000000000000000000000000000000111111000000111111111111111111000000111111111111111111000000111111111111111111000000000000000000111111000000111111000000111111111111111111000000000000000000111111111111111111000000111111000000111111000000000000000000111111',
  '1110001010101000100000001110111010111000101011100010100011101011101000111010111000000011101010100010111010001110111011100010111011100011101000000010101110100011101110111000111010101110000000101110111011100010101110001110111000101110111010001010100000001110111011100010101011100010001011101000000011100010101010001000000010111010100010111000111011101010001110101110111000000011101010001110111011100011101110100010111010111010111',
  // '1110111',
  // '10001',
  // '1110000000111',
  // '101',
  // '1110111',
  // '110011',
];

for (let i = 0; i < bits.length; i++) {
  let res = decodeBits(bits[i]);
  console.log('decodeBits', res);

  console.log('decodeMorse', decodeMorse(res));
  console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
}


// other solutions


var decodeBits = function(bits){
  bits = bits.replace(/^0+/, "").replace(/0+$/, "")
  
  const bitsMatch = bits.match(/(1|0)\1*/g)
  
  const transmissionRate = bitsMatch.map(bits => bits.length).sort((a,b) => a-b)[0]
  const regex = (r, l) => new RegExp(`${r}{${l*transmissionRate}}`, "g")
  
  return bits.replace(regex("1", 3), "-")
    .replace(regex("1", 1), ".").replace(regex("0", 7), "   ")
    .replace(regex("0", 3), " ").replace(regex("0", 1), "")
}

var decodeMorse = morseCode => morseCode.split("   ").map(word => word.split(" ").map(char => MORSE_CODE[char]).join("")).join(" ")
  

function decodeMorse (input) {
  return input.split('   ')
    .map(w => w.split(' ').map(l => MORSE_CODE[l]).join(''))
    .join(' ')
}

function decodeBits (bits) {
  const bitSequences = bits.replace(/^0+|0+$/g, '').match(/0+|1+/g)
  const timeUnitLength = Math.min(...bitSequences.map(b => b.length))

  const vocabulary = {
    ['0'.repeat(7 * timeUnitLength)]: '   ',
    ['0'.repeat(3 * timeUnitLength)]: ' ',
    ['0'.repeat(timeUnitLength)]: '',
    ['1'.repeat(timeUnitLength)]: '.',
    ['1'.repeat(3 * timeUnitLength)]: '-'
  }

  return bitSequences.map(p => vocabulary[p]).join('')
}


const decodeBits = bits => {
  bits = bits.replace(/(^0+|0+$)/g, '');
  const rate = Math.min.apply(
    null,
    bits.match(/0+|1+/g).map(pace => pace.length),
  );

  return bits
    .replace(RegExp('0'.repeat(7 * rate), 'g'), '   ')
    .replace(RegExp('0'.repeat(3 * rate), 'g'), ' ')
    .replace(RegExp('1'.repeat(3 * rate), 'g'), '-')
    .replace(RegExp('1'.repeat(1 * rate), 'g'), '.')
    .replace(RegExp('0'.repeat(1 * rate), 'g'), '');
};

const decodeMorse = morseCode =>
  morseCode.replace(/ ?[.-]+ ?/g, code => MORSE_CODE[code.trim()]).trim();


function decodeBits (bits) {
  let codes = bits
    .replace(/^0+/, '')
    .replace(/0+$/, '')
    .match(/(0+|1+)/g)
  
  let counts = codes.map((e) => { return e.length })
  let min = Math.min(...counts)
  
  return codes
    .map((code) => {
      switch (code.slice(0, code.length / min)) {
        case '0'      : return ''
        case '1'      : return '.'
        case '111'    : return '-'
        case '000'    : return ' '
        case '0000000': return '   '
      }
    }).join('')
}

function decodeMorse (morse) {
  return morse.replace(/ ?[.-]+ ?/g, (e) => {
    return MORSE_CODE[e.trim()]
  }).trim()
}


var decodeBits = function( bits ) {
  bits = bits.replace( /(^0+|0+$)/g, '' );
  let timeUnit = Math.min.apply( null, bits.match( /0+|1+/g ).map( item => item.length ) );
  
  return bits
    .replace( new RegExp( '0'.repeat( 7 * timeUnit ), 'g' ), '   ' )
    .replace( new RegExp( '0'.repeat( 3 * timeUnit ), 'g' ), ' ' )
    .replace( new RegExp( '1'.repeat( 3 * timeUnit ), 'g' ), '-' )
    .replace( new RegExp( '1'.repeat( 1 * timeUnit ), 'g' ), '.' )
    .replace( new RegExp( '0'.repeat( 1 * timeUnit ), 'g' ), '' );
};

var decodeMorse = function(morseCode){
    return morseCode.trim().split( '   ' )
      .reduce( ( res, word ) => res + ' ' + word.split( ' ' ).reduce( ( word, letter ) => word + MORSE_CODE[ letter ], '' ), '' )
      .trim();
};


// misc

/**
 * My initial, alternative way of getting the sequences lengths.
 * Before submitting, I redesigned it and discarded this one.
 * This is more performant but less elegant.
 */
function getTimeUnits(bits) {
  
  // the lengths of sequences of '1's. eg: '110111' will return [2, 3]
  const sequenceLengths = [];

  // the amount of times a zero shows up between two sequences of '1's
  let zeroSequenceLength = 0;

  // the amount of '1's in the current sequence
  let length = 0;

  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '1') {
      length++;

      // if this is the last char, push the sequence
      if (i === bits.length - 1) sequenceLengths.push(length);
    } else {
      // if a sequence was being built. otherwise we'd execute multiple times on a sequence of '0's
      if (length > 0) {
        sequenceLengths.push(length);

        // if we've just acquired two distinct sequences of '1's
        if (sequenceLengths.length > 1 && sequenceLengths[i - 1] !== length)
          break;

        // reset, so that we start counting the next sequence
        length = 0;
      }

      // only count zeroes if we saved the length of one sequence of '1's
      if (sequenceLengths.length === 1) {
        zeroSequenceLength++;
      }
    }
  }

  // etc (I kept the rest of this function in the one I submitted)
}