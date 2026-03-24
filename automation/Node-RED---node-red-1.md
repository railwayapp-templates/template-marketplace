# Deploy Node-RED on Railway

Flow-based programming tool for wiring together hardware devices, APIs, …

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-1)

## About

_Use this page for the **Railway** service or template **description** (copy into the dashboard or link to this file). Full package docs: [README.md](README.md)._

**Node-RED** (and nodes like **playa** from **node-red-contrib-play**) run in the **Railway** container as the runtime process. The **editor** is loaded in the browser from your public URL; **audio playback** runs only on the **host** where Node-RED executes—here, the Railway service—via a CLI player, not in the visitor’s browser. In a typical cloud deployment there is often **no physical speaker**; use this deployment to try flows, the palette, and APIs. For audible output, run Node-RED on hardware with audio (e.g. Raspberry Pi, desktop, or a VM with audio forwarding).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Node-RED | [vergissberlin/railwayapp-nodered](https://github.com/vergissberlin/railwayapp-nodered) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_RED_PASSWORD` | (secret) | Enter your password for the editor |
| `NODE_RED_USERNAME` | (secret) | Enter your username for the editor |
| `NODE_RED_EDITOR_URI` | / | The URI for the editor |
| `NODE_RED_DASHBOARD_URI` | ui | The path for the ui dashboard |
| `NODE_RED_CREDENTIAL_SECRET` | (secret) | Secret token to secure your credentials |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/node-red-1)
