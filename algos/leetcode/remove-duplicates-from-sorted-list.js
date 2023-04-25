/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const getNextDistinct = (nodeA) => {
  let nodeB = nodeA;

  while (nodeB) {
    if (nodeB.val !== nodeA.val) {
      return nodeB;
    }

    nodeB = nodeB.next;
  }

  return nodeB;
};

var deleteDuplicates = function (head) {
  let node = head;

  while (node) {
    const next = node.next;

    if (!next) {
      break;
    }

    if (node.val === next.val) {
      node.next = getNextDistinct(next);
    }

    node = node.next;
  }

  return head;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

// assert((), );

// other solutions -----------------------------------------------------------------------

var deleteDuplicates = function (head) {
  var current = head;

  while (current) {
    if (current.next !== null && current.val == current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};

var deleteDuplicates = function (head) {
  if (!head) return null;

  while (head.next && head.val == head.next.val) {
    head.next = head.next.next;
  }
  head.next = deleteDuplicates(head.next);
  return head;
};
