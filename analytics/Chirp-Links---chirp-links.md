# Deploy Chirp Links on Railway

Deploy private short links with bounded aggregate analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-links)

## About

Deploy Chirp Links as a polished, private routing desk with memorable short
URLs and deliberately bounded traffic analytics. One click provisions the web
application and PostgreSQL with generated credentials and no required form
fields.

Chirp Links runs as one Chirp web service backed by Railway PostgreSQL. The
database keeps routes, mutable destinations, availability state, click totals,
and bounded aggregates durable across restarts and updates. Railway supplies
the public domain, generated secrets, health checks, private networking, and a
persistent PostgreSQL volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [lbliii/chirp-links](https://github.com/lbliii/chirp-links) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created when Postgres starts. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL application user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL URL used by the Railway data panel. |
| `CHIRP_ENV` | web | production | Run Chirp Links with production safety defaults. |
| `DATABASE_URL` | web | - | Private Railway PostgreSQL connection. |
| `CHIRP_SECRET_KEY` | web | (secret) | Generated signing key for owner sessions. |
| `LINKS_ADMIN_TOKEN` | web | (secret) | Generated owner token for creating and managing short links. |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 | Skip startup migration because Railway runs the pre-deploy migration command. |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 | Python runtime used by Railpack. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Python, CSS, HTML

[View on Railway →](https://railway.com/deploy/chirp-links)
