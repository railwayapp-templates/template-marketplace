# Deploy kan on Railway

Open-source Kanban workspace for boards, tasks, and teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kan-1)

## About

kan is an open-source Kanban workspace for organizing boards, tasks, and team collaboration. It provides a focused alternative to hosted project-management tools, with a web application that can be operated in an infrastructure stack you control.

This template deploys the kan web application alongside PostgreSQL and a migration service. The application and migration service use private networking to reach PostgreSQL, while the web service is exposed for browser access. Run migrations in the intended order during initial deployment and upgrades, and keep PostgreSQL on persistent storage. The template generates application secrets at deployment time and uses service references for shared database connectivity instead of copying source credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.3@sha256:0321e2252ebfeecb8bc1a899755084d29bce872953e1a5a3e25ec0860b739098` | Database |
| kan | `ghcr.io/kanbn/kan:0.6.0@sha256:0087a72a123d8462c66ddce3a303049d4ec92f03cfba297d41466605ef8cb5b5` | Web service |
| kan-migrate | `ghcr.io/kanbn/kan-migrate:0.6.0@sha256:3296fd28e037a93dda478981494a72c6905ecd4f0d0739e79139172844acbc4b` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | kan |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | kan | 3000 |
| `BETTER_AUTH_SECRET` | kan | (secret) |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | kan | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kan-1)
