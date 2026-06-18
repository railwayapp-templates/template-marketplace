# Deploy Executor (Self-Hosted) on Railway

Self-host Executor to connect any agent to everything.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/executor-self-hosted)

## About

Executor is a tool gateway for AI agents. It lets you connect agents to MCP, OpenAPI, GraphQL, and custom JavaScript tools from one shared workspace. This template runs the self-hosted Executor server on Railway with persistent storage, browser setup, and a public HTTPS domain.

Hosting Executor (Self-Hosted) on Railway gives you a straightforward way to run your own agent tool gateway without building the deployment from scratch. This template deploys the official self-hosted Docker image as a single Railway service, mounts persistent storage at `/data`, exposes the web UI through a public domain, and configures the base URL needed for browser login flows. It is a practical starting point for teams that want to manage agent tools, users, and integrations from their own infrastructure. Railway handles the container, networking, healthcheck, restarts, and volume persistence so you can focus on connecting tools to your agents.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Executor | `ghcr.io/rhyssullivan/executor-selfhost:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `EXECUTOR_WEB_BASE_URL` | Public URL users open for this Executor instance. Must match the Railway domain exactly so browser login cookies validate. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/executor-self-hosted)
