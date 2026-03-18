# Deploy Next-BetterAuth-Drizzle on Railway

Deploy and Host Next-BetterAuth-Drizzle with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/next-betterauth-drizzle)

## About

An simple starter template , that uses next js for both frontend and apis, Postgres for db and better auth for authentication

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NextJS App | [r4k3labs/s3-fin](https://github.com/r4k3labs/s3-fin) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| postgres-17 | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Drizzle Studio | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `RESEND_API_KEY` | NextJS App | (secret) |
| `BETTER_AUTH_SECRET` | NextJS App | (secret) |
| `GOOGLE_CLIENT_SECRET` | NextJS App | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | Redis | no |
| `POSTGRES_DB` | postgres-17 | postgres |
| `POSTGRES_USER` | postgres-17 | (secret) |
| `POSTGRES_PASSWORD` | postgres-17 | (secret) |
| `PORT` | Drizzle Studio | 4983 |
| `MASTERPASS` | Drizzle Studio | S1mpleS44s |
| `STORE_PATH` | Drizzle Studio | /app |

## Configuration

- **Start command:** `pnpm run start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/next-betterauth-drizzle)
