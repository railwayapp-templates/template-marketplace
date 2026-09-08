# Deploy Discord.py Bot on Railway

Python Discord bot with slash commands. Requires a Discord bot token.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discordpy-bot)

## About

A Python Discord gateway worker using discord.py 2.7.1, `/ping` and `/info`, locked dependencies, and separate HTTP readiness/liveness endpoints. No public homepage, database, or volume is needed.

The Dockerfile pins Python 3.12.14 and the uv build image by digest, installs frozen production dependencies from `uv.lock`, and runs as non-root UID/GID 10001. Keep one replica and sleeping disabled for the gateway connection.

### Required Discord setup

1. Create an application in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Set `DISCORD_TOKEN` to its **Bot token**. No dummy or generated default is provided.
3. Invite it with OAuth2 scopes `bot` and `applications.commands` and permissions to send command replies.
4. Deploy, wait for command synchronization and gateway readiness, then invoke `/ping` and `/info` in Discord.
5. For guild-scoped synchronization, set optional `DISCORD_GUILD_ID` to that guild's positive snowflake ID. Omit it for global synchronization, whose propagation is controlled by Discord.

**Real Discord authentication and chat replies require a valid user-supplied bot token.** No live provider E2E result is claimed. A process responding to HTTP alone is not a working bot.

### Variables and intents

- `DISCORD_TOKEN`: required secret, no default; never commit it.
- `PORT`: internal readiness listener, default `8080`; `HOST` defaults to `0.0.0.0` inside the container.
- `DISCORD_GUILD_ID`: optional command-sync scope.
- `MESSAGE_CONTENT_INTENT`, `MEMBERS_INTENT`, and `PRESENCES_INTENT`: default `false`. Enable only when needed and after matching opt-in in the Developer Portal. Slash commands do not require privileged intents.

Synchronization replaces the chosen scope's command tree. Use a dedicated application and review command removals before deployment. Rejected intents or synchronization failures prevent successful startup.

### Health and operation

`/health`, `/healthz`, and `/ready` return 200 only with synchronized commands and a connected, ready gateway; otherwise 503. `/live` reports process liveness independently. The root and unknown GET routes return 404; public Discord HTTP interactions are not implemented. Railway checks `/health` with a 60-second allowance and restarts on failure. This deployment check is not continuous dependency monitoring.

Missing/rejected credentials, invalid guild IDs, sync/intent/bind failures, startup timeout, and unexpected gateway termination fail closed. SIGTERM/SIGINT close gateway and HTTP resources. `/ping` reports latency and `/info` reports library/bot information ephemerally. Edit `bot.py` to extend the commands. Voice support is not included.

The worker has no durable data store. Local mock-provider tests cannot verify Discord permission setup, gateway connectivity, propagation, replies, or container permissions; validate those in your own deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | [leoisadev1/railway-template-discord-py-bot](https://github.com/leoisadev1/railway-template-discord-py-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal readiness/liveness HTTP port; no public domain is required. |
| `DISCORD_TOKEN` | (secret) | Required user-provided Discord Bot token. No generated or dummy default; invalid credentials fail readiness. |
| `MEMBERS_INTENT` | false | Enable only with matching Server Members opt-in in the Discord Developer Portal. |
| `DISCORD_GUILD_ID` | - | Optional positive guild snowflake for guild-scoped command sync. Omit for global registration. |
| `PRESENCES_INTENT` | false | Enable only with matching Presence opt-in in the Discord Developer Portal. |
| `MESSAGE_CONTENT_INTENT` | false | Enable only with matching Message Content opt-in in the Discord Developer Portal. |

## Configuration

- **Healthcheck:** `/health`

**Category:** Bots · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/discordpy-bot)
