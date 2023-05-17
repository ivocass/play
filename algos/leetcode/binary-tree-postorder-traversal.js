var postorderTraversal = function (root) {
  if (!root) return [];

  const output = [];
  const stack1 = [root];
  const stack2 = [];

  while (stack1.length) {
    const node = stack1.pop();

    stack2.push(node);

    node.left && stack1.push(node.left);
    node.right && stack1.push(node.right);
  }

  while (stack2.length) {
    const node = stack2.pop();
    output.push(node.val);
  }

  return output;
};

// other solutions -----------------------------------------------------------------------

var postorderTraversal = function (root) {
  if (!root) return [];

  const stack = [root];
  const result = [];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result.reverse();
};
