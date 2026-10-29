export type TwitchDropsApiV2ResponseType<T> = {
  /** Only without an API key: the free limit and where to get a key. */
  _message?: string[];
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
    allow: {
      channels?: {
        id: string;
        displayName?: string | null;
        name: string;
      }[];
      isEnabled: boolean;
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
    };
    imageURL: string;
    name: string;
    owner: {
      id: string;
      name: string;
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
          };
          imageAssetURL: string;
          isIosAvailable: boolean;
          name: string;
          ownerOrganization: {
            id: string;
            name: string;
          };
          distributionType: string;
        };
        entitlementLimit: number;
      }[];
      endAt: string;
      name: string;
      preconditionDrops: any;
      requiredMinutesWatched: number;
      startAt: string;
    }[];
  }[];
  startAt: string;
};

export type TwitchRewardCampaignType = {
  aboutURL: string;
  brand: string;
  endsAt: string;
  externalURL: string;
  game?: {
    displayName: string;
    id: string;
    slug: string;
  };
  id: string;
  image: {
    image1xURL: string;
  };
  instructions: string;
  isSitewide: boolean;
  name: string;
  rewardGroups?: {
    id: string;
    rewards: {
      bannerImage: {
        image1xURL: string;
      };
      earnableUntil: string;
      id: string;
      name: string;
      redemptionInstructions: string;
      redemptionURL: string;
      thumbnailImage: {
        image1xURL: string;
      };
    }[];
    unlockRequirements: {
      eventTriggerGoal?: number;
      minuteWatchedGoal: number;
      subsGoal: number;
      turboSubsGoal?: number;
    };
  }[];
  rewards: {
    bannerImage: {
      image1xURL: string;
    };
    earnableUntil: string;
    id: string;
    name: string;
    redemptionInstructions: string;
    redemptionURL: string;
    thumbnailImage: {
      image1xURL: string;
    };
  }[];
  rewardValueURLParam: string;
  startsAt: string;
  status: string;
  summary: string;
  unlockRequirements: {
    minuteWatchedGoal: number;
    subsGoal: number;
  };
};

export enum TwitchDropsApiErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INVALID_API_KEY = "INVALID_API_KEY",
  NOT_FOUND = "NOT_FOUND",
  RATE_LIMITED = "RATE_LIMITED",
}

export type TwitchDropsApiErrorType = {
  code: TwitchDropsApiErrorCode;
};
