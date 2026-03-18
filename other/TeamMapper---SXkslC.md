# Deploy TeamMapper on Railway

The open-source web application to draw mind maps together.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/SXkslC)

## About

<p align="center">
    <a href="https://teammapper.org/">
        <img style="width: 250px;" src="https://www.teammapper.org/assets/icons/teammapper.svg" alt="teammapper logo">
    </a>
</p>

<h3 align="center">The open-source web application to draw mind maps together.</h3>
- Collaborate together on mind maps
- Share mind maps with others - either by a QR code or by providing the link.
- Add images, colors, font properties and links to nodes
- Import and export functionality


### Colors and Images
Colors and images of mind maps exploit brain characteristics to express concepts in a more effective and lasting way

### Radial Tree
Hierarchical structure of mind maps exploits the radial geometry, which is divided on several levels and facilitates concept expressiveness.

### Uses
Mind maps are particularly effective to learn or organize ideas, for example in educational or business contexts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| TeamMapper | `ghcr.io/b310-digital/teammapper:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `MODE` | TeamMapper | PROD | - |
| `PORT` | TeamMapper | 3000 | - |
| `POSTGRES_SSL` | TeamMapper | false | - |
| `POSTGRES_PORT` | TeamMapper | 5432 | - |
| `POSTGRES_USER` | TeamMapper | (secret) | - |
| `DELETE_AFTER_DAYS` | TeamMapper | 30 | - |
| `POSTGRES_PASSWORD` | TeamMapper | (secret) | - |
| `POSTGRES_QUERY_TIMEOUT` | TeamMapper | 100000 | - |
| `POSTGRES_STATEMENT_TIMEOUT` | TeamMapper | 100000 | - |
| `POSTGRES_SSL_REJECT_UNAUTHORIZED` | TeamMapper | false | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 10 && /home/node/app/entrypoint.prod.sh"`
- **Healthcheck:** `/map`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/SXkslC)
