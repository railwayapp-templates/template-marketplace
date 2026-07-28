# Deploy Papra on Railway

Document archiving with persistent SQLite metadata and file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/her-207-papra-2661)

## About

Papra is an open-source document management and archiving application for
storing, organizing, searching, tagging, and sharing personal or team
documents. It combines a browser interface, SQLite metadata, filesystem-backed
document storage, and background tasks in one compact self-hosted service.

This template runs Papra 26.6.1 from the official digest-pinned rootless image.
Railway provides the public HTTPS endpoint, a database-aware health check, and
one persistent volume for the SQLite database, documents, and optional
configuration. Migrations and the web/worker processes run from Papra's
documented container entrypoint. Every mandatory setting is prefilled:
`APP_BASE_URL` follows the generated Railway domain and `AUTH_SECRET` is created
fresh for each deployment. No external credentials or manual variable input
are required. The service is intended for one replica because Railway volumes
cannot be shared across replicas.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Papra | `ghcr.io/papra-hq/papra:26.6.1-rootless@sha256:a7a42e228f73f229d1e2dcd53de7b67503f1756d1aa3a894ab175dba8030c0e8` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1221 | Papra listener port used by Railway routing and health checks. |
| `AUTH_SECRET` | (secret) | Fresh 96-character hexadecimal authentication secret; keep this generated value sealed. |
| `APP_BASE_URL` | - | Canonical public URL used for authentication, trusted origins, and generated links. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/app-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/her-207-papra-2661)
