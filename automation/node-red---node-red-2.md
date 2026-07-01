# Deploy node-red on Railway

Low-code flow programming for wiring hardware, APIs, and services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-2)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/node-red-2)

> **Canonical code:** `node-red-2` — deploy URL: https://railway.com/new/template/node-red-2

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-node-red/main/og-image.svg)

Node-RED is a low-code, flow-based programming tool for wiring together hardware devices, APIs, and online services. Deploy it on Railway in minutes to start building automations visually.

Node-RED runs as a single container with a persistent Railway volume at `/data` for flows, settings, and credentials. Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures. No external database is required for basic usage — everything runs in one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-red | `nodered/node-red:5.0.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/node-red-2)
