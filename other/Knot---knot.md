# Deploy Knot on Railway

Package manager for code sharing and monorepo manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/knot)

## About

Knot is a modern monorepo package manager that simplifies dependency management, package linking, builds, and script execution across apps and shared packages. It also supports Knot Space, an online package registry for publishing packages, sharing templates, and managing team-scoped dependencies across projects.

Hosting Knot on Railway usually means deploying the Knot Space services that power package publishing, downloads, authentication, and the web interface. In practice, that includes running the backend API, optionally deploying the frontend UI, provisioning a PostgreSQL database, and configuring environment variables such as `DATABASE_URL`, `AUTH_SECRET`, `API_URL`, and `CORS_ORIGINS`. If you want to persist uploaded package assets on-disk, you should also attach a persistent volume. Railway handles the service networking, environment management, domains, and scaling, which makes it a practical fit for running a private or public Knot Space instance without maintaining separate infrastructure by hand.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [saravenpi/knot](https://github.com/saravenpi/knot) (root: /apps/backend) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| web | [saravenpi/knot](https://github.com/saravenpi/knot) (root: /apps/web) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | backend | 3001 |
| `NODE_ENV` | backend | production |
| `AUTH_SECRET` | backend | (secret) |
| `CORS_ORIGINS` | backend | * |
| `RATE_LIMIT_WINDOW_MS` | backend | 60000 |
| `RATE_LIMIT_MAX_REQUESTS` | backend | 100 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Rust, Svelte, TypeScript, Shell, JavaScript, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/knot)
