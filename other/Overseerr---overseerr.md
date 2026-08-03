# Deploy Overseerr on Railway

Media request manager for Plex, Emby, and Jellyfin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/overseerr)

## About

**Manual-publish package for the unpublished `Overseerr` Railway template draft.**

Overseerr is an open-source media request management and discovery tool for the Plex ecosystem. It helps users discover movies and shows, submit requests, and coordinate approvals with connected media automation services. This template deploys the pinned Overseerr 1.35.0 container; Plex, media storage, and optional Radarr or Sonarr services remain user-managed dependencies.

Hosting Overseerr on Railway requires a public HTTPS service, a persistent volume mounted at `/config`, and network access to the media services that you administer. This template runs the immutable LinuxServer Overseerr 1.35.0 image on port 5055 with UID and GID 1000, then exposes the web interface through Railway's generated domain. Complete the first-run setup immediately, connect Plex, and add Radarr or Sonarr only when those services are reachable and properly authorized. Monitor volume usage and back up configuration data. The upstream Umbrel manifest now marks Overseerr disabled and directs new installs to Seerr, so review upstream maintenance status before using this image for a long-lived deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Overseerr | `linuxserver/overseerr:1.35.0@sha256:53a1b839ffa81f139e1552840772bff8a5d13f5c78a69cce22458b9a6cd0844d` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PGID` | 1000 |
| `PORT` | 5055 |
| `PUID` | 1000 |
| `LOG_LEVEL` | info |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/overseerr)
