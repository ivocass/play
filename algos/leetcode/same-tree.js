var isSameTree = function (p, q) {
  const traverse = (n1, n2) => {
    if (!n1 || !n2) {
      if (!n1 && !n2) {
        return true;
      }
      return false;
    }

    if (n1.val !== n2.val) {
      return false;
    }

    const res1 = traverse(n1.left, n2.left);
    const res2 = traverse(n1.right, n2.right);

    return res1 && res2;
  };

  return traverse(p, q);
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

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// let r1 = createTree([1, 2, 3]);
// let r2 = createTree([1, 2, 3]);
// assert(isSameTree(r1, r2), true);

// let r1 = createTree([1, 2, 3, 4]);
// let r2 = createTree([1, 2, 3]);
// assert(isSameTree(r1, r2), false);

let r1 = createTree([1, 2]);
let r2 = createTree([1, null, 2]);
assert(isSameTree(r1, r2), false);

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
// assert((), );

// other solutions -----------------------------------------------------------------------

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  const queue = [p, q];
  while (queue.length > 0) {
    const first = queue.shift();
    const second = queue.shift();

    if (!first && !second) continue;
    if (!first || !second || first.val !== second.val) return false;

    queue.push(first.left);
    queue.push(second.left);
    queue.push(first.right);
    queue.push(second.right);
  }

  return true;
}

var isSameTree = function (p, q) {
  if (p && q) {
    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  return p == q;
};
