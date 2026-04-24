# Deploy Apache Answer | Open Source Q&A Platform on Railway

Self-host Apache Answer. Community Knowledge Base, Help Center & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-answer-qa)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-answer-qa?referralCode=QXdhdr)

Deploy Apache Answer on Railway to self-host a full-featured Q&A platform for your team or community. Apache Answer is an open-source alternative to Stack Overflow for Teams, built under the Apache Software Foundation, giving you complete control over your knowledge base with zero licensing fees.

This Railway template pre-configures Apache Answer with a PostgreSQL database, persistent storage for uploads and configuration, and automated first-run setup via environment variables. Run Apache Answer on Railway and have a production-ready Q&A community live in minutes.

Apache Answer is a modern Q&A platform built with Go and React, designed for teams at any scale. Whether you need an internal knowledge base, a customer support forum, or a developer community hub, Apache Answer provides the structured question-and-answer format that makes knowledge discoverable.

Key features:

- **Reputation system** — gamified engagement with upvotes, badges, and privilege levels
- **Tagging and search** — organize content by topics with full-text search
- **Plugin architecture** — extend with OAuth login (Google, GitHub), S3 storage, Algolia search, anti-spam (Akismet)
- **Multi-language support** — 40+ language packs included out of the box
- **Markdown editor** — rich text editing with code syntax highlighting
- **RESTful API** — programmatic access to all platform data

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Apache Answer | `apache/answer:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Apache Answer | 80 | HTTP server listening port |
| `DB_HOST` | Apache Answer | - | Postgres host and port |
| `DB_NAME` | Apache Answer | - | Postgres database name |
| `DB_TYPE` | Apache Answer | postgres | Database backend type |
| `LANGUAGE` | Apache Answer | en-US | Interface language |
| `SITE_URL` | Apache Answer | - | Public site URL with HTTPS |
| `SITE_NAME` | Apache Answer | Apache Answer | Platform display name |
| `ADMIN_NAME` | Apache Answer | - | Admin account username |
| `ADMIN_EMAIL` | Apache Answer | - | Admin account email |
| `DB_PASSWORD` | Apache Answer | (secret) | Postgres password |
| `DB_USERNAME` | Apache Answer | (secret) | Postgres username |
| `AUTO_INSTALL` | Apache Answer | true | Enable automated first-run setup |
| `INSTALL_PORT` | Apache Answer | 80 | Installation wizard port |
| `CONTACT_EMAIL` | Apache Answer | admin@answer.local | Support contact email |
| `ADMIN_PASSWORD` | Apache Answer | (secret) | Admin password (bootstrap-only) |
| `EXTERNAL_CONTENT_DISPLAY` | Apache Answer | always_display | External media embedding policy |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/apache-answer-qa)
