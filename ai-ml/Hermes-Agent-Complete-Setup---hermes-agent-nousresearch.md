# Deploy Hermes Agent Complete Setup 🤖 on Railway

[Jun'26] OpenClaw alternative by Nous Research with dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-nousresearch)

## About

Hermes Agent is a self-hosted AI agent system by Nous Research designed for autonomous workflows, agent experimentation, persistent memory, scheduled tasks, and AI-powered automation. This template deploys Hermes Agent on Railway using the official Nous Research Docker image, giving you a fast way to run Hermes Agent without manually managing server infrastructure.

![](http://raw.githubusercontent.com/codestorm-official/hermes-agent/main/img/hermes-banner.png)

Hosting Hermes Agent on Railway provides a simple deployment path for running a self-hosted AI agent environment in the cloud. This template uses the official Nous Research Docker image and includes persistent storage so your agent configuration, memory, sessions, logs, and runtime data can remain available across redeployments.

Before deploying this template, you only need to provide a dashboard **username** and **password**. After deployment, open the generated Railway URL and access the Hermes Agent interface directly from your browser.

From the dashboard, you can configure AI providers, manage agent settings, monitor activity, and control the gateway status.

If the gateway status appears **off** when you first open the dashboard, click **Restart Gateway** in the bottom-left corner of the interface. After restarting, the gateway status should change to running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9119 |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `HERMES_GID` | 10000 |
| `HERMES_UID` | 10000 |
| `API_SERVER_HOST` | 0.0.0.0 |
| `API_SERVER_PORT` | 8642 |
| `HERMES_DASHBOARD` | 1 |
| `API_SERVER_ENABLED` | true |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 |
| `HERMES_DASHBOARD_PORT` | 9119 |
| `GATEWAY_ALLOW_ALL_USERS` | true |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -lc '/opt/hermes/bin/hermes dashboard --host 0.0.0.0 --port ${PORT:-9119} --no-open & exec /opt/hermes/bin/hermes gateway'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-nousresearch)
