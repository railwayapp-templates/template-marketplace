# Deploy Komari on Railway

Server monitoring dashboard with agents, charts and latency checks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/komari-panel)

## About

Komari is a lightweight, self-hosted server monitoring panel. A small Go agent runs on each machine you own — a VPS, a home server, a dedicated box — and streams CPU, memory, swap, disk, network throughput and uptime to one dashboard every few seconds. The panel draws live charts, keeps historical rollups, runs ICMP/TCP/HTTP latency checks, raises offline and load alerts, and gives you a browser terminal into any connected machine. People reach for it when Uptime Kuma only says a URL is up and Netdata is more than they want to run.

Self-host Komari on Railway and this template gives you the whole panel with no setup wizard to click through. Two services are deployed: **komari**, the dashboard and agent endpoint, built from a public repository that layers a first-boot entrypoint over the official image; and **Postgres**, Railway's managed database, used as Komari's monitoring database — the store for every metric sample and rollup. The komari service mounts a volume at `/app/data` for its configuration database, themes and plugins. The administrator account is created on the first boot from the variables you set, so the dashboard never shows an open installation form, and agents connect to your Railway URL over WebSocket.

![Komari service and its Postgres metric store on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789385802/komari-monitor-architecture.webp)

Komari answers a narrow question well: what are my servers doing right now, and what were they doing an hour ago? It is a single Go binary plus a static frontend, and the agent is a few megabytes with no dependencies. Teams self-host it because the alternative charges per host and keeps an inventory of your infrastructure on someone else's account.

Key features:

- Live metrics at seconds resolution: CPU, load, memory, swap, disk, network speed and total traffic
- Historical charts with automatic rollups, per-node traffic accounting and expiry reminders
- ICMP, TCP and HTTP latency tasks with packet-loss tracking
- Offline, load-threshold and traffic-limit notifications
- A browser terminal and file manager for connected machines
- A status page you can leave open or lock down, with themes and a plugin system

The deployment splits storage the way Komari allows. The **komari** service keeps configuration — accounts, nodes, tasks, settings — in SQLite on the volume, the only backend it supports for that. Its *monitoring* database is separate and pluggable, and points at the managed **Postgres** service, where the high-frequency samples land.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| komari | [gridalpha/komari-railway](https://github.com/gridalpha/komari-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | komari | 25774 | HTTP port the panel listens on |
| `KOMARI_DATA_DIR` | komari | /app/data | Volume path for the configuration database |
| `KOMARI_SITE_NAME` | komari | Komari | Site name shown in the dashboard |
| `KOMARI_METRIC_DSN` | komari | - | Monitoring database connection string |
| `KOMARI_ADMIN_PASSWORD` | komari | (secret) | First administrator password |
| `KOMARI_ADMIN_USERNAME` | komari | (secret) | First administrator, created on first boot |
| `KOMARI_SITE_DESCRIPTION` | komari | A simple server monitor tool. | Site tagline |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/public`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/komari-panel)
