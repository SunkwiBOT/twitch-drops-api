<div align="center">
  <h1>
    <a href="https://drops.sunkwi.com"><img src=".github/assets/logo.png" alt="Twitch Drops API logo" width="128" height="128"></a>
    <br/>
    Twitch Drops API
  </h1>
  🎁 A free public API of the current <b><a href="https://www.twitch.tv/drops/campaigns">Twitch Drops</a></b> and reward campaigns, refreshed every minute
  <br/><br/>
  <a href="https://drops.sunkwi.com">Website 🌐</a> &emsp; <a href="https://drops.sunkwi.com/docs">Documentation ✨</a> &emsp; <a href="https://drops.sunkwi.com/dashboard">Free API key 🔑</a> &emsp; <a href="https://discord.com/application-directory/1041679706988228639">Twitch Alerts 🔔</a>
</div>

<br/>

<p align="center">
  <a href="https://twitch-drops-api.sunkwi.com/api/health"><img src="https://img.shields.io/website?url=https%3A%2F%2Ftwitch-drops-api.sunkwi.com%2Fapi%2Fhealth&label=API&up_message=online&down_message=offline" alt="API status" /></a>
  <a href="https://github.com/SunkwiBOT/twitch-drops-api"><img src="https://komarev.com/ghpvc/?username=SunkwiBOT&repo=twitch-drops-api&label=Repository%20Views&color=brightgreen&style=flat" alt="Repository views" /></a>
  <a href="https://github.com/SunkwiBOT/twitch-drops-api/stargazers"><img src="https://img.shields.io/github/stars/SunkwiBOT/twitch-drops-api?style=flat" alt="GitHub stars" /></a>
</p>

## About

This API provides available Twitch Drops campaigns and reward campaigns with
detailed information. It supports legacy v1 endpoints that return
[`TwitchDropCampaignType[]`](#twitch-drop-campaign-type) or
[`TwitchRewardCampaignType[]`](#twitch-reward-campaign-type) directly, and v2
endpoints that return the same data wrapped in
[`TwitchDropsApiV2ResponseType<T>`](#twitch-drops-api-v2-response-type).

**Features**

- Every active Twitch Drops campaign, grouped by game, and every reward campaign.
- Refreshed every 60 seconds, with the time of the last scan.
- Free without an account; a free API key raises the limit
  ([Rate Limits and API Keys](#-rate-limits-and-api-keys)).
- Documentation with a console to try every route:
  [drops.sunkwi.com/docs](https://drops.sunkwi.com/docs).

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

---

## 🔑 Rate Limits and API Keys

Drops and rewards have their own limits. A route and its older twin share
one: `/drops` and `/v2/drops` serve the same list, so do `/rewards` and
`/v2/rewards`.

| Client                  | Limit, per route                                     | Identified by                                  |
| ----------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| Anonymous (no key)      | **1 request every 5 minutes**                        | IP address (an IPv6 address counts as its /64) |
| With a **free** API key | **1 request per minute** by default, more on request | API key                                        |

The data is refreshed every 60 seconds: calling more than once a minute
returns the same answer.

**Get a free API key** at
[drops.sunkwi.com/dashboard](https://drops.sunkwi.com/dashboard): sign in with
Discord, GitHub or Twitch, then create a key (it starts with `jdk_`). Send it
with every request, in one of these headers:

```http
X-API-Key: jdk_...
Authorization: Bearer jdk_...
```

Keep your key on your server: never ship it in a browser or a mobile app.

Every answer carries its limit:

```http
RateLimit-Limit: 1
RateLimit-Remaining: 0
RateLimit-Reset: 274
RateLimit-Policy: 1;w=300
```

Past the limit, the API answers `429 Too Many Requests` with a `Retry-After`
header (seconds to wait) and a
[`TwitchDropsApiErrorType`](#twitch-drops-api-error-type) body. A refused call
still counts: wait for `Retry-After` before calling again.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 274

{ "code": "RATE_LIMITED" }
```

An unknown, revoked or disabled key answers `401` with
`{ "code": "INVALID_API_KEY" }`: remove the header to call anonymously.

Without a key, the v2 answers start with a `_message` field: a few lines
telling the free limit and where to get a key. It is not sent with a key, and
the v1 answers (bare arrays) never carry it.

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

### With an API key

```ts
(async () => {
  const response = await fetch("https://twitch-drops-api.sunkwi.com/v2/drops", {
    headers: {
      "X-API-Key": process.env.DROPS_API_KEY ?? "",
    },
  });

  if (response.status === 429) {
    const seconds = Number(response.headers.get("Retry-After"));

    throw new Error(`Rate limited, retry in ${seconds} s`);
  }

  if (!response.ok) {
    const error: TwitchDropsApiErrorType = await response.json();

    throw new Error(`HTTP error: ${response.status} (${error.code})`);
  }

  const payload: TwitchDropsApiV2ResponseType<TwitchDropCampaignType[]> =
    await response.json();

  console.log(payload.lastUpdatedAt);
  console.log(payload.data);
})();
```

---

## 🗂️ API Response Types

<a id="twitch-drops-api-v2-response-type"></a>

### `TwitchDropsApiV2ResponseType<T>`

```ts
type TwitchDropsApiV2ResponseType<T> = {
  /** Only without an API key: the free limit and where to get a key. */
  _message?: string[];
  lastUpdatedAt: string | null;
  refreshIntervalSeconds: number;
  data: T;
};
```

<a id="twitch-drops-api-error-type"></a>

### `TwitchDropsApiErrorType`

```ts
enum TwitchDropsApiErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INVALID_API_KEY = "INVALID_API_KEY",
  NOT_FOUND = "NOT_FOUND",
  RATE_LIMITED = "RATE_LIMITED",
}

type TwitchDropsApiErrorType = {
  code: TwitchDropsApiErrorCode;
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
```

<a id="twitch-reward-campaign-type"></a>

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
```
