# Deploy Node-RED on Railway

Flow-based programming tool for wiring together hardware devices, APIs, …

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-1)

## About

_Use this page for the **Railway** service or template **description** (copy into the dashboard or link to this file). Full package docs: [README.md](README.md)._

**Node-RED** (and nodes like **playa** from **node-red-contrib-play**) run in the **Railway** container as the runtime process. The **editor** is loaded in the browser from your public URL; **audio playback** runs only on the **host** where Node-RED executes—here, the Railway service—via a CLI player, not in the visitor’s browser. In a typical cloud deployment there is often **no physical speaker**; use this deployment to try flows, the palette, and APIs. For audible output, run Node-RED on hardware with audio (e.g. Raspberry Pi, desktop, or a VM with audio forwarding).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Node-RED | [vergissberlin/railwayapp-nodered](https://github.com/vergissberlin/railwayapp-nodered) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_RED_PASSWORD` | (secret) | Editor administrator password. |
| `NODE_RED_USERNAME` | (secret) | Editor administrator username. |
| `NODE_RED_EDITOR_URI` | / | The URI for the editor |
| `NODE_RED_DASHBOARD_URI` | ui | The path for the ui dashboard |
| `NODE_RED_CREDENTIAL_SECRET` | (secret) | Stable encryption key for persisted credentials. |

## Configuration

- **Start command:** `node-red -u /data --settings /app/settings.js`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/node-red-1)
