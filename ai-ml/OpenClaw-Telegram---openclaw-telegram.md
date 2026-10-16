# Deploy OpenClaw Telegram on Railway

Self-hosted OpenClaw with Telegram bot channel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-telegram)

## About

OpenClaw Telegram runs the official openclaw/openclaw:2026.10.3-browser Gateway on Railway with Telegram as the first channel. Same unmodified, digest-pinned container, Chromium plus Xvfb, /data volume, and zero deploy-time config. BotFather token, pairing approve, and groups are the operator path.

This template deploys one service on port 18789 with health /healthz and volume /data (state under /data/.openclaw, workspace under /data). The start command chowns the volume, applies OPENCLAW_RAILWAY_CONFIG (gateway.mode local, publicOrigin and controlUi.allowedOrigins from RAILWAY_PUBLIC_DOMAIN, trustedProxies 100.64.0.0/10), then runs `openclaw gateway --bind lan --port 18789 --allow-unconfigured` as the node user.

Generated secret: OPENCLAW_GATEWAY_TOKEN (48 chars). Fixed: PORT and OPENCLAW_GATEWAY_PORT=18789, OPENCLAW_GATEWAY_BIND=lan, OPENCLAW_STATE_DIR, OPENCLAW_CONFIG_DIR, OPENCLAW_CONFIG_PATH, OPENCLAW_WORKSPACE_DIR, HOME, OPENCLAW_HOME, TZ, RAILWAY_RUN_UID. Optional empty: OPENAI_API_KEY, ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN. Telegram is a bundled plugin; set the BotFather token in env or Control UI, then approve unknown DMs with `openclaw pairing approve telegram PAIRING-CODE`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | `openclaw/openclaw:2026.10.3-browser@sha256:c84c4c37e7b9dc02dd869c9699ba0c4fb20ff821febe4b789bb2f8f4bfd9c8a3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for logs and scheduled tasks. |
| `HOME` | /home/node | Home directory for the node user, on the volume. |
| `PORT` | 18789 | HTTP port Railway routes to (18789). |
| `OPENCLAW_HOME` | /home/node | OpenClaw home directory on the volume. |
| `OPENAI_API_KEY` | (secret) | Optional OpenAI key for models. |
| `ANTHROPIC_API_KEY` | (secret) | Optional Anthropic key for Claude models. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Gateway state directory on the /data volume. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional Telegram bot token from BotFather. |
| `OPENCLAW_CONFIG_DIR` | /data/.openclaw | Config directory on the /data volume. |
| `OPENCLAW_CONFIG_PATH` | /data/.openclaw/openclaw.json | Path to the OpenClaw config file. |
| `OPENCLAW_GATEWAY_BIND` | lan | Gateway bind mode; lan so Railway can reach it. |
| `OPENCLAW_GATEWAY_PORT` | 18789 | Gateway listen port; keep equal to PORT. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Gateway auth token for the Control UI, generated per deploy. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Agent workspace directory on the /data volume. |
| `OPENCLAW_RAILWAY_CONFIG` | - | Start-time config: public origin, allowed origins, proxies. |

## Configuration

- **Start command:** `/bin/sh -c "set -ef; D=${RAILWAY_VOLUME_MOUNT_PATH:-/data}; mkdir -p $D/.openclaw $D/workspace $D/.config/openclaw; if [ ! -L /home/node/.config/openclaw ]; then rm -rf /home/node/.config/openclaw; ln -s $D/.config/openclaw /home/node/.config/openclaw; fi; find $D ! -user 1000 -exec chown -h 1000:1000 {} +; chmod 700 $D/.openclaw; cd /app; if [ ${#OPENCLAW_RAILWAY_CONFIG} -gt 0 ]; then setpriv --reuid=1000 --regid=1000 --init-groups env HOME=/home/node USER=node node openclaw.mjs config set --batch-json $OPENCLAW_RAILWAY_CONFIG || echo railway-start: config batch failed; fi; exec setpriv --reuid=1000 --regid=1000 --init-groups env HOME=/home/node USER=node tini -s -- node /app/docker-entrypoint.mjs node openclaw.mjs gateway --bind lan --port 18789 --allow-unconfigured"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openclaw-telegram)
