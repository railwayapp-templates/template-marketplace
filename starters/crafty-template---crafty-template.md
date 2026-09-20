# Deploy crafty-template on Railway

Run Minecraft servers from a web panel - Crafty Controller in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crafty-template)

## About

Deploying provisions a single service, `crafty`:

| | |
|---|---|
| Panel | Crafty Controller `4.11.0` on your Railway domain (Railway TLS at the edge; an internal bridge forwards to Crafty's own HTTPS listener) |
| Persistence | One volume at `/data` — config + SQLite DB (`/data/config`), servers (`/data/servers`), backups (`/data/backups`), logs (`/data/logs`) |
| Server port | TCP proxy on internal port `25565` (public host/port injected as `RAILWAY_TCP_PROXY_DOMAIN` / `RAILWAY_TCP_PROXY_PORT`) |
| Java runtimes | OpenJDK 8/11/17/21/25 — Minecraft 1.7 through the latest release |

The entrypoint links Crafty's five documented paths (`/crafty/app/config`, `/crafty/servers`, `/crafty/backups`, `/crafty/logs`, `/crafty/import`) into the single Railway volume, fixes group permissions for the container's non-root `crafty` user, seeds first-boot defaults, and starts an HTTP→HTTPS bridge so the panel is reachable through Railway's router with a valid certificate.

| Variable | Value |
|---|---|
| `PORT` | `${{RAILWAY_TCP_PROXY_PORT}}` — set automatically, no input needed |

Crafty Controller is a self-hosted panel that launches and manages Minecraft servers **inside its own container**. Hosting it on Railway gives you a managed panel URL, usage-based pricing, persistent storage for worlds and configs, and a public TCP entry point for players — without running a home server or a VPS.

Budget **2–3 GB of RAM** for the panel plus one small Paper server (heavier modpacks need more). Expect roughly **$10–15/month** on Railway's usage-based pricing including the volume.

Java Edition servers are reachable over the internet via TCP. **Bedrock (UDP) cannot be exposed on Railway** — Railway has no UDP ingress — so Bedrock servers are usable only over LAN/VPN-style tunnels.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crafty | [lNamelessl/crafty-controller-railway-template](https://github.com/lNamelessl/crafty-controller-railway-template) | TCP service |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 25565
- **Volume:** `/data`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/crafty-template)
