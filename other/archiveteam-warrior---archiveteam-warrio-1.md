# Deploy archiveteam-warrior on Railway

Donate idle bandwidth to web preservation — ArchiveTeam Warrior, one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archiveteam-warrio-1)

## About

Hosting the ArchiveTeam Warrior on Railway provisions a single **Warrior service** built from this repo's Dockerfile, which wraps the official `atdr.meo.ws/archiveteam/warrior-dockerfile` image pinned by digest. The warrior's web UI listens on port 8001 and is exposed on your Railway public domain behind HTTP basic auth (`HTTP_USERNAME` / `HTTP_PASSWORD`, generated per deployment via Railway's `secret()`). A **Railway volume** is mounted at `/home/warrior/projects` so the warrior's `config.json` — nickname, selected project, and UI settings — persists across redeploys. First-boot behavior is seeded from image defaults (`SELECTED_PROJECT=auto`, `CONCURRENT_ITEMS=3`, `SHARED_RSYNC_THREADS=20`); afterwards the warrior reads its configuration from `config.json` on the volume, which is exactly what makes your settings survive restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| warrior | [lNamelessl/archiveteam-warrior-railway-template](https://github.com/lNamelessl/archiveteam-warrior-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HTTP_PASSWORD` | (secret) |
| `HTTP_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/warrior/projects`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/archiveteam-warrio-1)
