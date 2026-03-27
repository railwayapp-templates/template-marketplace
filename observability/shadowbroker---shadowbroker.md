# Deploy shadowbroker on Railway

Shadowbroker is a real-time OSINT geospatial intelligence platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shadowbroker)

## About

[Shadowbroker](https://github.com/BigBodyCobain/Shadowbroker) is a self-hosted, open-source geospatial OSINT dashboard that combines aviation, maritime, satellite, conflict, environmental, and network intelligence overlays into a single map interface.

This template deploys Shadowbroker as a **two-service architecture** aligned with upstream containers:

- `shadowbroker` (Next.js frontend, public)
- `shadowbroker-backend` (FastAPI backend, private)

Both services use upstream GHCR images pinned by digest for deterministic deployments:

- `ghcr.io/bigbodycobain/shadowbroker-frontend@sha256:eca2fdaedc3029934287daf61f8385ce205dd2d098fa8ebe55214d81271461a3`
- `ghcr.io/bigbodycobain/shadowbroker-backend@sha256:64b70ad2c98dbdb6460737dea71a4061b5ad4b56c2dd4984c72ca72fbf6db9ea`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shadowbroker | `ghcr.io/bigbodycobain/shadowbroker-frontend@sha256:eca2fdaedc3029934287daf61f8385ce205dd2d098fa8ebe55214d81271461a3` | Web service |
| shadowbroker-backend | `ghcr.io/bigbodycobain/shadowbroker-backend@sha256:64b70ad2c98dbdb6460737dea71a4061b5ad4b56c2dd4984c72ca72fbf6db9ea` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | shadowbroker | 3000 |
| `AIS_API_KEY` | shadowbroker-backend | (secret) |
| `ALLOW_INSECURE_ADMIN` | shadowbroker-backend | false |
| `MESH_DM_TOKEN_PEPPER` | shadowbroker-backend | (secret) |
| `MESH_PEER_PUSH_SECRET` | shadowbroker-backend | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/shadowbroker)
