// config
const lowestRank = -8;
const highestRank = 8;
const ranks = [];

(function buildRanks() {
  const range = highestRank - lowestRank + 1;

  for (let i = 0; i < range; i++) {
    ranks.push(lowestRank + i);
  }

  ranks.splice(ranks.indexOf(0), 1);
  Object.freeze(ranks);
})();
console.log('ranks', ranks);
class User {
  #rank = lowestRank;
  #progress = 0;

  incProgress(rank) {
    if (this.#rank === highestRank) return;
    if (rank === -1) {
      debugger;
    }
    // let diff = ranks.indexOf(rank) - ranks.indexOf(this.#rank);
    let diff = rank - this.#rank;
    if (rank < 0 && this.#rank > 0) diff++;
    else if (rank > 0 && this.#rank < 0) diff--;
    if (rank < this.#rank) diff * -1;

    if (diff === 0) {
      this.#progress += 3;
    } else if (diff === -1) {
      this.#progress += 1;
    } else if (diff < 1) {
      return;
    } else {
      this.#progress += 10 * diff * diff;
    }

    if (this.#progress < 100) return;

    this.#rank += Math.floor(this.#progress / 100);
    this.#progress = this.#progress % 100;

    if (this.#rank === 0) this.#rank = 1;
    else if (this.#rank >= highestRank) {
      console.log('limiting rank', this.#rank, highestRank);
      this.#rank = highestRank;
      this.#progress = 0;
    }
  }

  get rank() {
    return this.#rank;
  }

  get progress() {
    return this.#progress;
  }
}

// ----------------------

function assert(rank, expectedRank, expectedProgress) {
  user.incProgress(rank);
  console.log(
    'test rank',
    user.rank === expectedRank,
    'user.rank',
    user.rank,
    'expectedRank',
    expectedRank,
    '-----',
    'test progress',
    user.progress === expectedProgress,
    'user.progress',
    user.progress,
    'expectedProgress',
    expectedProgress
  );
}

// ----------------------

let user;

user = new User();
assert(-8, -8, 3);

user = new User();
assert(-7, -8, 10);

user = new User();
assert(-6, -8, 40);

user = new User();
assert(-5, -8, 90);

user = new User();
assert(-4, -7, 60);

user = new User();
assert(-8, -8, 3);

user = new User();
assert(1, -2, 40);
assert(1, -2, 80);
assert(1, -1, 20);
assert(1, -1, 30);
assert(1, -1, 40);
assert(2, -1, 80);
assert(2, 1, 20);
assert(-1, 1, 21);
assert(3, 1, 61);
assert(8, 6, 51);
assert(8, 6, 91);
assert(8, 7, 31);
assert(8, 7, 41);
assert(8, 7, 51);
assert(8, 7, 61);
assert(8, 7, 71);
assert(8, 7, 81);
assert(8, 7, 91);
assert(8, 8, 0);
assert(8, 8, 0);
