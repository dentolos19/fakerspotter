import { expect, test } from "bun:test";

import { awardFor } from "../src/lib/awards";

test("scores at award boundaries receive the intended award", () => {
  expect(awardFor(1000).title).toBe("Cyberwellness Arcane Champion");
  expect(awardFor(999).title).toBe("Cyberwellness Champion");
  expect(awardFor(800).title).toBe("Cyberwellness Champion");
  expect(awardFor(799).title).toBe("Cyberwellness Master");
  expect(awardFor(600).title).toBe("Cyberwellness Master");
  expect(awardFor(599).title).toBe("Cyberwellness Apprentice");
  expect(awardFor(400).title).toBe("Cyberwellness Apprentice");
  expect(awardFor(399).title).toBe("Cyberwellness Novice");
});
