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
        /** Added 14/11/2026: `null` for a drop earned once; earned `times` times, `everyHours` apart. */
        repeat?: {
          everyHours: number | null;
          times: number;
        } | null;
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
      /** Added 14/11/2026: the categories whose live channels count (any of them), empty when Twitch names none. */
      categories?: {
        displayName: string;
        id: string;
        slug: string;
      }[];
      id: string;
      /** Added 14/11/2026: how often the group is earned again, `null` when once. */
      repeat?: {
        everyHours: number | null;
        times: number;
      } | null;
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
    /** `UPCOMING` before an event collection (GTA VI) starts. */
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

/** Answer of `GET https://drops.sunkwi.com/api/twitch/badges`. */
export type TwitchBadgesResponseType = {
  /** One item per version of a global Twitch chat badge, as Twitch lists it now. */
  badges: {
    clickAction: string | null;
    clickUrl: string | null;
    description: string;
    /** When this API last saw the badge appear, `null` for the badges already there at its first read. */
    firstSeenAt: string | null;
    /** 18 px. */
    imageUrl1x: string;
    /** 36 px. */
    imageUrl2x: string;
    /** 72 px. */
    imageUrl4x: string;
    /** How to get the badge, `null` when it is not known. */
    requirement: {
      /** Added 14/11/2026, `DROPS` only (else empty): any of these categories counts. */
      categories?: {
        id: string;
        name: string;
      }[];
      campaignId: string | null;
      campaignName: string | null;
      /** How many channels the campaign names (all of them), 0 for any channel. */
      channelCount: number;
      /** The first channels of the campaign (5 at most). */
      channels: string[];
      /** Added 14/11/2026, `DROPS` only: the badge is a reward of an event collection (GTA VI, Pokémon), else `null`. */
      collection?: {
        /** The badge comes out of a chest of that many rewards, `null` when given as such. */
        chestSize: number | null;
        /** Given for completing every other reward of the collection (GTA VI's Golden Iguana). */
        completeAll: boolean;
      } | null;
      endAt: string | null;
      gameId: string | null;
      gameName: string;
      /** Added 14/11/2026, `DROPS` only: the watch time is needed again each period, `null` when once. */
      repeat?: {
        everyHours: number | null;
        times: number;
      } | null;
      /** Watch time of one period when there is a `repeat`. */
      requiredMinutes: number;
      requiredSubs: number;
      /** `DROPS`: a Drops campaign gives the badge. `TWITCH_DESCRIPTION`: read in Twitch's description. */
      source: "DROPS" | "TWITCH_DESCRIPTION";
      startAt: string | null;
      /** `true` exactly for a `DROPS` requirement earned by watching alone. */
      watchTimeOnly: boolean;
    } | null;
    setId: string;
    title: string;
    versionId: string;
  }[];
  /** Time of the last successful read of Twitch's badges (ISO 8601), `null` before the first one. */
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
