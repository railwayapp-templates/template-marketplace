# Deploy PostgreSQL 18 on Railway

Deploy and host PostgreSQL 18 on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-18-1)

## About

PostgreSQL 18 is the latest major release of the world's most advanced open-source relational database.

This version introduces performance improvements, enhanced security features, and a new data directory structure for better version management.

This template includes pre-configured SSL/TLS support for secure connections out of the box, and defaults to a security-patched Postgres 18.6 build — no configuration required to deploy.

Hosting PostgreSQL 18 on Railway provides a production-ready database with automatic SSL certificate management and secure connections.

This template uses the official PostgreSQL 18 Docker image with custom wrapper scripts that handle SSL certificate generation, renewal, and verification.

The database is configured with the new version-specific data directory structure (`/var/lib/postgresql/18/docker`), making future upgrades more seamless.

Railway's volume system ensures your data persists across deployments, while the platform handles networking, environment variables, and resource scaling automatically. Every variable ships with a secure, working default (auto-generated password, private networking, SSL enabled) — deploy the template and it works as-is, with no setup steps required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-18-ssl | [castab/postgres-18-ssl](https://github.com/castab/postgres-18-ssl) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Name of the default database created on first init. |
| `DATABASE_URL` | - | Full connection string for internal access from other services in the same Railway project. |
| `POSTGRES_USER` | (secret) | Superuser account created on first init. |
| `POSTGRES_VERSION` | 18.6 | Postgres image tag to build (must stay within the 18.x line - see Dockerfile 18). Build time only, unlike the other vars here which are read at container time. |
| `POSTGRES_PASSWORD` | (secret) | Auto-generated random password for POSTGRES_USER. |
| `DATABASE_PUBLIC_URL` | - | Full connection string for external access via Railway's public TCP proxy. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/postgresql-18-1)
