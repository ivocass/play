/**
 * Improvements:
 * -should have coded million functionality instead of hardcoding "one million"
 * -should have summed into a temporary number instead of recursing (like one of the other solutions)
 * -could have used switch
 */


const units = {
  and: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

function parseInt(string) {
  if (string === 'zero') return 0;
  if (string === 'one million') return 1000000;

  string = string.replaceAll('-', ' ');

  const words = string.split(' ');
  let output = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const number = units[word];

    if (word === 'hundred') {
      output *= 100;
    } else if (word === 'thousand') {
      output *= 1000;

      if (i + 1 !== words.length) {
        const restOfString = words.slice(i + 1, words.length).join(' ');
        output += parseInt(restOfString);
      }
      break;
    } else {
      output += number;
    }
  }

  return output;
}

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert(parseInt('one'), 1);
// assert(parseInt('twenty'), 20);
// assert(parseInt('two hundred forty-six'), 246);

// assert(parseInt('eighty'), 80);
// assert(parseInt('two thousand'), 2000);
// assert(parseInt('two hundred ninety-six'), 296);
assert(
  parseInt('nine hundred ninety nine thousand nine hundred ninety nine'),
  999999
);



// solutions

function parseInt(string) {
  const conversionTable = {
  "one" : 1, "two" : 2, "three" : 3, "four": 4, "five" : 5, "six" : 6, "seven" : 7,
  "eight" : 8, "nine" : 9, "ten": 10, "eleven" : 11, "twelve" : 12, "thirteen" : 13,
  "fourteen" : 14, "fifteen" : 15, "sixteen": 16, "seventeen" : 17, "eighteen" : 18,
  "nineteen" : 19, "twenty" : 20, "thirty" : 30, "forty" : 40, "fifty" : 50, "sixty" : 60,
  "seventy" : 70, "eighty" : 80, "ninety" : 90, "zero" : 0
  }
  let result = 0, tempNumber = 0;
  let regex = /(\sand\s|-)+/gi;
  string = string.replace(regex, " ").split(" ");
  
  for (let word of string) {
    word = word.toLowerCase();
    switch (word) {
        case "hundred":
          tempNumber *= 100;
          break;
        case "thousand":
          result += tempNumber * 1000;
          tempNumber = 0;
          break;
        case "million":
          tempNumber *= 1000000;
          break;
        default:
          tempNumber += conversionTable[word];
    }
  }
  result += tempNumber;
  return result;
}


var words = {
  "zero":0, "one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9, 
  "ten":10, "eleven":11, "twelve":12, "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16, 
  "seventeen":17, "eighteen":18, "nineteen":19, "twenty":20, "thirty":30, "forty":40, "fifty":50, 
  "sixty":60, "seventy":70, "eighty":80, "ninety":90
};
var mult = { "hundred":100, "thousand":1000, "million": 1000000 };
function parseInt(str) {
  return str.split(/ |-/).reduce(function(value, word) {
    if (words[word]) value += words[word];
    if (mult[word]) value += mult[word] * (value % mult[word]) - (value % mult[word]);
    return value;
  },0);
}