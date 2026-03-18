# Deploy Flare on Railway

A modern, lightning-fast file sharing platform built for self-hosting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JVT41u)

## About

Flare is a modern, self-hostable file-sharing platform that makes sharing your files easier than ever. You can learn more about Flare's features [here](https://github.com/FlintSH/flare).

This Railway template is officially supported and lets you deploy Flare with just a few clicks—no complicated setup required. It comes pre-configured and ready to go, so you can get your instance up and running rapidly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flare | `flintsh/flare` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | Flare | - | Your Flare instance's main database connection URL. |
| `NEXTAUTH_SECRET` | Flare | (secret) | A secure string used to encrypt user sessions. Treat it like you are creating a secure password. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/JVT41u)
