# Deploy Kopia on Railway

Self-hosted Kopia backup server with volume persistence

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kopia)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/kopia)

Kopia is a fast and secure open-source backup tool. This template deploys a **Kopia Repository Server** on Railway — a central server that stores backups from all your machines, with a built-in web UI and per-user access control.

Kopia runs as a single container on port 51515. Railway provides compute, TLS at the edge, and a public URL. The repository (encrypted backup data), cache, and logs live at `/app` — a Railway Volume keeps them persistent across restarts and redeploys.

On first deploy, the entrypoint creates the filesystem repository automatically. The web UI and API are protected by basic auth (`KOPIA_SERVER_USERNAME` / `KOPIA_SERVER_PASSWORD`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kopia | `kopia/kopia:0.23.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 51515 | HTTP listen port. Railway maps the public domain to this port (health check + basic auth). |
| `KOPIA_PASSWORD` | (secret) | Repository encryption password. Auto-generated per deployment — do not change after data exists. |
| `KOPIA_SERVER_PASSWORD` | (secret) | Web UI / API basic-auth password. Set on deploy. |
| `KOPIA_SERVER_USERNAME` | (secret) | Web UI / API basic-auth username. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/kopia)
