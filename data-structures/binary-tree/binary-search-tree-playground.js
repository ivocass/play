import { BinarySearchTree } from './binary-search-tree';
import { printTree } from './bst-printer';

var bst = new BinarySearchTree();
bst.printer = printTree;

// bst.fromArray([3, 9, 20, null, null, 15, 7]);

bst.fromArray([5, 4, 7, 2, 11, 14, 6, 18], true);
// bst.fromArray([1, 2, 2, 3, null, null, 3, 4, null, null, 4]);

// console.log('tree', bst.root);

bst.print();

bst.remove(7);

bst.print();
