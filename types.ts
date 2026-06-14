export type TwitchDropsApiV2ResponseType<T> = {
  lastUpdatedAt: string | null;
  refreshIntervalSeconds: number;
  data: T;
};

export type TwitchDropCampaignType = {
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

export type TwitchRewardCampaignType = {
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
