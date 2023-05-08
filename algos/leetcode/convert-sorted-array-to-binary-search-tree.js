function sortedArrayToBST(nums) {
  if (nums.length === 0) {
    return null;
  }

  const midIndex = Math.floor(nums.length / 2);

  const root = new TreeNode(nums[midIndex]);

  root.left = sortedArrayToBST(nums.slice(0, midIndex));
  root.right = sortedArrayToBST(nums.slice(midIndex + 1));

  return root;
}

// other solutions -----------------------------------------------------------------------

var sortedArrayToBST = function (nums) {
  const createBst = (left, right) => {
    if (left > right) return null;
    const mid = Math.floor((left + right) / 2);
    const currentNode = new TreeNode(nums[mid]);
    currentNode.left = createBst(left, mid - 1);
    currentNode.right = createBst(mid + 1, right);
    return currentNode;
  };
  return createBst(0, nums.length - 1);
};

var sortedArrayToBST = function (nums, start = 0, end = nums.length - 1) {
  if (start <= end) {
    let mid = Math.floor((start + end) / 2);

    let root = new TreeNode(nums[mid]);

    root.left = sortedArrayToBST(nums, start, mid - 1);
    root.right = sortedArrayToBST(nums, mid + 1, end);

    return root;
  }
  return null;
};

// inOrder traversal
var sortedArrayToBST = function (nums) {
  const helper = (nums, start, end) => {
    if (end < start) return null;

    let mid = start + Math.floor((end - start) / 2);

    let left = helper(nums, start, mid - 1);

    let treeNode = new TreeNode(nums[mid]);
    treeNode.left = left;

    let right = helper(nums, mid + 1, end);
    treeNode.right = right;

    return treeNode;
  };

  return helper(nums, 0, nums.length - 1);
};

// iterative
var sortedArrayToBST = function (nums) {
  if (nums.length === 0) return undefined;

  const root = new TreeNode(0);
  const nodesToCheck = [{ node: root, floor: 0, ceiling: nums.length - 1 }];

  while (nodesToCheck.length) {
    const { node, floor, ceiling } = nodesToCheck.pop();
    const middle = Math.ceil((floor + ceiling) / 2);

    node.val = nums[middle];

    if (floor < middle) {
      node.left = new TreeNode(0);
      nodesToCheck.push({ node: node.left, floor, ceiling: middle - 1 });
    }

    if (ceiling > middle) {
      node.right = new TreeNode(0);
      nodesToCheck.push({ node: node.right, floor: middle + 1, ceiling });
    }
  }

  return root;
};
