# Deploy GoAlert on Railway

On-call scheduling and escalations — self-hosted PagerDuty alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/goalert)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/goalert?utm_medium=integration&utm_source=button&utm_campaign=goalert)

[GoAlert](https://goalert.me/) is open-source on-call scheduling, automated escalations, and notifications — built and battle-tested by Target. Rotations, escalation policies, and alerts that reach the right person by SMS, voice call, Slack, email, or web push, so you never miss a critical page. A self-hosted alternative to PagerDuty and the sunsetting Opsgenie, with no per-user pricing.

This template runs GoAlert as a single service next to a Postgres database — that's the whole stack. All state (schedules, policies, alerts, users) lives in Postgres, so the app service needs no volume and restarts cleanly. Database migrations run automatically on every deploy, and your first admin account is created from the `ADMIN_USERNAME` / `ADMIN_PASSWORD` template variables on first boot. Alert data is encrypted at rest with the generated `GOALERT_DATA_ENCRYPTION_KEY`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| goalert | [nomideusz/goalert-railway](https://github.com/nomideusz/goalert-railway) (root: /) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ADMIN_EMAIL` | goalert | - | Email for the first admin account (optional) |
| `DATABASE_URL` | goalert | - | Postgres connection - wired to the bundled database, leave as is |
| `ADMIN_PASSWORD` | goalert | (secret) | Auto-generated - first admin account password |
| `ADMIN_USERNAME` | goalert | (secret) | First admin account username, created on first boot |
| `GOALERT_PUBLIC_URL` | goalert | - | Leave empty - derived from your Railway domain automatically |
| `GOALERT_DATA_ENCRYPTION_KEY` | goalert | - | Auto-generated - encrypts alert data and API keys at rest |
| `POSTGRES_DB` | postgres | goalert | Database name |
| `POSTGRES_USER` | postgres | (secret) | Database superuser (GoAlert enables pgcrypto itself) |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/goalert)
