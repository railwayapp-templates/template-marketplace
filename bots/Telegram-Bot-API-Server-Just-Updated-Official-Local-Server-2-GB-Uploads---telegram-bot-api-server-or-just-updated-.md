# Deploy Telegram Bot API Server | (Just Updated) Official Local Server, 2 GB Uploads on Railway

Official local Bot API server: 2 GB uploads, unlimited downloads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-api-server-or-just-updated-)

## About

The official `telegram-bot-api` server, self-hosted. Running your own local Bot API
server removes the limits the public `api.telegram.org` endpoint imposes on every
bot: downloads go from 20 MB to **unlimited**, uploads from 50 MB to **2 GB**, webhooks
can point at any local IP address, and files are served straight off this server's own
disk instead of being re-downloaded from Telegram.

This template runs the official server (`aiogram/telegram-bot-api`) with `--local`
enabled, the working directory on a persistent volume, and the HTTP port wired to
Railway's injected `$PORT` so the public URL works with no extra configuration.

The server is a long-running C++ process that keeps every bot's session in RAM and
writes downloaded and uploaded media to disk. That makes it a poor fit for anything
ephemeral: without a volume, every file a bot has downloaded disappears on redeploy,
and the working directory has to survive restarts for local-mode file paths to remain
valid. This template mounts `/var/lib/telegram-bot-api` as a volume for exactly that
reason.

`TELEGRAM_LOCAL` is enabled by default here. Local mode is what unlocks the large
upload limit and local file paths; the upstream image leaves it off, so a stock deploy
looks like it is working while still behaving like the public endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-bot-api | `ghcr.io/bon5co/telegram-bot-api-railway:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/telegram-bot-api-server-or-just-updated-)
