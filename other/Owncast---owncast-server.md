# Deploy Owncast on Railway

Live video streaming and chat server you run yourself

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owncast-server)

## About

Owncast is an open source, self-hosted live video streaming and chat server — the independent alternative to Twitch or YouTube Live. Point OBS, Streamlabs, ffmpeg or any other RTMP encoder at your own server, and Owncast transcodes the feed into HLS, serves a web player and a live chat room, and gives you a moderation dashboard. Nobody else sets the rules for your content, chat or audience, and there is no platform cut or algorithm. It is one Go binary with an embedded database, so self-hosting Owncast suits a hobby stream and a company broadcast alike.

Deploying Owncast on Railway gives you one service built from the [gridalpha/owncast-railway](https://github.com/gridalpha/owncast-railway) repository, which wraps the official `owncast/owncast` image. A volume at `/app/data` holds the SQLite configuration database, rolling HLS segments, emoji and logs. A public Railway domain serves the player, chat and admin over HTTPS, and a TCP proxy exposes the RTMP ingest port. The admin password and stream key are applied from environment variables on first boot, so the server never comes up carrying Owncast's published default credentials.

![Owncast service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787735229/owncast-architecture.png)

Owncast solves a specific problem: broadcasting live video to an audience you control, on a page you control, without handing your content and community to a platform that can demonetise or de-platform you. Teams also use it when a stream cannot leave their own infrastructure.

Key features:

- RTMP ingest from any standard encoder: OBS Studio, Streamlabs, ffmpeg, Restream
- HLS output with configurable quality variants, plus a passthrough mode skipping re-encode
- Live chat with moderation, IP bans, spam protection and optional auth
- ActivityPub federation, so Mastodon users can follow you and be told when you go live
- Admin dashboard with viewer analytics, stream health, hardware usage, logs
- Webhooks, scoped access tokens and a REST API for chat bots
- Full theming: name, logo, favicon, tags, social handles, page content, CSS and JS

The architecture is deliberately flat, because Owncast is single-broadcaster by design. One process accepts the RTMP connection, runs the ffmpeg transcode, writes HLS segments, serves the web app and holds the chat websockets. All state sits under `/app/data`, so the volume is what makes settings, chat history and moderation survive a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| owncast | [gridalpha/owncast-railway](https://github.com/gridalpha/owncast-railway) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port for player, chat and admin |
| `OWNCAST_RTMP_PORT` | 1935 | Container port for RTMP ingest |
| `OWNCAST_SERVER_URL` | - | Public URL Owncast advertises |
| `OWNCAST_STREAM_KEY` | - | Stream key your encoder uses |
| `OWNCAST_ADMIN_PASSWORD` | (secret) | Password for the admin user |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1935
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/owncast-server)
