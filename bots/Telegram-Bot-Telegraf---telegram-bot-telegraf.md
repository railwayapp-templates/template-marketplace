# Deploy Telegram Bot (Telegraf) on Railway

Telegram bot starter with webhooks and Redis sessions. Bot token required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-bot-telegraf)

## About

A Node.js Telegram webhook worker with Telegraf 4.16.3, authenticated webhook requests, and Redis-backed sessions. Included commands are `/start`, `/help`, `/ping`, `/status`, and text echo. It does not use long polling.

The stack contains one non-root Node 24 bot and private authenticated Redis 8.2. Railway terminates public HTTPS and forwards HTTP to the bot on port 3000; Redis uses private port 6379 with a `/data` volume and no public TCP proxy. Keep a single bot worker with sleeping disabled.

### Deploy and connect Telegram

1. Create a bot using [BotFather](https://t.me/BotFather) and set required `BOT_TOKEN` privately in Railway. There is no generated or dummy token default.
2. Deploy the bot and Redis. Confirm Redis can write its mounted `/data` directory and start append-only persistence.
3. Keep the generated `WEBHOOK_SECRET` and the private `REDIS_URL` reference. Enable the bot's public HTTPS domain and keep its target port aligned with `PORT=3000`.
4. Startup authenticates with `getMe`, registers the webhook, and checks the reported webhook URL. Wait for `/health`, then send `/start` and `/ping` in a real Telegram chat.
5. Verify actual delivery and replies; a matching `getWebhookInfo` URL alone does not prove that Telegram can reach the service.

**A real BotFather token is required for authentication and delivery.** No live Telegram E2E or real Redis crash-persistence result is claimed. Missing/rejected tokens must fail readiness rather than leave a healthy HTTP-only process.

### Variables and webhook protection

- `BOT_TOKEN`: required user secret.
- `WEBHOOK_SECRET`: generated 32-character alphanumeric secret; Telegram must send it in `X-Telegram-Bot-Api-Secret-Token` on every request.
- `REDIS_URL=${{Redis.REDIS_URL}}`: private authoritative session backend. Optional `REDIS_PRIVATE_URL` takes precedence if set.
- `RAILWAY_PUBLIC_DOMAIN`: provided by the bot's Railway domain. `WEBHOOK_DOMAIN` is a fallback HTTPS host only when that Railway variable is absent.
- `WEBHOOK_PATH`: `/webhook`; `PORT`: `3000`; `HOST`: `0.0.0.0` in the container.
- Redis uses `REDISUSER=default`, `REDISPORT=6379`, and a generated password. Do not expose its credentials or proxy publicly.

`/health`, `/healthz`, `/ready`, and `/` require authenticated provider identity, registered/matching webhook state, and working Redis read/write access. `/live` is independent liveness. Railway uses `/health` with a 60-second startup allowance. Provider state refresh is cached for up to 30 seconds during health/webhook requests; it is not instantaneous token-revocation detection.

Wrong/missing webhook secrets are rejected before handlers. Malformed requests are rejected; handler or persistence failures return 503 so Telegram may retry. Shutdown drains work without deleting the replacement deployment's webhook.

### Sessions and persistence limits

Redis uses AOF with `appendfsync everysec`, snapshots, and `noeviction`. Verify volume permissions and session readback across bot and Redis restarts before relying on it. Every-second fsync can lose recent writes on a crash; a volume is not a backup. A configured Redis outage fails readiness and never silently switches to memory.

Updates are serialized per user/chat within one worker. Sessions retain the last 100 successful update IDs for bounded retry suppression. This is not exactly-once delivery: old IDs can repeat, replicas do not share the application lock, and a sent reply followed by a failed Redis commit can be repeated. Do not add replicas without distributed coordination. Deliberately omitting both Redis URLs enables non-durable development memory mode only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | [leoisadev1/railway-template-telegram-js-bot](https://github.com/leoisadev1/railway-template-telegram-js-bot) | Web service |
| Redis | `redis:8.2@sha256:7d1e4ce8b9395088377ab382d1f6cfdbd13b3690795198a0399ab8d683064d6d` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bot | 3000 | HTTP port matching the public service domain target. Railway supplies RAILWAY_PUBLIC_DOMAIN. |
| `BOT_TOKEN` | bot | (secret) | Required user-provided BotFather token. No dummy or generated default; rejected credentials fail startup. |
| `REDIS_URL` | bot | - | Authoritative private Redis session backend. Configured outages fail readiness; no memory fallback. |
| `WEBHOOK_PATH` | bot | /webhook | Authenticated Telegram webhook route; health/liveness paths are reserved. |
| `WEBHOOK_SECRET` | bot | (secret) | Generated webhook authentication secret; required on every incoming webhook request. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'chown redis:redis "$RAILWAY_VOLUME_MOUNT_PATH" && chmod 700 "$RAILWAY_VOLUME_MOUNT_PATH" && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --appendfsync everysec --save 60 1 --dir "$RAILWAY_VOLUME_MOUNT_PATH" --port "$REDISPORT" --maxmemory-policy noeviction'`
- **Volume:** `/data`

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/telegram-bot-telegraf)
