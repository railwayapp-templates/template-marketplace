# Deploy Navidrome on Railway

Open-source music server and streaming.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/navidrome-2)

## About

Navidrome is an open-source, web-based music collection server and streamer for listening to a personal library from a browser or compatible mobile client. It is lightweight, supports large collections and on-the-fly transcoding, and provides a modern web interface plus broad Subsonic/OpenSubsonic compatibility.

Hosting Navidrome on Railway uses one public service running the official, digest-pinned `deluan/navidrome:0.63.2` image. Railway HTTPS forwards to Navidrome on port `4533`, while `/ping` is used as the readiness check. A persistent volume at `/data` retains the database, configuration, caches, and application-generated authentication state. `PORT=4533` is set because Railway health checks use the service `PORT` when a target port is configured. The requested single-volume graph does not include Umbrel's separate `/music` bind, so the music-library path or storage must be supplied or configured for the deployment's intended library.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Navidrome | `deluan/navidrome:0.63.2@sha256:9012939114fbb1bb641b81cf96dec5ded15f0aafefe8d47a511d7cb919658e40` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4533 |
| `ND_LOGLEVEL` | info |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/navidrome-2)
