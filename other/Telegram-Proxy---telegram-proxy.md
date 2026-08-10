# Deploy Telegram Proxy on Railway

Zero-config Telegram MTProto Proxy Server. Secure, fast, and reliable.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-proxy)

## About

Self-hosted Telegram MTProto Proxy that lets you run your own private, secure, and reliable proxy server. This template uses the official Telegram proxy image with persistent storage and Railway TCP Proxy support, so you can deploy in minutes without managing a VPS.

![Telegram Proxy](https://imgur.com/TsNXSjH.png)

Hosting a Telegram MTProto Proxy on Railway gives you a private proxy that speaks Telegram’s native protocol. The template runs the official `telegrammessenger/proxy` container with persistent volume support and Railway TCP Proxy, because MTProto requires raw TCP (not HTTP).

You only need to set a few environment variables (`SECRET`, optional `WORKERS` and `TAG`). After deployment, enable TCP Proxy on port 443, generate your proxy link, and start using it in Telegram. No web dashboard, no extra services — just a clean, lightweight proxy under your full control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | `telegrammessenger/proxy:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET` | (secret) |
| `WORKERS` | 8 |

## Configuration

- **Start command:** `bash -lc 'while true; do echo "$(date) - Server is active"; sleep 30; done & exec /run.sh'`
- **TCP Proxies:** 443
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/telegram-proxy)
