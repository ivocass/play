var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
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

// let root = createTree([0, 2, 4, 1, null, 3, -1, 5, 1, null, 6, null, 8]);
// assert(maxDepth(root), 4);

let root = createTree([5, 0, -4, -1, -6, -9, null, 7, null, 1, 3, null, 0, null, 9, null, null, 6, 0, null, -7, null, null, null, null, null, null, -4, null, 1, null, null, -4]);
assert(maxDepth(root), 8);

console.log('count', count);

// let root = createTree([3, 9, 20, null, null, 15, 7]);
// assert(maxDepth(root), 3);

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

var maxDepth = function (root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length !== 0) {
    depth++;
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      if (queue[i].left) queue.push(queue[i].left);
      if (queue[i].right) queue.push(queue[i].right);
    }
    queue.splice(0, len);
  }
  return depth;
};
