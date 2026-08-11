# Deploy Red Discord Bot — Reliable Community Template on Railway

Pinned Red 3.5.24 with supervised readiness and persistent bot data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/red-discord-bot-reliable-community-templ)

## About

Red is a modular, self-hosted Discord bot. This independent community template pins Red-DiscordBot 3.5.24 and does not claim endorsement by Cog Creators or Discord.

The template performs non-interactive setup, supervises the bot process, exposes a readiness endpoint, and persists Red's JSON data at /data. A Discord bot token is intentionally requested from each deployer and is never stored in the source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redbot | [hryhory-sinenka/railway-reliability-templates](https://github.com/hryhory-sinenka/railway-reliability-templates) (root: /redbot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Required Discord bot token from the Discord developer portal. |
| `DISCORD_PREFIX` | ! | Command prefix used by the bot. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/red-discord-bot-reliable-community-templ)
