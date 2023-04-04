/**
 * Improvements:
 * -in "if (isNaN(aN)) aN = 0;", I should've done a.padStart(b.length - a.length, '0')
 */

const multiply = (a, b) => {
  let carry = 0;
  let emptyCount = 0;
  let partials = [];
  let partial = [];

  for (let i = b.length - 1; i > -1; i--) {
    const bN = Number(b[i]);

    for (let j = a.length - 1; j > -1; j--) {
      const aN = Number(a[j]);

      let res = String(bN * aN + carry);

      carry = 0;

      if (res.length > 1) {
        carry = Number(res[0]);
        res = res[1];
      }

      partial.push(res);

      if (carry > 0 && j === 0) {
        partial.push(String(carry));
        carry = 0;
      }
    }

    const partialStr = partial.reverse().join('') + '0'.repeat(emptyCount);

    partials.push(partialStr);
    partial = [];
    emptyCount++;
  }

  if (partials.length === 1) return partials[0];

  return partials.reduce((acc, partial) => {
    acc = add(acc, partial);
    return acc;
  }, 0);
};

const add = (a, b) => {
  a = String(a);
  b = String(b);

  const partial = [];
  const lengthA = a.length;
  const lengthB = b.length;
  const lengthMax = Math.max(lengthA, lengthB);
  let carry = 0;

  for (let i = 0; i < lengthMax; i++) {
    let aN = Number(a[lengthA - 1 - i]);
    let bN = Number(b[lengthB - 1 - i]);

    if (isNaN(aN)) aN = 0;
    if (isNaN(bN)) bN = 0;

    let res = String(aN + bN + carry);

    carry = 0;

    if (res.length > 1) {
      carry = Number(res[0]);
      res = res[1];
    }

    partial.push(res);

    if (carry > 0 && i === lengthMax - 1) partial.push(String(carry));
  }

  const output = partial.reverse().join('');

  return output;
};

const square = (n) => {
  return multiply(n, n);
};

const lessThan = (a, b) => {
  a = String(a);
  b = String(b);

  if (a.length < b.length) return true;
  if (a.length > b.length) return false;
  if (a === b) return false;

  const length = a.length;
  for (let i = 0; i < length; i++) {
    const tA = a[i];
    const tB = b[i];

    if (tA < tB) return true;
    if (tA > tB) return false;
  }

  return false;
};

const greaterThan = (a, b) => {
  a = String(a);
  b = String(b);
  if (a.length > b.length) return true;
  if (a.length < b.length) return false;
  if (a === b) return false;

  const length = a.length;
  for (let i = 0; i < length; i++) {
    const tA = a[i];
    const tB = b[i];

    if (tA > tB) return true;
    if (tA < tB) return false;
  }

  return false;
};

const validate = (root, against) => {
  const squared = square(root);
  const rootPlus = add(root, 1);
  const squaredPlus = square(rootPlus);
  const isLessThan = lessThan(squared, against);
  const isEqualTo = squared === against;
  const isGreaterThan = greaterThan(squaredPlus, against);

  return (isLessThan || isEqualTo) && isGreaterThan;
};

function integerSquareRoot(input) {
  if (input.length <= 15) {
    return Math.floor(Math.sqrt(input)).toString();
  }

  const maxLength = Math.ceil(input.length / 2);
  const badSqrt = Math.sqrt(input).toString();
  const eIndex = badSqrt.indexOf('e');

  let usableLimit = Math.min(maxLength, 14);
  if (eIndex > -1 && eIndex < usableLimit) usableLimit = eIndex;

  let rootLeft = badSqrt.slice(0, usableLimit).replace('.', '');
  let zeroesAmount = Math.round(input.length / 2 - rootLeft.length);

  if (validate(rootLeft, input)) {
    return rootLeft;
  }

  while (zeroesAmount > 0) {
    const zeroes = '0'.repeat(zeroesAmount - 1);

    for (let i = 0; i < 10; i++) {
      const potentialRoot = rootLeft + String(i) + zeroes;
      const squared = square(potentialRoot);

      if (greaterThan(squared, input)) {
        rootLeft += Number(i - 1).toString();

        if (rootLeft.length === maxLength) {
          if (validate(rootLeft, input)) {
            return rootLeft;
          }
        }

        break;
      }

      if (i === 9) {
        rootLeft += '9';

        if (zeroesAmount < 3) {
          if (validate(rootLeft, input)) return rootLeft;
        }
      }
    }

    zeroesAmount--;
  }

  return -1;
}

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(integerSquareRoot('1'), '1');

assert(integerSquareRoot('5'), '2');

assert(integerSquareRoot('17'), '4');

assert(integerSquareRoot('100'), '10');

assert(integerSquareRoot('1000'), '31');

assert(
  integerSquareRoot(
    '23232328323215435345345345343458098856756556809400840980980980980809092343243243243243098799634'
  ),
  '152421548093487868711992623730429930751178496967'
);

assert(
  integerSquareRoot(
    '12323309809809534545458098709854808654685688665486860956865654654654324238000980980980'
  ),
  '3510457208086937291253621317073222057793129'
);

assert(integerSquareRoot('148303308110201728954030809867'), '385101685415945');
assert(integerSquareRoot('70470558815426995'), '265462914');
assert(
  integerSquareRoot('100000000000000000000000000000000000'),
  '316227766016837933'
);

assert(
  integerSquareRoot('818559378121966912256787339285830365925369143984475356'),
  '904742713771139973062225968'
);

assert(
  integerSquareRoot(
    '1000000000000000000000000000000000000000000000000000000000000000000000000000000'
  ),
  '1000000000000000000000000000000000000000'
);
