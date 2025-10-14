import fs from "fs";

type TwitchDropCampaignType = {
  endAt: string;
  gameBoxArtURL: string;
  gameDisplayName: string;
  gameId: string;
  rewards: {
    id: string;
    self: {
      isAccountConnected: boolean;
      __typename: string;
    };
    allow: {
      channels?: {
        id: string;
        displayName?: string;
        name: string;
        __typename: string;
      }[];
      isEnabled: boolean;
      __typename: string;
    };
    accountLinkURL: string;
    description: string;
    detailsURL: string;
    endAt: string;
    eventBasedDrops: any[];
    game: {
      id: string;
      slug: string;
      displayName: string;
      __typename: string;
    };
    imageURL: string;
    name: string;
    owner: {
      id: string;
      name: string;
      __typename: string;
    };
    startAt: string;
    status: string;
    timeBasedDrops: {
      id: string;
      requiredSubs: number;
      benefitEdges: {
        benefit: {
          id: string;
          createdAt: string;
          entitlementLimit: number;
          game: {
            id: string;
            name: string;
            __typename: string;
          };
          imageAssetURL: string;
          isIosAvailable: boolean;
          name: string;
          ownerOrganization: {
            id: string;
            name: string;
            __typename: string;
          };
          distributionType: string;
          __typename: string;
        };
        entitlementLimit: number;
        __typename: string;
      }[];
      endAt: string;
      name: string;
      preconditionDrops: any;
      requiredMinutesWatched: number;
      startAt: string;
      __typename: string;
    }[];
    __typename: string;
  }[];
  startAt: string;
};

(async () => {
  const dropsResponse = await fetch(
    "https://twitch-drops-api.sunkwi.com/drops",
    {
      method: "GET",
    }
  );

  const drops: TwitchDropCampaignType[] = await dropsResponse.json();

  fs.writeFileSync("drops.json", JSON.stringify(drops, null, 2));

  console.log(
    `[${drops.length}] drop(s) and [${drops.reduce(
      (acc, curr) => acc + curr.rewards.length,
      0
    )}] reward(s) from drops updated`
  );
})();
