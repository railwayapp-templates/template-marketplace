# Deploy Wiki.js on Railway

Confluence alternative. HAOpen-source wiki and documentation platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wikijs-wiki)

## About

Wiki.js is an open-source wiki and documentation platform built on Node.js, used by engineering teams, IT departments and open-source projects as a self-hosted Confluence alternative. It solves the problem every growing team hits: knowledge scattered across chat threads, README files and personal notes, with no searchable place that has permissions, version history and a real editor. Wiki.js gives you a page tree, six editors, per-page access rules, revision diffs and 20+ authentication providers, under AGPL-3.0 with no seat limits.

Deploy Wiki.js on Railway and this template wires up the two pieces it needs: the application container serving HTTP on port 3000 behind a Railway-managed TLS domain, and a managed PostgreSQL database holding everything durable — pages, history, users, settings, the signing keypair generated during setup, and the binary contents of every upload. Because no state lives on the container's disk, the application needs no volume and can run multiple replicas. To self-host Wiki.js here you supply nothing at deploy time; you choose an administrator email and password on first visit.

![Wiki.js Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786824851/8c4fefae-1075-4ef3-ba5a-101833d4eacf.png)

Wiki.js keeps content in a SQL database rather than on disk, which is what makes it straightforward to run as a stateless container. Teams self-host it when documentation is commercially sensitive, when a per-seat wiki bill stops making sense, or when they want it beside the systems it documents.

- **Six editors** — Markdown with live preview, WYSIWYG, AsciiDoc, raw HTML, template and code
- **Full version history** — every save is a revision with a side-by-side diff and one-click restore
- **Granular permissions** — rules match on path prefix, exact path, regex or tag, per group
- **20+ authentication providers** — local accounts plus LDAP/Active Directory, SAML, OIDC, OAuth2, GitHub, Google, Microsoft Entra ID, Okta, Auth0 and Keycloak
- **Rich content** — Mermaid and PlantUML diagrams, KaTeX math, highlighted code and attachments
- **Storage targets** — optional two-way Git sync, plus local file and S3 backups
- **Comments, tags and a page tree**, with 50+ locales and a dark theme

The **Wiki.js** service is the only one with a public domain, and answers a `/healthz` endpoint Railway probes so an unresponsive container is replaced. The **PostgreSQL** service is private, and Wiki.js migrates its own schema on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wikijs | `ghcr.io/requarks/wiki:2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wikijs | 3000 | HTTP port and health check target |
| `DB_SSL` | wikijs | false | Private network, no TLS needed |
| `DB_HOST` | wikijs | - | Private database hostname |
| `DB_NAME` | wikijs | - | Database name |
| `DB_PASS` | wikijs | - | Database password |
| `DB_PORT` | wikijs | - | Database port |
| `DB_TYPE` | wikijs | postgres | Database engine selector |
| `DB_USER` | wikijs | (secret) | Database username |
| `HA_ACTIVE` | wikijs | true | Cross-replica events via PostgreSQL |
| `LOG_LEVEL` | wikijs | info | Log verbosity level |
| `NODE_OPTIONS` | wikijs | --max-old-space-size=2048 | Node.js heap ceiling |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wikijs-wiki)
