# Deploy Shiori on Railway

Bookmark manager that saves a readable copy of every page you keep

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shiori)

## About

Shiori is a self-hosted bookmark manager written in Go that saves a readable copy of every page you bookmark, so your reading list survives link rot and the shutdown of whichever read-later service you were using. It is a single binary with a clean web interface, a REST API, browser extensions for Firefox and Chrome, and importers for Netscape bookmark files and Pocket exports. Developers, researchers and writers self-host Shiori as a private replacement for Pocket, Instapaper and Raindrop.io.

This setup runs Shiori as two Railway services. The `shiori` service serves the web interface and API on a public HTTPS domain and stores page archives, thumbnails and generated ebooks on a persistent volume. The `Postgres` service holds bookmarks, tags and accounts over Railway's private network. Deploy Shiori on Railway and both start together with a working owner account already created, so there is no installer and no default password left in place.

![Diagram of the Shiori and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788951527/shiori-architecture.png)

Shiori solves a problem every long-lived reading list eventually hits: the pages go away. A hosted bookmarking service keeps the link, not the content, so a dead domain takes your note with it. Shiori stores the article text and, optionally, a complete offline archive, on storage you control — and your reading history is not an advertising signal.

Key features:

- Add, edit, delete, tag and full-text search bookmarks from the web interface or the command line
- Automatic readable-content extraction, plus optional full page archives and EPUB generation
- Import from Netscape bookmark files and from a Pocket export; export back to a Netscape file
- SQLite, PostgreSQL and MySQL/MariaDB backends from the same binary
- A documented REST API and browser extensions for Firefox and Chrome
- Optional header-based SSO for teams already running an authenticating proxy

The architecture is deliberately small. `shiori` is one Go process serving HTTP; it fetches pages itself when you save them, writes archives and thumbnails to its volume, and keeps every record in `Postgres`. Nothing else is required — there is no queue, no worker tier and no external cache to run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| shiori | [gridalpha/shiori-railway](https://github.com/gridalpha/shiori-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | shiori | 8080 | HTTP port Railway probes and routes |
| `SHIORI_DIR` | shiori | /data/shiori | Archives, thumbnails and ebooks on the volume |
| `SHIORI_DATABASE_URL` | shiori | - | Postgres connection string |
| `SHIORI_ADMIN_PASSWORD` | shiori | (secret) | Password for that owner account |
| `SHIORI_ADMIN_USERNAME` | shiori | (secret) | Owner account created on first boot |
| `SHIORI_HTTP_SECRET_KEY` | shiori | (secret) | Signs session tokens |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/system/liveness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/shiori)
