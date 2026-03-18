# Deploy Memos on Railway

A privacy-first, lightweight note-taking service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/RaK3xU)

## About

<p align="center">
    <a href="https://www.usememos.com">
        <img style="background: #E5E5E5; padding: 30px; border-radius: 5px; width: 400px;" src="https://www.usememos.com/full-logo-landscape.png" alt="memos logo">
    </a>
</p>

<h3 align="center">A privacy-first, lightweight note-taking service. Easily capture and share your great thoughts</h3>

In a world inundated with information, effective note-taking is the key to organizing, retaining, and accessing knowledge. **Memos** offers a powerful solution for managing your thoughts, ideas, and information. This document will walk you through the art of creating and managing your memos.

![demo](https://www.usememos.com/demo.png)

### Key points

- **Open source and free forever**. Embrace a future where creativity knows no boundaries with our open-source solution – free today, tomorrow, and always.
- **Self-hosting with Docker in just seconds**. Enjoy the flexibility, scalability, and ease of setup that Docker provides, allowing you to have full control over your data and privacy.
- **Pure text with added Markdown support.** Say goodbye to the overwhelming mental burden of rich formatting and embrace a minimalist approach.
- **Customize and share your notes effortlessly**. With our intuitive sharing features, you can easily collaborate and distribute your notes with others.
- **RESTful API for third-party services.** Embrace the power of integration and unleash new possibilities with our RESTful API support.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:15` | Database |
| Memos | `neosmemo/memos:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public Database URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private database URL |
| `PORT` | Memos | - | Let Railway know what port memos is running on |
| `MEMOS_DSN` | Memos | - | Database source name |
| `MEMOS_MODE` | Memos | prod | Mode of server, can be "prod" or "dev" or "demo" |
| `MEMOS_PORT` | Memos | 8081 | Port of the server |
| `MEMOS_DRIVER` | Memos | postgres | Database driver |
| `MEMOS_METRIC` | Memos | false | Disallow metric collection |
| `PGHOST_PRIVATE` | Memos | - | Private database host, used for database liveness check |
| `PGPORT_PRIVATE` | Memos | - | Private database port, used for database liveness check |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Memos | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`

**Category:** Other

[View on Railway →](https://railway.com/template/RaK3xU)
