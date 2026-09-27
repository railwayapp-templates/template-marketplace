# Deploy Comentario on Railway

Privacy-first comments for blogs, a Disqus alternative, on PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/comentario)

## About

Comentario is an open source comment engine you embed in any web page with one script tag: nested comments with Markdown, voting, moderation, live updates, and login with email, social providers, OpenID Connect or SSO. It adds no tracking scripts, pixels or ads, which is the point of running your own instead of Disqus. This template deploys Comentario with PostgreSQL, and Comentario's own README lists it as the way to run Comentario on Railway.

Comentario is a single Go binary with a built-in frontend. The **Comentario** service builds from a small repository that wraps the official image and renders the database secrets file at build time from the PostgreSQL connection variables; it serves the admin UI and the embed script on a public domain with a health check on `/en/`. **Postgres** is Railway's SSL-enabled PostgreSQL 17 on a volume, reached over the private network. `BASE_URL` is set to the service's public domain so links in emails and the embed script resolve correctly.

After deploying, open the domain, create the first user (the superuser), add your website as a domain in the admin UI, and paste the embed snippet into your pages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Comentario | [ThallesP/comentario-on-railway](https://github.com/ThallesP/comentario-on-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Comentario | 80 | Port to listen on, Comentarios uses 80 by default |
| `BASE_URL` | Comentario | - | The host URL where Comentario will use |
| `POSTGRES_HOST` | Comentario | - | Host to connect to Comentario's Postgres. |
| `POSTGRES_PORT` | Comentario | - | Port to connect to Comentario's Postgres. |
| `POSTGRES_DATABASE` | Comentario | - | Database name to connect to Comentario's Postgres. |
| `POSTGRES_PASSWORD` | Comentario | (secret) | Password to connect to Comentario's Postgres. |
| `POSTGRES_USERNAME` | Comentario | (secret) | Username to connect to Comentario's Postgres. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/en/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/comentario)
