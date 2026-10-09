# Deploy AionUi on Railway

AionUi: headless web AI agent workspace with document generation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aionui-1)

## About

AionUi is an AI agent workspace with a web UI: chat with AI agents, generate office documents (Word, Excel, PowerPoint, PDF, Mermaid diagrams), and run agent tasks — all from a headless server, no desktop app required.

This template deploys AionUi's WebUI mode: the same server that powers the desktop app, the official no-Electron web runtime from the pinned upstream release, running headless with `HOME` on a persistent volume at `/data` — the SQLite database, configuration, generated documents, and logs all survive redeploys. Remote access is enabled in the image and Railway's injected port is honored.

On first boot AionUi generates a random admin password and **prints it in the deploy logs** — open the deployment logs, find the password line, sign in at the public domain, and change the password from the settings page. Everything else needs no configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aionui | `wotonews/aionui:v2.1.47-1` | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/aionui-1)
