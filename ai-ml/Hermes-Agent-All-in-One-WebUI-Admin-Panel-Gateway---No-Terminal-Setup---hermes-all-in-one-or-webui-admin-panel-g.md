# Deploy Hermes Agent All-in-One | WebUI + Admin Panel + Gateway - No Terminal Setup on Railway

Unified agent across apps, browser setup, auto-ready, skill, and automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-all-in-one-or-webui-admin-panel-g)

## About

Browser-based setup at `/admin` — no terminal, no config files. One container, one shared agent identity across WebUI, Telegram, Discord, and Slack. Persistent memory, built-in skills, and cron automations ready on deploy. Powered by NousResearch's open-source Hermes Agent.

![Hermes Control Plane](https://sphinx-open.up.railway.app/t/controlpanel.png)

This template packages NousResearch's Hermes Agent, its WebUI, and a custom admin control plane into a single Railway service. Everything is configured from `/admin` in the browser — no SSH, no terminal, no manual config files. A persistent volume at `/data` stores all agent memory, skills, credentials, and conversation history across deploys. The WebUI at `/` and Telegram gateway share one agent identity: same memory, same skills, same personality across every surface. The gateway autostarts automatically once a provider and channel credential are configured.

![Hermes WebUI](https://sphinx-open.up.railway.app/t/Hermeswebui.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-all-in-one | [sphinxcode/hermes-all-in-one](https://github.com/sphinxcode/hermes-all-in-one) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HERMES_HOME` | /data/.hermes | - |
| `CONTROL_PLANE_HOST` | 0.0.0.0 | - |
| `HERMES_CONFIG_PATH` | /data/.hermes/config.yaml | - |
| `HERMES_WORKSPACE_DIR` | /data/workspace | - |
| `HERMES_ADMIN_PASSWORD` | (secret) | Password for /admin (falls back to WebUI password if unset) |
| `HERMES_ADMIN_USERNAME` | (secret) | - |
| `HERMES_WEBUI_PASSWORD` | (secret) | Password for the WebUI at / |
| `HERMES_WEBUI_AGENT_DIR` | /app/vendor/hermes-agent | - |
| `HERMES_WEBUI_STATE_DIR` | /data/webui | - |
| `HERMES_GATEWAY_AUTOSTART` | auto | auto = start when provider + channel ready; off = never autostart |
| `CONTROL_PLANE_INTERNAL_WEBUI_HOST` | 127.0.0.1 | - |
| `CONTROL_PLANE_INTERNAL_WEBUI_PORT` | 8788 | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Python, JavaScript, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-all-in-one-or-webui-admin-panel-g)
