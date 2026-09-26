# Deploy Job Finder on Railway

Private job search and review stack with PostgreSQL and Dagster.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/job-finder)

## About

Job Finder searches job boards, scores listings against your preferences, and
puts the strongest matches in a private review queue. This template creates a
review app, a PostgreSQL database, a Dagster webserver, and a Dagster daemon in
one Railway project. Railway generates the initial secrets when you deploy it.

The review app is the only public service. PostgreSQL and both Dagster services
communicate over Railway's private network. PostgreSQL stores search results,
feedback, Dagster state, and encrypted provider credentials. A persistent
volume holds its data. You pay Railway for the services and any external API
usage you choose to enable. Keep the project private and use a separate project
for each person whose data should be isolated.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| review | [mauricedesaxe/job-finder](https://github.com/mauricedesaxe/job-finder) | Web service |
| dagster-daemon | [mauricedesaxe/job-finder](https://github.com/mauricedesaxe/job-finder) | Worker |
| dagster-webserver | [mauricedesaxe/job-finder](https://github.com/mauricedesaxe/job-finder) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JOB_FINDER_BOOTSTRAP_TOKEN` | review | (secret) | - |
| `JOB_FINDER_REVIEW_COOKIE_SECURE` | review | true | Secure session cookies for the public review app. |
| `JOB_FINDER_REVIEW_SESSION_SECRET` | review | (secret) | - |
| `JOB_FINDER_CREDENTIAL_ENCRYPTION_KEY` | review | (secret) | - |
| `JOB_FINDER_CREDENTIAL_ENCRYPTION_KEY` | dagster-daemon | (secret) | Use the review service encryption key to decrypt provider credentials. |
| `PORT` | dagster-webserver | 3000 | Private Dagster webserver port. |
| `JOB_FINDER_CREDENTIAL_ENCRYPTION_KEY` | dagster-webserver | (secret) | Use the review service encryption key to decrypt provider credentials. |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `sh -c 'exec uv run --no-sync uvicorn scripts.serve_review:create_app --factory --host 0.0.0.0 --port ${PORT:-8080}'`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'uv run --no-sync python scripts/init_dagster_schema.py && exec uv run --no-sync dagster-daemon run -w workspace.yaml'`
- **Start command:** `sh -c 'uv run --no-sync python scripts/init_dagster_schema.py && exec uv run --no-sync dagster-webserver -h 0.0.0.0 -p 3000 -w workspace.yaml'`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, PLpgSQL, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/job-finder)
