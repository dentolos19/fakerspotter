import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export function useStaticText(name: string) {
  return useSWR("/api/static?name=" + name, fetcher);
}

export function pickRandom<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateRandom(minValue: number, maxValue: number) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}