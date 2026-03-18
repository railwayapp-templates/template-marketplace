# Deploy Turso / libSQL Database (Auth / S3 Backup) on Railway

Turso-compatible database server with automatic JWT auth and S3 Backup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/turso-libsql-database-basic-auth)

## About

Host your own **libSQL (sqld)** instance, the open-source heart of **Turso**, directly on Railway. This template provides a SQLite-compatible database server maintaining full compatibility with the libSQL ecosystem and Drizzle ORM.

This deployment is secured using **JWT-based authentication** automatically generated on first deployment. It also contains a S3 bucket with continuus backups. See details below.

Hosting libSQL on Railway involves deploying a containerized `sqld` server paired with a persistent Railway Volume. This setup is secured via **JWT-based authentication** with Ed25519 signing keys, making it fully compatible with the libSQL SDK and Turso ecosystem. The server automatically generates  a cryptographically secure key pair and a long-lived access token (valid for 10 years) on first deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Turso / libSQL Database Server | `ghcr.io/eetezadi/railway-libsql:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of DB server |
| `SQLD_AUTH_JWT_KEY` | - | Copy from logs after first deployment, then redeploy |
| `LIBSQL_BOTTOMLESS_BUCKET` | - | Name of Bucket |
| `LIBSQL_BOTTOMLESS_ENDPOINT` | - | S3 Endpoint |
| `SQLD_ENABLE_BOTTOMLESS_REPLICATION` | true | Enable S3 Backups |
| `LIBSQL_BOTTOMLESS_AWS_ACCESS_KEY_ID` | - | Acces Key |
| `LIBSQL_BOTTOMLESS_AWS_DEFAULT_REGION` | - | Region |
| `LIBSQL_BOTTOMLESS_AWS_SECRET_ACCESS_KEY` | (secret) | Secret Pass |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sqld`

**Category:** Storage

[View on Railway →](https://railway.com/template/turso-libsql-database-basic-auth)
