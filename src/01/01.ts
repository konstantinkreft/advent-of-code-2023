export function parse(input: string) {
  return input.split('\n').filter((line) => Boolean(line));
}

const DIGIT_MAP = new Map([
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
]);

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    const matcher = /([1-9])/g;
    const numbers = Array.from(cur.matchAll(matcher)).flat().filter(Boolean);
    const firstDigit = DIGIT_MAP.get(numbers.at(0) as string);
    const lastDigit = DIGIT_MAP.get(numbers.at(-1) as string);

    return acc + Number(`${firstDigit}${lastDigit}`);
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    const matcher = new RegExp(
      `(?=(${Array.from(DIGIT_MAP.keys()).join('|')}))`,
      'g',
    );
    const wordNums = Array.from(cur.matchAll(matcher)).flat().filter(Boolean);
    const firstDigit = DIGIT_MAP.get(wordNums.at(0) as string);
    const lastDigit = DIGIT_MAP.get(wordNums.at(-1) as string);

    const calibrationValue = Number(`${firstDigit}${lastDigit}`);

    return acc + calibrationValue;
  }, 0);
}
