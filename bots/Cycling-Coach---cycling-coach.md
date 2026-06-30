# Deploy Cycling Coach on Railway

BYOK single-tenant Telegram cycling coach with persistent /data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cycling-coach)

## About

Cycling Coach is an open-source, bring-your-own-key Telegram cycling coach for cyclists. It syncs with intervals.icu, reads your training data, and uses your chosen LLM provider to answer training questions, inspect recent load, and help plan workouts.

This Railway template deploys your own private Cycling Coach bot from `ghcr.io/yerzhansa/cycling-coach:stable`. Railway keeps it running 24/7, so your computer does not need to stay on. Telegram updates are received by outbound long polling, so no public HTTP endpoint is required. Railway mounts persistent state at `/data`, and image auto-updates are enabled.

Railway hosts the container and volume in your Railway account. The bot reads your Railway variables, then talks directly to Telegram, intervals.icu, and your selected LLM provider. The project maintainer does not run a shared backend and does not receive your API keys, athlete data, Telegram messages, or volume contents. Your hosting and billing relationship is with Railway. Railway currently lists Hobby as the practical minimum for always-on apps: $5 minimum usage/month, including $5 monthly usage credits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cycling-coach | `ghcr.io/yerzhansa/cycling-coach:stable` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LLM_API_KEY` | (secret) |
| `INTERVALS_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/cycling-coach)
