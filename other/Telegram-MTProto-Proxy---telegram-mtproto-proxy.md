# Deploy Telegram MTProto Proxy on Railway

[Jul'26] Run your own private Telegram MTProto proxy in minutes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-mtproto-proxy)

## About

Run your own private Telegram MTProto proxy in minutes using Railway. This template uses the official `telegrammessenger/proxy` container with persistent storage and Railway TCP Proxy support.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `telegrammessenger/proxy:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET` | (secret) |
| `WORKERS` | 4 |

## Configuration

- **TCP Proxies:** 443
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/telegram-mtproto-proxy)
