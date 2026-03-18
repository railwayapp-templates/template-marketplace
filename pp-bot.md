# Deploy pp-bot on Railway

Listens for slack messages and keeps a leaderboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pp-bot)

## About

It's a dead simple ++/-- Slackbot that listens for when you @someone ++ or @something ++ or obviously --.

Clicking the button should work, if it doesn't, open an issue and tell me why, or offer a fix.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pp-bot | [stevencarpenter/pp-bot](https://github.com/stevencarpenter/pp-bot) | Worker |
| pp-gres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | pp-bot | production | - |
| `LOG_LEVEL` | pp-bot | INFO | - |
| `SLACK_APP_TOKEN` | pp-bot | (secret) | Retrieve this from the slack admin website when you create the pp application for slack. |
| `SLACK_BOT_TOKEN` | pp-bot | (secret) | Retrieve this from the slack admin website when you create the pp application for slack. |
| `SLACK_SIGNING_SECRET` | pp-bot | (secret) | Retrieve this from the slack admin website when you create the pp application for slack. |
| `POSTGRES_DB` | pp-gres | railway | Defaults to railway. Change if you want.  |
| `POSTGRES_USER` | pp-gres | (secret) | - |
| `POSTGRES_PASSWORD` | pp-gres | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/pp-bot)
