import { getLeastCommonMultiple } from '@/utils';

type Name = string;
type Direction = 'L' | 'R';

type Node = {
  L: Name;
  R: Name;
};

type Nodes = {
  [key: Name]: Node;
};

export function parse(input: string) {
  const [instructionsString, nodesString] = input.split('\n\n') as [
    string,
    string,
  ];
  const instructions = instructionsString.split('') as Direction[];
  const nodes = nodesString
    .split('\n')
    .filter(Boolean)
    .reduce<Nodes>((acc, line) => {
      const [name, rest] = line.split(' = ') as [string, string];
      const [L, R] = [...rest.matchAll(/[0-9A-Z]+/g)].flat() as [
        string,
        string,
      ];

      acc[name] = { L, R };

      return acc;
    }, {});

  return { instructions, nodes };
}

function getItem<T extends unknown[]>(array: T, position: number): T[number] {
  return array[position % array.length];
}

export function partOne({ instructions, nodes }: ReturnType<typeof parse>) {
  let steps = 0;
  let currentNode = 'AAA';

  while (currentNode !== 'ZZZ') {
    const direction = getItem(instructions, steps);
    const nextItem = (nodes[currentNode] as Node)[direction];

    steps += 1;
    currentNode = nextItem;
  }

  return steps;
}

export function partTwo({ instructions, nodes }: ReturnType<typeof parse>) {
  const startingNodes = Object.keys(nodes).filter((n) => n.endsWith('A'));
  const minSteps = startingNodes.map((node) => {
    let steps = 0;
    let currentNode = node;

    while (!currentNode.endsWith('Z')) {
      const direction = getItem(instructions, steps);
      const nextItem = (nodes[currentNode] as Node)[direction];

      steps += 1;
      currentNode = nextItem;
    }

    return steps;
  });

  return minSteps.reduce(
    (acc, cur) => {
      return getLeastCommonMultiple(acc, cur);
    },
    minSteps[0] as number,
  );
}
