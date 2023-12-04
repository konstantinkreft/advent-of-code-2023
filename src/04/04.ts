export function parse(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [_, numbersString] = line.split(':') as [string, string];
      const [winningNumbersString, drawnNumbersString] = numbersString.split(
        '|',
      ) as [string, string];
      const winningNumbers = [...winningNumbersString.matchAll(/\d+/g)].map(
        Number,
      );
      const drawnNumbers = [...drawnNumbersString.matchAll(/\d+/g)].map(Number);

      return {
        winningNumbers,
        drawnNumbers,
      };
    });
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    const score = cur.drawnNumbers
      .filter((drawnNumber) => cur.winningNumbers.includes(drawnNumber))
      .reduce((acc) => {
        if (acc === 0) {
          return 1;
        }

        return acc * 2;
      }, 0);

    return acc + score;
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  const cardCopiesWon: Record<number, number> = {};
  return input.reduce((acc, cur, index) => {
    const round = index + 1;
    const matches = cur.drawnNumbers.filter((drawnNumber) =>
      cur.winningNumbers.includes(drawnNumber),
    );
    const numberOfMatches = matches.length;
    const currentRoundCards = (cardCopiesWon[round] || 0) + 1;

    if (numberOfMatches > 0) {
      for (let i = round + 1; i < round + 1 + numberOfMatches; i++) {
        if (cardCopiesWon[i]) {
          cardCopiesWon[i] += currentRoundCards;
        } else {
          cardCopiesWon[i] = currentRoundCards;
        }
      }
    }

    return acc + currentRoundCards;
  }, 0);
}
