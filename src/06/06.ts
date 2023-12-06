export function parse(input: string) {
  const [timesString, distanceString] = input.split('\n') as [string, string];
  const times = [...timesString.matchAll(/\d+/g)].flat().map(Number);
  const distances = [...distanceString.matchAll(/\d+/g)].flat().map(Number);

  return times.map((time, i) => ({ time, record: distances[i] as number }));
}

function getNumberOfWaysToWin(time: number, record: number) {
  let numberOfWaysToWin = 0;

  for (let i = 1; i < time; i++) {
    const speed = i;
    const remainingTime = time - i;
    const distance = speed * remainingTime;

    if (distance > record) {
      numberOfWaysToWin++;
    } else if (numberOfWaysToWin > 0) {
      break;
    }
  }

  return numberOfWaysToWin;
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    const { time, record } = cur;
    const numberOfWaysToWin = getNumberOfWaysToWin(time, record);

    return acc === 0 ? numberOfWaysToWin : acc * numberOfWaysToWin;
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  const time = input.reduce((acc, cur) => Number(`${acc}${cur.time}`), 0);
  const record = input.reduce((acc, cur) => Number(`${acc}${cur.record}`), 0);

  return getNumberOfWaysToWin(time, record);
}
