# Deploy hermes-all-in-one on Railway

Hermes Agent with WebUI and Control Plane

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-all-in-one)

## About

**hermes-all-in-one** packages [Hermes Agent](https://github.com/NousResearch/hermes-agent) and [Hermes WebUI](https://github.com/nesquena/hermes-webui) into one Docker image: a browser chat UI at `/`, an admin control plane at `/admin` for providers and channels (no terminal required), and optional gateway autostart so Telegram, Discord, Slack, and the WebUI share one Hermes identity, config, and data directory.

Hosting means running a single Railway service built from this repo’s `Dockerfile`. The build is multi-stage: it copies Hermes Agent and WebUI source from their official container images, installs Python dependencies with **uv**, then starts **`/app/start.sh`**, which launches the control plane. The public service exposes the control plane (including a reverse proxy to the internal WebUI). You should attach a **persistent volume mounted at `/data`** so `HERMES_HOME`, WebUI state, workspace, and credentials survive redeploys. Set strong passwords (`HERMES_ADMIN_PASSWORD`, `HERMES_WEBUI_PASSWORD`) and complete first-time setup at **`/admin`** (providers, optional channels) before relying on the chat UI at `/`. Health checks use **`GET /health`**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-all-in-one | [saenyakorn/hermes-all-in-one](https://github.com/saenyakorn/hermes-all-in-one) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_HOME` | /data/.hermes |
| `CONTROL_PLANE_HOST` | 0.0.0.0 |
| `HERMES_CONFIG_PATH` | /data/.hermes/config.yaml |
| `HERMES_WORKSPACE_DIR` | /data/workspace |
| `HERMES_ADMIN_PASSWORD` | (secret) |
| `HERMES_ADMIN_USERNAME` | (secret) |
| `HERMES_WEBUI_PASSWORD` | (secret) |
| `HERMES_WEBUI_AGENT_DIR` | /app/vendor/hermes-agent |
| `HERMES_WEBUI_STATE_DIR` | /data/webui |
| `HERMES_GATEWAY_AUTOSTART` | auto |
| `CONTROL_PLANE_INTERNAL_WEBUI_HOST` | 127.0.0.1 |
| `CONTROL_PLANE_INTERNAL_WEBUI_PORT` | 8788 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, JavaScript, HTML, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-all-in-one)
