var filter2 = function (arr, fn) {
  return arr.reduce((acc, val) => {
    if (fn(val)) {
      acc.push(val);
    }

    return acc;
  }, []);
};

// other solutions -----------------------------------------------------------------------

// in O(1) Space
var filter = function (arr, fn) {
  var filteredIndex = 0;
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      if (i !== filteredIndex) {
        // now swap the current element with next available position in filtered array
        var temp = arr[i];
        arr[i] = arr[filteredIndex];
        arr[filteredIndex] = temp;
      }
      filteredIndex++;
    }
  }
  // then we can remove the remaining elements after filteredIndex
  arr.length = filteredIndex;
  return arr;
};
