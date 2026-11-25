import { fetchDrops, stripDropsLiveChannels, writeSnapshot } from "./snapshot";

// A failed call throws before anything is written: the script exits
// non-zero and drops.json keeps its last snapshot.
const answer = await fetchDrops();
const written = writeSnapshot(
  "drops.json",
  stripDropsLiveChannels(answer),
  "games",
);
const campaigns = answer.games.flatMap((game) => game.rewards);
const upcomingCount = campaigns.filter(
  (campaign) => campaign.status === "UPCOMING",
).length;

console.log(
  `drops.json ${written ? "updated" : "unchanged"}: [${answer.games.length}] game(s), [${campaigns.length - upcomingCount}] started and [${upcomingCount}] upcoming campaign(s), scan of [${answer.refreshedAt ?? "unknown"}]`,
);
