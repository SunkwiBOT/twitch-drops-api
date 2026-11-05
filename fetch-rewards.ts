import { fetchRewards, writeSnapshot } from "./snapshot";

// A failed call throws before anything is written: the script exits
// non-zero and rewards.json keeps its last snapshot.
const answer = await fetchRewards();
const written = writeSnapshot("rewards.json", answer, "campaigns");

console.log(
  `rewards.json ${written ? "updated" : "unchanged"}: [${answer.campaigns.length}] campaign(s), scan of [${answer.refreshedAt ?? "unknown"}]`,
);
