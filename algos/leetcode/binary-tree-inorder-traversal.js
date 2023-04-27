// avoiding recursion and sorting
var inorderTraversal = function (root) {
  const output = [];
  const q = [];
  let dir = 0;

  q.push(root);

  while (q.length > 0) {
    const node = q[q.length - 1];
    if (!node) break;
    if (!node.left && !node.right) {
      output.push(node.val);
      q.pop();
      dir = 1;
      continue;
    }

    if (node.left && dir === 0) {
      q.push(node.left);
      continue;
    }

    if (node.right) {
      output.push(node.val);
      q.pop();
      q.push(node.right);
      dir = 0;
      continue;
    }

    output.push(node.val);
    q.pop();
    dir = 1;
  }

  return output;
};

function levelOrder(root) {
  if (!root) {
    return;
  }

  const res = [];
  const q = [];

  q.push(root);

  while (q.length > 0) {
    const node = q.shift();
    res.push(node.val);

    node.left && q.push(node.left);
    node.right && q.push(node.right);
  }

  return res;
}

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

/**
 * Definition for a binary tree node.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// let root = new TreeNode(1);
// let n2 = (root.right = new TreeNode(2));
// let n3 = (n2.left = new TreeNode(3));

// let root = new TreeNode(3);
// let n1 = (root.left = new TreeNode(1));
// let n2 = (n1.right = new TreeNode(2));

// let root = new TreeNode(25);
// let n15 = (root.left = new TreeNode(15));
// let n50 = (root.right = new TreeNode(50));
// let n10 = (n15.left = new TreeNode(10));
// let n22 = (n15.right = new TreeNode(22));
// let n35 = (n50.left = new TreeNode(35));
// let n70 = (n50.right = new TreeNode(70));
// let n4 = (n10.left = new TreeNode(4));
// let n12 = (n10.right = new TreeNode(12));
// let n18 = (n22.left = new TreeNode(18));
// let n24 = (n22.right = new TreeNode(24));
// let n31 = (n35.left = new TreeNode(31));
// let n44 = (n35.right = new TreeNode(44));
// let n66 = (n70.left = new TreeNode(66));
// let n90 = (n70.right = new TreeNode(90));

// let root = new TreeNode(9);
// let n4 = (root.left = new TreeNode(4));
// let n17 = (root.right = new TreeNode(17));
// let n3 = (n4.left = new TreeNode(3));
// let n6 = (n4.right = new TreeNode(6));
// let n5 = (n6.left = new TreeNode(5));
// let n7 = (n6.right = new TreeNode(7));
// let n22 = (n17.right = new TreeNode(22));
// let n20 = (n22.left = new TreeNode(20));

// let root = createTree([1, null, 2, 3]);
// assert(inorderTraversal(root), [1, 3, 2]);

let root = createTree([-64, 12, 18, -4, -53, null, 76, null, -51, null, null, -93, 3, null, -31, 47, null, 3, 53, -81, 33, 4, null, -51, -44, -60, 11, null, null, null, null, 78, null, -35, -64, 26, -81, -31, 27, 60, 74, null, null, 8, -38, 47, 12, -24, null, -59, -49, -11, -51, 67, null, null, null, null, null, null, null, -67, null, -37, -19, 10, -55, 72, null, null, null, -70, 17, -4, null, null, null, null, null, null, null, 3, 80, 44, -88, -91, null, 48, -90, -30, null, null, 90, -34, 37, null, null, 73, -38, -31, -85, -31, -96, null, null, -18, 67, 34, 72, null, -17, -77, null, 56, -65, -88, -53, null, null, null, -33, 86, null, 81, -42, null, null, 98, -40, 70, -26, 24, null, null, null, null, 92, 72, -27, null, null, null, null, null, null, -67, null, null, null, null, null, null, null, -54, -66, -36, null, -72, null, null, 43, null, null, null, -92, -1, -98, null, null, null, null, null, null, null, 39, -84, null, null, null, null, null, null, null, null, null, null, null, null, null, -93, null, null, null, 98]);
assert(inorderTraversal(root), [-4, -51, -81, -31, 33, 12, -53, -64, 18, 78, 4, 47, -93, 76, 8, -35, -67, -38, -51, 73, -33, 3, -54, 86, -66, -38, -37, -36, 81, -31, -72, -42, 80, -85, 47, 98, 43, -31, -40, 44, 70, -92, -96, -93, -1, -26, -98, -19, -88, -64, 24, -18, -91, 67, 10, 12, 34, 92, 48, 72, 72, -27, 98, 39, -55, -90, -17, 3, -77, -30, 72, -24, 26, -44, -59, -81, -70, 56, 90, -84, -67, -65, -49, -88, -34, -53, 17, 37, 3, -4, -11, -31, -51, -60, 67, 27, 53, 60, 11, 74]);

// assert(inorderTraversal(root), [1, 3, 2]);
// assert(inorderTraversal(root), [1, 2, 3]);
// assert(inorderTraversal(root), [-1]);
// assert(inorderTraversal(root), []);
// assert(inorderTraversal(new TreeNode()));
// assert(inorderTraversal(new TreeNode(1)));
// assert((), );
// assert((), );

/**
 * An array of node values in LeetCode's format.
 * Eg: [-64,12,18,-4,-53,null,76,null]
 */
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

function inorderTraversal(root) {
  const res = [];
  const stack = [];
  let node = root;

  while (node || stack.length) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      res.push(node.val);
      node = node.right;
    }
  }

  return res;
}

const inorderTraversal = (root) => {
  const res = [];
  const stack = [];
  let curr = root;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    res.push(curr.val);
    curr = curr.right;
  }
  return res;
};
