<div align="center">
  <h1>
    <a href="https://drops.sunkwi.com"><img src=".github/assets/logo.png" alt="Twitch Drops API logo" width="128" height="128"></a>
    <br/>
    Twitch Drops API
  </h1>
  🎁 A free public API of the current <b><a href="https://www.twitch.tv/drops/campaigns">Twitch Drops</a></b> and reward campaigns, refreshed every minute
  <br/><br/>
  <a href="https://drops.sunkwi.com">Website 🌐</a> &emsp; <a href="https://drops.sunkwi.com/docs">Documentation ✨</a> &emsp; <a href="https://drops.sunkwi.com/dashboard">Free API key 🔑</a> &emsp; <a href="https://discord.com/application-directory/1041679706988228639">Twitch Alerts 🔔</a> &emsp; <a href="https://github.com/SunkwiBOT/twitch-miner">Twitch Miner ⛏️</a>
</div>

<br/>

<p align="center">
  <a href="https://drops.sunkwi.com/api/health"><img src="https://img.shields.io/website?url=https%3A%2F%2Fdrops.sunkwi.com%2Fapi%2Fhealth&label=API&up_message=online&down_message=offline" alt="API status" /></a>
  <a href="https://github.com/SunkwiBOT/twitch-drops-api"><img src="https://komarev.com/ghpvc/?username=SunkwiBOT&repo=twitch-drops-api&label=Repository%20Views&color=brightgreen&style=flat" alt="Repository views" /></a>
  <a href="https://github.com/SunkwiBOT/twitch-drops-api/stargazers"><img src="https://img.shields.io/github/stars/SunkwiBOT/twitch-drops-api?style=flat" alt="GitHub stars" /></a>
</p>

## About

This API provides available Twitch Drops campaigns and reward campaigns with
detailed information, in two routes on `https://drops.sunkwi.com`:
[`GET /api/twitch/drops`](#-api-endpoints) and
[`GET /api/twitch/rewards`](#-api-endpoints). Each answers a JSON object with
named keys: the list, the time of the last Twitch scan and your remaining
allowance.

**Features**

- Every active Twitch Drops campaign, grouped by game, and every reward campaign.
- Refreshed every 60 seconds, with the time of the last scan.
- Free without an account; a free API key raises the limit
  ([Rate Limits and API Keys](#-rate-limits-and-api-keys)).
- An `ETag` on every answer: while the list has not changed, asking again
  answers a free `304 Not Modified` ([ETag and free `304`](#-etag-and-free-304)).
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

## ⛏️ Twitch Miner

<p align="center">
  <a href="https://github.com/SunkwiBOT/twitch-miner"><img src="https://raw.githubusercontent.com/SunkwiBOT/twitch-miner/main/ui/public/app-icon.png" alt="Twitch Miner logo" width="80" height="80"></a>
</p>

[**Twitch Miner**](https://github.com/SunkwiBOT/twitch-miner)
mines Twitch Drops and channel points on several accounts, with no browser and
no Twitch tab open. Its list of Drops campaigns comes from this API.

- **100% free** and **100% open source** (MIT).
- Drops and channel points on the same account, or only one of the two.
- Several accounts, each in its own mode.
- Every running Drops campaign, in the order you choose, claimed automatically
  if you want.
- **Spam Points**: a channel's custom reward redeemed up to 25 times in a row.
- About 30 MB of memory for 4 accounts.
- A desktop app for Windows, macOS and Linux, or a Docker image (`amd64`,
  `arm64`) with the same dashboard, for a server or a Raspberry Pi.

<p align="center">
  <a href="https://github.com/SunkwiBOT/twitch-miner/releases/latest"><strong>Download</strong></a> &emsp; <a href="https://github.com/SunkwiBOT/twitch-miner#docker">Docker</a> &emsp; <a href="https://github.com/SunkwiBOT/twitch-miner">GitHub</a>
</p>

<p align="center">
  <a href="https://github.com/SunkwiBOT/twitch-miner"><img src="https://raw.githubusercontent.com/SunkwiBOT/twitch-miner/main/docs/media/en/presentation.avif" alt="Video overview of Twitch Miner"></a>
</p>

---

## 🌐 API Endpoints

Both routes are backed by the same Twitch data, refreshed every 60 seconds.

| Endpoint                                                                 | Response body                                                | Refresh interval |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| [`GET /api/twitch/drops`](https://drops.sunkwi.com/api/twitch/drops)     | [`TwitchDropsResponseType`](#twitch-drops-response-type)     | 60 seconds       |
| [`GET /api/twitch/rewards`](https://drops.sunkwi.com/api/twitch/rewards) | [`TwitchRewardsResponseType`](#twitch-rewards-response-type) | 60 seconds       |

Every answer is a JSON object with named keys, never a bare array:

| Key                   | Content                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `games` (drops)       | One item per game, its Drops campaigns in `rewards`.                                                                            |
| `campaigns` (rewards) | One item per reward campaign (site-wide events, chat badges, partner rewards).                                                  |
| `refreshedAt`         | Time of the last successful Twitch scan (ISO 8601), `null` before the first one.                                                |
| `rateLimit`           | Your allowance on this route after this call: `limit`, `remaining`, and `resetAt`, when the whole allowance is back (ISO 8601). |

An empty list is a valid answer: no campaign is running.

<!-- prettier-ignore -->
```jsonc
// GET https://drops.sunkwi.com/api/twitch/drops
{
  "games": [
    {
      "endAt": "2026-11-30T22:59:59.999Z",
      "gameBoxArtURL": "https://static-cdn.jtvnw.net/ttv-boxart/32502_IGDB-120x160.jpg",
      "gameDisplayName": "World of Warships",
      "gameId": "32502",
      "rewards": [
        // One item per Drops campaign of this game: see TwitchDropsResponseType
      ],
      "startAt": "2026-11-01T00:00:00.000Z"
    }
  ],
  "refreshedAt": "2026-11-05T12:34:56.789Z",
  "rateLimit": {
    "limit": 1,
    "remaining": 0,
    "resetAt": "2026-11-05T12:35:57.000Z"
  }
}
```

---

## 🔑 Rate Limits and API Keys

Drops and rewards have their own limits.

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

Every answer carries its limit, in its headers and in its `rateLimit` field:

```http
RateLimit-Limit: 1
RateLimit-Remaining: 0
RateLimit-Reset: 274
RateLimit-Policy: 1;w=300
```

`RateLimit-Reset` counts the seconds until the whole allowance is back;
`rateLimit.resetAt` gives the same moment as a date.

Past the limit, the API answers `429 Too Many Requests` with a `Retry-After`
header (seconds to wait) and a
[`TwitchDropsApiErrorType`](#twitch-drops-api-error-type) body. A refused call
still counts: wait for `Retry-After` before calling again.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 274

{ "code": "RATE_LIMITED" }
```

A key that is unknown, revoked or disabled is not refused: the call counts as
anonymous, against the limit of your IP address, and the answer carries
`X-API-Key-Status: invalid`. Past that limit, the code is
`INVALID_API_KEY_RATE_LIMITED`: fix the key.

### 🔁 ETag and free `304`

Every answer carries an `ETag` header, the tag of its list. Send it back in
`If-None-Match`: while the list has not changed, the API answers
`304 Not Modified`, with no body, and the call does not count against your
limit. The `RateLimit-*` headers of a `304` show your allowance, untouched.

```http
GET /api/twitch/drops HTTP/1.1
Host: drops.sunkwi.com
X-API-Key: jdk_...
If-None-Match: <the ETag of your last answer>

HTTP/1.1 304 Not Modified
```

Poll with `If-None-Match`: you only spend your allowance when the list changes.

### ⚠️ Errors

Every error answers a `{ "code": "..." }` body
([`TwitchDropsApiErrorType`](#twitch-drops-api-error-type)):

| Status | `code`                         | Meaning                                                                                                                                                         |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `404`  | `NOT_FOUND`                    | The route does not exist.                                                                                                                                       |
| `429`  | `RATE_LIMITED`                 | Too many requests on this route: wait the seconds given by `Retry-After`.                                                                                       |
| `429`  | `INVALID_API_KEY_RATE_LIMITED` | Too many requests, and the `X-API-Key` header holds an unknown, revoked or disabled key: the call counted as anonymous. Fix the key, or wait for `Retry-After`. |
| `500`  | `INTERNAL_SERVER_ERROR`        | The server failed: retry later.                                                                                                                                 |

---

## 📋 Request Examples

### curl

```sh
# Anonymous: 1 request every 5 minutes per route
curl https://drops.sunkwi.com/api/twitch/drops

# With a free API key
curl -H "X-API-Key: $DROPS_API_KEY" https://drops.sunkwi.com/api/twitch/rewards

# With the headers: ETag, RateLimit-*
curl -i -H "X-API-Key: $DROPS_API_KEY" https://drops.sunkwi.com/api/twitch/drops

# A free 304 while the list has not changed
curl -i -H "X-API-Key: $DROPS_API_KEY" -H "If-None-Match: $ETAG" https://drops.sunkwi.com/api/twitch/drops
```

### TypeScript `fetch`

The types come from [`types.ts`](types.ts).

#### Fetch Twitch Drop Campaigns

```ts
const response = await fetch("https://drops.sunkwi.com/api/twitch/drops");

if (!response.ok) {
  const error = (await response.json()) as TwitchDropsApiErrorType;

  throw new Error(`HTTP error: ${response.status} (${error.code})`);
}

const { games, refreshedAt, rateLimit } =
  (await response.json()) as TwitchDropsResponseType;

console.log(`${games.length} game(s), scan of ${refreshedAt}`);
console.log(
  `${rateLimit.remaining}/${rateLimit.limit} left, full again at ${rateLimit.resetAt}`,
);
```

#### Fetch Twitch Rewards with an API key

```ts
const response = await fetch("https://drops.sunkwi.com/api/twitch/rewards", {
  headers: {
    "X-API-Key": process.env.DROPS_API_KEY ?? "",
  },
});

if (response.status === 429) {
  const seconds = Number(response.headers.get("Retry-After"));

  throw new Error(`Rate limited, retry in ${seconds} s`);
}

if (!response.ok) {
  const error = (await response.json()) as TwitchDropsApiErrorType;

  throw new Error(`HTTP error: ${response.status} (${error.code})`);
}

const { campaigns, refreshedAt } =
  (await response.json()) as TwitchRewardsResponseType;

console.log(`Scan of ${refreshedAt}`);

for (const campaign of campaigns) {
  console.log(`${campaign.name}, until ${campaign.endsAt}`);
}
```

#### Poll for changes with the `ETag`

```ts
let etag: string | null = null;
let latest: TwitchDropsResponseType | null = null;

const refreshDrops = async (): Promise<TwitchDropsResponseType | null> => {
  const response = await fetch("https://drops.sunkwi.com/api/twitch/drops", {
    headers: {
      "X-API-Key": process.env.DROPS_API_KEY ?? "",
      ...(etag ? { "If-None-Match": etag } : {}),
    },
  });

  // Nothing changed since the last answer: free, keep your copy.
  if (response.status === 304) {
    return latest;
  }

  if (!response.ok) {
    const error = (await response.json()) as TwitchDropsApiErrorType;

    throw new Error(`HTTP error: ${response.status} (${error.code})`);
  }

  etag = response.headers.get("ETag");
  latest = (await response.json()) as TwitchDropsResponseType;

  return latest;
};
```

---

## 📦 JSON Snapshots in This Repository

[`drops.json`](drops.json) and [`rewards.json`](rewards.json) are snapshots of
`GET /api/twitch/drops` and `GET /api/twitch/rewards`, in the same format:
[`TwitchDropsResponseType`](#twitch-drops-response-type) and
[`TwitchRewardsResponseType`](#twitch-rewards-response-type). A GitHub Actions
workflow fetches them every 10 minutes and commits them when the list changes,
so:

- `refreshedAt` is the scan the snapshot comes from, not the latest scan;
- `rateLimit` is the workflow's own allowance: ignore it.

Read them from GitHub when a delay of a few minutes is fine:

```sh
curl https://raw.githubusercontent.com/SunkwiBOT/twitch-drops-api/main/drops.json
curl https://raw.githubusercontent.com/SunkwiBOT/twitch-drops-api/main/rewards.json
```

---

## 🗂️ API Response Types

<a id="twitch-drops-response-type"></a>

### `TwitchDropsResponseType`

```ts
/** Answer of `GET https://drops.sunkwi.com/api/twitch/drops`. */
type TwitchDropsResponseType = {
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
```

<a id="twitch-rewards-response-type"></a>

### `TwitchRewardsResponseType`

```ts
/** Answer of `GET https://drops.sunkwi.com/api/twitch/rewards`. */
type TwitchRewardsResponseType = {
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
```

<a id="twitch-drops-api-error-type"></a>

### `TwitchDropsApiErrorType`

```ts
enum TwitchDropsApiErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  /** Too many requests, and the key sent is unknown, revoked or disabled: the call counted as anonymous. */
  INVALID_API_KEY_RATE_LIMITED = "INVALID_API_KEY_RATE_LIMITED",
  NOT_FOUND = "NOT_FOUND",
  RATE_LIMITED = "RATE_LIMITED",
}

/** Body of every error answer. */
type TwitchDropsApiErrorType = {
  code: TwitchDropsApiErrorCode;
};
```
