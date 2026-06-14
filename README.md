# Public Twitch Drops API 🎮

![Repository Views](https://komarev.com/ghpvc/?username=SunkwiBOT&repo=twitch-drops-api&label=Repository%20Views&color=brightgreen&style=flat)

This API provides available Twitch Drops campaigns and reward campaigns with
detailed information. It supports legacy v1 endpoints that return
[`TwitchDropCampaignType[]`](#twitch-drop-campaign-type) or
[`TwitchRewardCampaignType[]`](#twitch-reward-campaign-type) directly, and v2
endpoints that return the same data wrapped in
[`TwitchDropsApiV2ResponseType<T>`](#twitch-drops-api-v2-response-type).

> **Note**: This API is used in [Twitch Alerts 🔔](https://discord.com/application-directory/1041679706988228639), a free Discord bot that allows users to:
>
> - Receive notifications when a Twitch streamer goes live.
> - Get alerts about available Twitch drops for specific games or all games.

You can invite the bot to your Discord server using the following links:

- [Discord.com](https://discord.com/application-directory/1041679706988228639)
- [Top.gg](https://top.gg/bot/1041679706988228639)

---

## 🌐 API Endpoints

The API exposes drops and rewards in two response formats. All endpoints are
backed by the same Twitch data cache, refreshed every 60 seconds.

| Version   | Endpoint                                                        | Response body                                                                                    | Refresh interval |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------- |
| Legacy v1 | [`/drops`](https://twitch-drops-api.sunkwi.com/drops)           | [`TwitchDropCampaignType[]`](#twitch-drop-campaign-type) directly                                | 60 seconds       |
| Legacy v1 | [`/rewards`](https://twitch-drops-api.sunkwi.com/rewards)       | [`TwitchRewardCampaignType[]`](#twitch-reward-campaign-type) directly                            | 60 seconds       |
| v2        | [`/v2/drops`](https://twitch-drops-api.sunkwi.com/v2/drops)     | [`TwitchDropsApiV2ResponseType<TwitchDropCampaignType[]>`](#twitch-drops-api-v2-response-type)   | 60 seconds       |
| v2        | [`/v2/rewards`](https://twitch-drops-api.sunkwi.com/v2/rewards) | [`TwitchDropsApiV2ResponseType<TwitchRewardCampaignType[]>`](#twitch-drops-api-v2-response-type) | 60 seconds       |

The v2 [`data`](#twitch-drops-api-v2-response-type) field has the same array
shape as the matching legacy v1 response.

### Legacy v1 endpoints

The legacy endpoints return the typed payload array directly:
[`TwitchDropCampaignType[]`](#twitch-drop-campaign-type) for drops and
[`TwitchRewardCampaignType[]`](#twitch-reward-campaign-type) for rewards.

#### List of Twitch Drop Campaigns

**URL**: [`/drops`](https://twitch-drops-api.sunkwi.com/drops)

#### List of Twitch Rewards

**URL**: [`/rewards`](https://twitch-drops-api.sunkwi.com/rewards)

Legacy v1 also exposes freshness through response headers:

```http
X-Last-Updated-At: 2026-06-14T12:34:56.789Z
X-Refresh-Interval-Seconds: 60
```

### v2 endpoints

The v2 endpoints wrap the same payload array in
[`TwitchDropsApiV2ResponseType<T>`](#twitch-drops-api-v2-response-type):

```json
{
  "lastUpdatedAt": "2026-06-14T12:34:56.789Z",
  "refreshIntervalSeconds": 60,
  "data": []
}
```

#### List of Twitch Drop Campaigns

**URL**: [`/v2/drops`](https://twitch-drops-api.sunkwi.com/v2/drops)

#### List of Twitch Rewards

**URL**: [`/v2/rewards`](https://twitch-drops-api.sunkwi.com/v2/rewards)

---

## 📋 Request Example with `fetch`

### Legacy v1

#### Fetch Twitch Drop Campaigns

```ts
(async () => {
  try {
    const response = await fetch("https://twitch-drops-api.sunkwi.com/drops", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const lastUpdatedAt = response.headers.get("X-Last-Updated-At");
    const refreshIntervalSeconds = response.headers.get(
      "X-Refresh-Interval-Seconds",
    );
    const data: TwitchDropCampaignType[] = await response.json();

    console.log(lastUpdatedAt);
    console.log(refreshIntervalSeconds);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
```

#### Fetch Twitch Rewards

```ts
(async () => {
  try {
    const response = await fetch(
      "https://twitch-drops-api.sunkwi.com/rewards",
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const lastUpdatedAt = response.headers.get("X-Last-Updated-At");
    const refreshIntervalSeconds = response.headers.get(
      "X-Refresh-Interval-Seconds",
    );
    const data: TwitchRewardCampaignType[] = await response.json();

    console.log(lastUpdatedAt);
    console.log(refreshIntervalSeconds);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
```

### v2

#### Fetch Twitch Drop Campaigns with freshness metadata

```ts
(async () => {
  try {
    const response = await fetch(
      "https://twitch-drops-api.sunkwi.com/v2/drops",
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const payload: TwitchDropsApiV2ResponseType<TwitchDropCampaignType[]> =
      await response.json();

    console.log(payload.lastUpdatedAt);
    console.log(payload.refreshIntervalSeconds);
    console.log(payload.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
```

#### Fetch Twitch Rewards with freshness metadata

```ts
(async () => {
  try {
    const response = await fetch(
      "https://twitch-drops-api.sunkwi.com/v2/rewards",
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const payload: TwitchDropsApiV2ResponseType<TwitchRewardCampaignType[]> =
      await response.json();

    console.log(payload.lastUpdatedAt);
    console.log(payload.refreshIntervalSeconds);
    console.log(payload.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
```

---

## 🗂️ API Response Types

<a id="twitch-drops-api-v2-response-type"></a>

### `TwitchDropsApiV2ResponseType<T>`

```ts
type TwitchDropsApiV2ResponseType<T> = {
  lastUpdatedAt: string | null;
  refreshIntervalSeconds: number;
  data: T;
};
```

<a id="twitch-drop-campaign-type"></a>

### `TwitchDropCampaignType`

```ts
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
```

<a id="twitch-reward-campaign-type"></a>

### `TwitchRewardCampaignType`

```ts
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
```
