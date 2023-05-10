import { TreeNode } from './tree-node';

/**
 * A BST with iterative and recursive methods for training purposes.
 */
export class BinarySearchTree {
  #root = null;
  constructor() {}

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

  #removeNode(node, key) {
    if (!node) {
      return null;
    }

    if (key < node.data) {
      node.left = this.#removeNode(node.left, key);
      return node;
    }

    if (key > node.data) {
      node.right = this.#removeNode(node.right, key);
      return node;
    }

    if (!node.left && !node.right) {
      return null;
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
    return inOrderRecursive(prints);
  }

  inOrderRecursive(prints = true, node = undefined, _output = [], _depth = -1) {
    _depth++;

    if (node === undefined) {
      node = this.#root;
    }

    if (node === null) {
      return _output;
    }

    this.inOrder(prints, node.left, _output, _depth);
    _output.push(node.data);
    this.inOrder(prints, node.right, _output, _depth);

    if (_depth === 0) {
      return this.#handleOutput(_output, prints);
    }

    return _output;
  }

  inOrderIterative(root) {
    const res = [];
    const stack = [];
    let node = root;

    while (node || stack.length) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop();
        res.push(node.val);
        node = node.right;
      }
    }

    return res;
  }

  preOrder(prints = true, node = undefined, _output = [], _depth = -1) {
    _depth++;

    if (node === undefined) {
      node = this.#root;
    }

    if (node === null) {
      return _output;
    }

    _output.push(node.data);
    this.preOrder(prints, node.left, _output, _depth);
    this.preOrder(prints, node.right, _output, _depth);

    if (_depth === 0) {
      return this.#handleOutput(_output, prints);
    }

    return _output;
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
