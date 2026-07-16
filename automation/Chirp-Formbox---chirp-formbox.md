# Deploy Chirp Formbox on Railway

Deploy a private form backend and searchable submission inbox.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-formbox)

## About

Deploy Chirp Formbox as a polished receiving desk for static-site forms. One
click provisions the web application and PostgreSQL with generated credentials,
private service wiring, and no required configuration fields.

Chirp Formbox runs as one Chirp web service backed by Railway PostgreSQL. Each
form endpoint has a generated ingestion token and an explicit allowed-origin
boundary. PostgreSQL keeps form configuration and submissions durable across
restarts and updates, while the owner inbox provides search, archive, deletion,
and safe CSV export.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [lbliii/chirp-formbox](https://github.com/lbliii/chirp-formbox) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CHIRP_ENV` | web | production | Run Chirp Formbox with production safety defaults. |
| `DATABASE_URL` | web | - | Private Railway PostgreSQL connection. |
| `CHIRP_SECRET_KEY` | web | (secret) | Generated signing key for owner sessions. |
| `FORMBOX_ADMIN_TOKEN` | web | (secret) | Generated owner token for creating endpoints and managing submissions. |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 | Skip startup migration because Railway runs the pre-deploy migration command. |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 | Python runtime used by Railpack. |
| `POSTGRES_DB` | Postgres | railway | Database created when Postgres starts. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL application user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL URL used by the Railway data panel. |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, CSS, HTML

[View on Railway →](https://railway.com/deploy/chirp-formbox)
