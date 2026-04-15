# Deploy ntfy | Open-Source Push Notification Service on Railway

Self Host ntfy. Notification server with mobile apps and REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-1)

## About

Deploy ntfy on Railway to get a private, self-hosted push notification service in minutes. ntfy (pronounced "notify") is an open-source HTTP-based pub-sub notification system that lets you send alerts to your phone or desktop using simple `curl` commands, REST API calls, or integrations with tools like Home Assistant, Uptime Kuma, and Grafana. This Railway template deploys ntfy with persistent message caching via a Railway volume.

Self-host ntfy on Railway and stop relying on third-party notification services that limit your messages, charge per device, or mine your data.

ntfy is a lightweight notification relay built in Go. It solves a simple problem: getting alerts from scripts, servers, and automation tools to your phone without complex setup or vendor lock-in.

- **HTTP-based pub-sub** -- publish via PUT/POST, subscribe via GET/WebSocket/SSE
- **Mobile & desktop apps** -- Android (Play Store + F-Droid), iOS, and browser-based web app
- **Rich notifications** -- priorities, tags, emojis, click actions, file attachments (images, documents)
- **User access control** -- fine-grained ACLs per topic with optional authentication
- **Email notifications** -- forward messages via SMTP
- **Integrations** -- Home Assistant, Uptime Kuma, Grafana, GitHub Actions, Sonarr, Radarr, Ansible, Node-RED, Watchtower
- **29.7k GitHub stars** -- actively maintained, dual-licensed Apache 2.0 / GPLv2

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nfty | `binwiederhier/ntfy:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NTFY_BASE_URL` | - | Public-facing instance URL |
| `NTFY_CACHE_FILE` | /var/cache/ntfy/cache.db | SQLite message cache path |
| `NTFY_LISTEN_HTTP` | :80 | HTTP listen address and port |
| `NTFY_BEHIND_PROXY` | true | Trust reverse proxy headers |

## Configuration

- **Start command:** `ntfy serve`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/cache/ntfy`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/ntfy-1)
