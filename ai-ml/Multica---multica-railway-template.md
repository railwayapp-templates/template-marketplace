# Deploy Multica on Railway

Multica on Railway with automatic URL/daemon setup, OpenCode, and Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-railway-template)

## About

Deploys Multica as three Railway services:

- **Backend** — builds the Multica Go server and CLI from the `railway-template` branch of `aalfath/multica-railway`. The runtime image includes OpenCode `1.18.23`, Git, and persistent daemon/workspace state under `/app/data`.
- **Frontend** — builds the Next.js web application from `Dockerfile.web`.
- **PG Vector** — runs `pgvector/pgvector:pg17` with persistent PostgreSQL storage.

The Backend volume is mounted at `/app/data`; the PG Vector volume is mounted at `/var/lib/postgresql`. The Backend automatically writes its Railway API/app URLs into the persistent Multica CLI profile and retries daemon startup after authentication is available. No manual setup command is needed just to point the CLI at this deployment. For unattended CLI authentication, set the optional `MULTICA_DAEMON_TOKEN` Railway secret; OpenCode provider login is still interactive.

Railway hosts the Multica web application, API, daemon runtime, and PostgreSQL-compatible vector database as managed services. Public domains are provisioned automatically, while service-to-service traffic uses Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | [aalfath/multica-railway](https://github.com/aalfath/multica-railway) | Web service |
| Backend | [aalfath/multica-railway](https://github.com/aalfath/multica-railway) | Web service |
| PG Vector | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Frontend | 3000 |
| `HOSTNAME` | Frontend | 0.0.0.0 |
| `NODE_ENV` | Frontend | production |
| `PORT` | Backend | 8080 |
| `APP_ENV` | Backend | production |
| `JWT_SECRET` | Backend | (secret) |
| `ALLOW_SIGNUP` | Backend | true |
| `MULTICA_OPENCODE_PATH` | Backend | /usr/local/bin/opencode |
| `MULTICA_VCS_SECRET_KEY` | Backend | (secret) |
| `MULTICA_VCS_INTEGRATION_ENABLED` | Backend | true |
| `MULTICA_DATABASE_CONNECT_TIMEOUT` | Backend | 5s |
| `MULTICA_DATABASE_STARTUP_TIMEOUT` | Backend | 3m |
| `POSTGRES_DB` | PG Vector | multica |
| `POSTGRES_USER` | PG Vector | (secret) |
| `POSTGRES_PASSWORD` | PG Vector | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML · **Languages:** Go, TypeScript, MDX, Shell, PLpgSQL, CSS, JavaScript, PowerShell, Makefile, Dockerfile, Go Template, HTML

[View on Railway →](https://railway.com/deploy/multica-railway-template)
