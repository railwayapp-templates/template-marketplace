# Deploy Chatwoot - All In One (PGVector) on Railway

Template for Chatwoot with WhatsApp, Email and Automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/chatwoot-all-in-one-pgvector)

## About

Chatwoot is an open-source, self-hosted customer engagement suite. This "All In One" template provides a simplified, modern deployment of Chatwoot that comes pre-configured with **PGVector** support. It is designed to be the easiest way to get the latest version of Chatwoot running with full support for AI features and vector embeddings right out of the box.

Hosting this version of Chatwoot on Railway streamlines the typical microservices complexity into a cohesive "All In One" stack. Unlike standard installations that require complex orchestration, this template optimizes the setup by pre-configuring the necessary environment for Rails, Sidekiq, and the database.

Crucially, it provisions a **PostgreSQL database with the `pgvector` extension enabled**. This is a requirement for Chatwoot's newer AI capabilities, such as automated responses and conversation summaries, which rely on vector embeddings. This setup handles the web server, background workers, and data persistence seamlessly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chatwoot | `ghcr.io/railwayapp-templates/chatwoot:Community` | Web service |
| Redis | `railwayapp/redis:7.2.5` | Database |
| pgvector | `pgvector/pgvector:pg16` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | - |
| `MAILER_INBOUND_EMAIL_DOMAIN` | Chatwoot | - | Your email domain, just like "yourdomain.com" (without username@) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Chatwoot | - | Just fill 'true' |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | pgvector | railway | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `PGPORT_PRIVATE` | pgvector | 5432 | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "while ! pg_isready -h $PGHOST -p $PGPORT; do :; done; bundle exec rails db:chatwoot_prepare && bundle exec rails db:migrate && multirun \"bundle exec sidekiq -C config/sidekiq.yml\" \"bundle exec rails s -b 0.0.0.0 -p $PORT\""`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/chatwoot-all-in-one-pgvector)
