export function parse(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(' ').filter(Boolean).map(Number));
}

function getDifferences(line: number[]) {
  const differences: number[][] = [line];

  while (!(differences.at(-1) as number[]).every((v) => v === 0)) {
    const current = differences.at(-1) as number[];
    const next = current.reduce<number[]>((acc, cur, index) => {
      const nextItem = current[index + 1];

      if (nextItem === undefined) {
        return acc;
      }

      const diff = nextItem - cur;
      acc.push(diff);
      return acc;
    }, []);
    differences.push(next);
  }

  return differences;
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, line) => {
    const differences = getDifferences(line);

    const nextValue = differences.reduceRight((acc, cur) => {
      const lastItem = cur.at(-1) as number;
      return acc + lastItem;
    }, 0);

    return acc + nextValue;
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, line) => {
    const differences = getDifferences(line);

    const nextValue = differences.reduceRight((acc, cur) => {
      const firstItem = cur.at(0) as number;
      return firstItem - acc;
    }, 0);

    return acc + nextValue;
  }, 0);
}
