var hasPathSum = function (root, targetSum) {
  if (!root) return false;

  let flag = false;

  const dfs = (node, sum = 0) => {
    sum += node.val;

    if (sum === targetSum && !node.left && !node.right) {
      flag = true;
    }

    node.left && dfs(node.left, sum);
    node.right && dfs(node.right, sum);
  };

  dfs(root);

  return flag;
};

console.log('hasPathSum', hasPathSum(bst.root, 1));

// other solutions -----------------------------------------------------------------------

var hasPathSum = function (root, sum) {
  if (!root) return false;

  // check leaf
  if (!root.left && !root.right) {
    return sum === root.val;
  }

  // continue DFS
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
};

var hasPathSum = function (root, targetSum) {
  const dfs = (root, target) => {
    if (!root) return false;

    if (!root.left && !root.right) {
      return target - root.val === 0;
    }

    return dfs(root.left, target - root.val) || dfs(root.right, target - root.val);
  };

  return dfs(root, targetSum);
};
