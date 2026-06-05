# Deploy open-splitwise on Railway

Self-hosted Splitwise companion with PostgreSQL and Cloudflare Tunnel.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-splitwise)

## About

Self-hosted [Splitwise](https://splitwise.com) companion: sync expenses locally, then search, filter, and chart your data. Settling up still happens in Splitwise.

This template provisions **PostgreSQL**, the **open-splitwise** Next.js app, and a **cloudflared** sidecar in one Railway project. The app builds from the repo [Dockerfile](https://github.com/ankitchouhan1020/open-splitwise/blob/main/Dockerfile); the tunnel builds from [`deploy/cloudflared`](https://github.com/ankitchouhan1020/open-splitwise/tree/main/deploy/cloudflared).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-splitwise | [ankitchouhan1020/open-splitwise](https://github.com/ankitchouhan1020/open-splitwise) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SESSION_SECRET` | open-splitwise | (secret) |
| `SPLITWISE_CLIENT_SECRET` | open-splitwise | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Shell, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/open-splitwise)
