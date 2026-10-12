# Deploy OpenClaw | (Just Updated) Personal AI Agent Gateway, Token Set, Data Survives Redeploys on Railway

Personal AI agent gateway. Token preset, proxy-ready, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-or-just-updated-personal-ai-age)

## About

OpenClaw is an open-source personal AI agent gateway: one always-on server that connects your chat apps, models and tools, with a web Control UI to manage it. This template runs the official OpenClaw image with a gateway token already generated, so the Control UI is reachable and authenticated the moment the deploy finishes.

This template deploys the official `ghcr.io/openclaw/openclaw` image, pinned by digest, as a single service with a volume at `/data`. OpenClaw's state directory (`/data/.openclaw`) lives on that volume, so configuration, sessions and credentials survive redeploys. On first boot the start command seeds the gateway config it needs to work behind Railway's proxy (trusted proxy range and the allowed Control UI origin) and then starts the gateway on Railway's injected port. Without that seed the gateway answers 403 `proxy_attribution_required` to every request. The `OPENCLAW_GATEWAY_TOKEN` variable is generated per deploy; use it to sign in to the Control UI and to call the gateway API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | `ghcr.io/openclaw/openclaw:2026.10.1@sha256:9001e8a880d6ca028b590932b83b9335a26225e86c2a8a7aa9af7c59d6842953` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export HOME=/data OPENCLAW_STATE_DIR=/data/.openclaw OPENCLAW_DISABLE_BONJOUR=1 NODE_OPTIONS=--max-old-space-size=1536; mkdir -p "$OPENCLAW_STATE_DIR"; if [ ! -f "$OPENCLAW_STATE_DIR/openclaw.json" ]; then (cd /app; node openclaw.mjs config set gateway.trustedProxies "[\"100.64.0.0/10\"]" --strict-json; node openclaw.mjs config set gateway.controlUi.allowedOrigins "[\"https://$RAILWAY_PUBLIC_DOMAIN\"]" --strict-json) || echo "[railway] config seed failed"; fi; echo "[railway] uid=$(id -u) owner=$(stat -c %u:%g /data) writable=$(test -w /data && echo yes || echo NO) port=${PORT:-8080}"; exec tini -s -- node /app/docker-entrypoint.mjs node openclaw.mjs gateway --allow-unconfigured --bind lan --port ${PORT:-8080}'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openclaw-or-just-updated-personal-ai-age)
