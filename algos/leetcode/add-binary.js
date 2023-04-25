var addBinary = function (a, b) {
  if (a.length !== b.length) {
    if (a.length < b.length) {
      a = a.padStart(b.length, '0');
    } else {
      b = b.padStart(a.length, '0');
    }
  }

  if (a === b && b.indexOf('0') === -1) {
    return '1'.repeat(a.length) + '0';
  }

  let sum = [];
  let carrying = false;

  for (let i = a.length - 1; i > -1; i--) {
    if (a[i] === '1' && b[i] === '1') {
      if (carrying) {
        sum[i] = 1;
      } else {
        sum[i] = 0;
      }

      carrying = true;
    } else if (a[i] === '0' && b[i] === '0') {
      if (carrying) {
        sum[i] = 1;
        carrying = false;
      } else {
        sum[i] = 0;
      }
    } else {
      if (carrying) {
        sum[i] = 0;
      } else {
        sum[i] = 1;
      }
    }
  }

  if (carrying) {
    sum.unshift(1);
  }

  return sum.join('');
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(addBinary('1010', '1011'), '10101');
assert(addBinary('11', '1'), '100');
assert(addBinary('1111', '1111'), '11110');
assert(addBinary('11', '11'), '110');
assert(addBinary('101', '111'), '1100');
assert(addBinary('100110', '111111'), '1100101');

// other solutions -----------------------------------------------------------------------

var addBinary = function (a, b) {
  return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};

let addBinary = (a, b) => {
  // Truth Table
  // 1st + 2nd + carry = sum, new carry, decimal sum
  //   0 +  0  + 0 = 0, 0 (0)
  //   0 +  0  + 1 = 1, 0 (1)
  //   0 +  1  + 1 = 0, 1 (2)
  //   1 +  1  + 1 = 1, 1 (3)

  let carry = 0;
  let result = '';

  let len1 = a.length - 1;
  let len2 = b.length - 1;

  for (; len1 >= 0 || len2 >= 0 || carry > 0; len1--, len2--) {
    let sum = (+a[len1] || 0) + (+b[len2] || 0) + carry;
    if (sum > 1) {
      sum = sum % 2;
      carry = 1;
    } else {
      carry = 0;
    }
    result = `${sum}${result}`;
  }
  return result;
};

function addBinary(a: string, b: string): string {
  let result = '';
  let carry = 0;
  let length = Math.max(a.length, b.length);
  let i = 1;
  const its = [];

  while (i <= length) {
    let x = Number(a[a.length - i] || 0);
    let y = Number(b[b.length - i] || 0);
    let sum = x + y + carry;

    carry = sum > 1 ? 1 : 0;
    result = (sum % 2) + result;

    its.push({ i, x, y, carry, sum, result });
    i++;
  }

  if (carry) {
    result = carry.toString(2) + result;
  }
  return result;
}
