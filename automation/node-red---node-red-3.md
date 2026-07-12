# Deploy node-red on Railway

Low-code flow automation - wire APIs, devices and services visually

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-3)

## About

Node-RED is a low-code, browser-based editor for wiring together APIs, devices, and online services. Drag nodes onto a canvas, connect them into flows, and run event-driven automations and HTTP endpoints in minutes — no build step, no redeploy needed.

Node-RED runs as a single lightweight Node.js container, so hosting it means one service and one persistent volume. This template deploys the official image pinned to 5.0.1 with a volume mounted at /data, where your flows, encrypted credentials, settings, and any nodes installed through the Palette Manager live — everything survives restarts and redeploys. The app binds Railway's injected PORT automatically. One variable is required at deploy time: set RAILWAY_RUN_UID to 0 so the container can write to the Railway-managed volume. Deploy, open the public URL, and start building flows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-red | `nodered/node-red:5.0.1` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/node-red-3)
