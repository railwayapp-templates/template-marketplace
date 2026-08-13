# Deploy Permify Latest on Railway

Permify is an open-source service for fine-grained authorization.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/permify-latest)

## About

Permify is an open-source authorization service for building and managing fine-grained access controls. Inspired by Google Zanzibar, it supports RBAC, ReBAC, and ABAC patterns, allowing applications to perform scalable permission checks and model complex authorization relationships.

Railway hosts Permify as a stateless service alongside PostgreSQL for persistent authorization data. The services communicate over Railway's private network, while Permify can expose gRPC on port 3478 and REST on port 3476. Railway simplifies deployment, networking, HTTPS, and scaling without requiring manual infrastructure configuration. PostgreSQL stores authorization schemas, relationship tuples, and permission data, while Permify instances can scale horizontally as application traffic grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Permify | `permify/permify:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Permify | 0.0.0.0 | Bind to Railway interfaces. |
| `PORT` | Permify | 3476 | REST API port. |
| `PERMIFY_LOG_LEVEL` | Permify | info | - |
| `PERMIFY_AUTHN_METHOD` | Permify | preshared | - |
| `PERMIFY_AUTHN_ENABLED` | Permify | true | - |
| `PERMIFY_DATABASE_ENGINE` | Permify | postgres | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `permify serve --database-auto-migrate=true`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/permify-latest)
