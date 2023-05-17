var preorderTraversal = function (root) {
  if (!root) return [];

  const output = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    output.push(node.val);

    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return output;
};

// other solutions -----------------------------------------------------------------------
