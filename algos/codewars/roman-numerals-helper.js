/**
 * Improvements:
 * -'decimals' should have been called 'position'
 * -the 'case 5' didnt need its own case. it works next to case 6
 * 
 * -thought: the solutions that had less code, did so by hardcoding the values of 9, 90, 900, 4, 40, 400
 */

const dictionary = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const oneChars = ['I', 'X', 'C', 'M'];
const fiveChars = ['V', 'L', 'D'];

Object.freeze(dictionary);
Object.freeze(oneChars);
Object.freeze(fiveChars);

function resolveNumber(num, decimals) {
  switch (num) {
    case 1:
    case 2:
    case 3:
      return oneChars[decimals].repeat(num);
    case 4:
      return oneChars[decimals] + fiveChars[decimals];
    case 5:
      return fiveChars[decimals];
    case 6:
    case 7:
    case 8:
      return fiveChars[decimals] + oneChars[decimals].repeat(num - 5);
    case 9:
      return oneChars[decimals] + oneChars[decimals + 1];
  }

  return '';
}

class RomanNumerals {
  static toRoman(num) {
    const numbers = String(num).split('');
    let decimals = numbers.length;

    return numbers.reduce((output, char) => {
      decimals--;

      return output + resolveNumber(Number(char), decimals);
    }, '');
  }

  static fromRoman(text) {
    let skip = false;

    return text.split('').reduce((total, char, idx) => {
      if (skip) {
        skip = false;
        return total;
      }

      let value = dictionary[char];
      const nextChar = text.charAt(idx + 1);

      if (nextChar !== '') {
        const nextValue = dictionary[nextChar];

        if (nextValue > value) {
          value = nextValue - value;
          skip = true;
        }
      }

      return total + value;
    }, 0);
  }
}

// -------------------

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(RomanNumerals.toRoman(1000), 'M');
assert(RomanNumerals.toRoman(4), 'IV');
assert(RomanNumerals.toRoman(1), 'I');
assert(RomanNumerals.toRoman(1990), 'MCMXC');
assert(RomanNumerals.toRoman(2008), 'MMVIII');
assert(RomanNumerals.toRoman(1557), 'MDLVII');

assert(RomanNumerals.fromRoman('XXI'), 21);
assert(RomanNumerals.fromRoman('I'), 1);
assert(RomanNumerals.fromRoman('IV'), 4);
assert(RomanNumerals.fromRoman('MMVIII'), 2008);
assert(RomanNumerals.fromRoman('MDCLXVI'), 1666);


// other solutions
// https://www.codewars.com/kata/51b66044bce5799a7f000003/solutions/javascript


const map = { M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};

class RomanNumerals {
    static toRoman(num) {
        let str = '';
        for (var i in map) {
            while (num >= map[i]) {
                str += i;
              num -= map[i];
            }
        }
        return str;
    }
    
    static fromRoman(str) {
         return str.match(/CM|CD|XC|XL|IX|IV|\w/g).reduce((acc, el) => acc + map[el], 0);
    }
}

const dec = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const rom = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

class RomanNumerals {
  static fromRoman(str) {
    return str.match(/CM|CD|XC|XL|IX|IV|\w/g).reduce((pre, val) => pre + dec[rom.indexOf(val)], 0);
  }
  
  static toRoman(num) {
    return dec.reduce((pre, val, idx) => pre + rom[idx].repeat(num / val ^ 0, num -= val * (num / val ^ 0)), ``);
  }
}


var RomanNumerals = {};

RomanNumerals.symbols = [
  {symbol: 'M', value: 1000},
  {symbol: 'CM', value: 900},
  {symbol: 'D', value: 500},
  {symbol: 'CD', value: 400},
  {symbol: 'C', value: 100},
  {symbol: 'XC', value: 90},
  {symbol: 'L', value: 50},
  {symbol: 'XL', value: 40},
  {symbol: 'X', value: 10},
  {symbol: 'IX', value: 9},
  {symbol: 'V', value: 5},
  {symbol: 'IV', value: 4},
  {symbol: 'I', value: 1}
];

RomanNumerals.toRoman = function(int) {
  var roman = '';
  var symbols = this.symbols;
  
  for (var i = 0; i < symbols.length; i++) {
    var s = symbols[i];
    while (Math.floor(int / s.value)) {
      roman += s.symbol;
      int -= s.value;
    }
  }
  
  return roman;
};

RomanNumerals.fromRoman = function(string) {
  var int = 0;
  var symbols = this.symbols;
  
  for (var i = 0; i < symbols.length; i++) {
    var s = symbols[i];
    while (string.indexOf(s.symbol) === 0) {
      int += s.value;
      string = string.substring(s.symbol.length);
    }
  }
  
  return int;
};


function RomanNumerals() {
}

RomanNumerals.toRoman = function(n) {
  var r1000 = ["","M","MM","MMM"][Math.floor(n/1000)];
  var r100 = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"][Math.floor(n%1000/100)];
  var r10 = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"][Math.floor(n%100/10)];
  var r1 = ["","I","II","III","IV","V","VI","VII","VIII","IX"][Math.floor(n%10)];  
  return r1000+r100+r10+r1
};

RomanNumerals.fromRoman = function(roman) {
  var order='MDCLXVI'
  var letters = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1}
  var sum = 0
  for (var i=0; i<roman.length-1; i++) {
    sum += (order.indexOf(roman[i]) > order.indexOf(roman[i+1]) ? -1 : 1)*letters[roman[i]]
  }
  sum += letters[roman[roman.length-1]]
  return sum  
}


const arabic = [1000,  900, 500,  400, 100,  90 ,  50,  40 ,  10,   9 ,  5 ,   4 ,  1 ];
const roman  = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

class RomanNumerals {
  static fromRoman(numeral) {
    let number = 0;
    roman.forEach((n, i) => { while (numeral !== (numeral = numeral.replace(RegExp('^'+n),''))) number += arabic[i]; });
    return number;
  }
  static toRoman(number) {
    let numeral = '';
    arabic.forEach((n, i) => { while (number >= n) { numeral += roman[i]; number -= n; } });
    return numeral;
  }
}


const RomanNumerals = {
  toRoman: number => {
  const values = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I']
  ];
    let result = '';
    for (let x of values) {
      while (number >= x[0]) {
        number -= x[0];
        result += x[1];
      }
    }
    return result;
  },
  fromRoman: str => {
    const data = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};
    const fold = (acc, x) => acc > 3 * x ? acc - x : acc + x;
    return str.split('').map(R => data[R]).reduceRight(fold);
  }
}
