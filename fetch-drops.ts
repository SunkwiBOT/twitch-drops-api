import { fetchDrops, writeSnapshot } from "./snapshot";

// A failed call throws before anything is written: the script exits
// non-zero and drops.json keeps its last snapshot.
const answer = await fetchDrops();
const written = writeSnapshot("drops.json", answer, "games");
const campaignCount = answer.games.reduce(
  (count, game) => count + game.rewards.length,
  0,
);

console.log(
  `drops.json ${written ? "updated" : "unchanged"}: [${answer.games.length}] game(s), [${campaignCount}] campaign(s), scan of [${answer.refreshedAt ?? "unknown"}]`,
);
