# Deploy Discord Member Export on Railway

Deploy and Host Discord Member Export with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/discord-member-export)

## About

Discord Member Export is a high-performance Discord bot that exports guild member   
  lists to CSV, JSON, TXT, or XLSX formats. It supports advanced filtering by role,
  join date, account age, and permissions, with real-time progress tracking and export
   history powered by SQLite.                                                       
                                                
  ## About Hosting Discord Member Export       

  Hosting Discord Member Export requires a Node.js environment with persistent storage
   for the SQLite database that tracks export history and statistics. The bot connects
   to the Discord Gateway using a bot token with the Server Members Intent enabled,
  fetches member data with built-in rate limiting, and generates export files in your
  chosen format. Railway handles the Node.js runtime, build process, and environment
  variable management, so you can deploy the bot and configure your Discord
  credentials directly from the dashboard without managing any infrastructure.

  ## Common Use Cases

  - Exporting full member lists for server audits, moderation reviews, or community
  analytics
  - Generating filtered reports by role, join date, or account age for onboarding or
  engagement tracking
  - Backing up member data in structured formats (CSV, JSON, XLSX) for external tools
  or spreadsheets

  ## Dependencies for Discord Member Export Hosting

  - Node.js 18+
  - pnpm 10+

  ### Deployment Dependencies

  - [Discord Developer Portal](https://discord.com/developers/applications) — create a
   bot application and obtain your bot token and client ID
  - [Discord Server Members
  Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents) — must
  be enabled in the bot settings for member fetching to work

  ## Why Deploy Discord Member Export on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will
  host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying Discord Member Export on Railway, you are one step closer to supporting
   a complete full-stack application with minimal burden. Host your servers,
  databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discord-member-export | [josh-tf/discord-member-export](https://github.com/josh-tf/discord-member-export) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | info | Logging level (debug, info, warn, error) |
| `DISCORD_TOKEN` | (secret) | Bot token from the Discord Developer Portal |
| `DISCORD_GUILD_ID` | your_test_guild_id | Guild ID for development (enables guild-scoped command registration) |
| `DISCORD_CLIENT_ID` | your_client_id_here | Bot application client ID from the Discord Developer Portal |

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/discord-member-export)
