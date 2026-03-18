# Deploy HedgeDoc on Railway

An open-source, web-based, self-hosted, collaborative markdown editor.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9CXSkd)

## About

## Ideas grow better together.

HedgeDoc (formerly known as CodiMD) is an open-source, web-based, self-hosted, collaborative markdown editor.

You can use it to easily collaborate on notes, graphs and even presentations in real-time. All you need to do is to share your note-link to your co-workers and they’re ready to go.

### Deployment

This template is a one-click deploy on railway. Once the deployment completes and you are allocated a URL, Hedgedoc will begin working.

### Configuration

Please use the environment variables in the [configuration docs](https://docs.hedgedoc.org/configuration/).

### Notes

This template uses an older version of Postgres, because Hedgedoc uses an older version of Postgres.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:13.4-alpine` | Database |
| HedgeDoc | `quay.io/hedgedoc/hedgedoc:alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CMD_PORT` | HedgeDoc | 3000 |
| `CMD_DB_DIALECT` | HedgeDoc | postgres |
| `CMD_SESSION_SECRET` | HedgeDoc | (secret) |
| `CMD_PROTOCOL_USESSL` | HedgeDoc | true |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | HedgeDoc | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hedgedoc/public/uploads`

**Category:** CMS

[View on Railway →](https://railway.com/template/9CXSkd)
