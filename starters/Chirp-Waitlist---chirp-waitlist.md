# Deploy Chirp Waitlist on Railway

Deploy a private referral waitlist with cohorts, live totals, and export.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-waitlist)

## About

Deploy Chirp Waitlist as a polished launch page and private signup desk. One
click provisions the web application and PostgreSQL with generated credentials,
private service wiring, and no required configuration fields.

Chirp Waitlist runs as one Chirp web service backed by Railway PostgreSQL. The
public page collects duplicate-safe signups, gives new participants a
browser-held referral link, and shows live aggregate activity. The private owner
desk provides search, cohorts, invite states, retention, deletion, theming, and
formula-safe CSV export.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [lbliii/chirp-waitlist](https://github.com/lbliii/chirp-waitlist) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CHIRP_ENV` | web | production | Run Chirp Waitlist with production safety defaults. |
| `DATABASE_URL` | web | - | Private Railway PostgreSQL connection. |
| `CHIRP_SECRET_KEY` | web | (secret) | Generated signing key for participant and owner sessions. |
| `WAITLIST_ADMIN_TOKEN` | web | (secret) | Generated owner token for managing signups, cohorts, and invites. |
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

**Category:** Starters · **Languages:** Python, CSS, HTML

[View on Railway →](https://railway.com/deploy/chirp-waitlist)
