import { BinarySearchTree } from './binary-search-tree';
import { printTree } from './bst-printer';

const values0 = [-64, 12, 18, -4, -53, null, 76, null, -51, null, null, -93, 3, null, -31, 47, null, 3, 53, -81, 33, 4, null, -51, -44, -60, 11];
const values1 = [5, 4, 7, 2, 11, 14, 6, 18];
const values2 = [1, 2, 2, 3, null, null, 3, 4, null, null, 4];

var bst = new BinarySearchTree();
bst.printer = printTree;

bst.fromArray(values1, true);

// console.log('tree', bst.root);

bst.print();
