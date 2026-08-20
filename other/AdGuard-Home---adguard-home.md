# Deploy AdGuard Home on Railway

AdGuard Home: network-wide ad and tracker blocking DNS on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adguard-home)

## About

AdGuard Home is a free, open source, network-wide ad and tracker blocking DNS server. It acts as your private DNS sinkhole: queries for advertising and tracking domains are re-routed to a "black hole", while a built-in web dashboard manages filters, clients, and query logs.

This template deploys a pre-configured AdGuard Home container: an admin account is seeded automatically (no setup wizard), the web UI follows Railway's `PORT`, and all state persists on an attached volume.

> [!NOTE]
> **Source model — hybrid.** The service runs the prebuilt image [`wotonews/adguard-home`](https://hub.docker.com/r/wotonews/adguard-home) (pinned tag `v0.107.79-1`) for fast deploys. This repository is the source of truth for that image. Image-sourced services do not receive updatable-template PR branches — see [Updates](#-updates-rebuilding-the-image).

---

Hosting AdGuard Home means running its single Go binary with a config file, a work directory for query logs and statistics, and the web admin UI on an HTTP port. In containerized form it is stateful: losing the config or work directory resets filters, settings, and history, so a persistent volume is mandatory.

On Railway, the web UI is served over a public domain and the admin credentials are generated at deploy time. The DNS resolver itself binds port 53 inside the container; see the [DNS networking](#-dns-networking-on-railway) section for what is and is not reachable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| adguard-home | `wotonews/adguard-home:v0.107.79-1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AGH_ADMIN_PASSWORD` | (secret) | Admin password for the web UI. Only applied on first boot; password changes made in the UI persist in the config volume. Auto-generated. |

## Configuration

- **Volume:** `/opt/adguardhome`

**Category:** Other

[View on Railway →](https://railway.com/deploy/adguard-home)
