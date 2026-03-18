# Deploy memos on Railway

A privacy-first, lightweight note-taking app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/memos)

## About

Hosting Memos on [Railway](https://railway.app) is simple. We run the official Docker image (`neosmemo/memos:stable`) connected to a managed Railway PostgreSQL database. The app and database communicate over Railway’s private network, ensuring secure connections with no public exposure of the database. Railway handles hosting, scaling, SSL, and provides a public URL so you can start using Memos immediately after deployment.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memos | `neosmemo/memos:stable` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | memos | - | Railway will generate public url based on this. |
| `MEMOS_DSN` | memos | - | Database url of postgres instance |
| `MEMOS_MODE` | memos | prod | Sets the mode of the server, can be "prod" and "dev" |
| `MEMOS_PORT` | memos | 8081 | sets port where server will be live |
| `MEMOS_DRIVER` | memos | postgres | sets the database driver to be used by Memos |
| `MEMOS_METRIC` | memos | false | stop metric collection |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/memos)
