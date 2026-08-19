# Deploy SEVO Panel on Railway

VLESS panel over WebSocket + telegram mtproxy.(self-hosted)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-hosted-panel)

## About

SE7O-SNA Panel is a self-hosted subscription management panel for VLESS over WebSocket and TLS, bundled with an integrated Telegram MTProto proxy. Built with FastAPI, it ships the backend, REST API, and web dashboard together (entry point main.py, application code under app/), with SQLite or PostgreSQL storage. It handles inbound lifecycle, per-user quotas, live traffic analytics, and Telegram alerts — and runs an mtg proxy in the same container so Telegram stays reachable alongside your VLESS links.

Hosting self-hosted Panel means running one Python process that terminates WebSocket connections, serves an authenticated dashboard, and supervises the bundled mtg proxy. The container listens on the HTTP port Railway injects, so no reverse proxy or build pipeline is needed. The MTProto proxy runs on a separate internal port (443) and is exposed through a Railway TCP Proxy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SE7O-SNA-panel | [SE7O-SNA/SE7O-SNA-panel](https://github.com/SE7O-SNA/SE7O-SNA-panel) (root: /) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Listening port. Most platforms inject their own value. |
| `DOMAIN` | - | The public service or customer domain, of the form `example.up.railway.app` |
| `DB_PATH` | /data/panel.db | SQLite file location. Mount a persistent volume at /data to keep data across restarts. |
| `WORKERS` | 4 | Number of worker processes. Higher value = better performance with many concurrent users. |
| `SECRET_KEY` | (secret) | Signs JWT session cookies. If unset, a new key is generated on every restart and all sessions are invalidated. |
| `MTPROXY_PORT` | - | Port mtg binds to inside the container. This is the value you enter when creating the TCP proxy. |
| `ADMIN_PASSWORD` | (secret) | Panel login password. Minimum 8 characters with upper case, lower case, and a digit. |
| `ADMIN_USERNAME` | (secret) | Panel login username. Defaults to admin. |
| `MTPROXY_ENABLED` | true | Set to false to run the panel without the Telegram proxy. |
| `MTPROXY_PUBLIC_HOST` | - | The public TCP proxy domain for the service, if applicable. Example: `roundhouse.proxy.rlwy.net` |
| `MTPROXY_PUBLIC_PORT` | - | The external port for the TCP Proxy. |

## Configuration

- **Start command:** `python main.py`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 443
- **Volume:** `/data/`

**Category:** Other · **Languages:** Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/self-hosted-panel)
