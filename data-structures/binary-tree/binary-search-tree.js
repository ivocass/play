import { TreeNode } from './tree-node';

export class BinarySearchTree {
  #root = null;
  constructor() {}

  fromArray(array) {
    function buildTree(index) {
      if (index >= array.length || array[index] === null || array[index] === undefined) {
        return null;
      }

      const node = new TreeNode(array[index]);

      node.left = buildTree(2 * index + 1);
      node.right = buildTree(2 * index + 2);

      return node;
    }

    this.#root = buildTree(0);
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
    this.#root = this.removeNode(this.#root, data);
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

  // Performs inorder traversal of a tree
  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  // Performs preorder traversal of a tree
  preorder(node) {
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // Performs postorder traversal of a tree
  // postorder(node) {
  //   if (node !== null) {
  //     this.postorder(node.left);
  //     this.postorder(node.right);
  //     console.log(node.data);
  //   }
  // }

  postorder = (root) => {
    const nodes = [];
    if (root) {
      postorder(root.left);
      postorder(root.right);
      nodes.push(root.val);
    }
    return nodes;
  };

  search(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      return this.search(node.left, data);
    }

    if (data > node.data) {
      return this.search(node.right, data);
    }

    return node;
  }
}
