# Deploy Chatwoot (Self-Hosted Intercom Alternative) on Railway

Self-hosted Intercom alternative — live chat, shared inbox & helpdesk

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-self-hosted-intercom-alternativ)

## About

Chatwoot is an open-source customer engagement suite — a self-hosted alternative to Intercom, Zendesk, and Freshdesk. Give your team a shared inbox for live chat, email, and social channels, plus canned responses, automation rules, and a help center, all from one instance you own. [Updated August '26]

This template runs the full Chatwoot stack: a Rails web server, a Sidekiq worker for background jobs, a PostgreSQL database (pgvector-enabled for AI features), and Redis for queues and caching. The web service runs rails db:chatwoot_prepare on first boot to create and migrate the schema, so the app is ready immediately — open the URL and create your super-admin account. Web and worker share the same SECRET_KEY_BASE over Railway's private network, and uploads persist to a volume so nothing is lost on redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cozy-beauty | `chatwoot/chatwoot:v4.16.2` | Worker |
| redis | `redis:7-alpine` | Database |
| pgvector | `pgvector/pgvector:pg16` | Database |
| chatwoot | `chatwoot/chatwoot:v4.16.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | cozy-beauty | production | Node environment. Leave as production. |
| `FORCE_SSL` | cozy-beauty | true | Force HTTPS. Kept in sync with the web service. |
| `RAILS_ENV` | cozy-beauty | production | Rails environment. Leave as production. |
| `REDIS_URL` | cozy-beauty | - | Redis connection string over the private network. Sidekiq pulls jobs from here. |
| `FRONTEND_URL` | cozy-beauty | - | Public URL; references the web (chatwoot) service's domain. |
| `POSTGRES_HOST` | cozy-beauty | - | Postgres host over the private network. References the pgvector service. |
| `SECRET_KEY_BASE` | cozy-beauty | (secret) | Must match the web service's secret so sessions validate. References the chatwoot service. |
| `INSTALLATION_ENV` | cozy-beauty | docker | Tells Chatwoot it runs in Docker. Leave as docker. |
| `POSTGRES_DATABASE` | cozy-beauty | chatwoot | Database name, matching the pgvector service. |
| `POSTGRES_PASSWORD` | cozy-beauty | (secret) | Postgres password. References the pgvector service. |
| `POSTGRES_USERNAME` | cozy-beauty | (secret) | Postgres user, matching the pgvector service. |
| `RAILS_LOG_TO_STDOUT` | cozy-beauty | true | Send logs to stdout so they show in Railway's log viewer. |
| `RAILS_SERVE_STATIC_FILES` | cozy-beauty | true | Kept in sync with the web service. Leave as true. |
| `POSTGRES_DB` | pgvector | chatwoot | Name of the database Chatwoot uses. Created and migrated automatically by the web service's pre-deploy step. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser that Chatwoot connects as. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Auto-generated database password. Alphanumeric to stay safe inside connection strings. |
| `PORT` | chatwoot | 3000 | Port the Rails server listens on. Must match the public domain's target port. |
| `NODE_ENV` | chatwoot | production | Node environment for asset handling. Leave as production. |
| `FORCE_SSL` | chatwoot | true | Force HTTPS. Recommended since Railway serves over TLS. |
| `RAILS_ENV` | chatwoot | production | Rails environment. Leave as production. |
| `REDIS_URL` | chatwoot | - | Redis connection string over the private network. |
| `FRONTEND_URL` | chatwoot | - | Public URL of your Chatwoot instance. Auto-filled from the generated domain. |
| `POSTGRES_HOST` | chatwoot | - | Postgres host over Railway's private network. References the pgvector service. |
| `SECRET_KEY_BASE` | chatwoot | (secret) | Rails secret that encrypts sessions and cookies. Auto-generated; the worker references this same value so keep it stable. |
| `INSTALLATION_ENV` | chatwoot | docker | Tells Chatwoot it runs in Docker. Leave as docker. |
| `POSTGRES_DATABASE` | chatwoot | chatwoot | Database name, matching the pgvector service. |
| `POSTGRES_PASSWORD` | chatwoot | (secret) | Postgres password. References the pgvector service. |
| `POSTGRES_USERNAME` | chatwoot | (secret) | Postgres user, matching the pgvector service. |
| `RAILS_LOG_TO_STDOUT` | chatwoot | true | Send logs to stdout so they show in Railway's log viewer. |
| `RAILS_SERVE_STATIC_FILES` | chatwoot | true | Let Rails serve compiled assets. Required on Railway. |

## Configuration

- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bundle exec rails s -p 3000 -b 0.0.0.0`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/chatwoot-self-hosted-intercom-alternativ)
