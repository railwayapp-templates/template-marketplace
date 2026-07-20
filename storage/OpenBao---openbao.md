# Deploy OpenBao on Railway

Manage, store, and distribute sensitive data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbao)

## About

OpenBao is an open-source platform that allows for secure secret management and sharing. This template provides a quick way to deploy OpenBao on Railway, enabling you to manage your secrets effectively. This Basic template allows you to get a development environment up and running. While it is usable in production, a typical hardened production instance should be firewalled and only accessible from your internal hosts rather than being exposed on the internet.

Hosting OpenBao involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing secrets and a web interface for managing them. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Openbao | `ghcr.io/openbao/openbao:2.6.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Openbao | 8200 | Port for Railway healthchecks |
| `VAULT_UI` | Openbao | true | - |
| `BAO_LOCAL_CONFIG` | Openbao | {"listener":{"tcp":{"address":"0.0.0.0:8200","tls_disable":true}},"storage":{"postgresql":{}}} | Local config |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `docker-entrypoint.sh server`
- **Healthcheck:** `/v1/sys/health?standbycode=200&sealedcode=200&uninitcode=200&drsecondarycode=200&performancestandbycode=200`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/openbao)
