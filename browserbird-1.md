# Deploy BrowserBird on Railway

AI agent for Slack with a browser, scheduler, and web dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/browserbird-1)

## About

BrowserBird is a self-hosted AI agent orchestrator for Slack with a real Chromium browser, a cron scheduler, and a web dashboard. Talk to an AI agent in Slack threads. It can browse the web using Playwright MCP with a real Chromium browser you can watch live through a built-in VNC viewer, run scheduled tasks, and keep persistent sessions across conversations. The agent CLI handles reasoning and tools; BrowserBird is the orchestration layer.

BrowserBird runs as two services: an **app service** (Node.js API, Slack connection, web dashboard) and a **VM service** (Chromium browser, Wayland compositor, VNC). The app service is the one you interact with; open its URL to access the web dashboard. The VM service has no web UI of its own. The app service needs a persistent volume at `/app/.browserbird` for its SQLite database, config, and session history. This volume must survive redeployments, so verify it is attached before your first deploy. On first launch, a web-based onboarding wizard walks you through Slack app setup, agent configuration, and API keys. No manual config files needed.

The VM service runs a headless desktop environment with Chromium, accessible through the web dashboard's built-in VNC viewer. Allocate at least 2 vCPU and 4 GB RAM for the VM service to keep Chromium stable.

**Region selection:** Deploy both services in the region closest to your location. Railway may auto-select a distant region, which causes high VNC latency and makes interactive browser tasks (CAPTCHAs, form filling) difficult or impossible. Both services must be in the same region.

**Automatic updates:** Enable automatic deployments in Railway service settings so new BrowserBird versions apply without manual intervention.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| browserbird-app | `ghcr.io/owloops/browserbird-app:latest` | Web service |
| browserbird-vm | `ghcr.io/owloops/browserbird-vm:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 18800 |

## Configuration

- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.browserbird`
- **Volume:** `/home/bbuser/.browserbird`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/browserbird-1)
