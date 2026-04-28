# Deploy pgAdmin on Railway

The most popular admin web interface for PostgreSQL databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/h1EXJT)

## About

pgAdmin is the most widely used open-source administration and development platform for PostgreSQL. It provides a web-based GUI for managing databases, running queries, inspecting schemas, monitoring server activity, and performing backups — all without needing a local PostgreSQL client installed.

pgAdmin runs as a single Docker container that serves a full-featured database management interface. This Railway template deploys the official image with the admin email and password configured at deploy time. No persistent volume is required for basic use — server connection definitions can be saved to the container, though they will reset on redeploy unless a volume is attached. pgAdmin is most useful when deployed alongside a Railway PostgreSQL service; connect to it by adding a new server in pgAdmin using Railway's internal `DATABASE_URL` credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin | `dpage/pgadmin4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5050 | - |
| `PGADMIN_LISTEN_PORT` | 5050 | Port that the server listens on |
| `PGADMIN_DEFAULT_EMAIL` | - | Email address used when setting up the initial administrator account to login to pgAdmin. |
| `PGADMIN_LISTEN_ADDRESS` | 0.0.0.0 | Local address that the servers listens on |
| `PGADMIN_DISABLE_POSTFIX` | True | Whether to use built-in Postfix server or an external mail server. |
| `PGADMIN_DEFAULT_PASSWORD` | (secret) | Password used when setting up the initial administrator account to login to pgAdmin. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/h1EXJT)
