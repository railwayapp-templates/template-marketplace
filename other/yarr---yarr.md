# Deploy yarr on Railway

Web-based RSS and Atom feed reader with a three-pane interface

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yarr)

## About

Self-host yarr, a web-based RSS and Atom feed reader written as a single Go binary. It gives you the three-pane experience of a desktop newsreader — feed list, article list, article body — in a browser tab, with keyboard shortcuts, search across your subscriptions, OPML import and export, and a Fever-compatible API so apps like Reeder and Unread can sync against your own server. Writers, researchers and engineers use it to follow blogs, release feeds and news without an algorithmic timeline or a tracker on every article.

Deploy yarr on Railway and you get two services. The **yarr** service runs the published `nkanaev/yarr` image and serves the web UI on a generated public domain; it also runs the feed-fetching worker in the same process. The **Postgres** service holds every feed, article, star and preference on its own volume, reached over Railway's private network, so the database is never exposed to the internet. Sign-in credentials come from one variable, and the reader is closed to everyone else from the first request.

![Diagram of the yarr and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789630135/yarr-architecture.webp)

yarr is deliberately small. The server, feed parser, HTML sanitizer and compiled front end are one Go executable with the UI assets embedded in it, so the container starts in under a second and idles on a few dozen megabytes — a good fit for a reader you want to leave running for years.


Key features:

- Three-pane reading UI with folders, keyboard shortcuts and per-selection search
- Starring and read/unread state shared across every device you sign in from
- **Read Here** full-text extraction for feeds that publish truncated summaries
- OPML import and export, so moving in or out is a single file
- Fever API at `/fever` for third-party mobile and desktop clients
- Light, sepia and night themes, adjustable fonts, eight languages
- SQLite or PostgreSQL storage, selected by the connection string

The two services divide the work simply: yarr serves HTTP and polls your feeds, Postgres stores them. Because all state lives in the database, the app service needs no volume of its own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yarr | `nkanaev/yarr:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | yarr | 7070 | Port Railway health-checks |
| `YARR_DB` | yarr | - | Postgres connection string |
| `YARR_ADDR` | yarr | 0.0.0.0:7070 | Listen address, overrides loopback default |
| `YARR_AUTH` | yarr | - | Sign-in username and password |
| `YARR_BASE` | yarr | - | URL sub-path, blank for root |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `/usr/local/bin/yarr`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yarr)
