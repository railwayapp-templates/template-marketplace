# Deploy openclaw with native onboard on Railway

openclaw for Railway with a minimal reverse proxy wrapper.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-with-native-onboard)

## About

OpenClaw is a personal AI assistant with a web-based Control UI and gateway. The "native onboard" variant deploys it on Railway inside a Docker container with a lightweight Express reverse proxy, and lets you initialize the gateway yourself via Railway SSH — giving you full control over configuration.

Hosting OpenClaw with native onboard on Railway involves deploying a Docker container that wraps the OpenClaw gateway with a minimal Express reverse proxy. All routes are protected with HTTP Basic Auth via a `PASSWORD` environment variable. After the first deploy, you SSH into the container to run `openclaw onboard` once — configuring the workspace, gateway port, auth token, and allowed origins. On every subsequent restart, the wrapper automatically detects the existing config and starts the gateway, proxying all traffic (including WebSockets) to it. A Railway Volume at `/data` provides persistent storage for config, credentials, and AI memory across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [LaceLetho/openclaw-railway-template](https://github.com/LaceLetho/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | HTTP Basic Auth — protects the entire service |
| `BRAVE_API_KEY` | (secret) | Web search |
| `OPENCLAW_GIT_REF` | v2026.3.2 | tag/branch |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | State directory (set by default in railway.toml) |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Gateway auth token (keep secret, stays stable) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Workspace directory (set by default in railway.toml) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-with-native-onboard)
