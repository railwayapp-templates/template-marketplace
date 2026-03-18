# Deploy glorious-eagerness on Railway

Deploy and Host glorious-eagerness with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/glorious-eagerness)

## About

SDLkfj slkfjdds
al;ksdfs

SDLkfj slkfjdds
al;ksdfs

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | - | Railway Private Domain |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/glorious-eagerness)
