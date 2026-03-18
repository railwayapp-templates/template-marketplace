# Deploy Coder on Railway

Secure environments for developers and their agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coder)

## About

Coder provides secure, self-hosted development environments on your own infrastructure, bringing developers and AI coding agents together. Open source and deployable anywhere, Coder helps enterprises adopt AI without compromising security or performance.

Hosting Coder means running a centralized control plane that manages cloud-based development environments for your teams. The service orchestrates Terraform-defined infrastructure, handles secure high-speed connections, and manages the resource lifecycle to optimize costs.

This Railway template handles the Coder server hosting, environment variables for configuration, and the domain setup required for Coder's wildcard access URL functionality. You can then connect Coder to your own cloud infrastructure (AWS, GCP, Azure, etc.) where your development workspaces will be provisioned.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Coder | `ghcr.io/coder/coder:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Coder | 3000 | Port to run Coder |
| `CODER_ACCESS_URL` | Coder | - | Coder public access URL |
| `CODER_HTTP_ADDRESS` | Coder | - | Required by Coder |
| `CODER_PG_CONNECTION_URL` | Coder | - | Postgres database URL |
| `CODER_TELEMETRY_INSTALL_SOURCE` | Coder | railway.app | This allows Coder to track railway.app deployments |
| `POSTGRES_DB` | Postgres | coder | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/coder)
