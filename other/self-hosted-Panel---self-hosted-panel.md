# Deploy self-hosted Panel on Railway

A self-hosted subscription panel for VLESS over WebSocket + TLS. Single

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-panel)

## About

SE7O-SNA Panel is a single-file, self-hosted subscription management panel for VLESS over WebSocket and TLS. Built with FastAPI, it bundles the backend, REST API, and web dashboard into one main.py file, with SQLite or PostgreSQL storage. It handles inbound lifecycle, per-user quotas, live traffic analytics, and Telegram alerts.

Hosting self-hosted Panel means running one Python process that terminates WebSocket connections and serves an authenticated dashboard. The container listens on the port Railway injects, so no reverse proxy or build pipeline is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SE7O-SNA-panel | [SE7O-SNA/SE7O-SNA-panel](https://github.com/SE7O-SNA/SE7O-SNA-panel) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Listening port. Most platforms inject their own value. |
| `DOMAIN` | - | The public service or customer domain, of the form `example.up.railway.app` |
| `DB_PATH` | /data/panel.db | SQLite file location. Mount a persistent volume at /data to keep data across restarts. |
| `SECRET_KEY` | (secret) | Signs JWT session cookies. If unset, a new key is generated on every restart and all sessions are invalidated. |
| `ADMIN_PASSWORD` | (secret) | Panel login password. Minimum 8 characters with upper case, lower case, and a digit. |
| `ADMIN_USERNAME` | (secret) | Panel login username. Defaults to admin. |

## Configuration

- **Start command:** `python main.py`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/`

**Category:** Other · **Languages:** Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/self-hosted-panel)
