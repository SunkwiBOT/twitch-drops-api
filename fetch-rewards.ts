import fs from "fs";
import type {
  TwitchDropsApiV2ResponseType,
  TwitchRewardCampaignType,
} from "./types";

(async () => {
  const rewardsResponse = await fetch(
    "https://twitch-drops-api.sunkwi.com/v2/rewards",
    {
      method: "GET",
    },
  );

  if (!rewardsResponse.ok) {
    throw new Error(`Failed to fetch rewards: ${rewardsResponse.status}`);
  }

  const rewardsPayload: TwitchDropsApiV2ResponseType<
    TwitchRewardCampaignType[]
  > = await rewardsResponse.json();
  const rewards = rewardsPayload.data;

  if (!Array.isArray(rewards)) {
    throw new Error("Invalid /v2/rewards response: data must be an array");
  }

  fs.writeFileSync("rewards.json", JSON.stringify(rewards, null, 2));

  console.log(
    `[${rewards.length}] reward(s) from campaigns updated. Source cache last updated at [${rewardsPayload.lastUpdatedAt ?? "unknown"}]`,
  );
})();
