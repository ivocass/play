/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 *
 * First we set listA as the list with the lowest 'val'.
 * Then for the other list (listB), insert each node in the
 * appropriate place in listA (traversing the nodes until a suitable
 * spot is found).
 * listA isn't traversed completely each time, as we save the starting
 * point in each insertion.
 */
var mergeTwoLists = function (list1, list2) {
  if (!list1) {
    return list2;
  }

  if (!list2) {
    return list1;
  }

  let listA = list1.val <= list2.val ? list1 : list2;
  let listB = list2.val >= list1.val ? list2 : list1;

  let nodeB = listB;
  let prevNode = listA;

  const insert = (nodeB) => {
    let nodeA = prevNode;

    while (nodeA) {
      if (nodeA.val > nodeB.val) {
        break;
      }

      prevNode = nodeA;
      nodeA = nodeA.next;
    }

    let temp = prevNode.next;
    prevNode.next = nodeB;
    nodeB.next = temp;

    prevNode = nodeB;
  };

  while (nodeB) {
    const temp = nodeB.next;

    insert(nodeB);

    nodeB = temp;
  }

  return listA;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

// assert(mergeTwoLists(list1, list2), [1, 1, 2, 3, 4, 4]);
assert(mergeTwoLists(list1, list2), [1, 1, 2, 3, 4, 4]);

// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]

// other solutions -----------------------------------------------------------------------

// https://leetcode.com/problems/merge-two-sorted-lists/solutions/2705782/js-recursion-with-exlanation/
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  else if (!l2) return l1;
  else if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
