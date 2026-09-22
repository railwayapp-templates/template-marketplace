# Deploy DLC-E on Railway

Remove trackers from links posted in Discord

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dlc-e)

## About

Not much to say here!

#Variables

- Variable Discord-Link-Cleaner-Easy.DISCORD_BOT_TOKEN — Your Discord bot’s private authentication token from the Discord Developer Portal. Treat this like a password and do not share it publicly.
- Variable Discord-Link-Cleaner-Easy.DATA_DIR — Folder where DLC-E stores its settings and tracker configuration. Leave this set to /data when using the included Railway volume.

Not much to say here!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord-Link-Cleaner-Easy | [DanRotigel/Discord-Link-Cleaner-Easy](https://github.com/DanRotigel/Discord-Link-Cleaner-Easy) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | Folder where DLC-E stores its settings and tracker configuration. Leave this set to /data when using the included Railway volume. |
| `DISCORD_BOT_TOKEN` | (secret) | Paste your Discord bot token from the Discord Developer Portal. Treat this like a password and do not share it publicly. |

## Configuration

- **Start command:** `python main.py`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/deploy/dlc-e)
