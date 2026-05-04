# Deploy space-agent on Railway

The agent that re-shapes the Space

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/space-agent)

## About

This guide provides instructions on how to deploy and host **space-agent** on [Railway](https://railway.app/). Space-agent is a browser-first AI agent runtime designed to reshape interfaces and build tools directly within your workspace.

[![Space Agent banner](https://raw.githubusercontent.com/TeckniX/space-agent/refs/heads/main/.github/readme-banner-thin.webp)](https://space-agent.ai)

Railway provides a singular platform to host your infrastructure stack. By hosting Space-Agent on Railway, you leverage a persistent environment where the Node.js backend serves as thin infrastructure for:
- Outbound fetch proxying to bypass CORS limits.
- Managing server-owned APIs and infrastructure contracts.
- Persistent admin modes and Git-backed history for "time travel" rollbacks.

### Why Deploy Space-Agent on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Space-Agent on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| space-agent | [TeckniX/space-agent](https://github.com/TeckniX/space-agent) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CUSTOMWARE_PATH` | /data/customware | The path where all agent data is saved |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/customware`

**Category:** AI/ML · **Languages:** JavaScript, HTML, CSS, NSIS

[View on Railway →](https://railway.com/deploy/space-agent)
