var getRow = function (rowIndex, output = [[1]], level = 0) {
  if (rowIndex === 0) {
    return [1];
  }

  level++;
  const row = [1];

  output.push(row);

  const prevRow = output.at(-2);

  if (prevRow && prevRow.length > 1) {
    for (let i = 0; i < prevRow.length - 1; i++) {
      row.push(prevRow[i] + prevRow[i + 1]);
    }
  }

  row.push(1);

  if (level === rowIndex) {
    return row;
  }

  return getRow(rowIndex, output, level);
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

assert(getRow(0), [[1]]);
assert(getRow(1), [1, 1]);
assert(getRow(2), [1, 2, 1]);
assert(getRow(3), [1, 3, 3, 1]);

// other solutions -----------------------------------------------------------------------

var getRow = function (rowIndex) {
  var row = [1];

  for (var i = 1; i <= rowIndex; i++) {
    for (var j = i; j > 0; j--) {
      if (j === i) row[j] = 1;
      else row[j] = row[j - 1] + row[j];
    }
  }
  return row;
};

var getRow = function (r) {
  var ans = new Array(r + 1);
  ans[0] = ans[r] = 1;
  for (i = 1, up = r; i < r; i++, up--) ans[i] = (ans[i - 1] * up) / i;
  return ans;
};

var getRow = function (rowIndex) {
  return findRow([1], rowIndex);
};

const findRow = (arr, depth) => {
  if (arr.length - 1 === depth) return arr;

  const newArr = new Array(arr.length + 1);
  for (let i = 0; i < newArr.length; i++) {
    const l = arr[i - 1] || 0;
    const r = arr[i] || 0;
    newArr[i] = l + r;
  }

  return findRow(newArr, depth);
};
