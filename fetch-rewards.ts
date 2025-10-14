import fs from "fs";

type TwitchRewardCampaignType = {
  __typename: string;
  aboutURL: string;
  brand: string;
  endsAt: string;
  externalURL: string;
  game?: {
    __typename: string;
    displayName: string;
    id: string;
    slug: string;
  };
  id: string;
  image: {
    __typename: string;
    image1xURL: string;
  };
  instructions: string;
  isSitewide: boolean;
  name: string;
  rewards: {
    __typename: string;
    bannerImage: {
      __typename: string;
      image1xURL: string;
    };
    earnableUntil: string;
    id: string;
    name: string;
    redemptionInstructions: string;
    redemptionURL: string;
    thumbnailImage: {
      __typename: string;
      image1xURL: string;
    };
  }[];
  rewardValueURLParam: string;
  startsAt: string;
  status: string;
  summary: string;
  unlockRequirements: {
    __typename: string;
    minuteWatchedGoal: number;
    subsGoal: number;
  };
};

(async () => {
  const rewardsResponse = await fetch(
    "https://twitch-drops-api.sunkwi.com/rewards",
    {
      method: "GET",
    }
  );

  const rewards: TwitchRewardCampaignType[] = await rewardsResponse.json();

  fs.writeFileSync("rewards.json", JSON.stringify(rewards, null, 2));

  console.log(`[${rewards.length}] reward(s) from campaigns updated`);
})();
