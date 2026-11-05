/** Answer of `GET https://drops.sunkwi.com/api/twitch/drops`. */
export type TwitchDropsResponseType = {
  /** One item per game, its Drops campaigns in `rewards`. */
  games: {
    endAt: string;
    gameBoxArtURL: string;
    gameDisplayName: string;
    gameId: string;
    rewards: {
      accountLinkURL: string;
      allow: {
        channels?: {
          displayName?: string | null;
          id: string;
          name: string;
        }[];
        isEnabled: boolean;
      };
      description: string;
      detailsURL: string;
      endAt: string;
      eventBasedDrops: unknown[];
      game: {
        displayName: string;
        id: string;
        slug: string;
      };
      id: string;
      imageURL: string;
      name: string;
      owner: {
        id: string;
        name: string;
      };
      startAt: string;
      status: string;
      timeBasedDrops: {
        benefitEdges: {
          benefit: {
            createdAt: string;
            distributionType: string;
            entitlementLimit: number;
            game: {
              id: string;
              name: string;
            };
            id: string;
            imageAssetURL: string;
            isIosAvailable: boolean;
            name: string;
            ownerOrganization: {
              id: string;
              name: string;
            };
          };
          entitlementLimit: number;
        }[];
        endAt: string;
        id: string;
        name: string;
        preconditionDrops: unknown;
        requiredMinutesWatched: number;
        requiredSubs: number;
        startAt: string;
      }[];
    }[];
    startAt: string;
  }[];
  /** Time of the last successful Twitch scan (ISO 8601), `null` before the first one. */
  refreshedAt: string | null;
  /** Your allowance on this route after this call, as the `RateLimit-*` headers tell it. */
  rateLimit: {
    limit: number;
    remaining: number;
    /** When the whole allowance is back (ISO 8601). */
    resetAt: string;
  };
};

/** Answer of `GET https://drops.sunkwi.com/api/twitch/rewards`. */
export type TwitchRewardsResponseType = {
  /** One item per reward campaign. */
  campaigns: {
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
    /** Only when Twitch sends them; `rewards` lists their rewards too. */
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
  }[];
  /** Time of the last successful Twitch scan (ISO 8601), `null` before the first one. */
  refreshedAt: string | null;
  /** Your allowance on this route after this call, as the `RateLimit-*` headers tell it. */
  rateLimit: {
    limit: number;
    remaining: number;
    /** When the whole allowance is back (ISO 8601). */
    resetAt: string;
  };
};

export enum TwitchDropsApiErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  /** Too many requests, and the key sent is unknown, revoked or disabled: the call counted as anonymous. */
  INVALID_API_KEY_RATE_LIMITED = "INVALID_API_KEY_RATE_LIMITED",
  NOT_FOUND = "NOT_FOUND",
  RATE_LIMITED = "RATE_LIMITED",
}

/** Body of every error answer. */
export type TwitchDropsApiErrorType = {
  code: TwitchDropsApiErrorCode;
};
