# Deploy Wiki.js | Open-Source Confluence Alternative on Railway

Self-Host Wiki.js. Modern documentation, markdown editing & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wiki-js)

## About

Wiki.js is a powerful open-source wiki platform built on Node.js, offering a modern interface with Markdown editing, visual editing, and full-text search. Deploy Wiki.js on Railway to self-host your own knowledge base with full data ownership, Git-backed content, and rich authentication integrations — no DevOps overhead required.

This Railway template pre-configures Wiki.js with a managed PostgreSQL database, automatic HTTPS via a public domain, and production-ready environment variables. Self-host Wiki.js on Railway and run a complete wiki platform with two services: the Wiki.js application server and a PostgreSQL 18 database.

Wiki.js is an open-source documentation and wiki platform licensed under AGPL-3.0 with over 28,000 GitHub stars. It stores all content in a PostgreSQL database with optional Git synchronization, making it ideal for teams that want version-controlled documentation.

Key features of self-hosted Wiki.js include:

- **Multiple editors** — Markdown, visual WYSIWYG, and raw HTML editing modes
- **Git sync** — bidirectional synchronization with GitHub, GitLab, Bitbucket, or any Git remote
- **Authentication** — built-in local auth plus 20+ providers (OAuth2, SAML, LDAP, OpenID Connect)
- **Full-text search** — built-in search engine with support for Elasticsearch and Algolia
- **Multilingual** — content available in 40+ languages with per-page language tagging
- **Access control** — granular page-level permissions with group-based rules
- **Media management** — built-in asset manager for images, documents, and files

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Wiki.js | `ghcr.io/requarks/wiki:2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Wiki.js | 3000 | HTTP server listening port |
| `DB_HOST` | Wiki.js | - | PostgreSQL internal hostname |
| `DB_NAME` | Wiki.js | - | PostgreSQL database name |
| `DB_PASS` | Wiki.js | - | PostgreSQL password |
| `DB_PORT` | Wiki.js | - | PostgreSQL connection port |
| `DB_TYPE` | Wiki.js | postgres | Database engine type |
| `DB_USER` | Wiki.js | (secret) | PostgreSQL username |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wiki-js)
