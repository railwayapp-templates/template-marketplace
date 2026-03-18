# Deploy Discord-RPC-Selfbot on Railway

A Discord Selfbot for Custom Rich Presence

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jsZQh-)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jsZQh-?referralCode=DY_B7C)

A Discord Selfbot for Custom Rich Presence

> [!WARNING]  
> **I don't take any responsibility for blocked Discord accounts that used this module.**

> [!CAUTION]  
> **Using this on a user account is prohibited by the [Discord TOS](https://discord.com/terms) and can lead to the account block.**
---

1. Fill out your [`config.json`](https://github.com/thecats1105/discord-rpc-selfbot/blob/main/config.json)

```json
{
  "$schema": "https://raw.githubusercontent.com/thecats1105/discord-rpc-selfbot/refs/heads/main/config.schema.json",
  "APPLICATION_ID": "",
  "type": "",
  "name": "",
  "details": "",
  "state": "",
  "streamURL": "",
  "party": {
    "size": {
      "current": null,
      "max": null
    }
  },
  "setLocalTime": null,
  "timezone": "",
  "startTimeStamp": null,
  "endTimeStamp": null,
  "assets": {
    "large_image": "",
    "large_text": "",
    "small_image": "",
    "small_text": ""
  },
  "buttons": [
    {
      "label": "",
      "url": ""
    },
    {
      "label": "",
      "url": ""
    }
  ],
  "refreshInterval": null
}
```

2. Upload your `config.json` to Github Gist or any webservers

3. Setup your Environment

```env
CONFIG_URL=""
TOKEN=""
```
---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discord-rpc-selfbot | [thecats1105/discord-rpc-selfbot](https://github.com/thecats1105/discord-rpc-selfbot) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TOKEN` | (secret) |

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/jsZQh-)
