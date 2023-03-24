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
