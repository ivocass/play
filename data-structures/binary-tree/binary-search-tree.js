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
   * Expects this.printer to be set from outside.
   * this.printer should be a function that receives the root and returns a string
   * representing the tree.
   */
  print() {
    if (!this.printer) {
      throw new Error('Printer not set');
    }

    const output = this.printer(this.#root);
    console.log(output);
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

  insert(data) {
    const newNode = new TreeNode(data);

    if (!this.#root) {
      this.#root = newNode;
    } else {
      this.#insertNode(this.#root, newNode);
    }
  }

  #insertNode(node, newNode) {
    if (newNode.data < node.data) {
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

  remove(data) {
    this.#root = this.#removeNode(this.#root, data);
  }

  #removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (!node.left && !node.right) {
      return null;
    }

    if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
      return node;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    // Deleting node with two children
    const temp = this.findMinNode(node.right);
    node.data = temp.data;

    node.right = this.#removeNode(node.right, temp.data);
    return node;
  }

  findMinNode(node) {
    if (!node.left) {
      return node;
    }

    return this.findMinNode(node.left);
  }

  search(value) {}

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
    output.push(node.data);
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
        output.push(node.data);
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

    output.push(node.data);
    this.preOrderRecursive(node.left, output);
    this.preOrderRecursive(node.right, output);

    return output;
  }

  preOrderIterative(root) {
    if (!root) root = this.#root;

    const output = [];
    const stack = [];

    let node = root;

    while (node || stack.length) {
      if (!node) {
        node = stack.pop();
      }

      output.push(node.data);

      if (node.right) {
        stack.push(node.right);
      }

      node = node.left;
    }

    return output;
  }

  postOrder(prints = true, node = undefined, _output = [], _depth = -1) {
    _depth++;

    if (node === undefined) {
      node = this.#root;
    }

    if (node === null) {
      return _output;
    }

    this.postOrder(prints, node.left, _output, _depth);
    this.postOrder(prints, node.right, _output, _depth);
    _output.push(node.data);

    if (_depth === 0) {
      return this.#handleOutput(_output, prints);
    }

    return _output;
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
          output.push(topNode.data);

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

      output.push(node.data);
    }

    return output;
  }

  levelOrder(prints, node) {
    return levelOrderIterative(prints, node);
  }

  levelOrderIterative(prints = true, node = undefined) {
    if (node === undefined) {
      node = this.#root;
    }

    if (!node) {
      return;
    }

    const output = [];
    const q = [node];

    while (q.length > 0) {
      node = q.shift();

      output.push(node.data);

      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }

    return this.#handleOutput(output, prints);
  }

  levelOrderRecursive(prints = true) {
    const output = [];
    const height = this.height;

    const process = (node, level) => {
      if (!node) {
        return;
      }

      if (level === 0) {
        output.push(node.data);
      } else if (level > 0) {
        process(node.left, level - 1);
        process(node.right, level - 1);
      }
    };

    for (let i = 0; i < height; i++) {
      process(this.#root, i);
    }

    return this.#handleOutput(output, prints);
  }

  #handleOutput(output, prints) {
    if (prints) {
      console.log(output);
    }

    return output;
  }

  search(data, node) {
    if (node === undefined) {
      node = this.#root;
    }

    if (!node) {
      return null;
    }

    if (data < node.data) {
      return this.search(data, node.left);
    }

    if (data > node.data) {
      return this.search(data, node.right);
    }

    return node;
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
