# Deploy Chirp Feedback Board on Railway

Deploy a polished Chirp feedback and roadmap board with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-feedback-board)

## About

Launch a polished public feedback board and product roadmap powered by Chirp and PostgreSQL. Visitors can submit ideas, search and filter the roadmap, and vote once per suggestion. The generated administrator token unlocks lightweight moderation for moving ideas through the roadmap or removing them.

The template provisions one Chirp web service and one Railway-managed PostgreSQL service. Railway generates the application signing key and administrator token, supplies the database URL, runs database migrations before each release is promoted, and checks `/ready` before routing traffic to the new deployment.

The application uses server-rendered HTML with HTMX enhancements, so every core workflow also works without JavaScript. PostgreSQL owns all durable state. Redis is not required for this single-replica starter because Chirp uses signed cookie sessions and the application does not depend on a shared cache, job queue, or cross-worker realtime fan-out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [lbliii/chirp-feedback-board](https://github.com/lbliii/chirp-feedback-board) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CHIRP_SECRET_KEY` | web | (secret) |
| `CHIRP_ADMIN_TOKEN` | web | (secret) |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, CSS, HTML

[View on Railway →](https://railway.com/deploy/chirp-feedback-board)
