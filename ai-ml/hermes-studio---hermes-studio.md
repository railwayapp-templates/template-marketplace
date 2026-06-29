# Deploy hermes-studio on Railway

Self-hosted Hermes Agent dashboard with persistent state

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-studio)

## About

Hermes Studio runs on Railway as a single Docker-image service using the upstream Hermes Web UI container. Railway provides HTTPS ingress, environment variables, automatic restarts, and an attached volume for local Hermes and Web UI state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ekkoye8888/hermes-web-ui:v0.6.21` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PATH` | /opt/hermes/.venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin |
| `PORT` | 6060 |
| `PROFILE` | default |
| `BIND_HOST` | 0.0.0.0 |
| `LOG_LEVEL` | info |
| `AUTH_TOKEN` | (secret) |
| `HERMES_BIN` | /opt/hermes/.venv/bin/hermes |
| `UPLOAD_DIR` | /home/agent/.hermes/hermes-web-ui/upload |
| `HERMES_HOME` | /home/agent/.hermes |
| `AUTH_JWT_SECRET` | (secret) |
| `HERMES_WEB_UI_HOME` | /home/agent/.hermes/hermes-web-ui |
| `HERMES_WEBUI_STATE_DIR` | /home/agent/.hermes/hermes-web-ui |
| `HERMES_ALLOW_ROOT_GATEWAY` | 1 |
| `HERMES_WEB_UI_MANAGED_GATEWAY` | 1 |
| `HERMES_WEB_UI_XAI_CALLBACK_BIND_HOST` | 0.0.0.0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/agent/.hermes`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-studio)
