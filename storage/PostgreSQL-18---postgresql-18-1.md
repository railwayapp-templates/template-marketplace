# Deploy PostgreSQL 18 on Railway

Deploy and host PostgreSQL 18 on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-18-1)

## About

PostgreSQL 18 is the latest major release of the world's most advanced open-source relational database.

This version introduces performance improvements, enhanced security features, and a new data directory structure for better version management. 

This template includes pre-configured SSL/TLS support for secure connections out of the box.

Hosting PostgreSQL 18 on Railway provides a production-ready database with automatic SSL certificate management and secure connections. 

This template uses the official PostgreSQL 18 Docker image with custom wrapper scripts that handle SSL certificate generation, renewal, and verification. 

The database is configured with the new version-specific data directory structure (`/var/lib/postgresql/18/docker`), making future upgrades more seamless.

Railway's volume system ensures your data persists across deployments, while the platform handles networking, environment variables, and resource scaling automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-18-ssl | [castab/postgres-18-ssl](https://github.com/castab/postgres-18-ssl) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/postgresql-18-1)
