# Deploy Node-RED | (Just Updated) Flow Automation Whose Editor Isn't Open to Strangers on Railway

Low-code flow automation, editor login-protected, flows survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-or-just-updated-flow-automation)

## About

Node-RED is a low-code, browser-based editor for wiring together APIs, devices, and online services. Drag nodes onto a canvas, connect them into flows, and run event-driven automations and HTTP endpoints in minutes — no build step, no redeploy needed.

Node-RED runs as a single lightweight Node.js container, so hosting it means one service and one persistent volume. This template deploys a thin wrapper over the official image pinned to 5.0.4, with a volume mounted at /data where your flows, encrypted credentials, settings, and any nodes installed through the Palette Manager live — everything survives restarts and redeploys. The app binds Railway's injected PORT automatically, and the flow editor is protected with a login the moment the URL goes live: a username and a random admin password are set for you, and the credential-encryption secret is fixed so your stored credentials keep decrypting across redeploys. Deploy, sign in, and start building flows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-red | `ghcr.io/bon5co/node-red-railway:5.0.4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_RED_PASSWORD` | (secret) |
| `NODE_RED_USERNAME` | (secret) |
| `NODE_RED_CREDENTIAL_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/node-red-or-just-updated-flow-automation)
