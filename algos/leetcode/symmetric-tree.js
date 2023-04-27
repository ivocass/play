var isSymmetric = function (root) {
  const q = [root.left, root.right];

  while (q.length > 0) {
    const a = q.shift();
    const b = q.shift();

    if (!a && !b) {
      continue;
    }

    if (!a || !b) {
      return false;
    }

    if (a.val !== b.val) {
      return false;
    }

    q.push(a.left);
    q.push(b.right);
    q.push(a.right);
    q.push(b.left);
  }

  return true;
};

// --------------------------
function assert(output, expected) {
  if (Array.isArray(output) && Array.isArray(expected)) {
    const isEqualSize = output.length === expected.length;
    const areValuesEqual = output.every((a, i) => a === expected[i]);
    console.log('test is', isEqualSize && areValuesEqual, output, '/expected:', expected);
  } else {
    console.log('test is', output === expected, output, '/expected:', expected);
  }
}

// assert((), );

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// let root = createTree([1, 2, 2, 3, 4, 4, 3]);
// assert(isSymmetric(root), true);

let root = createTree([1, 2, 2, null, 3, null, 3]);
assert(isSymmetric(root), false);

function createTree(array) {
  const root = new TreeNode(array[0]);
  const q = [];

  q.push(root);

  let i = 1;
  while (q.length > 0 && i < array.length) {
    const node = q.shift();

    const left = array[i];
    const right = array[i + 1];

    if (left !== null && left !== undefined) {
      node.left = new TreeNode(left);
      q.push(node.left);
    }

    if (right !== null && right !== undefined) {
      node.right = new TreeNode(right);
      q.push(node.right);
    }

    i += 2;
  }

  return root;
}

// other solutions -----------------------------------------------------------------------

// my recursive solution (the challenge encouraged iterative)
const isMirrored = (p, q) => {
  if (p && q) {
    if (p.val !== q.val) {
      return false;
    }

    return isMirrored(p.left, q.right) && isMirrored(p.right, q.left);
  }

  return p === q;
};

var isSymmetric = function (root) {
  return isMirrored(root.left, root.right);
};
