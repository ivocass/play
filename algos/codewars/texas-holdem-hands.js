/**
 * Improvements:
 * -the tests array should've contained arrays, not objects. to then use array deconstruction.
 * .also the array should be outside hands()
 */

function hand(holeCards, communityCards) {
  const cards = getCards([...holeCards, ...communityCards]).sort(sortCards);
  const suits = getSuits(cards);
  const ranks = getRanks(cards);

  const tests = [
    { type: 'straight-flush', func: checkStraightFlush },
    { type: 'four-of-a-kind', func: checkFourOfAKind },
    { type: 'full house', func: checkFullHouse },
    { type: 'flush', func: checkFlush },
    { type: 'straight', func: checkStraight },
    { type: 'three-of-a-kind', func: checkThreeOfAKind },
    { type: 'two pair', func: checkTwoPair },
    { type: 'pair', func: checkPair },
    { type: 'nothing', func: checkNothing },
  ];

  for (const test of tests) {
    const result = test.func(cards, suits, ranks);

    if (result) return { type: test.type, ranks: result.map((c) => c.rank) };
  }

  return null;
}

class Card {
  constructor(value) {
    this.value = value;
    this.rank = value.startsWith('10') ? '10' : value[0];
    this.suit = value.startsWith('10') ? value[2] : value[1];
    this.index = rankOrder.indexOf(this.rank);
  }
}

const rankOrder = [
  'A',
  'K',
  'Q',
  'J',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
];

const sortCards = (a, b) => a.index - b.index;
const sortRanks = (a, b) => a[0].index - b[0].index;

const getConsecutives = (cards) => {
  if (cards.length === 0) return [];

  const fromCard = cards[0];
  let output = [fromCard];
  let prevCard = fromCard;

  for (let i = 1; i < cards.length; i++) {
    const card = cards[i];

    if (card.index === prevCard.index) continue;
    if (card.index !== prevCard.index + 1) output = [];

    output.push(card);

    if (output.length === 5) return output;

    prevCard = card;
  }

  return output;
};

function getSuits(cards) {
  const spades = cards.filter((c) => c.suit === '♠');
  const clubs = cards.filter((c) => c.suit === '♣');
  const diamonds = cards.filter((c) => c.suit === '♦');
  const hearts = cards.filter((c) => c.suit === '♥');

  return [spades, clubs, diamonds, hearts]
    .filter((a) => a.length > 0)
    .sort(sortRanks);
}

function getRanks(cards) {
  const temp = [];

  for (const card of cards) {
    if (temp[card.rank] === undefined) temp[card.rank] = [];

    temp[card.rank].push(card);
  }

  const output = [];

  for (const key in temp) {
    output.push(temp[key]);
  }

  return output.sort(sortRanks).sort((a, b) => b.length - a.length);
}

function getCards(values) {
  return values.map((val) => new Card(val));
}

function checkStraightFlush(cards, suits, ranks) {
  for (const suit of suits) {
    const consecutives = getConsecutives(suit);

    if (consecutives.length === 5) return consecutives;
  }

  return null;
}

function checkFourOfAKind(cards, suits, ranks) {
  const output = [];

  if (ranks.length > 0 && ranks[0].length === 4) {
    output.push(ranks[0][0]);

    if (ranks.length > 1) output.push(ranks[1][0]);

    return output;
  }

  return null;
}

function checkFullHouse(cards, suits, ranks) {
  const group0 = ranks[0];
  const group1 = ranks[1];

  if (group0 && group1 && group0.length === 3 && group1.length === 2) {
    return [group0[0], group1[0]];
  }

  return null;
}

function checkFlush(cards, suits, ranks) {
  for (const suit of suits) {
    if (suit.length >= 5) return suit.slice(0, 5);
  }

  return null;
}

function checkStraight(cards, suits, ranks) {
  const consecutives = getConsecutives(cards);

  if (consecutives.length === 5) return consecutives;

  return null;
}

function checkThreeOfAKind(cards, suits, ranks) {
  const output = [];

  if (ranks.length > 0 && ranks[0].length === 3) {
    output.push(ranks[0][0]);

    if (ranks.length === 2) output.push(ranks[1][0]);
    else {
      output.push(ranks[1][0]);
      output.push(ranks[2][0]);
    }

    return output;
  }

  return null;
}

function checkTwoPair(cards, suits, ranks) {
  const output = [];

  const group0 = ranks[0];
  const group1 = ranks[1];

  if (group0 && group1 && group0.length === 2 && group1.length === 2) {
    output.push(group0[0]);
    output.push(group1[0]);

    if (ranks[2]) {
      const otherRanks = ranks.splice(2).sort(sortRanks);

      output.push(otherRanks[0][0]);
    }

    return output;
  }

  return null;
}

function checkPair(cards, suits, ranks) {
  const output = [];

  const group0 = ranks[0];

  if (group0 && group0.length === 2) {
    output.push(group0[0]);

    if (ranks.length > 1) {
      const otherRanks = ranks.splice(1).sort(sortRanks);

      for (const group of otherRanks) {
        output.push(group[0]);
        if (output.length === 4) break;
      }
    }

    return output;
  }

  return null;
}

function checkNothing(cards, suits, ranks) {
  const output = [];
  // using this because in hand(), the tests processing expects Card objects
  const ranksMap = [];

  for (const card of cards) {
    if (!ranksMap.includes(card.rank)) {
      output.push(card);
      ranksMap.push(card.rank);
    }
  }

  return output.splice(0, 5);
}

// ----------------------

function assert(output, expected) {
  console.log(
    'test is',
    output.type === expected.type &&
      output.ranks.join('') === expected.ranks.join(''),
    output,
    '/expected:',
    expected
  );
}

// hand([], ['Kx', 'Qx', 'Ja', 'Jx', '10x', '10a', '9x']);
// hand(
//   ['K♠', 'A♦'],
//   ['J♣', 'Q♥', '9♥', '2♥', '3♦', '10x', '1♥', '4♥', '5♥', '3♥']
// );

// assert(hand(['3♥', '2♥'], ['4♣', '4♥', 'A♠', '6♣', '5♦']), {
//   type: 'straight',
//   ranks: ['6', '5', '4', '3', '2'],
// });

// assert(hand(['Q♦', 'J♦', '5♥', '7♦', '2♦', 'K♦', '9♦'], []), {
//   type: 'flush',
//   ranks: ['K', 'Q', 'J', '9', '7'],
// });
// assert(hand(['4♦', '8♣', 'J♠', '8♠', '8♥', '8♦', '9♣'], []), {
//   type: 'four-of-a-kind',
//   ranks: ['8', 'J'],
// });

assert(hand(['6♥', '7♦', '6♦', '8♦', '3♠', '7♥', 'Q♣'], []), {
  type: 'two pair',
  ranks: ['7', '6', 'Q'],
});

// assert(hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']), {
//   type: 'nothing',
//   ranks: ['A', 'K', 'Q', 'J', '9'],
// });
// assert(hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']), {
//   type: 'pair',
//   ranks: ['Q', 'K', 'J', '9'],
// });
// assert(hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']), {
//   type: 'two pair',
//   ranks: ['K', 'J', '9'],
// });
// assert(hand(['4♠', '9♦'], ['J♣', 'Q♥', 'Q♠', '2♥', 'Q♦']), {
//   type: 'three-of-a-kind',
//   ranks: ['Q', 'J', '9'],
// });
// assert(hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦']), {
//   type: 'straight',
//   ranks: ['K', 'Q', 'J', '10', '9'],
// });
// assert(hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥']), {
//   type: 'flush',
//   ranks: ['Q', 'J', '10', '5', '3'],
// });
// assert(hand(['A♠', 'A♦'], ['K♣', 'K♥', 'A♥', 'Q♥', '3♦']), {
//   type: 'full house',
//   ranks: ['A', 'K'],
// });
// assert(hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']), {
//   type: 'four-of-a-kind',
//   ranks: ['2', '3'],
// });
// assert(hand(['8♠', '6♠'], ['7♠', '5♠', '9♠', 'J♠', '10♠']), {
//   type: 'straight-flush',
//   ranks: ['J', '10', '9', '8', '7'],
// });

// Possible hands are, in descending order of value:
// Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
// Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
// Full house (three cards with the same rank, two with another). Tiebreaker is first the rank of the three cards, then rank of the pair.
// Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
// Straight (five consecutive ranks). Higher rank is better.
// Three-of-a-kind (three cards of the same rank). Tiebreaker is first the rank of the three cards, then the highest other rank, then the second highest other rank.
// Two pair (two cards of the same rank, two cards of another rank). Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
// Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
// Nothing. Tiebreaker is the rank of the cards from high to low.
