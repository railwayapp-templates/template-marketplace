# Deploy Postgres Backup API on Railway

One-click API endpoint to download PostgreSQL database backup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-backup-api)

## About

The Postgres Backup API is a lightweight Node.js service that allows you to securely download highly-compressed PostgreSQL database backups via a single HTTP endpoint. It streams the `pg_dump` output directly to your browser or terminal without consuming local disk space, ensuring fast, out-of-memory-safe database exports.

Hosting this backup service on Railway involves deploying a lightweight container capable of running both Node.js and the native PostgreSQL client tools.

When deployed on Railway, the Express server listens for HTTP GET requests on the `/` route. To ensure safety in a public cloud environment, the deployment relies on environment variables to establish the database connection and enforce token-based authentication for all backup requests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-backup-api | [darseen/postgres-backup-api](https://github.com/darseen/postgres-backup-api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port |
| `DATABASE_URL` | - | Your Postgres database's internal or external URL |
| `SECRET_TOKEN` | (secret) | Secure your backup endpoint using a secret token |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-backup-api)
