# Deploy Jellyfin — Self-Hosted Media Server & Plex Alternative on Railway

Self-host Jellyfin — stream your movies, TV & music from anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-remote-streaming)

## About

Jellyfin is the free, open-source media server — a Plex and Emby alternative with no subscriptions, no paywalled features, and no telemetry. Organize your movies, TV shows, music, and photos into a clean, Netflix-style library and stream them to any device: phone, tablet, browser, smart TV, Roku, or Fire TV. This template deploys Jellyfin with a persistent volume and a public HTTPS domain, so you can reach your library from anywhere without port forwarding, DNS, or reverse-proxy setup — with honest guidance on what Railway hosting is and isn't suited for.

---

Jellyfin runs cleanly on Railway, but two platform realities decide whether it fits your use case — and being upfront about them saves disappointment.

**Persist the volume — it holds everything.** Your Jellyfin config, user accounts, watch history, metadata, transcoding cache, and media all live on the mounted volume. Without it, a redeploy wipes your entire setup. This template mounts it, so your library and settings survive restarts and updates.

**There's no hardware transcoding on Railway — plan for direct play.** Railway containers have no GPU, so hardware-accelerated transcoding isn't available. Software transcoding via ffmpeg works for light use but is CPU-intensive: expect only one or two simultaneous 1080p streams before the CPU maxes out, and 4K transcoding isn't practical. The way to run Jellyfin happily here is **direct play** — using client apps that play your files natively (most modern devices do), so the server streams the file as-is with almost no CPU load. If your clients direct-play, Railway hosting is smooth; if you need heavy real-time transcoding for many users, a GPU-equipped server is the right home.

**Think about where your media lives.** Jellyfin needs your media files on the volume, and video libraries are large. Railway volume storage is priced for application data, not terabyte media libraries, so this template suits a modest, curated library — a personal collection, a family's favorites, your own recordings — rather than a multi-terabyte archive.

**Create your admin account on first launch.** There are no default credentials — open your Railway URL and the setup wizard walks you through creating an admin account and adding libraries. Point each library at a folder under the media path and upload files through the web UI.

**Remote access is the real win here.** The genuine advantage of Jellyfin on Railway is zero-hassle remote streaming: automatic HTTPS, a public domain, and no port forwarding, dynamic DNS, or reverse proxy to configure. Reach your library securely from anywhere, on any device.

Typical cost: **~$5–15/month** on Railway for the service, rising with the volume storage your library needs. Jellyfin is GPL-licensed and completely free — no Plex Pass, no subscriptions ever.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jellyfin | `jellyfin/jellyfin:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8096 |
| `JELLYFIN_LOG_DIR` | /data/config/log |
| `JELLYFIN_DATA_DIR` | /data/config/data |
| `JELLYFIN_CACHE_DIR` | /data/cache |
| `JELLYFIN_CONFIG_DIR` | /data/config |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jellyfin-remote-streaming)
