export function parse(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [hand, bidString] = line.split(' ') as [string, string];

      return {
        hand,
        bid: Number(bidString),
      };
    });
}

// biome-ignore format: the type should not be formatted
type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export enum Type {
  FiveOfAKind = 6,
  FourOfAKind = 5,
  FullHouse = 4,
  ThreeOfAKind = 3,
  TwoPairs = 2,
  OnePair = 1,
  HighCard = 0,
}

function getCardStrength(card: Card, hasJoker: boolean) {
  switch (card) {
    case 'A':
      return 14;
    case 'K':
      return 13;
    case 'Q':
      return 12;
    case 'J':
      return hasJoker ? 1 : 11;
    case 'T':
      return 10;
    default:
      return Number(card);
  }
}

export function getType(hand: string, withJoker: boolean) {
  const counts = hand.split('').reduce<Record<string, number>>((acc, cur) => {
    acc[cur] = (acc[cur] ?? 0) + 1;
    return acc;
  }, {});
  const jokersCount = withJoker ? counts.J ?? 0 : 0;
  if (withJoker) {
    counts.J = 0;
  }

  const values = Object.values(counts);

  if (values.includes(5 - jokersCount)) return Type.FiveOfAKind;
  if (values.includes(4 - jokersCount)) return Type.FourOfAKind;
  if (values.includes(3) && values.includes(2)) return Type.FullHouse;
  if (values.filter((v) => v === 2).length === 2 && jokersCount === 1)
    return Type.FullHouse;
  if (values.includes(3 - jokersCount)) return Type.ThreeOfAKind;
  if (values.filter((v) => v === 2).length === 2) return Type.TwoPairs;
  if (values.includes(2 - jokersCount)) return Type.OnePair;

  return Type.HighCard;
}

function sortPlays(
  plays: { hand: string; bid: number; type: Type }[],
  hasJoker: boolean,
) {
  return plays.sort((a, b) => {
    if (a.type < b.type) {
      return -1;
    }

    if (a.type > b.type) {
      return 1;
    }

    const index = a.hand
      .split('')
      .findIndex((char, index) => char !== b.hand[index]);

    return getCardStrength(a.hand[index] as Card, hasJoker) >
      getCardStrength(b.hand[index] as Card, hasJoker)
      ? 1
      : -1;
  });
}

export function partOne(input: ReturnType<typeof parse>) {
  return sortPlays(
    input.map(({ hand, bid }) => {
      const type = getType(hand, false);

      return { hand, bid, type };
    }, []),
    false,
  ).reduce((acc, cur, index) => acc + cur.bid * (index + 1), 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return sortPlays(
    input.map(({ hand, bid }) => {
      const type = getType(hand, true);

      return { hand, bid, type };
    }, []),
    true,
  ).reduce((acc, cur, index) => acc + cur.bid * (index + 1), 0);
}
