/**
 * Credit to: https://www.npmjs.com/package/binary-tree-printer?activeTab=code
 */
const MAX_HEIGHT = 100;
const lProfile = [];
const rProfile = [];
let printNext = 0;
function buildAsciiTree(t) {
  if (!t) {
    return null;
  }
  const node = {
    left: buildAsciiTree(t.left),
    right: buildAsciiTree(t.right),
    edgeLength: 0,
    height: 0,
    parentDir: 0,
    label: String(t.data),
  };
  if (node.left) {
    node.left.parentDir = -1;
  }
  if (node.right) {
    node.right.parentDir = 1;
  }
  return node;
}
function computeEdgeLengths(node) {
  if (!node) {
    return;
  }
  computeEdgeLengths(node.left);
  computeEdgeLengths(node.right);
  let minHeight;
  // First fill in the edge_length of 'node'
  if (!node.left && !node.right) {
    node.edgeLength = 0;
  } else {
    if (node.left) {
      for (let i = 0; i < node.left.height && i < MAX_HEIGHT; ++i) {
        rProfile[i] = -Infinity;
      }
      computeRightProfile(node.left, 0, 0);
      minHeight = node.left.height;
    } else {
      minHeight = 0;
    }
    if (node.right) {
      for (let i = 0; i < node.right.height && i < MAX_HEIGHT; ++i) {
        lProfile[i] = Infinity;
      }
      computeLeftProfile(node.right, 0, 0);
      minHeight = Math.min(node.right.height, minHeight);
    } else {
      minHeight = 0;
    }
    // TODO(kyliau): Figure out how to customize this
    let delta = 4;
    const GAP = 0;
    for (let i = 0; i < minHeight; ++i) {
      delta = Math.max(delta, GAP + 1 + rProfile[i] - lProfile[i]);
    }
    // If the node has two children of height 1, then we allow the two
    // leaves to be within 1, instead of 2
    if (((node.left && node.left.height === 1) || (node.right && node.right.height === 1)) && delta > 4) {
      --delta;
    }
    node.edgeLength = Math.floor((delta + 1) * 0.5 + 1);
  }
  let height = 1;
  if (node.left) {
    height = Math.max(node.left.height + node.edgeLength + 1, height);
  }
  if (node.right) {
    height = Math.max(node.right.height + node.edgeLength + 1, height);
  }
  node.height = height;
}
function printLevel(node, x, level, str) {
  if (!node) {
    return;
  }
  const isLeft = node.parentDir === -1 ? 1 : 0;
  if (level === 0) {
    const i = x - printNext - Math.floor(0.5 * (node.label.length - isLeft));
    str.push(repeat(' ', i));
    printNext += i;
    str.push(node.label);
    printNext += node.label.length;
  } else if (node.edgeLength >= level) {
    if (node.left) {
      const i = x - printNext - level;
      str.push(repeat(' ', i));
      printNext += i;
      str.push('/');
      ++printNext;
    }
    if (node.right) {
      const i = x - printNext + level;
      str.push(repeat(' ', i));
      printNext += i;
      str.push('\\');
      ++printNext;
    }
  } else {
    printLevel(node.left, x - node.edgeLength - 1, level - node.edgeLength - 1, str);
    printLevel(node.right, x + node.edgeLength + 1, level - node.edgeLength - 1, str);
  }
}
// The following function fills in the lProfile array for the given tree.
// It assumes that the center of the label of the root of this tree is location
// at a position(x, y). IT assumes that the edgeLength fields have been computed
// for this tree.
function computeLeftProfile(node, x, y) {
  if (!node) {
    return;
  }
  const isLeft = node.parentDir === -1 ? 1 : 0;
  lProfile[y] = Math.min(lProfile[y], x - Math.floor(0.5 * (node.label.length - isLeft)));
  if (node.left) {
    for (let i = 1; i <= node.edgeLength && i + y < MAX_HEIGHT; ++i) {
      lProfile[i + y] = Math.min(lProfile[i + y], x - i);
    }
  }
  computeLeftProfile(node.left, x - node.edgeLength - 1, y + node.edgeLength + 1);
  computeLeftProfile(node.right, x + node.edgeLength + 1, y + node.edgeLength + 1);
}
function computeRightProfile(node, x, y) {
  if (!node) {
    return;
  }
  const notLeft = node.parentDir !== -1 ? 1 : 0;
  rProfile[y] = Math.max(rProfile[y], x + Math.floor(0.5 * (node.label.length - notLeft)));
  if (node.right) {
    for (let i = 1; i <= node.edgeLength && i + y < MAX_HEIGHT; ++i) {
      rProfile[i + y] = Math.max(rProfile[i + y], x + i);
    }
  }
  computeRightProfile(node.left, x - node.edgeLength - 1, y + node.edgeLength + 1);
  computeRightProfile(node.right, x + node.edgeLength + 1, y + node.edgeLength + 1);
}
export function printTree(t) {
  if (!t) {
    return '';
  }
  let str = [];
  const parentRoot = buildAsciiTree(t);
  computeEdgeLengths(parentRoot);
  // lProfile.fill(Infinity, 0, parentRoot.height);
  for (let i = 0; i < parentRoot.height && i < MAX_HEIGHT; ++i) {
    lProfile[i] = Infinity;
  }
  computeLeftProfile(parentRoot, 0, 0);
  let xMin = 0;
  for (let i = 0; i < parentRoot.height && i < MAX_HEIGHT; ++i) {
    xMin = Math.min(xMin, lProfile[i]);
  }
  // const xMin = Math.min(0, ...lProfile);
  for (let i = 0; i < parentRoot.height; ++i) {
    printNext = 0;
    printLevel(parentRoot, -xMin, i, str);
    str.push('\n');
  }
  if (parentRoot.height >= MAX_HEIGHT) {
    console.warn('This tree is taller than ' + MAX_HEIGHT + ' , and may be drawn incorrectly.');
  }
  return str.join('');
}

function repeat(str, n) {
  let a = '';
  for (let i = 0; i < n; i++) {
    a += str;
  }

  return a;
}
