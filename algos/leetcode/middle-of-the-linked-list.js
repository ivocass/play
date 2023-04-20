var middleNode = function (head) {
  let length = 0;
  let middle;

  let node = head;
  while (node !== null) {
    length++;
    node = node.next;
  }

  middle = length % 2 === 1 ? Math.ceil(length / 2) : length / 2 + 1;

  node = head;
  for (let i = 0; i < middle - 1; i++) {
    node = node.next;
  }

  return node;
};

// other solutions

const middleNode = function (head) {
  let curr = head;
  let count = 0; //counter
  while (curr) {
    count++;
    curr = curr.next;
  }
  let mid = Math.floor(count / 2);
  curr = head;
  for (let i = 0; i < mid; i++) {
    curr = curr.next;
  }
  return curr;
};

const middleNode = function (head) {
  //Floyd Algorithm//
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // slow in this case will be the mid element by the time fast reached the end
};
