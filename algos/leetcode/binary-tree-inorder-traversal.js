// avoiding recursion and sorting
var inorderTraversal = function (root) {
  const output = [];
  const q = [];
  let dir = 0;

  q.push(root);
  // debugger;
  let i = 0;
  while (q.length > 0) {
    i++;
    if (i > 100) {
      console.warn('EXIT');
      break;
    }
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
    console.log(
      'test is',
      isEqualSize && areValuesEqual,
      output,
      '/expected:',
      expected
    );
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

let root = new TreeNode(2);
let n3 = (root.left = new TreeNode(3));
let n1 = (n3.left = new TreeNode(1));

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

assert(inorderTraversal(root), [1, 3, 2]);
// assert(inorderTraversal(root), [1, 3, 2]);
// assert(inorderTraversal(root), [1, 2, 3]);
// assert(inorderTraversal(root), [-1]);
// assert(inorderTraversal(root), []);
// assert(inorderTraversal(new TreeNode()));
// assert(inorderTraversal(new TreeNode(1)));
// assert((), );
// assert((), );

// other solutions -----------------------------------------------------------------------
