import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export function useStaticText(name: string) {
  return useSWR("/api/static?name=" + name, fetcher);
}