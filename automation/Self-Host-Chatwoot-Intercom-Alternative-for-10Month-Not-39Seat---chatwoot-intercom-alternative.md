# Deploy Self-Host Chatwoot — Intercom Alternative for $10/Month, Not $39/Seat on Railway

Self-host Chatwoot: omnichannel support inbox. No $39/seat Intercom fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-intercom-alternative)

## About

![Chatwoot unified inbox dashboard](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773254106/chatwoot_dashboard_tyzipp.png)

Chatwoot is the open-source customer support platform with **22k+ GitHub stars** and 50,000+
self-hosted production installations — a unified inbox for live chat, email, WhatsApp,
Instagram, Facebook, Telegram, Line, and SMS, all from a single dashboard. MIT licensed,
Sentry SDK compatible, and fully self-hostable.

**Intercom starts at $39/seat/month. Zendesk at $19/seat/month. Freshdesk at $15/seat/month.**
Chatwoot on Railway costs ~$10–20/month flat for your entire team with no per-seat pricing
and full ownership of every conversation and customer record.

---

Running Chatwoot in production requires coordinating four services — Rails web server, Sidekiq
worker, PostgreSQL with the pgvector extension, and Redis — with shared encryption keys,
pre-deploy database migrations, and a public HTTPS endpoint for the agent dashboard and chat
widget. Without a managed host, you're configuring Docker Compose, SSL, shared secrets, and
migration scripts manually.

Railway handles all of it — pre-deploy migrations, auto-generated shared encryption keys,
and private networking across all four services.

Typical cost: **~$10–20/month** on Railway's Hobby plan. Intercom costs $39/seat/month —
$195/month for a 5-agent team. Zendesk is $95/month. Chatwoot stays flat whether you have
2 agents or 20.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:latest` | Database |
| Chatwoot | [railwayapp-templates/chatwoot](https://github.com/railwayapp-templates/chatwoot) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VALKEY_PORT` | Valkey | 6379 | - |
| `VALKEY_USER` | Valkey | (secret) | - |
| `VALKEY_PASSWORD` | Valkey | (secret) | - |
| `NODE_ENV` | Chatwoot | production | - |
| `RAILS_ENV` | Chatwoot | production | - |
| `DEFAULT_LOCALE` | Chatwoot | en | - |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | - |
| `INSTALLATION_ENV` | Chatwoot | docker | - |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/chatwoot-intercom-alternative)
