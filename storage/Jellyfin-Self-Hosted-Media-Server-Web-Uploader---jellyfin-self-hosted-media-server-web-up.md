# Deploy Jellyfin Self-Hosted Media Server + Web Uploader on Railway

One-click Jellyfin media server with web uploader and persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-self-hosted-media-server-web-up)

## About

One-click Jellyfin media server on Railway with a built-in **web portal** (FileBrowser) for uploading your media, and **persistent storage**.

- **Jellyfin 10.10.7** — free and open-source media server (movies, TV, music)
- **Web portal** — upload, organise and manage your media from any browser at `/files`
- **Persistent volume** — config, metadata and media survive redeploys
- **nginx** — single public entry point, no configuration needed
- **Everything from the browser** — no SSH, no terminal, no extra tools

Railway gives you a public HTTPS URL, a 500 MB persistent volume on the free tier and automatic redeploys. The template wires nginx, Jellyfin and a file uploader behind a single domain, so you never need to configure ports or a reverse proxy yourself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jellyfin | [BURNI80/jellyfin-railway-template](https://github.com/BURNI80/jellyfin-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 8095 |
| `FILEBROWSER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/jellyfin-self-hosted-media-server-web-up)
