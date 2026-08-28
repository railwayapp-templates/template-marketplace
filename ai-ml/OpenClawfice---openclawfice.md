# Deploy OpenClawfice on Railway

Turn your OpenClaw agents into pixel-art NPCs and watch them work live.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclawfice)

## About

OpenClawfice turns your AI agents into pixel-art NPCs inside a virtual office where you can watch them work, move, collaborate, and complete tasks in real time. It provides a more visual and playful way to observe OpenClaw agent activity compared with traditional logs and dashboards.

Hosting OpenClawfice on Railway gives you a self-hosted visual office for AI agents that can be accessed directly from your browser.

This template deploys the OpenClawfice web application as a standalone service. OpenClawfice is designed primarily to discover an existing OpenClaw installation from the local filesystem, while also providing a demo mode that can be used without an OpenClaw installation.

The current upstream project does not require PostgreSQL, Redis, object storage, or another external database service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclawfice | [openclawfice/openclawfice](https://github.com/openclawfice/openclawfice) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind OpenClawfice to all container interfaces |
| `PORT` | 3333 | Public HTTP port used by OpenClawfice |

## Configuration

- **Start command:** `npm run dev`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Shell, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/openclawfice)
