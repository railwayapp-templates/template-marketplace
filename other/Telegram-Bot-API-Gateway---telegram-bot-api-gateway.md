# Deploy Telegram Bot API Gateway on Railway

Self-hosted Telegram Bot API gateway, register bot tokens in a web admin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-api-gateway)

## About

**TG Bot Gate** is a lightweight Telegram Bot API gateway written in Rust. You register bot tokens in a built-in admin UI; the service proxies `/bot/` to Telegram only for registered bots, stores token hashes (not raw tokens) in SQLite, and rejects unknown tokens with `403`.

Deploying TG Bot Gate means running a single HTTP service that fronts the official Telegram Bot API (`api.telegram.org`). Your bots call your Railway URL instead of Telegram directly; the gateway checks the token against a registry, forwards allowed traffic, and can optionally log or persist audit data. The Docker image builds the React admin UI and the Rust binary in one container. Railway assigns `PORT` and HTTPS on your public domain; you set `ADMIN_PASSWORD` and persist `GATE_DB_PATH` so bot registrations and settings survive restarts. After deploy, open `/admin`, add tokens, and point webhooks or HTTP clients at `https://.up.railway.app/bot/sendMessage` (and other methods).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tgbot-gate | `ghcr.io/tailabs/tgbot-gate:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | The password for the web admin UI (/admin). The server checks it when you log in, and issues an HTTP-only session cookie backed by an internal random session token (that token is not an env var). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/telegram-bot-api-gateway)
