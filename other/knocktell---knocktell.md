# Deploy knocktell on Railway

Deploy and Host Knocktell with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/knocktell)

## About

knocktell is a multi-tenant SaaS for recording and managing door-to-door visits on a map. Pick houses shown on a vector map, log outcomes such as "visited" or "no answer," and share progress across your organization in real time. Built for field reps on mobile and managers on desktop, with each tenant's data kept separate.

Hosting knocktell means running a Next.js (App Router) app backed by PostgreSQL. On deploy, the template provisions a Postgres database, runs migrations, and seeds a default organization automatically. Sign-in uses Auth.js with Auth0 (Google) — in production you supply three Auth0 values plus a session secret. The base map is drawn with MapLibre and Japan GSI optimized vector tiles, so no map API key is required. The app is host-agnostic: it only needs `DATABASE_URL` and `DIRECT_URL`, so the web service and database can scale independently. A `/api/health` endpoint backs Railway's health checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| knocktell | [genki140/knocktell](https://github.com/genki140/knocktell) (branch: stable) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_SECRET` | knocktell | (secret) | - |
| `AUTH0_CLIENT_SECRET` | knocktell | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/knocktell)
