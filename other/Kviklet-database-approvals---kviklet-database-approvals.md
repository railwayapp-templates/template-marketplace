# Deploy Kviklet database approvals on Railway

Audited database approvals with encrypted credentials and PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kviklet-database-approvals)

## About

Kviklet gives engineering teams a reviewed, auditable path to production database access. This template deploys its web application with a private PostgreSQL metadata store, generated administrator credentials, encrypted target-database credentials, health checks, and durable audit history.

Kviklet provides pull-request-style review for individual SQL statements and time-limited database sessions. It supports PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, and MongoDB targets, while Kviklet's own PostgreSQL service retains users, connections, approvals, comments, and execution history.

The template exposes only Kviklet's port 8080 web interface through Railway. PostgreSQL remains on private networking, and its data lives on a 5 GB persistent volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kviklet PostgreSQL | `postgres@sha256:fbcea1bd13b6a882cd6caa6b58db3ae5c102efe50ec625b3e2a5cbc50db5bfe4` | Database |
| Kviklet | `ghcr.io/kviklet/kviklet@sha256:deef27477af11cb9c60cdf0b604dc8ec21d880781e33f21b276ae89ff1d7e066` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Kviklet PostgreSQL | kviklet | Database used for Kviklet metadata and audit records. |
| `POSTGRES_USER` | Kviklet PostgreSQL | (secret) | PostgreSQL role used by Kviklet. |
| `POSTGRES_PASSWORD` | Kviklet PostgreSQL | (secret) | Generated password for Kviklet's private PostgreSQL service. |
| `ENCRYPTION_ENABLED` | Kviklet | true | Encrypt stored target-database credentials before writing them to PostgreSQL. |
| `INITIAL_USER_EMAIL` | Kviklet | - | Email address for the first Kviklet administrator. Required on the first deployment. |
| `INITIAL_USER_PASSWORD` | Kviklet | (secret) | Generated password for the first Kviklet administrator. |
| `SPRING_DATASOURCE_URL` | Kviklet | - | JDBC connection URL for the private Kviklet metadata database. |
| `ENCRYPTION_KEY_CURRENT` | Kviklet | - | Generated key used to encrypt stored target-database credentials. Preserve it across upgrades. |
| `SPRING_DATASOURCE_PASSWORD` | Kviklet | (secret) | Password reference for the private Kviklet metadata database. |
| `SPRING_DATASOURCE_USERNAME` | Kviklet | (secret) | Username reference for the private Kviklet metadata database. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kviklet-database-approvals)
