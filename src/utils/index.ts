export function getRandomNumber(max: number): number {
  const min = 0;
  return Math.floor(Math.random() * (max - min)) + min;
}
