# Deploy Listmonk (Zero-Config) on Railway

Self-hosted newsletter platform, zero-config - Mailchimp alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-template)

## About

[Listmonk](https://listmonk.app) is a self-hosted, high-performance
newsletter and mailing list manager - a fully open-source alternative to
Mailchimp. Manage subscribers, send campaigns, segment audiences, and own
your data completely, with a REST API for everything the UI can do.

This template deploys Listmonk with **zero manual configuration steps**:
the root URL is wired automatically to your Railway domain, and the admin
password is generated automatically - no post-deploy settings edits required
before you can log in and start sending.

Hosting Listmonk gives you a complete email marketing platform that manages
subscriber lists, designs and sends campaigns, and tracks engagement metrics
without relying on external SaaS tools. It offers a modern web interface for
campaign creation, template management, subscriber import/export, bounce
handling, and analytics on open rates, click-through rates, and unsubscribes.

This template connects Listmonk to a Railway-managed Postgres database over
the private network, with connection pooling and an idempotent install/
migration command so redeploys never break on schema drift. Uploaded
campaign images and attachments persist on a dedicated volume across
redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| listmonk | `listmonk/listmonk:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | listmonk | - | Timezone used for scheduling campaigns and displaying timestamps in the UI. |
| `PORT` | listmonk | - | Port the container listens on - set to 9000 to match Listmonk's internal HTTP server. |
| `LISTMONK_db__host` | listmonk | - | Postgres host - wired automatically to the bundled Postgres service over Railway's private network. |
| `LISTMONK_db__port` | listmonk | - | Postgres port - wired automatically to the bundled Postgres service. |
| `LISTMONK_db__user` | listmonk | (secret) | Postgres username - wired automatically to the bundled Postgres service. |
| `LISTMONK_ADMIN_USER` | listmonk | (secret) | Username for the initial superadmin account, created on first boot. |
| `LISTMONK_app__address` | listmonk | - | Internal bind address for the Listmonk HTTP server. Must match PORT and the service's target port (9000). |
| `LISTMONK_db__database` | listmonk | - | Postgres database name - wired automatically to the bundled Postgres service. |
| `LISTMONK_db__max_idle` | listmonk | - | Maximum idle Postgres connections kept in the pool. |
| `LISTMONK_db__max_open` | listmonk | - | Maximum open Postgres connections in the pool. |
| `LISTMONK_db__password` | listmonk | (secret) | Postgres password - wired automatically to the bundled Postgres service. |
| `LISTMONK_db__ssl_mode` | listmonk | - | Postgres SSL mode. 'disable' is safe here since traffic stays on Railway's private network. |
| `LISTMONK_app__root_url` | listmonk | - | Public URL of this deployment, used in email links, password resets, and campaign tracking. Auto-wired to your Railway domain - no manual edit needed. |
| `LISTMONK_ADMIN_PASSWORD` | listmonk | (secret) | Auto-generated password for the initial superadmin account. Find it here after deploying, then log in at /admin/login. |
| `LISTMONK_db__max_lifetime` | listmonk | - | Maximum lifetime of a pooled Postgres connection before it's recycled. |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `sh -c "yes | ./listmonk --install --idempotent --yes --config '' && ./listmonk --config ''"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/listmonk/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/listmonk-template)
