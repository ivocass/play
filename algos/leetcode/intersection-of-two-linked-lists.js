var getIntersectionNode = function (headA, headB) {
  let nodeA = headA;
  let nodeB = headB;

  while (nodeA !== nodeB) {
    nodeA = !nodeA ? headB : nodeA.next;
    nodeB = !nodeB ? headA : nodeB.next;
  }

  return nodeA;
};

// other solutions -----------------------------------------------------------------------

var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  let a = headA,
    b = headB;
  while (a !== b) {
    a = a.next;
    b = b.next;
    if (!a && !b) return a;
    if (!a) a = headB;
    if (!b) b = headA;
  }
  return a;
};
