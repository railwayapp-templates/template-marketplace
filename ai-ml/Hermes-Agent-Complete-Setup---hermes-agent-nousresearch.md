# Deploy Hermes Agent Complete Setup 🤖 on Railway

OpenClaw alternative by Nous Research with dashboard and persistent memory.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-nousresearch)

## About

Hermes Agent is a self-improving AI agent from Nous Research that can persist knowledge, build skills from experience, and run as a long-lived gateway for chat platforms, APIs, and agent workflows. This template deploys Hermes Agent on Railway using the official Docker image with gateway mode, optional web dashboard, and persistent storage for configuration, API keys, sessions, memories, skills, logs, and runtime state.

![](https://i.imgur.com/KYvJ1gH.png)

Deploying Hermes Agent on Railway uses the official `nousresearch/hermes-agent` Docker image. The container should run Hermes in gateway mode using `gateway run`. When `HERMES_DASHBOARD=1` is enabled, the image entrypoint starts the Hermes dashboard as a background side-process before launching the gateway as the long-running foreground process. Railway handles deployments, networking, and public access, while Hermes stores persistent state in `/opt/data`. A Railway Volume should be mounted at `/opt/data` so configuration, API keys, sessions, memories, skills, cron jobs, hooks, logs, and customizations survive restarts and redeployments.

> **Note**
> The Hermes Agent Docker image is large and may take some time to pull during the first deployment.

> **Architecture Note**
> Hermes Agent stores its persistent runtime state in `/opt/data`. The dashboard should run inside the same container as the gateway by enabling `HERMES_DASHBOARD=1`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_SERVER_HOST` | 0.0.0.0 |
| `HERMES_DASHBOARD` | 1 |
| `API_SERVER_ENABLED` | true |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 |
| `HERMES_DASHBOARD_PORT` | 9119 |
| `API_SERVER_CORS_ORIGINS` | * |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint.sh gateway run`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-nousresearch)
