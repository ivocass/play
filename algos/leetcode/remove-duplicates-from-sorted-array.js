var removeDuplicates = function (nums) {
  const swap = (i, j) => {
    const temp = nums[i];

    nums[i] = nums[j];
    nums[j] = temp;
  };

  let uniqueCounter = 1;

  for (let i = 0; i < nums.length; i++) {
    const a = nums[i];
    const b = nums[i + 1];

    if (b === undefined) {
      break;
    }
    uniqueCounter++;
    if (b > a) {
      continue;
    }

    uniqueCounter--;

    let match = false;

    for (let j = i + 1; j < nums.length; j++) {
      const otherNum = nums[j];

      if (otherNum > a) {
        swap(i + 1, j);

        uniqueCounter++;
        match = true;
        break;
      }
    }

    if (!match) {
      break;
    }
  }

  return uniqueCounter;
};

// --------------------------
function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), null);
// assert(removeDuplicates([1, 1]), null);
// assert(removeDuplicates([1, 2]), null);
// assert(removeDuplicates([1, 1, 2]), null);

// other solutions -----------------------------------------------------------------------
