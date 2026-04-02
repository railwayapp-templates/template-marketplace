# Deploy Sparkz Discord Analytics on Railway

Deploy and Host Sparkz Discord Analytics with Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sparkz-discord-analytics)

## About

Sparkz Analytics is a **Discord analytics** stack: a **silent bot**, **ClickHouse** for storage, and a **password-protected Next.js** dashboard. It tracks **metadata and events** (members, voice, reactions, channel activity)—**not message bodies**. This template provisions **AnalyticsDB** (ClickHouse) and **Sparkz-Discord-Analytics** together. You supply **Discord** credentials (`DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`), dashboard **`ADMIN_USERNAME`** / **`ADMIN_PASSWORD`**, and can use **`${{secret(...)}}`** for **`NEXTAUTH_SECRET`** so Railway generates the session signing secret. After deploy, open the public URL, sign in, and use the draggable dashboard tiles.

The app service runs **`start:railway`**: the compiled **discord.js** bot in the background and **Next.js** on **`PORT`** with **`0.0.0.0`**. **Nixpacks** builds from the monorepo root (`npm ci`, `npm run build` for both workspaces). **ClickHouse** is reached over the **private network** (typically HTTP on **8123**, **`CLICKHOUSE_SECURE=false`**). On first boot the bot can run DDL from **`clickhouse/migrations/001_init.sql`** against **`CLICKHOUSE_DATABASE`** (unless **`SKIP_SCHEMA_ENSURE=true`**). Health checks use **`/api/health`**. **Message Content Intent** stays off in Discord; the stack uses **`Guilds`**, **`GuildMessages`**, **`GuildVoiceStates`**, **`GuildMessageReactions`**, and optionally **Server Members** for larger servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnalyticsDB | `clickhouse/clickhouse-server:25.8` | Database |
| Sparkz-Discord-Analytics | [ClapFy/Sparkz-Discord-Analytics](https://github.com/ClapFy/Sparkz-Discord-Analytics) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AnalyticsDB | 8123 | - |
| `PUBLIC_PORT` | AnalyticsDB | 443 | - |
| `CLICKHOUSE_DB` | AnalyticsDB | railway | - |
| `CLICKHOUSE_USER` | AnalyticsDB | (secret) | - |
| `CLICKHOUSE_PASSWORD` | AnalyticsDB | (secret) | - |
| `ADMIN_PASSWORD` | Sparkz-Discord-Analytics | (secret) | - |
| `ADMIN_USERNAME` | Sparkz-Discord-Analytics | (secret) | - |
| `CLICKHOUSE_PORT` | Sparkz-Discord-Analytics | 8123 | - |
| `CLICKHOUSE_USER` | Sparkz-Discord-Analytics | (secret) | - |
| `NEXTAUTH_SECRET` | Sparkz-Discord-Analytics | (secret) | - |
| `DISCORD_GUILD_ID` | Sparkz-Discord-Analytics | - | Your Discord serverID. |
| `CLICKHOUSE_SECURE` | Sparkz-Discord-Analytics | false | - |
| `DISCORD_BOT_TOKEN` | Sparkz-Discord-Analytics | (secret) | Your Discord bot token. |
| `CLICKHOUSE_DATABASE` | Sparkz-Discord-Analytics | railway | - |
| `CLICKHOUSE_PASSWORD` | Sparkz-Discord-Analytics | (secret) | - |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/deploy/sparkz-discord-analytics)
