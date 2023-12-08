export function getGreatestCommonDivisor(a: number, b: number) {
  if (b === 0) {
    return a;
  }

  return getGreatestCommonDivisor(b, a % b);
}

export function getLeastCommonMultiple(a: number, b: number) {
  const greatestCommonDivisor = getGreatestCommonDivisor(a, b);

  return (a * b) / greatestCommonDivisor;
}
