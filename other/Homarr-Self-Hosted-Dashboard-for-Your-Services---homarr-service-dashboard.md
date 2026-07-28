# Deploy Homarr — Self-Hosted Dashboard for Your Services on Railway

Self-host Homarr — one dashboard for all your apps & integrations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homarr-service-dashboard)

## About

Homarr is a sleek, open-source dashboard and homepage for all your self-hosted apps and services — one clean, customizable start page that links to and integrates with tools like Plex, Jellyfin, Sonarr, Radarr, and dozens more. Drag-and-drop widgets, live service status, search, and per-integration API tiles, all in a fast, self-hosted interface. This template deploys it with the encryption key and persistent storage configured correctly — the part most Homarr deployments get wrong.

---

Homarr is simple to run and easy to break in one specific way, which this template exists to prevent.

**`SECRET_ENCRYPTION_KEY` is required, exactly 64 hex characters, and must never change.** Homarr won't even start without it — a missing key makes the container exit on boot. More importantly, that key encrypts the API keys and passwords for every integration you add (Plex, Sonarr, Radarr, and the rest). If the key changes on a redeploy, **every saved integration credential is permanently invalidated** and you re-enter them all by hand. This template generates a stable 64-character key (`openssl rand -hex 32`) at deploy and keeps it fixed, so your integrations survive redeploys.

**The `/appdata` volume holds everything.** Your dashboard layout, boards, users, preferences, and the SQLite database all live there. Without a persistent volume, a redeploy resets Homarr to a blank dashboard. This template mounts it.

**One honest limitation on Railway: the Docker-socket integration doesn't work here.** On a home server, Homarr can mount `/var/run/docker.sock` to auto-discover and control local containers. Railway has no host Docker socket to mount, so that specific feature isn't available. Everything else — app tiles, service status pings, and API integrations with Plex, the *arr apps, Jellyfin, and others reachable over the network — works fully. On Railway, Homarr is your dashboard and homepage for services across your infrastructure, not a local-container monitor.

Typical cost: **~$5/month** on Railway's Hobby plan for the single service. Homarr is free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Homarr | `ghcr.io/homarr-labs/homarr` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HOSTNAME` | 0.0.0.0 |
| `SECRET_ENCRYPTION_KEY` | (secret) |

## Configuration

- **Volume:** `/appdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homarr-service-dashboard)
