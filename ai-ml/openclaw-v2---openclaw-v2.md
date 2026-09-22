# Deploy openclaw-v2 on Railway

Self-host OpenClaw 2.0 Gateway and Control UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-v2)

## About

Deploy this repository as **OpenClaw 2.0** on Railway — the personal AI assistant that connects to WhatsApp, Telegram, Slack, Discord, and 20+ channels. OpenClaw 2.0 is the `v2026.8.1+` release line (guided setup, rebuilt Control UI, one trust boundary per gateway). This template pins the official Docker image so you stay on a current 2.0 build.

This template runs the official [`openclaw/openclaw`](https://hub.docker.com/r/openclaw/openclaw) image (default tag **`2026.9.5`**) with Railway-ready defaults: gateway on port **8080**, state under `/data/.openclaw`, workspace under `/data/workspace`, and auth via `OPENCLAW_GATEWAY_TOKEN`.

After deploy, open `https:///` and paste the gateway token to access the Control UI. Configure your LLM provider and messaging channels from the browser — no SSH required for day-to-day use.

**Security:** the Gateway is exposed publicly. Read the [OpenClaw security docs](https://docs.openclaw.ai/gateway/security) and treat `OPENCLAW_GATEWAY_TOKEN` as an admin secret.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-2 | [feliperosenek/openclaw-2-railway](https://github.com/feliperosenek/openclaw-2-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Persistent state directory on the volume (config, sessions, auth stores). |
| `OPENCLAW_CONFIG_DIR` | /data/.openclaw | Directory for OpenClaw config files. Usually the same as OPENCLAW_STATE_DIR. |
| `OPENCLAW_CONFIG_PATH` | /data/.openclaw/openclaw.json | Full path to openclaw.json. |
| `OPENCLAW_GATEWAY_BIND` | lan | Gateway bind mode. Use lan so Railway's HTTP proxy can reach the service. |
| `OPENCLAW_GATEWAY_PORT` | 8080 | Port the Gateway listens on. Must match the public HTTP domain / proxy (8080). |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Shared secret for Gateway and Control UI auth. Railway generates a strong token on deploy. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Workspace directory for agent files. Keep /data/workspace on the Railway volume. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-v2)
