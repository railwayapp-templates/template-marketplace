# Deploy OpenBao on Railway

Manage, store, and distribute sensitive data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openbao)

## About

OpenBao is an open-source platform that allows for secure secret management and sharing. This template provides a quick way to deploy OpenBao on Railway, enabling you to manage your secrets effectively. This Basic template allows you to get a development environment up and running. While it is usable in production, a typical hardened production instance should be firewalled and only accessible from your internal hosts rather than being exposed on the internet.

Hosting OpenBao involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing secrets and a web interface for managing them. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openbao | `ghcr.io/openbao/openbao:2.2.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `VAULT_UI` | Openbao | true |
| `BAO_LOCAL_CONFIG` | Openbao | {"listener":{"tcp":{"address":"0.0.0.0:8200","tls_disable":true}},"storage":{"postgresql":{}}} |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh server`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/openbao)
