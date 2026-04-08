# Deploy TREK on Railway

A self-hosted travel/trip planner with real-time collaboration and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trek-1)

## About

TREK ships as a **Docker image** (`mauriceboe/trek`) and stores state on disk: a **SQLite** database under `/app/data` and user files under `/app/uploads`. You run the container with **production environment variables** (for example encryption, public URL, CORS, timezone, and optional OIDC). The app listens on **HTTP** (typically port 3000) and expects to sit **behind HTTPS** in production, with **WebSocket** support on `/ws` for live collaboration. Hosting therefore means: run the official image, attach **persistent storage** for `data` and `uploads`, set secrets and URL-related variables, and expose a stable HTTPS URL—then keep the image updated while preserving those volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Trek | `mauriceboe/trek:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Australia/Brisbane |
| `NODE_ENV` | production |
| `LOG_LEVEL` | info |
| `FORCE_HTTPS` | true |
| `TRUST_PROXY` | 1 |
| `ALLOW_INTERNAL_NETWORK` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/trek`

**Category:** Other

[View on Railway →](https://railway.com/deploy/trek-1)
