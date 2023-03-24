/**
 * Improvements:
 * -i should've used radial distance. like one of the other solutions.
 */

function closestPair(points) {
  const len = points.length;
  const sortedX = [...points.sort((a, b) => a[0] - b[0])];
  let minDistance = Number.MAX_VALUE;
  let closest = [];

  const check = function (a, b) {
    if (!b) return;
    const distY = Math.abs(b[1] - a[1]);

    if (distY > minDistance) return;

    const distX = Math.abs(b[0] - a[0]);

    if (distX > minDistance) return;

    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

    if (distance < minDistance) {
      minDistance = distance;
      closest = [a, b];
    }
  };

  for (let i = 0; i < len; i++) {
    for (let j = 1; j < 65; j++) {
      check(sortedX[i], sortedX[i + j]);
    }
  }

  return closest;
}

let grid = [
  [2, 2], // A
  [2, 8], // B
  [5, 5], // C
  [6, 3], // D
  [6, 7], // E
  [7, 4], // F
  [7, 9], // G
];

// grid = [
//   [2, 2],
//   [2, 8],
//   [5, 5],
//   [5, 5],
//   [6, 3],
//   [6, 7],
//   [7, 4],
//   [7, 9],
// ];

// grid = [
//   [-297.01597968317503, 749.5023320376727],
//   [-159.53021671529686, 776.5571751631525],
// ];

const res = closestPair(grid);

console.log('res ', res);


// -----------------------------

// other solutions

function closestPair(points) {
  var minDis = Infinity;
  points = points.map(x => [x[0],x[1],Math.sqrt(x[0]**2 + x[1]**2)])
  points.sort((a, b) => a[2] - b[2])
  for (i = 0; i < points.length-1; i++){
    for(j = i+1; j < points.length; j++){
      dis = Math.sqrt((points[i][0] - points[j][0]) **2 + (points[i][1] - points[j][1]) **2)
      radialDis = Math.sqrt((points[j][2] - points[i][2])**2)
      if (dis < minDis){
        minDis = dis;
        ans = [points[i].slice(0,2),points[j].slice(0,2)];
      }
      if (radialDis > minDis) break
    }
  }
  return ans
}