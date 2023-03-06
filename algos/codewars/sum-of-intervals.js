/**
 * Improvements:
 * -sort in one line:
 *    xs.sort(([a,b], [c,d]) => a-c)
 *    intervals.sort((a, b) => a[0] - b[0]);
 * -once I switched intervalsSorted[idx - 1] to arrayPrev, reduce could have been 
 * chained to sort(). so return array.sort().reduce();
 */

function sumIntervals(intervals) {
  const intervalsSorted = [...intervals].sort((a, b) => {
    const a0 = a[0];
    const b0 = b[0];

    return a0 - b0;
  });

  let arrayPrev;

  return intervalsSorted.reduce((acc, array, idx) => {
    let [start, end] = array;

    if (idx > 0) {
      if (end <= arrayPrev[1]) return acc;
      if (start < arrayPrev[1]) start = arrayPrev[1];
    }

    arrayPrev = array;

    return (acc += end - start);
  }, 0);
}

// ---------------

function assert(output, expected) {
  console.log('test is', output === expected, output, '/expected:', expected);
}

assert(sumIntervals([[-100, -90]]), 10);


// other solutions


function sumIntervals(intervals) {
  let sorted = intervals.sort((a, b) => a[0]-b[0]);
  let max = -Number.MAX_VALUE;
  let total = 0;
  
  for (let [a, b] of sorted) {
    max = Math.max(max, a);
    total += Math.max(0, b - max);
    max = Math.max(max, b);
  }
  return total;
}


function sumIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let result = 0;
  let min = intervals[0][0];
  let max = intervals[0][1];
  
  for (let interval of intervals) {
    result += max - min;
    min = Math.max(max, interval[0]);
    max = Math.max(max, interval[1]);
  }
  
  return result + max - min;
}