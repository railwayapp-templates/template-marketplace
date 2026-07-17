# Deploy Chirp Queue on Railway

Private live service queue with tickets, operators, and PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-queue)

## About

Deploy Chirp Queue as a private, durable waiting line for small service desks,
event check-in, and lightweight in-person operations. One click provisions the
web application and PostgreSQL with generated credentials and no required input.

Chirp Queue runs as one async Chirp web service backed by Railway PostgreSQL.
Guests join without accounts and receive a private capability link. Operators use
revocable tokens to call, recall, start, skip, complete, or cancel tickets while a
number-only wallboard and each private ticket update live through server-rendered
HTML, named OOB blocks, and EventStream.

PostgreSQL remains the only queue truth across browser reconnects, application
restarts, releases, and rollbacks. The supported deployment deliberately uses one
web worker and one database—there is no Redis, background worker, email provider,
or SPA.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [lbliii/chirp-queue](https://github.com/lbliii/chirp-queue) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CHIRP_ENV` | web | production |
| `CHIRP_SECRET_KEY` | web | (secret) |
| `QUEUE_ADMIN_TOKEN` | web | (secret) |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `python app.py`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** Python, HTML

[View on Railway →](https://railway.com/deploy/chirp-queue)
