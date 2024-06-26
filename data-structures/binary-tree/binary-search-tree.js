import { TreeNode } from './tree-node';

/**
 * A BST with iterative and recursive methods for training purposes.
 */
export class BinarySearchTree {
  #root = null;
  constructor() {
    // see this.print()
    this.printer;
  }

  /**
   * @array: example [3, 9, 20, null, null, 15, 7]
   * @sorts: if true, the tree determines where to place each node. dont use null in this case.
   * if false, the positions are explicit, and null values are necessary when skipping child nodes.
   */
  fromArray(array, sorts = false) {
    if (sorts) {
      if (array.includes(null)) {
        throw new Error('Null values cant be sorted');
      }

      array.forEach((val) => {
        this.insert(val);
      });
    } else {
      this.createTree(array);
    }
  }

  createTree(array) {
    return this.createTreeIterative(array);
  }

  /**
   * Useful for arrays in the LeetCode format (which contain null values).
   * Eg [1, 2, 2, 3, null, null, 3, 4, null, null, 4]
   */
  createTreeIterative(array) {
    this.#root = new TreeNode(array[0]);
    const q = [this.#root];

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

    return this.#root;
  }

  /**
   * Not using this one, as it doesn't get along with LeetCode's arrays.
   * The way it sets the indices doesn't account for the missing children of null nodes,
   * so for certain cases the indices are out of bounds.
   * Eg: [1, 2, 2, 3, null, null, 3, 4, null, null, 4] <= the last child node won't be added.
   */
  createTreeRecursive(array) {
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

  /**
   * Expects this.printer to be set from outside.
   * this.printer should be a function that receives the root and returns a string
   * representing the tree.
   */
  print() {
    if (!this.printer) {
      throw new Error('Printer not set');
    }

    console.log(this.printer(this.#root));
  }

  insert(val) {
    const newNode = new TreeNode(val);

    if (!this.#root) {
      this.#root = newNode;
    } else {
      this.#insertNode(this.#root, newNode);
    }
  }

  #insertNode(node, newNode) {
    if (newNode.val < node.val) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.#insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.#insertNode(node.right, newNode);
      }
    }
  }

  remove(val) {
    this.#root = this.#removeNode(this.#root, val);
  }

  /**
   * Only works if the tree's values are sorted.
   */
  #removeNode(node, val) {
    if (!node) {
      return null;
    }

    if (!node.left && !node.right) {
      return null;
    }

    if (val < node.val) {
      node.left = this.#removeNode(node.left, val);
      return node;
    }

    if (val > node.val) {
      node.right = this.#removeNode(node.right, val);
      return node;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    // Deleting node with two children
    const nodeToRemove = this.findMinNode(node.right);
    node.val = nodeToRemove.val;

    node.right = this.#removeNode(node.right, nodeToRemove.val);
    return node;
  }

  // doesnt work with unsorted trees
  findMinNode(node) {
    if (!node.left) {
      return node;
    }

    return this.findMinNode(node.left);
  }

  // works with unsorted trees
  minValue(node) {
    if (node === undefined) node = this.#root;
    if (!node) return Infinity;

    const minLeft = this.minValue(node.left);
    const minRight = this.minValue(node.right);

    return Math.min(node.val, minLeft, minRight);
  }

  sum(node) {
    if (node === undefined) node = this.#root;
    if (node === null) return 0;

    return node.val + this.sum(node.left) + this.sum(node.right);
  }

  /**
   * Returns the sum of the path (from root to leaf) with the highest values.
   */
  maxPathSum(node) {
    if (!node) return -Infinity;
    if (!node.left && !node.right) return node.val;

    const maxSubSum = Math.max(this.maxPathSum(node.left), this.maxPathSum(node.right));

    return node.val + maxSubSum;
  }

  get root() {
    return this.#root;
  }

  inOrder(prints = true) {
    const output = this.inOrderRecursive();

    return this.#handleOutput(output, prints);
  }

  inOrderRecursive(node = undefined, output = []) {
    if (node === undefined) {
      node = this.#root;
    }

    if (node === null) {
      return output;
    }

    this.inOrderRecursive(node.left, output);
    output.push(node.val);
    this.inOrderRecursive(node.right, output);

    return output;
  }

  inOrderIterative(root) {
    const output = [];
    const stack = [];
    let node = root;

    while (node || stack.length) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop();
        output.push(node.val);
        node = node.right;
      }
    }

    return output;
  }

  preOrder(prints = true) {
    const output = this.preOrderRecursive();

    return this.#handleOutput(output, prints);
  }

  preOrderRecursive(node = undefined, output = []) {
    if (node === undefined) {
      node = this.#root;
    }

    if (node === null) {
      return output;
    }

    output.push(node.val);
    this.preOrderRecursive(node.left, output);
    this.preOrderRecursive(node.right, output);

    return output;
  }

  preOrderIterative(root) {
    if (!root) root = this.#root;

    const output = [];
    const stack = [root];

    while (stack.length) {
      const node = stack.pop();

      output.push(node.val);

      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
    }

    return output;
  }

  postOrder(prints = true, node = undefined) {
    if (!node) {
      node = this.#root;
    }
    const output = this.postOrderRecursive(node);

    return this.#handleOutput(output, prints);
  }

  postOrderRecursive(node = undefined, output = []) {
    if (node === undefined) node = this.#root;
    if (node === null) return output;

    this.postOrderRecursive(node.left, output);
    this.postOrderRecursive(node.right, output);
    output.push(node.val);

    return output;
  }

  postOrderIterative(root) {
    if (!root) root = this.#root;

    const output = [];
    const stack = [];
    let node = root;
    let lastVisitedNode;

    while (node || stack.length) {
      if (node) {
        stack.push(node);

        node = node.left;
      } else {
        const topNode = stack.at(-1);

        if (topNode.right && topNode.right !== lastVisitedNode) {
          node = topNode.right;
        } else {
          output.push(topNode.val);

          lastVisitedNode = stack.pop();
        }
      }
    }

    return output;
  }

  postOrderIterative2(root) {
    if (!root) root = this.#root;

    const output = [];
    const stack1 = [root];
    const stack2 = [];
    let node;

    while (stack1.length) {
      node = stack1.pop();

      stack2.push(node);

      if (node.left) {
        stack1.push(node.left);
      }
      if (node.right) {
        stack1.push(node.right);
      }
    }

    while (stack2.length) {
      node = stack2.pop();

      output.push(node.val);
    }

    return output;
  }

  levelOrder(prints = true, node) {
    const output = this.levelOrderIterative(node);

    return this.#handleOutput(output, prints);
  }

  levelOrderIterative(node) {
    if (node === undefined) {
      node = this.#root;
    }

    if (!node) {
      return;
    }

    const output = [];
    const queue = [node];

    while (queue.length > 0) {
      node = queue.shift();

      output.push(node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    return output;
  }

  levelOrderRecursive() {
    const output = [];
    const height = this.height;

    const process = (node, level) => {
      if (!node) {
        return;
      }

      if (level === 0) {
        output.push(node.val);
      } else if (level > 0) {
        process(node.left, level - 1);
        process(node.right, level - 1);
      }
    };

    for (let i = 0; i < height; i++) {
      process(this.#root, i);
    }

    return output;
  }

  #handleOutput(output, prints) {
    if (prints) {
      console.log(output);
    }

    return output;
  }

  search(val, node) {
    if (node === undefined) {
      node = this.#root;
    }

    if (!node) {
      return null;
    }

    if (val < node.val) {
      return this.search(val, node.left);
    }

    if (val > node.val) {
      return this.search(val, node.right);
    }

    return node;
  }

  includes(node, val) {
    if (!node) return false;
    if (node.val === val) return true;

    return includes(node.left) || includes(node.right);
  }

  get height() {
    return this.#height(this.#root);
  }

  #height(node) {
    if (!node) {
      return 0;
    }

    return 1 + Math.max(this.#height(node.left), this.#height(node.right));
  }

  isBalanced(node) {
    if (node === undefined) {
      node = this.#root;
    }

    if (!node) {
      return true;
    }

    const heightLeft = this.#height(node.left);
    const heightRight = this.#height(node.right);
    const heightDiff = Math.abs(heightLeft - heightRight);
    const isBalancedLeft = this.isBalanced(node.left);
    const isBalancedRight = this.isBalanced(node.right);

    return heightDiff < 2 && isBalancedLeft && isBalancedRight;
  }
}
