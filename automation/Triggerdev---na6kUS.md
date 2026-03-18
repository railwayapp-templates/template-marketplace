# Deploy Trigger.dev on Railway

Open source background jobs framework for TypeScript.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/na6kUS)

## About

✨ Trigger.dev is the open source background jobs framework for TypeScript. With features like API integrations, webhooks, scheduling and delays.

Create long-running jobs directly in your codebase with features like API integrations, webhooks, scheduling and delays.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Trigger.dev | `ghcr.io/triggerdotdev/trigger.dev:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Trigger.dev | 3030 | - |
| `APP_ORIGIN` | Trigger.dev | - | The public URL |
| `DIRECT_URL` | Trigger.dev | - | Needs to match DATABASE_URL |
| `FROM_EMAIL` | Trigger.dev | - | Used for magic-link signup/login system |
| `LOGIN_ORIGIN` | Trigger.dev | (secret) | The public URL |
| `REMIX_APP_PORT` | Trigger.dev | 3030 | - |
| `REPLY_TO_EMAIL` | Trigger.dev | - | Used for magic-link signup/login system |
| `RESEND_API_KEY` | Trigger.dev | (secret) | Used for magic-link signup/login system |
| `SESSION_SECRET` | Trigger.dev | (secret) | - |
| `MAGIC_LINK_SECRET` | Trigger.dev | (secret) | - |
| `AUTH_GITHUB_CLIENT_ID` | Trigger.dev | - | Required if you plan on logging in with GitHub auth |
| `AUTH_GITHUB_CLIENT_SECRET` | Trigger.dev | (secret) | Required if you plan on logging in with GitHub auth |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/na6kUS)
