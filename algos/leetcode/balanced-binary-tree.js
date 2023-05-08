function isBalanced(root) {
  function height(node) {
    if (!node) {
      return 0;
    }

    const leftHeight = height(node.left);

    if (leftHeight === -1) {
      return -1;
    }

    const rightHeight = height(node.right);

    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return height(root) !== -1;
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function toTree(array) {
  function buildTree(index) {
    if (index >= array.length || array[index] === null || array[index] === undefined) {
      return null;
    }

    const node = new TreeNode(array[index]);

    node.left = buildTree(2 * index + 1);
    node.right = buildTree(2 * index + 2);

    return node;
  }

  return buildTree(0);
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

assert(isBalanced(toTree([3, 9, 20, null, null, 15, 7])), true);
// assert(isBalanced(toTree([1, 2, 2, 3, null, null, 3, 4, null, null, 4])), false);

// other solutions -----------------------------------------------------------------------
