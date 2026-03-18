# Deploy Page Assist (Share) on Railway

Self-host page share for page asssist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VbiS2Q)

## About

The 'page share' feature is part of the Page Assist extension, allowing you to share chats publicly, similar to ChatGPT's sharing feature.

Extension: https://chromewebstore.google.com/detail/page-assist-a-web-ui-for/jfgfiigpkhlkbnfnbobbkinehhfdhndo

Repo: https://github.com/n4ze3m/page-assist

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | [n4ze3m/page-share-app](https://github.com/n4ze3m/page-share-app) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile, CSS

[View on Railway →](https://railway.com/template/VbiS2Q)
