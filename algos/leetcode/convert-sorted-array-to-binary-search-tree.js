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
