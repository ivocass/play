import { BinarySearchTree } from './binary-search-tree';
import { printTree } from './bst-printer';

// create an object for the BinarySearchTree
var bst = new BinarySearchTree();

// Inserting nodes to the BinarySearchTree

bst.fromArray([3, 9, 20, null, null, 15, 7]);

console.log('tree', bst.root);

const printed = printTree(bst.root);
console.log(printed);
