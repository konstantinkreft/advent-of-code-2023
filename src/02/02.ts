export function parse(input: string) {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [game, rest] = line.split(': ') as [string, string];
      const id = Number(game?.split(' ')[1] as string);
      const sets = rest.split('; ').map((set) => {
        const cubes = set.split(', ').map((c) => {
          const [count, color] = c.split(' ') as [string, Color];
          return { count: Number(count), color };
        });

        return cubes;
      });

      return { id, sets };
    });
}

type Color = 'red' | 'green' | 'blue';

const MAX_VALUES: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    const valid = cur.sets.every((set) => {
      return set.every((cube) => {
        return cube.count <= MAX_VALUES[cube.color];
      });
    });

    return valid ? acc + cur.id : acc;
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    const { red, green, blue } = cur.sets.reduce<Record<Color, number>>(
      (acc, cur) => {
        const currentRed = cur.find((cube) => cube.color === 'red')?.count ?? 0;
        const currentGreen =
          cur.find((cube) => cube.color === 'green')?.count ?? 0;
        const currentBlue =
          cur.find((cube) => cube.color === 'blue')?.count ?? 0;

        return {
          red: acc.red < currentRed ? currentRed : acc.red,
          green: acc.green < currentGreen ? currentGreen : acc.green,
          blue: acc.blue < currentBlue ? currentBlue : acc.blue,
        };
      },
      { red: 0, green: 0, blue: 0 },
    );

    return acc + red * green * blue;
  }, 0);
}
