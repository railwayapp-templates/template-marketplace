# Deploy Apache Answer on Railway

Apache Answer 2.0: Q&A community platform, with Postgres. Admin preset.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-answer-2)

## About

Apache Answer is a question-and-answer platform from the Apache Software Foundation, in the style of Stack Overflow. People ask questions, post answers, vote, tag and earn reputation. It works as a public community forum, a product help center or an internal knowledge base for a team, with plugins for login and search.

This template runs the official `apache/answer:2.0.2` image with a Railway PostgreSQL database. The web installer is skipped: on first boot Answer creates its tables, sets the site name and URL, and creates the admin account from the variables. Uploaded files and the config live on a Railway volume, and all content is stored in Postgres, so everything survives redeploys. Registration stays open by default, as in upstream, and new accounts must confirm their email, so add SMTP settings in the admin panel or switch registration to invite-only there. Both services fit comfortably on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| answer | `apache/answer:2.0.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | answer | 80 |
| `DB_TYPE` | answer | postgres |
| `LANGUAGE` | answer | en-US |
| `TIMEZONE` | answer | UTC |
| `SITE_NAME` | answer | Apache Answer |
| `ADMIN_NAME` | answer | admin |
| `ADMIN_EMAIL` | answer | admin@example.com |
| `DB_PASSWORD` | answer | (secret) |
| `DB_USERNAME` | answer | (secret) |
| `AUTO_INSTALL` | answer | true |
| `INSTALL_PORT` | answer | 80 |
| `CONTACT_EMAIL` | answer | admin@example.com |
| `ADMIN_PASSWORD` | answer | (secret) |
| `EXTERNAL_CONTENT_DISPLAY` | answer | ask_before_display |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/apache-answer-2)
