const calc = function (expression) {
  // match operators and parentheses
  const regexNaN = /[+\-*/()]/;
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  let result;
  let insideParentheses = false;
  let parenthesesDepth = 0;
  let tokens = [];
  let token = '';

  expression = expression.replace(/ /g, '').replace(/--/g, '+');

  // build tokens
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (insideParentheses && char !== '(' && char !== ')') {
      token += char;
      continue;
    }

    if (char === '(') {
      insideParentheses = true;

      if (parenthesesDepth > 0) token += '(';

      parenthesesDepth++;
      continue;
    }

    if (char === ')') {
      parenthesesDepth--;

      if (parenthesesDepth === 0) {
        insideParentheses = false;

        if (regexNaN.test(token)) {
          token = calc(token);
        } else {
          token = Number(token);
        }
      } else {
        token += ')';
      }

      if (i === expression.length - 1) tokens.push(token);

      continue;
    }

    // if operand, settle the token as a Number
    if ('+-/*'.includes(char)) {
      // handle "*-" and "/-"
      const prev = expression[i - 1];
      if (char === '-' && (prev === '*' || prev === '/')) {
        tokens.push(char);
        continue;
      }

      tokens.push(Number(token));
      token = '';

      tokens.push(char);
      continue;
    }

    token += char;

    if (i === expression.length - 1) {
      tokens.push(Number(token));
    }
  }

  // multiply and divide
  if (tokens.includes('*') || tokens.includes('/')) {
    const tempTokens = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token !== '*' && token !== '/') {
        tempTokens.push(token);
        continue;
      }
      const operandLeft = tempTokens[tempTokens.length - 1];
      let operandRight = tokens[i + 1];

      // handle "*-" and "/-"
      if (operandRight === '-') {
        operandRight = tokens[i + 2] * -1;
        i++;
      }

      const result = operations[token](operandLeft, operandRight);

      tempTokens[tempTokens.length - 1] = result;
      i++;
    }

    tokens = tempTokens;
  }

  // add and subtract
  result = tokens.reduce((acc, token, idx) => {
    if (token !== '+' && token !== '-') return acc;

    return operations[token](acc, tokens[idx + 1]);
  }, tokens[0]);

  return result;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

const tests = [
  // ['1+1', 2],
  // ['1 - 1', 0],
  // ['1* 1', 1],
  // ['1 /1', 1],
  // ['-123', -123],
  // ['123', 123],
  // ['2 /2+3 * 4.75- -6', 21.25],
  // ['12* 123', 1476],
  // ['2 / (2 + 3) * 4.33 - -6', 7.732],

  // ['1+(2*3)/2', 4],
  // ['2*3+1', 7],
  // ['2+3*5', 17],
  // ['2 + (3*5)', 17],
  ['(4 + 4 * 3) - 2 / (2 + (3*5)) * 4.33 - -6', 21.49058823529412],
  // ['8 / (2 + (3*5))', 0.47058823529411764],
  // ['2*-1', -2],
];

for (const [input, expected] of tests) {
  assert(calc(input), expected);
}
