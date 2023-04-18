/**
 * Here I repurposed calc() from the kata "evaluate-mathematical-expression.js"
 */

class Interpreter {
  constructor() {
    this.vars = {};
  }
  static tokenize(program) {
    const regex =
      /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter((s) => /\S/.test(s));
  }
  input(expr) {
    if (expr === '') {
      return '';
    }

    const tokens = Interpreter.tokenize(expr);

    if (tokens.includes('=')) {
      const varName = tokens[0];

      this.vars[varName] = calc(
        tokens.slice(tokens.indexOf('=') + 1),
        this.vars
      );

      return this.vars[varName];
    }

    if (tokens.length === 1) {
      if (!isNaN(tokens[0])) {
        return tokens[0];
      }

      const varName = tokens[0];

      if (this.vars.hasOwnProperty(varName)) {
        return this.vars[varName];
      }

      throw new Error('Unrecognized variable name:' + varName);
    }

    return calc(tokens, this.vars);
  }
}

const calc = function (tokens, vars) {
  // reccursive calls to this function will provide 'tokens' as a String
  if (!Array.isArray(tokens)) {
    tokens = Interpreter.tokenize(tokens);
  }

  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  };

  let result;

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

  // 'vars' won't be provided in reccursive calls to this function
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      let index = tokens.indexOf(key);
      while (index > -1) {
        tokens[index] = value;
        index = tokens.indexOf(key);
      }
    }
  }

  // handle expressions like "-4" by converting them to "0-4"
  if (tokens[0] === '-') tokens.unshift(0);

  // multiply, divide and modulo
  if (tokens.includes('*') || tokens.includes('/') || tokens.includes('%')) {
    const tempTokens = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token !== '*' && token !== '/' && token !== '%') {
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

const interpreter = new Interpreter();

// assert(interpreter.input('1 + 1'), 2);
// assert(interpreter.input('2 - 1'), 1);
// assert(interpreter.input('2 * 3'), 6);
// assert(interpreter.input('8 / 4'), 2);
// assert(interpreter.input('7 % 4'), 3);
// assert(interpreter.input('x = 1'), 1);
// assert(interpreter.input('x'), 1);
// assert(interpreter.input('x + 3'), 4);

assert(interpreter.input('(4 + 2) * 3'), -1);
// assert.throws(() => interpreter.input('y'));


// other solutions:

function Interpreter()
{
    this.vars = {};
    this.functions = {};
}

Interpreter.prototype.tokenize = function (program)
{
    if (program === "")
        return [];

    var regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(function (s) { return !s.match(/^\s*$/); });
};
const user = {}
Interpreter.prototype.input = function (expr)
{
    if(expr.includes('(')){
      let a = expr.lastIndexOf('('), b = expr.slice(a+1), c = b.indexOf(')')
      let interpreter = new Interpreter()
      return interpreter.input(expr.slice(0,a)+interpreter.input(b.slice(0,c))+b.slice(c+1))
    }

    if(!expr) return ''
    const v = x => +isNaN(x) ? user[x] : +x
    const f = {
      '*':(a,b)=>v(a) * v(b),
      '/':(a,b)=>v(a) / v(b),
      '%':(a,b)=>v(a) % v(b),
      '+':(a,b)=>v(a) + v(b),
      '-':(a,b)=>v(a) - v(b),
      '=':((a,b)=>user[a]=isNaN(+b)?user[b]:+b)
    }
    var tokens = this.tokenize(expr);
    
    for (let x of '*/%,+-,='.split(',')){
      let redo = true
      while(redo) {
        redo=false
        l:for (let t of tokens)
          for (let op of x)
            if (t === op) {
              let i = tokens.indexOf(op)
              tokens = [...tokens.slice(0,i-1), f[op](tokens[i-1],tokens[i+1]), ...tokens.slice(i+2)]
              redo=true
              break l
            }
      }
    }
        
        
    console.log(tokens)
    if (tokens.length === 1) {
      if (!user[tokens[0]] && isNaN(+tokens[0])) throw 'error'
      return isNaN(+tokens[0]) ? user[tokens[0]] : tokens[0]
    }
};