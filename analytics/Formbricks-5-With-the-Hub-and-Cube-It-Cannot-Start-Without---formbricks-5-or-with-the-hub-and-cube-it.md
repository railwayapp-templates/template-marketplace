# Deploy Formbricks 5 | With the Hub and Cube It Cannot Start Without on Railway

Formbricks 5 with the Hub and Cube it refuses to start without.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-5-or-with-the-hub-and-cube-it)

## About

# Formbricks 5

The survey and feedback platform, self-hosted, with the two services it refuses to
start without.

## What this fixes

The existing Formbricks template pulls `formbricks/formbricks:latest` **from
Docker Hub** — where the newest tag is 3.6.0, from March 2025. The project moved
to GHCR and never published to Hub again, so that template has been deploying a
sixteen-month-old build and will never update on its own.

Bringing it current is not a tag change. Formbricks 5 refuses to boot without a
Hub and a Cube service: its environment validation fails on `CUBEJS_API_URL`,
`CUBEJS_API_SECRET`, `HUB_API_URL` and `HUB_API_KEY` before the application
starts. Upstream runs those with one-shot migration containers and
`condition: service_completed_successfully`, which a template cannot express.

## How it is expressed here

- **Hub's migrations moved into its start command.** `goose … up && river
  migrate-up … && exec /app/hub-api` — "migrate, then serve" is an ordering
  inside one service, so no separate migration container is needed.
- **Cube's configuration is baked into an image.** Upstream bind-mounts
  `cube.js` and the data model from its repository; there is no host directory
  to mount from here, so they live in `ak40u/formbricks-cube-railway` instead.
- **Hub gets its own database.** Sharing one meant Hub migrated first and the
  Formbricks Prisma migration then sat on a lock until it timed out at 300
  seconds. Upstream supports `HUB_DATABASE_URL` for exactly this.
- **Both databases are pgvector images.** Hub's first migration runs
  `CREATE EXTENSION vector`, and plain Postgres answers "extension is not
  available".

## Verified

Deployed from this template: `/health` returns 200, the sign-up page is served,
and the management API answers unauthenticated calls with `not_authenticated`
rather than a 404. The environment validation that blocks a misconfigured
Formbricks 5 passes — which is only possible if Hub and Cube are both reachable
and their secrets match.

Creating the first account happens in the browser and was not driven here.

## Services

Formbricks, its Postgres, Valkey, Hub, Hub's Postgres, and Cube. Six, because that
is what Formbricks 5 needs.

## Configuration

Nothing to fill in. Every secret and both database passwords are generated.

Formbricks is by Formbricks GmbH; the parts used here are AGPL-3.0.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cube | [ak40u/formbricks-cube-railway](https://github.com/ak40u/formbricks-cube-railway) | Worker |
| HubPostgres | `pgvector/pgvector:pg18` | Database |
| Postgres | `pgvector/pgvector:pg18` | Database |
| Valkey | `valkey/valkey:8.1.4-alpine` | Database |
| Hub | `ghcr.io/formbricks/hub:0.8.4` | Worker |
| Formbricks | `ghcr.io/formbricks/formbricks:5.2.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Cube | 4000 |
| `CUBEJS_DB_PORT` | Cube | 5432 |
| `CUBEJS_DB_TYPE` | Cube | postgres |
| `CUBEJS_DB_USER` | Cube | (secret) |
| `CUBEJS_API_SECRET` | Cube | (secret) |
| `CUBEJS_JWT_ISSUER` | Cube | formbricks-web |
| `CUBEJS_JWT_AUDIENCE` | Cube | formbricks-cube |
| `CUBEJS_DEFAULT_API_SCOPES` | Cube | meta,data |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | Cube | memory |
| `POSTGRES_DB` | HubPostgres | hub |
| `POSTGRES_USER` | HubPostgres | (secret) |
| `POSTGRES_PASSWORD` | HubPostgres | (secret) |
| `POSTGRES_DB` | Postgres | formbricks |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDIS_PASSWORD` | Valkey | (secret) |
| `PORT` | Hub | 8080 |
| `API_KEY` | Hub | (secret) |
| `PORT` | Formbricks | 3000 |
| `CRON_SECRET` | Formbricks | (secret) |
| `HUB_API_KEY` | Formbricks | (secret) |
| `NEXTAUTH_SECRET` | Formbricks | (secret) |
| `CUBEJS_API_SECRET` | Formbricks | (secret) |
| `CUBEJS_JWT_ISSUER` | Formbricks | formbricks-web |
| `CUBEJS_JWT_AUDIENCE` | Formbricks | formbricks-cube |
| `PASSWORD_RESET_DISABLED` | Formbricks | (secret) |
| `EMAIL_VERIFICATION_DISABLED` | Formbricks | 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c '/usr/local/bin/goose -dir /app/migrations postgres "$DATABASE_URL" up && /usr/local/bin/river migrate-up --database-url "$DATABASE_URL" && exec /app/hub-api'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nextjs/apps/web/uploads`

**Category:** Analytics · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/formbricks-5-or-with-the-hub-and-cube-it)
