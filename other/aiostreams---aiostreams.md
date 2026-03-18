# Deploy aiostreams on Railway

1-click deploy AIOStreams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aiostreams)

## About

1-click host AIOStreams on Railway.

https://github.com/Viren070/AIOStreams/blob/main/.env.sample

Check out the env sample above for more configuration options. Add the variables to the "aiostreams" service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| aiostreams | `ghcr.io/viren070/aiostreams` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | aiostreams | 3000 | - |
| `ADDON_ID` | aiostreams | aiostreams.viren070.com | - |
| `ADDON_NAME` | aiostreams | AIOStreams | - |
| `SECRET_KEY` | aiostreams | (secret) | - |
| `TMDB_API_KEY` | aiostreams | (secret) | - |
| `DEFAULT_PROXY_ID` | aiostreams | mediaflow | - |
| `LOG_SENSITIVE_INFO` | aiostreams | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/aiostreams)
