# Deploy Comentario on Railway

Comment system that adds discussions to any web page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/comentario-comments)

## About

Comentario is an open-source, privacy-first comment engine that adds threaded discussions to any web page with two lines of HTML. It is the actively maintained successor to Commento, rewritten in Go and TypeScript, and it ships no trackers and no advertising — the embed adds roughly 20 KB to a page. Bloggers, documentation teams and static-site owners use it to replace Disqus without handing readers' data to an advertising network.

Self-host Comentario on Railway and this template wires the whole stack together: the Comentario server on a public HTTPS domain, and managed PostgreSQL on the private network holding comments, users, domains, moderation state and settings. Browsers load the embed from your Comentario domain and talk to its REST API; the server is the only service exposed to the internet, and the database is never publicly routable. A stable signing key is generated at deploy time, so sessions and emailed links survive redeploys.

![Diagram of the Comentario and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787640407/comentario-architecture.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| comentario | `registry.gitlab.com/comentario/comentario:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | comentario | 8080 | HTTP server listening port |
| `BASE_URL` | comentario | - | Public-facing instance URL |
| `LOG_LEVEL` | comentario | info | Log verbosity level |
| `COMENTARIO_POSTGRES_HOST` | comentario | - | Private database hostname |
| `COMENTARIO_POSTGRES_PORT` | comentario | - | Database port |
| `COMENTARIO_POSTGRES_DATABASE` | comentario | - | Database name |
| `COMENTARIO_POSTGRES_PASSWORD` | comentario | (secret) | Database password |
| `COMENTARIO_POSTGRES_SSL_MODE` | comentario | disable | Private network needs no TLS |
| `COMENTARIO_POSTGRES_USERNAME` | comentario | (secret) | Database user |
| `COMENTARIO_SERVER_SIGNING_KEY` | comentario | - | Signs sessions and emailed links |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/api/config`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/comentario-comments)
