export function pickRandom<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateRandom(minValue: number, maxValue: number) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}