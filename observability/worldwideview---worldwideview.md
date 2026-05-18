# Deploy worldwideview on Railway

Open-source real-time 3D geospatial intelligence globe on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/worldwideview)

## About

WorldWideView runs as a Dockerized Next.js + Cesium app, while PostgreSQL is provisioned as a companion service. Railway handles service networking, HTTPS domain routing, and zero-config internal DNS between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/silvertakana/worldwideview@sha256:9acb49ff20a66353fd2587bf57822b4e3f5735f97ee369c4c71859d930731a80` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 3000 |
| `AUTH_SECRET` | app | (secret) |
| `NEXT_PUBLIC_WWV_EDITION` | app | cloud |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/worldwideview)
