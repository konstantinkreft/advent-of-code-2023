export function parse(input: string) {
  return input.split('\n').filter(Boolean);
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, line, lineNumber, lines) => {
    const numbers = line.matchAll(/\d+/g);
    let lineAcc = 0;

    for (const match of numbers) {
      const number = Number(match[0]);
      const start = match.index as number;
      const end = start + match[0].length;

      const subLineBefore = lines[lineNumber - 1]?.substring(
        start - 1,
        end + 1,
      );
      const subLineAfter = lines[lineNumber + 1]?.substring(start - 1, end + 1);
      const charBefore = line[start - 1];
      const charAfter = line[end];

      const matchSymbol = /[^\d|\.]/;

      const isSymbolBefore = charBefore ? matchSymbol.test(charBefore) : false;
      const isSymbolAfter = charAfter ? matchSymbol.test(charAfter) : false;
      const isSymbolOnLineBefore = subLineBefore
        ? matchSymbol.test(subLineBefore)
        : false;
      const isSymbolOnLineAfter = subLineAfter
        ? matchSymbol.test(subLineAfter)
        : false;

      if (
        isSymbolBefore ||
        isSymbolAfter ||
        isSymbolOnLineBefore ||
        isSymbolOnLineAfter
      ) {
        lineAcc += number;
      }
    }

    return acc + lineAcc;
  }, 0);
}

function getAdjacentNumbersOnLine(
  line: string | undefined,
  filter: (match: {
    value: number;
    startIndex: number;
    endIndex: number;
  }) => boolean,
) {
  return !line
    ? []
    : Array.from(line.matchAll(/\d+/g), (match) => {
        return {
          value: Number(match[0]),
          startIndex: match.index as number,
          endIndex: (match.index as number) + match[0].length - 1,
        };
      })
        .filter(filter)
        .map((match) => match.value);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, line, lineNumber, lines) => {
    const asterisks = line.matchAll(/\*/g);
    let gearRatio = 0;

    for (const asterisk of asterisks) {
      const position = asterisk.index as number;

      const lineBefore = lines[lineNumber - 1];
      const lineAfter = lines[lineNumber + 1];

      const adjacentNumbersOnLine = getAdjacentNumbersOnLine(
        line,
        (match) =>
          match.startIndex === position + 1 || match.endIndex === position - 1,
      );
      const adjacentNumbersOnLineBefore = getAdjacentNumbersOnLine(
        lineBefore,
        (match) =>
          (match.startIndex <= position && match.endIndex >= position) ||
          match.endIndex === position - 1 ||
          match.startIndex === position + 1,
      );
      const adjacentNumbersOnLineAfter = getAdjacentNumbersOnLine(
        lineAfter,
        (match) =>
          (match.startIndex <= position && match.endIndex >= position) ||
          match.endIndex === position - 1 ||
          match.startIndex === position + 1,
      );

      const adjacentNumbers = [
        ...adjacentNumbersOnLine,
        ...adjacentNumbersOnLineBefore,
        ...adjacentNumbersOnLineAfter,
      ];

      if (adjacentNumbers.length === 2) {
        gearRatio += adjacentNumbers.reduce((acc, cur) => acc * cur, 1);
      }
    }

    return acc + gearRatio;
  }, 0);
}
