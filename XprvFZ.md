# Deploy Payload CMS V3 w/ PostgreSQL on Railway

Payload V3 ready to use with DB -

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/XprvFZ)

## About

The top Payload CMS template wasn't being updated so I created my own. This template is an instant deploy thats ready to go with zero configuration. Feel free to make the template your own or submit issues. 

https://github.com/pixel8ted/payload-railway-pg-template

Official Payload Docs:
https://payloadcms.com/docs/getting-started/what-is-payload

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Payload CMS v3 | [pixel8ted/payload-railway-pg-template](https://github.com/pixel8ted/payload-railway-pg-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOSTNAME` | Payload CMS v3 | 0.0.0.0 | - |
| `DATABASE_URI` | Payload CMS v3 | - | URL to connect to Postgres |
| `PAYLOAD_SECRET` | Payload CMS v3 | (secret) | A secure, unguessable string that Payload will use for any encryption workflows - for example, password salt / hashing. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node .next/standalone/server.js`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/template/XprvFZ)
