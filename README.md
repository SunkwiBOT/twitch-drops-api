# Public Twitch Drops API 🎮

![Repository Views](https://komarev.com/ghpvc/?username=SunkwiBOT&repo=twitch-drops-api&label=Repository%20Views&color=brightgreen&style=flat)

This API provides a list of available Twitch drop campaigns and reward campaigns with detailed information.

- `/drops` returns active Twitch drops grouped by game.
- `/rewards` returns Twitch reward campaigns.

> **Note**: This API is used in [Twitch Alerts 🔔](https://discord.com/application-directory/1041679706988228639), a free Discord bot that allows users to:
>
> - Receive notifications when a Twitch streamer goes live.
> - Get alerts about available Twitch drops for specific games or all games.

You can invite the bot to your Discord server using the following links:

- [Discord.com](https://discord.com/application-directory/1041679706988228639)
- [Top.gg](https://top.gg/bot/1041679706988228639)

---

## 🌐 API Endpoints

### List of Twitch Drop Campaigns

**URL**:

```
https://twitch-drops-api.sunkwi.com/drops
```

### List of Twitch Rewards

**URL**:

```
https://twitch-drops-api.sunkwi.com/rewards
```

---

## 📋 Request Example with `fetch`

### Fetch Twitch Drop Campaigns

```ts
(async () => {
  try {
    const response = await fetch("https://twitch-drops-api.sunkwi.com/drops", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: TwitchDropCampaignType[] = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
```

### Fetch Twitch Rewards

```ts
(async () => {
  try {
    const response = await fetch(
      "https://twitch-drops-api.sunkwi.com/rewards",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: TwitchRewardCampaignType[] = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
```

---

## 🗂️ API Response Types

### `TwitchDropCampaignType`

```ts
type TwitchDropCampaignType = {
  endAt: string;
  gameBoxArtURL: string;
  gameDisplayName: string;
  gameId: string;
  rewards: {
    id: string;
    allow: {
      channels?: {
        id: string;
        displayName?: string;
        name: string;
      }[];
      isEnabled: boolean;
    };
    accountLinkURL: string;
    description: string;
    detailsURL: string;
    endAt: string;
    eventBasedDrops: unknown[];
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
      preconditionDrops: unknown;
      requiredMinutesWatched: number;
      startAt: string;
    }[];
  }[];
  startAt: string;
};
```

### `TwitchRewardCampaignType`

```ts
type TwitchRewardCampaignType = {
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
```
