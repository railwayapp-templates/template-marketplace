# Deploy Jellyfin on Railway

Media server that streams your movies, shows and music to any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-server)

## About

Jellyfin is a free software media server that indexes your films, TV shows and music, enriches them with artwork and metadata from providers like TMDb, and streams them to a browser or a native app on almost any device. It is the community-run alternative to Plex and Emby: GPL-2.0 licensed, with no account server, licence key or premium tier gating remote access or transcoding. Deploy Jellyfin on Railway to keep a private library under your own control, reachable over HTTPS from any browser.

Self-host Jellyfin on Railway as a single service, built from the `gridalpha/jellyfin-railway` source repository on top of the official `jellyfin/jellyfin:10.11` image (10.11.11 today). Railway's edge terminates TLS and forwards to port 8096; a volume at `/data` holds the SQLite library database, config, cache and your media, so no database or bucket service is needed. On first boot the image completes Jellyfin's setup wizard: it creates the administrator from your variables, registers `movies/`, `shows/` and `music/` libraries, trusts Railway's proxy ranges so real client IPs resolve, and caps ffmpeg threads to the CPU quota. Later boots leave your settings alone.

![Diagram of the single Jellyfin service and its data volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787135856/jellyfin-architecture.png)

Jellyfin descends from Emby 3.5.2, the last release before that project closed its source, and runs on .NET with ffmpeg. Self-host it when the media should stay off someone else's platform: film and music collections, screeners or conference archives.

- Automatic metadata, posters, backdrops, cast and genres for movies, series and music
- A web player plus free clients for Android, iOS, Android TV, Roku, LG and Samsung TVs, Kodi and desktop
- Per-user accounts with per-library permissions, parental ratings and separate watch state
- Direct play when the client understands the file, transcoding as a fallback
- Subtitles, collections, playlists, Live TV/DVR, plugins and a full REST API

One container runs the server, API and web UI; the volume at `/data` is the only stateful part — database and config in `/data/config`, cache in `/data/cache`, media in `/data/media`. SQLite cannot be shared between containers, so the service runs one replica and scales vertically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jellyfin | [gridalpha/jellyfin-railway](https://github.com/gridalpha/jellyfin-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8096 | HTTP port Railway probes and routes |
| `JELLYFIN_DEMO_MEDIA` | true | Seed two Creative Commons demo films |
| `JELLYFIN_SERVER_NAME` | Jellyfin | Server name shown in clients |
| `JELLYFIN_ADMIN_PASSWORD` | (secret) | Administrator password, first boot only |
| `JELLYFIN_ADMIN_USERNAME` | (secret) | Administrator created on first boot |
| `JELLYFIN_PublishedServerUrl` | - | Public HTTPS URL for clients |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/jellyfin-server)
