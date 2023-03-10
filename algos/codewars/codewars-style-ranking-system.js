/**
 * Improvements:
 * -the range validation looks cleaner like this:
 * if(rank < -8 || rank === 0 || rank > 8) throw error;
 * -the range validation could throw a RangeError.
 */

// config
const lowestRank = -8;
const highestRank = 8;

class User {
  #rank = lowestRank;
  #progress = 0;

  incProgress(rank) {
    if (rank < lowestRank || rank > highestRank || rank === 0)
      throw new Error(`Rank "${rank}" is invalid.`);
    if (this.#rank === highestRank) return;

    // skips the rank 0
    let diff = rank - this.#rank;
    if (Math.sign(rank) !== Math.sign(this.#rank))
      diff += Math.sign(this.#rank);

    // sets the direction of the rank
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
user.incProgress(9);


// other solutions

class User {
  constructor() {
    this.totalProgress = 0;
  }

  get progress() {
    return this.rank < 8 ? this.totalProgress % 100 : 0;
  }

  get rank() {
    let rank = Math.floor(this.totalProgress / 100) - 8;
    return rank >= 0 ? rank + 1 : rank;
  }

  incProgress(rank) {
    if (rank === 0 || rank < -8 || rank > 8) {
      throw new Error('Rank out of bounds');
    }

    if (rank > 0 && this.rank < 0) {
      rank--;
    }

    const diff = rank - this.rank;
    this.totalProgress += diff > 0 ? 10 * diff * diff : diff < 0 ? 1 : 3;
  }
}