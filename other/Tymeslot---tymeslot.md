# Deploy Tymeslot on Railway

Self-hostable meeting scheduler with calendar sync and video conferencing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tymeslot)

## About

Tymeslot is an open-source meeting scheduling platform. Share a booking link, let guests pick an available slot, and get a confirmed meeting — automatically synced to your calendar with video conferencing links and email invites included. Built on Elixir and Phoenix LiveView.

Tymeslot is a single Elixir/Phoenix application backed by PostgreSQL. Hosting it means running the app server and a database — Railway handles both. On first boot, Tymeslot runs database migrations automatically and starts serving traffic. You will need to supply a handful of environment variables: a secret key base, SMTP credentials for sending confirmation emails, and OAuth credentials for at least one calendar provider (Google, Outlook, or a CalDAV server). Everything else has sensible defaults and works out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tymeslot | [Tymeslot/tymeslot](https://github.com/Tymeslot/tymeslot) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PHX_SERVER` | tymeslot | true | - |
| `EMAIL_ADAPTER` | tymeslot | test | E-Mails must be enabled, consider using smtp and connecting your e-mail, see docs |
| `POSTGRES_USER` | tymeslot | (secret) | - |
| `DEPLOYMENT_TYPE` | tymeslot | docker | - |
| `EMAIL_FROM_NAME` | tymeslot | Your From Name | - |
| `SECRET_KEY_BASE` | tymeslot | (secret) | Change this to a secret key |
| `POSTGRES_PASSWORD` | tymeslot | (secret) | - |
| `EMAIL_FROM_ADDRESS` | tymeslot | your@domain.com | - |
| `ENABLE_GITHUB_AUTH` | tymeslot | false | - |
| `ENABLE_GOOGLE_AUTH` | tymeslot | false | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Elixir, CSS, JavaScript, Shell, HTML

[View on Railway →](https://railway.com/deploy/tymeslot)
