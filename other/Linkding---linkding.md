# Deploy Linkding on Railway

Bookmark manager that tags, searches and archives web pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkding)

## About

Linkding is a self-hosted bookmark manager for people who collect a lot of links and want them to stay searchable and permanent. It organises bookmarks by tag rather than folder, fetches each site's title, description, icon and preview image, and can archive the page as a single HTML file so the content survives when the URL rots. Developers, researchers and archivists run it as a private replacement for Raindrop.io, Pinboard or Pocket, with browser extensions, RSS feeds and a REST API on top.

Self-host Linkding on Railway with two services and no manual setup. The **linkding** service runs the Django app behind uWSGI alongside its background task processor, with a volume at `/etc/linkding/data` for the secret key, favicons, preview images and snapshots. The **Postgres** service is Railway's managed PostgreSQL 18 and holds bookmarks, tags, users and sessions. Browsers reach linkding over its public Railway domain; the database stays private. Deploy Linkding by picking a username and password, and the first administrator is created on first boot.

![Diagram of the linkding and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788955067/linkding-architecture.png)

Linkding is a small Django application with a narrow scope: keep bookmarks, make them findable, and keep a copy of what they pointed at. Self-host it when a link collection is shared knowledge — engineering references, research sources, competitor tracking — and a commercial service holding that list is a privacy problem or a bill.

Key features:

- Tag-based organisation with full-text search across titles, descriptions, notes and URLs
- Automatic metadata: titles, descriptions, favicons and preview images
- Archiving as local HTML snapshots and on the Internet Archive, with a reader mode
- Bulk editing, unread and archived states, and bundles for saved filters
- Multi-user support with per-user bookmarks and public sharing
- REST API, RSS feeds, Firefox and Chrome extensions, and Netscape HTML import/export

The linkding service supervises two processes in one container — uWSGI serving HTTP and a huey worker running background jobs — because the job store is a file inside the data volume. Postgres replaces the default SQLite database, keeping records separate from files and giving you Railway's Data panel and backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| linkding | [gridalpha/linkding-railway](https://github.com/gridalpha/linkding-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | linkding | 9090 | Port Railway health-checks |
| `LD_DB_HOST` | linkding | - | Private database hostname |
| `LD_DB_PORT` | linkding | - | Database port |
| `LD_DB_USER` | linkding | (secret) | Database user |
| `LD_DB_ENGINE` | linkding | postgres | Use PostgreSQL, not SQLite |
| `LD_DB_DATABASE` | linkding | - | Database name |
| `LD_DB_PASSWORD` | linkding | (secret) | Database password |
| `LD_SERVER_PORT` | linkding | 9090 | Port uWSGI binds |
| `LD_HSTS_SECONDS` | linkding | 31536000 | HSTS max-age, 0 disables |
| `LD_SUPERUSER_NAME` | linkding | admin | First administrator username |
| `LD_SINGLEFILE_OPTIONS` | linkding | --browser-arg=\"--disable-dev-shm-usage\" | Chromium args for snapshots |
| `LD_SUPERUSER_PASSWORD` | linkding | (secret) | First administrator password |
| `LD_SUPERVISOR_MANAGED` | linkding | True | Background task logs to container output |
| `LD_CSRF_TRUSTED_ORIGINS` | linkding | - | Origin accepted for POST requests |
| `LD_TRUST_FORWARDED_PROTO` | linkding | true | Trust X-Forwarded-Proto from the edge |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/linkding/data`

**Category:** Other · **Languages:** Dockerfile, Python

[View on Railway →](https://railway.com/deploy/linkding)
