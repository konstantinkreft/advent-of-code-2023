export function parse(input: string) {
  const [seeds, ...rest] = input.split('\n\n') as [string, ...string[]];

  return {
    seeds: (seeds.split(': ') as [string, string])[1]
      .split(' ')
      .filter(Boolean)
      .map(Number),
    maps: rest.map((mapString) => {
      const [nameLine, ...mapLines] = mapString.split('\n') as [
        string,
        ...string[],
      ];
      const name = nameLine.split(' map:')[0] as string;
      const data = mapLines.map((line) => {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = (
          line.split(' ') as [string, string, string]
        ).map(Number) as [number, number, number];

        return {
          destinationRangeStart,
          destinationRangeEnd: destinationRangeStart + rangeLength - 1,
          sourceRangeStart,
          sourceRangeEnd: sourceRangeStart + rangeLength - 1,
          rangeLength,
        };
      });

      return {
        name,
        data,
      };
    }),
  };
}

function getLocation(input: number, maps: ReturnType<typeof parse>['maps']) {
  return maps.reduce((currentLocation, { data }) => {
    const match = data.find(({ sourceRangeStart, sourceRangeEnd }) => {
      return (
        currentLocation >= sourceRangeStart && currentLocation <= sourceRangeEnd
      );
    });

    if (!match) {
      return currentLocation;
    }

    return (
      currentLocation - match.sourceRangeStart + match.destinationRangeStart
    );
  }, input);
}

export function partOne(input: ReturnType<typeof parse>) {
  const { seeds, maps } = input;

  return seeds.reduce((acc, cur) => {
    const location = getLocation(cur, maps);

    return location < acc ? location : acc;
  }, Infinity);
}

function getSeedForLocation(
  location: number,
  maps: ReturnType<typeof parse>['maps'],
) {
  return maps.reduceRight((currentLocation, { data }) => {
    const match = data.find(
      ({ destinationRangeStart, destinationRangeEnd }) => {
        return (
          currentLocation >= destinationRangeStart &&
          currentLocation <= destinationRangeEnd
        );
      },
    );

    if (!match) {
      return currentLocation;
    }

    return (
      currentLocation - match.destinationRangeStart + match.sourceRangeStart
    );
  }, location);
}

export function partTwo(input: ReturnType<typeof parse>) {
  const { seeds, maps } = input;
  const seedRanges = seeds.reduce<{ rangeStart: number; rangeEnd: number }[]>(
    (acc, cur, index, array) => {
      const isEven = index % 2 === 0;

      if (!isEven) {
        return acc;
      }

      const rangeStart = cur;
      const rangeEnd = rangeStart + (array[index + 1] as number) - 1;

      return acc.concat({ rangeStart, rangeEnd });
    },
    [],
  );

  let minLocation = Infinity;

  for (let i = 0; minLocation === Infinity; i++) {
    const seedCandidate = getSeedForLocation(i, maps);

    const match = seedRanges.find(({ rangeStart, rangeEnd }) => {
      return seedCandidate >= rangeStart && seedCandidate <= rangeEnd;
    });

    if (match) {
      minLocation = i;
    }
  }

  return minLocation;
}
