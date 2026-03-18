# Deploy Permify on Railway

Open-source fine-grained authorization inspired by Google Zanzibar

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/permify)

## About

Permify is an open-source authorization service for building and managing fine-grained, scalable access controls for your applications. Inspired by Google Zanzibar, it enables you to implement RBAC, ReBAC, and ABAC patterns in minutes instead of months, with lightning-fast permission checks at scale.

Hosting Permify on Railway provides a complete authorization infrastructure with minimal configuration. The template automatically provisions a dedicated PostgreSQL database for storing authorization schemas, relationship tuples, and permission data. Permify runs as a stateless gRPC/REST service, making it easy to scale horizontally as your application grows.

Both services run on Railway's private network by default, ensuring secure internal communication with zero egress fees. Your application connects to Permify via gRPC (port 3478) or REST (port 3476) to perform permission checks, typically responding in under 10ms. Database migrations run automatically on startup, so you're ready to go immediately after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Permify DB | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Permify | `ghcr.io/permify/permify:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Permify DB | railway | Default database created when image is started. |
| `DATABASE_URL` | Permify DB | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Permify DB | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Permify DB | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Permify DB | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PERMIFY_LOG_LEVEL` | Permify | info | - |
| `PERMIFY_AUTHN_METHOD` | Permify | preshared | - |
| `PERMIFY_AUTHN_ENABLED` | Permify | true | - |
| `PERMIFY_DATABASE_ENGINE` | Permify | postgres | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `permify serve --database-auto-migrate=true`

**Category:** Authentication

[View on Railway →](https://railway.com/template/permify)
