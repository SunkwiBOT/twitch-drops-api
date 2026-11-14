import { fetchBadges, writeSnapshot } from "./snapshot";

// A failed call throws before anything is written: the script exits
// non-zero and badges.json keeps its last snapshot.
const answer = await fetchBadges();
const written = writeSnapshot("badges.json", answer, "badges");

console.log(
  `badges.json ${written ? "updated" : "unchanged"}: [${answer.badges.length}] badge(s), scan of [${answer.refreshedAt ?? "unknown"}]`,
);
