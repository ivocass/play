var hasCycle = function (head) {
  if (!head || !head.next) {
    return false;
  }

  if (head.next === head) return true;

  let slowNode = head;
  let fastNode = head.next.next;
  while (slowNode && fastNode) {
    if (slowNode === fastNode) {
      return true;
    }

    slowNode = slowNode.next;

    if (!fastNode.next) {
      return false;
    }

    fastNode = fastNode.next.next;
  }

  return false;
};

// --------------------------
function assert(output, expected) {
  if (Array.isArray(output) && Array.isArray(expected)) {
    const isEqualSize = output.length === expected.length;
    const areValuesEqual = output.every((a, i) => a === expected[i]);
    console.log('test is', isEqualSize && areValuesEqual, output, '/expected:', expected);
  } else {
    console.log('test is', output === expected, output, '/expected:', expected);
  }
}

let node1 = new { val: 1, next: null }();
let node2 = new { val: 2, next: null }();

// node1.next = node2;
// node2.next = node1;

// assert(hasCycle(node1), true);
assert(hasCycle(), false);

// other solutions -----------------------------------------------------------------------

const hasCycle = (head) => {
  let fast = head;
  while (fast && fast.next) {
    head = head.next;
    fast = fast.next.next;
    if (head === fast) return true;
  }
  return false;
};

const hasCycle = (head) => {
  let p1 = head;
  let p2 = head;

  while (p2 && p2.next && p2.next.next) {
    p1 = p1.next;
    p2 = p2.next.next;

    if (p1 === p2) {
      return true;
    }
  }

  return false;
};

var hasCycle = function (head) {
  function run(node) {
    if (!node) return false;
    if (node.seen) return true;
    node.seen = true;
    return run(node.next);
  }
  return run(head);
};
