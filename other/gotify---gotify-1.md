# Deploy gotify on Railway

Gotify — self-hosted push notification server with web UI and API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotify-1)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

This template runs as a single container with no external database dependencies. All data is stored using built-in storage — no PostgreSQL, Redis, or additional services required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotify | [INAPP-Mobile/railway-gotify](https://github.com/INAPP-Mobile/railway-gotify) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GOTIFY_REGISTRATION` | false | Allow public user registration (true/false). Default is false — disable to prevent open signups. |
| `GOTIFY_DATABASE_DIALECT` | sqlite3 | Database engine: sqlite3, mysql, or postgres. SQLite is built-in and automatic. |
| `GOTIFY_DEFAULTUSER_NAME` | admin | Default admin username for the Gotify web UI. |
| `GOTIFY_DEFAULTUSER_PASS` | - | Default admin password. Auto-generated on first deploy — change after setup. |
| `GOTIFY_DATABASE_CONNECTION` | data/gotify.db | Database connection string. For SQLite: data/gotify.db. For Postgres: ${{Postgres.DATABASE_URL}} |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/gotify-1)
