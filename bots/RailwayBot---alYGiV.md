# Deploy RailwayBot on Railway

A companion bot for railway users, including usage reports and crash alerts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alYGiV)

## About

RailwayBot is an open source companion bot for railway users, made for fulfilling the needs of knowing if you've got a memory leak, or one of your services has crashed, all from the comfort of discord. With this template, you'll only need to provide a few details, and everything else will be available to you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RailwayBot | [LaCrak27/RailwayBot/](https://github.com/LaCrak27/RailwayBot/) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TEAMID` | - | Team ID (only for teams, do not use on personal) |
| `LOGCHANNEL` | - | ID of the channel where deployments and crash logs will go |
| `DISCORDTOKEN` | (secret) | Your discord bot token |
| `USAGECHANNEL` | - | ID of the channel where the hourly usage reports will go. |
| `RAILWAYAPIKEY` | - | Railway API key linked to your personal account |

## Configuration

- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/alYGiV)
