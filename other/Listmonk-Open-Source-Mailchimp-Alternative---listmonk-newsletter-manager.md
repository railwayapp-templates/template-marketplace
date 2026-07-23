# Deploy Listmonk — Open Source Mailchimp Alternative on Railway

Self-hosted newsletter & mailing list manager, powered by Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-newsletter-manager)

## About

listmonk is a high-performance, self-hosted newsletter and mailing list manager built in Go — an open-source alternative to Mailchimp, ConvertKit, and Substack. It handles subscriber management, campaign creation, transactional email, and analytics in a single binary, giving you full ownership of your audience data and no per-subscriber billing.

This template deploys listmonk with a managed PostgreSQL database and a persistent volume for uploads, wired together and ready to configure in minutes.

---

listmonk's only dependency is PostgreSQL — no Redis, no separate worker process, no external queue. It stores every subscriber, list, campaign, and analytics record in Postgres, so a reliable, persistent database is the one thing it cannot run without. This template provisions that for you and connects the two services on first deploy.

The performance story is the reason people choose it. listmonk is the tool Zerodha, a major Indian fintech, uses to send millions of emails per campaign, and its Go concurrency model handles those volumes on minimal hardware — peak memory stays remarkably low even on large sends. On Railway's Hobby plan it comfortably runs newsletters for small to medium lists, and scales vertically as your audience grows.

One thing to plan for: listmonk schedules and templates email, but it does not send it directly. You connect an external SMTP provider — Amazon SES, Postmark, SendGrid, Mailgun, or similar — and listmonk delivers through it. This is the standard, deliverability-friendly way to run self-hosted email.

Typical cost: **~$5–10/month** on Railway for listmonk and Postgres, plus your SMTP provider's per-email cost — which for SES and similar is a fraction of what Mailchimp charges per subscriber.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Listmonk | [railwayapp-templates/listmonk](https://github.com/railwayapp-templates/listmonk) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LISTMONK_ORIGIN_0` | Listmonk | https://domain.com | - |
| `LISTMONK_ORIGIN_1` | Listmonk | https://www.domain.com | - |
| `LISTMONK_db__user` | Listmonk | (secret) | - |
| `LISTMONK_db__password` | Listmonk | (secret) | - |
| `LISTMONK_db__ssl_mode` | Listmonk | disable | - |
| `LISTMONK_app__admin_password` | Listmonk | (secret) | - |
| `LISTMONK_app__admin_username` | Listmonk | (secret) | Basicauth username |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Listmonk | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/listmonk/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/listmonk-newsletter-manager)
