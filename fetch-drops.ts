import fs from "fs";
import type {
  TwitchDropCampaignType,
  TwitchDropsApiV2ResponseType,
} from "./types";

(async () => {
  const dropsResponse = await fetch(
    "https://twitch-drops-api.sunkwi.com/v2/drops",
    {
      method: "GET",
    },
  );

  if (!dropsResponse.ok) {
    throw new Error(`Failed to fetch drops: ${dropsResponse.status}`);
  }

  const dropsPayload: TwitchDropsApiV2ResponseType<TwitchDropCampaignType[]> =
    await dropsResponse.json();
  const drops = dropsPayload.data;

  if (!Array.isArray(drops)) {
    throw new Error("Invalid /v2/drops response: data must be an array");
  }

  fs.writeFileSync("drops.json", JSON.stringify(drops, null, 2));

  console.log(
    `[${drops.length}] drop(s) and [${drops.reduce(
      (acc, curr) => acc + curr.rewards.length,
      0,
    )}] reward(s) from drops updated. Source cache last updated at [${dropsPayload.lastUpdatedAt ?? "unknown"}]`,
  );
})();
