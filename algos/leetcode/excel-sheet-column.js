var convertToTitle = function (columnNumber) {
  if (columnNumber == 0) return null;

  let output = '';
  let remainder;
  let division;

  while (columnNumber > 0) {
    remainder = columnNumber % 26;
    division = parseInt(columnNumber / 26);

    if (remainder === 0) {
      remainder = 26;
      division = division - 1;
    }

    output += alphabet[remainder];
    columnNumber = division;
  }

  return output.split('').reverse().join('');
};

// other solutions -----------------------------------------------------------------------

var convertToTitle = function (n) {
  if (n < 27) return String.fromCharCode(n + 64);
  var s = '';
  while (n > 0) {
    var temp = n % 26;
    temp = temp == 0 ? 26 : temp;
    s = String.fromCharCode(temp + 64) + s;
    n -= temp;
    n /= 26;
  }
  return s;
};

var convertToTitle = function (n) {
  n = n - 1;
  if (n >= 0 && n < 26) {
    return String.fromCharCode(65 + n);
  }
  return convertToTitle(parseInt(n / 26)) + convertToTitle((n % 26) + 1);
};

var convertToTitle = function (columnNumber) {
  let ans = '';

  while (columnNumber > 0) {
    let code = --columnNumber % 26;
    ans = String.fromCharCode(code + 65) + ans;
    columnNumber = (columnNumber - code) / 26;
  }

  return ans;
};

var convertToTitle = function (columnNumber) {
  let str = '';

  while (columnNumber > 0) {
    columnNumber--;
    str += String.fromCharCode((columnNumber % 26) + 65);
    columnNumber = Math.floor(columnNumber / 26);
  }

  // Reverse the string.
  str = str.split('').reverse().join('');
  return str;
};
