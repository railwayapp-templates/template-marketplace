# Deploy Miniflux | Open Source Feedly Alternative on Railway

Self Host Miniflux on Railway. RSS + Atom + JSON feeds.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/miniflux)

## About

Miniflux is a minimalist, open-source RSS and Atom feed reader written in Go that lets you self-host a clean, privacy-respecting alternative to Feedly, Inoreader, or NewsBlur. Self-hosting Miniflux on Railway gives you full ownership of your reading list — no trackers, no ads, no algorithm — backed by a single Go binary and a PostgreSQL database.

This Railway template deploys the official `miniflux/miniflux` Docker image alongside a managed PostgreSQL database, automatically runs schema migrations, bootstraps the first admin user, and exposes the web UI on a Railway-generated HTTPS domain.

![Miniflux Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778608837/374ddac3-6e9c-428b-a25f-126db81f59f4.png)

Miniflux is a self-contained Go server with no external runtime dependencies beyond PostgreSQL. It fetches RSS/Atom/JSON feeds on a configurable schedule, dedupes entries, optionally scrapes full article content, strips tracking pixels, and serves a fast keyboard-driven web UI plus a REST API and Fever-compatible API.

Key features:
- Reads RSS, Atom, RDF, and JSON feeds
- Built-in integrations: Pocket, Wallabag, Instapaper, Pinboard, Telegram, Matrix, Apprise, and 15+ more
- Mobile and PWA-friendly with offline reading
- Full-text article scraping and reader-mode rendering
- REST API plus Fever API compatibility for third-party clients (Reeder, FeedMe, etc.)
- OAuth2 / OpenID Connect single sign-on (Google, Generic OIDC)
- Per-feed rules for blocking, keeping, rewriting, and content filtering

The architecture is intentionally simple: a single stateless Miniflux container talks to a single PostgreSQL database. No Redis, no message broker, no background worker pool to babysit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Miniflux | `miniflux/miniflux:2.2.19` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Miniflux | 8080 | Force bind to 0.0.0.0:$PORT |
| `HTTPS` | Miniflux | 1 | Enable HSTS and secure cookies |
| `BASE_URL` | Miniflux | - | Public-facing HTTPS URL |
| `LOG_LEVEL` | Miniflux | info | Log verbosity |
| `LOG_FORMAT` | Miniflux | json | Structured logs for Railway |
| `CREATE_ADMIN` | Miniflux | 1 | Bootstrap admin user on first boot |
| `DATABASE_URL` | Miniflux | - | Postgres connection with SSL disabled |
| `ADMIN_PASSWORD` | Miniflux | (secret) | Bootstrap admin password (one-time read) |
| `ADMIN_USERNAME` | Miniflux | (secret) | Bootstrap admin username |
| `RUN_MIGRATIONS` | Miniflux | 1 | Run idempotent schema migrations |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/miniflux)
