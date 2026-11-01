import { expect, spyOn, test } from "bun:test";

import { fetchText } from "../src/lib/database";

test("text requests return content and reject unsuccessful responses", async () => {
  const fetch = spyOn(globalThis, "fetch");
  try {
    fetch.mockResolvedValueOnce(new Response("content"));
    expect(await fetchText("/content")).toBe("content");

    fetch.mockResolvedValueOnce(new Response("not found", { status: 404 }));
    await expect(fetchText("/missing")).rejects.toThrow("Failed to load /missing: 404");
  } finally {
    fetch.mockRestore();
  }
});
