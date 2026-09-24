# Deploy DeepSeek Harness + Web UI on Railway

Secure, persistent DeepSeek Harness Web UI with protected browser access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepseek-harness-w-1)

## About

![DeepSeek Harness Web UI on Railway](https://raw.githubusercontent.com/Timboslice212/deepseek-harness-railway/95fe6157a5ba64bd687f50c044e9874f1d2e1154/assets/deepseek-harness-hero.png)

Launch a protected, persistent DeepSeek Harness agent workspace in one Railway deployment. Use the full browser UI, keep sessions and workspace files across restarts, and connect DeepSeek or another supported model provider when you are ready—without provisioning a database, Redis, or a second service.

DeepSeek Harness is an open-source AI agent harness with a browser UI, workspaces, plugins, agent presets, and support for multiple model providers. This template runs the official developer-preview package behind a small, auditable Railway gateway that adds protected browser access, dynamic-port support, health checks, and persistent storage.

> **Developer preview:** DeepSeek Harness 0.1 can introduce compatibility-breaking changes. This template pins the tested upstream release and does not claim to be an official DeepSeek deployment.

The template deploys one GitHub-backed service and one persistent Railway volume mounted at `/data`. During deployment, you choose a Web UI username and password. Model-provider credentials are intentionally not requested by the Railway template: after signing in, you can configure DeepSeek, OpenAI, Anthropic, OpenRouter, Google, Groq, Moonshot/Kimi, another catalog provider, or a custom compatible API from **Settings → Models**. You may also choose **Configure later**.

The service listens on Railway's dynamic `PORT`, exposes `/healthz`, restarts on failure, and stores Harness configuration under `/data/.dsh` plus workspaces under `/data/workspace`. No database, Redis instance, worker, or object-storage service is added.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deepseek-harness-web-ui | [Timboslice212/deepseek-harness-railway](https://github.com/Timboslice212/deepseek-harness-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DSH_HOME` | /data/.dsh | Persistent DeepSeek Harness configuration and user settings directory. |
| `WORKSPACE_DIR` | /data/workspace | Persistent workspace directory for sessions and agent-created files. |
| `DSH_TELEMETRY_DISABLED` | true | Disables DeepSeek Harness telemetry for this deployment. |
| `HARNESS_ACCESS_PASSWORD` | (secret) | Choose the Web UI login password (12-256 characters; 16+ recommended). Stored as a Railway secret. |
| `HARNESS_ACCESS_USERNAME` | (secret) | Choose the Web UI login username (3-64 letters, numbers, dots, underscores, or hyphens). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/deepseek-harness-w-1)
