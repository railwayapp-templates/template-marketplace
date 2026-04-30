# Deploy warm-cool on Railway

Deploy and Host warm-cool with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/warm-cool)

## About

asdasd

asdasd

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| asdasd | [malsem32/asdasd](https://github.com/malsem32/asdasd) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | asdasd | production | - |
| `JWT_SECRET` | asdasd | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** HTML, JavaScript, CSS, Batchfile, Dockerfile

[View on Railway →](https://railway.com/deploy/warm-cool)
