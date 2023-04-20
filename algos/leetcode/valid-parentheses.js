const isRight = (left, char) => {
  if (left === '(' && char === ')') {
    return true;
  } else if (left === '[' && char === ']') {
    return true;
  } else if (left === '{' && char === '}') {
    return true;
  }

  return false;
};

var isValid = function (s) {
  let nesting = 0;
  let left;
  let inside = '';

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (!left) {
      left = char;
      nesting++;
      continue;
    }

    if (left === char) {
      nesting++;
      inside += char;
      continue;
    }

    if (isRight(left, char)) {
      nesting--;

      if (nesting === -1) {
        return false;
      }

      if (nesting === 0) {
        if (inside !== '' && !isValid(inside)) {
          return false;
        }

        left = null;
        inside = '';
        continue;
      }
    }

    inside += char;
  }

  if (nesting !== 0) {
    return false;
  }

  return true;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(isValid('(([]){})'), true);
// assert(isValid('([)]'), false);
// assert(isValid('(([]){})'), true);

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false

// other solutions -----------------------------------------------------------------------

var isValid = function (s) {
  // Initialize stack to store the closing brackets expected...
  let stack = [];
  // Traverse each charater in input string...
  for (let idx = 0; idx < s.length; idx++) {
    // If open parentheses are present, push it to stack...
    if (s[idx] == '{') {
      stack.push('}');
    } else if (s[idx] == '[') {
      stack.push(']');
    } else if (s[idx] == '(') {
      stack.push(')');
    }
    // If a close bracket is found, check that it matches the last stored open bracket
    else if (stack.pop() !== s[idx]) {
      return false;
    }
  }
  return !stack.length;
};

var isValid = function (s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (map[c]) {
      stack.push(map[c]);
    } else if (c !== stack.pop()) {
      return false;
    }
  }

  return !stack.length;
};

var isValid = function (s) {
  if (s.length % 2 !== 0) return false; //if size is odd its not balanced
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    switch (c) {
      case '(':
        stack.push(')');
        break;
      case '[':
        stack.push(']');
        break;
      case '{':
        stack.push('}');
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
  }

  return stack.length === 0;
};

const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
};

var isValid = function (s) {
  // check if length is an odd number. if it is, return false
  // if there is an odd number, it means that at least one bracket is missing a pair
  if (s.length % 2 === 1) return false;

  // if the first element is a closing bracket, it doesn't matter what follows
  // it will never have a pair
  if (s[0] === ']' || s[0] === ')' || s[0] === '}') return false;

  // same goes for last element, we are just dealing with opening bracket
  if (
    s[s.length - 1] === '[' ||
    s[s.length - 1] === '(' ||
    s[s.length - 1] === '{'
  )
    return false;

  let stack = [];

  for (let i = 0; i < s.length; i++) {
    // if it's an opening bracket, push into stack
    // else, assume it's closing bracket and check if it matches anything
    if (s[i] === '[' || s[i] === '(' || s[i] === '{') {
      stack.push(s[i]);
    } else if (pairs[stack.pop()] !== s[i]) {
      return false;
    }
  }
  return stack.length === 0;
};
