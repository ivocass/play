/**
 * Improvements:
 * -this is redundant (as I later do indexOf): if (!abc.includes(char))
 * -processKey() can be replaced with "".padEnd(text.length, key) 
 */

class VigenèreCipher {
  #key;
  #abc;

  constructor(key, abc) {
    this.#key = key;
    this.#abc = abc;
  }

  encode(text) {
    return this.#encodeDecode(text, 1);
  }

  decode(text) {
    return this.#encodeDecode(text, -1);
  }

  #encodeDecode(text, direction) {
    if (direction !== -1 && direction !== 1) throw RangeError;

    const processedKey = this.#processKey(text);
    const abc = this.#abc;

    return text.split('').reduce((newText, char, idx) => {
      if (!abc.includes(char)) return newText + char;

      const processedKeyChar = processedKey[idx];

      const charIndex = abc.indexOf(char);
      const keyCharIndex = abc.indexOf(processedKeyChar);
      const shiftedIndex = this.#shiftIndex(charIndex, keyCharIndex, direction);

      return newText + abc[shiftedIndex];
    }, '');
  }

  #shiftIndex(charIndex, keyCharIndex, direction) {
    let shiftedIndex = charIndex + keyCharIndex * direction;

    if (shiftedIndex >= this.#abc.length) {
      shiftedIndex = shiftedIndex - this.#abc.length;
    } else if (shiftedIndex < 0) {
      shiftedIndex = this.#abc.length + shiftedIndex;
    }

    return shiftedIndex;
  }

  #processKey(text) {
    let output = '';

    while (output.length < text.length) {
      output += this.#key;
    }

    return output.slice(0, text.length);
  }
}

// ----------------------

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

var abc, key;
abc = 'abcdefghijklmnopqrstuvwxyz';
key = 'password';
// key = 'pizza';
var c = new VigenèreCipher(key, abc);

// assert(c.encode('pancakes'), 'eimbazmr');
// assert(c.encode('asodavwt'), 'pancakes');
assert(c.decode('rovwsoiv'), 'codewars');

assert(c.encode('waffles'), 'laxxhsj');
assert(c.decode('laxxhsj'), 'waffles');

assert(c.encode('CODEWARS'), 'CODEWARS');
assert(c.decode('CODEWARS'), 'CODEWARS');


// other solutions

function VigenèreCipher(key, abc) {
  this.encode = function (str) {
    let fullKey = "".padEnd(str.length, key)    
    str = str.split("")
    str = str.map((x,i)=>abc.indexOf(x) !== -1?abc[(abc.indexOf(x)+abc.indexOf(fullKey[i]))%abc.length]:x)
    return str.join("") 
  };
  this.decode = function (str) {
    let fullKey = "".padEnd(str.length, key)    
    str = str.split("")
    str = str.map((x,i)=>abc.indexOf(x) !== -1?abc[(abc.indexOf(x)-abc.indexOf(fullKey[i])+abc.length)%abc.length]:x)
    return str.join("")
  };
}