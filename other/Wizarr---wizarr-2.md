# Deploy Wizarr on Railway

Wizarr - invite manager for Jellyfin, Plex and Emby servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wizarr-2)

## About

Wizarr runs as a single container from the official `ghcr.io/wizarrrr/wizarr` image (v2026.9.1). All state — SQLite database, secrets, sessions — lives on the Railway volume mounted at `/data`, so deploys and restarts keep every invite and user intact. The in-app scheduler (invite expiry checks, update checks) runs inside the same process; keep it enabled for single-instance deploys. Memory footprint is ~120 MB, comfortably within the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wizarr | `ghcr.io/wizarrrr/wizarr:v2026.9.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for timestamps and invite-expiry calculations. Keep UTC. |
| `PORT` | 5690 | Web UI port. Railway maps the public domain to this port. |
| `GUNICORN_THREADS` | 4 | Concurrent request threads per worker. |
| `GUNICORN_WORKERS` | 1 | Gunicorn worker processes. Keep 1 (SQLite + in-app scheduler). |
| `WIZARR_DISABLE_SCHEDULER` | false | Set true to disable the in-app scheduler. Leave false on single-instance deploys. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wizarr-2)
