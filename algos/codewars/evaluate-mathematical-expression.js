// new and improved solution with simplified tokenization (the old one is down below)
const calc = function (expression) {
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  let result;
  let tokens;

  // remove spaces and convert -- to +
  expression = expression.replace(/ /g, '').replace(/--/g, '+');

  // tokenize (separate complete numbers from operators and parentheses)
  tokens = expression.match(/([0-9.]+|[-*+/()])/g);

  // convert expressions inside parentheses into results
  while (tokens.includes('(')) {
    // find where parentheses start and (really) end
    let indexStart = tokens.indexOf('(');
    let indexEnd = tokens.indexOf(')');

    let indexMid = tokens.indexOf('(', indexStart + 1);
    while (indexMid > -1 && indexMid < indexEnd) {
      indexEnd = tokens.indexOf(')', indexEnd + 1);
      indexMid = tokens.indexOf('(', indexMid + 1);
    }

    const parenthesisExpression = tokens.slice(indexStart + 1, indexEnd);

    tokens = [
      ...tokens.slice(0, indexStart),
      calc(parenthesisExpression.join('')),
      ...tokens.slice(indexEnd + 1),
    ];
  }

  // handle expressions like "-4" by converting them to "0-4"
  if (tokens[0] === '-') tokens.unshift(0);

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

    const right = tokens[idx + 1] === '-' ? 0 : tokens[idx + 1];

    return operations[token](+acc, +right);
  }, tokens[0]);

  return +result;
};


// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

const tests = [
  ['1+1', 2],
  ['1 - 1', 0],
  ['1* 1', 1],
  ['1 /1', 1],
  ['-123', -123],
  ['123', 123],
  ['2 /2+3 * 4.75- -6', 21.25],
  ['12* 123', 1476],
  ['2 / (2 + 3) * 4.33 - -6', 7.732],
  ['1+(2*3)/2', 4],
  ['2*3+1', 7],
  ['2+3*5', 17],
  ['2 + (3*5)', 17],
  ['(4 + 4 * 3) - 2 / (2 + (3*5)) * 4.33 - -6', 21.49058823529412],
  ['8 / (2 + (3*5))', 0.47058823529411764],
  ['2*-1', -2],
  ['((80 - (19)))', 61],
  ['(1 - 2) + -(-(-(-4)))', 3],
];

for (const [input, expected] of tests) {
  assert(calc(input), expected);
}


// other solutions

function calc(expression) {
  let tokens = expression.match(/([0-9.]+|[-+*/()])/g);
  
  function expr() {
    let result = term();
    while (true) {
      let token = tokens.shift();
      if (token == '+') {
          result += term();
      } else if (token == '-') {
          result -= term();
      } else {
          tokens.unshift(token);
          return result;
      }
    }
  }
  
  function term() {
    let result = factor();
    while (true) {
      let token = tokens.shift();
      if (token == '*') {
          result *= factor();
      } else if (token == '/') {
          result /= factor();
      } else {
          tokens.unshift(token);
          return result;
      }
    }
  }
  
  function factor() {
    let token = tokens.shift();
    if (token == '-') return -factor();
    if (token == '(') {
        let result = expr();
        tokens.shift();
        return result;
    }
    return +token;
  }
  
  return expr();
}



/**
 * By ChatGPT 3.5 (Shunting Yard algorithm)
 * "Note that the tokenize(), isNumber(), isOperator(), precedence(), and associativity() 
 * functions are not included in this code snippet, so you'll need to implement them separately."
 */
function calculate(expression) {
  // Step 1: Convert the input string into tokens
  const tokens = tokenize(expression);

  // Step 2: Initialize two stacks
  const operatorStack = [];
  const outputStack = [];

  // Step 3: Process each token
  for (const token of tokens) {
      if (isNumber(token)) {
          // If the token is a number, push it onto the output stack
          outputStack.push(parseFloat(token));
      } else if (isOperator(token)) {
          // If the token is an operator
          while (operatorStack.length > 0 &&
                 isOperator(operatorStack[operatorStack.length - 1]) &&
                 precedence(token) <= precedence(operatorStack[operatorStack.length - 1])) {
              // Pop operators from the operator stack and push them onto the output stack
              outputStack.push(operatorStack.pop());
          }
          // Push the current operator onto the operator stack
          operatorStack.push(token);
      } else if (token === "(") {
          // If the token is a left parenthesis, push it onto the operator stack
          operatorStack.push(token);
      } else if (token === ")") {
          // If the token is a right parenthesis
          while (operatorStack[operatorStack.length - 1] !== "(") {
              // Pop operators from the operator stack and push them onto the output stack
              outputStack.push(operatorStack.pop());
          }
          // Pop the left parenthesis from the operator stack and discard it
          operatorStack.pop();
      }
  }

  // Step 4: Pop any remaining operators from the operator stack and push them onto the output stack
  while (operatorStack.length > 0) {
      outputStack.push(operatorStack.pop());
  }

  // Step 5: Evaluate the expression using the postfix notation represented by the output stack
  const operandStack = [];
  for (const token of outputStack) {
      if (isOperator(token)) {
          // If the token is an operator, pop the last two operands from the operand stack and apply the operator to them
          const op2 = operandStack.pop();
          const op1 = operandStack.pop();
          let result;
          if (token === "+") {
              result = op1 + op2;
          } else if (token === "-") {
              result = op1 - op2;
          } else if (token === "*") {
              result = op1 * op2;
          } else if (token === "/") {
              result = op1 / op2;
          }
          operandStack.push(result);
      } else {
          // If the token is a number, push it onto the operand stack
          operandStack.push(token);
      }
  }

  // The result is the only item left on the operand stack
  return operandStack[0];
}


/**
 * My old solution.
 * In the new one I simplified the tokenization.
 */
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