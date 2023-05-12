var minDepth = function (root) {
  if (!root) return 0;

  let min = Infinity;

  const dfs = (node, depth) => {
    if (!node.left && !node.right) {
      if (depth < min) {
        min = depth;
      }
    }

    node.left && dfs(node.left, depth + 1);
    node.right && dfs(node.right, depth + 1);
  };

  dfs(root, 1);

  return min;
};

// other solutions -----------------------------------------------------------------------

var minDepth = function (root) {
  if (!root) return 0;

  if (!root.left && !root.right) return 1;

  if (!root.left) return 1 + minDepth(root.right);

  if (!root.right) return 1 + minDepth(root.left);

  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};

var minDepth = function (root) {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;

  const queue = [root];
  let depth = 1;

  while (queue.length) {
    let size = queue.length;

    while (size--) {
      let curr = queue.shift();
      if (!curr.left && !curr.right) return depth;

      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }

    depth++;
  }
};
