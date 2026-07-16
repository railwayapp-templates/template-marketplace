# Deploy Chirp Changelog on Railway

Deploy a polished Chirp changelog and release-notes site with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-changelog)

## About

Launch a polished public changelog and release-notes archive powered by Chirp and PostgreSQL. Publish safe Markdown updates, keep drafts private, organize releases with tags, and give visitors searchable HTML, stable permalinks, and a standards-based Atom feed.

The template provisions one Chirp web service and one Railway-managed PostgreSQL service. Railway generates the application signing key and owner token, supplies the database URL and public domain, runs database migrations before each release is promoted, and checks `/ready` before routing traffic to the deployment.

The application uses server-rendered HTML with HTMX enhancements, so every owner workflow also works without JavaScript. PostgreSQL owns all durable release data. Redis is not required because Chirp uses signed cookie sessions and the starter does not depend on a shared cache, job queue, or cross-worker realtime fan-out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [lbliii/chirp-changelog](https://github.com/lbliii/chirp-changelog) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CHIRP_SECRET_KEY` | web | (secret) |
| `CHANGELOG_ADMIN_TOKEN` | web | (secret) |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** Python, CSS, HTML

[View on Railway →](https://railway.com/deploy/chirp-changelog)
