var generate = function (numRows, output = [[1]], level = 1) {
  if (numRows === 1) {
    return output;
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

  if (level === numRows) {
    return output;
  }

  return generate(numRows, output, level);
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

assert(generate(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
// assert(generate(1), [[1]]);

// other solutions -----------------------------------------------------------------------

var generate = function (numRows) {
  var pascal = [];
  for (var i = 0; i < numRows; i++) {
    pascal[i] = [];
    pascal[i][0] = 1;
    for (var j = 1; j < i; j++) {
      pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
    }
    pascal[i][i] = 1;
  }
  return pascal;
};

var generate = function (numRows) {
  var i = 0;
  var j = 0;
  // Create an array list to store the output result...
  var res = [];
  // For generating each row of the triangle...
  for (i = 0; i < numRows; i++) {
    res.push(Array(i + 1)); // Initialize the first row of the pascal triangle as {1}...
    for (j = 0; j <= i; j++) {
      // Primary...
      if (j === 0 || j === i) {
        res[i][j] = 1;
      } else {
        // Calculate the elements of a row, add each pair of adjacent elements of the previous row in each step of the inner loop.
        res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
      }
    }
  }
  return res; // Return the output list of pascal values...
};
