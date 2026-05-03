# Deploy railway-bot on Railway

Deploy and Host railway bot with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wide-wild)

## About

RailwayBot is a Discord bot for Railway deploy alerts, incident threads, and daily summaries in Discord.

RailwayBot runs as a Node.js service with a webhook endpoint for Railway events. Deploying it on Railway is simple: connect the repo, add the required environment variables, and configure your Railway webhook URL. Once deployed, it can post alerts, track incidents, and share usage updates with your team.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-bot | [moonLight-7k/railway-bot](https://github.com/moonLight-7k/railway-bot) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `DB_PATH` | ./data/railwaybot.db |
| `CPU_COST` | 0.000463 |
| `MEM_COST` | 0.000231 |
| `USAGE_CRON` | 0 9 * * * |
| `DIGEST_HOUR` | 9 |
| `EGRESS_COST` | 0.1 |
| `DISCORD_TOKEN` | (secret) |
| `WEBHOOK_SECRET` | (secret) |

**Category:** Bots · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/wide-wild)
