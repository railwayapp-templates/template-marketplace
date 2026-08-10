# Deploy Wizarr on Railway

Community template for self-hosted media-server invitations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wizarr)

## About

Wizarr is a self-hosted invitation and onboarding portal for operators of Plex, Jellyfin, Emby, Audiobookshelf, RomM, Komga, and Kavita servers. This community template runs the pinned Wizarr container on Railway with persistent `/data`, a generated public domain, safe defaults, and no credentials or media-server integration preconfigured. It is not affiliated with the Wizarr project.

This template deploys one public Wizarr service on Railway's generated HTTPS domain and routes application traffic to the container's fixed port `5690`. The attached `/data` volume stores Wizarr's persistent application state. The image is pinned by immutable digest, while the template supplies deterministic values for `PUID`, `PGID`, `DISABLE_BUILTIN_AUTH`, `PORT`, and `TZ`. After deployment, configure only media servers and users that you are authorized to manage or invite. No source credentials or customer data are included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wizarr | `ghcr.io/wizarrrr/wizarr:v2026.7.1@sha256:606f9b88b0303daae11f595e424756b588d9365021c53dcb4d1369f2efc0543c` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container timezone; set to UTC. |
| `PGID` | 1000 | Numeric GID used when writing persistent Wizarr data. |
| `PORT` | 5690 | Internal HTTP port used by Gunicorn and Railway networking; set to 5690. |
| `PUID` | 1000 | Numeric UID used when writing persistent Wizarr data. |
| `DISABLE_BUILTIN_AUTH` | false | Keep built-in administrator authentication enabled; set false. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wizarr)
