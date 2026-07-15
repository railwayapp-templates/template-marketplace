# Deploy syncthing on Railway

Syncthing — decentralized file synchronization between devices.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/syncthing-2)

## About

This template deploys **Syncthing 2.1.1** on Railway using the official Docker image. It provides a self-hosted, private file synchronization server with a browser-based management interface. The deployment maps Railway's `PORT` environment variable directly to Syncthing's web UI port, ensuring seamless platform health checks and public routing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| syncthing | [INAPP-Mobile/railway-syncthing](https://github.com/INAPP-Mobile/railway-syncthing) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 1000 | Group ID for file ownership (default: 1000). Ignored on Railway (non-root container). |
| `PUID` | 1000 | User ID for file ownership (default: 1000). Ignored on Railway (non-root container). |
| `STHOMEDIR` | /var/syncthing | Syncthing home directory for config, keys, and database. Must match the persistent volume mount path (/var/syncthing) so config and the Sync folder survive redeploys. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/syncthing`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/syncthing-2)
