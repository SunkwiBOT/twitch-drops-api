# Public Twitch Drops API 🎮

This API provides a list of available Twitch campaigns and rewards with detailed information.

> **Note**: This API is used in [Twitch Alerts 🔔](https://discord.com/application-directory/1041679706988228639), a free Discord bot that allows users to receive notifications when:  
> - A Twitch streamer goes live.  
> - Twitch drops become available for a specific game or all games.

You can invite the bot to your Discord server using the following links:  
- [Discord.com](https://discord.com/application-directory/1041679706988228639)  
- [Top.gg](https://top.gg/bot/1041679706988228639)

---

## 🌐 API URL

**Endpoint**:  
```
https://drops-api.sunkwi.com/drops
```

---

## 📋 Request Examples

### Example with `axios`
```ts
import axios from 'axios';

(async () => {
  try {
    const response = await axios<TwitchDropCampaignType[]>('https://drops-api.sunkwi.com/drops', {
      method: 'GET',
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
```

### Example with `fetch`
```ts
(async () => {
  try {
    const response = await fetch('https://drops-api.sunkwi.com/drops', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: TwitchDropCampaignType[] = await response.json();

    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
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
  rewards: TwitchDropRewardType[];
  startAt: string;
};
```

### `TwitchDropRewardType`
```ts
type TwitchDropRewardType = {
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
};
```
