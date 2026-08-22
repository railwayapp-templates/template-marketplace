# Deploy muse on Railway

Self-hosted Discord music bot with Spotify, YouTube and persistent cache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/muse-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/muse-1)

![Muse Discord Music Bot](https://raw.githubusercontent.com/INAPP-Mobile/muse/master/template-icon.svg)

Muse is a **highly-opinionated midwestern self-hosted Discord music bot that doesn't suck**. Built for small to medium-sized Discord servers, it supports livestreams, seeking, local caching, Spotify conversion, and multi-guild support — all from a single Railway service with a persistent volume.

The template deploys a single service built from a Dockerfile based on the official `ghcr.io/museofficial/muse` image:

- **muse** — Discord music bot (TypeScript) with a built-in health-check sidecar on `PORT=8080`

Railway provides compute, TLS at the edge, a public URL, and a persistent volume at `/data` for bot cache, configuration, and database. The health sidecar exposes `/health` so Railway can monitor liveness even though the bot itself has no HTTP interface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| muse | [INAPP-Mobile/muse](https://github.com/INAPP-Mobile/muse) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | Directory holding the SQLite database and audio cache. Must match the mount path of the attached Railway Volume. |
| `CACHE_LIMIT` | 2GB | Maximum disk space used by the audio cache, e.g. 2GB. Keep below your Railway Volume size. |
| `DISCORD_TOKEN` | (secret) | Discord bot token. Create an application at https://discord.com/developers/applications, add a Bot, then copy its token. |
| `YOUTUBE_COOKIE` | CONSENT=YES+cb; VISITOR_INFO1_LIVE=XXXXXXXXXXX; YSC=XXXXXXXXXXX | YouTube cookies string. Optional — may help with age-restricted videos. |
| `YOUTUBE_API_KEY` | (secret) | YouTube Data API v3 key from https://console.cloud.google.com/apis/credentials. Required for YouTube search and playback. |
| `DISCORD_CLIENT_ID` | 1000000000000000001 | Discord application client ID (Developer Portal -> General Information -> Application ID). Used to build the bot invite link. |
| `SPOTIFY_CLIENT_ID` | 00000000000000000000000000000000 | Spotify API client ID. Optional — enables resolving Spotify tracks, albums and playlists. |
| `ENABLE_SPONSORBLOCK` | false | Skip YouTube sponsor segments using SponsorBlock data. Set to true to enable. |
| `DISCORD_CLIENT_SECRET` | (secret) | Discord application client secret. Optional — only used to generate an OAuth2 invite link. |
| `SPOTIFY_CLIENT_SECRET` | (secret) | Spotify API client secret. Optional — required only if SPOTIFY_CLIENT_ID is set. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/muse-1)
