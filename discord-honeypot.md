# Deploy Discord Honeypot on Railway

An easily-deployable Discord bot that automatically bans spammers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/discord-honeypot)

## About

Discord Honeypot is a Discord bot that auto-creates a `#honeypot` channel, lets admins tag any text channel as a trap, and bans anyone who posts there while purging their last 24h of messages. Honeypot channel IDs are persisted in SQLite so the traps survive restarts and deployments.

Using this template on Railway sets up a Bun-powered bot with a persistent SQLite database mounted on a Railway volume. 
You provide the Discord bot token and the application ID. On boot the bot registers slash commands, auto-creates a honeypot channel if missing, enforces bans for posts inside honeypot channels, and keeps channel IDs in `HONEYPOT_DB_PATH` so data sticks across deploys. 

Railway handles build, secrets, and scaling; you just supply env vars and attach a volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| discord-honeypot | [omznc/discord-honeypot](https://github.com/omznc/discord-honeypot) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Your Discord bot token |
| `HONEYPOT_DB_PATH` | /data/honeypots.sqlite | Database path, keep it default unless you're changing the volume mount yourself. If unset, will default to / |

## Configuration

- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/discord-honeypot)
