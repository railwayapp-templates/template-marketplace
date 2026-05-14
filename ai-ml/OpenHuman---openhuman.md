# Deploy OpenHuman on Railway

OpenHuman core with persistent memory and secure RPC. openhuman Open Human

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhuman)

## About

This Railway template deploys OpenHuman Core as a hosted, headless JSON-RPC service with a persistent Railway volume. After deployment, connect the OpenHuman desktop app to your Railway core using the generated RPC URL and token. This template does not deploy the full TinyHumans backend or a standalone web UI.

Hosting OpenHuman on Railway means running the `openhuman-core` service as a remote headless backend for the OpenHuman desktop app. Railway exposes the core over HTTPS, stores its workspace on a persistent volume, and protects the JSON-RPC API with a bearer token. The deployment is useful when you want your OpenHuman core to stay online beyond your local machine. Some OpenHuman features may still depend on the official TinyHumans backend for authentication, OAuth, or cloud services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openhuman-core | `ghcr.io/tinyhumansai/openhuman-core:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BACKEND_URL` | https://api.tinyhumans.ai | official TinyHumans backend used by OpenHuman for auth, OAuth, and cloud services |
| `OPENHUMAN_WORKSPACE` | /home/openhuman/.openhuman | persistent core workspace: config, SQLite databases, memory, skills, and local state |
| `OPENHUMAN_CORE_TOKEN` | (secret) | Railway-generated secret used as the Bearer token to protect the core JSON-RPC API |
| `OPENHUMAN_CORE_RPC_URL` | - | public JSON-RPC endpoint URL for clients connecting to this Railway core |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/openhuman/.openhuman`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openhuman)
