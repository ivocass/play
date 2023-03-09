

/**
 * WIP.
 * It times out in codewars.com
 * A possible clue may be the fact that it says we should check out the tests.
 * In the tests, it compares approximately using "assert.approximately(actual, 
 * expected, 1e-9)".
 * If I can validate the total using that approximation, I'd be able to break 
 * the loop soon enough.
 */
function doubles(maxk, maxn) {
  let total = 0;

  for (let k = 1; k <= maxk; k++) {
    const twoK = 2 * k;
    for (let n = 1; n <= maxn; n++) {
      total += 1 / (k * (n + 1) ** twoK);
      if (total > 0.695) break;
    }
  }

  return total;
}

// other solutions

// passed in 1565ms
function doubles(maxk, maxn) {
  var s = 0, p, q;
  for(let i = 1; i <= maxk; i++) {
      p = s;
      for(let j = 1; j <= maxn; j++) {
          q = s;
          s += 1/(i*(j + 1)**(2*i));
          if(Math.abs(q-s) < 1e-9/maxk/maxn) break;
      }
      if(Math.abs(p-s) < 1e-9/maxk) break;
  }

  return s;
}


// times out
let obj = {}
function doubles(maxk, maxn) {
  let result = 0;
    for (let k = 1; k <= maxk; k++) {
        let summ = 0;
      if(obj[k + ':' + maxn]) {
        result += obj[k + ':' + maxn]
        continue
        }
        for (let n = 1; n <= maxn; n++) {
            summ += 1 / (k * (n + 1) ** (2 * k));
        }
        obj[k + ':' + maxn] = summ
        result += summ;
    }
    return result;
}


// times out
function doubles(maxk, maxn) {
  let result = 0;

  for (let k =1; k <=maxk; k++){
    for (let i = 1; i <= maxn; i++) {
      result += 1/( k * (Math.pow( i + 1, k * 2)))
    }
  }
  
  return result;
}