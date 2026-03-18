# Deploy Listmonk — Open Source Mailchimp Alternative on Railway on Railway

Launch a Self-Hosted Newsletter with Listmonk on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-mailchimp-alternative)

## About

Self-host Listmonk on Railway and get a fully production-ready, open source newsletter and mailing list manager — no per-subscriber fees, no data lock-in. Listmonk is a single Go binary that handles millions of subscribers, high-volume email campaigns, transactional messages, and detailed analytics. This Railway template wires up `listmonk/listmonk:latest` alongside a managed PostgreSQL database, auto-installs and migrates the schema on first boot, and exposes the dashboard via Railway's edge SSL — ready to send campaigns in minutes.

listmonk is a self-hosted, open source newsletter and mailing list manager built in Go with a Vue.js frontend. It is the tool used by Zerodha to send millions of emails per campaign on modest hardware. Its only dependency is a PostgreSQL database — no Redis, no separate worker process, no external queue.

Key features:

- **High-volume campaigns** — multi-threaded, multi-SMTP queues with throughput and sliding-window rate limiting
- **Subscriber management** — millions of subscribers across single and double opt-in lists, custom JSON attributes, SQL-based segmentation
- **Transactional messages** — send arbitrary messages via API using pre-defined templates (email, SMS, WhatsApp via Messenger webhooks)
- **Visual email builder** — drag-and-drop builder, WYSIWYG editor, Markdown, raw HTML, or plain text (added in v5)
- **Go templating** — 100+ functions available in subject lines and content
- **Analytics** — campaign performance, bounces, top links, open rates, click-through rates
- **REST API** — full API coverage for all dashboard features
- **OIDC SSO** — single sign-on with granular roles and permissions
- **Media library** — S3-compatible backend for image and file uploads

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Listmonk | `listmonk/listmonk:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Listmonk | 9000 | HTTP server listening port |
| `LISTMONK_db__host` | Listmonk | - | Postgres database host reference |
| `LISTMONK_db__port` | Listmonk | 5432 | Postgres database server port |
| `LISTMONK_db__user` | Listmonk | (secret) | Postgres database username reference |
| `LISTMONK_ADMIN_USER` | Listmonk | (secret) | Admin dashboard login username |
| `LISTMONK_app__address` | Listmonk | 0.0.0.0:9000 | Application bind address and port |
| `LISTMONK_db__database` | Listmonk | - | Postgres database name reference |
| `LISTMONK_db__max_idle` | Listmonk | 25 | Maximum idle database connections |
| `LISTMONK_db__max_open` | Listmonk | 25 | Maximum open database connections |
| `LISTMONK_db__password` | Listmonk | (secret) | Postgres database password reference |
| `LISTMONK_db__ssl_mode` | Listmonk | require | Enable SSL for database connections |
| `LISTMONK_ADMIN_PASSWORD` | Listmonk | (secret) | Admin dashboard login password |
| `LISTMONK_db__max_lifetime` | Listmonk | 300s | Maximum connection lifetime duration |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "./listmonk --install --idempotent --yes --config '' && ./listmonk --upgrade --yes --config '' && ./listmonk --config ''"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/listmonk/uploads`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/listmonk-mailchimp-alternative)
