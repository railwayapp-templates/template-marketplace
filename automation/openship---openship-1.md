# Deploy openship on Railway

Self-hosted deployment dashboard with CI/CD, Postgres, and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openship-1)

## About

OpenShip runs on Railway as a Docker-only, multi-service deployment with a public dashboard, private API, Postgres storage, and Redis-backed queues/cache. Railway provides managed HTTPS, private service networking, image-based deploys, and persistent volumes for stateful data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| api | `xiaosong233/openship-api-railway:latest` | Worker |
| redis | `redis:7-alpine` | Database |
| dashboard | `xiaosong233/openship-dashboard-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres | openship |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | api | 4000 |
| `NODE_ENV` | api | production |
| `CLOUD_MODE` | api | false |
| `DEPLOY_MODE` | api | docker |
| `TRUST_PROXY` | api | true |
| `INTERNAL_TOKEN` | api | (secret) |
| `OPENSHIP_TARGET` | api | local |
| `SYSTEM_DEBUG_LOGS` | api | false |
| `BETTER_AUTH_SECRET` | api | (secret) |
| `OPENSHIP_REQUIRE_REDIS` | api | true |
| `PORT` | dashboard | 3001 |
| `NODE_ENV` | dashboard | production |
| `OPENSHIP_TARGET` | dashboard | local |
| `NEXT_PUBLIC_API_PROXY` | dashboard | true |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `redis-server --appendonly yes`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/openship-1)
